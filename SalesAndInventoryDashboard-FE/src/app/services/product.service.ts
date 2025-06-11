import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  apiUrl = 'http://localhost:5292/products';

  /**
   * Fetches all products.
   * @returns An observable that emits an array of products.
   */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  /**
 * Fetches products matching the given name.
   * @param name The name to search for.
   * @returns An observable that emits matching products.
   */
  getProductByName(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?name=${name}`);
  }

  /**
   * Adds a product to the server.
   * @param product The product to be added.
   * @returns An observable that emits the added product.
   */
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  /**
   * Updates an existing product.
   * @param product The product to be updated.
   * @returns An observable that emits the updated product.
   */
  updateProduct(product: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/${product.id}`, product);
  }

  /**
   * Deletes a product.
   * @param productId The id of the product to be deleted.
   * @returns An observable that emits nothing.
   */
  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${productId}`);
  }
}
