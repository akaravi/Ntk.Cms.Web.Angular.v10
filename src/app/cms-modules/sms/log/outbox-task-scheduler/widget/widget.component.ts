import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {
  FilterDataModel,
  FilterModel,
  ManageUserAccessDataTypesEnum,
  RecordAdminStatusEnum,
  RecordStatusEnum,
  SmsLogOutBoxTaskSchedulerService,
} from "ntk-cms-api";
import { Subscription, forkJoin } from "rxjs";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { ChartOptionsModel } from "src/app/core/models/chartOptionsModel";
import {
  WidgetContentInfoModel,
  WidgetInfoModel,
} from "src/app/core/models/widget-info-model";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

@Component({
  selector: "app-sms-log-outbox-task-scheduler-widget",
  templateUrl: "./widget.component.html",
  standalone: false,
})
export class SmsLogOutBoxTaskSchedulerWidgetComponent
  implements OnInit, OnDestroy
{
  @Input() cssClass = "";

  constructorInfoAreaId = this.constructor.name;
  constructor(
    private service: SmsLogOutBoxTaskSchedulerService,
    private cdr: ChangeDetectorRef,
    private cmsToastrService: CmsToastrService,
    private cmsStoreService: CmsStoreService,
    public publicHelper: PublicHelper,
    public translate: TranslateService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;

    /** chart*/
    this.chartOptions = {
      series: [],
      labels: [],
      chart: {
        width: 380,
        type: "pie",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };
    /** chart*/
  }

  public chartOptions: Partial<ChartOptionsModel>;
  filteModelContent = new FilterModel();
  filterDataModelQueryBuilder: FilterDataModel[] = [];

  widgetInfoModel = new WidgetInfoModel();
  private unsubscribe: Subscription[] = [];

  rowExist = false;
  ngOnInit() {
    this.translate
      .get("TITLE.OutBox_Task_Scheduler")
      .subscribe((str: string) => {
        this.widgetInfoModel.title = str;
      });
    this.translate
      .get("TITLE.SMS_OutBox_Task_Scheduler_Status")
      .subscribe((str: string) => {
        this.widgetInfoModel.description = str;
      });
    this.widgetInfoModel.link = "/sms/log/outbox-task-scheduler";

    setTimeout(() => {
      this.onActionStatist();
    }, 1000);

    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.tokenInfoStore)
        .subscribe(async () => {
          this.onActionStatist();
        }),
    );
  }

  onActionButtonReload(): void {
    this.onActionStatist();
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  async onActionStatist() {
    this.translate
      .get("MESSAGE.outbox_task_scheduler_list")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          this.constructor.name + "All",
          str,
          this.constructorInfoAreaId,
        );
      });
    this.service.setAccessDataType(ManageUserAccessDataTypesEnum.Editor);

    //*filter - Active Records */
    const filterStatist0 = JSON.parse(JSON.stringify(this.filteModelContent));
    const fastfilter0 = new FilterDataModel();
    fastfilter0.propertyName = "recordStatus";
    fastfilter0.value = RecordStatusEnum.Available;
    filterStatist0.filters.push(fastfilter0);
    const s0 = this.service.ServiceGetCount(filterStatist0);

    //*filter - Pending Admin Approval */
    const filterStatist1 = JSON.parse(JSON.stringify(this.filteModelContent));
    const fastfilter1 = new FilterDataModel();
    fastfilter1.propertyName = "adminRecordStatus";
    fastfilter1.value = RecordAdminStatusEnum.Pending;
    filterStatist1.filters.push(fastfilter1);
    const s1 = this.service.ServiceGetCount(filterStatist1);

    //*filter - Need To Check */
    const filterStatist2 = JSON.parse(JSON.stringify(this.filteModelContent));
    const fastfilter2 = new FilterDataModel();
    fastfilter2.propertyName = "adminRecordStatus";
    fastfilter2.value = RecordAdminStatusEnum.NeedToCheck;
    filterStatist2.filters.push(fastfilter2);
    const s2 = this.service.ServiceGetCount(filterStatist2);

    //*filter - Allow Next Run */
    const filterStatist3 = JSON.parse(JSON.stringify(this.filteModelContent));
    const fastfilter3 = new FilterDataModel();
    fastfilter3.propertyName = "scheduleSendAllowNextRun";
    fastfilter3.value = true;
    filterStatist3.filters.push(fastfilter3);
    const s3 = this.service.ServiceGetCount(filterStatist3);

    var series = [];
    var labels = [];
    forkJoin([s0, s1, s2, s3]).subscribe((results) => {
      //*results - Active */
      var ret = results[0];
      series[0] = ret.totalRowCount;
      this.translate.get("TITLE.Active").subscribe((str: string) => {
        labels[0] = str;
      });
      if (ret.isSuccess) {
        this.rowExist = true;
        this.translate
          .get("TITLE.Number_OutBox_Task_Scheduler")
          .subscribe((str: string) => {
            this.widgetInfoModel.description = str + " : " + ret.totalRowCount;
          });
      }

      if (ret.isSuccess) {
        this.widgetInfoModel.setItem(
          new WidgetContentInfoModel(
            "Available",
            0,
            ret.totalRowCount,
            "/sms/log/outbox-task-scheduler",
          ),
        );
      } else {
        this.cmsToastrService.typeErrorMessage(ret.errorMessage);
      }

      //*results - Pending Admin Approval */
      ret = results[1];
      series[1] = ret.totalRowCount;
      this.translate
        .get("TITLE.Pending_Admin_Approval")
        .subscribe((str: string) => {
          labels[1] = str;
        });
      if (ret.isSuccess) {
        this.widgetInfoModel.setItem(
          new WidgetContentInfoModel(
            "PendingAdmin",
            1,
            ret.totalRowCount,
            "/sms/log/outbox-task-scheduler",
          ),
        );
      } else {
        this.cmsToastrService.typeErrorMessage(ret.errorMessage);
      }

      //*results - Need To Check */
      ret = results[2];
      series[2] = ret.totalRowCount;
      this.translate.get("TITLE.Need_To_Check").subscribe((str: string) => {
        labels[2] = str;
      });
      if (ret.isSuccess) {
        this.widgetInfoModel.setItem(
          new WidgetContentInfoModel(
            "NeedToCheck",
            2,
            ret.totalRowCount,
            "/sms/log/outbox-task-scheduler",
          ),
        );
      } else {
        this.cmsToastrService.typeErrorMessage(ret.errorMessage);
      }

      //*results - Allow Next Run */
      ret = results[3];
      series[3] = ret.totalRowCount;
      this.translate.get("TITLE.Allow_Next_Run").subscribe((str: string) => {
        labels[3] = str;
      });
      if (ret.isSuccess) {
        this.widgetInfoModel.setItem(
          new WidgetContentInfoModel(
            "AllowNextRun",
            3,
            ret.totalRowCount,
            "/sms/log/outbox-task-scheduler",
          ),
        );
      } else {
        this.cmsToastrService.typeErrorMessage(ret.errorMessage);
      }

      this.chartOptions.series = series;
      this.chartOptions.labels = labels;
      this.cdr.markForCheck();
      this.publicHelper.processService.processStop(
        this.constructor.name + "All",
      );
    });
  }
  translateHelp(t: string, v: string): string {
    return t + v;
  }
}
