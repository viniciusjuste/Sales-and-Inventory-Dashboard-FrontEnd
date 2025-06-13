import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sale } from '../models/Sale';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:5292/sales';

  /**
   * Fetches all sales from the server.
   * @returns An observable that emits an array of sales.
   */
  getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.url);
  }

  /**
   * Sends a sale to the server to be added.
   * @param sale The sale object to be added.
   * @returns An observable that emits the added sale.
   */
  postSale(sale: Sale): Observable<Sale> {
    return this.http.post<Sale>(this.url, sale);
  }

  /**
   * Fetches a report of all sales from the server.
   * @returns An observable that emits an array of sales.
   */
  getSaleReport(): Observable<any> {
    return this.http.get<any>(`${this.url}/report`);
  }
}
