import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  collapsed = false;
  isDrawerVisible = false;
  isLoggedIn = true;
  userName = 'AB';
  activeMenu = '';
  sideBarDetails = [
    { title: 'Dashboard', icon: 'dashboard', key: '' },
    { title: 'Properties', icon: 'book', key: '' },
    { title: 'Cleaning Requests', icon: 'appstore', key: '' },
    { title: 'Cleaners', icon: 'team', key: '' },
    { title: 'Payments', icon: 'solution', key: '' },
  ];

  constructor(private router: Router) {}

  toggleSidebar() {
    if (window.innerWidth < 768) {
      // Show drawer for mobile
      this.isDrawerVisible = true;
    } else {
      // Toggle sidebar for desktop
      this.collapsed = !this.collapsed;
    }
  }

  // navigateTo(path: string) {
  //   this.activeMenu = path;
  //   this.router.navigate([path]);
  //   if (this.isDrawerVisible) {
  //     this.isDrawerVisible = false; // Close drawer on navigation
  //   }
  // }

  navigateTo(menuItem: any) {
    console.log(menuItem); // Inspect the emitted object
    const path = menuItem.key;
    this.activeMenu = path;
    this.router.navigate([path]);
    if (this.isDrawerVisible) {
      this.isDrawerVisible = false;
    }
  }

  logout() {
    // Implement logout logic
    this.router.navigate(['/login']);
  }
}
