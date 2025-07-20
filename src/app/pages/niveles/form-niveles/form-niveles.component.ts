import { Component, ViewChild } from '@angular/core';
import { Nivel, NivelImpl } from '../../../entities/nivel';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { NivelService } from '../../../service/nivel.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-form-niveles',
  imports: [FormsModule, CommonModule],
  templateUrl: './form-niveles.component.html',
  styleUrl: './form-niveles.component.css'
})
export class FormNivelesComponent {
  @ViewChild('form') formRef!: NgForm;
  formSubmitted: boolean = false;

  nivel: Nivel = {id:0, nombrenivel: "", condicion: "", preciomensualidad: 0, preciobonos: 0, precioclases: 0};
  accion?: 'Añadir' | 'Editar';
  errorMensaje: string = '';
  
  constructor(public modal: NgbActiveModal, private nivelService: NivelService) {}

  async guardarNivel(): Promise<void> {
    this.formSubmitted = true;
    this.limpiarMensajes();

    if (!this.formRef.valid) {
      this.errorMensaje = 'Por favor, complete todos los campos correctamente.';
      return;
    }


    if(!this.isNivelValid()) {
        this.errorMensaje = 'Por favor, complete todos los campos';
        return;
    }

    const alreadyIn = await this.alreadyIn();
    if(alreadyIn && this.accion === 'Añadir') {
      this.errorMensaje = 'Nivel ya existente'
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

  async alreadyIn(): Promise<boolean> {
    if(this.nivel.nombrenivel === '' || this.nivel.condicion === '') return true;

    try {
      const nivelRes = await firstValueFrom(this.nivelService.obtenerNivel(this.nivel.nombrenivel,this.nivel.condicion));
      console.log('Nivel ya existe', nivelRes);
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
