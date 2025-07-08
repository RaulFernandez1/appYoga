import { Component, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-alerta',
  imports: [],
  templateUrl: './alerta.component.html',
  styleUrl: './alerta.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
})
export class AlertaComponent {
  @Input() tipo: 'success' | 'danger' | 'warning' | 'info' = 'info';
  mensaje: string = '';
  visible: boolean = false;

  mostrar(mensaje: string, tipo: 'success' | 'danger' | 'warning' | 'info' = 'info', duracion: number = 3000) {
    this.mensaje = mensaje;
    this.tipo = tipo;
    this.visible = true;

    setTimeout(() => {
      this.visible = false;
    }, duracion);
  }
}
