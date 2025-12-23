import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {
  CrmSupplierRatingModel,
  CrmSupplierRatingService,
  ErrorExceptionResult,
} from "ntk-cms-api";

@Component({
  selector: "app-crm-supplier-rating-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
  standalone: false,
})
export class CrmSupplierRatingAddComponent {
  saving = false;
  message = "";

  form = this.fb.group({
    linkAccountId: [""],
    scoreQuality: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
    scoreDelivery: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
    scoreCooperation: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
    scorePrice: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
    scoreFlexibility: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
    scoreSupport: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
    averageScore: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
    evaluationDate: [new Date(), Validators.required],
    notes: [""],
  });

  constructor(
    private fb: FormBuilder,
    private service: CrmSupplierRatingService,
    private router: Router,
  ) {}

  submit(): void {
    if (this.form.invalid) {
      this.message = "فرم را کامل کنید.";
      return;
    }
    const model = this.form.value as CrmSupplierRatingModel;
    this.saving = true;
    this.service.ServiceAdd(model).subscribe({
      next: (res: ErrorExceptionResult<CrmSupplierRatingModel>) => {
        this.saving = false;
        if (res.isSuccess) {
          this.router.navigate(["/cms/modules/crm/supplier-rating"]);
        } else {
          this.message = res.errorMessage;
        }
      },
      error: (err) => {
        this.saving = false;
        this.message = err?.message || "خطا در ذخیره";
      },
    });
  }
}
