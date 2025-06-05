import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerRepositoryPort } from '../../ports/customer-repository-port';
import { Customer, CustomerCreate } from '../../models/customer-model';

@Injectable({
  providedIn: 'root'
})
export class CreateCustomerUseCase {
  constructor(private customerRepository: CustomerRepositoryPort) {}

  execute(customer: CustomerCreate): Observable<Customer> {
    return this.customerRepository.createCustomer(customer);
  }
}