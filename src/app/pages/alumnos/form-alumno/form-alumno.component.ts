import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Alumno, AlumnoImpl } from '../../../entities/alumno';
import { NivelService } from '../../../service/nivel.service';
import { GrupoService } from '../../../service/grupo.service';
import { Nivel } from '../../../entities/nivel';
import { Grupo } from '../../../entities/grupo';
import { firstValueFrom, forkJoin } from 'rxjs';
import { AlumnoService } from '../../../service/alumno.service';

@Component({
  selector: 'app-form-alumno',
  imports: [FormsModule, CommonModule],
  templateUrl: './form-alumno.component.html',
  styleUrl: './form-alumno.component.css'
})
export class FormAlumnoComponent {
  errorMensaje: string = '';
  accion?: 'Añadir' | 'Editar';
  alumno: Alumno = {id: 0, dni: '', nombre: '', apellido1: '', apellido2: '', fechanacimiento: new Date(), profesion: '',
    direccion: '', poblacion: '', provincia: '', codigopostal: '', telefono1: '', telefono2: '', fechaalta: new Date(), 
    fechabaja: null, condicion: '', precio: 0, activo: true, bonos: false, clases: false, mensualidad: false, grupo_id: 0
  }
  
  alumnoTipoPago: string = '';
  niveles?: Nivel[];
  nivelSelected: string = '';
  grupos: Grupo[] = [];
  gruposRes?: Grupo[];

  constructor(public modal: NgbActiveModal, private nivelService: NivelService, private grupoService: GrupoService,
    private alumnoService: AlumnoService
  ) {}

  ngOnInit() {
    forkJoin({
    grupos: this.grupoService.obtenerTodosGrupos(),
    niveles: this.nivelService.obtenerTodosNivels(),
  }).subscribe(({ grupos, niveles }) => {
    this.gruposRes = grupos;
    this.niveles = niveles;

    // Obtener el grupo y nivel del alumno
    const grupoSeleccionado = this.gruposRes.find(g => g.id === this.alumno.grupo_id);
    this.nivelSelected = grupoSeleccionado?.nivel || ''; // Ajusta al nombre correcto

    this.onNivelChange(); // Para actualizar los grupos visibles si filtras por nivel

    // Tipo de pago
    if (this.alumno.mensualidad) this.alumnoTipoPago = 'mensualidad';
    else if (this.alumno.bonos) this.alumnoTipoPago = 'bonos';
    else if (this.alumno.clases) this.alumnoTipoPago = 'clases';

    this.actualizarPrecio();
  });
  }

  onNivelChange() {
    this.grupos = (this.gruposRes ?? []).filter(entity => entity.nivel === this.nivelSelected);
    this.actualizarPrecio();
  }

  async guardarAlumno(): Promise<void> {
    this.limpiarMensajes();
    console.log("El alumno es ==>",this.alumno);
    if(!this.isAlumnoValid()) {
        this.tipoPago();
        this.errorMensaje = 'Por favor, complete todos los campos';
        return;
    }

    const isAlreadyIn = await this.isAlreadyIn();
    if(isAlreadyIn && this.accion === 'Añadir') {
      this.errorMensaje = 'Alumno ya existente';
      return;
    }

    this.tipoPago();
    this.modal.close(this.alumno);
  }

  limpiarMensajes(): void {
    this.errorMensaje = '';
  }

  actualizarPrecio() {
    const nivel = this.niveles?.find(n => n.nombrenivel === this.nivelSelected);
    if(!nivel) {
      this.alumno.precio = 0;
      return;
    }

    switch (this.alumnoTipoPago) {
      case 'mensualidad':
        this.alumno.precio = nivel.preciomensualidad;
        break;
      case 'bonos':
        this.alumno.precio = nivel.preciobonos;
        break;
      case 'clases':
        this.alumno.precio = nivel.precioclases;
        break;
      default:
        this.alumno.precio = 0;
    }
  }

  tipoPago(): void {
    switch(this.alumnoTipoPago) {
      case 'bonos':
        this.alumno.bonos = true;
        this.alumno.mensualidad = false;
        this.alumno.clases = false;
        break;
      case 'clases':
        this.alumno.clases = true;
        this.alumno.bonos = false;
        this.alumno.mensualidad = false;
        break;
      case 'mensualidad':
        this.alumno.mensualidad = true;
        this.alumno.bonos = false;
        this.alumno.clases = false;
        break;
      default:
        break;
    }
  }

  isAlumnoValid(): boolean {
    return this.alumno.dni != '' 
    && this.alumno.nombre != ''
    && this.alumno.apellido1 != ''
    && this.alumno.apellido2 != ''
    && this.alumno.profesion != ''
    && this.alumno.direccion != ''
    && this.alumno.poblacion != ''
    && this.alumno.provincia != ''
    && this.alumno.telefono1 != ''
    && this.alumno.telefono2 != ''
    && this.alumno.codigopostal != ''

    && this.alumno.condicion != ''
    && this.alumno.precio != 0
    && this.alumnoTipoPago != '';
  }

  async isAlreadyIn() : Promise<boolean> {
    if(this.alumno.dni === '') return true;

    try {
      const alumnoRes = await firstValueFrom(this.alumnoService.obtenerAlumno(this.alumno.dni));
      console.log('Alumno ya existe', alumnoRes);
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
