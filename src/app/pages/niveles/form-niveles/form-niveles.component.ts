import { Component } from '@angular/core';
import { Nivel, NivelImpl } from '../../../entities/nivel';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-niveles',
  imports: [FormsModule, CommonModule],
  templateUrl: './form-niveles.component.html',
  styleUrl: './form-niveles.component.css'
})
export class FormNivelesComponent {

  nivel: Nivel = {id:0, nombrenivel: "", condicion: "", preciomensualidad: 0, preciobonos: 0, precioclases: 0};
  accion?: 'Añadir' | 'Editar';
  errorMensaje: string = '';
  
  constructor(public modal: NgbActiveModal) {}

  guardarNivel(): void {
    this.limpiarMensajes();
    if(!this.isNivelValid()) {
        this.errorMensaje = 'Por favor, complete todos los campos';
        return;
      }
    this.modal.close(this.nivel);
  }
  limpiarMensajes(): void {
    this.errorMensaje = '';
  }

  isNivelValid(): boolean {
    return this.nivel.nombrenivel != ""
      && this.nivel.condicion != ""
      && this.nivel.preciomensualidad != 0
      && this.nivel.preciobonos != 0
      && this.nivel.precioclases != 0;
  }

}
