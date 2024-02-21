import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReaderDetailsComponent } from '../reader-details/reader-details.component';
import { BiblioReaderService } from '../../../services/http/biblio-reader.service';
import { BiblioReader } from 'src/app/models/biblioReader';
import { CreateReaderComponent } from '../create-reader/create-reader.component';

@Component({
  selector: 'app-reader-list',
  templateUrl: './reader-list.component.html',
  styleUrls: ['./reader-list.component.css']
})
export class ReaderListComponent implements OnInit {
  readers: BiblioReader[] = [];
  filteredReaders: BiblioReader[] = [];
  nameFilter: string = "";
  search='';
  isFilterActive: boolean = false;

  constructor(private dialog: MatDialog, private readerService: BiblioReaderService) { }

  ngOnInit(): void {
    this.getReaders();
  }

  getReaders() {
    this.readerService.getReaders().subscribe(data => {
      this.readers = data;
    });
  }

  openReaderDetails(reader: BiblioReader) {
    const dialogRef = this.dialog.open(ReaderDetailsComponent, {
      width: '800px',
      data: { reader: reader }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getReaders();
    });
  }

  applyFilters() {
    this.readers = this.readers.filter(reader =>
      (!this.nameFilter || 
        reader.firstName.toLowerCase().includes(this.nameFilter.toLowerCase()) ||
        reader.lastName.toLowerCase().includes(this.nameFilter.toLowerCase()))
    );
  }

  toggleFilter() {
    if (this.isFilterActive) {
      this.getReaders()
    } else {
      this.sortAlphabetically(); 
    }
    
    this.isFilterActive = !this.isFilterActive; 
  }

  sortAlphabetically() {
    this.readers.sort((a, b) => {
      if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) return -1;
      if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) return 1;
      return 0;
    });
  }

  openCreateReaderDialog() {
    const dialogRef = this.dialog.open(CreateReaderComponent, {
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('New reader added:', result);
        this.readers.push(result);
        this.applyFilters();
      }
    });
  }
}