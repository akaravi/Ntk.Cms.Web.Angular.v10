import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
  CoreEnumService,
  ErrorExceptionResultBase,
  EstatePropertyTypeUsageModel,
  EstatePropertyTypeUsageService,
  ManageUserAccessDataTypesEnum,
  TokenInfoModelV3,
} from "ntk-cms-api";
import { NodeInterface, TreeModel } from "ntk-cms-filemanager";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

import { FormInfoModel } from "../../../../../core/models/formInfoModel";
import { FormSubmitedStatusEnum } from "../../../../../core/models/formSubmitedStatusEnum";
import { EstatePropertyTypeUsageEditBaseComponent } from "./edit.base";

@Component({
  selector: "app-estate-property-type-usage-edit-mobile",
  templateUrl: "./edit.mobile.component.html",
  styleUrls: ["./edit.mobile.component.scss"],
  standalone: false,
})
export class EstatePropertyTypeUsageEditMobileComponent
  extends EstatePropertyTypeUsageEditBaseComponent
  implements OnInit
{
  constructor(
    public coreEnumService: CoreEnumService,
    public estatePropertyTypeUsageService: EstatePropertyTypeUsageService,
    cmsToastrService: CmsToastrService,
    private cmsStoreService: CmsStoreService,
    public publicHelper: PublicHelper,
    private router: Router,
    cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    public tokenHelper: TokenHelper,
    public translate: TranslateService,
  ) {
    super(
      coreEnumService,
      estatePropertyTypeUsageService,
      cmsToastrService,
      publicHelper,
      cdr,
      translate,
    );

    if (this.activatedRoute.snapshot.paramMap.get("id")) {
      this.requestId = this.activatedRoute.snapshot.paramMap.get("id");
    }
    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;
  tokenInfo = new TokenInfoModelV3();

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
  onIconPickerSelect(model: any): void {
    this.dataModel.iconFont = model;
  }
  onFormSubmit(): void {
    this.onFormSubmitInternal(() => {
      this.onActionBackToParent();
    });
  }
  onActionBackToParent(): void {
    this.router.navigate(["/estate/main/property-type-usage"]);
  }
}
