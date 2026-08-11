import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
 
  isOpen = signal<boolean>(false);
  
  toggleSidebar() {
    this.isOpen.update(estadoActual => !estadoActual);
  }

  closeSidebar() {
    this.isOpen.set(false);
  }
}