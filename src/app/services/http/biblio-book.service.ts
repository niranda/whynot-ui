import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BiblioBook } from '../../models/biblioBook';
import { PopularAnnualReport } from 'src/app/models/popularAnnualReport';
import { PopularMonthReport } from 'src/app/models/popularMonthReport';

@Injectable({
  providedIn: 'root'
})
export class BiblioBookService {
  private baseUrl = 'http://localhost:5216/BiblioBook';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<BiblioBook[]> {
    return this.http.get<BiblioBook[]>(`${this.baseUrl}`,{withCredentials:true});
  }

  getTopBooksByYear(): Observable<PopularAnnualReport[]> {
    return this.http.get<PopularAnnualReport[]>(`${this.baseUrl}/TopBooksByYear`,{withCredentials:true});
  }

  getTopBooksByMonth(): Observable<PopularMonthReport[]> {
    return this.http.get<PopularMonthReport[]>(`${this.baseUrl}/TopBooksByMonth`,{withCredentials:true});
  }

  getBookById(id: string): Observable<BiblioBook> {
    return this.http.get<BiblioBook>(`${this.baseUrl}/${id}`,{withCredentials:true});
  }

  createBook(book: BiblioBook): Observable<BiblioBook> {
    return this.http.post<BiblioBook>(`${this.baseUrl}`, book,{withCredentials:true});
  }

  updateBook(book: BiblioBook): Observable<BiblioBook> {
    return this.http.put<BiblioBook>(`${this.baseUrl}`, book,{withCredentials:true});
  }

  deleteBook(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`,{withCredentials:true});
  }
}