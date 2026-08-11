import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { SidebarService } from '../../core/services/sidebar.services';
import { ButtonModule } from 'primeng/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SeguridadServices } from '../../core/services/seguridad.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [ButtonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
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