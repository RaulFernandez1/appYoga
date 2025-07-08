import { Component, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { User } from '../../entities/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertaComponent } from "../../utils/alerta/alerta.component";

@Component({
  selector: 'app-login',
  imports: [RouterLink, CommonModule, FormsModule, AlertaComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  usuario: User = {username: 'admin', password: 'admin'};
  nombre: string = '';
  @ViewChild('alerta') alertaComponent!: AlertaComponent;

  constructor(private router: Router, private authService: AuthService) {}

  home(): void {
    this.router.navigateByUrl('/home');
  }

  login(): void {
    if(this.isUserValid()) {
      this.authService.login(this.usuario).subscribe({
        next: (response) => {
          console.log("Auth user ==>",response);
          localStorage.setItem('token',response.token);
          localStorage.setItem('alumnoid',response.alumno_id);
          localStorage.setItem('rol',(response.alumno_id === "0")? "ADMIN" : "USER");
          console.log(localStorage.getItem('token'),localStorage.getItem('alumnoid'),localStorage.getItem('rol'));
          this.router.navigateByUrl((localStorage.getItem('rol') === 'ADMIN')?'/home':'/userHome');
        },
        error: (e) => {
          this.alertaComponent.mostrar('Algo salio mal','danger');
          console.log("Ha habido un error y no puedes pasar JUAJUAJUAJUA");
          this.usuario.username = '';
          this.usuario.password = '';
        }
      });
      
    } else {
      this.alertaComponent.mostrar('No se han introducido correctamente los campos','warning');
    }
    
  }

  isUserValid(): boolean {
    console.log("El puto usuario",this.usuario);
    return this.usuario.username != '' && this.usuario.password != '';
  }

}
