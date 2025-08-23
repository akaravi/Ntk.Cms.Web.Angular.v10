import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { ErrorExceptionResultBase } from "ntk-cms-api";
import { Observable, of } from "rxjs";
import { catchError, map, take } from "rxjs/operators";

// Toast types enum
export enum ToastType {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

// Toast configuration interface
export interface ToastConfig {
  messageKeys: string[];
  titleKeys?: string[];
  type: ToastType;
  includeTimestamp?: boolean;
  customMessage?: string;
  customTitle?: string;
}

// Translation result interface
interface TranslationResult {
  message: string;
  title: string;
}

@Injectable({
  providedIn: "root",
})
export class CmsToastrService {
  private readonly NEWLINE_REGEX = /(?:\r\n|\r|\n)/g;
  private readonly HTML_BREAK = "<br>";

  constructor(
    public toastr: ToastrService,
    private translate: TranslateService,
  ) {}

  /**
   * Get current timestamp for toast messages
   */
  private getTimestamp(): string {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")} => `;
  }

  /**
   * Format message by replacing newlines with HTML breaks
   */
  private formatMessage(message: string): string {
    return message.replace(this.NEWLINE_REGEX, this.HTML_BREAK);
  }

  /**
   * Get translations with error handling and fallback
   */
  private getTranslations(keys: string[]): Observable<TranslationResult> {
    return this.translate.get(keys).pipe(
      take(1),
      map((translations: any) => {
        const message = translations[keys[0]] || "Message not found";
        const title = translations[keys[1]] || "System Message";
        return { message, title };
      }),
      catchError((error) => {
        console.error("Translation error:", error);
        return of({
          message: "Translation error occurred",
          title: "Error",
        });
      }),
    );
  }

  /**
   * Show toast with configuration
   */
  private showToast(config: ToastConfig): void {
    const {
      messageKeys,
      titleKeys,
      type,
      includeTimestamp = false,
      customMessage,
      customTitle,
    } = config;

    if (customMessage && customTitle) {
      // Use custom message and title
      const message = this.formatMessage(customMessage);
      const title = includeTimestamp
        ? this.getTimestamp() + customTitle
        : customTitle;
      this.showToastByType(type, message, title);
      return;
    }

    // Get translations
    const allKeys = customMessage
      ? messageKeys
      : [...messageKeys, ...(titleKeys || [])];

    this.getTranslations(allKeys).subscribe(({ message, title }) => {
      const formattedMessage = this.formatMessage(message);
      const finalTitle = includeTimestamp ? this.getTimestamp() + title : title;
      this.showToastByType(type, formattedMessage, finalTitle);
    });
  }

  /**
   * Show toast based on type
   */
  private showToastByType(
    type: ToastType,
    message: string,
    title: string,
  ): void {
    switch (type) {
      case ToastType.SUCCESS:
        this.toastr.success(message, title);
        break;
      case ToastType.ERROR:
        this.toastr.error(message, title);
        break;
      case ToastType.WARNING:
        this.toastr.warning(message, title);
        break;
      case ToastType.INFO:
        this.toastr.info(message, title);
        break;
    }
  }

  /**
   * Show toast with custom message and optional additional info
   */
  private showToastWithCustomInfo(
    config: ToastConfig,
    additionalInfo?: string,
  ): void {
    if (additionalInfo) {
      // Modify the message to include additional info
      const originalConfig = { ...config };
      config.customMessage = `${config.customMessage} ${additionalInfo}`;
    }
    this.showToast(config);
  }

  // ===== SUCCESS METHODS =====

  typeSuccessAdd(): void {
    this.showToast({
      messageKeys: ["ERRORMESSAGE.MESSAGE.typeSuccessAdd"],
      titleKeys: ["ERRORMESSAGE.TITLE.typeSuccessAdd"],
      type: ToastType.SUCCESS,
    });
  }

  typeSuccessEdit(): void {
    this.showToast({
      messageKeys: ["ERRORMESSAGE.MESSAGE.typeSuccessEdit"],
      titleKeys: ["ERRORMESSAGE.TITLE.typeSuccessEdit"],
      type: ToastType.SUCCESS,
    });
  }

  typeSuccessRemove(): void {
    this.showToast({
      messageKeys: ["ERRORMESSAGE.MESSAGE.typeSuccessRemove"],
      titleKeys: ["ERRORMESSAGE.TITLE.typeSuccessRemove"],
      type: ToastType.SUCCESS,
    });
  }

