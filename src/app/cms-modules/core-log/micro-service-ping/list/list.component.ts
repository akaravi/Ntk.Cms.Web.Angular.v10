import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { TranslateService } from "@ngx-translate/core";
import {
  CoreLogMicroServicePingModel,
  CoreLogMicroServicePingService,
  DataFieldInfoModel,
  ErrorExceptionResult,
  FilterModel,
} from "ntk-cms-api";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { PageInfoService } from "src/app/core/services/page-info.service";
import { environment } from "src/environments/environment";
import { CoreLogMicroServicePingViewComponent } from "../view/view.component";

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
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();

  tabledisplayedColumns: string[] = [];
  tabledisplayedColumnsSource: string[] = [
    "appInfo",
    "rttMs",
    "pingTimestamp",
    "pongTimestamp",
    "Action",
  ];
  tabledisplayedColumnsMobileSource: string[] = [
    "appInfo",
    "rttMs",
    "pingTimestamp",
    "pongTimestamp",
  ];
  tableRowSelect2Click = false;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly pingService: CoreLogMicroServicePingService,
    public tokenHelper: TokenHelper,
    public translate: TranslateService,
    public publicHelper: PublicHelper,
    public pageInfo: PageInfoService,
    private cmsStoreService: CmsStoreService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
  ) {
    this.publicHelper.processService.cdr = this.cdr;
  }

  ngOnInit(): void {
    this.tabledisplayedColumns = this.publicHelper.TableDisplayedColumns(
      this.tabledisplayedColumnsSource,
      this.tabledisplayedColumnsMobileSource,
      [],
      this.cmsStoreService.getStateAll.tokenInfoStore,
    );
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

  onActionTableRowSelect(
    item: CoreLogMicroServicePingModel,
    event: MouseEvent = null,
  ): void {
    if (event) event.preventDefault();
    this.tableRowSelected = item;
    if (event?.button === 2) {
      setTimeout(() => {
        this.tableRowSelect2Click = true;
      }, 100);
      return;
    }
    this.cdr.markForCheck();
  }

  onTableSortData(sort: MatSort): void {
    if (
      this.tableSource &&
      this.tableSource.sort &&
      this.tableSource.sort.active === sort.active
    ) {
      if (this.tableSource.sort.start === "asc") {
        sort.start = "desc";
      } else if (this.tableSource.sort.start === "desc") {
        sort.start = "asc";
      } else {
        sort.start = "desc";
      }
    }
    this.tableSource.sort = sort;
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

  onActionButtonViewRow(
    model: CoreLogMicroServicePingModel = this.tableRowSelected,
  ): void {
    if (!model) return;
    const panelClass = this.publicHelper.isMobile
      ? "dialog-fullscreen"
      : "dialog-min";
    this.dialog.open(CoreLogMicroServicePingViewComponent, {
      height: "90%",
      panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: { item: model },
    });
  }
  onActionGridExpandRows(expand: boolean): void {
    this.cdr.markForCheck();
  }
}
