import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../api/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = signal(false);
  formTitle = 'Login';
  token: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.authService.login(this.loginForm).subscribe({
      next: (data) => {
        this.setToken(data.token);
        this.toastr.success('Login successfully', 'Successfully');
        this.router.navigate(['/']);
      },
      error: (error) => this.handleLoginError(error),
      complete: () => this.loading.set(false),
    });
  }

  private setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', this.token);
  }

  private handleLoginError(error: any) {
    this.loading.set(false);
    this.toastr.error('Login failed', 'Failed');
    console.log('Failed to login: ', error);
  }
}
