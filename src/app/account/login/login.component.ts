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
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  loginForm: FormGroup;
  user: User;

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService) {

    this.validationMessages = {
      email: {
        required: 'Fill the Email input',
        email: 'Invalid Email'
      },
      password: {
        required: 'Fill the password input',
        rangeLength: 'Password needs to have between 6 and 15 characters'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, CustomValidators.rangeLength([6, 15])]]
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.loginForm);
    });
  }

  login() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.user = Object.assign({}, this.user, this.loginForm.value);

      this.accountService.login(this.user)
      .subscribe(
          sucesso => {this.processSuccess(sucesso, this.user)},
          falha => {this.processFail(falha)}
      );
    }
  }

  processSuccess(response: any, user: User) {
    this.loginForm.reset();
    this.errors = [];

    this.accountService.LocalStorage.saveUserLocalData(response, user);

    let toast = this.toastr.success('Login successfully', 'Welcome!!!');
    if(toast){
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }

  processFail(fail: any){
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}
