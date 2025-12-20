import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  FilterDataModel,
  FilterModel,
  EstatePropertyService,
  EstatePropertyAdsService,
  EstateAccountAgencyAdsService,
  EstatePropertyProjectService,
  EstatePropertyCompanyService,
  EstatePropertySupplierService,
} from "ntk-cms-api";
import { Subscription } from "rxjs";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

@Component({
  selector: "app-estate-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  standalone: false,
})
export class EstateDashboardComponent implements OnInit, OnDestroy {
  constructorInfoAreaId = this.constructor.name;

  // KPI بر اساس وضعیت‌های کلیدی
  kpi = {
    properties: {
      total: 0,
    },
    propertyAds: {
      total: 0,
    },
    agencyAds: {
      total: 0,
    },
    projects: {
      total: 0,
    },
    companies: {
      total: 0,
    },
    suppliers: {
      total: 0,
    },
  };

  private sub = new Subscription();

  constructor(
    private propertyService: EstatePropertyService,
    private propertyAdsService: EstatePropertyAdsService,
    private agencyAdsService: EstateAccountAgencyAdsService,
    private projectService: EstatePropertyProjectService,
    private companyService: EstatePropertyCompanyService,
    private supplierService: EstatePropertySupplierService,
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

    // Properties
    this.sub.add(
      this.propertyService.ServiceGetCount(fm()).subscribe({
        next: (ret) => {
          if (ret.isSuccess) this.kpi.properties.total = ret.totalRowCount;
        },
        error: (er) => this.toastr.typeError(er),
      }),
    );

    // Property Ads
    this.sub.add(
      this.propertyAdsService.ServiceGetCount(fm()).subscribe({
        next: (ret) => {
          if (ret.isSuccess) this.kpi.propertyAds.total = ret.totalRowCount;
        },
        error: (er) => this.toastr.typeError(er),
      }),
    );

    // Agency Ads
    this.sub.add(
      this.agencyAdsService.ServiceGetCount(fm()).subscribe({
        next: (ret) => {
          if (ret.isSuccess) this.kpi.agencyAds.total = ret.totalRowCount;
        },
        error: (er) => this.toastr.typeError(er),
      }),
    );

    // Projects
    this.sub.add(
      this.projectService.ServiceGetCount(fm()).subscribe({
        next: (ret) => {
          if (ret.isSuccess) this.kpi.projects.total = ret.totalRowCount;
        },
        error: (er) => this.toastr.typeError(er),
      }),
    );

    // Companies
    this.sub.add(
      this.companyService.ServiceGetCount(fm()).subscribe({
        next: (ret) => {
          if (ret.isSuccess) this.kpi.companies.total = ret.totalRowCount;
        },
        error: (er) => this.toastr.typeError(er),
      }),
    );

    // Suppliers
    this.sub.add(
      this.supplierService.ServiceGetCount(fm()).subscribe({
        next: (ret) => {
          if (ret.isSuccess) this.kpi.suppliers.total = ret.totalRowCount;
        },
        error: (er) => this.toastr.typeError(er),
      }),
    );
  }
}
