import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
  DataFieldInfoModel,
  DataProviderClientService,
  DataProviderPlanService,
  DataProviderSourceService,
  DataProviderTransactionService,
  FilterDataModel,
  FilterDataModelSearchTypesEnum,
  RecordStatusEnum,
  TokenInfoModelV3,
} from "ntk-cms-api";
import { Subscription } from "rxjs";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
import { ThemeService } from "src/app/core/services/theme.service";

@Component({
  selector: "app-data-provider-overview-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.scss"],
  standalone: false,
})
export class DataProviderOverviewEventsComponent implements OnInit, OnDestroy {
  constructorInfoAreaId = this.constructor.name;
  constructor(
    public clientService: DataProviderClientService,
    public planService: DataProviderPlanService,
    public sourceService: DataProviderSourceService,
    public transactionService: DataProviderTransactionService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    private cmsToastrService: CmsToastrService,
    public themeService: ThemeService,
    private router: Router,
    public dialog: MatDialog,
    public translate: TranslateService,
    public tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;
    this.tokenInfo = cmsStoreService.getStateAll.tokenInfoStore;
    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.tokenInfoStore)
        .subscribe(async (value) => {
          this.tokenInfo = value;
        }),
    );
  }

  tokenInfo: TokenInfoModelV3 = new TokenInfoModelV3();
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();

  filterChildrecordStatus: FilterDataModel = new FilterDataModel();
  filterChildrecordStatusAvailable: FilterDataModel = new FilterDataModel();
  filterChildrecordStatusNotAvailable: FilterDataModel = new FilterDataModel();

  private unsubscribe: Subscription[] = [];

  ngOnInit(): void {
    this.filterChildrecordStatusAvailable.propertyName = "recordStatus";
    this.filterChildrecordStatusAvailable.value = RecordStatusEnum.Available;
    this.filterChildrecordStatusAvailable.searchType =
      FilterDataModelSearchTypesEnum.Equal;

    this.filterChildrecordStatusNotAvailable.propertyName = "recordStatus";
    this.filterChildrecordStatusNotAvailable.value = RecordStatusEnum.Available;
    this.filterChildrecordStatusNotAvailable.searchType =
      FilterDataModelSearchTypesEnum.NotEqual;
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}


