import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Autor } from './autor.model';
import { AutoresServices } from '../../../core/services/autores.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-autores',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './autores.component.html'
})
export class AutoresComponent implements OnInit, OnDestroy {

  autorData: Autor[] = [];

  private autorSubscription!: Subscription;

  constructor(private autoresService: AutoresServices, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.autorSubscription = this.autoresService.obtenerAutores().subscribe({
      next: (autores: Autor[]) => {
        this.autorData = autores;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar autores:', err);
      }
    });
  }

ngOnDestroy(): void {
  if (this.autorSubscription) {
      this.autorSubscription.unsubscribe();
    }
}
}