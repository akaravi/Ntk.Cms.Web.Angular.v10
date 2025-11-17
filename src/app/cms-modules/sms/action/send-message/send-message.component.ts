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
  SmsApiSendResultModel,
  SmsMainApiNumberModel,
  SmsMainApiPathModel,
  SmsMainMessageCategoryModel,
  SmsMainMessageContentModel,
  TokenInfoModelV3,
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

export enum ValidationStatus {
  info = 0,
  Success = 1,
  Warning = 2,
  Error = 3,
}
export class ValidationModel {
  key = "";
  title = "";
  description = "";
  status = ValidationStatus.Success;
}

@Component({
  selector: "app-sms-action-send-message",
  templateUrl: "./send-message.component.html",
  styleUrls: ["./send-message.component.scss"],
  standalone: false,
})
export class SmsActionSendMessageComponent implements OnInit {
  requestLinkApiPathId = "";
  constructorInfoAreaId = this.constructor.name;
  constructor(
    public coreEnumService: CoreEnumService,
    public smsActionService: SmsActionService,
    private service: CoreModuleSiteUserCreditService,
    private activatedRoute: ActivatedRoute,
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
    this.validationList.push({
      key: "checkCredit",
      title: "اعتبار بررسی شود",
      status: ValidationStatus.Warning,
      description: "اعتبار بررسی شود",
    });
    this.validationList.push({
      key: "message",
      title: "متن پیام وارد شود",
      status: ValidationStatus.Warning,
      description: "متن پیام وارد شود",
    });

    this.validationList.push({
      key: "linkApiPathId",
      title: "مسیر ارسال انتخاب شود",
      status: ValidationStatus.Warning,
      description: "مسیر ارسال انتخاب شود",
    });
    this.validationList.push({
      key: "linkFromNumber",
      title: "شماره فرستنده انتخاب شود",
      status: ValidationStatus.Error,
      description: "شماره فرستنده انتخاب شود",
    });
    this.validationList.push({
      key: "toNumbers",
      title: "شماره گیرنده انتخاب شود",
      status: ValidationStatus.Error,
      description: "شماره گیرنده انتخاب شود",
    });
  }
  timezoneOffset = 0;
  tokenInfo = new TokenInfoModelV3();
  language = environment.languagesDefault;
  @ViewChild("vform", { static: false }) formGroup: FormGroup;
  @ViewChild("Message") message: ElementRef;

  validationList: ValidationModel[] = [];
  receiverNumber: string = "";
  senderNumber: string = "";
  linkApiPathId: string = "";
  linkNumberId: string = "";

