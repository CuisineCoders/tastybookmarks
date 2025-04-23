import { AfterViewInit, Directive, ElementRef, inject, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Directive({ standalone: true, selector: '[tastyAutoFocus]' })
export class AutoFocusDirective implements AfterViewInit {
  private readonly nativeElement = inject(ElementRef).nativeElement;
  private _focus = false;

  @Input({ transform: coerceBooleanProperty, alias: 'tastyAutoFocus' }) set focus(value: boolean) {
    this._focus = value;
    if (this._focus) {
      this.nativeElement.focus();
    }
  };

  public ngAfterViewInit(): void {
    if (this._focus) {
      this.nativeElement.focus();
    }
  }
}