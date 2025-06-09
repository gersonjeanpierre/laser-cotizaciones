import { FormControl } from "@angular/forms";

export interface Product{
  id: string;
  name: string;
  type: string;
  unityMeasure: string; // metro lineal, metro cuadrado, item, etc.
  baseCost: number;
  imageUrl: string | null; // URL de la imagen del producto  
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