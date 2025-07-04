import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Recibo } from '../../../entities/recibo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-print-recibos',
  imports: [CommonModule],
  templateUrl: './print-recibos.component.html',
  styleUrl: './print-recibos.component.css'
})
export class PrintRecibosComponent {
  @Input() recibo!: Recibo;
  @ViewChild('reciboContent', { static: true }) contentRef!: ElementRef;

  get pagadoTexto(): string {
    return this.recibo.pagado ? 'Pagado' : 'No Pagado';
  }

  get pagadoColor(): string {
    return this.recibo.pagado ? '#4caf50' : '#f44336';
  }
}
