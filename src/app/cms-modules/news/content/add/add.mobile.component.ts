import { ChangeDetectorRef, Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
  CoreEnumService,
  NewsContentService,
  NewsContentSimilarService,
  NewsContentOtherInfoService,
  NewsContentTagService,
} from "ntk-cms-api";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
import { NewsContentAddComponent } from "./add.component";

@Component({
  selector: "app-news-content-add-mobile",
  templateUrl: "./add.mobile.component.html",
  standalone: false,
})
export class NewsContentAddMobileComponent extends NewsContentAddComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NewsContentAddComponent>,
    public override activatedRoute: ActivatedRoute,
    public override publicHelper: PublicHelper,
    public override coreEnumService: CoreEnumService,
    public override contentService: NewsContentService,
    public override contentSimilarService: NewsContentSimilarService,
    public override contentOtherInfoService: NewsContentOtherInfoService,
    public override cmsToastrService: CmsToastrService,
    public override router: Router,
    public override contentTagService: NewsContentTagService,
    public override cdr: ChangeDetectorRef,
    public override translate: TranslateService,
  ) {
    super(activatedRoute, publicHelper, coreEnumService, contentService, contentSimilarService, contentOtherInfoService, cmsToastrService, router, contentTagService, cdr, translate);
    if (data) {
      this.requestCategoryId = data.categoryId || 0;
    }
  }

  onActionBackToParent(): void {
    this.onFormCancel();
  }

  onFormCancel(): void {
    if (this.dialogRef) {
      this.dialogRef.close({ dialogChangedDate: false });
    } else {
      this.onActionBackToParent();
    }
  }
}
