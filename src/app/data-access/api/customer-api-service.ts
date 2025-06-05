import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerRepositoryPort } from '@app/domain/ports/customer-repository-port';
import { Observable } from 'rxjs';
import { Customer, CustomerCreate } from '@app/domain/models/customer-model';

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService implements CustomerRepositoryPort{

  private apiUrl = "https://127.0.0.1:8000/api/v1/customers";

  constructor( private http: HttpClient ) {}

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }
  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }
  createCustomer(customer: CustomerCreate): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }
  updateCustomer(id: number, customer: CustomerCreate): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/${id}`, customer);
  }
  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
