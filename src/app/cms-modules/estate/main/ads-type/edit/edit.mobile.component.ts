import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { CoreEnumService, EstateAdsTypeService } from "ntk-cms-api";
import { NodeInterface } from "ntk-cms-filemanager";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

import { EstateAdsTypeEditBaseComponent } from "./edit.base";

@Component({
  selector: "app-estate-ads-type-edit-mobile",
  templateUrl: "./edit.mobile.component.html",
  styleUrls: ["./edit.mobile.component.scss"],
  standalone: false,
})
export class EstateAdsTypeEditMobileComponent
  extends EstateAdsTypeEditBaseComponent
  implements OnInit
{
  constructor(
    public coreEnumService: CoreEnumService,
    public estateAdsTypeService: EstateAdsTypeService,
    cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private router: Router,
    cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
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
    if (this.activatedRoute.snapshot.paramMap.get("id")) {
      this.requestId = this.activatedRoute.snapshot.paramMap.get("id");
    }
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;

  ngOnInit(): void {
    this.translate.get("TITLE.Edit").subscribe((str: string) => {
      this.formInfo.formTitle = str;
    });
    if (
      !this.validateRequestId(() => {
        this.onActionBackToParent();
      })
    ) {
      return;
    }
    this.loadItem();
  }

  onActionFileSelected(model: NodeInterface): void {
    this.dataModel.linkMainImageId = model.id;
    this.dataModel.linkMainImageIdSrc = model.downloadLinksrc;
  }

  DataGetOneContent(): void {
    // برای سازگاری با template قدیمی، متد نگه داشته شده اما منطق در کلاس پایه است
    this.loadItem();
  }

  DataEditContent(): void {
    // برای سازگاری با template قدیمی، متد نگه داشته شده اما منطق در کلاس پایه است
    this.saveItem(() => {
      this.onActionBackToParent();
    });
  }

  onFormSubmit(): void {
    this.onFormSubmitInternal(() => {
      this.onActionBackToParent();
    });
  }
  onActionBackToParent(): void {
    this.router.navigate(["/estate/main/ads-type"]);
  }
}
