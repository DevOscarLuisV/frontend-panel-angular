import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';
import { LibrosService } from './core/services/libros.service';
import { SeguridadServices } from './core/services/seguridad.services';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SeguridadInterceptor } from './seguridad/seguridad-interceptor/seguridad-interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
  
    provideRouter(routes),
    
    provideHttpClient(withInterceptorsFromDi()), 
    { provide: HTTP_INTERCEPTORS, useClass: SeguridadInterceptor, multi: true },
    
    importProvidersFrom(FormsModule),
    
    LibrosService,
    SeguridadServices,
    
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: Aura,
            options: {
              darkModeSelector: '.app-dark' 
            }
        }
    })
  ]
};