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
  SmsMainApiPathPaginationService,
} from "ntk-cms-api";
import { TreeModel } from "ntk-cms-filemanager";
import { EditBaseComponent } from "src/app/core/cmsComponent/editBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

import { FormInfoModel } from "../../../../../core/models/formInfoModel";
import { FormSubmitedStatusEnum } from "../../../../../core/models/formSubmitedStatusEnum";

@Component({
  selector: "app-sms-apipath-pagination-edit",
  templateUrl: "./edit.component.html",

  standalone: false,
})
export class SmsMainApiPathPaginationEditComponent
  extends EditBaseComponent<
    SmsMainApiPathPaginationService,
    SmsMainApiPathPaginationModel,
    string
  >
  implements OnInit
{
  requestId = "";
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SmsMainApiPathPaginationEditComponent>,
    public smsEnumService: SmsEnumService,
    public smsMainApiPathPaginationService: SmsMainApiPathPaginationService,
    private cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
  ) {
    super(
      smsMainApiPathPaginationService,
      new SmsMainApiPathPaginationModel(),
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
  dataModel: SmsMainApiPathPaginationModel =
    new SmsMainApiPathPaginationModel();

  formInfo: FormInfoModel = new FormInfoModel();

  dataModelSmsMessageTypeEnumResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();
  dataModelSmsOutBoxTypeEnumResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();

  fileManagerOpenForm = false;
  dataSmsMainApiPathPaginationModel: SmsMainApiPathPaginationModel[];
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

    this.smsMainApiPathPaginationService.setAccessLoad();
    this.smsMainApiPathPaginationService.setAccessDataType(
      ManageUserAccessDataTypesEnum.Editor,
    );
    this.smsMainApiPathPaginationService
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

    this.smsMainApiPathPaginationService.ServiceEdit(this.dataModel).subscribe({
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

  onActionSelectorSelectLinkApiPathId(model: SmsMainApiPathModel | null): void {
    if (!model || model.id.length <= 0) {
      const message = "مسیر سرویس دهنده مشخص نیست";
      this.cmsToastrService.typeErrorSelected(message);
      return;
    }
    this.dataModel.linkApiPathId = model.id;
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
  /**
   * tag
   */
  addOnBlurTag = true;
  readonly separatorKeysCodes = [ENTER] as const;
  addTagRegulatorNumberList(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();
    // Add our item
    if (!this.dataModel.regulatorNumberList)
      this.dataModel.regulatorNumberList = [];
    if (value) {
      this.dataModel.regulatorNumberList.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();
  }
  removeTagRegulatorNumberList(item: string): void {
    const index = this.dataModel.regulatorNumberList.indexOf(item);

    if (index >= 0) {
      this.dataModel.regulatorNumberList.splice(index, 1);
    }
  }
  /** */
  addTagServicePagination(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();
    // Add our item
    if (!this.dataModel.serviceMessageLengthPaginationList)
      this.dataModel.serviceMessageLengthPaginationList = [];

    var valueNum: number = +value || -1;
    if (valueNum >= 0) {
      this.dataModel.serviceMessageLengthPaginationList.push(valueNum);
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  removeTagServicePagination(item: number): void {
    const index =
      this.dataModel.serviceMessageLengthPaginationList.indexOf(item);

    if (index >= 0) {
      this.dataModel.serviceMessageLengthPaginationList.splice(index, 1);
    }
  }
  /** */
  addTagEndUserPagination(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();
    // Add our item
    if (!this.dataModel.endUserMessageLengthPaginationList)
      this.dataModel.endUserMessageLengthPaginationList = [];

    var valueNum: number = +value || -1;
    if (valueNum >= 0) {
      this.dataModel.endUserMessageLengthPaginationList.push(valueNum);
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  removeTagEndUserPagination(item: number): void {
    const index =
      this.dataModel.endUserMessageLengthPaginationList.indexOf(item);

    if (index >= 0) {
      this.dataModel.endUserMessageLengthPaginationList.splice(index, 1);
    }
  }
  /**
   * tag
   */
}
