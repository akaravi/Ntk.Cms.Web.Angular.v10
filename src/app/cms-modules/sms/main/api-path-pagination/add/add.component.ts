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
  DataFieldInfoModel,
  ErrorExceptionResult,
  InfoEnumModel,
  ManageUserAccessDataTypesEnum,
  SmsEnumService,
  SmsMainApiPathModel,
  SmsMainApiPathPaginationModel,
  SmsMainApiPathPaginationService,
} from "ntk-cms-api";
import { TreeModel } from "ntk-cms-filemanager";
import { AddBaseComponent } from "src/app/core/cmsComponent/addBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

import { FormInfoModel } from "../../../../../core/models/formInfoModel";
import { FormSubmitedStatusEnum } from "../../../../../core/models/formSubmitedStatusEnum";

@Component({
  selector: "app-sms-apipath-pagination-add",
  templateUrl: "./add.component.html",

  standalone: false,
})
export class SmsMainApiPathPaginationAddComponent
  extends AddBaseComponent<
    SmsMainApiPathPaginationService,
    SmsMainApiPathPaginationModel,
    string
  >
  implements OnInit
{
  constructorInfoAreaId = this.constructor.name;
  requestId = "";
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SmsMainApiPathPaginationAddComponent>,
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
    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
    if (data) {
      if (data.linkApiPathId?.length > 0)
        this.dataModel.linkApiPathId = data.linkApiPathId;
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

  dataModelResult: ErrorExceptionResult<SmsMainApiPathPaginationModel> =
    new ErrorExceptionResult<SmsMainApiPathPaginationModel>();
  dataModel: SmsMainApiPathPaginationModel =
    new SmsMainApiPathPaginationModel();
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

    this.smsMainApiPathPaginationService.ServiceAdd(this.dataModel).subscribe({
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

    this.DataAddContent();
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
    if (!this.dataModel.regulatorNumberList)
      this.dataModel.regulatorNumberList = [];
    // Add our item
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
    var valueNum: number = +value || -1;
    if (!this.dataModel.serviceMessageLengthPaginationList)
      this.dataModel.serviceMessageLengthPaginationList = [];

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
