import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import {
  CoreModuleModel,
  CoreModuleService,
  CoreModuleSiteCreditModel,
  CoreModuleSiteCreditService,
  DataFieldInfoModel,
  ErrorExceptionResult,
  FilterDataModel,
  FilterModel,
  FormInfoModel,
} from "ntk-cms-api";
import { Subscription } from "rxjs";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { WidgetInfoModel } from "src/app/core/models/widget-info-model";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

@Component({
  selector: "app-coremodule-site-credit-widget-credit",
  templateUrl: "./widget-credit.component.html",
  standalone: false,
})
export class CoreModuleSiteCreditWidgetCreditComponent
  implements OnInit, OnDestroy
{
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private service: CoreModuleSiteCreditService,
    private cmsToastrService: CmsToastrService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
    public publicHelper: PublicHelper,
    public translate: TranslateService,
    private coreModuleService: CoreModuleService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;
  }
  dataModelResult: ErrorExceptionResult<CoreModuleSiteCreditModel> =
    new ErrorExceptionResult<CoreModuleSiteCreditModel>();
  dataModelCoreModuleResult: ErrorExceptionResult<CoreModuleModel> =
    new ErrorExceptionResult<CoreModuleModel>();
  dataModel: CoreModuleSiteCreditModel = new CoreModuleSiteCreditModel();
  formInfo: FormInfoModel = new FormInfoModel();

  filteModelContent = new FilterModel();
  filterDataModelQueryBuilder: FilterDataModel[] = [];

  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();
  widgetInfoModel = new WidgetInfoModel();
  private unsubscribe: Subscription[] = [];

  ngOnInit() {
    this.translate.get("TITLE.Evidence_Identity").subscribe((str: string) => {
      this.widgetInfoModel.title = str;
    });
    this.widgetInfoModel.description = "";
    this.widgetInfoModel.link = "/coremodule/site-credit/";

    this.DataGetAll();
    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.tokenInfoStore)
        .subscribe(async (value) => {
          this.DataGetAll();
        }),
    );

    this.getModuleList();
  }
  getModuleList(): void {
    const filter = new FilterModel();
    filter.rowPerPage = 100;
    this.coreModuleService.ServiceGetAllModuleName(filter).subscribe({
      next: (ret) => {
        this.dataModelCoreModuleResult = ret;
      },
    });
  }
  ngOnDestroy(): void {
    if (this.unsubscribe) this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  DataGetAll(): void {
    const pName = this.constructor.name + "main";
    this.translate
      .get("MESSAGE.get_information_list")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });
    this.filteModelContent.accessLoad = true;
    /*filter CLone*/
    const filterModel = JSON.parse(JSON.stringify(this.filteModelContent));
    /*filter CLone*/
    /*filter add search*/
    if (
      this.filterDataModelQueryBuilder &&
      this.filterDataModelQueryBuilder.length > 0
    ) {
      filterModel.filters = [...this.filterDataModelQueryBuilder];
    }
    /*filter add search*/

    this.service.ServiceGetAllCredit().subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);

        if (ret.isSuccess) {
          this.dataModelResult = ret;
          this.dataModel = ret.item;
          if (ret.listItems && ret.listItems.length > 0) {
            this.dataModel = ret.listItems[0];
          }
        } else {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.publicHelper.processService.processStop(pName);
      },
      error: (er) => {
        this.cmsToastrService.typeError(er);

        this.publicHelper.processService.processStop(pName, false);
      },
    });
  }
  translateHelp(t: string, v: string): string {
    return t + v;
  }
}
