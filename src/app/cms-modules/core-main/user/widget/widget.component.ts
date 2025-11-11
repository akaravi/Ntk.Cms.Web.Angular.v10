import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import { CoreUserModel, CoreUserService, TokenInfoModelV3 } from "ntk-cms-api";
import { Subscription } from "rxjs";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { WidgetInfoModel } from "src/app/core/models/widget-info-model";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
import { environment } from "src/environments/environment";
import { CoreUserEmailConfirmComponent } from "../emailConfirm/emailConfirm.component";
import { CoreUserMobileConfirmComponent } from "../mobileConfirm/mobileConfirm.component";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";

@Component({
  selector: "app-core-user-widget",
  templateUrl: "./widget.component.html",
  standalone: false,
})
export class CoreUserWidgetComponent implements OnInit, OnDestroy {
  tokenInfo = new TokenInfoModelV3();
  widgetInfoModel = new WidgetInfoModel();
  cmsApiStoreSubscribe: Subscription;

  constructorInfoAreaId = this.constructor.name;
  constructor(
    private service: CoreUserService,
    private cmsToastrService: CmsToastrService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
    private tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
    public translate: TranslateService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;
  }
  dataModel: CoreUserModel = new CoreUserModel();
  ngOnInit(): void {
    this.widgetInfoModel.title = "TITLE.YOU:";
    this.widgetInfoModel.description = "TITLE.SUMMARY_ACCOUNT_DESCRIPTION";
    this.widgetInfoModel.link = "/core/User";

    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;
    if (this.tokenInfo) {
      this.onActionStatist();
    }
    this.cmsApiStoreSubscribe = this.cmsStoreService
      .getState((state) => state.tokenInfoStore)
      .subscribe(async (value) => {
        this.tokenInfo = value;
        this.onActionStatist();
      });
  }

  onActionButtonReload(): void {
    this.onActionStatist();
  }

  ngOnDestroy(): void {
    if (this.cmsApiStoreSubscribe) {
      this.cmsApiStoreSubscribe.unsubscribe();
    }
  }

  onActionStatist(): void {
    if (!this.tokenInfo.access.userId || this.tokenInfo.access.userId <= 0) {
      return;
    }
    this.publicHelper.processService.processStart(
      this.constructor.name + "All",
    );
    this.widgetInfoModel.link =
      "/core/user/edit/" + this.tokenInfo.access.userId;
 
    this.service.ServiceGetOneById(this.tokenInfo.access.userId).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.dataModel = ret.item;

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
  }
  onActionButtonEmailConfirm(): void {
    var panelClass = "";
    if (this.publicHelper.isMobile) panelClass = "dialog-fullscreen";
    else panelClass = "dialog-min";
    const dialogRef = this.dialog.open(CoreUserEmailConfirmComponent, {
      height: "70%",
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
        this.onActionStatist();
      }
    });
  }
  onActionButtonMobileConfirm(): void {
    var panelClass = "";
    if (this.publicHelper.isMobile) panelClass = "dialog-fullscreen";
    else panelClass = "dialog-min";
    const dialogRef = this.dialog.open(CoreUserMobileConfirmComponent, {
      height: "70%",
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
        this.onActionStatist();
      }
    });
  }
}
