import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast'; // Para mostrar los mensajes

// Importa las interfaces del dominio
import { Customer, CustomerCreate } from '@app/domain/models/customer-model';

// Importa los Casos de Uso del dominio
import { GetAllCustomersUseCase } from '@app/domain/use-cases/customer/get-all-customers-usecase';
import { UpdateCustomerUseCase } from '@app/domain/use-cases/customer/update-customer-usecase';
import { CreateCustomerUseCase } from  '@app/domain/use-cases/customer/create-customer-usecase';

// Importa el nuevo componente de formulario
import { CustomerFormComponent } from   '@app/ui/components/customer-form/customer-form';
import { Observable,of } from 'rxjs';

@Component({
  selector: 'app-customer-list-page',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    CustomerFormComponent
  ],
  templateUrl: './customer-list.html', // Usamos templateUrl
  styleUrl: './customer-list.css', // Usamos styleUrl
  providers: [
    ConfirmationService,
    MessageService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerListPageComponent implements OnInit {
  customers$: Observable<Customer[]> = of([]); // Cambiado a Observable para manejar la suscripción
  customers: Customer[] = [];
  displayDialog: boolean = false;
  isEditMode: boolean = false;
  currentCustomer: CustomerCreate & { id?: number } = {
    entity_type: '',
    ruc: '',
    dni: '',
    name: '',
    last_name: '',
    email: '',
    phone_number: '',
    business_name: '',
  };

  constructor(
    private getAllCustomersUseCase: GetAllCustomersUseCase,
    private updateCustomerUseCase: UpdateCustomerUseCase,
    private createCustomerUseCase: CreateCustomerUseCase,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customers$ = this.getAllCustomersUseCase.execute();
  }

  openCreateDialog(): void {
    this.isEditMode = false;
    this.currentCustomer = {
      entity_type: '',
      ruc: '',
      dni: '',
      name: '',
      last_name: '',
      email: '',
      phone_number: '',
      business_name: '',
    }; // Objeto vacío para crear
    this.displayDialog = true;
  }

  openEditDialog(customer: Customer): void {
    this.isEditMode = true;
    if (customer.id === undefined) {
      console.error('Customer ID is undefined for editing.');
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'ID de cliente no disponible para edición.' });
      return;
    }
    // Copia el cliente para edición. Asegura que tenga el ID.
    this.currentCustomer = { ...customer, id: customer.id }; 
    this.displayDialog = true;
  }

  handleSaveCustomer(customerData: CustomerCreate): void {
    if (this.isEditMode && this.currentCustomer.id) {
      // Lógica de ACTUALIZACIÓN (PUT)
      this.updateCustomerUseCase.execute(this.currentCustomer.id, customerData).subscribe({
        next: (data) => {
          console.log('Cliente actualizado:', data);
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Cliente actualizado con éxito.' });
          this.loadCustomers();
          this.displayDialog = false; // Cerrar diálogo
        },
        error: (err) => {
          console.error('Error al actualizar cliente:', err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al actualizar cliente.' });
        }
      });
    } else {
      // Lógica de CREACIÓN (POST)
      this.createCustomerUseCase.execute(customerData).subscribe({
        next: (data) => {
          console.log('Cliente creado:', data);
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Cliente creado con éxito.' });
          this.loadCustomers();
          this.displayDialog = false; // Cerrar diálogo
        },
        error: (err) => {
          console.error('Error al crear cliente:', err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al crear cliente.' });
        }
      });
    }
  }

  handleCancelForm(): void {
    this.displayDialog = false; // Cerrar diálogo
  }

  // Los métodos de eliminación (confirmDelete, deleteCustomer) se añadirán después
}