import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormAlumnoComponent } from './form-alumno/form-alumno.component';
import { Alumno, AlumnoImpl } from '../../entities/alumno';
import { Grupo } from '../../entities/grupo';
import { AlumnoService } from '../../service/alumno.service';
import { GrupoService } from '../../service/grupo.service';
import { CommonModule } from '@angular/common';
import { AlertaComponent } from '../../utils/alerta/alerta.component';
import { AlertaService } from '../../service/alerta.service';


export interface Alumnos {
  id: number; name: string; email: string; age: number;
}

@Component({
  selector: 'app-alumnos',
  imports: [FormsModule, CommonModule],
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.css'
})
export class AlumnosComponent {

  alumnos?: Alumno[];
  grupos?: Grupo[];
  alumnosFiltro?: Alumno[];

  dniFilter: string = '';
  selectedGroup: string = '';
  activo: number = -1;

  @ViewChild('alerta') alertaComponent!: AlertaComponent;

  constructor(private modalService: NgbModal, private alumnoService: AlumnoService, private grupoService: GrupoService,
    private alertaService: AlertaService
  ) {}

  ngOnInit(): void {
    this.actualizarAlumnos();
    this.obtenerGrupos();
  }

  actualizarAlumnos() {
    // Actualiza lista alumnos
    this.alumnoService.obtenerTodosAlumnos().subscribe((alumnosRes) => {
      console.log("Alumnos buscados ==>",alumnosRes);
      this.alumnos = alumnosRes;
      this.alumnosFiltro = alumnosRes;
    });
  }

  obtenerGrupos() {
    this.grupoService.obtenerTodosGrupos().subscribe((gruposRes) => {
      console.log("Grupos buscados ==>",gruposRes);
      this.grupos = gruposRes;
    })
  }

  buscar() {
    const activo = Number(this.activo);
    this.alumnosFiltro = this.alumnos?.filter(alumno => {
      const grupo = this.grupos?.find(g => g.id === alumno.grupo_id);
      const coincideDNI = this.dniFilter === '' || alumno.dni.includes(this.dniFilter);
      const coincideGrupo = this.selectedGroup === '' || grupo?.nombregrupo.includes(this.selectedGroup);
      const filtroActivo = activo === -1 || ((!activo)? alumno.activo : !alumno.activo);

      return coincideDNI && coincideGrupo && filtroActivo;
    }) || [];
  }

  nuevoAlumno() {
    let ref = this.modalService.open(FormAlumnoComponent, {size: 'xl'});
    ref.componentInstance.accion = "Añadir";
    ref.componentInstance.alumno = {id: 0, dni: '', nombre: '', apellido1: '', apellido2: '', fechanacimiento: new Date(), profesion: '',
      direccion: '', poblacion: '', provincia: '', codigopostal: '', telefono1: '', telefono2: '', fechaalta: new Date(), 
      fechabaja: null, condicion: '', precio: 0, activo: true, bonos: false, clases: false, mensualidad:false, grupo_id: 0
    }
    ref.result.then((alumnoAux) => {
      console.log("Alumno nuevo creado =", alumnoAux);
      this.alumnoService.aniadirAlumno(AlumnoImpl.alumnoToIAlumno(alumnoAux)).subscribe({
        next: (alumnoRes) => {
          console.log("Alumno creado correctamente ==>",alumnoRes);
          this.actualizarAlumnos();
        },
        error: (e) => {
          this.alertaService.mostrar('No se ha podido crear correctamente el alumno','danger');
        }
      });
    });

  }

  editarAlumno(alumno: Alumno) {
    let ref = this.modalService.open(FormAlumnoComponent, {size: 'xl'});
    ref.componentInstance.accion = "Editar";
    ref.componentInstance.alumno = {id: alumno.id, dni: alumno.dni, nombre: alumno.nombre, apellido1: alumno.apellido1, 
      apellido2: alumno.apellido2, fechanacimiento: alumno.fechanacimiento, profesion: alumno.profesion,
      direccion: alumno.direccion, poblacion: alumno.poblacion, provincia: alumno.provincia, codigopostal: alumno.codigopostal, 
      telefono1: alumno.telefono1, telefono2: alumno.telefono2, fechaalta: alumno.fechaalta, fechabaja: alumno.fechabaja, 
      condicion: alumno.condicion, precio: alumno.precio, activo: alumno.activo, bonos: alumno.bonos, clases: alumno.clases, 
      mensualidad: alumno.mensualidad, grupo_id: alumno.grupo_id
    }
    ref.result.then((alumnoAux) => {
      //Actualiza alumno
      this.alumnoService.editarAlumno(alumno.id,AlumnoImpl.alumnoToIAlumno(alumnoAux)).subscribe({
        next: (alumnoRes) => {
          console.log("Alumno modificado correctamente ==>",alumnoRes);
          this.actualizarAlumnos();
        },
        error: (e) => {
          this.alertaService.mostrar('No se ha podido actualizar correctamente el alumno','danger');
        }
      })
    });
  }

  bajaAlumno(alumno: Alumno) {
    alumno.activo = false;
    alumno.fechabaja = new Date();
    this.alumnoService.editarAlumno(alumno.id,AlumnoImpl.alumnoToIAlumno(alumno)).subscribe({
        next: (alumnoRes) => {
          console.log("Alumno modificado ==>",alumnoRes);
          this.actualizarAlumnos();
        },
        error: (e) => {
          this.alertaService.mostrar('No se ha podido dar de baja correctamente el alumno','danger');
        }
      })
    // Añadir fecha baja actual

  }

  altaAlumno(alumno: Alumno) {
    alumno.activo = true;
    alumno.fechabaja = null;
    this.alumnoService.editarAlumno(alumno.id,AlumnoImpl.alumnoToIAlumno(alumno)).subscribe({
        next: (alumnoRes) => {
          console.log("Alumno modificado ==>",alumnoRes);
          this.actualizarAlumnos();
        },
        error: (e) => {
          this.alertaService.mostrar('No se ha podido dar de alta correctamente el alumno','danger');
        }
      })
    // Añadir fecha alta actual 
    // Borrar fecha baja actual
  }

}
