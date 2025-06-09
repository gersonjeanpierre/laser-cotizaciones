// src/app/core/use-cases/product/get-extra-options-by-product-id.usecase.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductRepositoryPort } from '@app/domain/ports/product-repository-port';
import { ProductExtraOption } from '@app/domain/models/product-model';

@Injectable({
  providedIn: 'root'
})
export class GetExtraOptionsByProductIdUseCase {
  constructor(private productRepository: ProductRepositoryPort) {}

  execute(productId: number): Observable<ProductExtraOption[]> {
    return this.productRepository.getExtraOptionsByProductId(productId);
  }
}