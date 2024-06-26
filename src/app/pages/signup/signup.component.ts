import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { SignupForm } from 'src/app/commons/forms/public.form';
import { AuthTokenService } from 'src/app/commons/services/auth-token.service';
import { RegisterService } from 'src/app/commons/services/register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  Form = new SignupForm();

  login(){
    this.router.navigate(['/login']);
  }

  constructor(
    private registerService: RegisterService,
    public router: Router,
    private authTokenService: AuthTokenService,
    private toastr: ToastrService
  ) {} 

  register(form: SignupForm['form']): void{
    if (form.invalid) {
      this.toastr.error('', 'Please fill in all required fields correctly.');
      return;
    }

    if (form.value.password != form.value.re_password) {
      this.toastr.error('', 'Passwords do not match.');
      return;
    }

    this.registerService.register(form.value)
    .pipe(
      catchError(error => {
        if (error.error.email == 'user with this email already exists.') {
          this.toastr.error('', 'This email is already taken!');
        }
        else{
          console.error('Registration failed:', error);
          this.toastr.error('', 'Registration failed!');
        }
        throw error;
      })
    )
    .subscribe(response => {
        this.authTokenService.setAuthToken(response.token);
        this.toastr.success('You have successfully created account!');
        this.router.navigate(['/create-workspace']);
    });
  }
}
