// src/app/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:5000/add-user'; // Update with your Flask API endpoint

  constructor(private http: HttpClient) {}

  postData(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
