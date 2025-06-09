import { Component, EventEmitter, Input, Output, OnInit, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { TypeOptions } from '@app/utils/interfaces/cotiza';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog'; // Para usarlo como contenido de un p-dialog
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { PanelModule } from 'primeng/panel';
import { IftaLabelModule } from 'primeng/iftalabel';
import { SelectButton } from 'primeng/selectbutton';

// Modelos del dominio
import { Customer, CustomerCreate, CustomerFormGroup } from '@app/domain/models/customer-model';



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
    IftaLabelModule,
    SelectButton
  ],
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.css',
  standalone: true
})

export class CustomerFormComponent implements OnInit, OnChanges {


  private formBuilder = inject(FormBuilder);
  customerForm = this.formBuilder.group<CustomerFormGroup>({
    clientTypeId: this.formBuilder.control<number>(1, Validators.required),
    entityType: this.formBuilder.control<string>('N', Validators.required), 
    ruc: this.formBuilder.control<string>(''),
    dni: this.formBuilder.control<string | null>(null),
    name: this.formBuilder.control<string | null>(null),
    lastName: this.formBuilder.control<string | null>(null),
    businessName: this.formBuilder.control<string | null>(null),
    phoneNumber: this.formBuilder.control<string | null>(null),
    email: this.formBuilder.control<string | null>(null)
  });

  entityTypeOptions: TypeOptions[] = [];
  clientTypeOptions: TypeOptions[] = [];
  
  @Input() customer: CustomerCreate | undefined;
  @Output() save = new EventEmitter<CustomerCreate>(); // Emite el cliente a guardar
  @Output() cancel = new EventEmitter<void>(); // Emite cuando se cancela

    // Usamos ngOnChanges para cuando el Input `customer` cambia (ej. al abrir el diálogo de edición)
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['customer'] && changes['customer'].currentValue) {
      this.customerForm.patchValue(changes['customer'].currentValue);
      this.toggleRequiredFields(changes['customer'].currentValue.entityType);
    } else if (changes['customer'] && !changes['customer'].currentValue) {
      // Si el input customer se limpia (ej. para nuevo cliente), resetear el formulario
      this.customerForm.reset();
      this.toggleRequiredFields(''); // Limpiar requisitos
    }
  }

  // Método para manejar la visibilidad y validación de campos según el tipo de entidad
  private toggleRequiredFields(entityType: string | null | undefined): void {
    const nameControl = this.customerForm.get('name');
    const lastNameControl = this.customerForm.get('lastName');
    const dniControl = this.customerForm.get('dni');
    const businessNameControl = this.customerForm.get('businessName');
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
    this.clientTypeOptions = [
    { label: 'Final Nuevo', value: 1 },
    { label: 'Final Frecuente', value: 2 },
    { label: 'Imprentero Nuevo', value: 3 },
    { label: 'Imprentero Frecuente', value: 4 }
    ];
    
    
    // Suscribirse a cambios en entity_type para ajustar validaciones y visibilidad
    this.customerForm.get('entityType')?.valueChanges.subscribe(type => {
      this.toggleRequiredFields(type);
    });

    // Inicializar el formulario si ya hay un cliente (para edición)
    if (this.customer) {
      this.customerForm.patchValue(this.customer);
      this.toggleRequiredFields(this.customer.entityType); // Ajustar campos al cargar
    }
  }

 
  onSubmit() {
    console.log('Formulario enviado:', this.customerForm.value);
    console.log('Client type:', this.customerForm.value.clientTypeId);
    if (this.customerForm.valid) {
      // Filtrar los campos que deben ser null si no son relevantes para el tipo de entidad
      const formValue = this.customerForm.value;
      
      let customerToEmit: CustomerCreate = {
        clientTypeId: formValue.clientTypeId || 1, 
        entityType: formValue.entityType || '', // entity_type siempre debería tener un valor
        email: formValue.email || null,
        phoneNumber: formValue.phoneNumber || null,
        ruc: null,
        dni: null,
        name: null,
        lastName: null,
        businessName: null
      };

      if (formValue.entityType === 'N') {
        customerToEmit.clientTypeId = formValue.clientTypeId || 1;
        customerToEmit.name = formValue.name || null;
        customerToEmit.lastName = formValue.lastName || null;
        customerToEmit.dni = formValue.dni || null;
        // Asegurarse de que los campos de persona jurídica sean null
        customerToEmit.businessName = null;
        customerToEmit.ruc = null;
      } else if (formValue.entityType === 'J') {
        customerToEmit.clientTypeId = formValue.clientTypeId || 1;
        customerToEmit.businessName = formValue.businessName || null;
        customerToEmit.ruc = formValue.ruc || null;
        // Asegurarse de que los campos de persona natural sean null
        customerToEmit.name = null;
        customerToEmit.lastName = null;
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