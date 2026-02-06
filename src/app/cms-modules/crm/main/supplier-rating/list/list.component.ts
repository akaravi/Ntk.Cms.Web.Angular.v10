import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import {
  CrmSupplierRatingModel,
  CrmSupplierRatingService,
  ErrorExceptionResult,
  FilterModel,
} from "ntk-cms-api";

@Component({
  selector: "app-crm-supplier-rating-list",
  templateUrl: "./list.component.html",
  standalone: false,
})
export class CrmSupplierRatingListComponent implements OnInit, OnDestroy {
  data: ErrorExceptionResult<CrmSupplierRatingModel>;
  loading = false;
  private sub: Subscription;

  constructor(private service: CrmSupplierRatingService) {}

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
