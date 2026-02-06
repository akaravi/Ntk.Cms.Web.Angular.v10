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
  DataProviderClientApplicationModel,
  DataProviderClientApplicationPermissionModel,
  DataProviderClientApplicationPermissionService,
  DataProviderSourcePathModel,
  ErrorExceptionResultBase,
  ManageUserAccessDataTypesEnum,
} from "ntk-cms-api";
import { TreeModel } from "ntk-cms-filemanager";
import { EditBaseComponent } from "src/app/core/cmsComponent/editBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
import { DatapickerHeaderComponent } from "src/app/shared/datapicker-header/datapicker-header.component";

import { FormInfoModel } from "src/app/core/models/formInfoModel";

@Component({
  selector: "app-data-provider-client-application-permission-edit",
  templateUrl: "./edit.component.html",
  standalone: false,
})
export class DataProviderClientApplicationPermissionEditComponent
  extends EditBaseComponent<
    DataProviderClientApplicationPermissionService,
    DataProviderClientApplicationPermissionModel,
    string
  >
  implements OnInit
{
  requestId = "";
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DataProviderClientApplicationPermissionEditComponent>,
    public dataProviderClientApplicationPermissionService: DataProviderClientApplicationPermissionService,
    private cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
  ) {
    super(
      dataProviderClientApplicationPermissionService,
      new DataProviderClientApplicationPermissionModel(),
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
  dataModel: DataProviderClientApplicationPermissionModel =
    new DataProviderClientApplicationPermissionModel();

  fileManagerOpenForm = false;
  datapickerHeader = DatapickerHeaderComponent;
  dataDataProviderClientApplicationPermissionModel: DataProviderClientApplicationPermissionModel[];
  ngOnInit(): void {
    if (this.requestId && this.requestId.length > 0) {
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
    if (!this.requestId || this.requestId.length === 0) {
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

    this.dataProviderClientApplicationPermissionService.setAccessLoad();
    this.dataProviderClientApplicationPermissionService.setAccessDataType(
      ManageUserAccessDataTypesEnum.Editor,
    );
    this.dataProviderClientApplicationPermissionService
      .ServiceGetOneById(this.requestId)
      .subscribe({
        next: (ret) => {
          this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);

          this.dataModel = ret.item;
          if (ret.isSuccess) {
            this.formInfo.formTitle = this.formInfo.formTitle;
            this.formInfo.submitResultMessage = "";
            this.formInfo.submitResultMessageType =
              this.formSubmitedStatusEnum.Success;
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

    this.dataProviderClientApplicationPermissionService
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
                  this.formSubmitedStatusEnum.Success;
              });
            this.formInfo.submitResultMessageType =
              this.formSubmitedStatusEnum.Success;
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
    model: DataProviderClientApplicationModel | null,
  ): void {
    if (!model || !model.id || model.id.length == 0) {
      this.dataModel.linkClientApplicationId = null;
      return;
    }
    this.dataModel.linkClientApplicationId = model.id;
  }
  onActionSelectorSourcePath(
    model: DataProviderSourcePathModel | null,
  ): void {
    if (!model || !model.id || model.id.length == 0) {
      this.dataModel.linkSourcePathId = null;
      return;
    }
    this.dataModel.linkSourcePathId = model.id;
  }

  // Toggle isApproved checkbox (three-state: null -> true -> false -> null)
  onToggleIsApproved(): void {
    if (this.dataModel.isApproved === null) {
      this.dataModel.isApproved = true;
    } else if (this.dataModel.isApproved === true) {
      this.dataModel.isApproved = false;
    } else {
      this.dataModel.isApproved = null;
    }
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
