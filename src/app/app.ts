import { Component } from '@angular/core';
import { CustomerFormComponent } from './ui/components/customer-form/customer-form';

@Component({
  selector: 'app-root',
  imports: [CustomerFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'laser-cotiza';
}