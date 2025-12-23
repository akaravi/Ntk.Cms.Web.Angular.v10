import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import { CoreEnumService, EstateAdsTypeService } from "ntk-cms-api";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

import { EstateAdsTypeEditBaseComponent } from "./edit.base";

@Component({
  selector: "app-estate-ads-type-edit",
  templateUrl: "./edit.component.html",

  standalone: false,
})
export class EstateAdsTypeEditComponent
  extends EstateAdsTypeEditBaseComponent
  implements OnInit
{
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EstateAdsTypeEditComponent>,
    public coreEnumService: CoreEnumService,
    public estateAdsTypeService: EstateAdsTypeService,
    cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    cdr: ChangeDetectorRef,
    public translate: TranslateService,
  ) {
    super(
      coreEnumService,
      estateAdsTypeService,
      cmsToastrService,
      publicHelper,
      cdr,
      translate,
    );
    if (data) {
      this.requestId = data.id;
    }
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;

  ngOnInit(): void {
    this.translate.get("TITLE.Edit").subscribe((str: string) => {
      this.formInfo.formTitle = str;
    });
    if (
      !this.validateRequestId(() =>
        this.dialogRef.close({ dialogChangedDate: false }),
      )
    ) {
      return;
    }
    this.loadItem();
  }

  onFormSubmit(): void {
    this.onFormSubmitInternal(() => {
      this.dialogRef.close({ dialogChangedDate: true });
    });
  }
  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }
}
