import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class MarketReportsService {
  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  getCarListings(make: string, model: string, minYear: number, maxYear: number) {
    let params = new HttpParams()
      .set('minYear', minYear.toString())
      .set('maxYear', maxYear.toString());

      
    return this.http.get(`${this.apiUrl}/scrape/${make}/${model}`, { params });
  }
}