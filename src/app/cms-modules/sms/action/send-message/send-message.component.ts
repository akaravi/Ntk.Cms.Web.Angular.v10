import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { CronOptionModel, TranslateUiService } from "ngx-ntk-cron-editor";
import {
  CoreEnumService,
  CoreModuleSiteUserCreditModel,
  CoreModuleSiteUserCreditService,
  ErrorExceptionResult,
  FormInfoModel,
  SmsActionService,
  SmsApiSendMessageDtoModel,
  SmsApiSendMessageOrderCalculateDtoModel,
  SmsApiSendOrderCalculateResultModel,
  SmsApiSendResultModel,
  SmsMainApiNumberModel,
  SmsMainApiPathModel,
  SmsMainApiPathPriceServiceEstimateModel,
  SmsMainApiPathPriceServiceService,
  SmsMainMessageCategoryModel,
  SmsMainMessageContentModel,
  SmsMessageTypeEnum,
  TokenInfoModelV3,
  ValidationStatusEnum,
} from "ntk-cms-api";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
import { environment } from "src/environments/environment";
export class DateByClock {
  date: Date;
  clock: string;
}
export class messagePaginationModel {
  get messageMaxLength(): number {
    return (
      this._serverItemInUse?.EndUserMessageLengthPaginationList?.slice(-1)[0] ??
      0
    );
  }
  private _message: string = "";
  private _messageUnicode: boolean = false;
  private _messagePage: number = 0;
  private _serverItems: SmsMainApiPathPriceServiceEstimateModel[] = [];
  private _serverItemInUse: SmsMainApiPathPriceServiceEstimateModel;
  set serverList(serverList: SmsMainApiPathPriceServiceEstimateModel[]) {
    this._serverItems = serverList;
  }
  set message(message: string) {
    this._message = message;
    this.checkMessageUnicode();
  }
  private checkMessageUnicode() {
    if (this._message?.length > 0) {
      for (let i = 0; i < this._message.length; i++) {
        const code = this._message.charCodeAt(i);
        if (code > 125 || code < 0) {
          this._messageUnicode = true;
          this._serverItemInUse = this._serverItems.find(
            (x) => x.messageType === SmsMessageTypeEnum.TextUnicode,
          );
          return;
        }
      }
    }
  }
  private checkMessagePage() {
    if (this._message?.length > 0) {
      // متن را به صورت برعکس برمی‌گرداند (فقط به عنوان نمونه اجرای "آخرین دستور" روی این متن)
      this._messagePage =
        this._serverItemInUse?.EndUserMessageLengthPaginationList?.findIndex(
          (x) => this._message.length <= x,
        ) ??
        0 + 1 ??
        0;
    }
  }
  get messagePage(): number {
    return this._messagePage;
  }
  get messageUnicode(): boolean {
    return this._messageUnicode;
  }
  get EndUserPricePerPageMin(): number {
    return this._serverItemInUse?.EndUserPricePerPageMin ?? 0;
  }
  get EndUserPricePerPageMax(): number {
    return this._serverItemInUse?.EndUserPricePerPageMax ?? 0;
  }
  get EndUserPriceMin(): number {
    return this.EndUserPricePerPageMin * this.messagePage;
  }
  get EndUserPriceMax(): number {
    return this.EndUserPricePerPageMax * this.messagePage;
  }
}
@Component({
  selector: "app-sms-action-send-message",
  templateUrl: "./send-message.component.html",
  styleUrls: ["./send-message.component.scss"],
  standalone: false,
})
export class SmsActionSendMessageComponent implements OnInit {
  requestLinkApiPathId = "";
  requestLinkApiNumberId = "";
  constructorInfoAreaId = this.constructor.name;
  constructor(
    public coreEnumService: CoreEnumService,
    public smsActionService: SmsActionService,
    private service: CoreModuleSiteUserCreditService,
    private activatedRoute: ActivatedRoute,
    public smsMainApiPathPriceServiceService: SmsMainApiPathPriceServiceService,
    private cmsToastrService: CmsToastrService,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
    public translate: TranslateService,
    private router: Router,
    private tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
    private translateUiService: TranslateUiService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;

    this.requestLinkApiPathId =
      this.activatedRoute.snapshot.paramMap.get("LinkApiPathId");
    if (this.requestLinkApiPathId?.length > 0) {
      this.dataModel.linkApiPathId = this.requestLinkApiPathId;
    }
    this.requestLinkApiNumberId =
      this.activatedRoute.snapshot.paramMap.get("LinkApiNumberId");
    if (this.requestLinkApiNumberId?.length > 0) {
      this.dataModel.linkFromNumber = this.requestLinkApiNumberId;
    }
    this.dataModel.scheduleCron = "";

    if (
      this.router &&
      this.router.getCurrentNavigation() &&
      this.router.getCurrentNavigation().extras.state != null
    ) {
      this.receiverNumber =
        this.router.getCurrentNavigation().extras.state.ReceiverNumber;
      this.senderNumber =
        this.router.getCurrentNavigation().extras.state.SenderNumber;
      this.linkApiPathId =
        this.router.getCurrentNavigation().extras.state.LinkApiPathId;
      this.linkNumberId =
        this.router.getCurrentNavigation().extras.state.LinkNumberId;
    }
    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;
    if (this.tokenInfo) {
      this.language = this.tokenInfo.access.language;
    }

    let dateTime = new Date();
    this.timezoneOffset = dateTime.getTimezoneOffset();
    this.formInfo.validationList.push({
      key: "checkCredit",
      title: "اعتبار بررسی شود",
      status: ValidationStatusEnum.Warning,
      description: "",
      linkSrc: "",
    });
    this.formInfo.validationList.push({
      key: "message",
      title: "متن پیام وارد شود",
      status: ValidationStatusEnum.Warning,
      description: "",
      linkSrc: "",
    });

    this.formInfo.validationList.push({
      key: "linkApiPathId",
      title: "مسیر ارسال انتخاب شود",
      status: ValidationStatusEnum.Warning,
      description: "",
      linkSrc: "",
    });
    this.formInfo.validationList.push({
      key: "linkFromNumber",
      title: "شماره فرستنده انتخاب شود",
      status: ValidationStatusEnum.Error,
      description: "",
      linkSrc: "",
    });
    this.formInfo.validationList.push({
      key: "toNumbers",
      title: "شماره گیرنده انتخاب شود",
      status: ValidationStatusEnum.Error,
      description: "",
      linkSrc: "",
    });
  }
  timezoneOffset = 0;
  tokenInfo = new TokenInfoModelV3();
  language = environment.languagesDefault;
  @ViewChild("vform", { static: false }) formGroup: FormGroup;
  @ViewChild("Message") message: ElementRef;

