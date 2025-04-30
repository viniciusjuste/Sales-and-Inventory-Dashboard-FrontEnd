import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {

  name :string = '';
  description :string = '';
  price :number = 0;
  stockQuantity :number = 0;
  category :string = '';
  isActive :boolean = false;


  constructor() { }

  ngOnInit(): void {
    // Initialization logic here
  }

  addProduct() {
    // Logic to add a product
  }
}
