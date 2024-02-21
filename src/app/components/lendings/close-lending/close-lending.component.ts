import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, switchMap } from 'rxjs/operators';
import { BiblioBook } from 'src/app/models/biblioBook';
import { BiblioFine } from 'src/app/models/biblioFine';
import { BiblioLendingInfo } from 'src/app/models/biblioLending';
import { BiblioReader } from 'src/app/models/biblioReader';
import { GetLendingInfoRequest } from 'src/app/models/getLendingInfoRequest';
import { BiblioBookService } from 'src/app/services/http/biblio-book.service';
import { BiblioFineService } from 'src/app/services/http/biblio-fine.service';
import { BiblioLendingInfoService } from 'src/app/services/http/biblio-lending-info.service';
import { BiblioReaderService } from 'src/app/services/http/biblio-reader.service';
import { CreateLendingComponent } from '../create-lending/create-lending.component';


@Component({
  selector: 'app-close-lending',
  templateUrl: './close-lending.component.html',
  styleUrls: ['./close-lending.component.css']
})
export class CloseLendingComponent implements OnInit {
  filteredUsers: BiblioReader[] = [];
  filteredBooks: BiblioBook[] = [];
  search='';
  bookSearch='';
  depositCost = 0;
  totalCost = 0;
  rentalFrom: Date;
  rentalTo: Date;
  costPerDay: 0;
  fineAmount: 0;
  currentBook: BiblioBook;
  currentLending: BiblioLendingInfo;

  addForm: FormGroup = new FormGroup({
    readerId: new FormControl(''),
    bookId: new FormControl(''),
    fineAmount: new FormControl(0),
    fineReason: new FormControl(null, Validators.required)
  });

  constructor(private readerService: BiblioReaderService, 
    private bookService: BiblioBookService,
    private lendingService: BiblioLendingInfoService,
    private fineService: BiblioFineService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CloseLendingComponent>) {}


    ngOnInit(): void {
      this.getReaders();
      this.getBooks();
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

  updateLending() {
    const getLendingRequest: GetLendingInfoRequest = {
      readerId: this.addForm.value.readerId,
      bookId: this.addForm.value.bookId
    };

    this.lendingService.getBookInfoByReaderIdAndBookId(getLendingRequest).subscribe(lending => {
      const updatedLending: BiblioLendingInfo = {
        id: lending.id,
        dateIssued: lending.dateIssued,
        estimatedDate: lending.estimatedDate,
        endDate: new Date(),
        status: 2,
        readerId: this.addForm.value.readerId,
        bookId: this.addForm.value.bookId,
        totalCost: lending.totalCost
      };
  
      this.currentLending = updatedLending;
  
      this.lendingService.updateBookInfo(updatedLending).subscribe(updated => {
        this.dialogRef.close();
        this.snackBar.open('Успішно закрито прокат', 'Close', {
          duration: 2000
        });


        if (this.addForm.value.fineAmount) {
          const fine: BiblioFine = {
            fineAmount: this.addForm.value.fineAmount,
            lendingInfoId: this.currentLending.id!,
            fineReason: this.addForm.value.fineReason
          };

          this.fineService.createFine(fine).subscribe(createdFine => {
            this.snackBar.open('Успішно виписано штраф', 'Close', {
              duration: 2000
            });
          }, error => {
            console.error('Error creating fine:', error);
          });
        }
      }, error => {
        console.error('Error:', error);
      });
    }, error => {
      console.error('Error:', error);
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
  
  processPayout() {
    this.snackBar.open('Рахунок сформовано та відправлено на пошту', 'Close', {
      duration: 2000
    });
  }

  displayUserFn(user: BiblioReader): string {
    return user && user.firstName && user.lastName && user.phone ? `${user.firstName} ${user.lastName} | ${user.phone}` : '';
  }  

  displayBookFn(book: BiblioBook): string {
    return book && book.author && book.title ? `${book.title} | ${book.author}` : '';
  }  

  selectUser(user: any) {
    // Произведите действия при выборе пользователя
    // Например, записать id пользователя в модель формы:
    this.addForm.get('readerId')?.setValue(user.id);
  }

  selectBook(book: any) {
    // Произведите действия при выборе книги
    // Например, записать id книги в модель формы:
    this.currentBook = book;
    this.depositCost = book.depositAmount;
    this.costPerDay = book.rentalCostPerDay;
    this.addForm.get('bookId')?.setValue(book.id);
  }
}
