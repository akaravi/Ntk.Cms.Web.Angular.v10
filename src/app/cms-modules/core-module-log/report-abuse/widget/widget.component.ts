import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {
  CoreModuleLogReportAbuseService,
  FilterDataModel,
  FilterModel,
  RecordStatusEnum,
} from "ntk-cms-api";
import { Subscription } from "rxjs";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import {
  WidgetContentInfoModel,
  WidgetInfoModel,
} from "src/app/core/models/widget-info-model";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";

@Component({
  selector: "app-report-abuse-widget",
  templateUrl: "./widget.component.html",
  standalone: false,
})
export class CoreModuleLogReportAbuseWidgetComponent
  implements OnInit, OnDestroy
{
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private service: CoreModuleLogReportAbuseService,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
    private tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
    public translate: TranslateService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;
  }
  filteModelContent = new FilterModel();
  filterDataModelQueryBuilder: FilterDataModel[] = [];

  widgetInfoModel = new WidgetInfoModel();
  private unsubscribe: Subscription[] = [];

  ngOnInit() {
    this.translate.get("TITLE.Report_Abuse").subscribe((str: string) => {
      this.widgetInfoModel.title = str;
    });
    this.widgetInfoModel.description = "";
    this.widgetInfoModel.link = "/coremodulelog/report-abuse";
    setTimeout(() => {
      this.onActionStatist();
    }, 1000);

    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.tokenInfoStore)
        .subscribe(async (value) => {
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
  onActionStatist(): void {
    this.translate
      .get("MESSAGE.Get_pending_report_abuse")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          this.constructor.name + "Pending",
          str,
          this.constructorInfoAreaId,
        );
      });
    this.translate
      .get("MESSAGE.Get_all_report_abuse")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          this.constructor.name + "All",
          str,
          this.constructorInfoAreaId,
        );
      });

    this.widgetInfoModel.setItem(
      new WidgetContentInfoModel("Pending", 0, 0, ""),
    );
    this.widgetInfoModel.setItem(new WidgetContentInfoModel("All", 1, 0, ""));

    this.service.ServiceGetCount(this.filteModelContent).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.widgetInfoModel.setItem(
            new WidgetContentInfoModel(
              "All",
              1,
              ret.totalRowCount,
              this.widgetInfoModel.link,
            ),
          );
        }
        this.publicHelper.processService.processStop(
          this.constructor.name + "All",
        );
      },
      error: (er) => {
        this.publicHelper.processService.processStop(
          this.constructor.name + "All",
        );
      },
    });

    const filterStatist1 = JSON.parse(JSON.stringify(this.filteModelContent));
    const fastfilter = new FilterDataModel();
    fastfilter.propertyName = "recordStatus";
    fastfilter.value = RecordStatusEnum.Pending;
    filterStatist1.filters.push(fastfilter);

    this.service.ServiceGetCount(filterStatist1).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.widgetInfoModel.setItem(
            new WidgetContentInfoModel(
              "Pending",
              0,
              ret.totalRowCount,
              this.widgetInfoModel.link,
            ),
          );
        }
        this.publicHelper.processService.processStop(
          this.constructor.name + "Pending",
        );
      },
      error: (er) => {
        this.publicHelper.processService.processStop(
          this.constructor.name + "Pending",
        );
      },
    });
  }
  translateHelp(t: string, v: string): string {
    return t + v;
  }
}
