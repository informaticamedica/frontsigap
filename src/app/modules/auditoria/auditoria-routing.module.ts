import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth/auth.guard';
import { WizardComponent } from './pages/wizard/wizard.component';

const routes: Routes = [
  {
    path: '',
    component: WizardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':idauditoria',
    component: WizardComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuditoriaRoutingModule { }
