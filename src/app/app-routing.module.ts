import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './componentes/signin/signin.component';
import { SignupComponent } from './componentes/signup/signup.component';
import { PrincipalComponent } from './paginas/principal/principal.component';
import { AuthGuard } from './servicios/auth.guard';
import { WizardAuditoriaComponent } from './paginas/wizard-auditoria/wizard-auditoria.component';

const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'principal',
    component: PrincipalComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'planificarauditoria',
  //   component: PlanificarAuditoriaComponent,
  //   canActivate: [AuthGuard],
  // },
  // {
  //   path: 'auditoria/:idauditoria',
  //   component: VerAuditoriaComponent,
  //   canActivate: [AuthGuard],
  // },
  {
    path: 'auditoria',
    component: WizardAuditoriaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auditoria/:idauditoria',
    component: WizardAuditoriaComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
