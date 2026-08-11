import { Component } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { SeguridadServices } from '../../core/services/seguridad.services';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registrar.component.html',
})
export class RegistrarComponent {

constructor(private seguridadServices: SeguridadServices){

}

person = {
    nombre:'',
    apellido:'',
    username:'',
    email: '', 
    password: ''
  };

registrarUsuario(form: NgForm) {
  console.log(form.value)
  this.seguridadServices.registrarusuario({
    email: form.value.email,
    password: form.value.password,
    nombre: form.value.nombre,
    apellido: form.value.apellido,
    username: form.value.username,
    usuarioId: '',
    token: ''
    });
  }
}
