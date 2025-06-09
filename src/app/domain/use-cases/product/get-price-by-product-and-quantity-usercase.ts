import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductRepositoryPort } from '@app/domain/ports/product-repository-port';

@Injectable({
  providedIn: 'root'
})
export class GetPriceByProductAndQuantityUseCase {
  constructor(private productRepository: ProductRepositoryPort) {}

  
}