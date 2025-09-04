import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { CommonModule, NgFor } from '@angular/common';
import { AlumnoService } from '../../service/alumno.service';
import { GrupoService } from '../../service/grupo.service';
import { ReciboService } from '../../service/recibo.service';
import { GastoService } from '../../service/gasto.service';
import { AlertaService } from '../../service/alerta.service';
import { FormsModule } from '@angular/forms';
import { Alumno } from '../../entities/alumno';
import { Grupo } from '../../entities/grupo';
import { Gasto } from '../../entities/gasto';
import { Recibo } from '../../entities/recibo';

@Component({
  selector: 'app-home',
  imports: [RouterLink, HeaderComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  slides = [
    { id: 0, image: 'assets/imagen_centro_1.jpg', titulo: 'Bienvenido a Sadhana de Yoga', descripcion: 'Espacios con convivencia con la naturaleza' },
    { id: 1, image: 'assets/imagen_lectura.jpg', titulo: 'Zona de lectura', descripcion: 'Espacio habilitado para adquirir sabiduría' },
    { id: 2, image: 'assets/imagen_interior.jpg', titulo: 'Equipamiento', descripcion: 'Centro totalmente equipado para realizar correctamente las actividades' }
  ];
  currentIndex = 0;
  @ViewChild('demo', { static: false }) demo!: ElementRef;

  totalAlumnos?: string = '';
  totalGastos?: string = '';
  gruposActivos?: string = '';
  recibosPagados?: string = '';

  constructor(private alumnoService: AlumnoService, private grupoService: GrupoService, private reciboService: ReciboService,
    private gastoService: GastoService, private alertaService: AlertaService
  ) {}

  ngAfterViewInit() {
    if (this.demo?.nativeElement) {
      const carousel = new (window as any).bootstrap.Carousel(this.demo.nativeElement, {
        interval: 3000
      });
      carousel.cycle();
    }
  }

  ngOnInit() {
    this.alumnoService.obtenerTodosAlumnos().subscribe({
      next: (alumnosRes) => {
        this.getInfoAlumno(alumnosRes);
        this.grupoService.obtenerTodosGrupos().subscribe({
          next: (grupoRes) => {
            this.getInfoGrupo(grupoRes, alumnosRes);
          },
          error: (e) => {
            this.gruposActivos = 'Grupos no encontrados';
          }
        });
      },
      error: (e) => {
        this.totalAlumnos = 'Alumnos no encontrados';
        this.gruposActivos = 'Grupos no encontrados';
      }
    });
    this.reciboService.obtenerTodosRecibos().subscribe({
      next: (recibosRes) => {
        this.getInfoRecibo(recibosRes);
      },
      error: (e) => {
        this.recibosPagados = 'Recibos no encontrados';
      }
    });
    this.gastoService.obtenerTodosGastos().subscribe({
      next: (gastosRes) => {
        this.getInfoGasto(gastosRes);
      },
      error: (e) => {
        this.totalGastos = 'Gastos no encontrados';
      }
    });
  }

  getInfoAlumno(alumnos: Alumno[]) {
    this.totalAlumnos = alumnos.reduce((acc, a) => a.activo ? acc+1 : acc,0) + '';
  }
  getInfoGrupo(grupos: Grupo[], alumnos: Alumno[]) {
    this.gruposActivos = alumnos.filter(alumno => alumno.grupo_id != null).map(alumno => alumno.grupo_id).length + '';
  }
  getInfoRecibo(recibos: Recibo[]) {
    this.recibosPagados = recibos.reduce((acc, r) => r.pagado ? acc+r.cantidad : acc, 0) + '';
  }
  getInfoGasto(gastos: Gasto[]) {
    this.totalGastos = gastos.reduce((acc, g) => this.mesActual(g.fechagasto) ? acc+g.cantidadgasto : acc, 0) + '';
  }

  private mesActual(fecha: Date | null): boolean {
    const hoy = new Date();
    if(fecha == null) return false;
    const date = new Date(fecha);

    return date.getFullYear() === hoy.getFullYear() && date.getMonth() === hoy.getMonth();
  }
}
