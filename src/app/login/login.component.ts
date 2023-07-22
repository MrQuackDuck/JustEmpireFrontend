import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';
import { TranslateService } from '../services/translate.service';
import { NotifierService } from 'angular-notifier';

interface LoginResponse {
  token: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form : FormGroup;
  showError : boolean = false;

  constructor(private formBuilder : FormBuilder, private loadingService : LoadingService, 
  private router : Router, private authService : AuthService, private translateService : TranslateService,
  private notifierService : NotifierService) {}

  ngOnInit() {
    this.loadingService.disableLoading();
    this.form = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  submit() : void {
    this.loadingService.enableLoading();
    let formData = this.form.getRawValue();
    this.authService.login(formData.username, formData.password)
      .subscribe(() => this.router.navigate(['/admin']),
      error => {
        this.loadingService.disableLoading();
        if (error.status == 503) {
          this.notifierService.notify('error', this.translateService.translate('TOO_MANY_REQUESTS'));
          return;
        }
        this.showError = true;
      });
  }
}

