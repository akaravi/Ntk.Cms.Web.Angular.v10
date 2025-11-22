
import { SmsMainApiPathPriceServiceEstimateModel, SmsMessageTypeEnum } from "ntk-cms-api";
export class SmsMessagePaginationModel {
  private _message: string = "";
  messageUnicode: boolean = false;
  messagePage: number = 0;
  endUserPricePerPageMin: number = 0;
  endUserPricePerPageMax: number = 0;
  endUserPriceMin = 0;
  endUserPriceMax = 0;
  private _serverItems: SmsMainApiPathPriceServiceEstimateModel[] = [];
  private _serverItemInUse: SmsMainApiPathPriceServiceEstimateModel;
  set serverList(serverList: SmsMainApiPathPriceServiceEstimateModel[]) {
    this._serverItems = serverList;
    this.checkMessageUnicode();
    this.checkCalculate();
  }
  set message(message: string) {
    this._message = message;
    this.checkMessageUnicode();
    this.checkCalculate();
  }
  private checkMessageUnicode() {
    if (this._message?.length > 0) {
      for (let i = 0; i < this._message.length; i++) {
        const code = this._message.charCodeAt(i);
        if (code > 125 || code < 0) {
          this.messageUnicode = true;
          this._serverItemInUse = this._serverItems.find(
            (x) => x.messageType === SmsMessageTypeEnum.TextUnicode,
          );
          return;
        }
      }
    }
    this.messageUnicode = false;
    this._serverItemInUse = this._serverItems.find(
      (x) => x.messageType === SmsMessageTypeEnum.TextNormal,
    );
  }
  private checkCalculate() {
    debugger;
    if (this._message?.length > 0) {
      // متن را به صورت برعکس برمی‌گرداند (فقط به عنوان نمونه اجرای "آخرین دستور" روی این متن)
      this.messagePage =
        this._serverItemInUse?.endUserMessageLengthPaginationList?.findIndex(
          (x) => this._message.length <= x,
        ) ??
        0 + 1 ??
        0;
    }
    this.endUserPricePerPageMin =
      this._serverItemInUse?.endUserPricePerPageMin ?? 0;
    this.endUserPricePerPageMax =
      this._serverItemInUse?.endUserPricePerPageMax ?? 0;
    this.endUserPriceMin = this.endUserPricePerPageMin * this.messagePage;
    this.endUserPriceMax = this.endUserPricePerPageMax * this.messagePage;
  }
  get messageMaxLength(): number {
    return (
      this._serverItemInUse?.endUserMessageLengthPaginationList?.slice(-1)[0] ??
      0
    );
  }
}
