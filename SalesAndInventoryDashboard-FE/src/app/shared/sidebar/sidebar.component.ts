import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isSidebarOpen = false;

  @ViewChild('sidebar') sidebar: ElementRef | undefined;
  @Output() sidebarToggle = new EventEmitter<boolean>();


  /**
   * Toggles the sidebar's open/closed state.
   * If the sidebar element is not defined, the function exits early.
   */
  toggleSidebar() {
    if (!this.sidebar) return;

    this.isSidebarOpen = !this.isSidebarOpen;
    this.sidebarToggle.emit(this.isSidebarOpen); 
  }
}
