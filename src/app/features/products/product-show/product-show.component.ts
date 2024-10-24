import { Component, OnInit, signal } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
import { IProductsResponse } from '../../../shared/models/product.interface';
import { ProductService } from '../../../api/product.service';
import { CommonModule } from '@angular/common';
import { ConvertTimeStampDateToStringDatePipe } from '../../../shared/pipes/convert-time-stamp-date-to-string-date.pipe';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product-show',
  standalone: true,
  imports: [
    CardComponent,
    CommonModule,
    HttpClientModule,
    ConvertTimeStampDateToStringDatePipe,
  ],
  providers: [ProductService],
  templateUrl: './product-show.component.html',
  styleUrl: './product-show.component.scss',
})
export class ProductShowComponent implements OnInit {
  products = signal<IProductsResponse | null>(null);
  loading = signal<boolean>(false);
  page = signal<number>(0);
  size = signal<number>(9);
  totalPages = signal<number>(1);
  availablePageSizes = [5, 9, 15, 20];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    const paginatePage = this.page();
    const paginateSize = this.size();
    this.loading.set(true);
    this.productService.getAllProducts(paginatePage, paginateSize).subscribe({
      next: (data) => {
        this.products.set(data);
        this.totalPages.set(Math.ceil(data.totalElements / paginateSize));
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
 
  prevPage() {
    if (this.page() > 0) {
      this.page.set(this.page() - 1);
      this.loadProducts();
    }
  }

  nextPage() {
    if (this.page() < this.totalPages() - 1) {
      this.page.set(this.page() + 1);
      this.loadProducts();
    }
  }

  changePageSize(event: Event) {
    const newSize = (event.target as HTMLSelectElement).value;
    this.size.set(Number(newSize));
    this.page.set(0);
    this.loadProducts();
  }

  goToMeeting() {}
}
