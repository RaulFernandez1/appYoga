import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReciboService } from '../../service/recibo.service';
import { FormRecibosComponent } from './form-recibos/form-recibos.component';
import { Recibo, ReciboImpl } from '../../entities/recibo';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recibos',
  imports: [CommonModule],
  templateUrl: './recibos.component.html',
  styleUrl: './recibos.component.css'
})
export class RecibosComponent {

  recibos?: Recibo[];
  totalRecibos: number = 0;
  recibosPagados: number = 0;
  recibosPendientes: number = 0;

  reciboSeleccionado: Recibo | null = null;

  constructor(private modalService: NgbModal, private reciboService: ReciboService) {}

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

  async imprimirRecibo(recibo: Recibo) {
    this.reciboSeleccionado = recibo;

    await new Promise(resolve => setTimeout(resolve, 100));

    const element = document.getElementById('reciboPDF');
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.save(`recibo_${recibo.id}.pdf`);

    // Oculta el div
    this.reciboSeleccionado = null;
  }


}
