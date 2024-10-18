import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { userEnviroment } from '../../environments/enviroment';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    RouterOutlet,
    HttpClientModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  productForm: FormGroup;
  loading = signal(false);
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.productForm = this.fb.group({
      image: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  addProduct() {
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      this.http.post(userEnviroment.addProductUrl, formData).subscribe({
        next: () => {
          this.toastr.success('adding product success', 'Successfull');
        },
        error: (err) => {
          this.toastr.error('adding product Failed', 'Failed');
          console.log('error in adding product', err);
        },
      });
    } else {
      this.productForm.markAllAsTouched();
    }
  }
  getAllProducts() {}
  getProductByName() {}
  updateProduct() {}
  deleteProduct() {}
}
