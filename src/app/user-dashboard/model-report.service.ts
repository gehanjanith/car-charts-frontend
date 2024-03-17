import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ModelReport {
  min_price: any;
  max_price: any;
  make: string;
  model: string;
  year: number;
  avg_price_before_last_day: number;
  avg_price_last_day: number;
  percentage_difference: number;
}

@Injectable({
  providedIn: 'root'
})
export class ModelReportService {

  constructor(private http: HttpClient) { }

  getModelReport(): Observable<ModelReport[]> {
    return this.http.get<ModelReport[]>('http://127.0.0.1:5000/model-report');
  }
}
