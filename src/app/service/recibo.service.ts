import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_URI } from '../config/config';
import { Recibo, IRecibo, ReciboRequest } from '../entities/recibo';

@Injectable({
  providedIn: 'root'
})
export class ReciboService {

  constructor(private httpClient: HttpClient) { }
  
  aniadirRecibo(recibo: IRecibo) : Observable<Recibo> {
    return this.httpClient.post<Recibo>(BACKEND_URI + '/recibos', recibo);
  }

  generarRecibos(recibo: ReciboRequest) : Observable<Recibo[]> {
    return this.httpClient.post<Recibo[]>(BACKEND_URI + '/recibos/generar',recibo);
  }

  editarRecibo(id: number, recibo: IRecibo) : Observable<Recibo> {
    return this.httpClient.put<Recibo>(BACKEND_URI + '/recibos/' + id, recibo);
  }

  obtenerTodosRecibos() : Observable<Recibo[]> {
    return this.httpClient.get<Recibo[]>(BACKEND_URI + '/recibos');
  }

  obtenerRecibo(numeroRecibo: string) : Observable<Recibo> {
    return this.httpClient.get<Recibo>(BACKEND_URI + '/recibos/buscar?numerorecibo=' + numeroRecibo);
  }

  eliminarRecibo(id: number) : Observable<void> {
    return this.httpClient.delete<void>(BACKEND_URI + '/recibos/' + id);
  }

}