  dataModel: SmsApiSendMessageDtoModel = new SmsApiSendMessageDtoModel();
  dataModelResult: ErrorExceptionResult<SmsApiSendResultModel> =
    new ErrorExceptionResult<SmsApiSendResultModel>();
  dataModelCreditResult: ErrorExceptionResult<CoreModuleSiteUserCreditModel> =
    new ErrorExceptionResult<CoreModuleSiteUserCreditModel>();
  dataModelDateByClockStart: DateByClock = new DateByClock();
  dataModelDateByClockExpire: DateByClock = new DateByClock();
  formInfo: FormInfoModel = new FormInfoModel();
  clipboardText = "";

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
    //if (!model || !model.id || model.id.length === 0 || model.id != this.dataModel.linkFromNumber)
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
    } else {
      if (this.requestLinkApiPathId && this.requestLinkApiPathId.length > 0) {
        this.dataModel.linkApiPathId = this.requestLinkApiPathId;
      } else {
        this.dataModel.linkApiPathId = null;
      }
    }
    if (this.dataModel.linkApiPathId?.length > 0) {
      this.validationList.find((x) => x.key === "linkApiPathId").status =
        ValidationStatus.Success;
    } else {
      this.validationList.find((x) => x.key === "linkApiPathId").status =
        ValidationStatus.Error;
    }
  }
  /**
   * onActionValidationStatus
   */
  onActionValidationStatusMessageBodyChange() {
    if (this.dataModel.message?.length > 0) {
      this.validationList.find((x) => x.key === "message").status =
        ValidationStatus.Success;
      this.validationList.find((x) => x.key === "message").description =
        this.dataModel.message;
    } else {
      this.validationList.find((x) => x.key === "message").status =
        ValidationStatus.Error;
    }
    this.cdr.detectChanges();
  }
  onActionValidationStatusToNumbersChange() {
    if (
      this.dataModel.toContactCategories?.length > 0 ||
      this.dataModel.toContactContents?.length > 0
    ) {
      this.validationList.find((x) => x.key === "toNumbers").status =
        ValidationStatus.Success;
    } else if (this.dataModel.toNumbers?.length > 0) {
      this.validationList.find((x) => x.key === "toNumbers").status =
        ValidationStatus.Success;
    } else {
      this.validationList.find((x) => x.key === "toNumbers").status =
        ValidationStatus.Error;
    }
    this.cdr.detectChanges();
  }
  onActionValidationStatusFromNumbersChange() {
    if (this.dataModel.linkFromNumber?.length > 0) {
      this.validationList.find((x) => x.key === "linkFromNumber").status =
        ValidationStatus.Success;
    } else {
      this.validationList.find((x) => x.key === "linkFromNumber").status =
        ValidationStatus.Error;
    }
    this.cdr.detectChanges();
  }
  onActionValidationStatusCheckProcessesChange() {
    var model = this.validationList.find((x) => x.key === "checkProcesses");
    if (model) {
      this.validationList.splice(this.validationList.indexOf(model), 1);
    }
    if (this.dataModel.checkProcesses) {
      this.validationList.push({
        key: "checkProcesses",
        title: "ارسال در حال شبیه سازی  می باشد",
        status: ValidationStatus.info,
        description: "ارسال در حال شبیه سازی  می باشد",
      });
    } else {
      this.validationList.push({
        key: "checkProcesses",
        title: "ارسال در حالت معمول می باشد",
        status: ValidationStatus.Success,
        description: "ارسال در حالت معمول می باشد",
      });
    }
    this.cdr.detectChanges();
  }
  onActionValidationStatusCheckCredit() {
    if (
      this.dataModelCreditResult.isSuccess &&
      this.dataModelCreditResult.item.credit > 0
    ) {
      this.validationList.find((x) => x.key === "checkCredit").title =
        "حداقل اعتبار برای ارسال پیام بررسی شد : " +
        this.dataModelCreditResult.item.credit;
      this.validationList.find((x) => x.key === "checkCredit").status =
        ValidationStatus.info;
    } else {
      this.validationList.find((x) => x.key === "checkCredit").title =
        "اعتبار بررسی شود";
      this.validationList.find((x) => x.key === "checkCredit").status =
        ValidationStatus.Error;
    }
    this.cdr.detectChanges();
  }
  onActionValidationStatusCronChange(event: any) {
    this.dataModel.scheduleCron = event;
    var model = this.validationList.find((x) => x.key === "scheduleCron");
    if (model) {
      this.validationList.splice(this.validationList.indexOf(model), 1);
    }
    if (this.dataModel.scheduleCron) {
      this.validationList.push({
        key: "scheduleCron",
        title: "زمانبندی ارسال فعال است",
        status: ValidationStatus.info,
        description: "زمانبندی ارسال فعال است",
      });
    } else {
      this.validationList.push({
        key: "scheduleCron",
        title: "زمانبندی ارسال غیر فعال است",
        status: ValidationStatus.Success,
        description: "زمانبندی ارسال غیر فعال است",
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
      if (this.dataModel.message.length > 0)
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
    // this.dataModel.scheduleSendStart.setMinutes(this.dataModel.scheduleSendStart.getMinutes() + this.timezoneOffset);
    // this.dataModel.scheduleSendExpire.setMinutes(this.dataModel.scheduleSendExpire.getMinutes() + this.timezoneOffset);
    //this.dataModel.scheduleSendStart=new Date(this.dataModel.scheduleSendStart.getTime() + this.timezoneOffset*60*1000);
    //this.dataModel.scheduleSendExpire=new Date(this.dataModel.scheduleSendExpire.getTime() + this.timezoneOffset*60*1000);

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
      this.validationList.find((x) => x.status === ValidationStatus.Error) !==
      undefined
    );
  }
}
