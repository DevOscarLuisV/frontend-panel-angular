import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BooksServices } from '../../../core/services/books.services';
import { Books } from './books.model';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, NgForm } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { Subscription } from 'rxjs';
import { AutoresServices } from '../../../core/services/autores.services';
import { Autor } from '../autores/autor.model';
import { PaginationBook } from './pagination-books.model';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [TableModule, CommonModule, DialogModule, ButtonModule, InputTextModule, FormsModule, FloatLabelModule, SelectModule, DatePickerModule],
  templateUrl: './books.component.html'
})
export class BooksComponent implements OnInit, OnDestroy {

  value: string | undefined;
  visible: boolean = false;
  fechaPublicacion: Date | undefined;
  Autores: Autor[] = [];

  private bookSubscription: Subscription = new Subscription();

paginaActual: number = 1;
  sort: string = 'titulo';
  sortDirection: string = 'asc';
  totalRegistros: number = 0;

  bookData: Books[] = [];
  librosOriginales: Books[] = [];

  paginaCombo = [1, 2, 5, 10];
  libroPorPagina = 2;

  timeout: any = null;

  constructor(
    private booksServices: BooksServices,
    private autoresServices: AutoresServices,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarTodosLosLibros();

    this.autoresServices.obtenerAutores().subscribe({
      next: (autores: Autor[]) => {
        this.Autores = autores;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar autores:', err)
    });
  }


  cargarTodosLosLibros() {

    this.booksServices.obtenerLibros(100, 1, 'titulo', 'asc', null).subscribe({
      next: (respuesta: PaginationBook) => {
        this.bookData = respuesta.data;
        this.librosOriginales = respuesta.data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar la base de datos:', err)
    });
  }

  showDialog() {
    this.visible = true;
  }

  ordenarColumna(event: any) {
    
    const campo = event.field;

    const direccion = event.order === 1 ? 'asc' : 'desc';

    this.booksServices.obtenerLibros(this.libroPorPagina, 1, campo, direccion, null)
      .subscribe({
        next: (respuesta) => {
          this.bookData = respuesta.data;
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error al ordenar', err)
      });
  }

  

hacerFiltro(event: any) {
 
  clearTimeout(this.timeout);

  const textoBuscado = event.target.value;

  this.timeout = setTimeout(() => {
    
    if (event.key !== 'Enter') {
      
      const filterValueLocal = textoBuscado.trim() === '' ? null : {
        propiedad: 'titulo',
        valor: textoBuscado
      };

      this.booksServices.obtenerLibros(
        this.libroPorPagina, 
        this.paginaActual, 
        this.sort, 
        this.sortDirection, 
        filterValueLocal
      ).subscribe({
        next: (respuesta) => {
          this.bookData = respuesta.data;
          this.totalRegistros = respuesta.totalRows;
          this.cdr.detectChanges();  
          
        },
        error: (err) => console.error('Error al filtrar:', err)
      });
    }

  }, 1000);
}


  guardarLibro(form: NgForm): void {
    if (form.valid) {
      const autorSeleccionado = form.value.autor;

      const autorParaBackend = {
        ...autorSeleccionado,
        nombreCompleto: autorSeleccionado.nombre + ' ' + autorSeleccionado.apellido
      };

      const nuevoLibro = {
        id: "",
        titulo: form.value.titulo,
        descripcion: form.value.descripcion,
        precio: Number(form.value.precio),
        fechaPublicacion: form.value.fechaPublicacion,
        autor: autorParaBackend
      };

      this.bookSubscription = this.booksServices.guardarLibro(nuevoLibro).subscribe({
        next: (respuesta) => {
          this.visible = false;
          form.reset();
          // En vez de pelear con la paginación, simplemente recargamos la lista
          this.cargarTodosLosLibros();
        },
        error: (err) => {
          console.error('❌ Error general:', err);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.bookSubscription.unsubscribe();
  }
}