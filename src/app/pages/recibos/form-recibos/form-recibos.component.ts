import { Component, ViewChild } from '@angular/core';
import { ReciboRequest } from '../../../entities/recibo';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-recibos',
  imports: [FormsModule, CommonModule],
  templateUrl: './form-recibos.component.html',
  styleUrl: './form-recibos.component.css'
})
export class FormRecibosComponent {
  @ViewChild('form') formRef!: NgForm;
  formSubmitted: boolean = false;

  recibo: ReciboRequest = {fechaemision: null};
  errorMensaje = '';

  constructor(public modal: NgbActiveModal) {}

  guardarRecibo(): void {
    this.formSubmitted = true;
    this.limpiarMensajes();

    if (!this.formRef.valid) {
      this.errorMensaje = 'Por favor, complete todos los campos correctamente.';
      return;
    }
    
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
