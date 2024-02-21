import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReaderDetailsComponent } from '../../readers/reader-details/reader-details.component';
import { BiblioReaderService } from '../../../services/http/biblio-reader.service';
import { BiblioReader } from 'src/app/models/biblioReader';
import { CreateReaderComponent } from '../../readers/create-reader/create-reader.component';
import { BiblioBook } from 'src/app/models/biblioBook';
import { BiblioBookService } from 'src/app/services/http/biblio-book.service';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { CreateBookComponent } from '../create-book/create-book.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: BiblioBook[] = [];
  filter: string = "";
  search='';
  isFilterActive: boolean = false;

  constructor(private dialog: MatDialog, private bookService: BiblioBookService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
    });
  }

  openBookDetails(book: BiblioBook) {
    const dialogRef = this.dialog.open(BookDetailsComponent, {
      width: '800px',
      data: { book: book }
    });

    dialogRef.afterClosed().subscribe(() => {
    this.getBooks();
    this.applyFilters();
    });
  }

  toggleFilter() {
    if (this.isFilterActive) {
      this.getBooks();
    } else {
      this.filterAvailable();
    }
    
    this.isFilterActive = !this.isFilterActive;
  }

  applyFilters() {
    this.books = this.books.filter(book =>
      (!this.filter || 
        book.title.toLowerCase().includes(this.filter.toLowerCase()) ||
        book.author.toLowerCase().includes(this.filter.toLowerCase()))
    );
  }

  filterAvailable() {
    if (this.books && this.books.length > 0) {
      this.books = this.books.filter(book => book.isAvailable);
    }
  }

  openCreateBookDialog() {
    const dialogRef = this.dialog.open(CreateBookComponent, {
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('New book added:', result);
        this.books.push(result);
        this.applyFilters();
      }
    });
  }
}
