import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {FormGroup, FormControl} from '@angular/forms';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog'; // Para usarlo como contenido de un p-dialog
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { PanelModule } from 'primeng/panel';
import { FloatLabel } from 'primeng/floatlabel';

// Modelos del dominio
import { Customer, CustomerCreate, CustomerFormGroup } from '@app/domain/models/customer-model';

interface EntityType {
  label: string;
  value: string;
}

@Component({
  selector: 'app-customer-form',
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule, // Aunque el p-dialog estará en el padre, lo importamos por si acaso
    InputTextModule,
    SelectModule,
    PanelModule,
    ReactiveFormsModule,
    FloatLabel
  ],
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.css',
  standalone: true
})
export class CustomerFormComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  customerForm = this.formBuilder.group<CustomerCreate>({
    entity_type: '',
    ruc: '',
    dni: null,
    name: null,
    last_name: null,
    business_name: null,
    phone_number: null,
    email: null
  });

//   customerForm = new FormGroup<CustomerFormGroup>({
//   entity_type: new FormControl<string>('N', { nonNullable: true }),
//   ruc: new FormControl<string | null>(null),
//   dni: new FormControl<string | null>(null),
//   name: new FormControl<string | null>(null),
//   last_name: new FormControl<string | null>(null),
//   business_name: new FormControl<string | null>(null),
//   phone_number: new FormControl<string | null>(null),
//   email: new FormControl<string | null>(null)
// });





  entityType: EntityType[] | undefined; // Opciones para el tipo de entidad
  selectedEntityType: EntityType | undefined;
// customerForm: any; // Removed duplicate declaration

  ngOnInit() {
    // Si se pasa un cliente, hacemos una copia para evitar mutaciones directas
    this.entityType = [
      { label: 'Persona Natural', value: 'N' },
      { label: 'Persona Jurídica', value: 'J' }
    ]
  }

  // Se activa cuando el formulario es enviado
  onSubmit() {
    console.log('Formulario enviado:', this.customerForm.value);
  }

  onCancel() {
    

  }
}