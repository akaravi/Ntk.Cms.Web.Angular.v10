import { ChangeDetectorRef, Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
  CoreEnumService,
  NewsCategoryService,
} from "ntk-cms-api";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
import { NewsCategoryAddComponent } from "./add.component";

@Component({
  selector: "app-news-category-add-mobile",
  templateUrl: "./add.mobile.component.html",
  standalone: false,
})
export class NewsCategoryAddMobileComponent extends NewsCategoryAddComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public override data: any,
    public override dialogRef: MatDialogRef<NewsCategoryAddComponent>,
    public override coreEnumService: CoreEnumService,
    public override categoryService: NewsCategoryService,
    public override cmsToastrService: CmsToastrService,
    public override publicHelper: PublicHelper,
    public override cdr: ChangeDetectorRef,
    public override translate: TranslateService,
    private router: Router,
  ) {
    super(data, dialogRef, coreEnumService, categoryService, cmsToastrService, publicHelper, cdr, translate);
  }

  onActionBackToParent(): void {
    this.onFormCancel();
  }
}
