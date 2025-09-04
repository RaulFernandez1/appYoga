import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { AlumnoService } from '../../service/alumno.service';
import { AlertaService } from '../../service/alerta.service';
import { Alumno } from '../../entities/alumno';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  rol?: string;
  perfil = {letra: '', nombre: '', correo: ''};

  paginaActual: string = 'home';

  constructor(private router: Router, private authService: AuthService, private alumnoService: AlumnoService, private alertaService: AlertaService) {}

  ngOnInit() {
    this.rol = localStorage.getItem('rol') || '';
    /*console.log(this.rol);*/
    if(this.rol === 'USER') {
      let id = Number(localStorage.getItem('alumnoid')) || 1;
      this.alumnoService.obtenerAlumnoPorId(id).subscribe({
        next: (alumnoRes) => {
          let alumno: Alumno = alumnoRes;
          this.perfil.letra = alumno.nombre[0];
          this.perfil.nombre = alumno.nombre;
          this.perfil.correo = alumno.correo;
        },
        error: (e) => {
          this.alertaService.mostrar('No se ha podido determinar tu usuario','danger');
          this.logout();
        }
      });
      this.paginaActual = this.router.url === '/userHome'? 'homeUser' : 'mensajes';
    } else if(this.rol === 'ADMIN') {
      this.perfil = {letra: 'A', nombre: 'Admin', correo: 'admin@sadhanayoga.com'};
      this.paginaActual = 'home';
    } else {
      this.logout();
    }

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        const url = event.urlAfterRedirects;
        if (url.includes('/home/alumnos')) {
          this.paginaActual = 'alumnos';
        } else if (url.includes('/home/grupos')) {
          this.paginaActual = 'grupos';
        } else if (url.includes('/home/niveles')) {
          this.paginaActual = 'niveles';
        } else if (url.includes('/home/gastos')) {
          this.paginaActual = 'gastos';
        } else if (url.includes('/home/recibos')) {
          this.paginaActual = 'recibos';
        } else if (url.includes('/home')) {
          this.paginaActual = 'home';
        } else if (url.includes('/userHome/mensajes')) {
          this.paginaActual = 'mensajes';
        } else if (url.includes('/userHome')) {
          this.paginaActual = 'homeUser';
        }
      });

  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('');
  }

  cambioDePagina(pagina: 'home' | 'alumnos' | 'grupos' | 'niveles' | 'gastos' | 'recibos' | 'homeUser' | 'mensajes' = 'home') {
    this.paginaActual = pagina;
  }

}
