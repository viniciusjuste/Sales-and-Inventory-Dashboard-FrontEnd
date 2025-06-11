import { Component, ElementRef, HostListener, OnInit, viewChild, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { FormsModule } from '@angular/forms';
import { FetchState } from '../../models/FetchState';

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

  fetchState = FetchState.DEFAULT;
  FetchState = FetchState;

  searchTerm: string = '';
  productsData: Product[] = [];

  productId: number = 0;
  name: string = '';
  description: string = '';
  price: number = 0;
  stockQuantity: number = 0;
  category: string = '';
  isActive: boolean = false;

  modalIsOpen = false;
  modaldeleteIsOpen = false;

  isMobile: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
    this.checkIfMobile();
  }

  /**
   * Returns a filtered list of products based on the search term.
   * @returns A filtered list of products.
   */
  filteredProducts(): Product[] {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) return this.productsData;

    return this.productsData.filter(product =>
      product.name.toLowerCase().includes(term)
    );
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkIfMobile();
  }

  private checkIfMobile() {
    this.isMobile = window.innerWidth < 768;
  }

  /**
   * Fetches a list of products from the server and stores them in the
   * component's `products` property.
   */
  getProducts() {
    this.fetchState = FetchState.LOADING;

    this.productService.getProducts().subscribe({
      next: (response) => {
        this.productsData = response;
        this.fetchState = FetchState.SUCCESS;
      },
      error: (error) => {
        console.error('Erro ao buscar produtos:', error);
        this.fetchState = FetchState.ERROR;
      }
    });
  }

  /**
   * Updates a product in the server with the input values.
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
   * Deletes a product from the server using the Product service.
   */
  deleteProduct() {
    this.productService.deleteProduct(this.productId).subscribe({
      next: (response) => {
        console.log('Product deleted successfully:', response);
        this.getProducts();
        this.closeDeleteModal();
      },
      error: (error) => {
        console.error('Error deleting product:', error);
      }
    });
  }

  /**
   * Opens the edit modal and fill in the form fields with the product's properties.
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

  /**
   *Open the delete modal and fill in the form fields with the product properties.
   * @param product The product whose properties will fill in the form fields.
   */
  openDeleteModal(product: Product) {
    this.productId = product.id || 0;
    this.modaldeleteIsOpen = true;
  }

  closeDeleteModal() {
    this.modaldeleteIsOpen = false;
  }
}
