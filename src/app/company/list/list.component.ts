import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service';
import { Company } from '../models/company';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  public companies: Company[];
  errorMessage: string;

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.companyService.GetAll()
      .subscribe(
        companies => this.companies = companies,
        error => this.errorMessage);
  }
}
