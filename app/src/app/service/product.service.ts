import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8000/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  createProduct(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, product);
  }
  // Delete a product by ID
  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${productId}`);
  }

  // Get product by ID (to load in the update form)
  getProductById(productId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${productId}`);
  }

  // Update a product by ID
  updateProduct(productId: string, productData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/update/${productId}`, productData);
  }
}
