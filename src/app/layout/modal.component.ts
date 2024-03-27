import { Component, ViewContainerRef, effect, viewChild } from '@angular/core';
import { Modal } from '../types/modal.class';

@Component({
  selector: 'app-modal',
  standalone: true,
  template: `
    <ng-container #container />
  `,
})
export class ModalComponent extends Modal {
  container = viewChild('container', { read: ViewContainerRef });

  setContainer = effect(() => 
    this.modal.setContainer(this.container())
  );
}
