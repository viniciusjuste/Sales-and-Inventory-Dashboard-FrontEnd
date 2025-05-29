import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-sale',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-sale.component.html',
  styleUrl: './add-sale.component.css'
})
export class AddSaleComponent {
  productName: string = '';
  quantity: number = 0;

  itens: { productName: string; quantity: number }[] = [];

  addItem() {
    if (this.productName != '' && this.quantity > 0) {
      this.itens.push({ productName: this.productName, quantity: this.quantity });
      this.productName = '';
      this.quantity = 0;
      console.log(this.itens);
    } else {
      alert('Please fill in all fields correctly.');
    }
  }
}
