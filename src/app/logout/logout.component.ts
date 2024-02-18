import { Component } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  isLoggedIn: boolean = true;
  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    this.isLoggedIn = !!sessionStorage.getItem('username');
  }

  logout() {
    sessionStorage.removeItem('username');
    this.isLoggedIn = false;
    // Optionally, redirect to the login page or any other page after logout
  }

}
