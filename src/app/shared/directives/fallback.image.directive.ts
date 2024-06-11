import { Directive, ElementRef, HostListener, inject, input } from "@angular/core";

@Directive({
  selector: 'img[fallbackImage]',
  standalone: true,
})
export class FallbackImageDirective {
  private hostRef = inject(ElementRef);

  fallbackImage = input.required<string>();

  @HostListener('error')
  errored() {
    this.hostRef.nativeElement.src = this.fallbackImage();
  }
}
