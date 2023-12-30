import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  getdata() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Set your desired content type
      'Access-Control-Allow-Origin': '*', // Set the origin of your Angular app
    });

    return this.http.get('http://127.0.0.1:5000/users',{headers});
  }
}

