// src/app/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  
  private baseUrl = 'http://localhost:5000'; // Update with your Flask API endpoint

  constructor(private http: HttpClient) {}

  getMakes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/makes`);
  }

  getModels(make: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/models/${make}`);
  }

  postData(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/post`,  data );
  }

  getModelsYear(make: string, model: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/year/${make}/${model}`);
  }
}
