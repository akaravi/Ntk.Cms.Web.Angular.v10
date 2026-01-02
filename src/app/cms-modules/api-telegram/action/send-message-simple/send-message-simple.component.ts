import { ChangeDetectorRef, Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import {
  ApiTelegramBotConfigService,
  CoreEnumService,
} from "ntk-cms-api";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
import { ApiTelegramActionSendMessageComponent } from "../send-message/send-message.component";

@Component({
  selector: "app-apitelegram-action-send-message-simple",
  templateUrl: "./send-message-simple.component.html",
  styleUrls: ["./send-message-simple.component.scss"],
  standalone: false,
})
export class ApiTelegramActionSendMessageSimpleComponent extends ApiTelegramActionSendMessageComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ApiTelegramActionSendMessageSimpleComponent>,
    public coreEnumService: CoreEnumService,
    public apiTelegramBotConfigService: ApiTelegramBotConfigService,
    private cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
  ) {
    super(data, dialogRef, coreEnumService, apiTelegramBotConfigService, cmsToastrService, publicHelper, cdr, translate);
  }
}