  receiverNumber: string = "";
  senderNumber: string = "";
  linkApiPathId: string = "";
  linkNumberId: string = "";
  messageMaxLength = 0;
  dataModel: SmsApiSendMessageDtoModel = new SmsApiSendMessageDtoModel();
  dataModelOrderCalculate: SmsApiSendMessageOrderCalculateDtoModel =
    new SmsApiSendMessageOrderCalculateDtoModel();
  dataModelResult: ErrorExceptionResult<SmsApiSendResultModel> =
    new ErrorExceptionResult<SmsApiSendResultModel>();
  dataModelOrderCalculateResult: ErrorExceptionResult<SmsApiSendOrderCalculateResultModel> =
    new ErrorExceptionResult<SmsApiSendOrderCalculateResultModel>();
  dataModelCreditResult: ErrorExceptionResult<CoreModuleSiteUserCreditModel> =
    new ErrorExceptionResult<CoreModuleSiteUserCreditModel>();

  dataModelApiPathPriceServiceEstimateResult: ErrorExceptionResult<SmsMainApiPathPriceServiceEstimateModel> =
    new ErrorExceptionResult<SmsMainApiPathPriceServiceEstimateModel>();

  dataModelDateByClockStart: DateByClock = new DateByClock();
  dataModelDateByClockExpire: DateByClock = new DateByClock();
  formInfo: FormInfoModel = new FormInfoModel();
  clipboardText = "";
  dataModelMessagePagination: messagePaginationModel =
    new messagePaginationModel();
  // Hangfire 1.7+ compatible expression: '3 2 12 1/1 ?'
  // Quartz compatible expression: '4 3 2 12 1/1 ? *'
  //public cronExpression = '0 12 1W 1/1 ?';
  public isCronDisabled = false;
  public cronOptions: CronOptionModel = {
    formInputClass: "form-control cron-editor-input",
    formSelectClass: "form-control cron-editor-select",
    formRadioClass: "cron-editor-radio",
    formCheckboxClass: "cron-editor-checkbox",

    defaultTime: "10:00:00",
    use24HourTime: true,

    hideMinutesTab: false,
    hideHourlyTab: false,
    hideDailyTab: false,
    hideWeeklyTab: false,
    hideMonthlyTab: false,
    hideYearlyTab: false,
    hideAdvancedTab: false,

    hideSeconds: true,
    removeSeconds: true,
    removeYears: true,
  };

