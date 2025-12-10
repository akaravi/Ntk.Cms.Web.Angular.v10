import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

// text,email,tel,textarea,password,
@Component({
  selector: "textbox",
  template: `
    @if (!field.multiline) {
      <input
        [attr.type]="field.type"
        class="form-control input-ltr"
        [id]="field.name"
        [name]="field.name"
        [formControl]="optionFormControl"
        />
    }
    @if (field.multiline) {
      <textarea
        [class.is-invalid]="isDirty && !isValid"
        [formControl]="optionFormControl"
        [id]="field.name"
        rows="9"
        class="form-control input-ltr"
        [placeholder]="field.placeholder"
      ></textarea>
    }
    `,
  standalone: false,
})
export class TextBoxComponent {
  @Input() field: any = {};
  @Input() optionFormControl: FormControl;
  get isValid(): any {
    return this.optionFormControl.valid;
  }
  get isDirty(): any {
    return this.optionFormControl.dirty;
  }

  constructor() {}
}
