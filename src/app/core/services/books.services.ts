import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment.development";
import { PaginationBook } from "../../features/biblioteca/books/pagination-books.model";

@Injectable({
    providedIn: 'root'
})

export class BooksServices{

    baseUrl = environment.baseUrl;

    bookPagination!: PaginationBook;
    bookPaginationSubjcet = new Subject();

    constructor(private http: HttpClient) { }

   obtenerLibros(
    libroPorPagina: number, 
    paginaActual: number, 
    sort: string, 
    sortDirection: string, 
    filterValue: any
  ): Observable<PaginationBook> {
    
    const request = {
      pageSize: libroPorPagina,
      page: paginaActual,
      sort,
      sortDirection,
      filterValue
    };

    return this.http.post<PaginationBook>(`${this.baseUrl}Libro/Pagination`, request);
  }

  guardarLibro(libroNuevo: any): Observable<any> {
    return this.http.post(`${this.baseUrl}Libro`, libroNuevo);
  }
}