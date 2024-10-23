import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userEnviroment } from '../../environments/enviroment';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  addProduct(productForm: FormGroup): Observable<any> {
    const url = userEnviroment.addProductUrl;
    const formData = new FormData();
    formData.append('name', productForm.get('name')?.value);
    formData.append('price', productForm.get('price')?.value);
    formData.append('image', productForm.get('image')?.value);
    return this.http.post(url, formData);
  }

  getProductById(productId: string): Observable<any> {
    const url = userEnviroment.getProductById(productId);
    return this.http.get(url);
  }

  getAllProducts(page: number, size: number): Observable<any> {
    const url = userEnviroment.getAllProducts(page, size);
    return this.http.get(url);
  }

  deleteProduct(id: string): Observable<any> {
    const url = userEnviroment.deleteProductById(id);
    return this.http.delete(url);
  }

  updateProduct(id: string, productForm: FormGroup): Observable<any> {
    const url = userEnviroment.updateProduct(id);
    const formData = new FormData();
    formData.append('name', productForm.get('name')?.value);
    formData.append('price', productForm.get('price')?.value);
    formData.append('image', productForm.get('image')?.value);
    return this.http.put(url, formData);
  }
}
