import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  DB_URL = `${environment.DB_URL}/transactions`;
  constructor(private http: HttpClient) {}

  getAllTransaction(): Observable<any> {
    return this.http.get(`${this.DB_URL}`);
  }
  deleteCutomer(id: number): Observable<any> {
    return this.http.delete(`${this.DB_URL}/${id}`);
  }
  getTransactionById(id: number): Observable<any> {
    return this.http.get(`${this.DB_URL}/${id}`);
  }
}
