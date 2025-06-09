import { Component, EventEmitter, Input, Output, OnInit, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog'; // Para usarlo como contenido de un p-dialog
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { PanelModule } from 'primeng/panel';
import { FloatLabel } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';

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
    // FloatLabel,
    IftaLabelModule
  ],
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.css',
  standalone: true
})

export class CustomerFormComponent implements OnInit, OnChanges {

  private formBuilder = inject(FormBuilder);
  customerForm = this.formBuilder.group<CustomerFormGroup>({
    entity_type: this.formBuilder.control<string>('N', Validators.required), // Por defecto, Persona Natural
    ruc: this.formBuilder.control<string>(''),
    dni: this.formBuilder.control<string | null>(null),
    name: this.formBuilder.control<string | null>(null),
    last_name: this.formBuilder.control<string | null>(null),
    business_name: this.formBuilder.control<string | null>(null),
    phone_number: this.formBuilder.control<string | null>(null),
    email: this.formBuilder.control<string | null>(null)
  });

  entityTypeOptions: EntityType[] = [];
  @Input() customer: CustomerCreate | undefined;
  @Output() save = new EventEmitter<CustomerCreate>(); // Emite el cliente a guardar
  @Output() cancel = new EventEmitter<void>(); // Emite cuando se cancela

    // Usamos ngOnChanges para cuando el Input `customer` cambia (ej. al abrir el diálogo de edición)
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['customer'] && changes['customer'].currentValue) {
      this.customerForm.patchValue(changes['customer'].currentValue);
      this.toggleRequiredFields(changes['customer'].currentValue.entity_type);
    } else if (changes['customer'] && !changes['customer'].currentValue) {
      // Si el input customer se limpia (ej. para nuevo cliente), resetear el formulario
      this.customerForm.reset();
      this.toggleRequiredFields(''); // Limpiar requisitos
    }
  }

  // Método para manejar la visibilidad y validación de campos según el tipo de entidad
  private toggleRequiredFields(entityType: string | null | undefined): void {
    const nameControl = this.customerForm.get('name');
    const lastNameControl = this.customerForm.get('last_name');
    const dniControl = this.customerForm.get('dni');
    const businessNameControl = this.customerForm.get('business_name');
    const rucControl = this.customerForm.get('ruc');

    if (entityType === 'N') { // Persona Natural
      nameControl?.addValidators(Validators.required);
      lastNameControl?.addValidators(Validators.required);
      dniControl?.addValidators(Validators.required);
      businessNameControl?.clearValidators();
      rucControl?.clearValidators();
    } else if (entityType === 'J') { // Persona Jurídica
      businessNameControl?.addValidators(Validators.required);
      rucControl?.addValidators(Validators.required);
      nameControl?.clearValidators();
      lastNameControl?.clearValidators();
      dniControl?.clearValidators();
    } else { // Sin tipo seleccionado o undefined
      nameControl?.clearValidators();
      lastNameControl?.clearValidators();
      dniControl?.clearValidators();
      businessNameControl?.clearValidators();
      rucControl?.clearValidators();
    }
    // Actualizar validez de los campos para aplicar los nuevos validadores
    nameControl?.updateValueAndValidity();
    lastNameControl?.updateValueAndValidity();
    dniControl?.updateValueAndValidity();
    businessNameControl?.updateValueAndValidity();
    rucControl?.updateValueAndValidity();
  }

  ngOnInit() {
    this.entityTypeOptions = [
      { label: 'Persona Natural', value: 'N' },
      { label: 'Persona Jurídica', value: 'J' }
    ]
    
    // Suscribirse a cambios en entity_type para ajustar validaciones y visibilidad
    this.customerForm.get('entity_type')?.valueChanges.subscribe(type => {
      this.toggleRequiredFields(type);
    });

    // Inicializar el formulario si ya hay un cliente (para edición)
    if (this.customer) {
      this.customerForm.patchValue(this.customer);
      this.toggleRequiredFields(this.customer.entity_type); // Ajustar campos al cargar
    }
  }

 
  onSubmit() {
    if (this.customerForm.valid) {
      // Filtrar los campos que deben ser null si no son relevantes para el tipo de entidad
      const formValue = this.customerForm.value;
      
      let customerToEmit: CustomerCreate = {
        entity_type: formValue.entity_type || '', // entity_type siempre debería tener un valor
        email: formValue.email || null,
        phone_number: formValue.phone_number || null,
        ruc: null,
        dni: null,
        name: null,
        last_name: null,
        business_name: null
      };

      if (formValue.entity_type === 'N') {
        customerToEmit.name = formValue.name || null;
        customerToEmit.last_name = formValue.last_name || null;
        customerToEmit.dni = formValue.dni || null;
        // Asegurarse de que los campos de persona jurídica sean null
        customerToEmit.business_name = null;
        customerToEmit.ruc = null;
      } else if (formValue.entity_type === 'J') {
        customerToEmit.business_name = formValue.business_name || null;
        customerToEmit.ruc = formValue.ruc || null;
        // Asegurarse de que los campos de persona natural sean null
        customerToEmit.name = null;
        customerToEmit.last_name = null;
        customerToEmit.dni = null;
      }

      this.save.emit(customerToEmit);
      // El formulario se resetea en el componente padre después de la emisión exitosa
      // this.customerForm.reset(); 
    } else {
      console.error('Formulario inválido. Revise los campos.');
      // Puedes añadir un mensaje de Toast aquí si quieres
    }
  }

  onCancel() {
    this.cancel.emit();
    this.customerForm.reset(); // Resetea el formulario al cancelar
  }
}