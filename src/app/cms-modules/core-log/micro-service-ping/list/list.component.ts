import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { TranslateService } from "@ngx-translate/core";
import {
  CoreLogMicroServicePingModel,
  CoreLogMicroServicePingService,
  ErrorExceptionResult,
  FilterModel,
} from "ntk-cms-api";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { PageInfoService } from "src/app/core/services/page-info.service";

@Component({
  selector: "app-core-log-micro-service-ping-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
  standalone: false,
})
export class CoreLogMicroServicePingListComponent implements OnInit, OnDestroy {
  constructorInfoAreaId = this.constructor.name;
  pingList: CoreLogMicroServicePingModel[] = [];
  tableSource = new MatTableDataSource<CoreLogMicroServicePingModel>([]);
  tableRowSelected: CoreLogMicroServicePingModel | null = null;
  statusLoading = false;
  errorMessage: string | null = null;
  viewGuideNotice = false;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly pingService: CoreLogMicroServicePingService,
    public tokenHelper: TokenHelper,
    public translate: TranslateService,
    public publicHelper: PublicHelper,
    public pageInfo: PageInfoService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadPingList();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getListFromResponse(res: unknown): CoreLogMicroServicePingModel[] {
    if (!res) return [];
    const r = res as Record<string, unknown>;
    const raw =
      r.listItems ?? r.ListItems ?? r.items ?? r.Items ?? r.data ?? r.Data;
    const list = Array.isArray(raw) ? raw : [];
    return list.map((item) => this.normalizePingItem(item));
  }

  private normalizePingItem(raw: unknown): CoreLogMicroServicePingModel {
    if (!raw || typeof raw !== "object") {
      return {} as CoreLogMicroServicePingModel;
    }
    const r = raw as Record<string, unknown>;
    const getProp = (camel: string, pascal: string) =>
      (r[camel] ?? r[pascal]) as unknown;
    return {
      id: getProp("id", "Id") as string | undefined,
      requestId: (getProp("requestId", "RequestId") as string) ?? "",
      appInfo: (getProp("appInfo", "AppInfo") as string) ?? "",
      pingTimestamp: getProp("pingTimestamp", "PingTimestamp") as Date,
      pongTimestamp: getProp("pongTimestamp", "PongTimestamp") as Date,
      rttMs: (getProp("rttMs", "RttMs") as number) ?? 0,
    } as CoreLogMicroServicePingModel;
  }

  loadPingList(): void {
    this.statusLoading = true;
    this.errorMessage = null;
    const filterModel = new FilterModel();
    filterModel.accessLoad = true;

    this.pingService
      .ServiceGetAll(filterModel)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: ErrorExceptionResult<CoreLogMicroServicePingModel>) => {
          this.statusLoading = false;
          if (res?.isSuccess) {
            this.pingList = this.getListFromResponse(res);
            this.tableSource.data = this.pingList;
            this.errorMessage = null;
          } else {
            this.pingList = [];
            this.tableSource.data = [];
            this.errorMessage = res?.errorMessage ?? "خطا در دریافت لیست Ping";
          }
          this.cdr.markForCheck();
        },
        error: (err) => {
          this.statusLoading = false;
          this.pingList = [];
          this.tableSource.data = [];
          this.errorMessage =
            err?.message || err?.error?.message || "خطا در ارتباط با سرور";
          this.cdr.markForCheck();
        },
      });
  }

  onActionTableRowSelect(item: CoreLogMicroServicePingModel): void {
    this.tableRowSelected = item;
    this.cdr.markForCheck();
  }

  getPingTimestamp(item: CoreLogMicroServicePingModel): string {
    const d = item?.pingTimestamp;
    if (d == null) return "-";
    const date = typeof d === "string" ? new Date(d) : d;
    if (isNaN(date.getTime())) return "-";
    return date.toLocaleString("fa-IR");
  }

  getPongTimestamp(item: CoreLogMicroServicePingModel): string {
    const d = item?.pongTimestamp;
    if (d == null) return "-";
    const date = typeof d === "string" ? new Date(d) : d;
    if (isNaN(date.getTime())) return "-";
    return date.toLocaleString("fa-IR");
  }

  trackById(_index: number, item: CoreLogMicroServicePingModel): string {
    return item?.id ?? item?.requestId ?? `idx-${_index}`;
  }

  onActionButtonReload(): void {
    this.loadPingList();
  }
}
