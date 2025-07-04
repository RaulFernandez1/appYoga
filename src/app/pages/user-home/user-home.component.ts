import { Component, ElementRef, ViewChild } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { AlumnoService } from '../../service/alumno.service';
import { Alumno } from '../../entities/alumno';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientOptions, Groq } from 'groq-sdk';
import { apiKey } from '../../config/config';
import { AsistenteService } from '../../service/asistente.service';

interface Mensajes {
  texto: string,
  usuario: boolean,
  hora: Date
}

@Component({
  selector: 'app-user-home',
  imports: [FooterComponent, CommonModule, FormsModule],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent {
  alumno?: Alumno;
  hora?: Date;
  mensajes: Mensajes[] = [];
  mensaje: string = '';

  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  constructor(private authService: AuthService, private router: Router, private alumnoService: AlumnoService, private asistenteService: AsistenteService) {}

  ngOnInit() {
    const alumnoid = Number(localStorage.getItem('alumnoid'));
    if(isNaN(alumnoid)) {
      console.error("Ha habido un error con el numero");
      this.logout();
    }
    this.alumnoService.obtenerAlumnoPorId(alumnoid).subscribe((alumnoRes) => {
      console.log("Alumno obtenido ==>",alumnoRes, alumnoid);
      this.alumno = alumnoRes;
    });
    this.mensajes.push({texto: '¡Hola! Soy tu asistente de yoga personal. ¿En qué puedo ayudarte hoy?', usuario: false, hora: new Date()});
  }

  async enviarMensaje() {
    if (!this.mensaje.trim()) return;

    const mensajeUsuario = this.mensaje;
    this.mensaje = '';

    // Añade mensaje del usuario
    this.mensajes.push({
      texto: mensajeUsuario,
      usuario: true,
      hora: new Date()
    });

    // Añade mensaje vacío del asistente (que se irá completando en tiempo real)
    const mensajeAsistente: Mensajes = {
      texto: '',
      usuario: false,
      hora: new Date()
    };
    this.mensajes.push(mensajeAsistente);

    // Espera respuesta de Groq por streaming
    const stream = await this.asistenteService.obtenerRespuesta(mensajeUsuario);

    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta?.content;
      if (delta) {
        // Simula tipeo añadiendo texto poco a poco
        for (const char of delta) {
          await this.delay(10); // Puedes ajustar el delay (ms) si lo deseas
          mensajeAsistente.texto += char;
        }
      }
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('');
  }

  calcularEdad(fechaNacimiento?: string | Date): number | null {
    if(!fechaNacimiento) return null;

    const fecha = new Date(fechaNacimiento);

    if (isNaN(fecha.getTime())) return null;

    const hoy = new Date();
    let edad = hoy.getFullYear() - fecha.getFullYear();

    const mesHoy = hoy.getMonth();
    const diaHoy = hoy.getDate();

    const mesNacimiento = fecha.getMonth();
    const diaNacimiento = fecha.getDate();

    if (mesHoy < mesNacimiento || (mesHoy === mesNacimiento && diaHoy < diaNacimiento)) {
      edad--;
    }

    return edad;
  }

  horaMensajeBienvenida() {
    // Nada
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
