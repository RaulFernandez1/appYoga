import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Gasto } from '../../../entities/gasto';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GastoService } from '../../../service/gasto.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-form-gastos',
  imports: [FormsModule, CommonModule],
  templateUrl: './form-gastos.component.html',
  styleUrl: './form-gastos.component.css'
})
export class FormGastosComponent {

  gasto: Gasto = {id: 0, fechagasto: null, cantidadgasto: 0, descripcion: ''};
  errorMensaje: string = '';

  constructor(public modal: NgbActiveModal, private gastoService: GastoService) {}

  async guardarGasto(): Promise<void> {
    this.limpiarMensajes();
    if(!this.isGastoValid()) {
        this.errorMensaje = 'Por favor, complete todos los campos';
        return;
    }

    const isAlreadyIn = await this.isAlreadyIn();
    if(isAlreadyIn) {
      this.errorMensaje = 'Gasto ya existente';
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

  async isAlreadyIn() : Promise<boolean> {
    if(!this.isGastoValid()) return true;

    try {
      const gastoRes = await firstValueFrom(this.gastoService.obtenerGasto(this.gasto.fechagasto ?? new Date(),this.gasto.descripcion,this.gasto.cantidadgasto));
      console.log('Gasto ya existe', gastoRes);
      return true;
    } catch (error: any) {
      if (error.status === 404) {
        return false;
      }
      console.error('Error inesperado', error);
      return true;
    }
  }

}
