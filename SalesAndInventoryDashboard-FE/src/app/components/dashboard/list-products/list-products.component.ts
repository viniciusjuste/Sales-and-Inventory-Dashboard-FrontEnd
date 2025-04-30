import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { RouterModule } from '@angular/router';
import { Product } from '../../../models/product';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-products',
  imports: [RouterModule, CommonModule],
  standalone: true,
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent implements OnInit {

  product$!: Observable<Product>;
  products$!: Observable<Product[]>;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  /**
   * Retrieves a list of products from the server and assigns it to the "products$" observable.
   * This function is called in the component's OnInit lifecycle hook.
   */
  getProducts() {
    this.products$ = this.productService.getProducts();
  }

}
