import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import { SaleService } from '../../services/sale.service';
import { Sale } from '../../models/Sale';

@Component({
  selector: 'app-add-sale',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-sale.component.html',
  styleUrl: './add-sale.component.css'
})
export class AddSaleComponent implements OnInit {
  productName: string = '';
  quantity: number = 0;
  price: number = 0;
  productId: number = 0;

  ngOnInit(): void {
    this.getProducts();
  }

  products$!: Observable<Product[]>;

  constructor(private productsService: ProductService, private saleService: SaleService) { }

  itens: { productId: number; productName: string; price: number; quantity: number }[] = [];

  /**
   * Adds an item to the sale.
   *
   * If the product name is not empty and the quantity is greater than 0, the item is added to the sale.
   * Otherwise, an alert is displayed to the user to fill in the fields correctly.
   */
  addItem() {
    if (this.productName != '' && this.quantity > 0 && this.price > 0) {
      this.itens.push({ productId: this.productId, productName: this.productName, price: this.price, quantity: this.quantity });
      this.productName = '';
      this.price = 0;
      this.quantity = 0;
      console.log(this.itens);
    } else {
      alert('Please fill in all fields correctly.');
    }
  }

/**
 * Removes an item from the sale.
 *
 * This method filters out the specified item from the `itens` array,
 * effectively removing it from the list of items in the sale.
 *
 * @param itemToRemove The item to be removed, identified by its product name,
 * price, and quantity.
 */  removeItem(itemToRemove: { productId: number; productName: string; price: number; quantity: number }) {
    this.itens = this.itens.filter(item => item !== itemToRemove);
  }


  /**
   * Initializes the `products$` observable with the list of products from the server.
   * 
   * Subscribes to the `getProducts` observable from the `ProductService` and stores
   * the result in the `products$` property.
   */
  getProducts() {
    this.products$ = this.productsService.getProducts();
  }

  /**
   * Gets a product by its name from the server.
   *
   * Subscribes to the `getProductByName` observable from the `ProductService` and
   * updates the component's `productName`, `productId`, and `price` properties
   * with the response.
   * Logs an error to the console if the subscription fails and alerts the user
   * to try again.
   */
  getProductByName() {
    if (this.productName.trim() !== '') {
      this.productsService.getProductByName(this.productName).subscribe({
        next: (response) => {
          this.productName = response[0].name;
          this.productId = response[0].id || 0;
          this.price = response[0].price || 0;
        },
        error: (error) => {
          console.error('Error getting product by name:', error);
          alert('Failed to get product by name. Please try again.');
        }
      });
    }
  }

  postSale() {
    if (this.itens.length === 0) {
      alert('Please add at least one item to the sale.');
      return;
    }
    const sale: Sale = {
      items: this.itens.map(item => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        unitPrice: item.price,
        totalPrice: item.price * item.quantity
      }))
    };

    this.saleService.postSale(sale).subscribe({
      next: (response) => {
        console.log('Sale posted successfully:', response);
        this.itens = [];
        this.productId = 0;
      },
      error: (error) => {
        console.error('Error posting sale:', error);
        alert('Failed to post sale. Please try again.');
      }
    });
  }
}
