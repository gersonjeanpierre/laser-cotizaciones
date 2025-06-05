import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerRepositoryPort } from '../../ports/customer-repository-port';
import { Customer } from '../../models/customer-model';

@Injectable({
  providedIn: 'root' // Esto es para que Angular pueda inyectar este servicio globalmente
})
export class GetAllCustomersUseCase {
  // Aquí la dependencia es el puerto abstracto, no una implementación concreta.
  constructor(private customerRepository: CustomerRepositoryPort) {}

  execute(): Observable<Customer[]> {
    return this.customerRepository.getAllCustomers();
  }
}