  typeSuccessLogin(): void {
    this.showToast({
      messageKeys: ["ERRORMESSAGE.MESSAGE.typeSuccessLogin"],
      titleKeys: ["ERRORMESSAGE.TITLE.typeSuccessLogin"],
      type: ToastType.SUCCESS,
    });
  }

  typeSuccessLogout(): void {
    this.showToast({
      messageKeys: ["ERRORMESSAGE.MESSAGE.typeSuccessLogout"],
      titleKeys: ["ERRORMESSAGE.TITLE.typeSuccessLogout"],
      type: ToastType.SUCCESS,
    });
  }

  typeSuccessSelected(): void {
    this.showToast({
      messageKeys: ["ERRORMESSAGE.MESSAGE.typeSuccessSelected"],
      titleKeys: ["ERRORMESSAGE.TITLE.typeSuccessSelected"],
      type: ToastType.SUCCESS,
    });
  }

  typeSuccessCopedToClipboard(): void {
    this.showToast({
      messageKeys: ["ERRORMESSAGE.MESSAGE.typeSuccessCopedToClipboard"],
      titleKeys: ["ERRORMESSAGE.TITLE.typeSuccessCopedToClipboard"],
      type: ToastType.SUCCESS,
    });
  }

  typeSuccessAddSimilar(): void {
    this.showToast({
      messageKeys: ["ERRORMESSAGE.MESSAGE.typeSuccessAddSimilar"],
      titleKeys: ["ERRORMESSAGE.TITLE.typeSuccessAddSimilar"],
      type: ToastType.SUCCESS,
    });
  }

  typeSuccessAddOtherInfo(): void {
    this.showToast({
      messageKeys: ["ERRORMESSAGE.MESSAGE.typeSuccessAddOtherInfo"],
      titleKeys: ["ERRORMESSAGE.TITLE.typeSuccessAddOtherInfo"],
      type: ToastType.SUCCESS,
    });
  }

  typeSuccessAddTag(): void {
    this.showToast({
      messageKeys: ["ERRORMESSAGE.MESSAGE.typeSuccessAddTag"],
      titleKeys: ["ERRORMESSAGE.TITLE.typeSuccessAddTag"],
      type: ToastType.SUCCESS,
    });
  }

  typeSuccessRemoveTag(): void {
    this.showToast({
      messageKeys: ["ERRORMESSAGE.MESSAGE.typeSuccessRemoveTag"],
      titleKeys: ["ERRORMESSAGE.TITLE.typeSuccessRemoveTag"],
      type: ToastType.SUCCESS,
    });
  }

