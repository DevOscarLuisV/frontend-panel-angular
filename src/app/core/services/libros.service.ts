import { Subject } from "rxjs";

export class LibrosService{

    libroSubject = new Subject<void>();

    private libros = [
        "Libro de la vida",
         "Como ser un jamonero",
          "como vivir"
        ];

    agregarLibro(LibroNombre: string){
        this.libros.push(LibroNombre);
        this.libroSubject.next();
    }

    eliminarLibro(LibroNombre: string){
        this.libros = this.libros.filter(x => x !== LibroNombre);
        this.libroSubject.next();
    }

    obtenerLibros(){
        return [...this.libros];
    }

    
}