  ngOnInit(): void {
    //this.readClipboardFromDevTools().then((r) => this.clipboardText = r as string);
    this.onActionScheduleSendNow();

    if (this.linkApiPathId && this.linkApiPathId?.length > 0)
      this.dataModel.linkApiPathId = this.linkApiPathId;
    if (this.receiverNumber && this.receiverNumber?.length > 0)
      this.dataModel.toNumbers = this.receiverNumber;
    if (this.senderNumber && this.senderNumber?.length > 0)
      this.dataModel.linkFromNumber = this.senderNumber;
    this.DataCheckCredit();
  }

  onActionScheduleSendNow() {
    const now = new Date();
    this.dataModel.scheduleSendStart = now;
    this.dataModelDateByClockStart.clock =
      now.getHours() + ":" + now.getMinutes();
    this.dataModelDateByClockStart.date = now;

    this.dataModel.scheduleSendExpire = now;
    this.dataModelDateByClockExpire.clock =
      now.getHours() + ":" + now.getMinutes();
    this.dataModelDateByClockExpire.date = now;
  }
  onActionScheduleSendCheck() {
    /**Start */
    var now = new Date();
    if (!this.dataModelDateByClockStart.date)
      this.dataModelDateByClockStart.date = now;
    if (!this.dataModelDateByClockStart.clock)
      this.dataModelDateByClockStart.clock =
        now.getHours() + ":" + now.getMinutes();

    this.dataModelDateByClockStart.date = new Date(
      this.dataModelDateByClockStart.date,
    );
    this.dataModelDateByClockStart.date.setHours(
      +this.dataModelDateByClockStart.clock.split(":")[0] | 0,
      +this.dataModelDateByClockStart.clock.split(":")[1] | 0,
    );

    this.dataModel.scheduleSendStart = this.dataModelDateByClockStart.date;
    if (this.dataModel.scheduleSendStart > this.dataModel.scheduleSendExpire)
      now = this.dataModel.scheduleSendStart;
    /**Expire */

    now.setMinutes(now.getMinutes() + 60 * 3);
    if (
      !this.dataModelDateByClockExpire.date ||
      this.dataModel.scheduleSendStart > this.dataModel.scheduleSendExpire
    )
      this.dataModelDateByClockExpire.date = now;
    if (
      !this.dataModelDateByClockExpire.clock ||
      this.dataModel.scheduleSendStart > this.dataModel.scheduleSendExpire
    )
      this.dataModelDateByClockExpire.clock =
        now.getHours() + ":" + now.getMinutes();

    this.dataModelDateByClockExpire.date = new Date(
      this.dataModelDateByClockExpire.date,
    );
    this.dataModelDateByClockExpire.date.setHours(
      +this.dataModelDateByClockExpire.clock.split(":")[0] | 0,
      +this.dataModelDateByClockExpire.clock.split(":")[1] | 0,
    );

    this.dataModel.scheduleSendExpire = this.dataModelDateByClockExpire.date;

    if (this.dataModel.scheduleSendStart > this.dataModel.scheduleSendExpire) {
      now = this.dataModel.scheduleSendStart;
      now.setMinutes(now.getMinutes() + 60 * 3);
      this.dataModelDateByClockExpire.date = now;
      this.dataModelDateByClockExpire.clock =
        now.getHours() + ":" + now.getMinutes();
      this.dataModelDateByClockExpire.date = new Date(
        this.dataModelDateByClockExpire.date,
      );
      this.dataModelDateByClockExpire.date.setHours(
        +this.dataModelDateByClockExpire.clock.split(":")[0] | 0,
        +this.dataModelDateByClockExpire.clock.split(":")[1] | 0,
      );
      this.dataModel.scheduleSendExpire = this.dataModelDateByClockExpire.date;
      this.translate
        .get("MESSAGE.Warning_ClockStart_Bigger_Than_ClockExpire")
        .subscribe((str: string) => {
          this.cmsToastrService.typeWarningMessage(str);
        });
    }
  }
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
  onActionSelectApiPath(model: SmsMainApiPathModel): void {
    this.dataModel.linkApiPathId = null;
    this.dataModel.linkFromNumber = null;
    if (model && model.id?.length > 0) {
      this.dataModel.linkApiPathId = model.id;
      this.dataModel.linkFromNumber = null;
      this.dataModel["sendByQueueDisabled"] = false;
      if (
        model.apiAbilitySendByQueue == true &&
        model.apiAbilitySendByDirect == true
      ) {
        this.dataModel.sendByQueue = true;
        this.dataModel["sendByQueueDisabled"] = false;
      } else if (model.apiAbilitySendByQueue == true) {
        this.dataModel.sendByQueue = true;
        this.dataModel["sendByQueueDisabled"] = true;
      } else if (model.apiAbilitySendByDirect == true) {
        this.dataModel.sendByQueue = false;
        this.dataModel["sendByQueueDisabled"] = true;
      }
      const messageAddTextFirst = this.formInfo.validationList.find(
        (x) => x.key === "sendMessageAddTextFirst",
      );
      if (messageAddTextFirst) {
        this.formInfo.validationList.splice(
          this.formInfo.validationList.indexOf(messageAddTextFirst),
          1,
        );
      }
      const messageAddTextEnd = this.formInfo.validationList.find(
        (x) => x.key === "sendMessageAddTextEnd",
      );
      if (messageAddTextEnd) {
        this.formInfo.validationList.splice(
          this.formInfo.validationList.indexOf(messageAddTextEnd),
          1,
        );
      }
      if (model.sendMessageAddTextFirst?.length > 0) {
        this.formInfo.validationList.push({
          key: "sendMessageAddTextFirst",
          title: "در ابتدای پیام اضافه شود",
          status: ValidationStatusEnum.info,
          description: model.sendMessageAddTextFirst,
          linkSrc: "",
        });
      }
      if (model.sendMessageAddTextEnd?.length > 0) {
        this.formInfo.validationList.push({
          key: "sendMessageAddTextEnd",
          title: "در انتهای پیام اضافه شود",
          status: ValidationStatusEnum.info,
          description: model.sendMessageAddTextEnd,
          linkSrc: "",
        });
      }
    } else {
      if (this.requestLinkApiPathId && this.requestLinkApiPathId.length > 0) {
        this.dataModel.linkApiPathId = this.requestLinkApiPathId;
      } else {
        this.dataModel.linkApiPathId = null;
      }
    }
    if (this.dataModel.linkApiPathId?.length > 0) {
      this.formInfo.validationList.find(
        (x) => x.key === "linkApiPathId",
      ).status = ValidationStatusEnum.Success;
    } else {
      this.formInfo.validationList.find(
        (x) => x.key === "linkApiPathId",
      ).status = ValidationStatusEnum.Error;
    }
    this.dataModelApiPathPriceServiceEstimateResult =
      new ErrorExceptionResult<SmsMainApiPathPriceServiceEstimateModel>();
    if (this.dataModel.linkApiPathId?.length > 0) {
      this.smsMainApiPathPriceServiceService
        .ServiceGetApiPriceEstimate(this.dataModel.linkApiPathId)
        .subscribe({
          next: (ret) => {
            this.dataModelApiPathPriceServiceEstimateResult = ret;
            if (ret.isSuccess && ret.listItems?.length > 0) {
              this.dataModelMessagePagination.serverList = ret.listItems;
              this.dataModelMessagePagination.message = this.dataModel.message;
            }
          },
        });
    }
  }

