import { Routes } from '@angular/router';
import { InicioComponent } from './layouts/inicio/inicio.component';
import { RegistrarComponent } from './seguridad/registrar/registrar.component';
import { LoginComponent } from './seguridad/login/login.component';
import { SeguridadRouter } from './core/services/seguridad.router.services';
import { BooksComponent } from './features/biblioteca/books/books.component';
import { AutoresComponent } from './features/biblioteca/autores/autores.component';

export const routes: Routes = [
    { path: "", component: InicioComponent, pathMatch: 'full', canActivate:[SeguridadRouter] },
    { path: "registrar", component: RegistrarComponent },
    { path: "login", component: LoginComponent },
    { path: "books", component: BooksComponent, canActivate:[SeguridadRouter] },
    { path: "autores", component: AutoresComponent, canActivate:[SeguridadRouter] },
    { path: "**", redirectTo: "login" }
];
