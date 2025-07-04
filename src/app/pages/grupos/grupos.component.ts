import { Component } from '@angular/core';
import { Grupo, GrupoImpl, IGrupo } from '../../entities/grupo';
import { GrupoService } from '../../service/grupo.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormAlumnoComponent } from '../alumnos/form-alumno/form-alumno.component';
import { FormGruposComponent } from './form-grupos/form-grupos.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-grupos',
  imports: [CommonModule, FormsModule],
  templateUrl: './grupos.component.html',
  styleUrl: './grupos.component.css'
})
export class GruposComponent {
  hovered: number | null = null;
  
  grupos?: Grupo[];
  gruposRes?: Grupo[];

  nombreGrupo: string = '';

  constructor(private modalService: NgbModal, private grupoService: GrupoService) {}

  ngOnInit(): void {
    this.actualizarGrupos();
  }

  actualizarGrupos() {
    this.grupoService.obtenerTodosGrupos().subscribe((gruposAux) => {
      console.log('Obtencion de grupos ==>',gruposAux);
      this.grupos = gruposAux;
      this.gruposRes = gruposAux;
    })
  }

  buscar() {
    this.gruposRes = this.grupos?.filter(grupo => {
        return this.nombreGrupo === '' || grupo.nombregrupo.includes(this.nombreGrupo);
    });
  }

  nuevoGrupo() {
    let ref = this.modalService.open(FormGruposComponent);
    ref.componentInstance.accion = 'Añadir';
    ref.componentInstance.grupo = {id: 0, nombregrupo: '', horario: '', nivel: ''};
    ref.result.then((grupoAux) => {
      console.log('Grupo creado =>',grupoAux);
      this.grupoService.aniadirGrupo(GrupoImpl.grupoToIGrupo(grupoAux)).subscribe((grupoRes) => {
        console.log('Grupo creado correctamente ==>',grupoRes);
        this.actualizarGrupos();
      })
    });
  }

  editarGrupo(grupo: Grupo) {
    let ref = this.modalService.open(FormGruposComponent);
    ref.componentInstance.accion = 'Editar';
    ref.componentInstance.grupo = {id: grupo.id, nombregrupo: grupo.nombregrupo, horario: grupo.horario, nivel: grupo.nivel};
    ref.result.then((grupoAux) => {
      console.log('Grupo modificado =>',grupoAux);
      this.grupoService.editarGrupo(grupo.id, GrupoImpl.grupoToIGrupo(grupoAux)).subscribe((grupoRes) => {
        console.log('Grupo modificado correctamente ==>',grupoRes);
        this.actualizarGrupos();
      })
    });
  }

  eliminarGrupo(grupo: Grupo) {
    this.grupoService.eliminarGrupo(grupo.id).subscribe((grupoRes) => {
      console.log('Grupo eliminado',grupoRes);
      this.actualizarGrupos();
    });
  }
}

