import { FormControl } from "@angular/forms";

export interface Product{
  id: string;
  name: string;
  type: string;
  unityMeasure: string;
  baseCost: number;
  imageUrl: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface ProductCreate {
  name: string;
  type: string;
  unityMeasure: string; // metro lineal, metro cuadrado, item, etc.
  baseCost: number;
}

export type ProductFormGroup = {
  name: FormControl<string | null>;
  type: FormControl<string | null>;
  unityMeasure: FormControl<string | null>;
  baseCost: FormControl<number | null>;
};

export interface ProductExtraOption {
  id: string;
  productoId: string;
  description: string;
  baseCost: number;
  createdAt: string | null;
  updatedAt: string | null;
}


// Modelos para el Carrito de Compras (Dominio - lo que la lógica de negocio entiende)

// Un item en el carrito, antes de ser un "Detalle Cotizacion" final
export interface CartItem {
  product: Product; // El producto base
  quantity: number; // Cantidad seleccionada
  selectedOptions: ProductExtraOption[]; // Opciones extra seleccionadas para este producto
  unitPrice: number; // Precio unitario calculado (base + opciones + rango de precios)
  totalPrice: number; // Precio total de este item (unitPrice * quantity)
}

// Estructura para crear un Detalle de Cotización en la API
export interface QuotationDetailCreate {
  id_producto: number;
  cantidad: number;
  precio_unitario_final: number; // Este es el precio_total por unidad para este item
  opciones_extra_ids: number[]; // IDs de las opciones extra seleccionadas
}

// Estructura para el Registro de Cotización (la "Orden de Compra")
export interface QuotationRegisterCreate {
  id_cliente: number;
  fecha?: string; // La API podría generarla, pero podemos enviarla
  detalles: QuotationDetailCreate[]; // Los ítems del carrito
}

// Modelo de respuesta para Detalle de Cotización (lo que la API devuelve)
export interface QuotationDetail {
  id_detalle: number;
  id_registro: number;
  id_producto: number;
  cantidad: number;
  precio_unitario_final: number;
  // Podrías incluir las opciones aquí si la API las devuelve anidadas
  opciones_extra: ProductExtraOption[];
  created_at?: string;
}

// Modelo de respuesta para Registro de Cotización
export interface QuotationRegister {
  id_registro: number;
  id_cliente: number;
  fecha: string;
  detalles: QuotationDetail[];
  created_at?: string;
  updated_at?: string;
}