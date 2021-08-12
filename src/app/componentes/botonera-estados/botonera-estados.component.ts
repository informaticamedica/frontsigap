import {
  Component, EventEmitter, Input, OnInit, Output
} from '@angular/core';
import {
  FormBuilder
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Auditoria } from 'src/app/dto/auditoria.dto';
import { EstadoAuditoria } from 'src/app/dto/estado-auditoria.dto';
import { FlujoDeEstadosAuditoria } from 'src/app/dto/flujo-de-estados-auditoria.dto';
import { DatosDbService } from 'src/app/servicios/datos.service';
import * as Constantes from 'src/app/utils/constantes';
import { ModalCargandoService } from '../modal-cargando/modal-cargando.service';

@Component({
  selector: 'botonera-estados',
  templateUrl: './botonera-estados.component.html'
})
export class BotoneraEstadosComponent implements OnInit {
  Constantes = Constantes;
  @Input("auditoria") auditoria!: Auditoria;
  @Input("flujoDeEstados") flujoDeEstados!: FlujoDeEstadosAuditoria[];
  @Input("estados") estados!: EstadoAuditoria[];
  @Output() auditoriaChange = new EventEmitter<Auditoria>();

  constructor(
    private datosService: DatosDbService,
    private router: Router,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private modalCargandoService: ModalCargandoService
  ) { }

  ngOnInit(): void {
  }

  cambiarEstadoAuditoria(idEstado: number) {
    this.modalCargandoService.startLoading();
    this.datosService.cambiarEstadoAuditoria(this.auditoria.idauditoria, idEstado).subscribe(
      data => {
        this.auditoria.idestadoauditoria = idEstado;
        let estadoSeleccionado = this.estados.filter(estado => estado.idestadoauditoria === idEstado)[0];
        this.auditoria.EstadoAuditoria=estadoSeleccionado.descripcion;
        this.auditoria.colorEstado=estadoSeleccionado.color;
        this.auditoriaChange.emit(this.auditoria);
        this.modalCargandoService.stopLoading();
      }
    );
  }

  puedoCambiarAlEstado(proximoEstado: number): boolean {
    let puedo = false;
    let proximosEstadosPosibles = this.flujoDeEstados?.filter(flujo => flujo.idestadoauditoriadesde === this.auditoria?.idestadoauditoria);
    if (proximosEstadosPosibles && proximosEstadosPosibles.length > 0) {
      let miProximoEstado = proximosEstadosPosibles.filter(flujo => flujo.idestadoauditoriahasta === proximoEstado);
      if (miProximoEstado && miProximoEstado.length > 0) {
        puedo = true;
      }
    }
    return puedo;
  }
}
