import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import {
  CoreLogMicroServiceStatusModel,
  CoreLogMicroServiceStatusService,
  DataFieldInfoModel,
  MicroServiceCommandTypeEnum,
  TokenInfoModelV3,
} from "ntk-cms-api";
import { Subscription } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { FormInfoModel } from "src/app/core/models/formInfoModel";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";

@Component({
  selector: "app-core-log-micro-service-status-view",
  templateUrl: "./view.component.html",
  standalone: false,
})
export class CoreLogMicroServiceStatusViewComponent
  implements OnInit, OnDestroy
{
  constructorInfoAreaId = this.constructor.name;
  @ViewChild("vform", { static: false }) formGroup: FormGroup;

  tokenInfo = new TokenInfoModelV3();
  formInfo: FormInfoModel = new FormInfoModel();

  dataModel: CoreLogMicroServiceStatusModel =
    {} as CoreLogMicroServiceStatusModel;
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();

  private unsubscribe: Subscription[] = [];
  private readonly destroy$ = new Subject<void>();
  pingLoading = false;
  commandLoading = false;
  errorMessage: string | null = null;
  readonly MicroServiceCommandTypeEnum = MicroServiceCommandTypeEnum;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { item?: CoreLogMicroServiceStatusModel },
    private dialogRef: MatDialogRef<CoreLogMicroServiceStatusViewComponent>,
    private cmsStoreService: CmsStoreService,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
    public translate: TranslateService,
    private statusService: CoreLogMicroServiceStatusService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;
    this.dataModel = data?.item ?? ({} as CoreLogMicroServiceStatusModel);
  }

  ngOnInit(): void {
    this.translate.get("TITLE.VIEW").subscribe((str: string) => {
      const title = this.dataModel?.appInfo ? ` ${this.dataModel.appInfo}` : "";
      this.formInfo.formTitle = `${str}${title}`;
    });

    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;
    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.tokenInfoStore)
        .subscribe(async (value) => {
          this.tokenInfo = value;
          this.cdr.markForCheck();
        }),
    );
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) this.unsubscribe.forEach((sb) => sb.unsubscribe());
    this.destroy$.next();
    this.destroy$.complete();
  }

  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }

  onActionPing(): void {
    if (!this.dataModel) return;
    const routeTarget = this.dataModel.routeTarget || this.dataModel.appInfo;
    if (!routeTarget) return;
    this.pingLoading = true;
    this.errorMessage = null;
    this.statusService
      .ServicePing(routeTarget, 15)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.pingLoading = false;
          if (res?.isSuccess) {
            this.errorMessage = null;
            // می‌توانید نتیجه Ping را نمایش دهید
            alert(`Ping موفق - RTT: ${res.item?.rttMs || 0}ms`);
          } else {
            this.errorMessage =
              (res as { errorMessage?: string })?.errorMessage || "Ping ناموفق";
          }
          this.cdr.markForCheck();
        },
        error: (err) => {
          this.pingLoading = false;
          this.errorMessage =
            err?.message || err?.error?.message || "خطا در Ping";
          this.cdr.markForCheck();
        },
      });
  }

  onActionReloadConfig(): void {
    if (!this.dataModel) return;
    const routeTarget = this.dataModel.routeTarget || this.dataModel.appInfo;
    if (!routeTarget) return;
    this.commandLoading = true;
    this.errorMessage = null;
    this.statusService
      .ServiceSendCommand(routeTarget, {
        commandType: MicroServiceCommandTypeEnum.ReloadConfig,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.commandLoading = false;
          if (res?.isSuccess) {
            this.errorMessage = null;
            alert("دستور Reload Config با موفقیت ارسال شد");
          } else {
            this.errorMessage =
              (res as { errorMessage?: string })?.errorMessage ||
              "ارسال دستور ناموفق";
          }
          this.cdr.markForCheck();
        },
        error: (err) => {
          this.commandLoading = false;
          this.errorMessage =
            err?.message || err?.error?.message || "خطا در ارسال دستور";
          this.cdr.markForCheck();
        },
      });
  }

  onActionBack(): void {
    this.onFormCancel();
  }
}
