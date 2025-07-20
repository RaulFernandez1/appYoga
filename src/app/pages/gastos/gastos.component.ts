import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Gasto, GastoImpl } from '../../entities/gasto';
import { GastoService } from '../../service/gasto.service';
import { CommonModule } from '@angular/common';
import { FormGastosComponent } from './form-gastos/form-gastos.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { color } from 'html2canvas/dist/types/css/types/color';
import { AlertaService } from '../../service/alerta.service';


interface TrimestreGasto {
  nombre: string;
  total: number;
  porcentaje: number;
  color: string;
}

@Component({
  selector: 'app-gastos',
  imports: [CommonModule],
  templateUrl: './gastos.component.html',
  styleUrl: './gastos.component.css',
  animations: [
    trigger('progress', [
      transition(':enter', [
        style({color: 'blue'}),
        animate('300ms ease-out', style({ color: 'white' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ color: 'red' }))
      ])
    ])
  ]
})
export class GastosComponent {

  anyoActual: number = new Date().getFullYear();
  gastos?: Gasto[];
  trimestre?: TrimestreGasto[];

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
    const totalGeneral = this.gastos?.reduce((acc, g) => acc + g.cantidadgasto, 0) || 1;
    const acumulados: { [clave: string]: number } = {
      'Trimestre 1 (Sep-Nov)': 0,
      'Trimestre 2 (Dic-Feb)': 0,
      'Trimestre 3 (Mar-May)': 0,
      'Trimestre 4 (Jun-Ago)': 0,
    };
    const anyo = new Date().getFullYear();

    for (const gasto of this.gastos || []) {
      if (!gasto.fechagasto) continue;

      const fecha = gasto.fechagasto instanceof Date
        ? gasto.fechagasto
        : new Date(gasto.fechagasto);

      if (isNaN(fecha.getTime())) continue;
      if (fecha.getFullYear() != anyo) continue;

      const mes = fecha.getMonth() + 1;

      if ([9, 10, 11].includes(mes)) acumulados['Trimestre 1 (Sep-Nov)'] += gasto.cantidadgasto;
      else if ([12, 1, 2].includes(mes)) acumulados['Trimestre 2 (Dic-Feb)'] += gasto.cantidadgasto;
      else if ([3, 4, 5].includes(mes)) acumulados['Trimestre 3 (Mar-May)'] += gasto.cantidadgasto;
      else if ([6, 7, 8].includes(mes)) acumulados['Trimestre 4 (Jun-Ago)'] += gasto.cantidadgasto;
    }

    this.trimestre = Object.entries(acumulados).map(([nombre, total]) => {
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
    console.log("listado ==>",this.trimestre);
  }

}