  typeSuccessSetStatus(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeSuccessSetStatus"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Success",
          "ERRORMESSAGE.TITLE.typeSuccessSetStatus",
        ],
        type: ToastType.SUCCESS,
      },
      strMessage,
    );
  }

  typeSuccessRemoveOtherInfo(): void {
    this.showToast({
      messageKeys: ["ERRORMESSAGE.MESSAGE.typeSuccessRemoveOtherInfo"],
      titleKeys: ["ERRORMESSAGE.TITLE.typeSuccessRemoveOtherInfo"],
      type: ToastType.SUCCESS,
    });
  }

  typeSuccessRemoveSimilar(): void {
    this.showToast({
      messageKeys: ["ERRORMESSAGE.MESSAGE.typeSuccessRemoveSimilar"],
      titleKeys: ["ERRORMESSAGE.TITLE.typeSuccessRemoveSimilar"],
      type: ToastType.SUCCESS,
    });
  }

  typeSuccessChangePassword(): void {
    this.showToast({
      messageKeys: ["ERRORMESSAGE.MESSAGE.typeSuccessChangePassword"],
      titleKeys: ["ERRORMESSAGE.TITLE.typeSuccessChangePassword"],
      type: ToastType.SUCCESS,
    });
  }

  typeSuccessMove(): void {
    this.showToast({
      messageKeys: ["ERRORMESSAGE.MESSAGE.typeSuccessMove"],
      titleKeys: ["ERRORMESSAGE.TITLE.typeSuccessMove"],
      type: ToastType.SUCCESS,
    });
  }

  typeSuccessEmailConfirm(): void {
    this.showToast({
      messageKeys: ["ERRORMESSAGE.MESSAGE.typeSuccessEmailConfirm"],
      titleKeys: ["ERRORMESSAGE.TITLE.typeSuccessEmailConfirm"],
      type: ToastType.SUCCESS,
    });
  }

  typeSuccessMobileConfirm(): void {
    this.showToast({
      messageKeys: ["ERRORMESSAGE.MESSAGE.typeSuccessMobileConfirm"],
      titleKeys: ["ERRORMESSAGE.TITLE.typeSuccessMobileConfirm"],
      type: ToastType.SUCCESS,
    });
  }

  typeSuccessRegistery(): void {
    this.showToast({
      messageKeys: ["ERRORMESSAGE.MESSAGE.typeSuccessRegistery"],
      titleKeys: ["ERRORMESSAGE.TITLE.typeSuccessRegistery"],
      type: ToastType.SUCCESS,
    });
  }

  typeSuccessAppBuild(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeSuccessAppBuild"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Message",
          "ERRORMESSAGE.TITLE.typeSuccessAppBuild",
        ],
        type: ToastType.SUCCESS,
      },
      strMessage,
    );
  }

  typeSuccessAppUpload(): void {
    this.showToast({
      messageKeys: ["ERRORMESSAGE.MESSAGE.typeSuccessAppUpload"],
      titleKeys: ["ERRORMESSAGE.TITLE.typeSuccessAppUpload"],
      type: ToastType.SUCCESS,
    });
  }

  typeSuccessAccessChange(): void {
    this.showToast({
      messageKeys: ["ERRORMESSAGE.MESSAGE.typeSuccessAccessChange"],
      titleKeys: ["ERRORMESSAGE.TITLE.typeSuccessAccessChange"],
      type: ToastType.SUCCESS,
    });
  }

  typeSuccessAddFirstSite(): void {
    this.showToast({
      messageKeys: ["ERRORMESSAGE.MESSAGE.typeSuccessAddFirstSite"],
      titleKeys: ["ERRORMESSAGE.TITLE.typeSuccessAddFirstSite"],
      type: ToastType.SUCCESS,
    });
  }

  typeSuccessSend(): void {
    this.showToast({
      messageKeys: ["ERRORMESSAGE.MESSAGE.typeSuccessSend"],
      titleKeys: ["ERRORMESSAGE.TITLE.typeSuccessSend"],
      type: ToastType.SUCCESS,
      includeTimestamp: false,
    });
  }

  typeOrderActionLogout(): void {
    this.showToast({
      messageKeys: ["ERRORMESSAGE.MESSAGE.typeOrderActionLogout"],
      titleKeys: ["ERRORMESSAGE.TITLE.typeOrderActionLogout"],
      type: ToastType.SUCCESS,
    });
  }

  typeSuccessMessage(message: string): void {
    this.showToast({
      messageKeys: [],
      type: ToastType.SUCCESS,
      customMessage: message,
      customTitle: "Success!",
    });
  }

  // ===== ERROR METHODS =====

  typeErrorInternetConnection(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeErrorInternetConnection"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorInternetConnection",
        ],
        type: ToastType.ERROR,
      },
      strMessage,
    );
  }

  typeErrorUserToken(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeErrorUserToken"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorUserToken",
        ],
        type: ToastType.ERROR,
      },
      strMessage,
    );
  }

  typeErrorAccessChange(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeErrorAccessChange"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorAccessChange",
        ],
        type: ToastType.ERROR,
      },
      strMessage,
    );
  }

  typeErrorDeviceToken(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeErrorDeviceToken"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorDeviceToken",
        ],
        type: ToastType.ERROR,
      },
      strMessage,
    );
  }

  typeErrorComponentAction(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeErrorComponentAction"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorComponentAction",
        ],
        type: ToastType.ERROR,
      },
      strMessage,
    );
  }

  typeErrorFormInvalid(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeErrorFormInvalid"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorFormInvalid",
        ],
        type: ToastType.ERROR,
      },
      strMessage,
    );
  }

  typeErrorGetAccess(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeErrorGetAccess"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorGetAccess",
        ],
        type: ToastType.ERROR,
      },
      strMessage,
    );
  }

  typeErrorAccessAdd(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeErrorAccessAdd"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorAccessAdd",
        ],
        type: ToastType.ERROR,
      },
      strMessage,
    );
  }

  typeErrorAccessWatch(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeErrorAccessWatch"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorAccessWatch",
        ],
        type: ToastType.ERROR,
      },
      strMessage,
    );
  }

  typeErrorAccessEdit(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeErrorAccessEdit"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorAccessEdit",
        ],
        type: ToastType.ERROR,
      },
      strMessage,
    );
  }

  typeErrorAccessDelete(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeErrorAccessDelete"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorAccessDelete",
        ],
        type: ToastType.ERROR,
      },
      strMessage,
    );
  }

  typeErrorGetOne(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeErrorGetOne"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorGetOne",
        ],
        type: ToastType.ERROR,
      },
      strMessage,
    );
  }

  typeErrorSetStatus(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeErrorSetStatus"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorSetStatus",
        ],
        type: ToastType.ERROR,
      },
      strMessage,
    );
  }

  typeErrorGetAll(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeErrorGetAll"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorGetAll",
        ],
        type: ToastType.ERROR,
      },
      strMessage,
    );
  }

  typeErrorAdd(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeErrorAdd"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorAdd",
        ],
        type: ToastType.ERROR,
      },
      strMessage,
    );
  }

  typeErrorAddSimilar(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeErrorAddSimilar"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorAddSimilar",
        ],
        type: ToastType.ERROR,
      },
      strMessage,
    );
  }

  typeErrorAddOtherInfo(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeErrorAddOtherInfo"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorAddOtherInfo",
        ],
        type: ToastType.ERROR,
      },
      strMessage,
    );
  }

  typeErrorAddTag(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeErrorAddTag"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorAddTag",
        ],
        type: ToastType.ERROR,
      },
      strMessage,
    );
  }

  typeErrorRemoveTag(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeErrorRemoveTag"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorRemoveTag",
        ],
        type: ToastType.ERROR,
      },
      strMessage,
    );
  }

  typeErrorRemoveOtherInfo(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeErrorRemoveOtherInfo"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorRemoveOtherInfo",
        ],
        type: ToastType.ERROR,
      },
      strMessage,
    );
  }

  typeErrorRemoveSimilar(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeErrorRemoveSimilar"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorRemoveSimilar",
        ],
        type: ToastType.ERROR,
      },
      strMessage,
    );
  }

  typeErrorGetCpatcha(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeErrorGetCpatcha"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorGetCpatcha",
        ],
        type: ToastType.ERROR,
      },
      strMessage,
    );
  }

  typeErrorAddDuplicate(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeErrorAddDuplicate"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorAddDuplicate",
        ],
        type: ToastType.ERROR,
      },
      strMessage,
    );
  }

  typeErrorRemove(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeErrorRemove"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorRemove",
        ],
        type: ToastType.ERROR,
      },
      strMessage,
    );
  }

  typeErrorEdit(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeErrorEdit"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorEdit",
        ],
        type: ToastType.ERROR,
      },
      strMessage,
    );
  }

  typeErrorMove(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeErrorMove"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorMove",
        ],
        type: ToastType.ERROR,
      },
      strMessage,
    );
  }

  typeErrorLogin(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeErrorLogin"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorLogin",
        ],
        type: ToastType.ERROR,
      },
      strMessage,
    );
  }

  typeErrorEditRowIsNull(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeErrorEditRowIsNull"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorEditRowIsNull",
        ],
        type: ToastType.ERROR,
      },
      strMessage,
    );
  }

  typeErrorDeleteRowIsNull(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeErrorDeleteRowIsNull"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorDeleteRowIsNull",
        ],
        type: ToastType.ERROR,
      },
      strMessage,
    );
  }

  typeErrorAddRowParentIsNull(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeErrorAddRowParentIsNull"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorAddRowParentIsNull",
        ],
        type: ToastType.ERROR,
      },
      strMessage,
    );
  }

  typeErrorGetPosition(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeErrorGetPosition"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorGetPosition",
        ],
        type: ToastType.ERROR,
      },
      strMessage,
    );
  }

  typeErrorLogout(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeErrorLogout"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorLogout",
        ],
        type: ToastType.ERROR,
      },
      strMessage,
    );
  }

  typeErrorRegistery(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeErrorRegistery"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorRegistery",
        ],
        type: ToastType.ERROR,
      },
      strMessage,
    );
  }

  typeErrorSelected(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeErrorSelected"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorSelected",
        ],
        type: ToastType.ERROR,
      },
      strMessage,
    );
  }

  typeErrorSelectedRow(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeErrorSelectedRow"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorSelectedRow",
        ],
        type: ToastType.ERROR,
      },
      strMessage,
    );
  }

  typeErrorForNotComplete(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeErrorForNotComplete"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorForNotComplete",
        ],
        type: ToastType.ERROR,
      },
      strMessage,
    );
  }

  typeErrorMessage(message: string, title: string = "Error!"): void {
    this.showToast({
      messageKeys: [],
      type: ToastType.ERROR,
      customMessage: message,
      customTitle: title,
    });
  }

  typeError(model: any, strMessage: string = ""): void {
    console.log("Error", model);

    if (!model || model == undefined || model == null) {
      this.showToast({
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeError"],
        titleKeys: ["ERRORMESSAGE.TITLE.typeError"],
        type: ToastType.ERROR,
        customMessage: `ERRORMESSAGE.MESSAGE.typeError ${strMessage}\n${model?.errorTypeTitle || ""}`,
      });
      return;
    }

    let errorExceptionResult: ErrorExceptionResultBase;
    if (model.error) {
      errorExceptionResult = model.error;
      if (errorExceptionResult && errorExceptionResult.status === 401) {
        this.showToast({
          messageKeys: ["ERRORMESSAGE.MESSAGE.typeError_login"],
          titleKeys: ["ERRORMESSAGE.TITLE.typeError"],
          type: ToastType.ERROR,
          customMessage: `ERRORMESSAGE.MESSAGE.typeError_login ${strMessage}`,
        });
        return;
      }
    }

    if (model.errors) {
      console.log(model.errors);
      this.showToast({
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeError_viewConsoleLog"],
        titleKeys: ["ERRORMESSAGE.TITLE.typeError"],
        type: ToastType.ERROR,
        customMessage: `ERRORMESSAGE.MESSAGE.typeError_viewConsoleLog ${strMessage}`,
      });
      return;
    }

    if (model && model.errorMessage) {
      this.showToast({
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeError"],
        titleKeys: ["ERRORMESSAGE.TITLE.typeError"],
        type: ToastType.ERROR,
        customMessage: `ERRORMESSAGE.MESSAGE.typeError ${strMessage}`,
      });
      return;
    }

    const finalMessage =
      model.message ||
      (model.status ? `${model.status} - ${model.statusText}` : "Server error");

    this.showToast({
      messageKeys: ["ERRORMESSAGE.MESSAGE.typeError"],
      titleKeys: ["ERRORMESSAGE.TITLE.typeError"],
      type: ToastType.ERROR,
      customMessage: `ERRORMESSAGE.MESSAGE.typeError ${finalMessage}`,
    });
  }

  // ===== WARNING METHODS =====

  typeWarningRecordStatusNoAvailable(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: [
          "ERRORMESSAGE.MESSAGE.typeWarningRecordStatusNoAvailable",
        ],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorSelected",
        ],
        type: ToastType.WARNING,
      },
      strMessage,
    );
  }

  typeWarningMessage(message: string, title: string = "Warning!"): void {
    this.showToast({
      messageKeys: [],
      type: ToastType.WARNING,
      customMessage: message,
      customTitle: title,
    });
  }

  typeWarningSelected(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeErrorSelected"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorSelected",
        ],
        type: ToastType.WARNING,
      },
      strMessage,
    );
  }

  typeWarning(strMessage: string = ""): void {
    this.showToastWithCustomInfo(
      {
        messageKeys: ["ERRORMESSAGE.MESSAGE.typeErrorSelected"],
        titleKeys: [
          "ERRORMESSAGE.TITLE.Error",
          "ERRORMESSAGE.TITLE.typeErrorSelected",
        ],
        type: ToastType.WARNING,
      },
      strMessage,
    );
  }

  // ===== HELPER METHODS =====

  /**
   * Validate translation key exists
   */
  private validateTranslationKey(key: string): boolean {
    // This method can be used to check if translation keys exist
    // Implementation can be added later for better error handling
    return true;
  }

  /**
   * Get translation with fallback
   */
  private getTranslationWithFallback(
    keys: string[],
    fallbackMessage: string = "Message not found",
  ): void {
    this.getTranslations(keys).subscribe(({ message, title }) => {
      const finalMessage = message || fallbackMessage;
      const finalTitle = title || "System Message";
      this.toastr.info(finalMessage, this.getTimestamp() + finalTitle);
    });
  }
}
