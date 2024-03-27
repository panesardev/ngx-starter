import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Modal } from '../../types/modal.class';
import { BaseModalComponent } from './base.modal.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-logout-modal',
  standalone: true,
  imports: [
    BaseModalComponent,
    AsyncPipe,
  ],
  template: `
    <app-base-modal heading="Are you sure?" width="max-w-sm">
      @if (user$ | async; as user) {
        <div class="flex items-center gap-3 bg-secondary text-primary rounded mb-6 px-4 py-2 cursor-pointer" routerLink="/dashboard" (click)="modal.close()">
          <img [src]="user.photoURL" alt="user" class="rounded-full w-8 h-8" fallbackImage="/assets/img/user.png">
          <span>Logged in as {{ user.displayName }}</span>
        </div>
      }

      <p class="mb-6">You will be logged out!</p>

      <div class="grid">
        <button class="btn red" (click)="logout()">Logout</button>
      </div>
    </app-base-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutModalComponent extends Modal {
  private auth = inject(AuthService);

  user$ = this.auth.user$;

  logout() {
    this.auth.logout();
    this.modal.close();
  }
}
