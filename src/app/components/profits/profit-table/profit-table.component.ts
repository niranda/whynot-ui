import { Component, OnInit } from '@angular/core';
import { AnnualReport } from 'src/app/models/annualReport';
import { MonthlyReport } from 'src/app/models/monthlyReport';
import { ReportServiceService } from 'src/app/services/http/report-service.service';

@Component({
  selector: 'app-profit-table',
  templateUrl: './profit-table.component.html',
  styleUrls: ['./profit-table.component.css']
})
export class ProfitTableComponent implements OnInit {
  annualReport: AnnualReport[] = [];
  monthlyReport: MonthlyReport[] = [];

  constructor(private reportService: ReportServiceService) { }

  ngOnInit(): void {
    this.getAnnualReport();
    this.getMonthlyReport();
  }

  getAnnualReport() {
    this.reportService.getAnnualReport().subscribe(
      data => {
        this.annualReport = data;
      },
      error => {
        console.error('Error fetching annual report: ', error);
      }
    );
  }

  getMonthlyReport() {
    this.reportService.getMonthlyReport().subscribe(
      data => {
        this.monthlyReport = data;
      },
      error => {
        console.error('Error fetching monthly report: ', error);
      }
    );
  }
}