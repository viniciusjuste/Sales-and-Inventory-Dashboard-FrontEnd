import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient) { }

  apiUrl = 'http://localhost:5292/products';

/**
 * Fetches a list of products from the server.
 * 
 * @returns An observable that emits an array of products.
 */
  getProducts(): Observable<any> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
