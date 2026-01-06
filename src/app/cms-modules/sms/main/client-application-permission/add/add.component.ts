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
  DataFieldInfoModel,
  ErrorExceptionResult,
  SmsMainApiPathModel,
  SmsMainClientApplicationModel,
  SmsMainClientApplicationPermissionModel,
  SmsMainClientApplicationPermissionService,
} from "ntk-cms-api";
import { TreeModel } from "ntk-cms-filemanager";
import { AddBaseComponent } from "src/app/core/cmsComponent/addBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

import { FormInfoModel } from "src/app/core/models/formInfoModel";

@Component({
  selector: "app-sms-client-application-permission-add",
  templateUrl: "./add.component.html",
  standalone: false,
})
export class SmsMainClientApplicationPermissionAddComponent
  extends AddBaseComponent<
    SmsMainClientApplicationPermissionService,
    SmsMainClientApplicationPermissionModel,
    string
  >
  implements OnInit
{
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SmsMainClientApplicationPermissionAddComponent>,
    public smsMainClientApplicationPermissionService: SmsMainClientApplicationPermissionService,
    private cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
  ) {
    super(
      smsMainClientApplicationPermissionService,
      new SmsMainClientApplicationPermissionModel(),
      publicHelper,
      translate,
    );
    this.publicHelper.processService.cdr = this.cdr;
    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
    if (data) {
      if (data.LinkClientApplicationId) {
        this.dataModel.linkClientApplicationId = data.LinkClientApplicationId;
      }
      if (data.LinkApiPathId) {
        this.dataModel.linkApiPathId = data.LinkApiPathId;
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

  dataModelResult: ErrorExceptionResult<SmsMainClientApplicationPermissionModel> =
    new ErrorExceptionResult<SmsMainClientApplicationPermissionModel>();
  dataModel: SmsMainClientApplicationPermissionModel =
    new SmsMainClientApplicationPermissionModel();

  fileManagerOpenForm = false;

  ngOnInit(): void {
    this.translate.get("TITLE.ADD").subscribe((str: string) => {
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

    this.smsMainClientApplicationPermissionService
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
                  this.formSubmitedStatusEnum.Success;
              });
            this.formInfo.submitResultMessageType =
              this.formSubmitedStatusEnum.Success;
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
              this.formSubmitedStatusEnum.Error;
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
  onActionSelectorClientApplication(
    model: SmsMainClientApplicationModel | null,
  ): void {
    if (!model || !model.id || model.id.length == 0) {
      this.dataModel.linkClientApplicationId = null;
      return;
    }
    this.dataModel.linkClientApplicationId = model.id;
  }
  onActionSelectorApiPath(
    model: SmsMainApiPathModel | null,
  ): void {
    if (!model || !model.id || model.id.length == 0) {
      this.dataModel.linkApiPathId = null;
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
}

