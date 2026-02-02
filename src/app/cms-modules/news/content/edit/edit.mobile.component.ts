import { ChangeDetectorRef, Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
  CoreEnumService,
  NewsContentService,
  NewsContentTagService,
  NewsContentSimilarService,
  NewsContentOtherInfoService,
  NewsContentCategoryService,
} from "ntk-cms-api";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
import { NewsContentEditComponent } from "./edit.component";

@Component({
  selector: "app-news-content-edit-mobile",
  templateUrl: "./edit.mobile.component.html",
  standalone: false,
})
export class NewsContentEditMobileComponent extends NewsContentEditComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NewsContentEditComponent>,
    public override activatedRoute: ActivatedRoute,
    public override coreEnumService: CoreEnumService,
    public override publicHelper: PublicHelper,
    public override contentService: NewsContentService,
    public override contentTagService: NewsContentTagService,
    public override contentSimilarService: NewsContentSimilarService,
    public override contentOtherInfoService: NewsContentOtherInfoService,
    public override contentCategoryService: NewsContentCategoryService,
    public override cmsToastrService: CmsToastrService,
    public override router: Router,
    public override translate: TranslateService,
    public override cdr: ChangeDetectorRef,
    public tokenHelper: TokenHelper,
    public cmsStoreService: CmsStoreService,
  ) {
    super(activatedRoute, coreEnumService, publicHelper, contentService, contentTagService, contentSimilarService, contentOtherInfoService, contentCategoryService, cmsToastrService, router, translate, cdr);
    if (data) {
      this.requestId = data.id || 0;
    }
  }

  onActionBackToParent(): void {
    this.onFormCancel();
  }

  override onFormCancel(): void {
    if (this.dialogRef) {
      this.dialogRef.close({ dialogChangedDate: false });
    } else {
      this.router.navigate(["../"], { relativeTo: this.activatedRoute });
    }
  }
}
