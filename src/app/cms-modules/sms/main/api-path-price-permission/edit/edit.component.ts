import { ENTER } from "@angular/cdk/keycodes";
import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material/chips";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import {
  CoreSiteCategoryModel,
  CoreSiteModel,
  CoreUserGroupModel,
  CoreUserModel,
  ErrorExceptionResult,
  ErrorExceptionResultBase,
  InfoEnumModel,
  ManageUserAccessDataTypesEnum,
  SmsEnumService,
  SmsMainApiPathModel,
  SmsMainApiPathPaginationModel,
  SmsMainApiPathPricePermissionModel,
  SmsMainApiPathPricePermissionService,
} from "ntk-cms-api";
import { TreeModel } from "ntk-cms-filemanager";
import { EditBaseComponent } from "src/app/core/cmsComponent/editBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

import { FormInfoModel } from "../../../../../core/models/formInfoModel";
import { FormSubmitedStatusEnum } from "../../../../../core/models/formSubmitedStatusEnum";

@Component({
  selector: "app-sms-apipath-price-permission-edit",
  templateUrl: "./edit.component.html",

  standalone: false,
})
export class SmsMainApiPathPricePermissionEditComponent
  extends EditBaseComponent<
    SmsMainApiPathPricePermissionService,
    SmsMainApiPathPricePermissionModel,
    string
  >
  implements OnInit
{
  requestId = "";
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SmsMainApiPathPricePermissionEditComponent>,
    public smsEnumService: SmsEnumService,
    public smsMainApiPathPricePermissionService: SmsMainApiPathPricePermissionService,
    private cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
  ) {
    super(
      smsMainApiPathPricePermissionService,
      new SmsMainApiPathPricePermissionModel(),
      publicHelper,
      translate,
    );

    this.publicHelper.processService.cdr = this.cdr;
    if (data && data.id) {
      this.requestId = data.id;
    }

    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;

  selectFileTypeMainImage = ["jpg", "jpeg", "png"];

  fileManagerTree: TreeModel;
  appLanguage = "fa";

  dataModelResult: ErrorExceptionResultBase = new ErrorExceptionResultBase();
  dataModel: SmsMainApiPathPricePermissionModel =
    new SmsMainApiPathPricePermissionModel();

  formInfo: FormInfoModel = new FormInfoModel();

  fileManagerOpenForm = false;
  dataSmsMainApiPathPricePermissionModel: SmsMainApiPathPricePermissionModel[];
  ngOnInit(): void {
    if (this.requestId.length > 0) {
      this.translate.get("TITLE.Edit").subscribe((str: string) => {
        this.formInfo.formTitle = str;
      });
    } else {
      this.cmsToastrService.typeErrorComponentAction();
      this.dialogRef.close({ dialogChangedDate: false });
      return;
    }
    this.DataGetOneContent();


  }


  DataGetOneContent(): void {
    if (this.requestId.length <= 0) {
      this.cmsToastrService.typeErrorEditRowIsNull();
      return;
    }

    this.translate
      .get("MESSAGE.Receiving_Information_From_The_Server")
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

    this.smsMainApiPathPricePermissionService.setAccessLoad();
    this.smsMainApiPathPricePermissionService.setAccessDataType(
      ManageUserAccessDataTypesEnum.Editor,
    );
    this.smsMainApiPathPricePermissionService
      .ServiceGetOneById(this.requestId)
      .subscribe({
        next: (ret) => {
          this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);

          this.dataModel = ret.item;
          if (ret.isSuccess) {
            this.formInfo.formTitle = this.formInfo.formTitle;
            this.formInfo.submitResultMessage = "";
            this.formInfo.submitResultMessageType =
              FormSubmitedStatusEnum.Success;
            this.formInfo.submitResultMessageType =
              FormSubmitedStatusEnum.Success;
            this.formInfo.submitResultMessageType =
              FormSubmitedStatusEnum.Success;
            this.formInfo.submitResultMessageType =
              FormSubmitedStatusEnum.Success;
            this.formInfo.submitResultMessageType =
              FormSubmitedStatusEnum.Success;
            this.formInfo.submitResultMessageType =
              FormSubmitedStatusEnum.Success;
            this.formInfo.submitResultMessageType =
              FormSubmitedStatusEnum.Success;
            this.formInfo.submitResultMessageType =
              FormSubmitedStatusEnum.Success;
            this.formInfo.submitResultMessageType =
              FormSubmitedStatusEnum.Success;
            this.formInfo.submitResultMessageType =
              FormSubmitedStatusEnum.Success;
            this.formInfo.submitResultMessageType =
              FormSubmitedStatusEnum.Success;
            this.formInfo.submitResultMessageType =
              FormSubmitedStatusEnum.Success;
            this.formInfo.submitResultMessageType =
              FormSubmitedStatusEnum.Success;
            this.formInfo.submitResultMessageType =
              FormSubmitedStatusEnum.Success;
            this.formInfo.submitResultMessageType =
              FormSubmitedStatusEnum.Success;
            this.formInfo.submitResultMessageType =
              FormSubmitedStatusEnum.Success;
            this.formInfo.submitResultMessageType =
              FormSubmitedStatusEnum.Success;
            this.formInfo.submitResultMessageType =
              FormSubmitedStatusEnum.Success;
            this.formInfo.submitResultMessageType =
              FormSubmitedStatusEnum.Success;
            this.formInfo.submitResultMessageType =
              FormSubmitedStatusEnum.Success;
            this.formInfo.submitResultMessageType =
              FormSubmitedStatusEnum.Success;
          } else {
            this.translate
              .get("ERRORMESSAGE.MESSAGE.typeError")
              .subscribe((str: string) => {
                this.formInfo.submitResultMessage = str;
              });
            this.formInfo.submitResultMessage = ret.errorMessage;
            this.formInfo.submitResultMessageType =
              FormSubmitedStatusEnum.Error;
            this.cmsToastrService.typeErrorMessage(ret.errorMessage);
          }
          this.publicHelper.processService.processStop(pName);
        },
        error: (er) => {
          this.cmsToastrService.typeError(er);
          this.publicHelper.processService.processStop(pName, false);
        },
      });
  }

  DataEditContent(): void {
    this.translate
      .get("MESSAGE.sending_information_to_the_server")
      .subscribe((str: string) => {
        this.formInfo.submitResultMessage = str;
      });
    this.formInfo.submitResultMessage = "";
    const pName = this.constructor.name + "main";
    this.translate
      .get("MESSAGE.sending_information_to_the_server")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });

    this.smsMainApiPathPricePermissionService
      .ServiceEdit(this.dataModel)
      .subscribe({
        next: (ret) => {
          this.formInfo.submitButtonEnabled = true;
          this.dataModelResult = ret;
          if (ret.isSuccess) {
            this.translate
              .get("MESSAGE.registration_completed_successfully")
              .subscribe((str: string) => {
                this.formInfo.submitResultMessage = str;
                this.formInfo.submitResultMessageType =
                  FormSubmitedStatusEnum.Success;
              });
            this.formInfo.submitResultMessageType =
              FormSubmitedStatusEnum.Success;
            this.cmsToastrService.typeSuccessEdit();
            this.dialogRef.close({ dialogChangedDate: true });
          } else {
            this.translate
              .get("ERRORMESSAGE.MESSAGE.typeError")
              .subscribe((str: string) => {
                this.formInfo.submitResultMessage = str;
              });
            this.formInfo.submitResultMessage = ret.errorMessage;
            this.formInfo.submitResultMessageType =
              FormSubmitedStatusEnum.Error;
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
  onActionSelectorCmsUser(model: CoreUserModel | null): void {
    if (!model || !model.id || model.id <= 0) {
      this.dataModel.linkCoreUserId = null;
      return;
    }
    this.dataModel.linkCoreUserId = model.id;
  }
  onActionSelectorCmsSite(model: CoreSiteModel | null): void {
    if (!model || !model.id || model.id <= 0) {
      this.dataModel.linkCoreSiteId = null;
      return;
    }
    this.dataModel.linkCoreSiteId = model.id;
  }
  onActionSelectorCoreUserGroup(model: CoreUserGroupModel | null): void {
    if (!model || !model.id || model.id <= 0) {
      this.dataModel.linkCoreUserGroupId = null;
      return;
    }
    this.dataModel.linkCoreUserGroupId = model.id;
  }
  onActionSelectorCoreSiteCategory(model: CoreSiteCategoryModel | null): void {
    if (!model || !model.id || model.id <= 0) {
      this.dataModel.linkCoreSiteCategoryId = null;
      return;
    }
    this.dataModel.linkCoreSiteCategoryId = model.id;
  }
  onActionSelectorSelectLinkApiPathPaginationId(model: SmsMainApiPathPaginationModel | null): void {
    if (!model || model.id.length <= 0) {
      const message = "مسیر سرویس دهنده مشخص نیست";
      this.cmsToastrService.typeErrorSelected(message);
      return;
    }
    this.dataModel.linkApiPathPaginationId = model.id;
  }
  onFormSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }
    this.formInfo.submitButtonEnabled = false;
    this.DataEditContent();
  }
  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }

}
