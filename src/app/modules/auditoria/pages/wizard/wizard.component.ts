import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Auditoria } from 'src/app/api/dto/auditoria.dto';
import { EstadoAuditoria } from 'src/app/api/dto/estado-auditoria.dto';
import { FlujoDeEstadosAuditoria } from 'src/app/api/dto/flujo-de-estados-auditoria.dto';
import { Informe } from 'src/app/api/dto/informe.dto';
import { Item } from 'src/app/api/dto/item.dto';
import { VerAuditoria } from 'src/app/api/dto/ver-auditoria.dto';
import { DatosDbService } from 'src/app/api/services/datos.service';
import { OnlineService } from 'src/app/core/services/online.service';
import { ModalCargandoService } from 'src/app/shared/services/modal-cargando.service';
import * as Constantes from 'src/app/shared/utils/constantes';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
})
export class WizardComponent implements OnInit {
  Constantes = Constantes;

  pasoPlanificacionDeshabilitado: boolean = false;
  pasoGuiaDeshabilitado: boolean = false;
  pasoInformeDeshabilitado: boolean = false;
  pasoPrimeraRevisionDeshabilitado: boolean = false;
  pasoSegundaRevisionDeshabilitado: boolean = false;
  pasoGDEDeshabilitado: boolean = false;
  pasoSeleccionado: number = 0;


  idAuditoria!: string;
  auditoria!: Auditoria;
  informe!: Informe[];
  items!: Item[];

  flujoDeEstados!: FlujoDeEstadosAuditoria[];
  estados!: EstadoAuditoria[];
  isOnline!: boolean;
  constructor(private datosService: DatosDbService, private activatedRoute: ActivatedRoute,
    private modalCargandoService: ModalCargandoService, private onlineService: OnlineService,
    private dbService: NgxIndexedDBService) {
  }

