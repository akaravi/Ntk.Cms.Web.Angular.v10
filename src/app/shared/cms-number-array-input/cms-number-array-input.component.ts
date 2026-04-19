import {
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

/**
 * Template-driven form control for `number[]` (comma / space / semicolon separated).
 */
@Component({
  selector: "cms-number-array-input",
  templateUrl: "./cms-number-array-input.component.html",
  styleUrls: ["./cms-number-array-input.component.scss"],
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CmsNumberArrayInputComponent),
      multi: true,
    },
  ],
})
export class CmsNumberArrayInputComponent implements ControlValueAccessor {
  constructor(private cdr: ChangeDetectorRef) {}

  /** Optional id for label `for` / accessibility */
  @Input() inputId = "";
  @Input() placeholder = "";
  /** CSS classes for the native input (e.g. form-control validate-name, cms-m-input) */
  @Input() fieldClass = "form-control validate-name";

  disabled = false;
  textValue = "";

  private onChange: (v: number[]) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  writeValue(value: number[] | null | undefined): void {
    const arr = Array.isArray(value) ? value : [];
    this.textValue = arr.map((n) => String(n)).join(", ");
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (v: number[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  onInput(raw: string): void {
    this.textValue = raw;
    const parsed = raw
      .split(/[,;\s]+/)
      .map((x) => x.trim())
      .filter((x) => x.length > 0)
      .map((x) => Number(x))
      .filter((n) => Number.isFinite(n) && Number.isInteger(n));
    this.onChange(parsed);
  }

  onBlur(): void {
    this.onTouched();
  }
}
