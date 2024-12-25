import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Event, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  collapsed = false;
  isDrawerVisible = false;
  showHeader: boolean = true;
  showFooter: boolean = true;
  isLoggedIn = false;
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

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.urlAfterRedirects;
        this.showFooter = !(
          currentRoute.includes('/auth/login') || currentRoute.includes('')
        );
        this.showHeader = !(
          currentRoute.includes('') || currentRoute.includes('')
        );
      }
    });
  }

  toggleSidebar() {
    if (window.innerWidth < 768) {
      // Show drawer for mobile
      this.isDrawerVisible = true;
    } else {
      // Toggle sidebar for desktop
      this.collapsed = !this.collapsed;
    }
  }

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
