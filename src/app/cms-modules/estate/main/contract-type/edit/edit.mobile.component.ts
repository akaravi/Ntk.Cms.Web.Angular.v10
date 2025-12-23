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
  EstateContractTypeModel,
  EstateContractTypeService,
  ManageUserAccessDataTypesEnum,
} from "ntk-cms-api";
import { TreeModel } from "ntk-cms-filemanager";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

import { FormInfoModel } from "../../../../../core/models/formInfoModel";
import { FormSubmitedStatusEnum } from "../../../../../core/models/formSubmitedStatusEnum";
import { EstateContractTypeEditBaseComponent } from "./edit.base";

@Component({
  selector: "app-estate-contract-type-edit-mobile",
  templateUrl: "./edit.mobile.component.html",
  styleUrls: ["./edit.mobile.component.scss"],
  standalone: false,
})
export class EstateContractTypeEditMobileComponent
  extends EstateContractTypeEditBaseComponent
  implements OnInit
{
  constructor(
    public coreEnumService: CoreEnumService,
    public estateContractTypeService: EstateContractTypeService,
    cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private router: Router,
    cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
    public translate: TranslateService,
  ) {
    super(
      coreEnumService,
      estateContractTypeService,
      cmsToastrService,
      publicHelper,
      cdr,
      translate,
    );
    if (this.activatedRoute.snapshot.paramMap.get("id")) {
      this.requestId = this.activatedRoute.snapshot.paramMap.get("id");
    }
    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;
  tokenInfo: any;

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
    this.router.navigate(["/estate/main/contract-type"]);
  }
}
