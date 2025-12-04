import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import {CoreEnumService,
  DataFieldInfoModel,
  ErrorExceptionResult,HyperShopCategoryModel,
  HyperShopContentModel,
  HyperShopContentService} from "ntk-cms-api";
import { TreeModel } from "ntk-cms-filemanager";
import { AddBaseComponent } from "src/app/core/cmsComponent/addBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsFormsErrorStateMatcher } from "src/app/core/pipe/cmsFormsErrorStateMatcher";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

import { FormInfoModel } from "../../../../core/models/formInfoModel";
import { FormSubmitedStatusEnum } from "../../../../core/models/formSubmitedStatusEnum";

@Component({
  selector: "app-ticketing-faq-add",
  templateUrl: "./add.component.html",

  standalone: false,
})
export class HyperShopContentAddComponent
  extends AddBaseComponent<
    HyperShopContentService,
    HyperShopContentModel,
    string
  >
  implements OnInit
{
  requestParentId = "";
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<HyperShopContentAddComponent>,
    public coreEnumService: CoreEnumService,
    public hyperShopContentService: HyperShopContentService,
    private cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
  ) {
    super(
      hyperShopContentService,
      new HyperShopContentModel(),
      publicHelper,
      translate,
    );
    this.publicHelper.processService.cdr = this.cdr;
    if (data) {
      this.requestParentId = data.parentId + "";
    }
    if (this.requestParentId.length > 0) {
      this.dataModel.categoryCode = this.requestParentId;
    }
    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();

  selectFileTypeMainImage = ["jpg", "jpeg", "png"];
  fileManagerTree: TreeModel;
  appLanguage = "fa";
  formMatcher = new CmsFormsErrorStateMatcher();
  dataModelResult: ErrorExceptionResult<HyperShopContentModel> =
    new ErrorExceptionResult<HyperShopContentModel>();
  dataModel: HyperShopContentModel = new HyperShopContentModel();
  dataFileModel = new Map<number, string>();
  formInfo: FormInfoModel = new FormInfoModel();

  fileManagerOpenForm = false;

  ngOnInit(): void {
    this.translate.get("TITLE.Submit_New_Content").subscribe((str: string) => {
      this.formInfo.formTitle = str;
    });

    this.DataGetAccess();
  }

  DataAddContent(): void {
    this.translate
      .get("MESSAGE.sending_information_to_the_server")
      .subscribe((str: string) => {
        this.formInfo.submitResultMessage = str;
      });
    this.formInfo.submitResultMessage = "";
    const pName = this.constructor.name + "main";
    this.translate
      .get("MESSAGE.Receiving_information")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });

    this.hyperShopContentService.ServiceAdd(this.dataModel).subscribe({
      next: (ret) => {
        this.formInfo.submitButtonEnabled = true;
        this.dataModelResult = ret;
        if (ret.isSuccess) {
          this.translate
            .get("MESSAGE.registration_completed_successfully")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
            });
          this.cmsToastrService.typeSuccessAdd();
          this.dialogRef.close({ dialogChangedDate: true });
        } else {
          this.translate
            .get("ERRORMESSAGE.MESSAGE.typeError")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
            });
          this.formInfo.submitResultMessage = ret.errorMessage;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Error;
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.publicHelper.processService.processStop(pName);
      },
      error: (er) => {
        this.formInfo.submitButtonEnabled = true;
        this.cmsToastrService.typeError(er);
        this.publicHelper.processService.processStop(pName, false);
      },
    });
  }
  onActionSelectorSelect(model: HyperShopCategoryModel | null): void {
    if (!model || !model.code || model.code.length <= 0) {
      this.translate
        .get("MESSAGE.category_of_information_is_not_clear")
        .subscribe((str: string) => {
          this.cmsToastrService.typeErrorSelected(str);
        });
      return;
    }
    this.dataModel.categoryCode = model.code;
  }
  onFormSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }
    this.formInfo.submitButtonEnabled = false;

    this.DataAddContent();
  }
  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }
}
