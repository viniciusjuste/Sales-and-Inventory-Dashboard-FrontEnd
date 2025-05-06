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
export class AddProductComponent implements OnInit {

  name: string = '';
  description: string = '';
  price: number = 0;
  stockQuantity: number = 0;
  category: string = '';
  isActive: boolean = (document.getElementById('isActive') as HTMLInputElement)?.checked ?? false;


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // Initialization logic here
  }

  /**
   * Adds a new product to the server via the Product service.
   * Creates a Product object from the component's input fields and
   * calls the Product service's addProduct method to add the product.
   * Logs a success message if successful, or an error message if
   * an error occurs. Resets the input fields to their initial state
   * after attempting to add the product.
   */
  addProduct() {
    const product: Product = {
      name: this.name,
      description: this.description,
      price: this.price,
      stockQuantity: this.stockQuantity,
      category: this.category,
      isActive: this.isActive,
    }

    this.productService.addProduct(product).subscribe({
      next: (response) => {
        console.log('Product added successfully:', response);
        this.resetInputs(); // Reset inputs after successful addition
      },
      error: (error) => {
        console.error('Error adding product:', error);
        this.resetInputs(); // Reset inputs on error
      }
    })
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
