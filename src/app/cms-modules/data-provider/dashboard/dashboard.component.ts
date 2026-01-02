import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  FilterDataModel,
  FilterModel,
  DataProviderClientService,
  DataProviderPlanService,
  DataProviderSourceService,
  DataProviderTransactionService,
  DataProviderPlanCategoryService,
  DataProviderPlanPriceService,
} from "ntk-cms-api";
import { Subscription } from "rxjs";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

@Component({
  selector: "app-data-provider-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  standalone: false,
})
export class DataProviderDashboardComponent implements OnInit, OnDestroy {
  constructorInfoAreaId = this.constructor.name;

  // KPI بر اساس وضعیت‌های کلیدی
  kpi = {
    clients: {
      total: 0,
    },
    plans: {
      total: 0,
    },
    planCategories: {
      total: 0,
    },
    planPrices: {
      total: 0,
    },
    sources: {
      total: 0,
    },
    transactions: {
      total: 0,
    },
  };

  private sub = new Subscription();

  constructor(
    private clientService: DataProviderClientService,
    private planService: DataProviderPlanService,
    private planCategoryService: DataProviderPlanCategoryService,
    private planPriceService: DataProviderPlanPriceService,
    private sourceService: DataProviderSourceService,
    private transactionService: DataProviderTransactionService,
    private toastr: CmsToastrService,
  ) {}

  ngOnInit(): void {
    this.loadKpi();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private loadKpi(): void {
    const fm = () => {
      const f = new FilterModel();
      f.accessLoad = true;
      return f;
    };

    // Clients
    this.sub.add(
      this.clientService.ServiceGetCount(fm()).subscribe({
        next: (ret) => {
          if (ret.isSuccess) this.kpi.clients.total = ret.totalRowCount;
        },
        error: (er) => this.toastr.typeError(er),
      }),
    );

    // Plans
    this.sub.add(
      this.planService.ServiceGetCount(fm()).subscribe({
        next: (ret) => {
          if (ret.isSuccess) this.kpi.plans.total = ret.totalRowCount;
        },
        error: (er) => this.toastr.typeError(er),
      }),
    );

    // Plan Categories
    this.sub.add(
      this.planCategoryService.ServiceGetCount(fm()).subscribe({
        next: (ret) => {
          if (ret.isSuccess) this.kpi.planCategories.total = ret.totalRowCount;
        },
        error: (er) => this.toastr.typeError(er),
      }),
    );

    // Plan Prices
    this.sub.add(
      this.planPriceService.ServiceGetCount(fm()).subscribe({
        next: (ret) => {
          if (ret.isSuccess) this.kpi.planPrices.total = ret.totalRowCount;
        },
        error: (er) => this.toastr.typeError(er),
      }),
    );

    // Sources
    this.sub.add(
      this.sourceService.ServiceGetCount(fm()).subscribe({
        next: (ret) => {
          if (ret.isSuccess) this.kpi.sources.total = ret.totalRowCount;
        },
        error: (er) => this.toastr.typeError(er),
      }),
    );

    // Transactions
    this.sub.add(
      this.transactionService.ServiceGetCount(fm()).subscribe({
        next: (ret) => {
          if (ret.isSuccess) this.kpi.transactions.total = ret.totalRowCount;
        },
        error: (er) => this.toastr.typeError(er),
      }),
    );
  }
}


