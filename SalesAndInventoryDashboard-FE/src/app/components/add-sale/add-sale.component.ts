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
   * Adds an item to the sale if all required fields are filled.
   */
  addItem() {
    if (this.productName != '' && this.quantity > 0 && this.price > 0) {
      this.itens.push({ productId: this.productId, productName: this.productName, price: this.price, quantity: this.quantity });
      this.productName = '';
      this.price = 0;
      this.quantity = 0;
      this.productId = 0;
    } else {
      alert('Please fill in all fields correctly.');
    }
  }

  /**
   * Removes an item from the sale list.
   *
   * @param itemToRemove - The item to remove from the sale list.
   */
  removeItem(itemToRemove: { productId: number; productName: string; price: number; quantity: number }) {
    this.itens = this.itens.filter(item => item !== itemToRemove);

  }

  /**
   * Loads the list of products from the server.
   */
  getProducts() {
    this.products$ = this.productsService.getProducts();
  }

    /**
   * Fills product info (ID and price) based on the entered product name.
   * If not found, logs a warning.
   */
  getProductByName() {
    if (this.productName.trim() !== '') {
      this.productsService.getProductByName(this.productName.trim()).subscribe({
        next: (response) => {
          if (response && response.length > 0) {
            const matchedProduct = response.find(p => p.name.toLowerCase() === this.productName.toLowerCase());
            if (matchedProduct) {
              this.productId = matchedProduct.id || 0;
              this.price = matchedProduct.price || 0;
            } else {
              console.warn('Produto não encontrado na lista retornada.');
            }
          }
        },
        error: (error) => {
          console.error('Erro ao buscar produto por nome:', error);
          alert('Erro ao buscar produto. Tente novamente.');
        }
      });
    }
  }

  /**
   * Submits the sale to the server.
   * - Validates that at least one item is present.
   * - Maps item data to the Sale model.
   * - Handles server response and resets the form.
   */
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
        if (error.status === 400) {
          alert(error.error);
        } else {
          alert('Error posting sale. Please try again.');
        }
        console.error('Error posting sale:', error);
      }
    });
  }
}
