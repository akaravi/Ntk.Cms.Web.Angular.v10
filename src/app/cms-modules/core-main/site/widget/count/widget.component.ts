import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {
  CoreSiteService,
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
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

@Component({
  selector: "app-core-site-widget-count",
  templateUrl: "./widget.component.html",
  standalone: false,
})
export class CoreSiteWidgetCountComponent implements OnInit, OnDestroy {
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private service: CoreSiteService,
    private cmsToastrService: CmsToastrService,
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
    this.translate
      .get("TITLE.Registered_MemberSite")
      .subscribe((str: string) => {
        this.widgetInfoModel.title = str;
      });
    this.widgetInfoModel.description = "";
    this.widgetInfoModel.link = "/core/site";

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
      .get("MESSAGE.Get_active_member_sites")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          this.constructor.name + "Active",
          str,
          this.constructorInfoAreaId,
        );
      });
    this.translate
      .get("MESSAGE.Get_all_member_sites")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          this.constructor.name + "All",
          str,
          this.constructorInfoAreaId,
        );
      });
    this.widgetInfoModel.setItem(
      new WidgetContentInfoModel("Active", 0, 0, ""),
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
        } else {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
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
    fastfilter.propertyName = "RecordStatus";
    fastfilter.value = RecordStatusEnum.Available;
    filterStatist1.filters.push(fastfilter);
    this.service.ServiceGetCount(filterStatist1).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.widgetInfoModel.setItem(
            new WidgetContentInfoModel(
              "Active",
              0,
              ret.totalRowCount,
              this.widgetInfoModel.link,
            ),
          );
        } else {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.publicHelper.processService.processStop(
          this.constructor.name + "Active",
        );
      },
      error: (er) => {
        this.publicHelper.processService.processStop(
          this.constructor.name + "Active",
        );
      },
    });
  }
  translateHelp(t: string, v: string): string {
    return t + v;
  }
}
