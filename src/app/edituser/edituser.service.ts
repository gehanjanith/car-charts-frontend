import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditUserService {
  private apiUrl = 'http://localhost:5000'; // Update with your Flask API endpoint

  constructor(private http: HttpClient) {}

  searchUserByName(name: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/search-user`, { name });
  }

  updateUserData(userId: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update-user/${userId}`, data);
  }
}
