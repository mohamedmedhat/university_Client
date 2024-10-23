import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
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
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../api/auth.service';

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
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = signal(false);
  formTitle = 'Login';

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
    if (this.loginForm.valid) {
      this.loading.set(true);
      this.authService.login(this.loginForm).subscribe({
        next: () => {
          this.toastr.success('login successfully', 'Successfully');
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.loading.set(false);
          this.toastr.error('login failed', 'Failed');
          console.log('failed to login' + error);
        },
        complete: () => {
          this.loading.set(false);
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
