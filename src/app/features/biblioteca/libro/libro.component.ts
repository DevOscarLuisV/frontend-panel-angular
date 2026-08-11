import { Component, Input, EventEmitter, Output } from '@angular/core';
import { LibrosService } from '../../../core/services/libros.service';

@Component({
  selector: 'app-libro',
  imports: [],
  templateUrl: './libro.component.html',
})
export class LibroComponent {
  @Input() tituloLibro!: string;

  @Output() libroCliked = new EventEmitter();

  constructor(private librosService: LibrosService){

  }

  onCliked() {
    //this.libroCliked.emit();
    this.librosService.eliminarLibro(this.tituloLibro);
  }
}
