import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layouts/header/header.component";
import { SidebarComponent } from "./layouts/sidebar/sidebar.component";
import { SeguridadServices } from './core/services/seguridad.services';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SidebarComponent,HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mi-web-app');

  constructor(private seguridadServices: SeguridadServices){}

  ngOnInit(): void {
    this.seguridadServices.cargarUsuario();
  }
}

