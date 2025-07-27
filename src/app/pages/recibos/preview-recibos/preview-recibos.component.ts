import { Component } from '@angular/core';
import { Recibo } from '../../../entities/recibo';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmailService } from '../../../service/email.service';
import { EmailReciboRequest } from '../../../entities/email';
import { AlertaService } from '../../../service/alerta.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-preview-recibos',
  imports: [CommonModule, FormsModule],
  templateUrl: './preview-recibos.component.html',
  styleUrl: './preview-recibos.component.css'
})
export class PreviewRecibosComponent {

  recibo: Recibo = {id: 0, alumno: 0, cantidad: 0, fecharecibo: new Date(), numerorecibo: '', pagado: false};
  alumno = {nombre: '', apellido1: '', apellido2: '', correo: ''};
  nivel: string = '';
  enviarPorCorreo: boolean = false;

  constructor(public modal: NgbActiveModal) {}

  onPrint() {
    const contenido = document.getElementById('recibo-content');
    const ventana = window.open('','','height=700,width=900');
    if(ventana && contenido) {
      ventana.document.write('<html><head><title>Recibo</title>');
      ventana.document.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"/>');
      ventana.document.write('</head><body >');
      ventana.document.write(contenido.innerHTML);
      ventana.document.write('</body></html>');
      ventana.document.close();
      ventana.print();
      ventana.close();
    }
    const emailReciboRequest: EmailReciboRequest = {
      to: this.alumno.correo, subject: 'Nuevo recibo '+this.recibo.numerorecibo,
      nombre: this.alumno.nombre, apellido1: this.alumno.apellido1, apellido2: this.alumno.apellido2, 
      fecha: this.recibo.fecharecibo, importe: this.recibo.cantidad, nivel: this.nivel
    };
    this.modal.close({emailReciboRes: emailReciboRequest,email: this.enviarPorCorreo});
  }
}
