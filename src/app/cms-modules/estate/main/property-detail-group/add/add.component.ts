import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import {
  CoreEnumService,
  DataFieldInfoModel,
  ErrorExceptionResult,
  EstatePropertyDetailGroupModel,
  EstatePropertyDetailGroupService,
  EstatePropertyTypeLanduseModel } from "ntk-cms-api";
import { TreeModel } from "ntk-cms-filemanager";
import { AddBaseComponent } from "src/app/core/cmsComponent/addBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

import { FormInfoModel } from "../../../../../core/models/formInfoModel";

@Component({
  selector: "app-estate-property-detail-group-add",
  templateUrl: "./add.component.html",

  standalone: false,
})
export class EstatePropertyDetailGroupAddComponent
  extends AddBaseComponent<
    EstatePropertyDetailGroupService,
    EstatePropertyDetailGroupModel,
    string
  >
  implements OnInit
{
  requestLinkPropertyTypeLanduseId = "";
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EstatePropertyDetailGroupAddComponent>,
    public coreEnumService: CoreEnumService,
    public estatePropertyDetailGroupService: EstatePropertyDetailGroupService,
    public cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
  ) {
    super(
      estatePropertyDetailGroupService,
      new EstatePropertyDetailGroupModel(),
      publicHelper,
      translate,
    );
    this.publicHelper.processService.cdr = this.cdr;
    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
    if (data) {
      this.requestLinkPropertyTypeLanduseId = data.linkPropertyTypeLanduseId;
    }
    if (this.requestLinkPropertyTypeLanduseId.length > 0) {
      this.dataModel.linkPropertyTypeLanduseId =
        this.requestLinkPropertyTypeLanduseId;
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
  dataModelResult: ErrorExceptionResult<EstatePropertyDetailGroupModel> =
    new ErrorExceptionResult<EstatePropertyDetailGroupModel>();
  dataModel: EstatePropertyDetailGroupModel =
    new EstatePropertyDetailGroupModel();

  fileManagerOpenForm = false;

  ngOnInit(): void {
    this.translate.get("TITLE.ADD").subscribe((str: string) => {
      this.formInfo.formTitle = str;
    });

    this.DataGetAccess();
  }

  DataAddContent(): void {
    //! for convert color to hex
    this.dataModel.iconColor = this.dataModel.iconColor?.toString();
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

    this.estatePropertyDetailGroupService.ServiceAdd(this.dataModel).subscribe({
      next: (ret) => {
        this.dataModelResult = ret;
        if (ret.isSuccess) {
          this.translate
            .get("MESSAGE.registration_completed_successfully")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
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
          this.formInfo.submitResultMessageType = this.formSubmitedStatusEnum.Error;
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.publicHelper.processService.processStop(pName);

        this.formInfo.submitButtonEnabled = true;
      },
      error: (er) => {
        this.formInfo.submitButtonEnabled = true;
        this.cmsToastrService.typeError(er);
        this.publicHelper.processService.processStop(pName, false);
      },
    });
  }
  onActionSelectorSelect(model: EstatePropertyTypeLanduseModel | null): void {
    if (!model || !model.id || model.id.length <= 0) {
      this.translate
        .get("MESSAGE.category_of_information_is_not_clear")
        .subscribe((str: string) => {
          this.cmsToastrService.typeErrorSelected(str);
        });
      return;
    }
    this.dataModel.linkPropertyTypeLanduseId = model.id;
  }
  onIconPickerSelect(model: any): void {
    this.dataModel.iconFont = model;
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
