import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { LayoutsModule } from './core/layouts/layouts.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutModule } from '@angular/cdk/layout';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
const dbConfig: DBConfig = {
  name: 'MyDb',
  version: 1,
  objectStoresMeta: [{
    store: 'auditorias',
    storeConfig: { keyPath: 'idauditoria', autoIncrement: false },
    storeSchema: [
      { name: 'CUIT', keypath: 'CUIT', options: { unique: false } },
      { name: 'EstadoAuditoria', keypath: 'EstadoAuditoria', options: { unique: false } },
      { name: 'colorEstado', keypath: 'colorEstado', options: { unique: false } },
      { name: 'Prestador', keypath: 'Prestador', options: { unique: false } },
      { name: 'ProvinciaPrestador', keypath: 'ProvinciaPrestador', options: { unique: false } },
      { name: 'UGL', keypath: 'UGL', options: { unique: false } },
      { name: 'domicilio', keypath: 'domicilio', options: { unique: false } },
      { name: 'email', keypath: 'email', options: { unique: false } },
      { name: 'fechainicio', keypath: 'fechainicio', options: { unique: false } },
      { name: 'idestadoauditoria', keypath: 'idestadoauditoria', options: { unique: false } },
      { name: 'idguia', keypath: 'idguia', options: { unique: false } },
      { name: 'idprovincia', keypath: 'idprovincia', options: { unique: false } },
      { name: 'idugl', keypath: 'idugl', options: { unique: false } },
      { name: 'localidad', keypath: 'localidad', options: { unique: false } },
      { name: 'telefono', keypath: 'telefono', options: { unique: false } },
      { name: 'versionguia', keypath: 'versionguia', options: { unique: false } }
    ]
  },
   {
    store: 'estados',
    storeConfig: { keyPath: 'idestadoauditoria', autoIncrement: false },
    storeSchema: [
      { name: 'descripcion', keypath: 'descripcion', options: { unique: false } },
      { name: 'color', keypath: 'color', options: { unique: false } }
    ]
  },
   {
    store: 'flujo-estados',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'idestadoauditoriadesde', keypath: 'idestadoauditoriadesde', options: { unique: false } },
      { name: 'idestadoauditoriahasta', keypath: 'idestadoauditoriahasta', options: { unique: false } }
    ]
  }
]
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    LayoutModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutsModule,
    SharedModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
