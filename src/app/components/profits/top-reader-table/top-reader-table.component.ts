import { Component } from '@angular/core';
import { BiblioReader } from 'src/app/models/biblioReader';
import { PopularAnnualReport } from 'src/app/models/popularAnnualReport';
import { PopularMonthReport } from 'src/app/models/popularMonthReport';
import { BiblioReaderService } from 'src/app/services/http/biblio-reader.service';

@Component({
  selector: 'app-top-reader-table',
  templateUrl: './top-reader-table.component.html',
  styleUrls: ['./top-reader-table.component.css']
})
export class TopReaderTableComponent {
  topReadersByYear: PopularAnnualReport[] = [];
  topReadersByMonth: PopularMonthReport[] = [];

  constructor(private readerService: BiblioReaderService) { }

  ngOnInit(): void {
    this.getTopBooksByYear();
    this.getTopBooksByMonth();
  }

  getTopBooksByYear() {
    this.readerService.getTopReadersByYear().subscribe(
      data => {
        this.topReadersByYear = data;
      },
      error => {
        console.error('Error fetching: ', error);
      }
    );
  }

  getTopBooksByMonth() {
    this.readerService.getTopReadersByMonth().subscribe(
      data => {
        this.topReadersByMonth = data;
      },
      error => {
        console.error('Error fetching: ', error);
      }
    );
  }
}
