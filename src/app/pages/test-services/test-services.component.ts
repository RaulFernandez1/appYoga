import { Component } from '@angular/core';
import { AlumnoService } from '../../service/alumno.service';
import { GastoService } from '../../service/gasto.service';
import { GrupoService } from '../../service/grupo.service';
import { NivelService } from '../../service/nivel.service';
import { ReciboService } from '../../service/recibo.service';
import { AlumnoImpl } from '../../entities/alumno';
import { GastoImpl } from '../../entities/gasto';
import { GrupoImpl } from '../../entities/grupo';
import { NivelImpl } from '../../entities/nivel';
import { ReciboImpl } from '../../entities/recibo';

@Component({
  selector: 'app-test-services',
  imports: [],
  templateUrl: './test-services.component.html',
  styleUrl: './test-services.component.css'
})
export class TestServicesComponent {


  alumno: AlumnoImpl = new AlumnoImpl();
  gasto: GastoImpl = new GastoImpl();
  grupo: GrupoImpl = new GrupoImpl();
  nivel: NivelImpl = new NivelImpl();
  recibo: ReciboImpl = new ReciboImpl();

  constructor(private alumnoService: AlumnoService, private gastoService: GastoService, private grupoService: GrupoService,
    private nivelService: NivelService, private reciboService: ReciboService
  ) {}

  crear() {
    /*
    GASTO

    this.gastoService.aniadirGasto(this.gasto).subscribe((result) => {
      console.log("Creacion correctamente")
      console.log(result);
    })
    */
    this.grupoService.aniadirGrupo(this.grupo).subscribe((result) => {
      console.log("Creacion correctamente")
      console.log(result);
    })
  }
  editar() {
    /*
    GASTO

    */
    this.grupoService.editarGrupo(1,this.grupo).subscribe((result) => {
      console.log("Edicion correctamente")
      console.log(result);
    })
  }
  borrar() {
    /*
    GASTO

    this.gastoService.eliminarGasto(1).subscribe((result) => {
      console.log("Eliminacion correctamente");
    })
    */
    this.grupoService.eliminarGrupo(2).subscribe((result) => {
      console.log("Eliminacion correctamente")
    })
  }
  buscarTodos() {
    /*
    GASTO

    this.gastoService.obtenerTodosGastos().subscribe((result) => {
      console.log(result)
      console.log("busqueda todos correctamente")
    })
    */
    this.grupoService.obtenerTodosGrupos().subscribe((result) => {
      console.log("busqueda todos correctamente")
      console.log(result);
    })
  }
  buscarUno() {
    /*
    GASTO

    this.gastoService.obtenerGasto(new Date(),"",1).subscribe((result) => {
      console.log(result)
      console.log("busqueda todos correctamente")
    })
    */
    this.grupoService.obtenerGrupo("prueba7").subscribe((result) => {
      console.log("busqueda uno correctamente")
      console.log(result);
    })
  }




}
