import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Gasto, GastoImpl } from '../../entities/gasto';
import { GastoService } from '../../service/gasto.service';
import { CommonModule } from '@angular/common';
import { FormGastosComponent } from './form-gastos/form-gastos.component';

@Component({
  selector: 'app-gastos',
  imports: [CommonModule],
  templateUrl: './gastos.component.html',
  styleUrl: './gastos.component.css'
})
export class GastosComponent {

  gastos?: Gasto[];

  constructor(private modalService: NgbModal, private gastosService: GastoService) {}

  ngOnInit() {
    this.actualizarGastos();
  }

  actualizarGastos() {
    this.gastosService.obtenerTodosGastos().subscribe((gastosAux) => {
      console.log("Gastos recibidos ==>",gastosAux);
      this.gastos = gastosAux;
    });
  }

  nuevoGasto() {
    let ref = this.modalService.open(FormGastosComponent);
    ref.componentInstance.gasto = {id: 0, fechagasto: null, cantidadgasto: 0, descripcion: ''};
    ref.result.then((gastoAux) => {
      this.gastosService.aniadirGasto(GastoImpl.gastoToIGasto(gastoAux)).subscribe((gastoRes) => {
        console.log("Gasto añadido correctamente ==>",gastoRes);
        this.actualizarGastos();
      })
    })
  }

  eliminarGasto(gasto: Gasto) {

  }

}
