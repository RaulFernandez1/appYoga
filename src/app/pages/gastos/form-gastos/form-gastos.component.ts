import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Gasto } from '../../../entities/gasto';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form-gastos',
  imports: [FormsModule, CommonModule],
  templateUrl: './form-gastos.component.html',
  styleUrl: './form-gastos.component.css'
})
export class FormGastosComponent {

  gasto: Gasto = {id: 0, fechagasto: null, cantidadgasto: 0, descripcion: ''};
  errorMensaje: string = '';

  constructor(public modal: NgbActiveModal) {}

  guardarGasto(): void {
    this.limpiarMensajes();
    if(!this.isGastoValid()) {
        this.errorMensaje = 'Por favor, complete todos los campos';
        return;
      }
    this.modal.close(this.gasto);
  }
  limpiarMensajes(): void {
    this.errorMensaje = '';
  }

  isGastoValid(): boolean {
    return this.gasto.fechagasto != null
      && this.gasto.descripcion != ''
      && this.gasto.cantidadgasto != 0;
  }

}
