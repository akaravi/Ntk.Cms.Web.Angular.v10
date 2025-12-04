import { StepperSelectionEvent } from "@angular/cdk/stepper";
import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatStepper } from "@angular/material/stepper";
import { TranslateService } from "@ngx-translate/core";
import {AccessModel,
  CoreEnumService,
  CoreModuleModel,
  CoreModuleSiteModel,
  CoreModuleSiteService,
  CoreSiteModel,
  DataFieldInfoModel,
  ErrorExceptionResultBase,
  FilterDataModel,
  FilterModel} from "ntk-cms-api";
import { EditBaseComponent } from "src/app/core/cmsComponent/editBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

import { FormInfoModel } from "../../../../core/models/formInfoModel";
import { FormSubmitedStatusEnum } from "../../../../core/models/formSubmitedStatusEnum";

@Component({
  selector: "app-core-site-module-edit",
  templateUrl: "./moduleEdit.component.html",
  styleUrls: ["./moduleEdit.component.scss"],
  standalone: false,
})
export class CoreSiteModuleEditComponent
  extends EditBaseComponent<CoreModuleSiteService, CoreModuleSiteModel, number>
  implements OnInit
{
  requestLinkSiteId = 0;
  requestLinkModuleId = 0;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CoreSiteModuleEditComponent>,
    public coreEnumService: CoreEnumService,
    public coreModuleSiteService: CoreModuleSiteService,
    private cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
  ) {
    super(
      coreModuleSiteService,
      new CoreModuleSiteModel(),
      publicHelper,
      translate,
    );

    this.publicHelper.processService.cdr = this.cdr;

    if (data) {
      this.requestLinkModuleId = +data.linkModuleId || 0;
      this.requestLinkSiteId = +data.linkSiteId || 0;
    }
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();

  dataModelResult: ErrorExceptionResultBase = new ErrorExceptionResultBase();
  dataModel: CoreModuleSiteModel = new CoreModuleSiteModel();

  formInfo: FormInfoModel = new FormInfoModel();

  fileManagerOpenForm = false;

  dataAccessModel: AccessModel;

  ngOnInit(): void {
    if (this.requestLinkModuleId <= 0 || this.requestLinkSiteId <= 0) {
      this.cmsToastrService.typeErrorComponentAction();
      this.dialogRef.close({ dialogChangedDate: false });
      return;
    }
    this.translate.get("TITLE.Edit_Modules").subscribe((str: string) => {
      this.formInfo.formTitle = str;
    });

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

    const filteModelContent = new FilterModel();

    /*make filter*/
    let filter = new FilterDataModel();
    filter.propertyName = "LinkModuleId";
    filter.value = this.requestLinkModuleId;
    filteModelContent.filters.push(filter);
    /*make filter*/
    filter = new FilterDataModel();
    filter.propertyName = "linkSiteId";
    filter.value = this.requestLinkSiteId;
    filteModelContent.filters.push(filter);

    filteModelContent.accessLoad = true;
    this.coreModuleSiteService.ServiceGetAll(filteModelContent).subscribe({
      next: (ret) => {
        /*َAccess Field*/
        this.dataAccessModel = ret.access;
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);

        this.dataModel = ret.item;
        if (ret.isSuccess) {
          if (ret.listItems && ret.listItems.length > 0) {
            this.dataModel = ret.listItems[0];
            this.formInfo.formTitle =
              this.formInfo.formTitle +
              " " +
              this.dataModel.linkSiteId +
              "#" +
              this.dataModel.linkModuleId;
            this.formInfo.submitResultMessage = "";
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          } else {
            this.translate
              .get("MESSAGE.Module_not_found_for_editing")
              .subscribe((str: string) => {
                this.cmsToastrService.typeError(str);
              });
          }
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

  DataEditContent(): void {
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

    this.coreModuleSiteService.ServiceEdit(this.dataModel).subscribe({
      next: (ret) => {
        this.formInfo.submitButtonEnabled = true;
        this.dataModelResult = ret;
        if (ret.isSuccess) {
          this.translate
            .get("MESSAGE.registration_completed_successfully")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
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
  onActionSiteSelect(model: CoreSiteModel): void {
    this.dataModel.linkSiteId = null;
    if (model && model.id > 0) {
      this.dataModel.linkSiteId = model.id;
    }
  }
  onActionSelectorModuleSelect(model: CoreModuleModel): void {
    if (!model || model.id <= 0) {
      this.translate
        .get("MESSAGE.Module_is_not_specified")
        .subscribe((str: string) => {
          this.cmsToastrService.typeErrorSelected(str);
        });
    }
    this.dataModel.linkModuleId = model.id;
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
  onStepClick(event: StepperSelectionEvent, stepper: MatStepper): void {
    if (event.previouslySelectedIndex < event.selectedIndex) {
      if (!this.formGroup.valid) {
        this.cmsToastrService.typeErrorFormInvalid();
        setTimeout(() => {
          stepper.selectedIndex = event.previouslySelectedIndex;
          // stepper.previous();
        }, 10);
      }
    }
  }
}
