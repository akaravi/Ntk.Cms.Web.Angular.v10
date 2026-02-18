import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {
  CoreLogMicroServicePingModel,
  CoreLogMicroServiceStatusModel,
  CoreLogMicroServiceStatusService,
  MicroServiceCommandTypeEnum,
} from "ntk-cms-api";
import { interval, Subject, Subscription } from "rxjs";
import { startWith, takeUntil } from "rxjs/operators";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { PageInfoService } from "src/app/core/services/page-info.service";

@Component({
  selector: "app-core-log-micro-service-status-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
  standalone: false,
})
export class CoreLogMicroServiceStatusListComponent
  implements OnInit, OnDestroy
{
  constructorInfoAreaId = this.constructor.name;
  statusList: CoreLogMicroServiceStatusModel[] = [];
  tableRowSelected: CoreLogMicroServiceStatusModel | null = null;
  pingResult: CoreLogMicroServicePingModel | null = null;
  pingLoading = false;
  commandLoading = false;
  statusLoading = false;
  errorMessage: string | null = null;
  pollIntervalSeconds = 10;
  appInfoFilter = "";
  isDarkMode = false;
  viewGuideNotice = false;

  readonly MicroServiceCommandTypeEnum = MicroServiceCommandTypeEnum;
  private pollSubscription: Subscription | null = null;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly statusService: CoreLogMicroServiceStatusService,
    public tokenHelper: TokenHelper,
    public translate: TranslateService,
    public publicHelper: PublicHelper,
    public pageInfo: PageInfoService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadStatus();
    this.startPolling();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.stopPolling();
  }

  private getProp<T>(
    obj: unknown,
    camel: string,
    pascal: string,
  ): T | undefined {
    if (!obj || typeof obj !== "object") return undefined;
    const o = obj as Record<string, unknown>;
    return (o[camel] ?? o[pascal]) as T | undefined;
  }

  private normalizeStatusItem(raw: unknown): CoreLogMicroServiceStatusModel {
    if (!raw || typeof raw !== "object") {
      return {} as CoreLogMicroServiceStatusModel;
    }
    const r = raw as Record<string, unknown>;
    return {
      ...r,
      id: this.getProp<string>(r, "id", "Id"),
      appInfo: this.getProp<string>(r, "appInfo", "AppInfo") ?? "",
      appVersion: this.getProp<string>(r, "appVersion", "AppVersion") ?? "",
      appLocation: this.getProp<string>(r, "appLocation", "AppLocation") ?? "",
      appInfoStart: this.getProp(r, "appInfoStart", "AppInfoStart"),
      createDateMessage: this.getProp(
        r,
        "createDateMessage",
        "CreateDateMessage",
      ),
      operationStatisticsJson:
        this.getProp<string>(
          r,
          "operationStatisticsJson",
          "OperationStatisticsJson",
        ) ?? "",
      smsProviderStatusJson:
        this.getProp<string>(
          r,
          "smsProviderStatusJson",
          "SmsProviderStatusJson",
        ) ?? "",
    } as CoreLogMicroServiceStatusModel;
  }

  private getListFromResponse(res: unknown): CoreLogMicroServiceStatusModel[] {
    if (!res) return [];
    let list: unknown[] = [];
    if (Array.isArray(res)) {
      list = res;
    } else if (typeof res === "object") {
      const r = res as Record<string, unknown>;
      const raw =
        r.listItems ?? r.ListItems ?? r.items ?? r.Items ?? r.data ?? r.Data;
      list = Array.isArray(raw) ? raw : [];
    }
    return list.map((item) => this.normalizeStatusItem(item));
  }

  private isSuccessResponse(res: unknown): boolean {
    if (!res || typeof res !== "object") return false;
    const r = res as Record<string, unknown>;
    return r.isSuccess === true || r.IsSuccess === true;
  }

  private getErrorMessage(res: unknown): string {
    if (!res || typeof res !== "object") return "خطا در دریافت وضعیت";
    const r = res as Record<string, unknown>;
    return (
      (r.errorMessage as string) ??
      (r.ErrorMessage as string) ??
      "خطا در دریافت وضعیت"
    );
  }

  loadStatus(): void {
    const filter = this.appInfoFilter?.trim();
    this.statusLoading = true;
    this.errorMessage = null;

    const obs = filter
      ? this.statusService.ServiceGetStatusByAppInfoFilter(filter)
      : this.statusService.ServiceGetAllStatus();

    obs.pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        this.statusLoading = false;
        if (this.isSuccessResponse(res)) {
          this.statusList = this.getListFromResponse(res);
          this.errorMessage = null;
        } else {
          this.statusList = [];
          this.errorMessage = this.getErrorMessage(res);
        }
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.statusLoading = false;
        this.statusList = [];
        this.errorMessage =
          err?.message || err?.error?.message || "خطا در ارتباط با سرور";
        this.cdr.markForCheck();
      },
    });
  }

  private startPolling(): void {
    this.stopPolling();
    this.pollSubscription = interval(this.pollIntervalSeconds * 1000)
      .pipe(startWith(0))
      .subscribe(() => this.loadStatus());
  }

  private stopPolling(): void {
    if (this.pollSubscription) {
      this.pollSubscription.unsubscribe();
      this.pollSubscription = null;
    }
  }

  onActionTableRowSelect(item: CoreLogMicroServiceStatusModel): void {
    this.tableRowSelected = item;
    this.pingResult = null;
    this.cdr.markForCheck();
  }

  onPing(): void {
    const item = this.tableRowSelected;
    if (!item?.routeTarget) return;
    this.pingLoading = true;
    this.pingResult = null;
    this.errorMessage = null;
    this.statusService
      .ServicePing(item.routeTarget, 15)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.pingLoading = false;
          if (res?.isSuccess) {
            const pingItem =
              res.item ??
              (res as { listItems?: CoreLogMicroServicePingModel[] })
                ?.listItems?.[0];
            this.pingResult = pingItem ?? null;
            this.errorMessage = null;
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

  onSendCommand(commandType: MicroServiceCommandTypeEnum): void {
    const item = this.tableRowSelected;
    if (!item?.appInfo) return;
    this.commandLoading = true;
    this.errorMessage = null;
    this.statusService
      .ServiceSendCommand(item.appInfo, { commandType })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.commandLoading = false;
          if (res?.isSuccess) {
            this.errorMessage = null;
            this.loadStatus();
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

  onApplyFilter(): void {
    this.loadStatus();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.classList.toggle("dark-theme", this.isDarkMode);
    this.cdr.markForCheck();
  }

  getAppInfoStart(item: CoreLogMicroServiceStatusModel): string {
    const d = item?.appInfoStart;
    if (d == null) return "-";
    const date = typeof d === "string" ? new Date(d) : d;
    if (isNaN(date.getTime())) return "-";
    return date.toLocaleString("fa-IR");
  }

  getLastUpdate(item: CoreLogMicroServiceStatusModel): string {
    const d = item?.createDateMessage;
    if (d == null) return "-";
    const date = typeof d === "string" ? new Date(d) : d;
    if (isNaN(date.getTime())) return "-";
    return date.toLocaleString("fa-IR");
  }

  getCommandLabel(type: MicroServiceCommandTypeEnum): string {
    const labels: Record<MicroServiceCommandTypeEnum, string> = {
      [MicroServiceCommandTypeEnum.PauseStatus]: "توقف وضعیت",
      [MicroServiceCommandTypeEnum.ResumeStatus]: "از سرگیری وضعیت",
      [MicroServiceCommandTypeEnum.ReloadConfig]: "بارگذاری مجدد تنظیمات",
      [MicroServiceCommandTypeEnum.UpdateSettings]: "به‌روزرسانی تنظیمات",
    };
    return labels[type] ?? "";
  }

  trackById(_index: number, item: CoreLogMicroServiceStatusModel): string {
    return item?.id ?? item?.appInfo ?? `idx-${_index}`;
  }

  isOnline(item: CoreLogMicroServiceStatusModel): boolean {
    const d = item?.createDateMessage;
    if (d == null) return false;
    const date = typeof d === "string" ? new Date(d) : d;
    if (isNaN(date.getTime())) return false;
    const diffMs = Date.now() - date.getTime();
    return diffMs < 120000;
  }

  onActionButtonReload(): void {
    this.loadStatus();
  }
}
