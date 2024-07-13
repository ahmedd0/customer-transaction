import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  DB_URL = environment.DB_URL;
  constructor(private http: HttpClient) {}

  getAllCustomers(): Observable<any> {
    return this.http.get(`${this.DB_URL}/customers`);
  }
}
