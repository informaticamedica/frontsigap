import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as Constantes from 'src/app/shared/utils/constantes';
import { Prestadores } from 'src/app/api/dto/prestadores.dto';
import { TipoInforme } from 'src/app/api/dto/tipo-informe.dto';
import { Usuarios } from 'src/app/api/dto/usuarios.dto';
import { Areas } from 'src/app/api/dto/areas.dto';
import { Auditoria } from 'src/app/api/dto/auditoria.dto';
import { DatosDbService } from 'src/app/api/services/datos.service';
import { ModalCargandoService } from 'src/app/shared/services/modal-cargando.service';
import { VerAuditoria } from 'src/app/api/dto/ver-auditoria.dto';
import { PlanificarAuditoria } from 'src/app/api/dto/planificar-auditoria.dto';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Fruit loops' }],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
      },
      {
        name: 'Orange',
        children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
      },
    ],
  },
];
@Component({
  selector: 'planificar-auditoria',
  templateUrl: './planificar-auditoria.component.html',
  styleUrls: ['./planificar-auditoria.component.scss'],
})
export class PlanificarAuditoriaComponent implements OnInit {
  Constantes = Constantes;
  form = this.formBuilder.group({
    prestadores: ['', [Validators.required]],
    fechainicio: ['', []],
    fechafin: ['', []],
    fecha: this.formBuilder.group({
      fechainicio: ['', []],
      fechafin: ['', []],
    }),
    TipoInforme: ['', [Validators.required]],
    observaciones: ['', []],
    integrantes: this.formBuilder.array([
      this.formBuilder.group({
        areas: ['', []],
        usuarios: ['', []],
      }),
    ]),
  });

  PrestadoresRes: Prestadores[] = [];
  Prestadores: Prestadores[] = [];
  TipoInforme: TipoInforme[] = [];
  maxLenghtPrest = 0;
  maxLenghtUsuar = 0;
  Usuarios: Usuarios[] = [];
  UsuariosRes: Usuarios[] = [];
  AuxUsuarios: Usuarios[][] = [];
  AreasRes: Areas[] = [];
  Area: Areas[] = [];

  Guardando = false;

  @Input('idAuditoria') idauditoria!: string;
  auditoriaExistente!: Auditoria;

  // buscandoAuditoria: boolean = true;
  constructor(
    private datos: DatosDbService,
    private router: Router,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private modalCargandoService: ModalCargandoService
  ) {
    this.dataSource.data = TREE_DATA;
  }

