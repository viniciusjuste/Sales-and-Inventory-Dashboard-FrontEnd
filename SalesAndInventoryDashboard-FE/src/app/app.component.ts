import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent implements OnInit {
  title = 'SalesAndInventoryDashboard-FE';

  ngOnInit(): void {
    initFlowbite(); 
  }
}
