// src/app/core/use-cases/product/get-all-products.usecase.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductRepositoryPort } from '@app/domain/ports/product-repository-port';
import { Product } from  '@app/domain/models/product-model';

@Injectable({
  providedIn: 'root'
})
export class GetAllProductsUseCase {
  constructor(private productRepository: ProductRepositoryPort) {}

  execute(): Observable<Product[]> {
    return this.productRepository.getAllProducts();
  }
}
