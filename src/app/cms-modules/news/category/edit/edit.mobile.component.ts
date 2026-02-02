import { ChangeDetectorRef, Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import {
  CoreEnumService,
  NewsCategoryService,
} from "ntk-cms-api";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
import { NewsCategoryEditComponent } from "./edit.component";

@Component({
  selector: "app-news-category-edit-mobile",
  templateUrl: "./edit.mobile.component.html",
  standalone: false,
})
export class NewsCategoryEditMobileComponent extends NewsCategoryEditComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public override data: any,
    public override dialogRef: MatDialogRef<NewsCategoryEditComponent>,
    public override coreEnumService: CoreEnumService,
    public override categoryService: NewsCategoryService,
    public override cmsToastrService: CmsToastrService,
    public override publicHelper: PublicHelper,
    public override cdr: ChangeDetectorRef,
    public override translate: TranslateService,
  ) {
    super(data, dialogRef, coreEnumService, categoryService, cmsToastrService, publicHelper, cdr, translate);
  }

  onActionBackToParent(): void {
    this.onFormCancel();
  }
}
