import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterModule],
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  title = 'SalesAndInventoryDashboard-FE';
}
