import { Component } from '@angular/core';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent {
  selectedTab: 'profit' | 'top-readers' | 'top-books' = 'profit';

  openProfitComponent() {

  }

  openTopReadersComponent() {

  }

  openTopBooksComponent() {

  }
}
