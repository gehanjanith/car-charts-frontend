import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private baseUrl = 'http://127.0.0.1:5000'; // Replace with Python backend URL

  constructor(private http: HttpClient) {}

  searchCars(make: string, model: string, minYear: number, maxYear: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/scrape/${make}/${model}?minYear=${minYear}&maxYear=${maxYear}`);
  }
}
