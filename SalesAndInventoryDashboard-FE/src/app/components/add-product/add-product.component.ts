import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';


@Component({
  selector: 'app-add-product',
  imports: [FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  name: string = '';
  description: string = '';
  price: number = 0;
  stockQuantity: number = 0;
  category: string = '';
  isActive: boolean = (document.getElementById('isActive') as HTMLInputElement)?.checked ?? false;


  constructor(private productService: ProductService) { }

  /**
   * Adds a new product to the server via the Product service.
   */
  addProduct() {
    const product: Product = this.createProduct();
    this.productService.addProduct(product).subscribe({
      next: (response) => {
        this.resetInputs();
      },
      error: (error) => {
        console.error('Error adding product:', error);
        this.resetInputs();
      }
    })
  }

  /**
   * Creates a new product object from the form inputs.
   */
  createProduct(): Product {
    return {
      name: this.name,
      description: this.description,
      price: this.price,
      stockQuantity: this.stockQuantity,
      category: this.category,
      isActive: this.isActive
    };
  }

  /**
   * Resets all input fields in the form to their initial state.
   */
  resetInputs() {
    this.name = '';
    this.description = '';
    this.price = 0;
    this.stockQuantity = 0;
    this.category = '';
    this.isActive = false;
  }
}
