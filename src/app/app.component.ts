import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivationStart,
  NavigationEnd,
  NavigationStart,
  Router,
  Event,
} from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Easy-Power-Hub';
  text = 'loading';
  isExtranet = false;
  loading = false;
  previousNetworkStatusLastUpdatedAt = 0;
  previousNetworkStatus = true;
  maxDownTImeDurationBeforePageReloadsInMs = 3000;
  initialized = false;
  networkSubscription: Subscription | undefined;
  showNavbarAndHeader = false;
  showNavbar = true;
  isNavbarOpen = false;
  showHeader: boolean = true;

  // closeOffcanvas() {
  //   const offcanvasElement = document.getElementById('bdSidebar');
  //   if (offcanvasElement) { // Check if the element is not null
  //     const bsOffcanvas = new bootstrap.Offcanvas(offcanvasElement);
  //     bsOffcanvas.hide();
  //   } else {
  //     console.error('Offcanvas element not found!');
  //   }
  // }

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event) => {
        // At this point, 'event' is of type NavigationEnd thanks to the type guard
        this.showNavbarAndHeader = !(
          event.urlAfterRedirects === '/login' ||
          event.urlAfterRedirects === '/' ||
          event.urlAfterRedirects === '/forgot-password'
        );
      });
  }

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.router.events.subscribe((data) => {
      if (data instanceof ActivationStart) {
        if (data) {
          this.isExtranet = data.snapshot.data['isExtranet'];
        }
      } else if (data instanceof NavigationStart) {
        this.loading = true;
      } else if (data instanceof NavigationEnd) {
        this.loading = false;
      }
      if (data instanceof NavigationEnd) {
        const sidebar = document.querySelector('#bdSidebar');
        const backdrop = document.querySelector('.offcanvas-backdrop');
        if (sidebar && backdrop) {
          sidebar.classList.remove('show');
          backdrop.classList.remove('show');
        }
      }
    });

    // logout(): void {
    //   this.authService.logout().subscribe({
    //     next: res => {
    //       console.log(res);
    //       this.storageService.clean();
    //
    //       window.location.reload();
    //     },
    //     error: err => {
    //       console.log(err);
    //     }
    //   });
    // }
  }

  logOut() {}
}
