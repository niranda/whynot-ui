import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BiblioLendingInfo } from '../../models/biblioLending';
import { GetLendingInfoRequest } from 'src/app/models/getLendingInfoRequest';

@Injectable({
  providedIn: 'root'
})
export class BiblioLendingInfoService {
  private baseUrl = 'http://localhost:5216/BiblioLendingInfo';

  constructor(private http: HttpClient) { }

  getBookInfos(): Observable<BiblioLendingInfo[]> {
    return this.http.get<BiblioLendingInfo[]>(`${this.baseUrl}`,{withCredentials:true});
  }

  getBookInfosByReaderId(id: string): Observable<BiblioLendingInfo[]> {
    return this.http.get<BiblioLendingInfo[]>(`${this.baseUrl}/BookInfosByReaderId/${id}`,{withCredentials:true});
  }

  getBookInfoByReaderIdAndBookId(request: GetLendingInfoRequest): Observable<BiblioLendingInfo> {
    const params = new URLSearchParams();
    params.append('readerId', request.readerId);
    params.append('bookId', request.bookId);
    return this.http.get<BiblioLendingInfo>(`${this.baseUrl}/BookInfoByReaderIdAndBookId/?${params.toString()}`, {withCredentials:true});
  }

  getBookInfoById(id: string): Observable<BiblioLendingInfo> {
    return this.http.get<BiblioLendingInfo>(`${this.baseUrl}/${id}`,{withCredentials:true});
  }

  createBookInfo(bookInfo: BiblioLendingInfo): Observable<BiblioLendingInfo> {
    return this.http.post<BiblioLendingInfo>(`${this.baseUrl}`, bookInfo,{withCredentials:true});
  }

  updateBookInfo(bookInfo: BiblioLendingInfo): Observable<BiblioLendingInfo> {
    return this.http.put<BiblioLendingInfo>(`${this.baseUrl}`, bookInfo,{withCredentials:true});
  }

  deleteBookInfo(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`,{withCredentials:true});
  }
}
