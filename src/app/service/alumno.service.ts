import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_URI } from '../config/config';
import { Alumno, IAlumno } from '../entities/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor(private httpClient: HttpClient) { }
  
  aniadirAlumno(alumno: IAlumno) : Observable<Alumno> {
    return this.httpClient.post<Alumno>(BACKEND_URI + '/alumnos', alumno);
  }

  editarAlumno(id: number, alumno: IAlumno) : Observable<Alumno> {
    return this.httpClient.put<Alumno>(BACKEND_URI + '/alumnos/' + id, alumno);
  }
/*
  eliminarAlumno(id: number) : Observable<void> {
    return this.httpClient.delete<void>(BACKEND_URI + '/alumnos/' + id);
  }
*/
  obtenerTodosAlumnos() : Observable<Alumno[]> {
    return this.httpClient.get<Alumno[]>(BACKEND_URI + '/alumnos');
  }

  obtenerAlumno(dni: string) : Observable<Alumno> {
      return this.httpClient.get<Alumno>(BACKEND_URI + '/alumnos/buscar?dni=' + dni);
  }

  obtenerAlumnoPorId(id: number) : Observable<Alumno> {
      return this.httpClient.get<Alumno>(BACKEND_URI + '/alumnos/' + id);
  }

}