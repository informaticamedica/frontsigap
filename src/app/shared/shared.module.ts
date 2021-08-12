import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ModalCargandoComponent } from "./components/modal-cargando/modal-cargando.component";
import { TablaGenericaComponent } from "./components/tabla-generica/tabla-generica.component";
import { MaterialModule } from "./material.module";
import { TablaPipe } from "./pipes/tabla.pipe";
import { ModalCargandoService } from "./services/modal-cargando.service";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
const components = [
  ModalCargandoComponent,
  TablaGenericaComponent,
  TablaPipe
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    NgbModule,
    MaterialModule
  ]
})
export class SharedModule { }