  isMobileLayout = false;
  maxNumberArray = (array: number[]) =>
    array.reduce((accumulator, currentValue) => {
      return accumulator > currentValue ? accumulator : currentValue;
    });
  ngOnInit(): void {
    this.modalCargandoService.startLoading();
    if (this.idauditoria) {
      //me llegó por input un id de auditoria así que ya fue planificada, mostramos un resumen
      this.datos
        .DatosParametrosApi('auditoria', this.idauditoria)
        .subscribe((res: VerAuditoria) => {
          console.log(res);
          const { Auditoria, Informe, items } = res;
          this.auditoriaExistente = Auditoria;
          // this.buscandoAuditoria = false;
          this.modalCargandoService.stopLoading();
        });
    } else {
      //no me llegó id así que armamos la planificación
      this.datos
        .DatosApi('planificarauditoria')
        .subscribe((res: PlanificarAuditoria) => {
          console.log('res', res);
          this.PrestadoresRes = res.Prestadores.map((a) => {
            // delete a['idprestador'];
            return a;
          });
          this.Prestadores = res.Prestadores.map((a) => {
            // delete a['idprestador'];
            return a;
          });

          // console.log('this.Prestadores', this.Prestadores);
          // console.log('this.PrestadoresRes', this.PrestadoresRes);

          const LenghtDescripPrestadores = res.Prestadores.map(
            (a: { Prestador: string }) => a['Prestador'].length
          );
          this.maxLenghtPrest = this.maxNumberArray(LenghtDescripPrestadores);

          this.TipoInforme = res.TipoInforme;
          this.Usuarios = res.Usuarios;
          this.UsuariosRes = res.Usuarios;
          this.AuxUsuarios.push(res.Usuarios);
          console.log('this.AuxUsuarios', this.AuxUsuarios);

          const LenghtDescripUsuarios = res.Usuarios.map(
            (a) => (a['apellido'] + ' , ' + a['nombre']).length
          );
          this.maxLenghtUsuar = this.maxNumberArray(LenghtDescripUsuarios);
          this.iniForm();
          this.AreasRes = res.Areas;
          // this.buscandoAuditoria = false;
          this.modalCargandoService.stopLoading();
        });

      this.iniForm();
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }

  displayFn(state: any) {
    // console.log('displayFn');
    // console.log(state);
    // console.log('this.PrestadoresRes', this.PrestadoresRes);
    // console.log('this.Usuarios', this.Usuarios);
    // console.log(this.PrestadoresRes?.find((a) => a.idprestador == state));

    const aux = this.PrestadoresRes?.find((a) => a.idprestador == state);
    return aux ? aux.Prestador : '';
  }
  displayFn3(state: any) {
    const aux = this.Usuarios?.filter((a) => a.idusuario == state)[0];
    return aux ? aux.apellido + ' , ' + aux.nombre : '';
  }
  displayFn2(state: any) {
    const aux = this.UsuariosRes?.filter(
      (a: { idusuario: any }) => a.idusuario == state
    )[0];
    console.log('state', state);
    console.log('aux', aux);
    console.log('this.Usuarios', this.Usuarios);

    return aux ? aux.apellido + ' , ' + aux.nombre : '';
  }

  iniForm() {
    // this.form = this.formBuilder.group({
    //   prestadores: ['', [Validators.required]],
    //   fechainicio: ['', []],
    //   fechafin: ['', []],
    //   TipoInforme: ['', [Validators.required]],
    //   observaciones: ['', []],
    //   integrantes: this.formBuilder.array([
    //     this.formBuilder.group({
    //       areas: ['', []],
    //       usuarios: ['', []],
    //     }),
    //   ]),
    // });

    this.form.get('prestadores')!.valueChanges.subscribe((value) => {
      // console.log('value', value);
      value = value.toLocaleLowerCase();
      this.Prestadores = this.PrestadoresRes.filter(
        (a) =>
          a.Prestador.toLocaleLowerCase().includes(value) ||
          a.SAP.toString().toLocaleLowerCase().includes(value) ||
          a.CUIT.toLocaleLowerCase().includes(value)
      );
    });
    this.form.get('TipoInforme')!.valueChanges.subscribe((value) => {
      // console.log('value', value);
      // value = value.toLocaleLowerCase();
      const tipoInforme = this.TipoInforme.filter((a) => a.idguia == value)[0];
      console.log('tipoInforme', tipoInforme);

      this.Area = this.AreasRes.filter(
        (a) =>
          a.idguia == tipoInforme.idguia &&
          a.versionguia == tipoInforme.versionactual
      );
      console.log('this.AreasRes', this.AreasRes);
      console.log('this.Area', this.Area);
    });

    this.form.get('integrantes')!.valueChanges.subscribe((input) => {
      console.log('input', input);
      this.AuxUsuarios.forEach(
        (value: Usuarios[], index: number, array: Usuarios[][]) => {
          array[index] = this.UsuariosRes.filter((u) => {
            const nombre = u.apellido + ' , ' + u.nombre;
            const legajo = u.legajo + '';
            const profesion = u.Profesion + '';
            return (
              nombre
                .toLocaleLowerCase()
                .includes(input[index].usuarios.toLocaleLowerCase()) ||
              legajo.includes(input[index].usuarios) ||
              profesion
                .toLocaleLowerCase()
                .includes(input[index].usuarios.toLocaleLowerCase())
            );
          });
        }
      );
    });
    // this.form.get('referente').valueChanges.subscribe((value: string) => {
    //   // console.log(' this.UsuariosRes', this.UsuariosRes);
    //   value = value.toLocaleLowerCase();
    //   this.Usuarios = this.UsuariosRes.filter(
    //     (a) =>
    //       a.apellido?.toLocaleLowerCase().includes(value) ||
    //       a.nombre?.toLocaleLowerCase().includes(value) ||
    //       a.legajo?.toLocaleLowerCase().includes(value) ||
    //       a.Profesion?.toLocaleLowerCase().includes(value)
    //   );
    // });
  }
  range = new FormGroup({
    fechainicio: new FormControl(),
    fechafin: new FormControl(),
  });

  onSave() {
    console.log('onSave', this.form.value);
    this.Guardando = true;
    this.modalCargandoService.startLoading();
    this.datos
      .guardarDatosApi('planificarauditoria', {
        ...this.form.value,
        VERSIONGUIA: this.TipoInforme[0].versionactual,
      })
      .subscribe((res) => {
        this.modalCargandoService.stopLoading();
        this.router.navigate(['/', 'auditoria', res.auditoria.insertId]);
        // this.openSnackBar('Cambios guardados', 'Aceptar');
        console.log(res);
        this.Guardando = false;
      });
  }
  onCancel() {
    // console.log(this.formGroup);
    this.router.navigate(['/']);
  }

  Subelementos = '';
  get getSubelementos() {
    return this.form.get('integrantes') as FormArray;
  }

  Typeof(a: any) {
    return typeof a;
  }
  deleteSubElemento(index: number) {
    const control = <FormArray>this.form.controls['integrantes'];
    if (control != undefined) control.removeAt(index);
  }
  length(o: string | any[]) {
    return o.length;
  }
  addSubElemento() {
    const control = <FormArray>this.form.controls['integrantes'];
    const iniSubelementos = {
      areas: '',
      usuarios: '',
    };
    control.push(this.formBuilder.group(iniSubelementos));
    this.AuxUsuarios.push(this.UsuariosRes);
  }

  treeControl = new NestedTreeControl<FoodNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  hasChild = (_: number, node: FoodNode) =>
    !!node.children && node.children.length > 0;
}
