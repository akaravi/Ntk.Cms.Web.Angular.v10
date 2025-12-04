import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";

import {
  CmsNotificationSendDtoModel,
  CoreEnumService,
  CoreTokenConnectionModel,
  CoreTokenConnectionService,
  ErrorExceptionResult,
  FormInfoModel,
  FormSubmitedStatusEnum,
  SmsMainApiPathModel,
  SmsMainMessageCategoryModel,
  SmsMainMessageContentModel,
  TokenInfoModelV3,
} from "ntk-cms-api";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

export class DateByClock {
  date: Date;
  clock: string;
}

@Component({
  selector: "app-core-main-action-send-notification",
  templateUrl: "./send-notification.component.html",
  styleUrls: ["./send-notification.component.scss"],
  standalone: false,
})
export class CoreMainActionSendNotificationComponent implements OnInit {
  constructorInfoAreaId = this.constructor.name;
  constructor(
    public coreEnumService: CoreEnumService,
    public coreTokenConnectionService: CoreTokenConnectionService,
    private cmsStoreService: CmsStoreService,
    private cmsToastrService: CmsToastrService,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
    public translate: TranslateService,
    private tokenHelper: TokenHelper,
  ) {
    this.publicHelper.processService.cdr = this.cdr;

    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;
  }
  tokenInfo = new TokenInfoModelV3();

  @ViewChild("vform", { static: false }) formGroup: FormGroup;
  @ViewChild("Message") message: ElementRef;

  dataModelParentSelected: SmsMainApiPathModel = new SmsMainApiPathModel();
  dataModel: CmsNotificationSendDtoModel = new CmsNotificationSendDtoModel();
  dataModelResult: ErrorExceptionResult<CoreTokenConnectionModel> =
    new ErrorExceptionResult<CoreTokenConnectionModel>();
  formInfo: FormInfoModel = new FormInfoModel();
  clipboardText = "";

  ngOnInit(): void {}

  readClipboardFromDevTools() {
    return new Promise((resolve, reject) => {
      const _asyncCopyFn = async () => {
        try {
          const value = await navigator.clipboard.readText();
          //console.log(`${value} is read!`);
          resolve(value);
        } catch (e) {
          reject(e);
        }
        window.removeEventListener("focus", _asyncCopyFn);
      };

      window.addEventListener("focus", _asyncCopyFn);
      console.log(
        "Hit <Tab> to give focus back to document (or we will face a DOMException);",
      );
    });
  }

  onActionMessageLTR() {
    this.message.nativeElement.style.direction = "ltr";
    this.message.nativeElement.style.textAlign = "left";
  }

  onActionMessageRTL() {
    this.message.nativeElement.style.direction = "rtl";
    this.message.nativeElement.style.textAlign = "right";
  }

  dataMessageCategoryModel: SmsMainMessageCategoryModel =
    new SmsMainMessageCategoryModel();
  onActionSelectMessageCategory(model: SmsMainMessageCategoryModel): void {
    if (model && model.id?.length > 0) {
      this.dataMessageCategoryModel = model;
    } else {
      this.dataMessageCategoryModel = new SmsMainMessageCategoryModel();
    }
  }
  dataMessageContentModel: SmsMainMessageContentModel =
    new SmsMainMessageContentModel();
  onActionSelectMessageContent(model: SmsMainMessageContentModel): void {
    if (model && model.id?.length > 0) {
      this.dataMessageContentModel = model;
    } else {
      this.dataMessageContentModel = new SmsMainMessageContentModel();
    }
  }

  onActionMessageContentAdd() {
    if (this.dataMessageContentModel?.messageBody?.length > 0) {
      if (this.dataModel.content.length > 0)
        this.dataModel.content =
          this.dataModel.content +
          " " +
          this.dataMessageContentModel.messageBody;
    } else {
      this.dataModel.content = this.dataMessageContentModel.messageBody;
    }
  }
  onActionMessageContentNew() {
    if (this.dataMessageContentModel?.messageBody?.length > 0) {
      this.dataModel.content = this.dataMessageContentModel.messageBody;
    }
  }

  onFormSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }

    this.formInfo.submitButtonEnabled = false;
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

    this.formInfo.submitResultMessage = "";
    this.formInfo.submitResultMessage = "";
    this.coreTokenConnectionService
      .ServiceSendNotification(this.dataModel)
      .subscribe({
        next: (ret) => {
          this.formInfo.submitButtonEnabled = true;
          this.dataModelResult = ret;
          if (ret.isSuccess) {
            this.translate
              .get("MESSAGE.Submit_request_was_successfully_registered")
              .subscribe((str: string) => {
                this.formInfo.submitResultMessage = str;
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
              });
            this.translate
              .get("MESSAGE.Send_request_was_successfully_registered")
              .subscribe((str: string) => {
                this.cmsToastrService.typeSuccessMessage(str);
              });
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
        error: (e) => {
          this.formInfo.submitButtonEnabled = true;
          this.cmsToastrService.typeError(e);
          this.publicHelper.processService.processStop(pName, false);
        },
      });
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
