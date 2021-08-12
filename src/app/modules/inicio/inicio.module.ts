import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "src/app/shared/material.module";
import { SharedModule } from "src/app/shared/shared.module";
import { InicioRoutingModule } from "./inicio-routing.module";
import { InicioComponent } from "./pages/inicio/inicio.component";

@NgModule({
  declarations: [
    InicioComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    SharedModule,
    MaterialModule
  ],
  providers: []
})
export class InicioModule { }
