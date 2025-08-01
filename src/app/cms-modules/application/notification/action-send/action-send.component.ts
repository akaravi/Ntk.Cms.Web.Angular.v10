import {
  ChangeDetectorRef, Component, Inject, OnInit,
  ViewChild
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import {
  ApplicationAppModel,
  ApplicationEnumService, ApplicationLogNotificationModel, ApplicationLogNotificationService, ApplicationMemberInfoModel, ErrorExceptionResult,
  FormInfoModel, InfoEnumModel, SendNotificationModel
} from 'ntk-cms-api';
import { NodeInterface, TreeModel } from 'ntk-cms-filemanager';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
@Component({
    selector: 'app-application-notification-action-send',
    templateUrl: './action-send.component.html',
    standalone: false
})
export class ApplicationLogNotificationActionSendComponent implements OnInit {
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ApplicationLogNotificationActionSendComponent>,
    public applicationEnumService: ApplicationEnumService,
    public applicationLogNotificationService: ApplicationLogNotificationService,
    private cmsToastrService: CmsToastrService,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
    public translate: TranslateService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;

    if (data) {
      this.requestLinkApplicationId = +data.linkApplicationId || 0;
      this.requestLinkApplicationMemberId = data.linkApplicationMemberId + '';
    }
    if (this.requestLinkApplicationMemberId.length > 0) {
      this.LinkMemberId = this.requestLinkApplicationMemberId;
    }
    if (this.requestLinkApplicationId > 0) {
      this.dataModel.appId = this.requestLinkApplicationId;
    }
    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
  }
  requestLinkApplicationId = 0;
  requestLinkApplicationMemberId = '';
  @ViewChild('vform', { static: false }) formGroup: FormGroup;
  LinkMemberId = '';
  selectFileTypeMainImage = ['jpg', 'jpeg', 'png'];
  fileManagerTree: TreeModel;
  appLanguage = 'fa';

  dataModelResult: ErrorExceptionResult<ApplicationLogNotificationModel> = new ErrorExceptionResult<ApplicationLogNotificationModel>();
  dataModel: SendNotificationModel = new SendNotificationModel();
  dataModelEnumContentTypeResult: ErrorExceptionResult<InfoEnumModel> = new ErrorExceptionResult<InfoEnumModel>();
  formInfo: FormInfoModel = new FormInfoModel();
  fileManagerOpenFormSmallFile = false;
  fileManagerOpenFormBigFile = false;
  SmallImageIdSrc = '';
  BigImageIdSrc = '';
  applicationMemberInfoModel = new ApplicationMemberInfoModel();
  onActionFileSelectedSmallImage(model: NodeInterface): void {
    this.dataModel.smallImageId = model.id;
    this.SmallImageIdSrc = model.downloadLinksrc;
  }
  onActionFileSelectedBigImage(model: NodeInterface): void {
    this.dataModel.bigImageId = model.id;
    this.BigImageIdSrc = model.downloadLinksrc;
  }
  ngOnInit(): void {
    this.translate.get('TITLE.Register_New_Categories').subscribe((str: string) => {this.formInfo.formTitle = str });
    this.getEnumContentType();
  }
  getEnumContentType(): void {
    this.applicationEnumService.ServiceNotificationTypeEnum().subscribe({
      next: (ret) => {
        this.dataModelEnumContentTypeResult = ret;
      }
    });
  }
  DataAddContent(): void {
    this.translate.get('MESSAGE.sending_information_to_the_server').subscribe((str: string) => { this.formInfo.formAlert = str; });
    this.formInfo.formError = '';
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });
    this.applicationLogNotificationService.ServiceSendNotification(this.dataModel).subscribe({
      next: (ret) => {
        this.formInfo.formSubmitAllow = true;
        this.dataModelResult = ret;
        if (ret.isSuccess) {
          this.translate.get('MESSAGE.registration_completed_successfully').subscribe((str: string) => { this.formInfo.formAlert = str; });
          this.cmsToastrService.typeSuccessAdd();
          this.dialogRef.close({ dialogChangedDate: true });
        } else {
          this.translate.get('ERRORMESSAGE.MESSAGE.typeError').subscribe((str: string) => { this.formInfo.formAlert = str; });
          this.formInfo.formError = ret.errorMessage;
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.publicHelper.processService.processStop(pName);
      },
      error: (er) => {
        this.formInfo.formSubmitAllow = true;
        this.cmsToastrService.typeError(er);
        this.publicHelper.processService.processStop(pName, false);
      }
    }
    );
  }
  onActionSelectApp(model: ApplicationAppModel | null): void {
    if (!model || model.id <= 0) {
      this.translate.get(['MESSAGE.Specify_the_application', 'MESSAGE.Application_information_is_not_clear']).subscribe((str: any) => {
        this.cmsToastrService.typeErrorMessage(str['MESSAGE.Specify_the_application'], str['MESSAGE.Application_information_is_not_clear']);
      });
      return;
    }
    this.dataModel.appId = model.id;
  }
  onActionSelectMemberInfo(model: ApplicationMemberInfoModel | null): void {
    if (!model || !model.id || model.id.length === 0) {
      this.translate.get(['MESSAGE.Specify_the_member_of_application', 'MESSAGE.Information_application_member_is_not_clear']).subscribe((str: any) => {
        this.cmsToastrService.typeErrorMessage(str['MESSAGE.Specify_the_member_of_application'], str['MESSAGE.Information_application_member_is_not_clear']);
      });
      return;
    }
    this.applicationMemberInfoModel = model;
    this.LinkMemberId = model.id;
  }
  onFormSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }
    if (this.LinkMemberId && this.LinkMemberId.length > 0) {
      this.dataModel.linkMemberIds = [];
      this.dataModel.linkMemberIds.push(this.LinkMemberId);
      this.dataModel.appId = this.applicationMemberInfoModel.linkApplicationId;
    }
    if ((this.LinkMemberId || this.LinkMemberId.length === 0) && this.dataModel.appId <= 0) {
      this.translate.get(['MESSAGE.Specify_the_recipient', 'MESSAGE.Application_or_user_to_receive_has_not_been_specified']).subscribe((str: any) => {
        this.cmsToastrService.typeErrorMessage(str['MESSAGE.Specify_the_recipient'], str['MESSAGE.Application_or_user_to_receive_has_not_been_specified']);
      });
    }
    this.formInfo.formSubmitAllow = false;
    this.DataAddContent();
  }
  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }
}
