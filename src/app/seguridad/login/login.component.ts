import { Component } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { SeguridadServices } from '../../core/services/seguridad.services';

@Component({
  selector: 'app-login.component',
  imports: [FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {

  constructor(private seguridadServices: SeguridadServices){

  }

  person = {
    Nombre:'',
    Apellido:'',
    username:'',
    Correo: '',
    Password: ''
  };

loginUsuario(form: NgForm) {
  this.seguridadServices.login({
    email: form.value.email,
    password: form.value.password
  });
}

}
