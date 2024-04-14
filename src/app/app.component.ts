import { Component, inject, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar.component';
import { FooterComponent } from './layout/footer.component';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
  ],
  template: `
    <app-navbar/>
    <main>
      <router-outlet/>
    </main>
    <app-footer/>
  `,
})
export class AppComponent {
  private container = inject(ViewContainerRef);
  private modal = inject(ModalService);
  
  constructor() {
    this.modal.setContainer(this.container);
  }
}
