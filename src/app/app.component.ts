import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalComponent } from './layout/modal.component';
import { NavbarComponent } from './layout/navbar.component';
import { FooterComponent } from './layout/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    ModalComponent,
  ],
  template: `
    <app-navbar/>
    <main>
      <router-outlet/>
    </main>
    <app-footer/>
    <app-modal/>
  `,
})
export class AppComponent {

}
