import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { AlumnoService } from '../../service/alumno.service';
import { AlertaService } from '../../service/alerta.service';
import { Alumno } from '../../entities/alumno';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  rol?: string;
  perfil = {letra: '', nombre: '', correo: ''};

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
    } else if(this.rol === 'ADMIN') {
      this.perfil = {letra: 'A', nombre: 'Admin', correo: 'admin@sadhanayoga.com'};
    } else {
      this.logout();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('');
  }

}
