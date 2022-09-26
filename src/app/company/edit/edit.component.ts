import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, fromEvent, merge } from 'rxjs';
import { utilsBr } from 'js-brasil';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

import { ValidationMessages, GenericValidator, DisplayMessage } from 'src/app/utils/generic-form-validation';
import { StringUtils } from 'src/app/utils/string-utils';
import { Company } from '../models/company';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  companyForm: FormGroup;
  validateIsinField: boolean = false;

  company: Company = new Company();

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  MASKS = utilsBr.MASKS;
  formResult: string = '';

  constructor(private fb: FormBuilder,
    private companyService: CompanyService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService) {

    this.validationMessages = {
      name: {
        required: 'Fill the Name input',
      },
      exchange: {
        required: 'Fill the Exchange input',
      },
      ticker: {
        required: 'Fill the Ticker input',
      },
      isin: {
        required: 'Informe o ISIN input',
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);

    this.company = this.route.snapshot.data['company'];
  }

  ngOnInit() {

    this.spinner.show();

    this.companyForm = this.fb.group({
      id: '',
      name: ['', [Validators.required]],
      exchange: ['', [Validators.required]],
      ticker: ['', [Validators.required]],
      isin: ['', [Validators.required]],
      website: ['']
    });

    this.preencherForm();

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  preencherForm() {

    this.companyForm.patchValue({
      id: this.company.id,
      name: this.company.name,
      exchange: this.company.exchange,
      ticker: this.company.ticker,
      isin: this.company.isin,
      website: this.company.website
    });
  }

  ngAfterViewInit() {
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
  }

  editCompany() {
    if (this.companyForm.dirty && this.companyForm.valid) {
      if(!this.genericValidator.IsinCustomValidator(this.companyForm.controls['isin'].value)){
        this.validateIsinField = true;
      }
      else{
        this.company = Object.assign({}, this.company, this.companyForm.value);

        this.companyService.UpdateCompany(this.company)
          .subscribe(
            sucesso => { this.processSuccess(sucesso) },
            falha => { this.processFail(falha) }
          );
      }
    }
  }

  processSuccess(response: any) {
    this.errors = [];

    let toast = this.toastr.success('Company was updated!', 'Success!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/company/list']);
      });
    }
  }

  processFail(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('An error ocurred!', 'Ops :(');
  }

  abrirModal(content) {
    this.modalService.open(content);
  }
}
