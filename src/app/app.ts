import { Component } from '@angular/core';
import { CustomerFormComponent } from './ui/components/customer-form/customer-form';
import { CustomerListPageComponent } from './ui/pages/customer-list/customer-list';

@Component({
  selector: 'app-root',
  imports: [CustomerListPageComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'laser-cotiza';
}