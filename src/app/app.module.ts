import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import HomeComponent  from './components/general/home/home.component';
import { ModalModule } from './components/_modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import { LibraryComponent } from './components/general/library/library.component';
import { ReaderListComponent } from './components/readers/reader-list/reader-list.component';
import { ReaderDetailsComponent } from './components/readers/reader-details/reader-details.component';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { LendingStatusPipe } from './shared/pipes/lending-status.pipe';
import { BookFilterPipe } from './shared/pipes/book-filter.pipe';
import { CreateReaderComponent } from './components/readers/create-reader/create-reader.component';
import { BookListComponent } from './components/books/book-list/book-list.component';
import { BookDetailsComponent } from './components/books/book-details/book-details.component';
import { CreateBookComponent } from './components/books/create-book/create-book.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LibraryLogoComponent } from './components/general/library-logo/library-logo.component';
import { NgxMaskDirective } from 'ngx-mask';
import { NgxMaskPipe } from 'ngx-mask';
import {provideNgxMask} from 'ngx-mask';
import { LendingComponent } from './components/lendings/lending/lending.component';
import { CreateLendingComponent } from './components/lendings/create-lending/create-lending.component';
import { CloseLendingComponent } from './components/lendings/close-lending/close-lending.component';
import { ReportListComponent } from './components/profits/report-list/report-list.component';
import { ProfitTableComponent } from './components/profits/profit-table/profit-table.component';
import { TopReaderTableComponent } from './components/profits/top-reader-table/top-reader-table.component';
import { TopBookTableComponent } from './components/profits/top-book-table/top-book-table.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LibraryComponent,
    ReaderListComponent,
    ReaderDetailsComponent,
    FilterPipe,
    BookFilterPipe,
    CreateReaderComponent,
    BookListComponent,
    BookDetailsComponent,
    CreateBookComponent,
    LibraryLogoComponent,
    LendingComponent,
    CreateLendingComponent,
    CloseLendingComponent,
    ReportListComponent,
    ProfitTableComponent,
    TopReaderTableComponent,
    TopBookTableComponent,
    LendingStatusPipe
  ],
  imports: [
    NgxMaskDirective, 
    NgxMaskPipe,
    BrowserModule,
    AppRoutingModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatOptionModule,
    MatNativeDateModule,
    MatCardModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatDialogModule,
    MatInputModule,
    HttpClientModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
  ],
  providers: [provideNgxMask()],
  bootstrap: [AppComponent]
})
export class AppModule { }
