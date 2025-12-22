import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {
  CrmSupplierPriceListModel,
  CrmSupplierPriceListService,
  ErrorExceptionResult,
} from "ntk-cms-api";

@Component({
  selector: "app-crm-supplier-price-list-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
})
export class CrmSupplierPriceListAddComponent {
  saving = false;
  message = "";

  form = this.fb.group({
    linkAccountId: [""],
    productName: ["", Validators.required],
    productCode: [""],
    specification: [""],
    unit: [""],
    unitPrice: [0, Validators.required],
    currency: [""],
    paymentTerms: [""],
    deliveryTerms: [""],
    validFrom: [""],
    validTo: [""],
    linkPriceListFileId: [null],
    notes: [""],
  });

  constructor(
    private fb: FormBuilder,
    private service: CrmSupplierPriceListService,
    private router: Router,
  ) {}

  submit(): void {
    if (this.form.invalid) {
      this.message = "فرم را کامل کنید.";
      return;
    }
    const model = this.form.value as CrmSupplierPriceListModel;
    this.saving = true;
    this.service.ServiceAdd(model).subscribe({
      next: (res: ErrorExceptionResult<CrmSupplierPriceListModel>) => {
        this.saving = false;
        if (res.isSuccess) {
          this.router.navigate(["/cms/modules/crm/supplier-price-list"]);
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


