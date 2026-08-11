import { Injectable } from "@angular/core";
import { Autor } from "../../features/biblioteca/autores/autor.model";
import { environment } from "../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AutoresServices {
    baseUrl = environment.baseUrl;
    private autoresLista: Autor[] = []

    private autoresSubject = new Subject<Autor[]>()

    constructor(private http: HttpClient) { }
    
    obtenerAutores(): Observable<Autor[]> {
        const urlCompleta = `${this.baseUrl}autor`;

        return this.http.get<Autor[]>(urlCompleta);
    }
}