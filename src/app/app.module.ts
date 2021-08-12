import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';

//paginas
import { PrincipalComponent } from './paginas/principal/principal.component';
import { PlanificarAuditoriaComponent } from './componentes/planificar-auditoria/planificar-auditoria.component';
import { VerAuditoriaComponent } from './componentes/ver-auditoria/ver-auditoria.component';

//componentes
import { TablaGenericaComponent } from './componentes/tabla-generica/tabla-generica.component';
import { SigninComponent } from './componentes/signin/signin.component';
import { SignupComponent } from './componentes/signup/signup.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';

//servicios

//material
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TablaPipe } from './pipe/tabla.pipe';
import { WizardAuditoriaComponent } from './paginas/wizard-auditoria/wizard-auditoria.component';
import { ModalCargandoComponent } from './componentes/modal-cargando/modal-cargando.component';
import { ModalCargandoService } from './componentes/modal-cargando/modal-cargando.service';
import { BotoneraEstadosComponent } from './componentes/botonera-estados/botonera-estados.component';

export function tokenGetter() {
  return sessionStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    PlanificarAuditoriaComponent,
    VerAuditoriaComponent,
    TablaGenericaComponent,
    SigninComponent,
    SignupComponent,
    NavbarComponent,
    TablaPipe,
    WizardAuditoriaComponent,
    ModalCargandoComponent,
    BotoneraEstadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatGridListModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatDividerModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,
    NgbModule,
    MatTabsModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-AR' }, ModalCargandoService],
  bootstrap: [AppComponent],
})
export class AppModule { }
