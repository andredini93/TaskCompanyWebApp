import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './navigation/home/home.component';
import { NotFoundComponent } from './navigation/not-found/not-found.component';
import { AccessDeniedComponent } from './navigation/access-denied/access-denied.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module')
      .then(m => m.AccountModule)
  },
  {
    path: 'company',
    loadChildren: () => import('./company/company.module')
      .then(m => m.CompanyModule)
  },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: 'nao-encontrado', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
