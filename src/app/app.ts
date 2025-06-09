import { Component } from '@angular/core';
import { CustomerListPageComponent } from './ui/pages/customer-list/customer-list';
import { ProductSelectionComponent } from './ui/components/product-selection/product-selection';

@Component({
  selector: 'app-root',
  imports: [CustomerListPageComponent, ProductSelectionComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'laser-cotiza';
}