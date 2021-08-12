import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosDbService } from 'src/app/servicios/datos.service';
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
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent implements OnInit {
  Datos!: Auditorias[];
  Auditorias!: Auditorias[];

  constructor(private datos: DatosDbService, private router: Router) {}

  ngOnInit(): void {
    this.datos.DatosApi('auditorias').subscribe((res) => {
      this.Auditorias = res;
      this.Datos = res.map((a: { [x: string]: any; idauditoria: any }) => {
        const { idauditoria, ...datos } = a;
        return datos;
      });
      console.log(res);
      console.log('this.Datos', this.Datos);
    });
  }

  auditoria(e: any) {
    const { idauditoria } = this.Auditorias.filter((a) => a.SAP === e.SAP)[0];
    this.router.navigate(['/auditoria', idauditoria]);
  }
}
