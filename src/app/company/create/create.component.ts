import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, fromEvent, merge } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { utilsBr } from 'js-brasil';

import { ValidationMessages, GenericValidator, DisplayMessage } from 'src/app/utils/generic-form-validation';
import { Company } from '../models/company';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  companyForm: FormGroup;
  company: Company = new Company();
  validateIsinField: boolean = false;

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  MASKS = utilsBr.MASKS;
  formResult: string = '';

  changesNotSaved: boolean;

  constructor(private fb: FormBuilder,
    private companyService: CompanyService,
    private router: Router,
    private toastr: ToastrService) {

    this.validationMessages = {
      name: {
        required: 'Enter the Name',
      },
      exchange: {
        required: 'Enter the Exchange',
      },
      ticker: {
        required: 'Enter the Ticker',
      },
      isin: {
        required: 'Enter the ISIN',
      },
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {

    this.companyForm = this.fb.group({
      name: ['', [Validators.required]],
      exchange: ['', [Validators.required]],
      ticker: ['', [Validators.required]],
      isin: ['', [Validators.required]],
      website: ['']
    });
  }

  ngAfterViewInit(): void {
    this.configurarElementosValidacao();
  }

  configurarElementosValidacao() {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.validateFormCompany();
    });
  }

  validateFormCompany() {
    this.validateIsinField = false;
    this.displayMessage = this.genericValidator.processMessages(this.companyForm);
    this.changesNotSaved = true;
  }

  createCompany() {
    if (this.companyForm.dirty && this.companyForm.valid) {
      if(!this.genericValidator.IsinCustomValidator(this.companyForm.controls['isin'].value)){
        this.validateIsinField = true;
      }
      else{
        this.company = Object.assign({}, this.company, this.companyForm.value);
        this.formResult = JSON.stringify(this.company);

        this.companyService.NewCompany(this.company)
          .subscribe(
            success => { this.processSuccess(success) },
            fail => { this.processFail(fail) }
          );
      }
    }
  }

  processSuccess(response: any) {
    this.companyForm.reset();
    this.errors = [];

    this.changesNotSaved = false;

    let toast = this.toastr.success('Company succefully registred!', 'Success!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/company/list']);
      });
    }
  }

  processFail(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('An error has occurred!', 'Ops :(');
  }
}
