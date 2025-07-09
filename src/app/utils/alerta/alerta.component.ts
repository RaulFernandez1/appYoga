import { Component, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Subscription } from 'rxjs';
import { Alerta, AlertaService } from '../../service/alerta.service';

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
  tipo: 'success' | 'danger' | 'warning' | 'info' = 'info';
  mensaje: string = '';
  visible: boolean = false;

  private sub!: Subscription;

  constructor(private alertaService: AlertaService) {}

  ngOnInit() {
    this.sub = this.alertaService.alerta$.subscribe((alerta: Alerta) => {
      this.mensaje = alerta.mensaje;
      this.tipo = alerta.tipo ?? 'info';
      this.visible = true;

      setTimeout(() => {
        this.visible = false;
      }, alerta.duracion ?? 3000);
  
    })
  } 

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
