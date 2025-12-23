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
  CoreEnumService,
  EstatePropertyTypeLanduseService,
  EstatePropertyTypeModel,
  EstatePropertyTypeService,
  EstatePropertyTypeUsageModel,
  FilterDataModel,
  FilterModel,
  ManageUserAccessDataTypesEnum,
} from "ntk-cms-api";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

import { FormSubmitedStatusEnum } from "../../../../../core/models/formSubmitedStatusEnum";
import { EstatePropertyTypeLanduseEditBaseComponent } from "./edit.base";

@Component({
  selector: "app-estate-property-type-landuse-edit",
  templateUrl: "./edit.component.html",

  standalone: false,
})
export class EstatePropertyTypeLanduseEditComponent
  extends EstatePropertyTypeLanduseEditBaseComponent
  implements OnInit
{
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EstatePropertyTypeLanduseEditComponent>,
    public coreEnumService: CoreEnumService,
    public estatePropertyTypeLanduseService: EstatePropertyTypeLanduseService,
    public estatePropertyTypeService: EstatePropertyTypeService,
    cmsToastrService: CmsToastrService,
    private cmsStoreService: CmsStoreService,
    public publicHelper: PublicHelper,
    cdr: ChangeDetectorRef,
    public tokenHelper: TokenHelper,
    public translate: TranslateService,
  ) {
    super(
      coreEnumService,
      estatePropertyTypeLanduseService,
      cmsToastrService,
      publicHelper,
      cdr,
      translate,
    );

    if (data) {
      this.requestId = data.id;
    }
    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;

  dataEstatePropertyTypeUsageModel: EstatePropertyTypeUsageModel[];
  dataEstatePropertyTypeUsageIds: string[] = [];
  dataEstatePropertyTypeModel: EstatePropertyTypeModel[];

  ngOnInit(): void {
    this.translate.get("TITLE.Edit").subscribe((str: string) => {
      this.formInfo.formTitle = str;
    });
    if (
      !this.validateRequestId(() =>
        this.dialogRef.close({ dialogChangedDate: false }),
      )
    ) {
      return;
    }
    this.loadItem();

    this.DataGetAllEstatePropertyUsage();
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

    this.estatePropertyTypeLanduseService.setAccessLoad();
    this.estatePropertyTypeLanduseService.setAccessDataType(
      ManageUserAccessDataTypesEnum.Editor,
    );
    this.estatePropertyTypeLanduseService
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
  DataGetAllEstatePropertyUsage(): void {
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

    const filter = new FilterDataModel();
    filter.propertyName = "LinkPropertyTypeLanduseId";
    filter.value = this.requestId;
    filteModelContent.filters.push(filter);

    this.estatePropertyTypeService.ServiceGetAll(filteModelContent).subscribe({
      next: (ret) => {
        this.dataEstatePropertyTypeModel = ret.listItems;
        const listG: string[] = [];
        this.dataEstatePropertyTypeModel.forEach((element) => {
          listG.push(element.linkPropertyTypeUsageId);
        });
        this.dataEstatePropertyTypeUsageIds = listG;
        if (ret.isSuccess) {
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
  DataEditContent(): void {
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
      .get("MESSAGE.sending_information_to_the_server")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });

    this.estatePropertyTypeLanduseService
      .ServiceEdit(this.dataModel)
      .subscribe({
        next: (ret) => {
          this.dataModelResult = ret;
          if (ret.isSuccess) {
            this.translate
              .get("MESSAGE.registration_completed_successfully")
              .subscribe((str: string) => {
                this.formInfo.submitResultMessage = str;
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
            this.formInfo.submitResultMessageType =
              FormSubmitedStatusEnum.Error;
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
  onActionSelectorUserCategorySelect(
    model: EstatePropertyTypeUsageModel[],
  ): void {
    this.dataEstatePropertyTypeUsageModel = model;
  }
  onActionSelectorUserCategorySelectAdded(
    model: EstatePropertyTypeUsageModel,
  ): void {
    const entity = new EstatePropertyTypeModel();
    entity.linkPropertyTypeUsageId = model.id;
    entity.linkPropertyTypeLanduseId = this.dataModel.id;

    this.estatePropertyTypeService.ServiceAdd(entity).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.translate
            .get("MESSAGE.registration_in_this_group_was_successful")
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
    model: EstatePropertyTypeUsageModel,
  ): void {
    const entity = new EstatePropertyTypeModel();
    entity.linkPropertyTypeUsageId = model.id;
    entity.linkPropertyTypeLanduseId = this.dataModel.id;

    this.estatePropertyTypeService.ServiceDeleteEntity(entity).subscribe({
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
  onIconPickerSelect(model: any): void {
    this.dataModel.iconFont = model;
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
