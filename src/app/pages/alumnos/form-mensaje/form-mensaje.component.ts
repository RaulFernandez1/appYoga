import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IMensaje } from '../../../entities/mensaje';
import { Alumno } from '../../../entities/alumno';
import { Grupo } from '../../../entities/grupo';

@Component({
  selector: 'app-form-mensaje',
  imports: [FormsModule, CommonModule],
  templateUrl: './form-mensaje.component.html',
  styleUrl: './form-mensaje.component.css'
})
export class FormMensajeComponent {
  @ViewChild('form') formRef!: NgForm;
  formSubmitted: boolean = false;

  mensaje: IMensaje = {asunto: '', contenido: '', fechaEnvio: new Date(), leido: false, isgrupo: false, isimportante: false,
     alumno_id: -1, grupo: 0};
  alumno: Alumno = {id: 0, dni: '', nombre: '', apellido1: '', apellido2: '', fechanacimiento: new Date(), profesion: '',
    direccion: '', poblacion: '', provincia: '', codigopostal: '', correo: '', telefono1: '', telefono2: '', fechaalta: new Date(), 
    fechabaja: null, condicion: '', precio: 0, activo: true, bonos: false, clases: false, mensualidad: false, grupo_id: 0
  }
  grupo: Grupo = {id: 0, nombregrupo: '', horario: '', nivel: ''};
  errorMensaje: string = '';

  constructor(public modal: NgbActiveModal) {}

  guardarMensaje() {
    this.formSubmitted = true;
    this.limpiarMensajes();

    if (!this.formRef.valid) {
      this.errorMensaje = 'Por favor, complete todos los campos correctamente.';
      return;
    }

    if(!this.isMensajeValid()) {
        this.errorMensaje = 'Por favor, complete todos los campos';
        return;
    }

    this.mensaje.fechaEnvio = new Date();
    this.mensaje.leido = false;

    this.modal.close(this.mensaje);
  }
  limpiarMensajes(): void {
    this.errorMensaje = '';
  }

  isMensajeValid(): boolean {
    return this.mensaje.asunto != ''
      && this.mensaje.contenido != ''
      && this.mensaje.alumno_id != -1;
  }

}
