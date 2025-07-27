import { Component, ElementRef, ViewChild } from '@angular/core';
import { EmailService } from '../../service/email.service';
import { EmailRequest } from '../../entities/email';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-email-mensaje',
  templateUrl: './email-mensaje.component.html',
  imports: [NgIf, NgFor]
})
export class EmailMensajeComponent {
  nombre: string = 'Juan';
  letra: string = 'J';
  rol: string = 'Usuario';
  estrella: string = '★';
  asunto: string = 'Este es el título del mensaje';
  contenido: string = 'HOLAAAIDNSOJDNOSNNDONAND  DSNSOJNFOJ JSDNFSJNOSOS'
  fecha: string = '2025-01-01';
  hora: string = '12:00 PM';

  grupo: boolean = false;
  importante: boolean = true;
  leido: boolean = false;

  constructor(private emailService: EmailService) {}

  @ViewChild('plantilla') plantillaRef!: ElementRef;

  ngOnInit() {
    this.getContent();
  }

  getContent() {
    const contenido = this.plantillaRef.nativeElement;
    console.log(contenido);
  }

}
