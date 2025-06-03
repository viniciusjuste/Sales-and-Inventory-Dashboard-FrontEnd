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

  constructor(private saleService : SaleService) { }

  ngOnInit(): void {
    this.getSales();
    this.checkIfMobile();
  }

  filteredSales(): Sale[] {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) return this.saleData;

    return this.saleData.filter(sale =>
      sale.id.toString().toLowerCase().includes(term)
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
   *
   * Subscribes to the `getSales` observable from the `SalesService` and
   * updates the component's `fetchState` property according to the response.
   * Logs a success message if the subscription is successful, or an error
   * message if an error occurs during the subscription.
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
 *
 * This method iterates over the sale items and sums up the product
 * of the unit price and quantity for each item to compute the total sales amount.
 *
 * @param sale The sale object containing items to calculate the total sales amount.
 * @returns The total sales amount as a number.
 */
  getTotalSales(sale: Sale): number {
    return sale.items.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
  }
}
