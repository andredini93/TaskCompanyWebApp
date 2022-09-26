import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, fromEvent, merge } from 'rxjs';

import { CustomValidators } from 'ngx-custom-validators';
import { ToastrService } from 'ngx-toastr';

import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { ValidationMessages, GenericValidator, DisplayMessage } from 'src/app/utils/generic-form-validation';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  cadastroForm: FormGroup;
  user: User;

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  changesNotSaved: boolean;

  constructor(private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService) {

    this.validationMessages = {
      email: {
        required: 'Enter the email',
        email: 'Invalid Email'
      },
      password: {
        required: 'Enter the password',
        rangeLength: 'The password must be between 6 and 15 characters long'
      },
      confirmPassword: {
        required: 'Enter the password again',
        rangeLength: 'The password must be between 6 and 15 characters long',
        equalTo: 'The passwords do not match'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {

    let senha = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15])]);
    let senhaConfirm = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15]), CustomValidators.equalTo(senha)]);

    this.cadastroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: senha,
      confirmPassword: senhaConfirm
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.cadastroForm);
      this.changesNotSaved = true;
    });
  }

  AddAccount() {
    if (this.cadastroForm.dirty && this.cadastroForm.valid) {
      this.user = Object.assign({}, this.user, this.cadastroForm.value);

      this.accountService.UserRegister(this.user)
      .subscribe(
          success => {this.processSuccess(success, this.user)},
          fail => {this.processFail(fail)}
      );

      this.changesNotSaved = false;
    }
  }

  processSuccess(response: any, user: User) {
    this.cadastroForm.reset();
    this.errors = [];

    this.accountService.LocalStorage.saveUserLocalData(response, user);

    let toast = this.toastr.success('Register OK!', 'Welcome!!!');
    if(toast){
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }

  processFail(fail: any){
    this.errors = fail.error.errors;
    this.toastr.error('An error has occurred!', 'Ops :(');
  }
}
