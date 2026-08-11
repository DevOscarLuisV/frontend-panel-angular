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
    // 1. Obtener el token guardado (ajusta la clave según donde lo guardes)
    const token = localStorage.getItem('token');

    if (token) {
      try {
        // 2. Extraer el Payload (la parte central entre los dos puntos)
        const payloadBase64 = token.split('.')[1];
        
        // 3. Decodificar de Base64 a JSON
        const payloadJson = atob(payloadBase64);
        const payload = JSON.parse(payloadJson);

        // 4. Leer la propiedad del nombre (revisa las variantes de .NET)
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
