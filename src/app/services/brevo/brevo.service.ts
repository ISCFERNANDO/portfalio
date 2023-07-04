import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailPepople } from 'src/app/interfaces/email-people';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BrevoService {
  private apiUrl = environment.brevoApi;

  constructor(private http: HttpClient) {}

  sendEmail(
    sender: EmailPepople,
    to: EmailPepople[],
    subject: string,
    htmlContent: string
  ): Observable<any> {
    const requestBody = { sender, to, subject, htmlContent };
    return this.http.post(`${this.apiUrl}/v3/smtp/email`, requestBody, {
      headers: this.buildHeaders(),
    });
  }

  private buildHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append('api-key', environment.brevoApiKey);
    return headers;
  }
}
