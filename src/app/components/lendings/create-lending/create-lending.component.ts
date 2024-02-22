import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BiblioBook } from 'src/app/models/biblioBook';
import { BiblioLendingInfo } from 'src/app/models/biblioLending';
import { BiblioReader } from 'src/app/models/biblioReader';
import { BiblioBookService } from 'src/app/services/http/biblio-book.service';
import { BiblioLendingInfoService } from 'src/app/services/http/biblio-lending-info.service';
import { BiblioReaderService } from 'src/app/services/http/biblio-reader.service';

@Component({
  selector: 'app-create-lending',
  templateUrl: './create-lending.component.html',
  styleUrls: ['./create-lending.component.css']
})
export class CreateLendingComponent implements OnInit  {
  filteredUsers: BiblioReader[] = [];
  filteredBooks: BiblioBook[] = [];
  search='';
  bookSearch='';
  depositCost = 0;
  totalCost = 0;
  rentalFrom: Date;
  rentalTo: Date;
  costPerDay = 0;
  discount = 0;
  reader: BiblioReader;
  book: BiblioBook;

  addForm: FormGroup = new FormGroup({
    readerId: new FormControl(''),
    bookId: new FormControl(''),
    rentalFrom: new FormControl(new Date()),
    rentalTo: new FormControl(new Date()),
  });

  constructor(private readerService: BiblioReaderService, 
    private bookService: BiblioBookService,
    private lendingService: BiblioLendingInfoService,
    private dialogRef: MatDialogRef<CreateLendingComponent>,
    private snackBar: MatSnackBar) {
      
    }

  ngOnInit(): void {
    this.getReaders();
    this.getBooks();

    this.rentalFrom = new Date();
    this.addForm.get('rentalFrom')!.valueChanges.subscribe(value => {
      this.rentalFrom = value ? value: new Date();
      this.calculateDaysDifference();
    });

    this.addForm!.get('rentalTo')!.valueChanges.subscribe(value => {
      this.rentalTo = value;
      this.calculateDaysDifference();
    });
  }

  calculateDaysDifference() {
    if (this.rentalFrom && this.rentalTo) {
      const differenceMs: number = this.rentalTo.getTime() - this.rentalFrom.getTime();
      const daysDifference = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

      this.totalCost = daysDifference * this.costPerDay;
    }
  }

  getReaders() {
    this.readerService.getReaders().subscribe(data => {
      this.filteredUsers = data;
    });
  }

  getBooks() {
    this.bookService.getBooks().subscribe(data => {
      this.filteredBooks = data;
    });
  }

  addLending() {
    if (!this.book.isAvailable) {
      this.snackBar.open('Книга недоступна, або знаходиться в прокаті', 'Close', {
        duration: 2000
      });

      return;
    }

    const addLending: BiblioLendingInfo = {
      dateIssued: this.addForm.value.rentalFrom,
      estimatedDate: this.addForm.value.rentalTo,
      status: 1,
      readerId: this.addForm.value.readerId,
      bookId: this.addForm.value.bookId,
      totalCost: this.depositCost + (this.totalCost*((this.discount ? this.discount : 100) / 100))
    }

    this.lendingService.createBookInfo(addLending).subscribe(createdLending => {
      const book: BiblioBook = {
        id: this.book.id,
        title: this.book.title,
        author: this.book.author,
        genre: this.book.genre,
        isAvailable: false,
        depositAmount: this.book.depositAmount,
        rentalCostPerDay: this.book.rentalCostPerDay,
      }

      this.bookService.updateBook(book).subscribe();

      this.dialogRef.close(createdLending);
      this.snackBar.open('Успішно створено новий прокат', 'Close', {
        duration: 2000
      });
    }, error => {
      console.error('Error creating lending:', error);
    });
  }

  filterUsers() {
    const searchTerm = this.search.toLowerCase();
    this.filteredUsers = this.filteredUsers.filter(user  =>
    user.firstName.toLowerCase().includes(searchTerm) ||
    user.lastName.toLowerCase().includes(searchTerm) ||
    user.phone.includes(this.search)
  );
  }

  filterBooks() {
    const searchTerm = this.bookSearch.toLowerCase();
    this.filteredBooks = this.filteredBooks.filter(book =>
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm)
    );
  }

  displayUserFn(user: BiblioReader): string {
    return user && user.firstName && user.lastName && user.phone ? `${user.firstName} ${user.lastName} | ${user.phone}` : '';
  }  

  displayBookFn(book: BiblioBook): string {
    return book && book.author && book.title ? `${book.title} | ${book.author}` : '';
  }  

  selectUser(user: any) {
    this.reader = user;
    this.discount = user.discount.discountAmount;
    this.addForm.get('readerId')?.setValue(user.id);
  }

  selectBook(book: any) {
    this.book = book;
    this.depositCost = book.depositAmount;
    this.costPerDay = book.rentalCostPerDay;
    this.addForm.get('bookId')?.setValue(book.id);
  }
}
