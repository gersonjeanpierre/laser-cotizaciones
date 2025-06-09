import { Component, OnInit, Output, EventEmitter, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para ngModel
import { Subject, combineLatest, filter, map, switchMap, takeUntil } from 'rxjs';

// PrimeNG
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService } from 'primeng/api'; 

// Modelos del Dominio
import { Product, ProductExtraOption, CartItem } from '@app/domain/models/product-model';

// Casos de Uso del Dominio
import { GetAllProductsUseCase } from '@app/domain/use-cases/product/get-all-products-usercase';
import { GetExtraOptionsByProductIdUseCase } from '@app/domain/use-cases/product/get-extra-options-by-product-id-usercase';
import { GetPriceByProductAndQuantityUseCase } from '@app/domain/use-cases/product/get-price-by-product-and-quantity-usercase';
import { TypeOptions } from '@app/utils/interfaces/cotiza';
import { SelectButton } from 'primeng/selectbutton';

@Component({
  selector: 'app-product-selection',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    DropdownModule,
    InputNumberModule,
    CheckboxModule,
    SelectButton
  ],
  templateUrl: './product-selection.html',
  styleUrl: './product-selection.css'
})
export class ProductSelectionComponent implements OnInit, OnDestroy {
  @Output() itemAdded = new EventEmitter<CartItem>(); // Emite el item del carrito para añadir
  
  // Inyección de casos de uso y servicios
  private getAllProductsUseCase = inject(GetAllProductsUseCase);
  private getExtraOptionsByProductIdUseCase = inject(GetExtraOptionsByProductIdUseCase);
  // private getPriceByProductAndQuantityUseCase = inject(GetPriceByProductAndQuantityUseCase); // Redefiniremos este para usar el CU

  private messageService = inject(MessageService);

  productsTypeOptions: TypeOptions [] = []
  products: Product[] = [];
  selectedProduct: Product | undefined;
  quantity: number = 1;
  extraOptions: ProductExtraOption[] = [];
  selectedExtraOptions: ProductExtraOption[] = [];

  calculatedUnitPrice: number = 0;
  calculatedTotalPrice: number = 0;

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.productsTypeOptions = [
      { label: 'Gigantografía', value: 'Gigantografía' },
      { label: 'Vinil', value: 'Vinil' },
    ]


    this.getAllProductsUseCase.execute()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al cargar productos.' });
          console.error('Error al cargar productos:', err);
        }
      });

  }
  
  onProductChange(): void {
    
  }

  onQuantityChange(): void {
    this.recalculatePrice(); // Recalcular al cambiar cantidad
  }

  onOptionToggle(): void {
    this.recalculatePrice(); // Recalcular al seleccionar/deseleccionar opciones
  }

  recalculatePrice(): void {
    if (!this.selectedProduct || this.quantity <= 0) {
      this.calculatedUnitPrice = 0;
      this.calculatedTotalPrice = 0;
      return;
    }

    // Lógica para obtener el precio base del producto por cantidad
    // Esto debería venir del use case, que a su vez usa el repositorio.
    // Aquí es donde necesitamos un use case para obtener el precio por rango.

    // Vamos a simular la llamada al repositorio para obtener todos los precios y la lógica de negocio la hacemos aquí
    // (o idealmente en un use case específico para "GetCalculatedPriceForProduct")
   
  }

  // Método de lógica de negocio para calcular el precio
  private calculatePrice(
    product: Product,
    quantity: number,
    selectedOptions: ProductExtraOption[]
  ): void {
    let baseUnitPrice = 0;

    // Buscar el precio unitario del producto basado en la cantidad
    // En la arquitectura hexagonal, esta lógica de negocio de "cómo se calcula el precio"
    // pertenece al dominio (posiblemente a un use case específico o a un método en el Product).


    // Sumar el precio de las opciones extra seleccionadas
   
  }

  addToCart(): void {
    if (!this.selectedProduct || this.quantity <= 0 || this.calculatedTotalPrice <= 0) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Seleccione un producto, cantidad y asegúrese de que el precio sea válido.' });
      return;
    }

    const item: CartItem = {
      product: this.selectedProduct,
      quantity: this.quantity,
      selectedOptions: [...this.selectedExtraOptions], // Copia para evitar mutaciones externas
      unitPrice: this.calculatedUnitPrice,
      totalPrice: this.calculatedTotalPrice
    };
    this.itemAdded.emit(item);
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Producto añadido al carrito.' });

    // Resetear selección para el siguiente producto
    this.selectedProduct = undefined;
    this.quantity = 1;
    this.extraOptions = [];
    this.selectedExtraOptions = [];
    this.calculatedUnitPrice = 0;
    this.calculatedTotalPrice = 0;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}