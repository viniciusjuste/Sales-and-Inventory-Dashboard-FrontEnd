import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FetchState } from '../../models/FetchState';
import { Sale } from '../../models/Sale';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SaleService } from '../../services/sale.service';


@Component({
  selector: 'app-list-sales',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './list-sales.component.html',
  styleUrl: './list-sales.component.css'
})
export class ListSalesComponent {

  // product$!: Observable<Product>;
  // products$!: Observable<Product[]>;

  fetchState = FetchState.DEFAULT;
  FetchState = FetchState;

  searchTerm: string = '';
  saleData: Sale[] = [];

  isMobile: boolean = false;

  constructor(private saleService: SaleService) { }

  ngOnInit(): void {
    this.getSales();
    this.checkIfMobile();
  }

  /**
   * Returns a filtered list of sales based on the search term.
   * @returns A filtered list of sales.
   */
  filteredSales(): Sale[] {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) return this.saleData;

    return this.saleData.filter(sale =>
      sale.id?.toString().toLowerCase().includes(term)
    );
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkIfMobile();
  }

  private checkIfMobile() {
    this.isMobile = window.innerWidth < 768; // você pode ajustar esse breakpoint
  }

  /**
   * Fetches a list of sales from the server and stores them in the component's
   * `products` property.
   */
  getSales() {
    this.fetchState = FetchState.LOADING;

    this.saleService.getSales().subscribe({
      next: (response) => {
        this.fetchState = FetchState.SUCCESS;
        this.saleData = response;
        console.log('Vendas obtidas com sucesso:', response);
      },
      error: (error) => {
        console.error('Erro ao buscar produtos:', error);
        this.fetchState = FetchState.ERROR;
      }
    });
  }

  /**
   * Calculates the total sales amount for a given sale.
   * @param sale The sale object containing items to calculate the total sales amount.
   * @returns The total sales amount as a number.
   */
  getTotalSales(sale: Sale): number {
    return sale.items.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
  }
}
