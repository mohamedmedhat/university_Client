import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { userEnviroment } from '../../environments/enviroment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = signal(false);
  url = userEnviroment.loginRequestUrl;
  formTitle = 'Login'

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.loading.set(true);
      this.http.post(this.url, formData).subscribe({
        next: () => {
          this.toastr.success("login successfully", "Successfully")
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.toastr.error("login failed", "Failed")
          console.log('failed to login'+error);
        },
      });
    }else{
      this.loginForm.markAllAsTouched();
    }
  }
}
