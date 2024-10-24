import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Router,
  RouterModule,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../api/product.service';
import { HttpClientModule } from '@angular/common/http';
import { IProductsResponse } from '../../../shared/models/product.interface';
import { ConvertTimeStampDateToStringDatePipe } from '../../../shared/pipes/convert-time-stamp-date-to-string-date.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ConvertTimeStampDateToStringDatePipe
  ],
  providers: [ProductService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductTableComponent {
  tableHeader = 'Product Items';
  productForm: FormGroup;
  products = signal<IProductsResponse | null>(null);
  totalProducts = signal<number>(0);
  totalPrice = signal<number>(0);
  fileInvalid: boolean = false;
  page = signal<number>(0);
  size = signal<number>(9);
  isEditMode = signal<boolean>(false);
  selectedProductId = signal<string | null>(null);
  loading = signal(false);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private toastr: ToastrService
  ) {
    this.productForm = this.fb.group({
      image: ['', Validators.required],
      name: ['', Validators.required],
      price: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    const pageValue = this.page();
    const sizeValue = this.size();
    this.productService.getAllProducts(pageValue, sizeValue).subscribe({
      next: (data) => {
        this.products.set(data);
        this.totalProducts.set(data.totalElements);
        this.totalPrice.set(
          data.content.reduce(
            (sum: any, product: any) => sum + product.price,
            0
          )
        );
      },
      error: (err) => {
        this.toastr.error('Failed to retrieve all products', 'Error');
        console.error('Error in getAllProducts:', err);
      },
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.fileInvalid = !file;
    this.productForm.patchValue({
      image: file,
    });
  }

  resetForm() {
    this.productForm.reset();
    this.fileInvalid = false;
    this.productForm.patchValue({ image: null });
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  addProduct() {
    if (this.productForm.valid && !this.fileInvalid) {
      this.loading.set(true);
      this.productService.addProduct(this.productForm).subscribe({
        next: () => {
          this.toastr.success('Adding product success', 'Success');
          this.resetForm();
        },
        error: (err) => {
          this.loading.set(false);
          this.toastr.error('Adding product failed', 'Failed');
          console.error('Error in adding product:', err);
        },
        complete: () => {
          this.loading.set(false);
        },
      });
    } else {
      this.productForm.markAllAsTouched();
      this.fileInvalid = !this.fileInvalid;
      this.loadProducts();
    }
  }

  showProductDetail(productId: string) {
    this.router.navigate(['/product-detail', productId]);
  }

  showEditForm(id: string) {
    this.isEditMode.set(true);
    this.selectedProductId.set(id);
    const product = this.products()?.content.find((p) => p.id === id);
    if (product) {
      this.productForm.patchValue({
        name: product.name,
        price: product.price,
        image: null,
      });
    }
  }

  updateProduct() {
    if (this.productForm.valid && !this.fileInvalid && this.selectedProductId) {
      this.loading.set(true);
      const id = this.selectedProductId();
      this.productService
        .updateProduct(id as string, this.productForm)
        .subscribe({
          next: () => {
            this.toastr.success('Update product success', 'Success');
            this.resetForm();
          },
          error: (err) => {
            this.loading.set(false);
            this.toastr.error('Update product failed', 'Failed');
            console.error('Error in update product:', err);
          },
          complete: () => {
            this.loading.set(false);
            this.isEditMode.set(false);
            this.selectedProductId.set(null);
            this.loadProducts();
          },
        });
    } else {
      this.productForm.markAllAsTouched();
      this.fileInvalid = !this.fileInvalid;
    }
  }

  deleteProduct(id: string) {
    this.loading.set(true);
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.toastr.success('delete product successfully', 'successfully');
      },
      error: (err) => {
        this.loading.set(false);
        console.log(err);
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }
}
