import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import * as Constantes from 'src/app/shared/utils/constantes';
import { DatosDbService } from 'src/app/api/services/datos.service';
import { ModalCargandoService } from 'src/app/shared/services/modal-cargando.service';
import { VerAuditoria } from 'src/app/api/dto/ver-auditoria.dto';
import { Item } from 'src/app/api/dto/item.dto';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'ver-auditoria',
  templateUrl: './ver-auditoria.component.html',
  styleUrls: ['./ver-auditoria.component.scss'],
})
export class VerAuditoriaComponent implements OnInit {
  Constantes = Constantes;
  @Input('idAuditoria') idauditoria!: string;
  Auditoria: any;
  Informe: any;
  items: any;
  Guardando = false;
  form: FormGroup = this.fb.group({
    items: this.fb.array([]),
  });
  completarGuia = false;
  CompletarGuia(arg: boolean) {
    if (arg) this.form.enable();
    else this.form.disable();
    this.completarGuia = arg;
  }

  constructor(
    private rutaActiva: ActivatedRoute,
    private datos: DatosDbService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private modalCargandoService: ModalCargandoService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.modalCargandoService.startLoading();
    this.datos
      .DatosParametrosApi('auditoria', this.idauditoria)
      .subscribe((res: VerAuditoria) => {
        console.log(res);
        const { Auditoria, Informe, items } = res;
        this.Auditoria = Auditoria;
        this.Informe = Informe;
        this.items = items;
        this.agregarItems(items);
        this.form.disable();
        this.modalCargandoService.stopLoading();
      });
    this.form.get('items')?.valueChanges.subscribe((value) => {
      // console.log('valueChanges', value);
      // if (value.Valor == 'No') console.log('dialogo');
    });
  }

  openDialog(seccion: any, item: any) {
    const dialogRef = this.dialog.open(DialogObservaciones, {
      data: {
        seccion,
        item,
      },
      width: '65%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }

  private configSuccess: MatSnackBarConfig = {
    panelClass: ['style-success'],
  };

  private configError: MatSnackBarConfig = {
    panelClass: ['style-error'],
  };

  public snackbarSuccess(message: string) {
    this._snackBar.open(message, 'Aceptar', this.configSuccess);
  }

  public snackbarError(message: string) {
    this._snackBar.open(message, 'Aceptar', this.configError);
  }

  ELPROBLEMA(asd: any) {
    return this.form.value.items.findIndex(
      (x: { iditem: any }) => x.iditem === asd
    );
    // console.log('qwe', qwe);
  }
  get getSubelementos() {
    return this.form.get('items') as FormArray;
    // return this.form.controls['items'] as FormArray;
  }

  noAplica(item: any) {
    console.log('item', item);
    console.log(this.form);
  }

  onSave() {
    console.log('Form', this.form.value);
    console.log(
      'completos',
      this.form.value.items.filter((a: { Valor: string }) => a.Valor != '')
    );
    this.Guardando = true;
    this.datos
      .guardarDatosParametrosApi('auditoria', this.idauditoria, this.form.value)
      .subscribe((res) => {
        console.log('guardarDatosParametrosApi', res);
        this.Guardando = false;
        this.CompletarGuia(false);
        this.openSnackBar('Cambios guardados', 'Aceptar');
      });

    // console.log('Form');
  }
  onFileInput(e: any) {}

  agregarItems(items: Item[]) {
    items.forEach(({ Valor, iditem, descripcion }) => {
      const ItemControl = this.fb.group({ Valor, iditem, descripcion });
      this.getSubelementos.push(ItemControl);
    });
  }

  agregarItemsInforme(Informe: any[]) {
    const items = Informe.map((inf) => {
      return '';
    });
  }
}

@Component({
  selector: 'dialog-observaciones',
  templateUrl: 'dialog-observaciones.html',
})
export class DialogObservaciones {
  EstadosObservaciones = [
    {
      value: '1',
      viewValue: 'No Regularizable',
    },
    {
      value: '2',
      viewValue: 'No Regularizada',
    },
    {
      value: '3',
      viewValue: 'Accion correctiva',
    },
    {
      value: '4',
      viewValue: 'Regularizada',
    },
  ];

  Datos = [
    {
      Comentarios: 'comentarios anteriores',
      Fecha: '25/03/2021',
      Estado: 'Accion correctiva',
    },
    {
      Comentarios: 'comentarios anteriores',
      Fecha: '12/01/2021',
      Estado: 'Accion correctiva',
    },
  ];

  ngOnInit() {
    console.log('this.data', this.data);
  }

  auditoria(e: any) {}
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
