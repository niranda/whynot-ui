import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BiblioReader } from '../../models/biblioReader';
import { PopularAnnualReport } from 'src/app/models/popularAnnualReport';
import { PopularMonthReport } from 'src/app/models/popularMonthReport';

@Injectable({
  providedIn: 'root'
})
export class BiblioReaderService {
  private baseUrl = 'http://localhost:5216/biblioReader';

  constructor(private http: HttpClient) { }

  getReaders(): Observable<BiblioReader[]> {
    return this.http.get<BiblioReader[]>(`${this.baseUrl}`,{withCredentials:true});
  }

  getTopReadersByYear(): Observable<PopularAnnualReport[]> {
    return this.http.get<PopularAnnualReport[]>(`${this.baseUrl}/TopReadersByYear`,{withCredentials:true});
  }

  getTopReadersByMonth(): Observable<PopularMonthReport[]> {
    return this.http.get<PopularMonthReport[]>(`${this.baseUrl}/TopReadersByMonth`,{withCredentials:true});
  }

  getReaderById(id: string): Observable<BiblioReader> {
    return this.http.get<BiblioReader>(`${this.baseUrl}/${id}`,{withCredentials:true});
  }

  createReader(reader: BiblioReader): Observable<BiblioReader> {
    return this.http.post<BiblioReader>(`${this.baseUrl}`, reader,{withCredentials:true});
  }

  updateReader(reader: BiblioReader): Observable<BiblioReader> {
    return this.http.put<BiblioReader>(`${this.baseUrl}`, reader,{withCredentials:true});
  }

  deleteReader(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`,{withCredentials:true});
  }
}
