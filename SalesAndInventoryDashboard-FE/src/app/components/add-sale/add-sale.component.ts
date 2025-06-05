import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';

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

  ngOnInit(): void {
    this.getProducts();
  }

  products$!: Observable<Product[]>;

  constructor(private productsService: ProductService) { }

  itens: { productName: string; price: number; quantity: number }[] = [];

  /**
   * Adds an item to the sale.
   *
   * If the product name is not empty and the quantity is greater than 0, the item is added to the sale.
   * Otherwise, an alert is displayed to the user to fill in the fields correctly.
   */
  addItem() {
    if (this.productName != '' && this.quantity > 0 && this.price > 0) {
      this.itens.push({ productName: this.productName, price: this.price, quantity: this.quantity });
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
 */
  removeItem(itemToRemove: { productName: string; price: number; quantity: number }) {
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
}
