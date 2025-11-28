import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ContactContentModel, ContactContentService } from "ntk-cms-api";
import { ListBaseComponent } from "src/app/core/cmsComponent/listBaseComponent";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { PageInfoService } from "src/app/core/services/page-info.service";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";
import { PublicHelper } from "../../../../core/helpers/publicHelper";
import { CmsToastrService } from "../../../../core/services/cmsToastr.service";

@Component({
  selector: "app-contact-content-import",
  templateUrl: "./import.component.html",
  standalone: false,
})
export class ContactContentImportComponent
  extends ListBaseComponent<ContactContentService, ContactContentModel, string>
  implements OnInit, OnDestroy
{
  requestLinkCategoryId = "";
  constructorInfoAreaId = this.constructor.name;
  constructor(
    public contentService: ContactContentService,
    private cmsToastrService: CmsToastrService,
    private cmsConfirmationDialogService: CmsConfirmationDialogService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public tokenHelper: TokenHelper,
    private cdr: ChangeDetectorRef,
    private cmsStoreService: CmsStoreService,
    public translate: TranslateService,
    public pageInfo: PageInfoService,
    public publicHelper: PublicHelper,
    public dialog: MatDialog,
  ) {
    super(
      contentService,
      new ContactContentModel(),
      publicHelper,
      tokenHelper,
      translate,
    );
  }

  ngOnInit(): void {
    //throw new Error("Method not implemented.");
  }
  ngOnDestroy(): void {
    //throw new Error("Method not implemented.");
  }
}
