import { FormControl } from "@angular/forms";

export interface Customer {
  id: number;
  entity_type: string;
  ruc: string; // Optional
  dni: string | null; // Optional
  name: string | null; // Optional
  last_name: string | null; // Optional
  business_name: string | null; // Optional
  phone_number: string | null; // Optional
  email: string | null; // Optional
  created_at: string | null; // FastAPI devuelve ISO 8601 string
  updated_at: string | null; // FastAPI devuelve ISO 8601 string
}

export interface CustomerCreate {
  entity_type: string; // Por defecto, Persona Natural ('N')
  ruc: string | null; // Optional, solo para Persona Jurídica
  dni: string | null;
  name: string | null;
  last_name: string | null;
  business_name: string | null;
  phone_number: string | null;
  email: string | null;
}

export type CustomerFormGroup = {
  entity_type: FormControl<string | null>; // Por defecto, Persona Natural
  ruc: FormControl<string | null>;
  dni: FormControl<string | null>;
  name: FormControl<string | null>;
  last_name: FormControl<string | null>;
  business_name: FormControl<string | null>;
  phone_number: FormControl<string | null>;
  email: FormControl<string | null>;
};