import { Component, ElementRef, OnInit, viewChild, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-products',
  imports: [RouterModule, CommonModule, FormsModule],
  standalone: true,
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent implements OnInit {

  @ViewChild('editModal') editModal!: ElementRef;
  @ViewChild('deleteModal') deleteModal!: ElementRef;

  product$!: Observable<Product>;
  products$!: Observable<Product[]>;

  productId: number = 0;
  name: string = '';
  description: string = '';
  price: number = 0;
  stockQuantity: number = 0;
  category: string = '';
  isActive: boolean = false;

  modalIsOpen = false;

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

  /**
   * Updates a product in the server with the input values.
   * Calls the Product service's updateProduct method to update the product.
   * Logs a success message if successful, or an error message if an error occurs.
   * Retrieves the product list from the server again and closes the modal after
   * attempting to update the product.
   */
  updateProduct() {
    const product = this.buildProduct();

    this.productService.updateProduct(product).subscribe({
      next: (response) => {
        console.log('Product updated successfully:', response);
        this.getProducts();
        this.closeModal();
      },
      error: (error) => {
        console.error('Error updating product:', error);
      }
    });
  }

/**
 * Constructs a Product object using the current form inputs.
 * 
 * @returns A Product object with fields populated from the component's properties.
 */
  private buildProduct(): Product {
    return {
      id: this.productId,
      name: this.name,
      description: this.description,
      price: this.price,
      stockQuantity: this.stockQuantity,
      category: this.category,
      isActive: this.isActive
    };
  }

  /**
   * Opens the modal by setting the modalIsOpen property to true and
   * filling in the form fields with the product's properties.
   * @param product The product whose properties will fill in the form fields.
   */
  openModal(product: Product) {
    this.productId = product.id || 0;
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.stockQuantity = product.stockQuantity;
    this.category = product.category;
    this.isActive = product.isActive;
    this.modalIsOpen = true;
  }

  closeModal() {
    this.modalIsOpen = false;
  }
}
