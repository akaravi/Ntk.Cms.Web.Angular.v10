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
  EstateCategoryRackModel,
  EstateCategoryRackService,
  ManageUserAccessDataTypesEnum,
} from "ntk-cms-api";
import { NodeInterface, TreeModel } from "ntk-cms-filemanager";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

import { FormInfoModel } from "../../../../core/models/formInfoModel";
import { FormSubmitedStatusEnum } from "../../../../core/models/formSubmitedStatusEnum";
import { EstateCategoryRackEditBaseComponent } from "./edit.base";

@Component({
  selector: "app-estate-category-rack-edit-mobile",
  templateUrl: "./edit.mobile.component.html",
  styleUrls: ["./edit.mobile.component.scss"],
  standalone: false,
})
export class EstateCategoryRackEditMobileComponent
  extends EstateCategoryRackEditBaseComponent
  implements OnInit
{
  constructor(
    public coreEnumService: CoreEnumService,
    public estateCategoryRackService: EstateCategoryRackService,
    cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private router: Router,
    cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    public translate: TranslateService,
  ) {
    super(
      coreEnumService,
      estateCategoryRackService,
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

  selectFileTypeMainImage = ["jpg", "jpeg", "png"];
  fileManagerTree: TreeModel;
  appLanguage = "fa";

  dataModelResult: ErrorExceptionResultBase = new ErrorExceptionResultBase();
  dataModel: EstateCategoryRackModel = new EstateCategoryRackModel();
  formInfo: FormInfoModel = new FormInfoModel();

  fileManagerOpenForm = false;

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
    this.router.navigate(["/estate/main/category-rack"]);
  }
}
