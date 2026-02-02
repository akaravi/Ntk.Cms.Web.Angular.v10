import { ChangeDetectorRef, Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
  CoreEnumService,
  NewsContentService,
} from "ntk-cms-api";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
import { NewsContentViewComponent } from "./view.component";

@Component({
  selector: "app-news-content-view-mobile",
  templateUrl: "./view.mobile.component.html",
  standalone: false,
})
export class NewsContentViewMobileComponent extends NewsContentViewComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public override data: any,
    public override dialogRef: MatDialogRef<NewsContentViewComponent>,
    public override coreEnumService: CoreEnumService,
    public override contentService: NewsContentService,
    public override cmsToastrService: CmsToastrService,
    public override tokenHelper: TokenHelper,
    public override cmsStoreService: CmsStoreService,
    public override cdr: ChangeDetectorRef,
    public override publicHelper: PublicHelper,
    public override translate: TranslateService,
    private router: Router,
  ) {
    super(data, dialogRef, coreEnumService, contentService, cmsToastrService, tokenHelper, cmsStoreService, cdr, publicHelper, translate);
  }

  onActionBackToParent(): void {
    this.onFormCancel();
  }
}
