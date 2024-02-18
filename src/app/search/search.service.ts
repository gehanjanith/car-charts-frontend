import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private baseUrl = 'http://127.0.0.1:5000'; // Python backend URL

  constructor(private http: HttpClient) {}

  getMakes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/makes`);
  }

  getModels(make: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/models/${make}`);
  }

  searchCars(make: string, model: string, minYear: number, maxYear: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/scrape/${make}/${model}?minYear=${minYear}&maxYear=${maxYear}`);
  }
}
