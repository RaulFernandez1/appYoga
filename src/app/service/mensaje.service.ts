import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMensaje, Mensaje } from '../entities/mensaje';
import { Observable } from 'rxjs';
import { BACKEND_URI } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  constructor(private httpClient: HttpClient) { }

  aniadirMensaje(mensaje: IMensaje) : Observable<IMensaje> {
    return this.httpClient.post<IMensaje>(BACKEND_URI + '/mensajes', mensaje);
  }

  editarMensaje(id: number, mensaje: IMensaje) : Observable<IMensaje> {
    return this.httpClient.put<IMensaje>(BACKEND_URI + '/mensajes/' + id, mensaje);
  }

  eliminarMensaje(id: number) : Observable<void> {
    return this.httpClient.delete<void>(BACKEND_URI + '/mensajes/' + id);
  }

  obtenerTodosMensajesPorIdAlumno(id_alumno: number) : Observable<Mensaje[]> {
    return this.httpClient.get<Mensaje[]>(BACKEND_URI + '/mensajes/buscar/' + id_alumno);
  }

}
