import { FormControl } from "@angular/forms";

export interface Customer {
  id: number;
  clientTypeId: number; 
  entityType: string;
  ruc: string;
  dni: string | null;
  name: string | null;
  lastName: string | null;
  businessName: string | null;
  phoneNumber: string | null;
  email: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface CustomerCreate {
  clientTypeId: number;
  entityType: string;
  ruc: string | null;
  dni: string | null;
  name: string | null;
  lastName: string | null;
  businessName: string | null;
  phoneNumber: string | null;
  email: string | null;
}

export type CustomerFormGroup = {
  clientTypeId: FormControl<number | null>; 
  entityType: FormControl<string | null>;
  ruc: FormControl<string | null>;
  dni: FormControl<string | null>;
  name: FormControl<string | null>;
  lastName: FormControl<string | null>;
  businessName: FormControl<string | null>;
  phoneNumber: FormControl<string | null>;
  email: FormControl<string | null>;
};