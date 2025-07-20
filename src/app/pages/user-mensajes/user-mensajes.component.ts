import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { MensajeService } from '../../service/mensaje.service';
import { AlertaService } from '../../service/alerta.service';
import { Mensaje } from '../../entities/mensaje';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-mensajes',
  imports: [HeaderComponent,FooterComponent,CommonModule, FormsModule],
  templateUrl: './user-mensajes.component.html',
  styleUrl: './user-mensajes.component.css'
})
export class UserMensajesComponent {

  mensajes?: Mensaje[]
  mensajesSol?: Mensaje[];

  mensajesTotales: number = 0;
  mensajesSinLeer: number = 0;
  mensajesImportantes: number = 0;

  mensajeExpandido: { [id: number]: boolean } = {};

  perfilAdmin = {letra: 'A', nombre: 'Administrador', categoria: 'Instructor'};

  asuntoMensaje: string = '';
  todosFiltro: boolean = true;
  noLeidosFiltro: boolean = false;
  importantesFiltro: boolean = false;

  constructor(private alertaService: AlertaService, private mensajeService: MensajeService) {}

  ngOnInit() {
    this.actualizarMensajes();
  }


  actualizarMensajes() {
    const idAlumno = Number(localStorage.getItem('alumnoid'));
    this.mensajeService.obtenerTodosMensajesPorIdAlumno(idAlumno).subscribe({
      next: (mensajeRes) => {
        this.mensajes = mensajeRes;
        this.mensajesSol = mensajeRes;
        console.log('Mensajes obtenidos ==>',mensajeRes);
        this.mensajesTotales = mensajeRes.length;
        this.mensajesSinLeer = mensajeRes.reduce((fn, m) => m.leido ? fn : fn+1, 0);
        this.mensajesImportantes = mensajeRes.reduce((fn, m) => m.isimportante? fn+1 : fn,0);
        mensajeRes.forEach(m => {
          this.mensajeExpandido[m.id] = false;
        })
      },
      error: (e) => {
        this.alertaService.mostrar('No se ha podido cargar los mensajes','warning');
      }
    })
  }

  buscar() {
    this.mensajesSol = this.mensajes?.filter(mensaje => {
      const filtroAsunto = this.asuntoMensaje === '' || mensaje.asunto.includes(this.asuntoMensaje)
      let filtroSeleccion = true;
      if(this.noLeidosFiltro) {
        filtroSeleccion = !mensaje.leido;
      } else if(this.importantesFiltro) {
        filtroSeleccion = mensaje.isimportante;
      }
      return filtroAsunto && filtroSeleccion;
    }) || [];
  }

  changeFiltro(filtro: 'todos' | 'noLeidos' | 'importante' = 'todos') {
    if(filtro === 'todos') {
      this.todosFiltro = true;
      this.noLeidosFiltro = false;
      this.importantesFiltro = false;
    } else if(filtro === 'noLeidos') {
      this.todosFiltro = false;
      this.noLeidosFiltro = true;
      this.importantesFiltro = false;
    } else {
      this.todosFiltro = false;
      this.noLeidosFiltro = false;
      this.importantesFiltro = true;
    }
    this.buscar();
  }

  expandirMensaje(mensaje: Mensaje) {
    console.log("Imprime hora");
    if(!mensaje.leido) {
      mensaje.leido = true;
      this.mensajeService.editarMensaje(mensaje.id,mensaje).subscribe({
        next: (mensajeRes) => {
          console.log('Se ha modificado el mensaje',mensajeRes);
          this.actualizarMensajes();
        },
        error: (e) => {
          this.alertaService.mostrar('Ha habido un problema con el mensaje','warning');
        }
      })
    }
    this.mensajeExpandido[mensaje.id] = !this.mensajeExpandido[mensaje.id];
    console.log(this.mensajeExpandido);
    
  }

  getResumen(descripcion: string, id: number, limitePalabras: number = 22): string {
    if (this.mensajeExpandido[id]) return descripcion;

    const palabras = descripcion.split(' ');
    return palabras.length > limitePalabras 
      ? palabras.slice(0, limitePalabras).join(' ') + '...'
      : descripcion;
  }
}
