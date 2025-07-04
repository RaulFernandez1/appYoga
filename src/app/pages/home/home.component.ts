import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, HeaderComponent, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  slides = [
    { id: 0, image: 'assets/imagen_centro_1.jpg', titulo: 'Paisaje de ensueño', descripcion: 'Espacios con convivencia con la naturaleza' },
    { id: 1, image: 'assets/imagen_lectura.jpg', titulo: 'Zona de lectura', descripcion: 'Espacio habilitado para adquirir sabiduría' },
    { id: 2, image: 'assets/imagen_interior.jpg', titulo: 'Equipamiento', descripcion: 'Centro totalmente equipado para realizar correctamente las actividades' }
  ];
  slide1: string = "../assets/yoga_1.jpeg";
  currentIndex = 0;

  @ViewChild('demo', { static: false }) demo!: ElementRef;

  ngAfterViewInit() {
  if (this.demo?.nativeElement) {
    const carousel = new (window as any).bootstrap.Carousel(this.demo.nativeElement, {
      interval: 3000
    });
    carousel.cycle();
  }
}
  

}
