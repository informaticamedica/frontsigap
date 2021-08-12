import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/shared/material.module";
import { SharedModule } from "src/app/shared/shared.module";
import { AuditoriaRoutingModule } from "./auditoria-routing.module";
import { BotoneraEstadosComponent } from "./components/botonera-estados/botonera-estados.component";
import { PlanificarAuditoriaComponent } from "./components/planificar-auditoria/planificar-auditoria.component";
import { VerAuditoriaComponent } from "./components/ver-auditoria/ver-auditoria.component";
import { WizardComponent } from "./pages/wizard/wizard.component";

@NgModule({
  declarations: [
    PlanificarAuditoriaComponent,
    VerAuditoriaComponent,
    WizardComponent,
    BotoneraEstadosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuditoriaRoutingModule,
    SharedModule,
    MaterialModule
  ],
  providers: []
})
export class AuditoriaModule { }
