import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyAppComponent } from './company.app.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { DeleteComponent } from './delete/delete.component';
import { CompanyResolve } from './services/company.resolve';
import { CompanyGuard } from './services/company.guard';

const companyRouterConfig: Routes = [
    {
        path: '', component: CompanyAppComponent,
        children: [
            { path: 'list', component: ListComponent },
            {
                path: 'create', component: CreateComponent,
                canDeactivate: [CompanyGuard],
                canActivate: [CompanyGuard]
            },
            {
                path: 'edit/:id', component: EditComponent,
                canActivate: [CompanyGuard],
                resolve: {
                    company: CompanyResolve
                }
            },
            {
                path: 'details/:id', component: DetailsComponent,
                resolve: {
                    company: CompanyResolve
                }
            },
            {
                path: 'delete/:id', component: DeleteComponent,
                canActivate: [CompanyGuard],
                resolve: {
                    company: CompanyResolve
                }
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(companyRouterConfig)
    ],
    exports: [RouterModule]
})
export class CompanyRoutingModule { }
