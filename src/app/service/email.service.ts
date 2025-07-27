import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailMensajeRequest, EmailReciboRequest, EmailRequest } from '../entities/email';
import { Observable } from 'rxjs';
import { BACKEND_URI } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private httpClient: HttpClient) { }

  enviarCorreoMensaje(emailRequest: EmailMensajeRequest) : Observable<void> {
    return this.httpClient.post<void>(BACKEND_URI + '/api/email' + '/send/mensaje',emailRequest);
  }

  enviarCorreoRecibo(emailRequest: EmailReciboRequest) : Observable<void> {
    return this.httpClient.post<void>(BACKEND_URI + '/api/email' + '/send/recibo', emailRequest);
  }

  enviarCorreo(emailRequest: EmailRequest) : Observable<void> {
    return this.httpClient.post<void>(BACKEND_URI + 'api/email' + '/send',emailRequest);
  }
}
