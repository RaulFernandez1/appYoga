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
import { Alumno } from '../../entities/alumno';
import { AlumnoService } from '../../service/alumno.service';
import { Nivel } from '../../entities/nivel';
import { NivelService } from '../../service/nivel.service';

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

  alumnos?: Alumno[];

  selectedNivel: string = '';
  niveles?: Nivel[];

  nombreGrupo: string = '';
  limiteGrupo: number = 15;

  constructor(private modalService: NgbModal, private grupoService: GrupoService, private alumnoService: AlumnoService,
    private nivelService: NivelService, private alertaService: AlertaService) {}

  ngOnInit(): void {
    this.actualizarGrupos();
    this.alumnoService.obtenerTodosAlumnos().subscribe({
      next: (alumnoRes) => {
        this.alumnos = alumnoRes;
      },
      error: (e) => {
        this.alertaService.mostrar('No se ha podido encontrar el listado de alumnos','warning');
      }
    });
    this.nivelService.obtenerTodosNivels().subscribe({
      next: (nivelRes) => {
        this.niveles = nivelRes;
      },
      error: (e) => {
        this.alertaService.mostrar('No se ha podido encontrar el listado de niveles','warning');
      }
    });
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
        const filtroGrupo = this.nombreGrupo === '' || grupo.nombregrupo.includes(this.nombreGrupo);
        const filtroNivel = this.selectedNivel === '' || grupo.nivel.includes(this.selectedNivel);
        return filtroGrupo && filtroNivel;
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
    if(this.getAlumnosInGrupo(grupo) == 0) {
      this.grupoService.eliminarGrupo(grupo.id).subscribe({
        next: (grupoRes) => {
          console.log('Grupo eliminado',grupoRes);
          this.actualizarGrupos();
        },
        error: (e) => {
          this.alertaService.mostrar('No se ha podido eliminar el grupo con exito', 'danger');
        }
      });
    } else {
      this.alertaService.mostrar('Hay alumnos en este grupo. Eliminalos primero para poder eliminar el grupo.','warning');
    }
  }

  enviarMensaje(grupo: Grupo) {
    const alumnosGrupo = this.alumnos?.filter(a => a.grupo_id === grupo.id) || [];
    if(alumnosGrupo?.length != 0) {
      let ref = this.modalService.open(FormMensajeComponent);
      ref.componentInstance.mensaje = {asunto: '', contenido: '', fechaEnvio: new Date(), leido: false, isgrupo: true, 
        isimportante: false, alumno_id: 0 ,grupo:grupo.id};
      ref.componentInstance.grupo = grupo;
      ref.result.then((mensajeAux) => {
        console.log('Mensaje resultante alumno ==>',mensajeAux);
        alumnosGrupo.forEach(alumno => {
          
        });
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
    } else {
      this.alertaService.mostrar('No hay ningun alumno inscrito a este grupo','warning');
    }
  }

  getAlumnosInGrupo(grupo: Grupo): number {
    const alumnosGrupo = this.alumnos?.filter(a => a.grupo_id === grupo.id).length || 0;
    return alumnosGrupo;
  }

}

