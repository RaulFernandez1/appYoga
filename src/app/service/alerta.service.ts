import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Alerta {
  mensaje: string;
  tipo?: 'success' | 'danger' | 'warning' | 'info';
  duracion?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AlertaService {
  private alertaSubject = new Subject<Alerta>();
  alerta$ = this.alertaSubject.asObservable();


  mostrar(mensaje: string, tipo: 'success' | 'danger' | 'warning' | 'info' = 'info', duracion = 3000) {
    this.alertaSubject.next({mensaje,tipo,duracion}); 
  }

}
