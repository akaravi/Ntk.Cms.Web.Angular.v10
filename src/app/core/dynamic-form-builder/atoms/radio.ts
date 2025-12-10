import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "radio",
  template: `
    @for (opt of field.options; track opt) {
      <div class="form-check">
        <input
          [formControl]="optionFormControl"
          class="form-check-input input-ltr"
          type="radio"
          [value]="opt.key"
          />
        <label class="form-check-label">
          {{ opt.label }}
        </label>
      </div>
    }
    `,
  standalone: false,
})
export class RadioComponent {
  @Input() field: any = {};
  @Input() optionFormControl: FormControl;
}
