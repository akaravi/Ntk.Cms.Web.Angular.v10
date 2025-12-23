import { ChangeDetectorRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import {
  CoreEnumService,
  ErrorExceptionResultBase,
  EstatePropertyTypeUsageModel,
  EstatePropertyTypeUsageService,
  ManageUserAccessDataTypesEnum,
} from "ntk-cms-api";
import { NodeInterface, TreeModel } from "ntk-cms-filemanager";
import { EditBaseComponent } from "src/app/core/cmsComponent/editBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

import { FormInfoModel } from "../../../../../core/models/formInfoModel";
import { FormSubmitedStatusEnum } from "../../../../../core/models/formSubmitedStatusEnum";

export abstract class EstatePropertyTypeUsageEditBaseComponent extends EditBaseComponent<
  EstatePropertyTypeUsageService,
  EstatePropertyTypeUsageModel,
  string
> {
  requestId = "";
  constructorInfoAreaId = this.constructor.name;

  formGroup: FormGroup;

  selectFileTypeMainImage = ["jpg", "jpeg", "png"];
  fileManagerTree: TreeModel;
  appLanguage = "fa";

  dataModelResult: ErrorExceptionResultBase = new ErrorExceptionResultBase();
  dataModel: EstatePropertyTypeUsageModel = new EstatePropertyTypeUsageModel();
  formInfo: FormInfoModel = new FormInfoModel();

  fileManagerOpenForm = false;

  protected constructor(
    public coreEnumService: CoreEnumService,
    public estatePropertyTypeUsageService: EstatePropertyTypeUsageService,
    protected cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    protected cdr: ChangeDetectorRef,
    public translate: TranslateService,
  ) {
    super(
      estatePropertyTypeUsageService,
      new EstatePropertyTypeUsageModel(),
      publicHelper,
      translate,
    );

    this.publicHelper.processService.cdr = this.cdr;
    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
  }

  /**
   * اعتبارسنجی شناسه و اجرای هندلر در صورت نامعتبر بودن
   */
  protected validateRequestId(onInvalid: () => void): boolean {
    if (!this.requestId || this.requestId.length === 0) {
      this.cmsToastrService.typeErrorComponentAction();
      onInvalid();
      return false;
    }
    return true;
  }

  /**
   * منطق مشترک دریافت یک رکورد
   */
  protected loadItem(): void {
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

    this.estatePropertyTypeUsageService.setAccessLoad();
    this.estatePropertyTypeUsageService.setAccessDataType(
      ManageUserAccessDataTypesEnum.Editor,
    );
    this.estatePropertyTypeUsageService
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

  onActionFileSelected(model: NodeInterface): void {
    this.dataModel.linkMainImageId = model.id;
    this.dataModel.linkMainImageIdSrc = model.downloadLinksrc;
  }

  /**
   * منطق مشترک ویرایش، با callback برای رفتار موفقیت
   */
  protected saveItem(onSuccess: () => void): void {
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

    this.estatePropertyTypeUsageService.ServiceEdit(this.dataModel).subscribe({
      next: (ret) => {
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
          onSuccess();
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

        this.formInfo.submitButtonEnabled = true;
      },
      error: (er) => {
        this.formInfo.submitButtonEnabled = true;
        this.cmsToastrService.typeError(er);
        this.publicHelper.processService.processStop(pName, false);
      },
    });
  }

  /**
   * متد مشترک برای submit فرم؛ کامپوننت‌های فرزند فقط callback موفقیت را تعیین می‌کنند
   */
  protected onFormSubmitInternal(onSuccess: () => void): void {
    if (!this.formGroup?.valid) {
      return;
    }
    this.formInfo.submitButtonEnabled = false;
    this.saveItem(onSuccess);
  }
}
