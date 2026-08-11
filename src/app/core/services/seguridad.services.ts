import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginData } from "../../seguridad/login-data/login-data.model";
import { Usuario } from '../../seguridad/usuario/usuario.model';
import { Subject } from "rxjs";
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class SeguridadServices {

    private token!: string;

    baseUrl = environment.baseUrl;

    seguridadCambio = new Subject<boolean>();

    private usuario!: Usuario;

    cargarUsuario(): void {
        const tokenBrowser = localStorage.getItem('token');
        if(!tokenBrowser){
            return;
        }
        this.token = tokenBrowser;
        this.seguridadCambio.next(true);

         this.http.get<Usuario>(this.baseUrl + 'usuario')
            .subscribe( (response) => {
                console.log("login respuesta", response);
                
                this.token = response.token!;
                this.usuario = {
                    email: response.email,
                    nombre: response.nombre,
                    apellido: response.apellido,
                    token: response.token,
                    password: "",
                    username: response.username,
                    usuarioId: response.usuarioId

                };
                this.seguridadCambio.next(true);
                localStorage.setItem('token', response.token!);
            });
    }

    obtenerToken(): string{
        return this.token;
    }

    constructor(private router: Router, private http:HttpClient){

    }

    registrarusuario(usr: Usuario): void {
        this.http.post<Usuario>(this.baseUrl + 'usuario/registrar', usr)
            .subscribe({ // <-- 1. IMPORTANTE: Abre la llave del objeto aquí
                next: (response) => {
                    this.token = response.token!;
                    this.usuario = {
                        email: response.email,
                        nombre: response.nombre,
                        apellido: response.apellido,
                        token: response.token,
                        password: "",
                        username: response.username,
                        usuarioId: response.usuarioId
                    };
                    this.seguridadCambio.next(true);
                    localStorage.setItem('token', response.token!);
                    this.router.navigate(['/']);
                },
                error: (err: any) => { // <-- 2. IMPORTANTE: Agregamos ": any" aquí
                    console.error('Error desde el servidor:', err);
                }
            }); // <-- 3. IMPORTANTE: Cierra la llave y el paréntesis aquí
    }

    login(loginData: LoginData): void {
        this.http.post<Usuario>(this.baseUrl + 'usuario/login', loginData)
            .subscribe( (response) => {
                console.log("login respuesta", response);
                
                this.token = response.token!;
                this.usuario = {
                    email: response.email,
                    nombre: response.nombre,
                    apellido: response.apellido,
                    token: response.token,
                    password: "",
                    username: response.username,
                    usuarioId: response.usuarioId

                };
                this.seguridadCambio.next(true);
                localStorage.setItem('token', response.token!);
                this.router.navigate(['/']);
            });
    }

    salirSesion() {
        this.usuario = null!;
        this.seguridadCambio.next(false);
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

    obtenerUsuario() {
        return { ...this.usuario }
    }

    onSesion(){
        return this.token != null;
    }

}