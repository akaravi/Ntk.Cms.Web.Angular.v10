/** Custom header component for datepicker. */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
} from "@angular/core";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatDateFormats,
} from "@angular/material/core";
import {
  MatCalendar,
  MatCalendarUserEvent,
  MatDatepicker,
} from "@angular/material/datepicker";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "datapicker-header",
  styles: [],
  template: `
    <mat-calendar-header>
      <button mat-button (click)="todayClicked()">
        {{ "TITLE.Today" | translate }}
      </button>
    </mat-calendar-header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class DatapickerHeaderComponent<D> implements OnDestroy {
  private _destroyed = new Subject<void>();

  constructor(
    private _datePicker: MatDatepicker<D>,
    private _calendar: MatCalendar<D>,
    private _dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
    cdr: ChangeDetectorRef,
  ) {
    _calendar.stateChanges
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => cdr.markForCheck());
  }

  public todayClicked() {
    const today = this._dateAdapter.today();
    this._calendar.activeDate = today;
    const userEvent: MatCalendarUserEvent<D> = {
      value: today,
      event: new Event("click"),
    };
    this._calendar._dateSelected(userEvent);
    this._datePicker.select(today);
    this._datePicker.close();
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
