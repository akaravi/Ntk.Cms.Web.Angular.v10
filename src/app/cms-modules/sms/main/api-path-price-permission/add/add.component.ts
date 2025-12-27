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
import {
  CoreSiteCategoryModel,
  CoreSiteModel,
  CoreUserGroupModel,
  CoreUserModel,
  DataFieldInfoModel,
  ErrorExceptionResult,
  InfoEnumModel,
  ManageUserAccessDataTypesEnum,
  SmsEnumService,
  SmsMainApiPathModel,
  SmsMainApiPathPaginationModel,
  SmsMainApiPathPricePermissionModel,
  SmsMainApiPathPricePermissionService,
} from "ntk-cms-api";
import { TreeModel } from "ntk-cms-filemanager";
import { AddBaseComponent } from "src/app/core/cmsComponent/addBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

import { FormInfoModel } from "../../../../../core/models/formInfoModel";
import { FormSubmitedStatusEnum } from "../../../../../core/models/formSubmitedStatusEnum";

@Component({
  selector: "app-sms-apipath-price-permission-add",
  templateUrl: "./add.component.html",

  standalone: false,
})
export class SmsMainApiPathPricePermissionAddComponent
  extends AddBaseComponent<
    SmsMainApiPathPricePermissionService,
    SmsMainApiPathPricePermissionModel,
    string
  >
  implements OnInit
{
  constructorInfoAreaId = this.constructor.name;
  requestId = "";
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SmsMainApiPathPricePermissionAddComponent>,
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
    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
    if (data) {
      if (data.linkApiPathPaginationId?.length > 0)
        this.dataModel.linkApiPathPaginationId = data.linkApiPathPaginationId;
      if (data.id) {
        this.requestId = data.id;
      }
    }
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();

  selectFileTypeMainImage = ["jpg", "jpeg", "png"];

  fileManagerTree: TreeModel;
  appLanguage = "fa";

  dataModelResult: ErrorExceptionResult<SmsMainApiPathPricePermissionModel> =
    new ErrorExceptionResult<SmsMainApiPathPricePermissionModel>();
  dataModel: SmsMainApiPathPricePermissionModel =
    new SmsMainApiPathPricePermissionModel();
  formInfo: FormInfoModel = new FormInfoModel();
  dataModelSmsMessageTypeEnumResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();
  dataModelSmsOutBoxTypeEnumResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();

  fileManagerOpenForm = false;

  ngOnInit(): void {
    this.translate.get("TITLE.ADD").subscribe((str: string) => {
      this.formInfo.formTitle = str;
    });

    if (this.requestId) {
      this.DataGetOneContent();
    } else {
      this.DataGetAccess();
    }
    this.getSmsMessageTypeEnum();
    this.getSmsOutBoxTypeEnum();
  }

  getSmsMessageTypeEnum(): void {
    this.smsEnumService.ServiceSmsMessageTypeEnum().subscribe((res) => {
      this.dataModelSmsMessageTypeEnumResult = res;
    });
  }
  getSmsOutBoxTypeEnum(): void {
    this.smsEnumService.ServiceSmsOutBoxTypeEnum().subscribe((res) => {
      this.dataModelSmsOutBoxTypeEnumResult = res;
    });
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
            this.dataModel.title = this.dataModel.title + " (COPY)";
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

    this.smsMainApiPathPricePermissionService
      .ServiceAdd(this.dataModel)
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
            this.cmsToastrService.typeSuccessAdd();
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

    this.DataAddContent();
  }
  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }
}
