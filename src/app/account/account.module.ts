import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AccountAppComponent } from './account.app.component';

import { AccountRoutingModule } from './account.route';
import { AccountService } from './services/account.service';

import { CustomFormsModule } from 'ngx-custom-validators'
import { AccountGuard } from './services/account.guard';

@NgModule({
  declarations: [
    AccountAppComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CustomFormsModule
  ],
  providers: [
    AccountService,
    AccountGuard
  ]
})
export class AccountModule { }
