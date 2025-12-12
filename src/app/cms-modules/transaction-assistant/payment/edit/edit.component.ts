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
  ErrorExceptionResultBase,
  ManageUserAccessDataTypesEnum,
  TransactionAssistantPaymentService,
  transactionAssistantPaymentModel,
} from "ntk-cms-api";
import { NodeInterface, TreeModel } from "ntk-cms-filemanager";
import { EditBaseComponent } from "src/app/core/cmsComponent/editBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

import { FormInfoModel } from "../../../../core/models/formInfoModel";
import { FormSubmitedStatusEnum } from "../../../../core/models/formSubmitedStatusEnum";

@Component({
  selector: "app-transaction-assistant-payment-edit",
  templateUrl: "./edit.component.html",
  standalone: false,
})
export class TransactionAssistantPaymentEditComponent
  extends EditBaseComponent<
    TransactionAssistantPaymentService,
    transactionAssistantPaymentModel,
    string
  >
  implements OnInit
{
  requestId = "";
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TransactionAssistantPaymentEditComponent>,
    public coreEnumService: CoreEnumService,
    public transactionAssistantPaymentService: TransactionAssistantPaymentService,
    private cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
  ) {
    super(
      transactionAssistantPaymentService,
      new transactionAssistantPaymentModel(),
      publicHelper,
      translate,
    );

    this.publicHelper.processService.cdr = this.cdr;
    if (data) {
      this.requestId = data.id;
    }
    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;

  selectFileTypeMainImage = ["jpg", "jpeg", "png"];
  fileManagerTree: TreeModel;
  appLanguage = "fa";

  dataModelResult: ErrorExceptionResultBase = new ErrorExceptionResultBase();
  dataModel: transactionAssistantPaymentModel =
    new transactionAssistantPaymentModel();
  formInfo: FormInfoModel = new FormInfoModel();

  fileManagerOpenForm = false;

  /**
   * متد lifecycle hook که هنگام مقداردهی اولیه کامپوننت فراخوانی می‌شود
   * عنوان فرم را تنظیم می‌کند و در صورت وجود ID، داده‌ها را از سرور دریافت می‌کند
   */
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

  /**
   * دریافت اطلاعات یک رکورد Payment از سرور بر اساس ID
   * داده‌ها را در فرم بارگذاری می‌کند
   */
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

    this.transactionAssistantPaymentService.setAccessLoad();
    this.transactionAssistantPaymentService.setAccessDataType(
      ManageUserAccessDataTypesEnum.Editor,
    );
    this.transactionAssistantPaymentService
      .ServiceGetOneById(this.requestId)
      .subscribe({
        next: (ret) => {
          this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);

          this.dataModel = ret.item;
          if (ret.isSuccess) {
            this.formInfo.formTitle =
              this.formInfo.formTitle + " " + ret.item.id;
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
  /**
   * ارسال داده‌های ویرایش شده به سرور
   * در صورت موفقیت، دیالوگ را می‌بندد و پیام موفقیت نمایش می‌دهد
   */
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

    this.transactionAssistantPaymentService
      .ServiceEdit(this.dataModel)
      .subscribe({
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

  /**
   * مدیریت ارسال فرم ویرایش
   * بررسی اعتبار فرم و در صورت معتبر بودن، تغییرات را ذخیره می‌کند
   */
  onFormSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }
    this.formInfo.submitButtonEnabled = false;
    this.DataEditContent();
  }
  /**
   * بستن دیالوگ بدون ذخیره تغییرات
   */
  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }
  /**
   * مدیریت انتخاب فایل از file manager
   * @param model - اطلاعات فایل انتخاب شده از file manager
   */
  onActionFileSelected(model: NodeInterface): void {
    this.dataModel.linkMainImageId = model.id;
    this.dataModel.linkMainImageIdSrc = model.downloadLinksrc;
  }
}