  /**
   * onActionValidationStatus
   */
  onActionValidationStatusMessageBodyChange() {
    this.dataModelMessagePagination.message = this.dataModel.message;
    if (this.dataModel.message?.length > 0) {
      this.formInfo.validationList.find((x) => x.key === "message").status =
        ValidationStatusEnum.Success;
      this.formInfo.validationList.find(
        (x) => x.key === "message",
      ).description = this.dataModel.message.length + " کاراکتر";
    } else {
      this.formInfo.validationList.find(
        (x) => x.key === "message",
      ).description = "";
      this.formInfo.validationList.find((x) => x.key === "message").status =
        ValidationStatusEnum.Error;
    }
    this.cdr.detectChanges();
  }
  onActionValidationStatusToNumbersChange() {
    if (
      this.dataModel.toContactCategories?.length > 0 ||
      this.dataModel.toContactContents?.length > 0
    ) {
      this.formInfo.validationList.find((x) => x.key === "toNumbers").status =
        ValidationStatusEnum.Success;
    } else if (this.dataModel.toNumbers?.length > 0) {
      this.formInfo.validationList.find((x) => x.key === "toNumbers").status =
        ValidationStatusEnum.Success;
    } else {
      this.formInfo.validationList.find((x) => x.key === "toNumbers").status =
        ValidationStatusEnum.Error;
    }
    this.cdr.detectChanges();
  }
  onActionValidationStatusFromNumbersChange() {
    if (this.dataModel.linkFromNumber?.length > 0) {
      this.formInfo.validationList.find(
        (x) => x.key === "linkFromNumber",
      ).status = ValidationStatusEnum.Success;
    } else {
      this.formInfo.validationList.find(
        (x) => x.key === "linkFromNumber",
      ).status = ValidationStatusEnum.Error;
    }
    this.cdr.detectChanges();
  }
  onActionValidationStatusCheckProcessesChange() {
    var model = this.formInfo.validationList.find(
      (x) => x.key === "checkProcesses",
    );
    if (model) {
      this.formInfo.validationList.splice(
        this.formInfo.validationList.indexOf(model),
        1,
      );
    }
    if (this.dataModel.checkProcesses) {
      this.formInfo.validationList.push({
        key: "checkProcesses",
        title: "ارسال در حال شبیه سازی  می باشد",
        status: ValidationStatusEnum.info,
        description: "ارسال در حال شبیه سازی  می باشد",
        linkSrc: "",
      });
    } else {
      this.formInfo.validationList.push({
        key: "checkProcesses",
        title: "ارسال در حالت معمول می باشد",
        status: ValidationStatusEnum.Success,
        description: "ارسال در حالت معمول می باشد",
        linkSrc: "",
      });
    }
    this.cdr.detectChanges();
  }
  onActionValidationStatusCheckCredit() {
    if (
      this.dataModelCreditResult.isSuccess &&
      this.dataModelCreditResult.item.credit > 0
    ) {
      this.formInfo.validationList.find((x) => x.key === "checkCredit").title =
        "حداقل اعتبار برای ارسال پیام بررسی شد : ";
      this.formInfo.validationList.find(
        (x) => x.key === "checkCredit",
      ).description = this.dataModelCreditResult.item.credit + "";
      this.formInfo.validationList.find((x) => x.key === "checkCredit").status =
        ValidationStatusEnum.info;
    } else {
      this.formInfo.validationList.find((x) => x.key === "checkCredit").title =
        "اعتبار بررسی شود";
      this.formInfo.validationList.find(
        (x) => x.key === "checkCredit",
      ).description = " برای شارژ اعتبار کلیک کنید";
      this.formInfo.validationList.find(
        (x) => x.key === "checkCredit",
      ).linkSrc = "/coremodule/site-user-credit";
      this.formInfo.validationList.find((x) => x.key === "checkCredit").status =
        ValidationStatusEnum.Error;
    }
    this.cdr.detectChanges();
  }
  onActionValidationStatusCronChange(event: any) {
    this.dataModel.scheduleCron = event;
    var model = this.formInfo.validationList.find(
      (x) => x.key === "scheduleCron",
    );
    if (model) {
      this.formInfo.validationList.splice(
        this.formInfo.validationList.indexOf(model),
        1,
      );
    }
    if (this.dataModel.scheduleCron) {
      this.formInfo.validationList.push({
        key: "scheduleCron",
        title: "زمانبندی ارسال فعال است",
        status: ValidationStatusEnum.info,
        description: "زمانبندی ارسال فعال است",

        linkSrc: "",
      });
    } else {
      this.formInfo.validationList.push({
        key: "scheduleCron",
        title: "زمانبندی ارسال غیر فعال است",
        status: ValidationStatusEnum.Success,
        description: "زمانبندی ارسال غیر فعال است",
        linkSrc: "",
      });
    }
    this.cdr.detectChanges();
  }
  /**
   * onActionSelectApiNumber
   */
  onActionSelectApiNumber(model: SmsMainApiNumberModel): void {
    if (model && model.id?.length > 0) {
      this.dataModel.linkFromNumber = model.id;
    } else {
      this.dataModel.linkFromNumber = null;
    }
    this.onActionValidationStatusFromNumbersChange();
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
      if (this.dataModel.message?.length > 0)
        this.dataModel.message =
          this.dataModel.message +
          " " +
          this.dataMessageContentModel.messageBody;
    } else {
      this.dataModel.message = this.dataMessageContentModel.messageBody;
    }
    this.onActionValidationStatusMessageBodyChange();
  }
  onActionMessageContentNew() {
    if (this.dataMessageContentModel?.messageBody?.length > 0) {
      this.dataModel.message = this.dataMessageContentModel.messageBody;
    }
    this.onActionValidationStatusMessageBodyChange();
  }

  onFormSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }
    if (
      !this.dataModel.linkApiPathId ||
      this.dataModel.linkApiPathId.length <= 0
    ) {
      this.cmsToastrService.typeErrorFormInvalid();
    }
    this.onActionScheduleSendCheck();

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

    this.smsActionService.ServiceSendMessage(this.dataModel).subscribe({
      next: (ret) => {
        this.formInfo.submitButtonEnabled = true;
        this.dataModelResult = ret;
        if (ret.isSuccess) {
          this.translate
            .get("MESSAGE.Submit_request_was_successfully_registered")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
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
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.publicHelper.processService.processStop(pName);
      },
      error: (e) => {
        this.formInfo.submitButtonEnabled = true;
        this.cmsToastrService.typeError(e);
        this.publicHelper.processService.processStop(pName, false);
      },
      complete: () => {
        console.info;
      },
    });
  }

  onActionOrderCalculate(): void {
    if (!this.formGroup.valid) {
      return;
    }
    if (
      !this.dataModel.linkApiPathId ||
      this.dataModel.linkApiPathId.length <= 0
    ) {
      this.cmsToastrService.typeErrorFormInvalid();
    }
    this.onActionScheduleSendCheck();

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
    this.dataModelOrderCalculate = this
      .dataModel as unknown as SmsApiSendMessageOrderCalculateDtoModel;
    this.smsActionService
      .ServiceOrderCalculate(this.dataModelOrderCalculate)
      .subscribe({
        next: (ret) => {
          this.formInfo.submitButtonEnabled = true;
          this.dataModelOrderCalculateResult = ret;
          if (ret.isSuccess) {
            this.translate
              .get("MESSAGE.Submit_request_was_successfully_registered")
              .subscribe((str: string) => {
                this.formInfo.submitResultMessage = str;
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
            this.cmsToastrService.typeErrorMessage(ret.errorMessage);
          }
          this.publicHelper.processService.processStop(pName);
        },
        error: (e) => {
          this.formInfo.submitButtonEnabled = true;
          this.cmsToastrService.typeError(e);
          this.publicHelper.processService.processStop(pName, false);
        },
        complete: () => {
          console.info;
        },
      });
  }

  DataCheckCredit(): void {
    const pName = this.constructor.name + "CheckCredit";
    this.translate
      .get("MESSAGE.get_information_list")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });

    this.service.ServiceGetCredit("sms").subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.dataModelCreditResult = ret;
        } else {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.onActionValidationStatusCheckCredit();
        this.publicHelper.processService.processStop(pName);
      },
      error: (er) => {
        this.cmsToastrService.typeError(er);

        this.publicHelper.processService.processStop(pName, false);
      },
    });
  }
  onActionContactCategorySelectChecked(model: string): void {
    if (!model || model.length <= 0) {
      this.translate
        .get("MESSAGE.category_of_information_is_not_clear")
        .subscribe((str: string) => {
          this.cmsToastrService.typeErrorSelected(str);
        });
      this.onActionValidationStatusToNumbersChange();
      return;
    }
    if (!this.dataModel.toContactCategories)
      this.dataModel.toContactCategories = [];
    if (!this.dataModel.toContactContents)
      this.dataModel.toContactContents = [];
    this.publicHelper.listAddIfNotExist(
      this.dataModel.toContactCategories,
      model,
      0,
    );
    if (
      this.dataModel.toContactCategories?.length > 0 ||
      this.dataModel.toContactContents?.length > 0
    ) {
      this.dataModel.toNumbers = "";
    }
    this.onActionValidationStatusToNumbersChange();
  }
  onActionContactCategorySelectDisChecked(model: string): void {
    if (!model || model.length <= 0) {
      this.translate
        .get("MESSAGE.category_of_information_is_not_clear")
        .subscribe((str: string) => {
          this.cmsToastrService.typeErrorSelected(str);
        });
      this.onActionValidationStatusToNumbersChange();
      return;
    }
    if (!this.dataModel.toContactCategories)
      this.dataModel.toContactCategories = [];
    if (!this.dataModel.toContactContents)
      this.dataModel.toContactContents = [];
    this.publicHelper.listRemoveIfExist(
      this.dataModel.toContactCategories,
      model,
    );
    if (
      this.dataModel.toContactCategories?.length > 0 ||
      this.dataModel.toContactContents?.length > 0
    ) {
      this.dataModel.toNumbers = "";
    }
    this.onActionValidationStatusToNumbersChange();
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

  hasValidationStatusError(): boolean {
    return (
      this.formInfo.validationList.find(
        (x) => x.status === ValidationStatusEnum.Error,
      ) !== undefined
    );
  }
}
