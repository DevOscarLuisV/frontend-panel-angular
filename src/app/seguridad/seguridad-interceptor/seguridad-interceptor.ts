import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SeguridadServices } from '../../core/services/seguridad.services';

@Injectable()
export class SeguridadInterceptor implements HttpInterceptor {
    
    constructor(private seguridadServices: SeguridadServices) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        
        const tokenSeguridad = this.seguridadServices.obtenerToken();    
        const request = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + tokenSeguridad)
        });

        return next.handle(request);
    }
}