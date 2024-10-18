import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
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
import { enviroment } from '../../environments/enviroment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  formTitle = 'Register';
  url = enviroment.registerRequestUrl;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(40)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      this.http.post(this.url, formData).subscribe({
        next: () => {
          this.toastr.success("register successfully", "Successfully")
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.toastr.error("register failed", "Failed")
          console.error('Registration error', error);
        },
      });
    } else {
      console.log('Form is invalid');
      this.registerForm.markAllAsTouched();
    }
  }
}
