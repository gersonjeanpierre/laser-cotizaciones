import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerRepositoryPort } from '../../ports/customer-repository-port';
import { Customer } from '../../models/customer-model';

@Injectable({
  providedIn: 'root'
})
export class GetCustomerByIdUseCase {
  constructor(private customerRepository: CustomerRepositoryPort) {}

  execute(id: number): Observable<Customer> {
    return this.customerRepository.getCustomerById(id);
  }
}