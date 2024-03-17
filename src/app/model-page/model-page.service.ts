import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelPageService {
    private baseUrl = 'http://127.0.0.1:5000'; // Python backend URL
    constructor(private http: HttpClient) { }
    getMakes(): Observable<string[]> {
        return this.http.get<string[]>(`${this.baseUrl}/makes`);
    }

    getModels(make: string): Observable<string[]> {
        return this.http.get<string[]>(`${this.baseUrl}/models/${make}`);
    }

    getModelsYear(make: string, model: string): Observable<string[]> {
        return this.http.get<string[]>(`${this.baseUrl}/year/${make}/${model}`);
    }

    searchVehicle(make: string, model: string, year: string): Observable<any> {
        return this.http.get<string[]>(`${this.baseUrl}/searchVehicle/${make}/${model}/${year}`);
    }


}
