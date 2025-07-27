import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReciboService } from '../../service/recibo.service';
import { FormRecibosComponent } from './form-recibos/form-recibos.component';
import { Recibo, ReciboImpl } from '../../entities/recibo';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CommonModule } from '@angular/common';
import { PrintRecibosComponent } from './print-recibos/print-recibos.component';
import { AlertaService } from '../../service/alerta.service';
import { PreviewRecibosComponent } from './preview-recibos/preview-recibos.component';
import { AlumnoService } from '../../service/alumno.service';
import { Alumno } from '../../entities/alumno';
import { GrupoService } from '../../service/grupo.service';
import { concatMap, forkJoin, map, switchMap, tap } from 'rxjs';
import { EmailService } from '../../service/email.service';
import { EmailReciboRequest } from '../../entities/email';

@Component({
  selector: 'app-recibos',
  imports: [CommonModule, PrintRecibosComponent],
  templateUrl: './recibos.component.html',
  styleUrl: './recibos.component.css'
})
export class RecibosComponent {

  recibos?: Recibo[];
  totalRecibos: number = 0;
  recibosPagados: number = 0;
  recibosPendientes: number = 0;

  reciboSeleccionado: Recibo = {id: 0, alumno: 0, cantidad: 0, fecharecibo: new Date(), numerorecibo: 'null', pagado: false};
  @ViewChild(PrintRecibosComponent) printReciboComponent!: PrintRecibosComponent;

  constructor(private modalService: NgbModal, private reciboService: ReciboService, private alumnoService: AlumnoService, 
    private grupoService: GrupoService, private emailService: EmailService, private cdr: ChangeDetectorRef, 
    private alertaService: AlertaService
  ) {}

  ngOnInit() {
    this.actualizarRecibos();
  }

  actualizarRecibos() {
    this.reciboService.obtenerTodosRecibos().subscribe((recibosAux) => {
      console.log("Recibos recibidos ==> ",recibosAux);
      this.recibos = recibosAux;
      this.totalRecibos = this.recibos.reduce((total, recibo) => total + recibo.cantidad, 0);
      this.recibosPagados = this.recibos.reduce((total, recibo) => total + ((recibo.pagado)? recibo.cantidad : 0), 0);
      this.recibosPendientes = this.totalRecibos - this.recibosPagados;
    });
  }

  nuevoRecibo() {
    let ref = this.modalService.open(FormRecibosComponent);
    ref.componentInstance.recibo = {fechaemision: null};
    ref.result.then((reciboAux) => {
      console.log("Recibo resultado ==>",reciboAux);
      this.reciboService.generarRecibos(reciboAux).subscribe({
        next: (reciboRes) => {
          console.log("Recibo resultado correcto ==>",reciboRes);
          this.actualizarRecibos();
        },
        error: (e) => {
          this.alertaService.mostrar('No se ha podido generar los recibos correctamente','danger');
        }
      })
    })
  }

  eliminarRecibo(recibo: Recibo) {
    this.reciboService.eliminarRecibo(recibo.id).subscribe({
      next: (reciboRes) => {
        this.actualizarRecibos();
      },
      error: (e) => {
        this.alertaService.mostrar('No se ha podido eliminar el recibo correctamente','danger');
      }
    })
  }

  pagarRecibo(recibo: Recibo) {
    recibo.pagado = true;
    this.reciboService.editarRecibo(recibo.id,ReciboImpl.reciboToIRecibo(recibo)).subscribe({
      next: (reciboRes) => {
        console.log("Recibo modificado correctamente ==>",reciboRes);
        this.actualizarRecibos();
      },
      error: (e) => {
        this.alertaService.mostrar('No se ha podido pagar correctamente el recibo','danger');
      }
    })
  }

  imprimirRecibo(recibo: Recibo) {
    this.reciboSeleccionado = recibo;
    let alumnoRes: Alumno;
    
    this.alumnoService.obtenerAlumnoPorId(recibo.alumno).pipe(
      tap(alumno => alumnoRes = alumno),
      concatMap(alumno => this.grupoService.obtenerGrupoId(alumno.grupo_id))
    ).subscribe({
      next: (grupoRes) => {
        let ref = this.modalService.open(PreviewRecibosComponent, {size: 'xl', centered: true});
        ref.componentInstance.alumno = {
          nombre: alumnoRes.nombre,
          apellido1: alumnoRes.apellido1,
          apellido2: alumnoRes.apellido2,
          correo: alumnoRes.correo
        };
        ref.componentInstance.nivel = grupoRes.nivel;
        ref.componentInstance.recibo = recibo;

        ref.result.then(({emailReciboRes, email}) => {
          console.log('Recibo final es este: ', emailReciboRes);

          const emailRecibo: EmailReciboRequest = emailReciboRes;
          if(!emailRecibo.to) {
            this.alertaService.mostrar('El email del alumno no esta especificado','danger');
          } else if(email) {
            this.emailService.enviarCorreoRecibo(emailReciboRes).subscribe({
              next: (res) => {
                this.alertaService.mostrar('Correo enviado exitosamente','success');
              },
              error: (e) => {
                this.alertaService.mostrar('No se ha podido enviar correctamente el correo','danger');
              }
            });
          }
        });
      },
      error: (e) => {
        this.alertaService.mostrar('No se ha podido realizar la operación correctamente','danger');
      }
    })
  }

}

 /*
  IMPRIMIR RECIBOS

  setTimeout(() => {
      const DATA = this.printReciboComponent?.contentRef?.nativeElement;

      if (!DATA) {
        console.error('No se encontró el contenido del recibo');
        return;
      }

      html2canvas(DATA, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      })
        .then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4');
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save(`Recibo_${recibo.numerorecibo}.pdf`);
        })
        .catch(err => {
          console.error('Error al generar el PDF:', err);
        });
    }, 300); // Ajusta el delay si es necesario
  
  */
