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
  isLoggedIn = false;
  userName = 'AB';
  activeMenu = '';
  sideBarDetails = [
    { title: 'Dashboard', icon: 'dashboard', key: '/dashboard' },
    { title: 'Courses', icon: 'book', key: '/courses' },
    { title: 'Categories', icon: 'appstore', key: '/categories' },
    { title: 'Users Management', icon: 'team', key: '/users' },
    { title: 'Enrollment', icon: 'solution', key: '/enrollment' },
    { title: 'Financials', icon: 'file', key: '/report' },
    { title: 'Blogs', icon: 'read', key: '/blogs' },
    { title: 'Manage Profile', icon: 'user', key: '/manageprofile' },
    { title: 'Audit Trail', icon: 'audit', key: '/audittrail' },
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
