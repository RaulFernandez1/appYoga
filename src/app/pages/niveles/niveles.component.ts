import { Component } from '@angular/core';
import { Nivel, NivelImpl } from '../../entities/nivel';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NivelService } from '../../service/nivel.service';
import { FormNivelesComponent } from './form-niveles/form-niveles.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-niveles',
  imports: [FormsModule, CommonModule],
  templateUrl: './niveles.component.html',
  styleUrl: './niveles.component.css'
})
export class NivelesComponent {

  niveles?: Nivel[];

  nivelesRes?: Nivel[];
  nombreNivel: string = '';

  constructor(private modalService: NgbModal, private nivelService: NivelService) {}

  ngOnInit(): void {
    this.actualizarNiveles();
  }

  actualizarNiveles() {
    this.nivelService.obtenerTodosNivels().subscribe((listaNiveles) => {
      this.niveles = listaNiveles;
      this.nivelesRes = listaNiveles;
      console.log('Niveles recibidos',listaNiveles)
    });
  }

  buscar() {
    this.nivelesRes = this.niveles?.filter(nivel => {
      return this.nombreNivel === '' || nivel.nombrenivel.includes(this.nombreNivel);
    })
  }

  nuevoNivel() {
    let ref = this.modalService.open(FormNivelesComponent);
    ref.componentInstance.accion = 'Añadir';
    ref.componentInstance.nivel = {
      id: 0, nombrenivel: '', condicion: '', preciomensualidad: 0,
      preciobonos: 0, precioclases: 0
    };
    ref.result.then((nivelAux) => {
      console.log("Nivel nuevo creado =", nivelAux);
      this.nivelService.aniadirNivel(NivelImpl.nivelToINivel(nivelAux)).subscribe((nivelRes) => {
        console.log("Nivel creado resultado", nivelRes);
        this.actualizarNiveles();
      });
    })
  }

  editarNivel(nivel: Nivel) {
    let ref = this.modalService.open(FormNivelesComponent);
    ref.componentInstance.accion = 'Editar';
    ref.componentInstance.nivel = {
      id: nivel.id, nombrenivel: nivel.nombrenivel, condicion: nivel.condicion, preciomensualidad: nivel.preciomensualidad,
      preciobonos: nivel.preciobonos, precioclases: nivel.precioclases
    };
    ref.result.then((nivelAux) => {
      console.log("Nivel modificado = ",nivelAux);
      this.nivelService.editarNivel(nivel.id, nivelAux).subscribe((nivelRes) => {
        console.log("Nivel modificado correcto = ",nivelRes);
        this.actualizarNiveles();
      })
    })
  }

  eliminarNivel(nivel: Nivel) {
    this.nivelService.eliminarNivel(nivel.id).subscribe((nivelResult) => {
      console.log('Nivel eliminado',nivelResult);
      this.actualizarNiveles();
    });
  }

}
