import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'car-carts-app';

  ngOnInit() {
    // Check if user is logged in when the component initializes
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    // Check if username is stored in session storage
    const username = sessionStorage.getItem('username');
    if (username) {
      // User is logged in
      // Redirect to the appropriate route if needed
    }
  }

  isLoggedIn(): boolean {
    // Check if username is stored in session storage
    return !!sessionStorage.getItem('username');
  }
}
