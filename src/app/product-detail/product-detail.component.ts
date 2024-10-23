import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../api/product.service';
import { IProduct } from '../interfaces/product.interface';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [HttpClientModule],
  providers: [ProductService],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  loading = signal<boolean>(false);
  product = signal<IProduct | null>(null);

  constructor(
    private router: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loading.set(true);
    const id = this.router.snapshot.paramMap.get('id')!;
    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.product.set(data);
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

  convertTimeStampToLocaleDateString(timestamp: string | Date | undefined) {
    return timestamp ? new Date(timestamp).toLocaleDateString() : 'N/A';
  }
}
