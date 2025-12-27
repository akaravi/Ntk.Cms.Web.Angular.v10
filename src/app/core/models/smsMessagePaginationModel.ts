import {
  SmsMainApiPathPriceEstimateModel,
  SmsMessageTypeEnum,
} from "ntk-cms-api";
export class SmsMessagePaginationModel {
  private _message: string = "";
  messageLength: number = 0;
  messageMaxLength: number = 0;
  messageUnicode: boolean = false;
  messagePage: number = 0;
  messageMaxPage: number = 0;
  messageAddTextFirst: string = "";
  messageAddTextEnd: string = "";
  endUserPricePerPageMin: number = 0;
  endUserPricePerPageMax: number = 0;
  endUserPriceMin = 0;
  endUserPriceMax = 0;

  private _serverItems: SmsMainApiPathPriceEstimateModel[] = [];
  private _serverItemInUse: SmsMainApiPathPriceEstimateModel;
  set serverList(serverList: SmsMainApiPathPriceEstimateModel[]) {
    this._serverItems = serverList;
    this.checkMessageUnicode();
    this.checkCalculate();
  }
  set message(message: string) {
    this._message = message;
    if (this.messageAddTextFirst?.length > 0)
      this._message = this.messageAddTextFirst + this._message;
    if (this.messageAddTextEnd?.length > 0)
      this._message = this._message + this.messageAddTextEnd;
    this.checkMessageUnicode();
    this.checkCalculate();
  }
  private checkMessageUnicode() {
    if (this._message?.length > 0) {
      for (let i = 0; i < this._message.length; i++) {
        const code = this._message.charCodeAt(i);
        if (code > 125 || code < 0) {
          this.messageUnicode = true;
          this._serverItemInUse =
            this._serverItems.find(
              (x) => x.messageType === SmsMessageTypeEnum.TextUnicode,
            ) ?? new SmsMainApiPathPriceEstimateModel();
          return;
        }
      }
    }
    this.messageUnicode = false;
    this._serverItemInUse =
      this._serverItems.find(
        (x) => x.messageType === SmsMessageTypeEnum.TextNormal,
      ) ?? new SmsMainApiPathPriceEstimateModel();
  }
  private checkCalculate() {
    this.messageLength = this._message?.length ?? 0;
    this.messageMaxLength =
      this._serverItemInUse?.endUserMessageLengthPaginationList?.slice(-1)[0] ??
      0;
    this.messagePage = 0;
    if (this.messageLength > 0) {
      const index =
        this._serverItemInUse?.endUserMessageLengthPaginationList?.findIndex(
          (x) => x >= this.messageLength,
        ) ?? -1;

      if (index >= 0) {
        this.messagePage = index + 1;
      }
    }
    this.messageMaxPage =
      this._serverItemInUse?.endUserMessageLengthPaginationList?.length ?? 0;
    this.endUserPricePerPageMin =
      this._serverItemInUse?.endUserPricePerPageMin ?? 0;
    this.endUserPricePerPageMax =
      this._serverItemInUse?.endUserPricePerPageMax ?? 0;
    this.endUserPriceMin = this.endUserPricePerPageMin * this.messagePage;
    this.endUserPriceMax = this.endUserPricePerPageMax * this.messagePage;
  }
}
