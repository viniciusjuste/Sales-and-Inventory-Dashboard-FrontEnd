import { Component, ElementRef, OnInit, viewChild, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-list-products',
  imports: [RouterModule, CommonModule],
  standalone: true,
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent implements OnInit {

  @ViewChild('editModal') editModal!: ElementRef;
  @ViewChild('deleteModal') deleteModal!: ElementRef;

  product$!: Observable<Product>;
  products$!: Observable<Product[]>;

  modalIsOpen = true;

  constructor(private productService: ProductService) { }

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

  toggleModal() {
    this.modalIsOpen = !this.modalIsOpen;
  }
}
