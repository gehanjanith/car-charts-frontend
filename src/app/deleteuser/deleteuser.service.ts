import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeleteUserService {
  private apiUrl = 'http://localhost:5000'; // Update with your Flask API endpoint

  constructor(private http: HttpClient) {}

  searchUserByName(name: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/search-user`, { name });
  }

  deleteUserData(userId: string): Observable<any> {
    const url = `${this.apiUrl}/delete-user/${userId}`;
    return this.http.delete<any>(url);
  }
}
