import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { SidebarComponent } from './shared/sidebar/sidebar.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterModule, SidebarComponent],
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  title = 'SalesAndInventoryDashboard-FE';
}
