import { ChangeDetectorRef, Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { NewsContentService } from "ntk-cms-api";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
import { NewsContentDeleteComponent } from "./delete.component";

@Component({
  selector: "app-news-content-delete-mobile",
  templateUrl: "./delete.mobile.component.html",
  standalone: false,
})
export class NewsContentDeleteMobileComponent extends NewsContentDeleteComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public override data: any,
    public override dialogRef: MatDialogRef<NewsContentDeleteComponent>,
    public override publicHelper: PublicHelper,
    public override contentService: NewsContentService,
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
