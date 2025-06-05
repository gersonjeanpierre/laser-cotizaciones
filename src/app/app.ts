import { Component } from '@angular/core';
import { Customers } from './customers/customers';

@Component({
  selector: 'app-root',
  imports: [Customers],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'laser-cotiza';
}