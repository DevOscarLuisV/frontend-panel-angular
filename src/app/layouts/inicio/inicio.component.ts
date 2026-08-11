import { Component, OnInit} from '@angular/core';



@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
})
export class InicioComponent implements OnInit {
   nombreUsuario: string = 'Usuario';

  ngOnInit(): void {
    this.cargarNombreUsuario();
  }

  cargarNombreUsuario(): void {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const payloadBase64 = token.split('.')[1];
        
        const payloadJson = atob(payloadBase64);
        const payload = JSON.parse(payloadJson);

        this.nombreUsuario = 
          payload.nombre || 
          payload.given_name || 
          payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || 
          payload.sub || 
          'Usuario';

      } catch (error) {
        console.error('Error al decodificar el token JWT:', error);
      }
    }
  }
}