  ngOnInit(): void {
    this.onlineService.isOnline$.subscribe(
      data => {
        this.isOnline = data;
      }
    );
    this.onlineService.refrescar();
    this.modalCargandoService.startLoading();

    if (this.isOnline) {
      this.datosService.DatosApi('auditorias/flujo-estados').subscribe(
        (data: FlujoDeEstadosAuditoria[]) => {
          this.flujoDeEstados = data;
          this.dbService.bulkAdd('flujo-estados', this.flujoDeEstados).subscribe(data => console.log(data));
        }
      );
      this.datosService.DatosApi('auditorias/estados').subscribe(
        (data: EstadoAuditoria[]) => {
          this.estados = data;
          this.dbService.bulkAdd('estados', this.estados).subscribe(data => console.log(data));
        }
      );
    } else {
      this.dbService.getAll('flujo-estados').subscribe(data => {
        this.flujoDeEstados = data as FlujoDeEstadosAuditoria[];
      });
      this.dbService.getAll('estados').subscribe(data => {
        this.estados = data as EstadoAuditoria[];
      });
    }

    this.idAuditoria = this.activatedRoute.snapshot.params.idauditoria;
    if (this.idAuditoria) {

      if (this.isOnline) {
        console.log("estoy online busco via rest");
        //si llegó una auditoria por param es que entré a ver una ya creada
        this.datosService
        .DatosParametrosApi('auditoria', this.idAuditoria)
        .subscribe((res: VerAuditoria) => {
          this.auditoria = res.Auditoria;
          let estadoSeleccionado = this.estados.filter(estado => estado.idestadoauditoria === this.auditoria.idestadoauditoria)[0];
          this.auditoria.colorEstado = estadoSeleccionado.color;
          this.setearPasoDelWizardSegunEstadoDeLaAuditoria(this.auditoria);
        });
      } else {
        console.log("estoy OFFLINE busco via DB");
        this.dbService.getByKey('auditorias', this.idAuditoria).subscribe((data) => {
          let auditoria = data as VerAuditoria;
          this.auditoria = auditoria.Auditoria;
          let estadoSeleccionado = this.estados.filter(estado => estado.idestadoauditoria === this.auditoria.idestadoauditoria)[0];
          this.auditoria.colorEstado = estadoSeleccionado.color;
          this.setearPasoDelWizardSegunEstadoDeLaAuditoria(this.auditoria);
        });
      }
    } else {
      this.setearPasoDelWizardSegunEstadoDeLaAuditoria();
      this.modalCargandoService.stopLoading();
    }
  }
  actualizarWizard(auditoria?: Auditoria) {
    this.setearPasoDelWizardSegunEstadoDeLaAuditoria(auditoria);
  }
  setearPasoDelWizardSegunEstadoDeLaAuditoria(auditoria?: Auditoria) {
    if (auditoria) {
      switch (auditoria.idestadoauditoria) {
        case Constantes.ESTADO_AUDITORIA_PLANIFICADA:
          this.pasoSeleccionado = Constantes.INDEX_TAB_PLANIFICACION;
          this.pasoPlanificacionDeshabilitado = false;
          this.pasoGuiaDeshabilitado = true;
          this.pasoInformeDeshabilitado = true;
          this.pasoPrimeraRevisionDeshabilitado = true;
          this.pasoSegundaRevisionDeshabilitado = true;
          this.pasoGDEDeshabilitado = true;
          break;
        case Constantes.ESTADO_AUDITORIA_PUBLICADA:
        case Constantes.ESTADO_GUIA_INICIDADA:
          this.pasoSeleccionado = Constantes.INDEX_TAB_GUIA;
          this.pasoPlanificacionDeshabilitado = false;
          this.pasoGuiaDeshabilitado = false;
          this.pasoInformeDeshabilitado = true;
          this.pasoPrimeraRevisionDeshabilitado = true;
          this.pasoSegundaRevisionDeshabilitado = true;
          this.pasoGDEDeshabilitado = true;
          break;
        case Constantes.ESTADO_GUIA_COMPLETADA:
        case Constantes.ESTADO_INFORME_INICIADO:
          this.pasoSeleccionado = Constantes.INDEX_TAB_INFORME;
          this.pasoPlanificacionDeshabilitado = false;
          this.pasoGuiaDeshabilitado = false;
          this.pasoInformeDeshabilitado = false;
          this.pasoPrimeraRevisionDeshabilitado = true;
          this.pasoSegundaRevisionDeshabilitado = true;
          this.pasoGDEDeshabilitado = true;
          break;
        case Constantes.ESTADO_INFORME_CONFORMADO:
          this.pasoSeleccionado = Constantes.INDEX_TAB_PRIMERA_REVISION;
          this.pasoPlanificacionDeshabilitado = false;
          this.pasoGuiaDeshabilitado = false;
          this.pasoInformeDeshabilitado = false;
          this.pasoPrimeraRevisionDeshabilitado = false;
          this.pasoSegundaRevisionDeshabilitado = true;
          this.pasoGDEDeshabilitado = true;
          break;
        case Constantes.ESTADO_PRIMERA_REVISION_APROBADA:
          this.pasoSeleccionado = Constantes.INDEX_TAB_SEGUNDA_REVISION;
          this.pasoPlanificacionDeshabilitado = false;
          this.pasoGuiaDeshabilitado = false;
          this.pasoInformeDeshabilitado = false;
          this.pasoPrimeraRevisionDeshabilitado = false;
          this.pasoSegundaRevisionDeshabilitado = false;
          this.pasoGDEDeshabilitado = true;
          break;
        case Constantes.ESTADO_SEGUNDA_REVISION_APROBADA:
        case Constantes.ESTADO_SEGUNDA_REVISION_OBSERVADA:
          this.pasoSeleccionado = Constantes.INDEX_TAB_GDE;
          this.pasoPlanificacionDeshabilitado = false;
          this.pasoGuiaDeshabilitado = false;
          this.pasoInformeDeshabilitado = false;
          this.pasoPrimeraRevisionDeshabilitado = false;
          this.pasoSegundaRevisionDeshabilitado = false;
          this.pasoGDEDeshabilitado = false;
          break;
        case Constantes.ESTADO_INFORME_SUBIDO_A_GDE:
          this.pasoPlanificacionDeshabilitado = false;
          this.pasoGuiaDeshabilitado = false;
          this.pasoInformeDeshabilitado = false;
          this.pasoPrimeraRevisionDeshabilitado = false;
          this.pasoSegundaRevisionDeshabilitado = false;
          this.pasoGDEDeshabilitado = false;
          this.pasoSeleccionado = Constantes.INDEX_TAB_GDE;
          break;
      }
    } else {
      this.pasoSeleccionado = Constantes.INDEX_TAB_PLANIFICACION;
      this.pasoPlanificacionDeshabilitado = false;
      this.pasoGuiaDeshabilitado = true;
      this.pasoInformeDeshabilitado = true;
      this.pasoPrimeraRevisionDeshabilitado = true;
      this.pasoSegundaRevisionDeshabilitado = true;
      this.pasoGDEDeshabilitado = true;
    }
    this.modalCargandoService.stopLoading();
  }

  obtenerColorDelBadge(pasoDelWizard: number): string {
    let color = "badge-secondary";
    if (this.auditoria) {
      if (this.auditoria.idestadoauditoria === Constantes.ESTADO_AUDITORIA_CANCELADA) {
        color = "badge-danger";
      } else {
        switch (pasoDelWizard) {
          case Constantes.INDEX_TAB_PLANIFICACION:
            if (this.auditoria.idestadoauditoria >= Constantes.ESTADO_AUDITORIA_PUBLICADA) {
              color = "badge-success";
            }
            break;
          case Constantes.INDEX_TAB_GUIA:
            if (this.auditoria.idestadoauditoria >= Constantes.ESTADO_GUIA_COMPLETADA) {
              color = "badge-success";
            }
            break;
          case Constantes.INDEX_TAB_INFORME:
            if (this.auditoria.idestadoauditoria >= Constantes.ESTADO_INFORME_CONFORMADO) {
              color = "badge-success";
            }
            break;
          case Constantes.INDEX_TAB_PRIMERA_REVISION:
            if (this.auditoria.idestadoauditoria >= Constantes.ESTADO_PRIMERA_REVISION_APROBADA) {
              color = "badge-success";
            }
            break;
          case Constantes.INDEX_TAB_SEGUNDA_REVISION:
            if (this.auditoria.idestadoauditoria >= Constantes.ESTADO_SEGUNDA_REVISION_APROBADA) {
              color = "badge-success";
            }
            break;
          case Constantes.INDEX_TAB_GDE:
            if (this.auditoria.idestadoauditoria >= Constantes.ESTADO_INFORME_SUBIDO_A_GDE) {
              color = "badge-success";
            }
            break;
        }
      }
    }
    return color;
  }
}
