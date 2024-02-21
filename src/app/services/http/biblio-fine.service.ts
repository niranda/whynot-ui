import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BiblioFine } from '../../models/biblioFine';

@Injectable({
  providedIn: 'root'
})
export class BiblioFineService {
  private baseUrl = 'http://localhost:5216/BiblioFine';

  constructor(private http: HttpClient) { }

  getFines(): Observable<BiblioFine[]> {
    return this.http.get<BiblioFine[]>(`${this.baseUrl}`,{withCredentials:true});
  }

  getFineById(id: string): Observable<BiblioFine> {
    return this.http.get<BiblioFine>(`${this.baseUrl}/${id}`,{withCredentials:true});
  }

  createFine(fine: BiblioFine): Observable<BiblioFine> {
    return this.http.post<BiblioFine>(`${this.baseUrl}`, fine,{withCredentials:true});
  }

  updateFine(fine: BiblioFine): Observable<BiblioFine> {
    return this.http.put<BiblioFine>(`${this.baseUrl}`, fine,{withCredentials:true});
  }

  deleteFine(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`,{withCredentials:true});
  }
}