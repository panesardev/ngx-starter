import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Modal } from '../../types/modal.class';

@Component({
  selector: 'app-base-modal',
  standalone: true,
  imports: [],
  template: `
    <div class="{{ modal.isOpen() ? 'modal-overlay-open' : 'modal-overlay-close' }} fixed inset-0 z-[100] bg-[#132a3483]"></div>
    <div class="{{ modal.isOpen() ? 'modal-open' : 'modal-close' }} fixed z-[101] inset-0 px-3 md:px-10 py-10 select-none">
      <div class="bg-neutral rounded p-6 md:p-8 mx-auto {{ width() ? width() : 'max-w-md' }}">
        <div class="flex justify-between items-center border-b-2 border-slate-100 gap-6 pb-2 mb-4">
          <h1 class="font-bold text-lg">{{ heading() }}</h1>
          <button class="float-right text-red-500 hover:underline" (click)="modal.close()">Close</button>
        </div>
        <ng-content/>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseModalComponent extends Modal {
  heading = input.required<string>();
  width = input<string>();
}
