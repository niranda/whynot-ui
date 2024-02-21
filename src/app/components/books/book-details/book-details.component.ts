import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BiblioBookService } from 'src/app/services/http/biblio-book.service';
import { BiblioReaderService } from 'src/app/services/http/biblio-reader.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {
  selectedBook: any;

  constructor(
    public dialogRef: MatDialogRef<BookDetailsComponent>,
    private bookService: BiblioBookService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectedBook = { ...data.book };
  }

  editBook() {
    this.bookService.updateBook(this.selectedBook).subscribe(updatedBook => {
      this.selectedBook = updatedBook;
      this.dialogRef.close();
      this.snackBar.open('Book updated successfully', 'Close', {
        duration: 2000
      });
    }, error => {
      console.error('Error updating book:', error);
      this.snackBar.open('Error updating book', 'Close', {
        duration: 2000
      });
    });
  }

  deleteBook() {
    this.bookService.deleteBook(this.selectedBook.id).subscribe(() => {
      this.dialogRef.close();
      this.snackBar.open('Book deleted successfully', 'Close', {
        duration: 2000
      });
    }, error => {
      console.error('Error deleting book:', error);
      this.snackBar.open('Error deleting book', 'Close', {
        duration: 2000
      });
    });
  }
}
