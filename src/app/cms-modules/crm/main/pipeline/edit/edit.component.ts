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
  CrmPipelineModel,
  CrmPipelineService,
  TokenInfoModelV3 } from "ntk-cms-api";
import { EditBaseComponent } from "src/app/core/cmsComponent/editBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

import { FormInfoModel } from "../../../../../core/models/formInfoModel";

/**
 * Component ویرایش Pipeline در CRM.
 * این component فرم ویرایش Pipeline موجود را نمایش می‌دهد.
 */
@Component({
  selector: "app-crm-pipeline-edit",
  templateUrl: "./edit.component.html",
  standalone: false,
})
export class CrmPipelineEditComponent
  extends EditBaseComponent<CrmPipelineService, CrmPipelineModel, string>
  implements OnInit
{
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CrmPipelineEditComponent>,
    public coreEnumService: CoreEnumService,
    public crmPipelineService: CrmPipelineService,
    public cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    private cmsStoreService: CmsStoreService,
    public tokenHelper: TokenHelper,
    public translate: TranslateService,
  ) {
    super(crmPipelineService, new CrmPipelineModel(), publicHelper, translate);
    this.publicHelper.processService.cdr = this.cdr;
    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;
    if (data && data.id && data.id.length > 0) {
      this.requestId = data.id;
    }
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();

  appLanguage = "fa";
  tokenInfo = new TokenInfoModelV3();
  dataModelResult: ErrorExceptionResult<CrmPipelineModel> =
    new ErrorExceptionResult<CrmPipelineModel>();
  dataModel: CrmPipelineModel = new CrmPipelineModel();

  requestId = "";

  ngOnInit(): void {
    if (this.requestId.length > 0) {
      this.DataGetOneContent();
    } else {
      this.cmsToastrService.typeErrorEditRowIsNull();
    }
  }

  DataGetOneContent(): void {
    this.translate.get("MESSAGE.Receiving_information").subscribe((str: string) => {
      this.formInfo.formTitle = str;
    });
    if (!this.requestId || this.requestId.length === 0) {
      this.cmsToastrService.typeErrorEditRowIsNull();
      return;
    }
    this.formInfo.submitButtonEnabled = false;
    const pName = this.constructor.name + "main";
    this.publicHelper.processService.processStart(
      pName,
      "",
      this.constructorInfoAreaId,
    );

    this.crmPipelineService.ServiceGetOneById(this.requestId).subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
        this.dataModelResult = ret as ErrorExceptionResult<CrmPipelineModel>;
        if (!ret.isSuccess) {
          this.formInfo.submitButtonEnabled = true;
          this.cmsToastrService.typeErrorEdit(ret.errorMessage);
        } else {
          this.dataModel = ret.item;
          if (ret.item) {
            this.formInfo.formTitle =
              this.formInfo.formTitle + " " + ret.item.name;
          }
          this.formInfo.submitButtonEnabled = true;
        }
        this.formInfo.submitButtonEnabled = true;
        this.publicHelper.processService.processStop(pName);
      },
      error: (er) => {
        this.formInfo.submitButtonEnabled = true;
        this.cmsToastrService.typeError(er);
        this.formInfo.submitButtonEnabled = true;
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
    this.publicHelper.processService.processStart(
      pName,
      "",
      this.constructorInfoAreaId,
    );

    this.crmPipelineService.ServiceEdit(this.dataModel).subscribe({
      next: (ret) => {
        this.dataModelResult = ret as ErrorExceptionResult<CrmPipelineModel>;
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
