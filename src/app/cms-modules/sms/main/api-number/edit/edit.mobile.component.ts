import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
  ErrorExceptionResult,
  ErrorExceptionResultBase,
  FilterDataModel,
  FilterModel,
  InfoEnumModel,
  ManageUserAccessDataTypesEnum,
  SmsEnumService,
  SmsMainApiNumberModel,
  SmsMainApiNumberService,
  SmsMainApiPathAndApiNumberModel,
  SmsMainApiPathAndApiNumberService,
  SmsMainApiPathModel,
} from "ntk-cms-api";
import { TreeModel } from "ntk-cms-filemanager";
import { EditBaseComponent } from "src/app/core/cmsComponent/editBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

import { FormInfoModel } from "../../../../../core/models/formInfoModel";
import { FormSubmitedStatusEnum } from "../../../../../core/models/formSubmitedStatusEnum";

@Component({
  selector: "app-sms-api-number-edit-mobile",
  templateUrl: "./edit.mobile.component.html",
  styleUrls: ["./edit.mobile.component.scss"],
  standalone: false,
})
export class SmsMainApiNumberEditMobileComponent
  extends EditBaseComponent<
    SmsMainApiNumberService,
    SmsMainApiNumberModel,
    string
  >
  implements OnInit
{
  requestId = "";
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SmsMainApiNumberEditMobileComponent>,
    public smsEnumService: SmsEnumService,
    public smsMainApiNumberService: SmsMainApiNumberService,
    public smsMainApiPathAndApiNumberService: SmsMainApiPathAndApiNumberService,
    private cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    private router: Router,
    public translate: TranslateService,
  ) {
    super(
      smsMainApiNumberService,
      new SmsMainApiNumberModel(),
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
  dataModel: SmsMainApiNumberModel = new SmsMainApiNumberModel();

  formInfo: FormInfoModel = new FormInfoModel();

  dataModelEnumApiNumberAccessStatusResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();
  dataModelEnumApiNumberActionResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();

  fileManagerOpenForm = false;
  dataSmsMainApiNumberModel: SmsMainApiNumberModel[];

  dataCoreCpMainMenuModel: SmsMainApiPathModel[];
  dataCoreCpMainMenuIds: string[] = [];
  dataCoreCpMainMenuCmsUserGroupModel: SmsMainApiPathAndApiNumberModel[];

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

    this.smsMainApiNumberService.setAccessLoad();
    this.smsMainApiNumberService.setAccessDataType(
      ManageUserAccessDataTypesEnum.Editor,
    );
    this.smsMainApiNumberService.ServiceGetOneById(this.requestId).subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);

        this.dataModel = ret.item;
        if (ret.isSuccess) {
          this.DataGetAllMenuCoreUserGroup();
          this.formInfo.formTitle = this.formInfo.formTitle;
          this.formInfo.submitResultMessage = "";
          this.formInfo.submitResultMessageType =
            FormSubmitedStatusEnum.Success;
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
        this.cmsToastrService.typeError(er);
        this.publicHelper.processService.processStop(pName, false);
      },
    });
  }
  DataGetAllMenuCoreUserGroup(): void {
    if (this.requestId.length <= 0) {
      this.cmsToastrService.typeErrorEditRowIsNull();
      return;
    }

    const filteModelContent = new FilterModel();

    const filter = new FilterDataModel();
    filter.propertyName = "LinkApiNumberId";
    filter.value = this.requestId;
    filteModelContent.filters.push(filter);

    this.smsMainApiPathAndApiNumberService
      .ServiceGetAll(filteModelContent)
      .subscribe({
        next: (ret) => {
          this.dataCoreCpMainMenuCmsUserGroupModel = ret.listItems;
          const listG: string[] = [];
          this.dataCoreCpMainMenuCmsUserGroupModel.forEach((element) => {
            listG.push(element.linkApiPathId);
          });
          this.dataCoreCpMainMenuIds = listG;
        },
        error: (er) => {
          this.cmsToastrService.typeError(er);
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

    this.smsMainApiNumberService.ServiceEdit(this.dataModel).subscribe({
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

  onActionBackToParent(): void {
    this.dialogRef.close({ dialogChangedDate: false });
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

  onActionSelectorUserCategorySelect(model: SmsMainApiPathModel[]): void {
    this.dataCoreCpMainMenuModel = model;
  }
  onActionSelectorUserCategorySelectAdded(model: SmsMainApiPathModel): void {
    const entity = new SmsMainApiPathAndApiNumberModel();
    entity.linkApiPathId = model.id;
    entity.linkApiNumberId = this.dataModel.id;

    this.smsMainApiPathAndApiNumberService.ServiceAdd(entity).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.translate
            .get("MESSAGE.registration_in_this_group_was_successful")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
              this.formInfo.submitResultMessageType =
                FormSubmitedStatusEnum.Success;
            });
          this.cmsToastrService.typeSuccessEdit();
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
      },
      error: (er) => {
        this.formInfo.submitButtonEnabled = true;
        this.cmsToastrService.typeError(er);
      },
    });
  }
  onActionSelectorUserCategorySelectRemoved(
    model: SmsMainApiPathModel,
  ): void {
    const entity = new SmsMainApiPathAndApiNumberModel();
    entity.linkApiPathId = model.id;
    entity.linkApiNumberId = this.dataModel.id;

    this.smsMainApiPathAndApiNumberService
      .ServiceDeleteEntity(entity)
      .subscribe({
        next: (ret) => {
          if (ret.isSuccess) {
            this.translate
              .get("MESSAGE.Deletion_from_this_group_Was_Successful")
              .subscribe((str: string) => {
                this.formInfo.submitResultMessage = str;
              });
            this.cmsToastrService.typeSuccessEdit();
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
        },
        error: (er) => {
          this.formInfo.submitButtonEnabled = true;
          this.cmsToastrService.typeError(er);
        },
      });
  }
}
