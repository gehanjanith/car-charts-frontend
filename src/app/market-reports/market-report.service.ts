import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class MarketReportsService {
  private baseUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  getMakes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/makes`);
  }

  getModels(make: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/models/${make}`);
  }

  // getCarListings(make: string, model: string, minYear: number, maxYear: number) {
  //   let params = new HttpParams()
  //     .set('minYear', minYear.toString())
  //     .set('maxYear', maxYear.toString());

      
  //   return this.http.get(`${this.baseUrl}/scrape/${make}/${model}`, { params });
  // }
  getCarListings(make: string, model: string, minYear: number, maxYear: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/plot/${make}/${model}?minYear=${minYear}&maxYear=${maxYear}`);
  }

  getModelsYear(make: string, model: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/year/${make}/${model}`);
  }
}