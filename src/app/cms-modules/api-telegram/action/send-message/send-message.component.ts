import { FormInfoModel } from "../../../../core/models/formInfoModel";
import { FormSubmitedStatusEnum } from "../../../../core/models/formSubmitedStatusEnum";
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
import {ApiTelegramBotConfigModel,
  ApiTelegramBotConfigService,
  ApiTelegramSendMessageTodoModel,
  CoreEnumService,
  DataFieldInfoModel,
  ErrorExceptionResultBase} from "ntk-cms-api";
import { TreeModel } from "ntk-cms-filemanager";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
export class CompModel {
  ChatIds: string;
}
@Component({
  selector: "app-apitelegram-action-send-message",
  templateUrl: "./send-message.component.html",
  styleUrls: ["./send-message.component.scss"],
  standalone: false,
})
export class ApiTelegramActionSendMessageComponent implements OnInit {
  requestLinkBotConfigId = 0;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected dialogRef: MatDialogRef<ApiTelegramActionSendMessageComponent>,
    public coreEnumService: CoreEnumService,
    public apiTelegramBotConfigService: ApiTelegramBotConfigService,
    protected cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    protected cdr: ChangeDetectorRef,
    public translate: TranslateService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;

    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();
  compModel: CompModel = new CompModel();
  selectFileTypeMainImage = ["jpg", "jpeg", "png"];
  fileManagerTree: TreeModel;
  appLanguage = "fa";

  dataModelResult: ErrorExceptionResultBase = new ErrorExceptionResultBase();
  dataModel: ApiTelegramSendMessageTodoModel =
    new ApiTelegramSendMessageTodoModel();
  formInfo: FormInfoModel = new FormInfoModel();

  fileManagerOpenForm = false;

  ngOnInit(): void {
    if (this.data) {
      this.requestLinkBotConfigId = +this.data.linkBotConfigId || 0;
      this.compModel.ChatIds = this.data.ChatId + "";
    }
    if (this.requestLinkBotConfigId > 0) {
      this.dataModel.botId = this.requestLinkBotConfigId;
    }
    this.translate.get("TITLE.Send_Message").subscribe((str: string) => {
      this.formInfo.formTitle = str;
    });
  }

  ActionSendMessage(): void {
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

    this.apiTelegramBotConfigService
      .ServiceSendMessage(this.dataModel)
      .subscribe({
        next: (ret) => {
          this.formInfo.submitButtonEnabled = true;
          this.dataModelResult = ret;
          if (ret.isSuccess) {
            this.translate
              .get("MESSAGE.registration_completed_successfully")
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
            this.cmsToastrService.typeSuccessAdd();
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
  onFormSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }
    this.dataModel.chatId = [];
    if (this.compModel.ChatIds && this.compModel.ChatIds.length > 0) {
      let listChatId = this.publicHelper.SplitAllChar(this.compModel.ChatIds);
      listChatId.forEach((element) => {
        let id = +element || 0;
        if (id > 0) {
          this.dataModel.chatId.push(id);
        }
      });
    }
    if (this.dataModel.chatId.length == 0) {
      this.translate
        .get("MESSAGE.Recipient_list_is_not_valid")
        .subscribe((str: string) => {
          this.cmsToastrService.typeWarning(str);
        });
      return;
    }
    this.formInfo.submitButtonEnabled = false;
    this.ActionSendMessage();
  }

  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }
  onActionSelectorSelect(model: ApiTelegramBotConfigModel | null): void {
    if (!model || model.id <= 0) {
      this.translate
        .get("MESSAGE.Select_the_Telegram_bot")
        .subscribe((str: string) => {
          this.cmsToastrService.typeErrorSelected(str);
        });
      return;
    }
    this.dataModel.botId = model.id;
  }
}
