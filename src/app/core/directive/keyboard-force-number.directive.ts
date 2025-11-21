import { Directive, ElementRef, Renderer2 } from "@angular/core";
import { KeyboardForceDirective } from "./keyboard-force.directive";

/**
 * Automatically enforces English keyboard layout on numeric inputs that
 * either have `type="number"` or use the legacy `numberOnly` directive,
 * unless they already opt into `cmsKeyboardForce`.
 */
@Directive({
  selector: `
    input[type="number"]:not([cmsKeyboardForce]),
    input[numberOnly]:not([cmsKeyboardForce]),
    input[currencyMask]:not([cmsKeyboardForce])
  `,
  standalone: false,
})
export class KeyboardForceNumberDirective extends KeyboardForceDirective {
  constructor(elementRef: ElementRef<HTMLElement>, renderer: Renderer2) {
    super(elementRef, renderer);
    this.cmsKeyboardForce = "en";
    this.cmsKeyboardForceSource = "en";
    this.cmsKeyboardForceDir = "ltr";
  }
}
