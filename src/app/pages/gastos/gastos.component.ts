import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Gasto, GastoImpl } from '../../entities/gasto';
import { GastoService } from '../../service/gasto.service';
import { CommonModule } from '@angular/common';
import { FormGastosComponent } from './form-gastos/form-gastos.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { color } from 'html2canvas/dist/types/css/types/color';
import { AlertaService } from '../../service/alerta.service';
import { FormsModule } from '@angular/forms';


interface TrimestreGasto {
  nombre: string;
  total: number;
  porcentaje: number;
  color: string;
}
interface MesGasto {
  nombre: string;
  total: number;
  porcentaje: number;
  color: string;
}

@Component({
  selector: 'app-gastos',
  imports: [CommonModule, FormsModule],
  templateUrl: './gastos.component.html',
  styleUrl: './gastos.component.css'
})
export class GastosComponent {

  anyoActual: number = new Date().getFullYear();
  gastos?: Gasto[];

  trimestre?: TrimestreGasto[];
  mes?: MesGasto[] = [];
  modoGrid: boolean = true;
  
  paginaActual: number = 1;
  mesesPorPagina: number = 4;

  constructor(private modalService: NgbModal, private gastosService: GastoService, private alertaService: AlertaService) {}

  ngOnInit() {
    this.actualizarGastos();
  }

  actualizarGastos() {
    this.gastosService.obtenerTodosGastos().subscribe((gastosAux) => {
      console.log("Gastos recibidos ==>",gastosAux);
      this.gastos = gastosAux;
      this.actualizarListaTrimestre();
    });
  }

  nuevoGasto() {
    let ref = this.modalService.open(FormGastosComponent);
    ref.componentInstance.gasto = {id: 0, fechagasto: null, cantidadgasto: 0, descripcion: ''};
    ref.result.then((gastoAux) => {
      this.gastosService.aniadirGasto(GastoImpl.gastoToIGasto(gastoAux)).subscribe({
        next: (gastoRes) => {
          console.log("Gasto añadido correctamente ==>",gastoRes);
          this.actualizarGastos();
        },
        error: (e) => {
          this.alertaService.mostrar('No se ha podido añadir el grupo correctamente','danger')
        }
      })
    })
  }

  actualizarListaTrimestre() {
    /** Trimestre */
    const trimestreCount: { [clave: string]: number } = {
      'Trimestre 1 (Sep-Nov)': 0,
      'Trimestre 2 (Dic-Feb)': 0,
      'Trimestre 3 (Mar-May)': 0,
      'Trimestre 4 (Jun-Ago)': 0,
    };
    const anyo = new Date().getFullYear();

    /** Mes */
    const nombreMes = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre',
      'Diciembre'
    ]
    const mesCount : { [clave: string]: number} = nombreMes.reduce((acc, mes) => {
      acc[mes] = 0;
      return acc;
    }, {} as {[clave:string]:number});

    const totalGeneral = this.gastos?.reduce((acc, g) => {
      if (!g.fechagasto) return acc;

      const fecha = g.fechagasto instanceof Date
        ? g.fechagasto
        : new Date(g.fechagasto);

      if (isNaN(fecha.getTime())) return acc;
      if(fecha.getFullYear() != anyo) return acc;

      return acc + g.cantidadgasto
    }, 0) || 1;

    for (const gasto of this.gastos || []) {
      if (!gasto.fechagasto) continue;

      const fecha = gasto.fechagasto instanceof Date
        ? gasto.fechagasto
        : new Date(gasto.fechagasto);

      if (isNaN(fecha.getTime())) continue;
      if (fecha.getFullYear() != anyo) continue;

      const mes = fecha.getMonth() + 1;

      if ([9, 10, 11].includes(mes)) trimestreCount['Trimestre 1 (Sep-Nov)'] += gasto.cantidadgasto;
      else if ([12, 1, 2].includes(mes)) trimestreCount['Trimestre 2 (Dic-Feb)'] += gasto.cantidadgasto;
      else if ([3, 4, 5].includes(mes)) trimestreCount['Trimestre 3 (Mar-May)'] += gasto.cantidadgasto;
      else if ([6, 7, 8].includes(mes)) trimestreCount['Trimestre 4 (Jun-Ago)'] += gasto.cantidadgasto;

      const nombre = nombreMes[mes - 1];
      mesCount[nombre] += gasto.cantidadgasto;
    }

    this.trimestre = Object.entries(trimestreCount).map(([nombre, total]) => {
      const listaColor = ['bg-info', 'bg-warning', 'bg-danger'];
      let index = 0;
      const porcDecimal = totalGeneral > 0 ? (total / totalGeneral)*10 : 0;
      if(porcDecimal >= 8) index = 2;
      else if(porcDecimal >= 6) index = 1;

      return{
        nombre,
        total,
        porcentaje: porcDecimal * 10,
        color: listaColor[index],
      };
    });

    this.mes = Object.entries(mesCount).map(([nombre, total]) => {
      const listaColor = ['bg-info', 'bg-warning', 'bg-danger'];
      let index = 0;
      const porcDecimal = totalGeneral > 0 ? (total / totalGeneral)*10 : 0;
      if(porcDecimal >= 8) index = 2;
      else if(porcDecimal >= 6) index = 1;

      return {
        nombre,
        total,
        porcentaje: porcDecimal * 10,
        color: listaColor[index]
      }
    })
    console.log("listado ==>",this.trimestre);
  }

  cambiarPagina(pag: number) {
    if(pag < 1) pag = 3;
    if(pag > 3) pag = 1;
    this.paginaActual = pag;
  }

  getmesesPaginados(pagina: number = this.paginaActual) {
    const start = (pagina - 1) * this.mesesPorPagina;
    const end = start + this.mesesPorPagina;
    return this.mes?.slice(start,end);
  }

  getTotalPaginas() {
    return Math.ceil((this.mes?.length || 0) / this.mesesPorPagina);
  }

}
