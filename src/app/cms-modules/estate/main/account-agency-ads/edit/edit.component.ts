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
  ErrorExceptionResultBase,
  EstateAccountAgencyAdsModel,
  EstateAccountAgencyAdsService,
  EstateAccountAgencyModel,
  ManageUserAccessDataTypesEnum } from "ntk-cms-api";
import { TreeModel } from "ntk-cms-filemanager";
import { EditBaseComponent } from "src/app/core/cmsComponent/editBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

import { FormInfoModel } from "../../../../../core/models/formInfoModel";

@Component({
  selector: "app-estate-account-agency-ads-edit",
  templateUrl: "./edit.component.html",

  standalone: false,
})
export class EstateAccountAgencyAdsEditComponent
  extends EditBaseComponent<
    EstateAccountAgencyAdsService,
    EstateAccountAgencyAdsModel,
    string
  >
  implements OnInit
{
  requestId = "";
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EstateAccountAgencyAdsEditComponent>,
    public coreEnumService: CoreEnumService,
    public estateAccountAgencyAdsService: EstateAccountAgencyAdsService,
    public cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    public tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
    public translate: TranslateService,
  ) {
    super(
      estateAccountAgencyAdsService,
      new EstateAccountAgencyAdsModel(),
      publicHelper,
      translate,
    );

    this.publicHelper.processService.cdr = this.cdr;

    if (data) {
      this.requestId = data.id;
    }
    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;

  selectFileTypeMainImage = ["jpg", "jpeg", "png"];
  fileManagerTree: TreeModel;
  appLanguage = "fa";

  dataModelResult: ErrorExceptionResultBase = new ErrorExceptionResultBase();
  dataModel: EstateAccountAgencyAdsModel = new EstateAccountAgencyAdsModel();


  fileManagerOpenForm = false;

  ngOnInit(): void {
    this.translate.get("TITLE.Edit").subscribe((str: string) => {
      this.formInfo.formTitle = str;
    });
    if (!this.requestId || this.requestId.length === 0) {
      this.cmsToastrService.typeErrorComponentAction();
      this.dialogRef.close({ dialogChangedDate: false });
      return;
    }
    this.DataGetOneContent();
  }

  DataGetOneContent(): void {
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

    this.estateAccountAgencyAdsService.setAccessLoad();
    this.estateAccountAgencyAdsService.setAccessDataType(
      ManageUserAccessDataTypesEnum.Editor,
    );
    this.estateAccountAgencyAdsService
      .ServiceGetOneById(this.requestId)
      .subscribe({
        next: (ret) => {
          this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);

          this.dataModel = ret.item;
          if (ret.isSuccess) {
            this.formInfo.formTitle =
              this.formInfo.formTitle + " " + ret.item.title;
            this.formInfo.submitResultMessage = "";
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

    this.estateAccountAgencyAdsService.ServiceEdit(this.dataModel).subscribe({
      next: (ret) => {
        this.dataModelResult = ret;
        if (ret.isSuccess) {
          this.translate
            .get("MESSAGE.registration_completed_successfully")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
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
  onActionSelectorSelectLinkAccountAgencyId(
    model: EstateAccountAgencyModel | null,
  ): void {
    if (!model || !model.id || model.id.length <= 0) {
      this.translate
        .get("MESSAGE.Property_ID_is_unknown")
        .subscribe((str: string) => {
          this.cmsToastrService.typeErrorSelected(str);
        });
      return;
    }
    this.dataModel.linkAccountAgencyId = model.id;
  }
  onActionSelectorSelectLinkAdsTypeId(
    model: EstateAccountAgencyModel | null,
  ): void {
    if (!model || !model.id || model.id.length <= 0) {
      this.translate
        .get("MESSAGE.Advertisement_ID_is_unknown")
        .subscribe((str: string) => {
          this.cmsToastrService.typeErrorSelected(str);
        });
      return;
    }
    this.dataModel.linkAdsTypeId = model.id;
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
