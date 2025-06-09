import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductRepositoryPort } from '@app/domain/ports/product-repository-port';
import { Product, ProductExtraOption } from '@app/domain/models/product-model';

@Injectable({
  providedIn: 'root'
})

export class ProductApiService implements ProductRepositoryPort {
  private apiUrl = 'http://127.0.0.1:8000/api/v1'; 

  constructor(private http: HttpClient) { }
  
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }
  
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }
  
  getExtraOptionsByProductId(productId: number): Observable<ProductExtraOption[]> {
    // Asumiendo que la API tiene un endpoint para esto, ej: /products/{id}/extra-options
    return this.http.get<ProductExtraOption[]>(`${this.apiUrl}/products/${productId}/extra_options`);
  }
  
  getPricesByProductId(productId: number): Observable<[]> {
    // Asumiendo un endpoint como /products/{id}/prices
    throw new Error('Method not implemented.');
  }

  getPriceByProductAndQuantity(productId: number, quantity: number): Observable<undefined> {
    throw new Error('Method not implemented.');
  }
  
}