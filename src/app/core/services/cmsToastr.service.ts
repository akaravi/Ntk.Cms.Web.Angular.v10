import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ErrorExceptionResultBase } from 'ntk-cms-api';

@Injectable({
  providedIn: 'root'
})
export class CmsToastrService {
  constructor(
    public toastr: ToastrService,
    public translate: TranslateService,
  ) {

  }
  private now(): string {
    const myDate = new Date();
    const retStr = myDate.getHours() + ' : ' + myDate.getMinutes() + ' : ' + myDate.getSeconds() + ' => ';
    return '';
  }
  // typeOrderAction
  typeOrderActionLogout(): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeOrderActionLogout', 'ERRORMESSAGE.TITLE.typeOrderActionLogout']).subscribe((str: string[]) => {
      this.toastr.success(str[0], this.now() + str[1]);
    });
  }
  // Success Type
  typeSuccessAccessChange(): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeSuccessAccessChange', 'ERRORMESSAGE.TITLE.typeSuccessAccessChange']).subscribe((str: string[]) => {
      this.toastr.success(str[0], this.now() + str[1]);
    });
  }
  typeSuccessAddFirstSite(): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeSuccessAddFirstSite', 'ERRORMESSAGE.TITLE.typeSuccessAddFirstSite']).subscribe((str: string[]) => {
      this.toastr.success(str[0], this.now() + str[1]);
    });
  }
  typeSuccessMessage(message: string): void {
    this.toastr.success(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + 'Success!');
  }
  typeSuccessCopedToClipboard(): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeSuccessCopedToClipboard', 'ERRORMESSAGE.TITLE.typeSuccessAdd']).subscribe((str: string[]) => {
      this.toastr.success(str[0], this.now() + str[1]);
    });
  }
  typeSuccessAdd(): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeSuccessAdd', 'ERRORMESSAGE.TITLE.typeSuccessAdd']).subscribe((str: string[]) => {
      this.toastr.success(str[0], this.now() + str[1]);
    });
  }
  typeSuccessSend(): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeSuccessSend', 'ERRORMESSAGE.TITLE.typeSuccessSend']).subscribe((str: string[]) => {
      this.toastr.success(str[0], str[1]);
    });
  }
  typeSuccessAddSimilar(): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeSuccessAddSimilar', 'ERRORMESSAGE.TITLE.typeSuccessAddSimilar']).subscribe((str: string[]) => {
      this.toastr.success(str[0], str[1]);
    });
  }
  typeSuccessAddOtherInfo(): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeSuccessAddOtherInfo', 'ERRORMESSAGE.TITLE.typeSuccessAddOtherInfo']).subscribe((str: string[]) => {
      this.toastr.success(str[0], str[1]);
    });
  }
  typeSuccessAddTag(): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeSuccessAddTag', 'ERRORMESSAGE.TITLE.typeSuccessAddTag']).subscribe((str: string[]) => {
      this.toastr.success(str[0], str[1]);
    });
  }
  typeSuccessRemoveTag(): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeSuccessRemoveTag', 'ERRORMESSAGE.TITLE.typeSuccessRemoveTag']).subscribe((str: string[]) => {
      this.toastr.success(str[0], str[1]);
    });
  }
  typeSuccessSetStatus(strMessage: string): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeSuccessSetStatus', 'ERRORMESSAGE.TITLE.Success', 'ERRORMESSAGE.TITLE.typeSuccessSetStatus']).subscribe((str: string[]) => {
      let message = str[0];
      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.success(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }
  typeSuccessRemoveOtherInfo(): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeSuccessRemoveOtherInfo', 'ERRORMESSAGE.TITLE.typeSuccessRemoveOtherInfo']).subscribe((str: string[]) => {
      this.toastr.success(str[0], str[1]);
    });
  }
  typeSuccessRemoveSimilar(): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeSuccessRemoveSimilar', 'ERRORMESSAGE.TITLE.typeSuccessRemoveSimilar']).subscribe((str: string[]) => {
      this.toastr.success(str[0], str[1]);
    });
  }
  typeSuccessRemove(): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeSuccessRemove', 'ERRORMESSAGE.TITLE.typeSuccessRemove']).subscribe((str: string[]) => {
      this.toastr.success(str[0], str[1]);
    });
  }

  typeSuccessEdit(): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeSuccessEdit', 'ERRORMESSAGE.TITLE.typeSuccessEdit']).subscribe((str: string[]) => {
      this.toastr.success(str[0], str[1]);
    });
  }
  typeSuccessChangePassword(): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeSuccessChangePassword', 'ERRORMESSAGE.TITLE.typeSuccessChangePassword']).subscribe((str: string[]) => {
      this.toastr.success(str[0], str[1]);
    });
  }
  typeSuccessMove(): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeSuccessMove', 'ERRORMESSAGE.TITLE.typeSuccessMove']).subscribe((str: string[]) => {
      this.toastr.success(str[0], str[1]);
    });
  }
  typeSuccessLogin(): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeSuccessLogin', 'ERRORMESSAGE.TITLE.typeSuccessLogin']).subscribe((str: string[]) => {
      this.toastr.success(str[0], str[1]);
    });
  }
  typeSuccessLogout(): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeSuccessLogout', 'ERRORMESSAGE.TITLE.typeSuccessLogout']).subscribe((str: string[]) => {
      this.toastr.success(str[0], str[1]);
    });
  }
  typeSuccessEmailConfirm(): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeSuccessEmailConfirm', 'ERRORMESSAGE.TITLE.typeSuccessEmailConfirm']).subscribe((str: string[]) => {
      this.toastr.success(str[0], str[1]);
    });
  }
  typeSuccessMobileConfirm(): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeSuccessMobileConfirm', 'ERRORMESSAGE.TITLE.typeSuccessMobileConfirm']).subscribe((str: string[]) => {
      this.toastr.success(str[0], str[1]);
    });
  }
  typeSuccessRegistery(): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeSuccessRegistery', 'ERRORMESSAGE.TITLE.typeSuccessRegistery']).subscribe((str: string[]) => {
      this.toastr.success(str[0], str[1]);
    });
  }
  typeSuccessSelected(): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeSuccessSelected', 'ERRORMESSAGE.TITLE.typeSuccessSelected']).subscribe((str: string[]) => {
      this.toastr.success(str[0], str[1]);
    });
  }
  typeSuccessAppBuild(strMessage: string): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeSuccessAppBuild', 'ERRORMESSAGE.TITLE.Message', 'ERRORMESSAGE.TITLE.typeSuccessAppBuild']).subscribe((str: string[]) => {
      let message = str[0];
      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.success(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }
  typeSuccessAppUpload(): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeSuccessAppUpload', 'ERRORMESSAGE.TITLE.typeSuccessAppUpload']).subscribe((str: string[]) => {
      this.toastr.success(str[0], str[1]);
    });
  }
  // error Type
  typeErrorInternetConnection(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeErrorInternetConnection', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorInternetConnection']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }
  typeErrorUserToken(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeErrorUserToken', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorUserToken']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }
  typeErrorAccessChange(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeErrorAccessChange', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorAccessChange']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }
  typeErrorDeviceToken(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeErrorDeviceToken', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorDeviceToken']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }

  typeErrorComponentAction(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeErrorComponentAction', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorComponentAction']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }

  typeErrorFormInvalid(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeErrorFormInvalid', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorFormInvalid']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }
  typeErrorGetAccess(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeErrorGetAccess', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorGetAccess']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }
  typeErrorAccessAdd(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeErrorAccessAdd', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorAccessAdd']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }
  typeErrorAccessWatch(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeErrorAccessWatch', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorAccessWatch']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }
  typeErrorAccessEdit(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeErrorAccessEdit', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorAccessEdit']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }
  typeErrorAccessDelete(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeErrorAccessDelete', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorAccessDelete']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }
  typeErrorGetOne(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeErrorGetOne', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorGetOne']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }

  typeErrorSetStatus(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeErrorSetStatus', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorSetStatus']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }
  typeErrorGetAll(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeErrorGetAll', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorGetAll']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }

  typeErrorAdd(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeErrorAdd', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorAdd']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }
  typeErrorAddSimilar(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeErrorAddSimilar', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorAddSimilar']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }
  typeErrorAddOtherInfo(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeErrorAddOtherInfo', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorAddOtherInfo']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }
  typeErrorAddTag(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeErrorAddTag', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorAddTag']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }
  typeErrorRemoveTag(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeErrorRemoveTag', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorRemoveTag']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }
  typeErrorRemoveOtherInfo(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeErrorRemoveOtherInfo', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorRemoveOtherInfo']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }
  typeErrorRemoveSimilar(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeErrorRemoveSimilar', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorRemoveSimilar']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }
  typeErrorGetCpatcha(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeErrorGetCpatcha', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorGetCpatcha']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }
  typeErrorAddDuplicate(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeErrorAddDuplicate', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorAddDuplicate']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }

  typeErrorRemove(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeErrorRemove', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorRemove']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }

  typeErrorEdit(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeErrorEdit', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorEdit']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }

  typeErrorMove(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeErrorMove', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorMove']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }

  typeErrorLogin(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeErrorLogin', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorLogin']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }

  typeErrorEditRowIsNull(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeErrorEditRowIsNull', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorEditRowIsNull']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }

  typeErrorDeleteRowIsNull(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeErrorDeleteRowIsNull', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorDeleteRowIsNull']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }

  typeErrorAddRowParentIsNull(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeErrorAddRowParentIsNull', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorAddRowParentIsNull']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }
  typeErrorGetPosition(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeErrorGetPosition', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorGetPosition']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }
  typeErrorLogout(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeErrorLogout', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorLogout']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }
  typeErrorRegistery(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeErrorRegistery', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorRegistery']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }
  typeErrorSelected(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeErrorSelected', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorSelected']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }
  typeErrorSelectedRow(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeErrorSelectedRow', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorSelectedRow']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }
  typeErrorMessage(message: string, title: string = 'Error!'): void {
    if (message?.length > 0)
      this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + title);
  }

  typeError(model: any, strMessage: string = ''): void {
    console.log("Error", model);
    var strTitle = 'ERRORMESSAGE.TITLE.typeError';

    if (!model || model == undefined || model == null) {
      this.translate.get(['ERRORMESSAGE.MESSAGE.typeError', strTitle]).subscribe((str: string[]) => {
        let message = str[0] + ' ' + strMessage + "\n" + model.errorTypeTitle;
        this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[1]);
      });
      return;
    }
    let errorExceptionResult: ErrorExceptionResultBase;
    if (model.error) {
      errorExceptionResult = model.error;
      if (errorExceptionResult) {
        if (errorExceptionResult.status === 401) {
          this.translate.get(['ERRORMESSAGE.MESSAGE.typeError_login', strTitle]).subscribe((str: string[]) => {
            let message = str[0] + ' ' + strMessage;
            this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[1]);
          });
          return;
        }
      }
    }
    if (model.errors) {
      console.log(model.errors);
      this.translate.get(['ERRORMESSAGE.MESSAGE.typeError_viewConsoleLog', strTitle]).subscribe((str: string[]) => {
        let message = str[0] + ' ' + strMessage;
        this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[1]);
      });
      return;
    } else if (model && model.errorMessage) {
      this.translate.get(['ERRORMESSAGE.MESSAGE.typeError', strTitle]).subscribe((str: string[]) => {
        let message = str[0] + ' ' + strMessage;
        this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[1]);
      });
    }
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeError', strTitle]).subscribe((str: string[]) => {
      let message = str[0] + ' ' + (model.message) ? model.message : model.status ? `${model.status} - ${model.statusText}` : 'Server error';
      this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[1]);
    });

    return;

  }
  typeErrorForNotComplete(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeErrorForNotComplete', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorForNotComplete']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.error(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }

  typeWarningRecordStatusNoAvailable(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeWarningRecordStatusNoAvailable', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorSelected']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.warning(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }
  typeWarningMessage(message: string, title: string = 'Warning!'): void {
    this.toastr.warning(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + title);
  }
  typeWarningSelected(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeErrorSelected', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorSelected']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.warning(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }
  typeWarning(strMessage: string = ''): void {
    this.translate.get(['ERRORMESSAGE.MESSAGE.typeErrorSelected', 'ERRORMESSAGE.TITLE.Error', 'ERRORMESSAGE.TITLE.typeErrorSelected']).subscribe((str: string[]) => {
      let message = str[0];

      if (strMessage?.length > 0) {
        message = message + ' ' + str[1] + ': ' + strMessage;
      }
      this.toastr.warning(message.replace(/(?:\r\n|\r|\n)/g, '<br>'), this.now() + str[2]);
    });
  }
}
