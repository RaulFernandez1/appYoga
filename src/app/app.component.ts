import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Grupo } from './entities/grupo';
import { GrupoService } from './service/grupo.service';
import { HeaderComponent } from "./pages/header/header.component";
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { AlertaComponent } from './utils/alerta/alerta.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, LoginComponent, HomeComponent, AlertaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{

  title = 'appYoga';

  constructor(private router: Router) {}

}
