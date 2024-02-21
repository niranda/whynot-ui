import { Component, OnInit } from '@angular/core';
import { BiblioBook } from 'src/app/models/biblioBook';
import { PopularAnnualReport } from 'src/app/models/popularAnnualReport';
import { PopularMonthReport } from 'src/app/models/popularMonthReport';
import { BiblioBookService } from 'src/app/services/http/biblio-book.service';

@Component({
  selector: 'app-top-book-table',
  templateUrl: './top-book-table.component.html',
  styleUrls: ['./top-book-table.component.css']
})
export class TopBookTableComponent implements OnInit {
  topBooksByYear: PopularAnnualReport[] = [];
  topBooksByMonth: PopularMonthReport[] = [];

  constructor(private bookService: BiblioBookService) { }

  ngOnInit(): void {
    this.getTopBooksByYear();
    this.getTopBooksByMonth();
  }

  getTopBooksByYear() {
    this.bookService.getTopBooksByYear().subscribe(
      data => {
        this.topBooksByYear = data;
      },
      error => {
        console.error('Error fetching: ', error);
      }
    );
  }

  getTopBooksByMonth() {
    this.bookService.getTopBooksByMonth().subscribe(
      data => {
        this.topBooksByMonth = data;
      },
      error => {
        console.error('Error fetching: ', error);
      }
    );
  }
}
