import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from "@angular/core";
import { filter, fromEvent } from "rxjs";

@Directive({
  selector: "[rtclick]",
  // TODO(hansl): maybe `$implicit` isn't the best option here, but for now that's the best we got.
  exportAs: "$implicit",
  standalone: false,
})
export class RightClickDirective {
  @Output("rtclick") event = new EventEmitter<MouseEvent>();
  constructor(private element: ElementRef<HTMLElement>) {
    this.event = new EventEmitter();
    // Prevent the native context menu on this element and its children
    fromEvent<MouseEvent>(this.element.nativeElement, "contextmenu")
      .pipe(
        filter((ev: MouseEvent) =>
          this.element.nativeElement.contains(ev.target as Node),
        ),
      )
      .subscribe((ev) => {
        ev.preventDefault();
      });
  }
  @HostListener("mousedown", ["$event"])
  onClick(mouseEvent: MouseEvent) {
    if (mouseEvent.button !== 2) return;
    mouseEvent.preventDefault();
    this.event.emit(mouseEvent);
  }
}
