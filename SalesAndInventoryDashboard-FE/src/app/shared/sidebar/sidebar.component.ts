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

  @ViewChild('sidebar') sidebar: ElementRef | undefined;
  @Output() sidebarToggle = new EventEmitter<boolean>();

  /**
   * Constructor.
   *
   * Listens for changes in the breakpoint size and updates the component's
   * `isMobile` property accordingly. This is used to determine whether the
   * component should be displayed as a sidebar or not.
   *
   * @param breakpointObserver The BreakpointObserver to observe the breakpoints.
   */
  constructor(private breakpointObserver: BreakpointObserver) {
  this.breakpointObserver.observe(['(max-width: 1000px)'])
    .subscribe(result => {
      this.isMobile = result.matches;
      console.log('BreakpointObserver - isMobile:', this.isMobile);
    });
}

  /**
   * Toggles the sidebar open or closed.
   *
   * If the sidebar element doesn't exist, this method does nothing.
   *
   * Otherwise, it toggles the `isSidebarOpen` property and emits the
   * `sidebarToggle` event with the new value of `isSidebarOpen`.
   */
  toggleSidebar(): void {
    if (!this.sidebar) return;

    this.isSidebarOpen = !this.isSidebarOpen;
    this.sidebarToggle.emit(this.isSidebarOpen);
  }

   isMenuOpen = false;

  menuOnClick() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
