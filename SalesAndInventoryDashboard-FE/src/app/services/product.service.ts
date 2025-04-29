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

  getProducts(): Observable<any> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
