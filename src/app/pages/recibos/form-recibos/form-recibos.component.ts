import { Component } from '@angular/core';
import { ReciboRequest } from '../../../entities/recibo';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-recibos',
  imports: [FormsModule, CommonModule],
  templateUrl: './form-recibos.component.html',
  styleUrl: './form-recibos.component.css'
})
export class FormRecibosComponent {
  recibo: ReciboRequest = {fechaemision: null};
  errorMensaje = '';

  constructor(public modal: NgbActiveModal) {}

  guardarRecibo(): void {
    this.limpiarMensajes();
    if(!this.isReciboValid()) {
        this.errorMensaje = 'Por favor, complete todos los campos';
        return;
      }
    this.modal.close(this.recibo);
  }
  limpiarMensajes(): void {
    this.errorMensaje = '';
  }

  isReciboValid(): boolean {
    return this.recibo.fechaemision != null;
  }
}
