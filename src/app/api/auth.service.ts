import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userEnviroment } from '../../environments/enviroment';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(registerForm: FormGroup): Observable<any> {
    const url = userEnviroment.registerRequestUrl;
    const formData = registerForm.value;
    return this.http.post(url, formData);
  }

  login(loginForm: FormGroup): Observable<any> {
    const url = userEnviroment.loginRequestUrl;
    const formData = loginForm.value;
    return this.http.post(url, formData);
  }

  isLogin(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
