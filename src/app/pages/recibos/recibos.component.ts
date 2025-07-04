import { ChangeDetectorRef, Component, ElementRef, NgModule, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReciboService } from '../../service/recibo.service';
import { FormRecibosComponent } from './form-recibos/form-recibos.component';
import { Recibo, ReciboImpl } from '../../entities/recibo';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CommonModule } from '@angular/common';
import { PrintRecibosComponent } from './print-recibos/print-recibos.component';

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

  constructor(private modalService: NgbModal, private reciboService: ReciboService, private cdr: ChangeDetectorRef) {}

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
      this.reciboService.generarRecibos(reciboAux).subscribe((reciboRes) => {
        console.log("Recibo resultado correcto ==>",reciboRes);
        this.actualizarRecibos();
      })
    })
  }

  eliminarRecibo(recibo: Recibo) {

  }

  pagarRecibo(recibo: Recibo) {
    recibo.pagado = true;
    this.reciboService.editarRecibo(recibo.id,ReciboImpl.reciboToIRecibo(recibo)).subscribe((reciboRes) => {
      console.log("Recibo modificado correctamente ==>",reciboRes);
      this.actualizarRecibos();
    })
  }

  imprimirRecibo(recibo: Recibo) {
    this.reciboSeleccionado = recibo;
    
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
  }





}
