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
  DataFieldInfoModel,
  ErrorExceptionResult,
  TransactionAssistantPaymentService,
  transactionAssistantPaymentModel,
} from "ntk-cms-api";
import { NodeInterface, TreeModel } from "ntk-cms-filemanager";
import { AddBaseComponent } from "src/app/core/cmsComponent/addBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

import { FormInfoModel } from "../../../../core/models/formInfoModel";
import { FormSubmitedStatusEnum } from "../../../../core/models/formSubmitedStatusEnum";

@Component({
  selector: "app-transaction-assistant-payment-add",
  templateUrl: "./add.component.html",
  standalone: false,
})
export class TransactionAssistantPaymentAddComponent
  extends AddBaseComponent<
    TransactionAssistantPaymentService,
    transactionAssistantPaymentModel,
    string
  >
  implements OnInit
{
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TransactionAssistantPaymentAddComponent>,
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

    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();

  selectFileTypeMainImage = ["jpg", "jpeg", "png"];
  fileManagerTree: TreeModel;
  appLanguage = "fa";
  dataModelResult: ErrorExceptionResult<transactionAssistantPaymentModel> =
    new ErrorExceptionResult<transactionAssistantPaymentModel>();
  dataModel: transactionAssistantPaymentModel =
    new transactionAssistantPaymentModel();
  formInfo: FormInfoModel = new FormInfoModel();

  fileManagerOpenForm = false;

  /**
   * متد lifecycle hook که هنگام مقداردهی اولیه کامپوننت فراخوانی می‌شود
   * عنوان فرم را تنظیم می‌کند و دسترسی‌ها را دریافت می‌کند
   */
  ngOnInit(): void {
    this.translate.get("TITLE.ADD").subscribe((str: string) => {
      this.formInfo.formTitle = str;
    });

    this.DataGetAccess();
  }

  /**
   * ارسال داده‌های فرم به سرور برای ایجاد رکورد جدید
   * در صورت موفقیت، دیالوگ را می‌بندد و پیام موفقیت نمایش می‌دهد
   */
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

    this.transactionAssistantPaymentService
      .ServiceAdd(this.dataModel)
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
   * مدیریت ارسال فرم
   * بررسی اعتبار فرم و در صورت معتبر بودن، داده‌ها را ارسال می‌کند
   */
  onFormSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }
    this.formInfo.submitButtonEnabled = false;
    this.DataAddContent();
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
