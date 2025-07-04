import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-principal-layout',
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
  templateUrl: './principal-layout.component.html',
  styleUrl: './principal-layout.component.css'
})
export class PrincipalLayoutComponent {

}
