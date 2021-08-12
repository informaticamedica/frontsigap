import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { BlankLayoutComponent } from './core/layouts/blank-layout/blank-layout.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'inicio',
        loadChildren: () => import('./modules/inicio/inicio.module').then(m => m.InicioModule)
      },
      {
        path: 'auditoria',
        loadChildren: () => import('./modules/auditoria/auditoria.module').then(m => m.AuditoriaModule)
      }
    ]
  },
  {
    path: 'login',
    component: BlankLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
      }
    ]
  },
  // {
  //   path: '**',
  //   redirectTo: 'others/404'
  // },
  // {
  //   path: 'others',
  //   component: MainLayoutComponent,
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: () => import('./views/others/others.module').then(m => m.OthersModule)
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
