import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, LayoutModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isSidebarOpen = false;
  isMobile = false;
  isMenuOpen = false;

  @ViewChild('sidebar') sidebar: ElementRef | undefined;
  @Output() sidebarToggle = new EventEmitter<boolean>();

  /**
  * Injects the BreakpointObserver to detect changes in the screen size.
  * Sets the `isMobile` property to `true` if the screen width is equal to or less than 1000px.
  * @param breakpointObserver Service used to observe changes in the screen breakpoints.
  */
  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe(['(max-width: 1000px)'])
      .subscribe(result => {
        this.isMobile = result.matches;
      });
  }

  /**
   * Toggles the sidebar open or closed.
   * Otherwise, it toggles the `isSidebarOpen` property and emits the
   * `sidebarToggle` event with the new value of `isSidebarOpen`.
   */
  toggleSidebar(): void {
    if (!this.sidebar) return;

    this.isSidebarOpen = !this.isSidebarOpen;
    this.sidebarToggle.emit(this.isSidebarOpen);
  }

  menuOnClick() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
