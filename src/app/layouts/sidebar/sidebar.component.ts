import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SidebarService } from '../../core/services/sidebar.services';
import { ButtonModule } from 'primeng/button';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Subscription } from 'rxjs';
import { SeguridadServices } from '../../core/services/seguridad.services';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ButtonModule,RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit, OnDestroy{
  sidebarService = inject(SidebarService);
     estadoUsuario: boolean = false; 
     usuarioSubscription!: Subscription;
  
     constructor(private seguridadServicio: SeguridadServices){}
  
    ngOnInit(): void {
      this.usuarioSubscription = this.seguridadServicio.seguridadCambio.subscribe(status =>{
        this.estadoUsuario = status;
     })
    }
  
     ngOnDestroy(): void {
       this.usuarioSubscription.unsubscribe();
     }
  
     cerrarSesion(){
      this.seguridadServicio.salirSesion();
     }
}
