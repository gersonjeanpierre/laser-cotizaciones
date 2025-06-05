export interface Customer {
  id: number;
  entity_type: string;
  ruc?: string; // Optional
  dni?: string; // Optional
  name?: string; // Optional
  last_name?: string; // Optional
  business_name?: string; // Optional
  phone_number?: string; // Optional
  email?: string; // Optional
  created_at?: string; // FastAPI devuelve ISO 8601 string
  updated_at?: string; // FastAPI devuelve ISO 8601 string
}

export interface CustomerCreate {
  entity_type: string;
  ruc?: string;
  dni?: string;
  name?: string;
  last_name?: string;
  business_name?: string;
  phone_number?: string;
  email?: string;
}