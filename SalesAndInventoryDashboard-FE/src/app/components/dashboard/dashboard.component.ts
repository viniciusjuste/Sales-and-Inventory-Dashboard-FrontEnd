import { AfterViewInit, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartConfiguration
} from 'chart.js';
import { SaleService } from '../../services/sale.service';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  report: any = {};

  constructor(private saleService: SaleService) { }

  ngAfterViewInit() {
    this.getSaleReport();
  }

  /**
   * Fetches a sales report from the server and stores it in the component's
   * `createChart` method to render the sales chart.
   */
  getSaleReport() {
    this.saleService.getSaleReport().subscribe({
      next: (report) => {
        this.report = report;
        this.createChart();
      },
      error: (err) => {
        console.error('Error fetching sales report:', err);
      }
    });
  }

  /**
   * Creates a bar chart with daily sales data.
   * @private
   */
  private createChart(): void {
    if (!this.report.dailySales || !Array.isArray(this.report.dailySales)) {
      console.warn('Missing or invalid daily sales data.');
      return;
    }

    const labels = this.report.dailySales.map((s: { date: string, value: number }) => new Date(s.date).toLocaleDateString());
    const data = this.report.dailySales.map((s: { date: string, value: number }) => s.value);
    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Vendas Diárias (R$)',
          data,
          backgroundColor: '#007F7F'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: {
              color: '#fff'
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: '#fff'
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#fff'
            }
          },
          tooltip: {
            titleColor: '#fff',
            bodyColor: '#fff',
            backgroundColor: '#333'
          }
        }
      }
    };

    const canvas: HTMLCanvasElement | null = document.getElementById('dailySalesChart') as HTMLCanvasElement;
    if (canvas) {
      new Chart(canvas, config);
    } else {
      console.error('Canvas element with ID "dailySalesChart" not found.');
    }
  }
}
