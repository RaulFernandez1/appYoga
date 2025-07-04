import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_URI } from '../config/config';
import { Gasto, IGasto } from '../entities/gasto';

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  constructor(private httpClient: HttpClient) { }
  
  aniadirGasto(gasto: IGasto) : Observable<Gasto> {
    return this.httpClient.post<Gasto>(BACKEND_URI + '/gastos', gasto);
  }
/*
  editarGasto(id: number, gasto: IGasto) : Observable<Gasto> {
    return this.httpClient.put<Gasto>(BACKEND_URI + '/gastos/' + id, gasto);
  }
*/
  eliminarGasto(id: number) : Observable<void> {
    return this.httpClient.delete<void>(BACKEND_URI + '/gastos/' + id);
  }

  obtenerTodosGastos() : Observable<Gasto[]> {
    return this.httpClient.get<Gasto[]>(BACKEND_URI + '/gastos');
  }

  obtenerGasto(fechaGasto: Date, descripcion: string, cantidad: number) : Observable<Gasto> {
      return this.httpClient.get<Gasto>(BACKEND_URI + '/gastos/buscar?fechagasto=' + fechaGasto + '&descripcion=' + descripcion + 
        '&cantidadgasto=' + cantidad
      );
  }



}