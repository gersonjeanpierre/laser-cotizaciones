import { Observable } from 'rxjs';
import { Product, ProductExtraOption } from '@app/domain/models/product-model';

export abstract class ProductRepositoryPort {
  abstract getAllProducts(): Observable<Product[]>;
  abstract getProductById(id: number): Observable<Product>;
  abstract getExtraOptionsByProductId(productId: number): Observable<ProductExtraOption[]>;
  abstract getPricesByProductId(productId: number): Observable<[]>;
  abstract getPriceByProductAndQuantity(productId: number, quantity: number): Observable<undefined>;
}