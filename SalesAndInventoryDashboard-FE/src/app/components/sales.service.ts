import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sale } from '../models/Sale';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:5292/sales';

  getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.url);
  }
}
