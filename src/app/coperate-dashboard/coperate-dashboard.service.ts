import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoperateDashboardService {
  private baseUrl = 'http://localhost:5000'; // Replace with your actual backend URL

  constructor(private http: HttpClient) {}

  savePrivateMessage(postId: string, msg: string, user: string, receiver: string): Observable<any> {
    const url = `${this.baseUrl}/save-private-message`;
    const data = { post_id: postId, msg, user, receiver };
    console.log('data',data)

    return this.http.post(url, data, { withCredentials: true, });
  }

}