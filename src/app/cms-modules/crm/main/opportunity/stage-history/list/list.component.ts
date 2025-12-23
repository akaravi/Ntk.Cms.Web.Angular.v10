import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { TranslateService } from "@ngx-translate/core";
// Commented: Service and Model not available in API
// import {
//   CrmOpportunityStageHistoryModel,
//   CrmOpportunityStageHistoryService,
//   ErrorExceptionResult,
// } from "ntk-cms-api";
import { ErrorExceptionResult } from "ntk-cms-api";
import { Subscription } from "rxjs";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

/**
 * Component لیست تاریخچه Stageهای Opportunity CRM.
 * این component تاریخچه تغییرات Stage در یک Opportunity را نمایش می‌دهد.
 */
@Component({
  selector: "app-crm-opportunity-stage-history-list",
  templateUrl: "./list.component.html",
  standalone: false,
})
export class CrmOpportunityStageHistoryListComponent
  implements OnInit, OnDestroy
{
  @Input() opportunityId: string;

  // Commented: Model not available in API
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    "stage",
    "amount",
    "probability",
    "expectedRevenue",
    "closeDate",
    "lastModified",
  ];
  dataModelResult: ErrorExceptionResult<any> =
    new ErrorExceptionResult<any>();
  loading = false;

  private subscriptions: Subscription[] = [];

  constructor(
    // private contentService: CrmOpportunityStageHistoryService, // Commented: Service not available in API
    private cmsToastrService: CmsToastrService,
    public tokenHelper: TokenHelper,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
    public publicHelper: PublicHelper
  ) {
    this.publicHelper.processService.cdr = this.cdr;
  }

  ngOnInit(): void {
    if (this.opportunityId) {
      this.loadData();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  /**
   * بارگذاری داده‌های تاریخچه Stage.
   */
  loadData(): void {
    // Commented: Service not available in API
    // if (!this.opportunityId) {
    //   return;
    // }

    // this.loading = true;
    // const subscription = this.contentService
    //   .ServiceGetHistoryByOpportunity(this.opportunityId)
    //   .subscribe({
    //     next: (response) => {
    //       this.dataModelResult = response;
    //       if (response.isSuccess && response.listItems) {
    //         this.dataSource.data = response.listItems;
    //       } else {
    //         this.cmsToastrService.typeErrorGet(response.errorMessage);
    //       }
    //       this.loading = false;
    //       this.cdr.detectChanges();
    //     },
    //     error: (error) => {
    //       this.cmsToastrService.typeError(error);
    //       this.loading = false;
    //       this.cdr.detectChanges();
    //     },
    //   });

    // this.subscriptions.push(subscription);
    this.cmsToastrService.typeWarningMessage("این قابلیت در حال حاضر در دسترس نیست");
  }

  /**
   * فرمت کردن عدد به صورت پول.
   */
  formatCurrency(value: number): string {
    if (!value) return "-";
    return new Intl.NumberFormat("fa-IR", {
      style: "currency",
      currency: "IRR",
    }).format(value);
  }

  /**
   * فرمت کردن تاریخ.
   */
  formatDate(date: Date): string {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("fa-IR");
  }

  /**
   * فرمت کردن درصد.
   */
  formatPercent(value: number): string {
    if (!value) return "-";
    return value.toFixed(2) + "%";
  }

  getNotAvailableMessage(): string {
    return "این قابلیت در حال حاضر در دسترس نیست";
  }
}

