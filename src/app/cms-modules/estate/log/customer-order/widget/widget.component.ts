import {
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {
    EstateCustomerOrderService,
    FilterDataModel,
    FilterModel,
    ManageUserAccessDataTypesEnum,
    RecordStatusEnum,
} from "ntk-cms-api";
import { Subscription, forkJoin } from "rxjs";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { ChartOptionsModel } from "src/app/core/models/chartOptionsModel";
import {
    WidgetContentInfoModel,
    WidgetInfoModel,
} from "src/app/core/models/widget-info-model";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

@Component({
  selector: "app-estate-customer-order-widget",
  templateUrl: "./widget.component.html",
  standalone: false,
})
export class EstateCustomerOrderWidgetComponent implements OnInit, OnDestroy {
  @Input() cssClass = "";

  constructorInfoAreaId = this.constructor.name;
  constructor(
    private service: EstateCustomerOrderService,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
    public cmsToastrService: CmsToastrService,
    private tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
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
      .get("TITLE.ESTATE.CUSTOMER_ORDER")
      .subscribe((str: string) => {
        this.widgetInfoModel.title = str;
      });
    this.translate
      .get("TITLE.Introduction_of_your_customer_order")
      .subscribe((str: string) => {
        this.widgetInfoModel.description = str;
      });
    this.widgetInfoModel.link = "/estate/log/customer-order";
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
    this.translate.get("MESSAGE.property_list").subscribe((str: string) => {
      this.publicHelper.processService.processStart(
        this.constructor.name + "All",
        str,
        this.constructorInfoAreaId,
      );
    });
    this.service.setAccessDataType(ManageUserAccessDataTypesEnum.Editor);
    //*filter */
    const filterStatist0 = JSON.parse(JSON.stringify(this.filteModelContent));
    const fastfilter0 = new FilterDataModel();
    fastfilter0.propertyName = "recordStatus";
    fastfilter0.value = RecordStatusEnum.Available;
    filterStatist0.filters.push(fastfilter0);
    const s0 = this.service.ServiceGetCount(filterStatist0);
    //*filter */
    const filterStatist1 = JSON.parse(JSON.stringify(this.filteModelContent));
    const fastfilter1 = new FilterDataModel();
    fastfilter1.propertyName = "recordStatus";
    fastfilter1.value = RecordStatusEnum.Archive;
    filterStatist1.filters.push(fastfilter1);
    const s1 = this.service.ServiceGetCount(filterStatist1);
    //*filter */
    const filterStatist2 = JSON.parse(JSON.stringify(this.filteModelContent));
    const fastfilter2 = new FilterDataModel();
    fastfilter2.propertyName = "recordStatus";
    fastfilter2.value = RecordStatusEnum.Pending;
    filterStatist2.filters.push(fastfilter2);
    const s2 = this.service.ServiceGetCount(filterStatist2);
    //*filter */
    const filterStatist3 = JSON.parse(JSON.stringify(this.filteModelContent));
    const fastfilter3 = new FilterDataModel();
    fastfilter3.propertyName = "recordStatus";
    fastfilter3.value = RecordStatusEnum.Disable;
    filterStatist3.filters.push(fastfilter3);
    const s3 = this.service.ServiceGetCount(filterStatist3);
    var series = [];
    var labels = [];

    this.widgetInfoModel.setItem(
      new WidgetContentInfoModel(
        "Available",
        0,
        0,
        "/estate/log/customer-order/recordstatus/Available",
      ),
    );
    this.widgetInfoModel.setItem(
      new WidgetContentInfoModel(
        "Archive",
        1,
        0,
        "/estate/log/customer-order/recordstatus/Archive",
      ),
    );
    this.widgetInfoModel.setItem(
      new WidgetContentInfoModel(
        "Pending",
        2,
        0,
        "/estate/log/customer-order/recordstatus/Pending",
      ),
    );
    this.widgetInfoModel.setItem(
      new WidgetContentInfoModel(
        "Disable",
        3,
        0,
        "/estate/log/customer-order/recordstatus/Disable",
      ),
    );

    forkJoin([s0, s1, s2, s3]).subscribe((results) => {
      //*results */
      var ret = results[0];
      series[0] = ret.totalRowCount;
      this.translate
        .get("MESSAGE.customer_order_list_active")
        .subscribe((str: string) => {
          labels[0] = str;
        });
      if (ret.isSuccess) {
        this.widgetInfoModel.setItem(
          new WidgetContentInfoModel(
            "Available",
            0,
            ret.totalRowCount,
            "/estate/log/customer-order/recordstatus/Available",
          ),
        );
        this.rowExist = true;
        this.translate
          .get("TITLE.Number_Registered_Property")
          .subscribe((str: string) => {
            this.widgetInfoModel.description = str + " : " + ret.totalRowCount;
          });
      }

      //*results */
      ret = results[1];
      series[1] = ret.totalRowCount;
      this.translate
        .get("MESSAGE.customer_order_list_close")
        .subscribe((str: string) => {
          labels[1] = str;
        });
      if (ret.isSuccess) {
        this.widgetInfoModel.setItem(
          new WidgetContentInfoModel(
            "Archive",
            1,
            ret.totalRowCount,
            "/estate/log/customer-order/recordstatus/Archive",
          ),
        );
      } else {
        this.cmsToastrService.typeErrorMessage(ret.errorMessage);
      }
      //*results */
      ret = results[2];
      series[2] = ret.totalRowCount;
      this.translate
        .get("MESSAGE.customer_order_needs_approval")
        .subscribe((str: string) => {
          labels[2] = str;
        });
      if (ret.isSuccess) {
        this.widgetInfoModel.setItem(
          new WidgetContentInfoModel(
            "Pending",
            2,
            ret.totalRowCount,
            "/estate/log/customer-order/recordstatus/Pending",
          ),
        );
      } else {
        this.cmsToastrService.typeErrorMessage(ret.errorMessage);
      }
      //*results */
      ret = results[3];
      series[3] = ret.totalRowCount;
      this.translate
        .get("MESSAGE.customer_order_list_disable")
        .subscribe((str: string) => {
          labels[3] = str;
        });
      if (ret.isSuccess) {
        this.widgetInfoModel.setItem(
          new WidgetContentInfoModel(
            "Disable",
            3,
            ret.totalRowCount,
            "/estate/log/customer-order/recordstatus/Disable",
          ),
        );
      } else {
        this.cmsToastrService.typeErrorMessage(ret.errorMessage);
      }

      this.chartOptions.series = series;
      this.chartOptions.labels = labels;
      this.publicHelper.processService.processStop(
        this.constructor.name + "All",
      );
      Promise.resolve().then(() => this.cdr.detectChanges());
    });
  }

  translateHelp(t: string, v: string): string {
    return t + v;
  }
}
