import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grupo, IGrupo } from '../entities/grupo';
import { BACKEND_URI } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  constructor(private httpClient: HttpClient) { }

  aniadirGrupo(grupo: IGrupo) : Observable<Grupo> {
    return this.httpClient.post<Grupo>(BACKEND_URI + '/grupos', grupo);
  }

  editarGrupo(id: number, grupo: IGrupo) : Observable<Grupo> {
    return this.httpClient.put<Grupo>(BACKEND_URI + '/grupos/' + id, grupo);
  }

  eliminarGrupo(id: number) : Observable<void> {
    return this.httpClient.delete<void>(BACKEND_URI + '/grupos/' + id);
  }

  obtenerTodosGrupos() : Observable<Grupo[]> {
    return this.httpClient.get<Grupo[]>(BACKEND_URI + '/grupos');
  }

  obtenerGrupo(nombreGrupo: string) : Observable<Grupo> {
    return this.httpClient.get<Grupo>(BACKEND_URI + '/grupos/buscar?nombregrupo=' + nombreGrupo);
  }

  obtenerGrupoId(id: number) : Observable<Grupo> {
    return this.httpClient.get<Grupo>(BACKEND_URI + '/grupos/buscar/' + id);
  }

}
