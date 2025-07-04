import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_URI } from '../config/config';
import { Nivel, INivel } from '../entities/nivel';

@Injectable({
  providedIn: 'root'
})
export class NivelService {

  constructor(private httpClient: HttpClient) { }
  
  aniadirNivel(nivel: INivel) : Observable<Nivel> {
    return this.httpClient.post<Nivel>(BACKEND_URI + '/niveles', nivel);
  }

  editarNivel(id: number, nivel: INivel) : Observable<Nivel> {
    return this.httpClient.put<Nivel>(BACKEND_URI + '/niveles/' + id, nivel);
  }

  eliminarNivel(id: number) : Observable<void> {
    return this.httpClient.delete<void>(BACKEND_URI + '/niveles/' + id);
  }

  obtenerTodosNivels() : Observable<Nivel[]> {
    return this.httpClient.get<Nivel[]>(BACKEND_URI + '/niveles');
  }

}