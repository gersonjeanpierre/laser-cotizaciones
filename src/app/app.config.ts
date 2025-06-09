import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

import { providePrimeNG } from 'primeng/config';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { CustomerRepositoryPort } from './domain/ports/customer-repository-port';
import { CustomerApiService } from './data-access/api/customer-api-service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MyPreset } from './ui/custom_colors';
import { ProductRepositoryPort } from './domain/ports/product-repository-port';
import { ProductApiService } from './data-access/api/product-api-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch()),
    { provide: CustomerRepositoryPort, useClass: CustomerApiService },
    { provide: ProductRepositoryPort, useClass: ProductApiService },
    provideAnimationsAsync(),
    providePrimeNG({
      inputVariant: 'filled',
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: false || 'none',
          
        }
      },
    }),
    ConfirmationService,MessageService,
    
  ]
};
