import { Component } from '@angular/core';
import { Company } from '../models/company';

import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html'
})
export class DeleteComponent {

  company: Company = new Company();
  errors: any[] = [];

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer) {

    this.company = this.route.snapshot.data['company'];
  }

  deleteEvent() {
    this.companyService.DeleteCompany(this.company.id)
      .subscribe(
        company => { this.sucessDelete(company) },
        error => { this.falha(error) }
      );
  }

  sucessDelete(event: any) {

    const toast = this.toastr.success('Company deleted with success', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/company/list']);
      });
    }
  }

  falha(fail) {
    this.errors = fail.error.errors;
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }
}
