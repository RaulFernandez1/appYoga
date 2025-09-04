import { Component } from '@angular/core';
import { Nivel, NivelImpl } from '../../entities/nivel';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NivelService } from '../../service/nivel.service';
import { FormNivelesComponent } from './form-niveles/form-niveles.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertaService } from '../../service/alerta.service';
import { Grupo } from '../../entities/grupo';
import { GrupoService } from '../../service/grupo.service';

@Component({
  selector: 'app-niveles',
  imports: [FormsModule, CommonModule],
  templateUrl: './niveles.component.html',
  styleUrl: './niveles.component.css'
})
export class NivelesComponent {

  niveles?: Nivel[];
  grupos?: Grupo[];

  nivelesRes?: Nivel[];
  nombreNivel: string = '';

  constructor(private modalService: NgbModal, private nivelService: NivelService, private grupoService: GrupoService,
    private alertaService: AlertaService) {}

  ngOnInit(): void {
    this.actualizarNiveles();
  }

  actualizarNiveles() {
    this.nivelService.obtenerTodosNivels().subscribe((listaNiveles) => {
      this.niveles = listaNiveles;
      this.nivelesRes = listaNiveles;
      console.log('Niveles recibidos',listaNiveles)
    });
    this.grupoService.obtenerTodosGrupos().subscribe((listaGrupos) => {
      this.grupos = listaGrupos;
      console.log('Grupos obtenidos',listaGrupos);
    })
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
      this.nivelService.aniadirNivel(NivelImpl.nivelToINivel(nivelAux)).subscribe({
        next: (nivelRes) => {
          console.log("Nivel creado resultado", nivelRes);
          this.actualizarNiveles();
        },
        error: (e) => {
          this.alertaService.mostrar('No se ha podido crear correctamente el nivel','danger');
        }
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
      this.nivelService.editarNivel(nivel.id, nivelAux).subscribe({
        next: (nivelRes) => {
          console.log("Nivel modificado correcto = ",nivelRes);
          this.actualizarNiveles();
        },
        error: (e) => {
          this.alertaService.mostrar('No se ha podido modificar correctamente el nivel','danger');
        }
      })
    })
  }

  eliminarNivel(nivel: Nivel) {
    if(this.getGrupoPorNivel(nivel) == 0) {
      this.nivelService.eliminarNivel(nivel.id).subscribe({
        next: (nivelResult) => {
          console.log('Nivel eliminado',nivelResult);
          this.actualizarNiveles();
        },
        error: (e) => {
          this.alertaService.mostrar('No se ha podido eliminar el nivel con exito','danger');
        }
      });
    } else {
      this.alertaService.mostrar('Hay grupos en este nivel. Eliminalos primero para poder eliminar el nivel.','warning');
    }
  }

  getGrupoPorNivel(nivel: Nivel) {
    const grupos = this.grupos?.reduce((acc, g) => g.nivel === nivel.nombrenivel? acc + 1 : acc,0);
    return grupos;
  }

}
