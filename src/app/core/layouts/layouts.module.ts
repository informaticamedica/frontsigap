import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HeaderComponent } from '../components/header/header.component';
import { BlankLayoutComponent } from './blank-layout/blank-layout.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';

const components = [
  HeaderComponent,
  MainLayoutComponent,
  BlankLayoutComponent,
];

@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    MaterialModule
  ],
  declarations: components,
  exports: components
})
export class LayoutsModule { }
