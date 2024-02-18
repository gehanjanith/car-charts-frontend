import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private baseUrl = 'http://localhost:5000'; // Replace with your actual backend URL

  constructor(private http: HttpClient) {}

  saveMessage(postId: string, msg: string, user: string): Observable<any> {
    const url = `${this.baseUrl}/save-message`;
    const data = { post_id: postId, msg, user };

    return this.http.post(url, data, { withCredentials: true, });
  }

  getMessages(postId: number): Observable<any[]> {
    const url = `${this.baseUrl}/get-message/${postId}`;
    return this.http.get<any[]>(url);
  }
}
