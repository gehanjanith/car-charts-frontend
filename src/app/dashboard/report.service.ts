import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  
 

  private baseUrl = 'http://localhost:5000'; // Replace with your backend API URL

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    const url = `${this.baseUrl}/users`;
    return this.http.get<any[]>(url);
  }
  getSearchRecords(): Observable<any[]> {
    const url = `${this.baseUrl}/search-records`;
    return this.http.get<any[]>(url);
  }

  runPriceUpdateJob() {
    const url = `${this.baseUrl}/price-scrape`;
    return this.http.get<any[]>(url);
  }

  getVehicleListingsCount() {
    const url = `${this.baseUrl}/Vehicle-Listings-Count`;
    return this.http.get<number>(url);
  }
}
