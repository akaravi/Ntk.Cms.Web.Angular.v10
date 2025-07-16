import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ProcessInfoModel } from 'ntk-cms-api';
import { Subscription } from 'rxjs';
import { ProcessService } from 'src/app/core/services/process.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss'],
  standalone: false
})
export class ProgressSpinnerComponent implements OnInit, OnDestroy {
  static nextId = 0;
  id = ++ProgressSpinnerComponent.nextId;
  constructor(
    public processService: ProcessService,
    private cdr: ChangeDetectorRef,
  ) {
    this.processService.cdr = this.cdr;
    this.unsubscribe.push(this.processService.processSubject.subscribe((value) => {
      if (value) {
        this.infoArea = value.infoArea[this.optionsInfoAreaId];
        this.inRunArea = value.inRunArea[this.optionsInfoAreaId];
      } else {
        this.infoArea = [];
        this.inRunArea = [];
      }
      if (environment.ProgressConsoleLog)
        console.log("ProgressSpinnerComponent infoArea", this.infoArea);
    }));
  }
  @Input() optionsInfoAreaId: string = 'global';
  inRunArea: boolean[] = [];
  infoArea: Map<string, ProcessInfoModel>[] = [];
  private unsubscribe: Subscription[] = [];
  ngOnInit(): void {

  }
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
