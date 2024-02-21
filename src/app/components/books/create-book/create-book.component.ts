import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BiblioReaderService } from 'src/app/services/http/biblio-reader.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { BiblioReader } from 'src/app/models/biblioReader';
import { BiblioBookService } from 'src/app/services/http/biblio-book.service';
import { BiblioBook } from 'src/app/models/biblioBook';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent {
  addForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    genre: new FormControl(''),
    isAvailable: new FormControl(false),
    depositAmount: new FormControl(0),
    rentalCost: new FormControl(0),
  });

  constructor(
    private bookService: BiblioBookService,
    private dialogRef: MatDialogRef<CreateBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
  }

  addBook() {
    const addBook: BiblioBook = {
      title: this.addForm.controls['title'].value,
      author: this.addForm.controls['author'].value,
      genre: this.addForm.controls['genre'].value,
      isAvailable: this.addForm.controls['isAvailable'].value,
      depositAmount: this.addForm.controls['depositAmount'].value,
      rentalCostPerDay: this.addForm.controls['rentalCost'].value,
    }

    this.bookService.createBook(addBook).subscribe(createdBook => {
      this.dialogRef.close(createdBook);
    }, error => {
      console.error('Error creating book:', error);
    });
  }
}
