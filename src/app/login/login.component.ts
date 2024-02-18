import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  newdata: any;
  username: string = '';
  password: string = '';
  invalidLogin: boolean = false;

  constructor(private _apiservice: LoginService, private http: HttpClient,public router: Router) { }


  ngOnInit() {
    this.getData();
  }

  getData() {
    this._apiservice.getdata().subscribe(res => {
      this.newdata = res;
    });
  }

  login() {
    // Create a login request payload
    const loginData = {
      username: this.username,
      password: this.password
    };

    // Send a POST request to your Python backend for login
    this.http.post('http://127.0.0.1:5000/login', loginData)
      .subscribe((response: any) => {
        if (response.success) {
          // Login successful
          sessionStorage.setItem('username', this.username);
          this.invalidLogin = false;
          //this.router.navigate(['dashboard']);
          // Check the role and navigate accordingly
        switch (response.role) {
          case 'seller':
            this.router.navigate(['coperate-dashboard']);
            break;
          case 'admin':
            this.router.navigate(['dashboard']);
            break;
          case 'user':
            this.router.navigate(['user-dashboard']);
            break;
          default:
            // Handle other roles if needed
            break;
        }



        } else {
          // Login failed, you can display an error message
          this.invalidLogin = true;
        }
      }, error => {
        // Handle any HTTP error, e.g., connection issue
        this.invalidLogin = true;
      });
  }
}



