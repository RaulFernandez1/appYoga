import { Component } from '@angular/core';
import { Grupo, GrupoImpl, IGrupo } from '../../entities/grupo';
import { GrupoService } from '../../service/grupo.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormAlumnoComponent } from '../alumnos/form-alumno/form-alumno.component';
import { FormGruposComponent } from './form-grupos/form-grupos.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertaService } from '../../service/alerta.service';
import { FormMensajeComponent } from '../alumnos/form-mensaje/form-mensaje.component';

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

  constructor(private modalService: NgbModal, private grupoService: GrupoService, private alertaService: AlertaService) {}

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
      this.grupoService.aniadirGrupo(GrupoImpl.grupoToIGrupo(grupoAux)).subscribe({
        next: (grupoRes) => {
          console.log('Grupo creado correctamente ==>',grupoRes);
          this.actualizarGrupos();
        },
        error: (e) => {
          this.alertaService.mostrar('No se ha podido crear correctamente el grupo','danger');
        }
      })
    });
  }

  editarGrupo(grupo: Grupo) {
    let ref = this.modalService.open(FormGruposComponent);
    ref.componentInstance.accion = 'Editar';
    ref.componentInstance.grupo = {id: grupo.id, nombregrupo: grupo.nombregrupo, horario: grupo.horario, nivel: grupo.nivel};
    ref.result.then((grupoAux) => {
      console.log('Grupo modificado =>',grupoAux);
      this.grupoService.editarGrupo(grupo.id, GrupoImpl.grupoToIGrupo(grupoAux)).subscribe({
        next: (grupoRes) => {
          console.log('Grupo modificado correctamente ==>',grupoRes);
          this.actualizarGrupos();
        },
        error: (e) => {
          this.alertaService.mostrar('No se ha podido modificar correctamente el grupo','danger');
        }
      })
    });
  }

  eliminarGrupo(grupo: Grupo) {
    this.grupoService.eliminarGrupo(grupo.id).subscribe({
      next: (grupoRes) => {
        console.log('Grupo eliminado',grupoRes);
        this.actualizarGrupos();
      },
      error: (e) => {
        this.alertaService.mostrar('No se ha podido eliminar el grupo con exito', 'danger');
      }
    });
  }

  enviarMensaje(grupo: Grupo) {
    let ref = this.modalService.open(FormMensajeComponent);
    ref.componentInstance.mensaje = {asunto: '', contenido: '', fechaEnvio: new Date(), leido: false, isgrupo: true, 
      isimportante: false, alumno_id: 0 ,grupo:grupo.id};
    ref.componentInstance.grupo = grupo;
    ref.result.then((mensajeAux) => {
      console.log('Mensaje resultante alumno ==>',mensajeAux);
      /*
      this.mensajeService.aniadirMensaje(mensajeAux).subscribe({
        next: (mensajeRes) => {
          console.log('Mensaje enviado correctamente ==>',mensajeRes);
        },
        error: (e) => {
          this.alertaService.mostrar('No se ha podido enviar el mensaje correctamente','danger');
        }
      })*/
    });
  }

}

