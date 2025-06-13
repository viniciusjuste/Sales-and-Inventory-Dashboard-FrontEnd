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

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);
@Component({
  selector: 'app-dashboard',
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {
  report = {
    totalRevenue: 141,
    totalSales: 3,
    averageTicket: 47,
    bestSellingProduct: 'Suco Natural',
    bestSellingProductQuantity: 15,
    dailySales: [
      { date: '2025-06-07T00:00:00', value: 90 },
      { date: '2025-06-08T00:00:00', value: 120 },
      { date: '2025-06-09T00:00:00', value: 70 },
      { date: '2025-06-10T00:00:00', value: 141 }
    ]
  };

  ngAfterViewInit() {
    const labels = this.report.dailySales.map(s => new Date(s.date).toLocaleDateString());
    const data = this.report.dailySales.map(s => s.value);

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels: ['10/06/2025'],
        datasets: [{
          label: 'Vendas Diárias (R$)',
          data: [141],
          backgroundColor: '#4CAF50'
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

    new Chart('dailySalesChart', config);
  }
}
