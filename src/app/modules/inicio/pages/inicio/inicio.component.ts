import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { DatosDbService } from 'src/app/api/services/datos.service';
import { OnlineService } from 'src/app/core/services/online.service';
interface Auditorias {
  CUIT: string;
  Estado: string;
  'Fecha de Auditoría': string;
  Prestador: string;
  SAP: number;
  UGL: string;
  idauditoria: number;
}
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  isOnline!: boolean;
  Datos!: Auditorias[];
  Auditorias!: Auditorias[];

  constructor(private datos: DatosDbService, private router: Router, private onlineService: OnlineService,
    private dbService: NgxIndexedDBService) { }

  ngOnInit(): void {
    this.onlineService.isOnline$.subscribe(
      data => {
        this.isOnline = data;
      }
    );
    this.onlineService.refrescar();
    if (this.isOnline) {
      debugger;
      this.datos.DatosApi('auditorias').subscribe((res) => {
        this.Auditorias = res;
        this.dbService.bulkAdd('auditorias', this.Auditorias).subscribe(data => console.log(data));

        this.Datos = res.map((a: { [x: string]: any; idauditoria: any }) => {
          const { idauditoria, ...datos } = a;
          return datos;
        });
      });
    } else {
      debugger;
      console.log("estoy offline voy a buscar a la indexed")
      this.dbService.getAll('auditorias').subscribe(data => {
        let auditoriasIndexedDB = data as any;
        this.Auditorias = data as Auditorias[];
        this.Datos = auditoriasIndexedDB.map((a: { [x: string]: any; idauditoria: any }) => {
          const { idauditoria, ...datos } = a;
          return datos;
        });
      });
    }
  }

  auditoria(e: any) {
    const { idauditoria } = this.Auditorias.filter((a) => a.SAP === e.SAP)[0];
    this.router.navigate(['auditoria', idauditoria]);
  }
}
