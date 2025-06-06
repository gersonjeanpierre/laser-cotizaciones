import { Observable } from 'rxjs';
import { Customer, CustomerCreate } from '../models/customer-model';

// Este es el "Puerto" que define qué operaciones se pueden realizar con los clientes.
// No le importa CÓMO se implementan estas operaciones.
export abstract class CustomerRepositoryPort { // Usamos 'abstract class' para los tokens de inyección
  abstract getAllCustomers(): Observable<Customer[]>;
  abstract getCustomerById(id: number): Observable<Customer>;
  abstract updateCustomer(id: number, customer: CustomerCreate): Observable<Customer>;
  abstract createCustomer(customer: CustomerCreate): Observable<Customer>;
  abstract deleteCustomer(id: number): Observable<void>; // Lo añadiremos después
}