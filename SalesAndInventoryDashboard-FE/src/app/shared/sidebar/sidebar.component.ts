import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isSidebarOpen = false;
  isMobile = false;

  @ViewChild('sidebar') sidebar: ElementRef | undefined;
  @Output() sidebarToggle = new EventEmitter<boolean>();

  onInit() {
    this.onResize();
  }


  /**
   * Toggles the sidebar's open/closed state.
   * If the sidebar element is not defined, the function exits early.
   */
  toggleSidebar() {
    if (!this.sidebar) return;

    this.isSidebarOpen = !this.isSidebarOpen;
    this.sidebarToggle.emit(this.isSidebarOpen); 
  }

  @HostListener('window:resize')
  /**
   * Listens for window resize events and updates the isMobile flag
   * based on the current window width.
   * If the window width is less than or equal to 768px, the isMobile
   * flag is set to true.
   * Useful for applying different styles based on mobile/desktop views.
   */
  onResize() {
    this.isMobile = window.innerWidth <= 768;
   console.log('Window resized:', window.innerWidth);
  }
}
