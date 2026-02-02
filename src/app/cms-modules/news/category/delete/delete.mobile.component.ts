import { ChangeDetectorRef, Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { NewsCategoryService } from "ntk-cms-api";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
import { NewsCategoryDeleteComponent } from "./delete.component";

@Component({
  selector: "app-news-category-delete-mobile",
  templateUrl: "./delete.mobile.component.html",
  standalone: false,
})
export class NewsCategoryDeleteMobileComponent extends NewsCategoryDeleteComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public override data: any,
    public override dialogRef: MatDialogRef<NewsCategoryDeleteComponent>,
    public override publicHelper: PublicHelper,
    public override contentService: NewsCategoryService,
    public override cdr: ChangeDetectorRef,
    public override cmsToastrService: CmsToastrService,
    public override translate: TranslateService,
    private router: Router,
  ) {
    super(data, dialogRef, publicHelper, contentService, cdr, cmsToastrService, translate);
  }

  onActionBackToParent(): void {
    this.onFormCancel();
  }
}
