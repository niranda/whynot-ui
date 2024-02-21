import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnnualReport } from 'src/app/models/annualReport';
import { MonthlyReport } from 'src/app/models/monthlyReport';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {
  private baseUrl = 'http://localhost:5216/report';

  constructor(private http: HttpClient) { }

  getAnnualReport(): Observable<AnnualReport[]> {
    return this.http.get<AnnualReport[]>(`${this.baseUrl}/Annual`,{withCredentials:true});
  }

  getMonthlyReport(): Observable<MonthlyReport[]> {
    return this.http.get<MonthlyReport[]>(`${this.baseUrl}/Monthly`,{withCredentials:true});
  }
}
