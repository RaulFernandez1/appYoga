import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Grupo } from '../../../entities/grupo';
import { Nivel } from '../../../entities/nivel';
import { NivelService } from '../../../service/nivel.service';
import { GrupoService } from '../../../service/grupo.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-form-grupos',
  imports: [FormsModule, CommonModule],
  templateUrl: './form-grupos.component.html',
  styleUrl: './form-grupos.component.css'
})
export class FormGruposComponent {
  @ViewChild('form') formRef!: NgForm;
  formSubmitted: boolean = false;

  grupo: Grupo = {id: 0, nombregrupo: '', horario: '', nivel: ''};
  niveles?: Nivel[];
  selectedNivel: string = '';
  accion?: 'Añadir' | 'Editar';
  errorMensaje: string = '';
  
  constructor(public modal: NgbActiveModal, private nivelService: NivelService, private grupoService: GrupoService) {}

  ngOnInit() {
    this.nivelService.obtenerTodosNivels().subscribe((nivelesAux) => {
      console.log("Niveles obtenidos ==>",nivelesAux);
      this.niveles = nivelesAux;
    })
  }

  async guardarNivel(): Promise<void> {
    this.formSubmitted = true;
    this.limpiarMensajes();

    if (!this.formRef.valid) {
      this.errorMensaje = 'Por favor, complete todos los campos correctamente.';
      return;
    }

    if(!this.isGrupoValid()) {
      this.errorMensaje = 'Por favor, complete todos los campos';
      return;
    }

    const alreadyIn = await this.alreadyIn();
    if(alreadyIn && this.accion === 'Añadir') {
      this.errorMensaje = 'Grupo ya existente';
      return;
    }

    this.modal.close(this.grupo);
  }
  limpiarMensajes(): void {
    this.errorMensaje = '';
  }

  isGrupoValid(): boolean {
    return this.grupo.nombregrupo != ''
      && this.grupo.horario != ''
      && this.grupo.nivel != '';
  }

  async alreadyIn(): Promise<boolean> {
    if(this.grupo.nombregrupo == '') return true;

    try {
      const grupoRes = await firstValueFrom(this.grupoService.obtenerGrupo(this.grupo.nombregrupo));
      console.log('Grupo ya existe', grupoRes);
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
