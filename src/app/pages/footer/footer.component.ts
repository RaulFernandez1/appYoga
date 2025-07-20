import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  rol?: string;

  ngOnInit() {
    this.rol = localStorage.getItem('rol') || '';
    /*console.log(this.rol);*/
  }

  scrollUp() {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }
}
