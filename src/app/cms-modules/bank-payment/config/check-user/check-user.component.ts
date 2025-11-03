import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
  BankPaymentConfigurationService,
  BaseModuleSiteCheckUserModel,
  CoreEnumService,
  ErrorExceptionResult,
  TokenInfoModelV3,
} from "ntk-cms-api";
import { Subscription } from "rxjs";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";

@Component({
  selector: "app-core-config-checkuser",
  templateUrl: "./check-user.component.html",
  standalone: false,
})
export class BankPaymentConfigCheckUserComponent implements OnInit, OnDestroy {
  requestLinkUserId = 0;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private configService: BankPaymentConfigurationService,
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

    this.requestLinkUserId = +Number(
      this.activatedRoute.snapshot.paramMap.get("LinkUserId"),
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

  dataModelResult: ErrorExceptionResult<BaseModuleSiteCheckUserModel> =
    new ErrorExceptionResult<BaseModuleSiteCheckUserModel>();
  tableRowsSelected: Array<BaseModuleSiteCheckUserModel> = [];
  tableRowSelected: BaseModuleSiteCheckUserModel =
    new BaseModuleSiteCheckUserModel();
  tableSource: MatTableDataSource<BaseModuleSiteCheckUserModel> =
    new MatTableDataSource<BaseModuleSiteCheckUserModel>();
  tabledisplayedColumns: string[] = ["Accepted", "Title", "Description"];
  ngOnInit(): void {}
  ngOnDestroy(): void {
    if (this.cmsApiStoreSubscribe) {
      this.cmsApiStoreSubscribe.unsubscribe();
    }
  }
  onLoadDate(): void {
    if (!this.requestLinkUserId || this.requestLinkUserId === 0) {
      this.requestLinkUserId = this.tokenInfo.access.userId;
    }
    if (!this.requestLinkUserId || this.requestLinkUserId === 0) {
      return;
    }
    const pName = this.constructor.name + ".ServiceCheckUser";
    this.translate.get("TITLE.Check_account").subscribe((str: string) => {
      this.publicHelper.processService.processStart(
        pName,
        str,
        this.constructorInfoAreaId,
      );
    });
    this.configService.ServiceCheckUser(this.requestLinkUserId).subscribe({
      next: (ret) => {
        this.publicHelper.processService.processStop(pName);
        this.dataModelResult = ret;
        this.tableSource.data = ret.listItems;
        if (!ret.isSuccess) {
          this.cmsToastrService.typeErrorGetOne(ret.errorMessage);
        }
      },
      error: (er) => {
        this.cmsToastrService.typeErrorGetOne(er);
        this.publicHelper.processService.processStop(pName, false);
      },
    });
  }
}
