import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { SeguridadServices } from "./seguridad.services";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class SeguridadRouter implements CanActivate {

    constructor(private seguridadServices: SeguridadServices, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.seguridadServices.onSesion()) {
            return true;
        } else {
            this.router.navigate(['/login'])
            return false;
        }
    }
}