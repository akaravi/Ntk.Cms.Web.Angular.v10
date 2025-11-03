import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
  BaseModuleSiteCheckSiteModel,
  CoreEnumService,
  ErrorExceptionResult,
  PollingConfigurationService,
  TokenInfoModelV3,
} from "ntk-cms-api";
import { Subscription } from "rxjs";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";

@Component({
  selector: "app-polling-config-checksite",
  templateUrl: "./check-site.component.html",
  standalone: false,
})
export class PollingConfigCheckSiteComponent implements OnInit, OnDestroy {
  requestLinkSiteId = 0;

  constructorInfoAreaId = this.constructor.name;
  constructor(
    private configService: PollingConfigurationService,
    private activatedRoute: ActivatedRoute,
    private tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
    public publicHelper: PublicHelper,
    public coreEnumService: CoreEnumService,
    private cmsToastrService: CmsToastrService,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;
    this.requestLinkSiteId = +Number(
      this.activatedRoute.snapshot.paramMap.get("LinkSiteId"),
    );
    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;
    if (this.tokenInfo) {
      this.onLoadDate();
    }

    this.cmsApiStoreSubscribe = this.cmsStoreService
      .getState((state) => state.tokenInfoStore)
      .subscribe(async (value) => {
        this.tokenInfo = value;
        this.onLoadDate();
      });
  }
  cmsApiStoreSubscribe: Subscription;
  tokenInfo = new TokenInfoModelV3();

  dataModelResult: ErrorExceptionResult<BaseModuleSiteCheckSiteModel> =
    new ErrorExceptionResult<BaseModuleSiteCheckSiteModel>();
  tableRowsSelected: Array<BaseModuleSiteCheckSiteModel> = [];
  tableRowSelected: BaseModuleSiteCheckSiteModel =
    new BaseModuleSiteCheckSiteModel();
  tableSource: MatTableDataSource<BaseModuleSiteCheckSiteModel> =
    new MatTableDataSource<BaseModuleSiteCheckSiteModel>();

  tabledisplayedColumns: string[] = ["Accepted", "Title", "Description"];
  ngOnInit(): void {}
  ngOnDestroy(): void {
    if (this.cmsApiStoreSubscribe) {
      this.cmsApiStoreSubscribe.unsubscribe();
    }
  }
  onLoadDate(): void {
    if (!this.requestLinkSiteId || this.requestLinkSiteId === 0) {
      this.requestLinkSiteId = this.tokenInfo.access.siteId;
    }
    if (!this.requestLinkSiteId || this.requestLinkSiteId === 0) {
      return;
    }
    const pName = this.constructor.name + ".ServiceCheckSite";
    this.translate.get("MESSAGE.Check_website").subscribe((str: string) => {
      this.publicHelper.processService.processStart(
        pName,
        str,
        this.constructorInfoAreaId,
      );
    });
    this.configService.ServiceCheckSite(this.requestLinkSiteId).subscribe({
      next: (ret) => {
        this.publicHelper.processService.processStop(pName);
        this.dataModelResult = ret;
        this.tableSource.data = ret.listItems;
        if (!ret.isSuccess) {
          this.cmsToastrService.typeErrorGetOne(ret.errorMessage);
        }
      },
      error: (er) => {
        this.publicHelper.processService.processStop(pName);
        this.cmsToastrService.typeErrorGetOne(er);
      },
    });
  }
}
