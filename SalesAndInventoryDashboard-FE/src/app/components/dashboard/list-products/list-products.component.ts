import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-list-products',
  imports: [],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data;
      console.log(this.products);
    });

    // FALTA BAIXAR O SQL SERVER
  }

}
