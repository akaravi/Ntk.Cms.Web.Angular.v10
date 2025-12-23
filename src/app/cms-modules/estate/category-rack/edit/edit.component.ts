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
  EstateCategoryRackModel,
  EstateCategoryRackService,
  EstatePropertyTypeModel,
  EstatePropertyTypeService,
  EstatePropertyTypeUsageModel,
  FilterDataModel,
  FilterModel,
} from "ntk-cms-api";
import { NodeInterface, TreeModel } from "ntk-cms-filemanager";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

import { FormInfoModel } from "../../../../core/models/formInfoModel";
import { FormSubmitedStatusEnum } from "../../../../core/models/formSubmitedStatusEnum";
import { EstateCategoryRackEditBaseComponent } from "./edit.base";

@Component({
  selector: "app-estate-category-rack-edit",
  templateUrl: "./edit.component.html",

  standalone: false,
})
export class EstateCategoryRackEditComponent
  extends EstateCategoryRackEditBaseComponent
  implements OnInit
{
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EstateCategoryRackEditComponent>,
    public coreEnumService: CoreEnumService,
    public estateCategoryRackService: EstateCategoryRackService,
    public estatePropertyTypeService: EstatePropertyTypeService,
    cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    cdr: ChangeDetectorRef,
    public translate: TranslateService,
  ) {
    super(
      coreEnumService,
      estateCategoryRackService,
      cmsToastrService,
      publicHelper,
      cdr,
      translate,
    );
    if (data) {
      this.requestId = data.id;
    }
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
    this.loadItem();
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
    filter.propertyName = "LinkCategoryRackId";
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
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
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
    this.saveItem(() => {
      this.dialogRef.close({ dialogChangedDate: true });
    });
  }
  onActionSelectorUserCategorySelect(
    model: EstatePropertyTypeUsageModel[],
  ): void {
    this.dataEstatePropertyTypeUsageModel = model;
  }

  onIconPickerSelect(model: any): void {
    this.dataModel.iconFont = model;
  }
  onFormSubmit(): void {
    this.onFormSubmitInternal(() => {
      this.dialogRef.close({ dialogChangedDate: true });
    });
  }
  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }
}
