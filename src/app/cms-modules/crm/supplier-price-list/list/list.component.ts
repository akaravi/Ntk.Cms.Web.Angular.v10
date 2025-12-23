import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  CrmSupplierPriceListModel,
  CrmSupplierPriceListService,
  ErrorExceptionResult,
  FilterModel,
} from "ntk-cms-api";
import { Subscription } from "rxjs";

@Component({
  selector: "app-crm-supplier-price-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
  standalone: false,
})
export class CrmSupplierPriceListComponent implements OnInit, OnDestroy {
  data: ErrorExceptionResult<CrmSupplierPriceListModel>;
  loading = false;
  private sub: Subscription;

  constructor(private service: CrmSupplierPriceListService) {}

  ngOnInit(): void {
    this.load();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  load(): void {
    const filter = new FilterModel();
    this.loading = true;
    this.sub = this.service.ServiceGetAll(filter).subscribe({
      next: (res) => {
        this.data = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
