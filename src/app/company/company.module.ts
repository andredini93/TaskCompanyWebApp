import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CompanyRoutingModule } from './company.route';
import { CompanyAppComponent } from './company.app.component';
import { ListComponent } from './list/list.component';
import { CompanyService } from './services/company.service';

import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from "ngx-spinner";

import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { DetailsComponent } from './details/details.component';
import { CompanyResolve } from './services/company.resolve';
import { CompanyGuard } from './services/company.guard';

@NgModule({
  declarations: [
    CompanyAppComponent,
    CreateComponent,
    ListComponent,
    EditComponent,
    DeleteComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgBrazil,
    TextMaskModule,
    NgxSpinnerModule
  ],
  providers: [
    CompanyService,
    CompanyResolve,
    CompanyGuard
  ]
})
export class CompanyModule { }
