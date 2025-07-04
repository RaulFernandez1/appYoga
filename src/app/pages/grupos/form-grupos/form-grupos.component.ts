import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Grupo } from '../../../entities/grupo';
import { Nivel } from '../../../entities/nivel';
import { NivelService } from '../../../service/nivel.service';

@Component({
  selector: 'app-form-grupos',
  imports: [FormsModule, CommonModule],
  templateUrl: './form-grupos.component.html',
  styleUrl: './form-grupos.component.css'
})
export class FormGruposComponent {

  grupo: Grupo = {id: 0, nombregrupo: '', horario: '', nivel: ''};
  niveles?: Nivel[];
  selectedNivel: string = '';
  accion?: 'Añadir' | 'Editar';
  errorMensaje: string = '';
  
  constructor(public modal: NgbActiveModal, private nivelService: NivelService) {}

  ngOnInit() {
    this.nivelService.obtenerTodosNivels().subscribe((nivelesAux) => {
      console.log("Niveles obtenidos ==>",nivelesAux);
      this.niveles = nivelesAux;
    })
  }

  guardarNivel(): void {
    this.limpiarMensajes();
    if(!this.isNivelValid()) {
        this.errorMensaje = 'Por favor, complete todos los campos';
        return;
      }
    this.modal.close(this.grupo);
  }
  limpiarMensajes(): void {
    this.errorMensaje = '';
  }

  isNivelValid(): boolean {
    return this.grupo.nombregrupo != ''
      && this.grupo.horario != ''
      && this.grupo.nivel != '';
  }
  
}
