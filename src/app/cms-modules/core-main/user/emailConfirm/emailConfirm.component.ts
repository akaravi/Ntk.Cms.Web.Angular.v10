
import {
  ChangeDetectorRef, Component, Inject, OnInit,
  ViewChild
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import {
  AuthEmailConfirmDtoModel, CaptchaModel, CoreAuthV3Service, CoreEnumService,
  CoreUserService, DataFieldInfoModel,
  ErrorExceptionResultBase,
  FormInfoModel
} from 'ntk-cms-api';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
import { CmsStoreService } from 'src/app/core/reducers/cmsStore.service';


@Component({
  selector: 'app-core-user-email-confirm',
  templateUrl: './emailConfirm.component.html',
  standalone: false
})
export class CoreUserEmailConfirmComponent implements OnInit {
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CoreUserEmailConfirmComponent>,
    public coreEnumService: CoreEnumService,
    public coreUserService: CoreUserService,

    private coreAuthService: CoreAuthV3Service,
    private cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;


  }
  firstRun = true;
  expireDate: Date;
  countAutoCaptchaOrder = 1;

  dataModelResult: ErrorExceptionResultBase = new ErrorExceptionResultBase;
  dataModel: AuthEmailConfirmDtoModel = new AuthEmailConfirmDtoModel();
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<string, DataFieldInfoModel>();
  passwordIsValid = false;
  captchaModel: CaptchaModel = new CaptchaModel();

  @ViewChild('vform', { static: false }) formGroup: FormGroup;

  formInfo: FormInfoModel = new FormInfoModel();
  onCaptchaOrderInProcess = false;
  otpConfig = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px',
      'margin': '5px',
    }
  }

tokenInfo
  ngOnInit(): void {
    this.onCaptchaOrder();
    this.translate.get('ACTION.CONFIRMEMAIL').subscribe((str: string) => {
      this.formInfo.formTitle = str;
    });
    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;
    if (this.tokenInfo) {
      this.dataModel.email = this.tokenInfo.user.email;
      this.dataModel.linkUserId = this.tokenInfo.access.userId;
    }



    this.DataGetAccess();
  }


  DataGetAccess(): void {
    const pName = this.constructor.name + 'DataGetAccess';
    this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });

    this.coreUserService
      .ServiceViewModel()
      .subscribe({
        next: (ret) => {
          if (ret.isSuccess) {
            this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
          } else {
            this.cmsToastrService.typeErrorGetAccess(ret.errorMessage);
          }
          this.publicHelper.processService.processStop(pName);
        },
        error: (er) => {
          this.cmsToastrService.typeErrorGetAccess(er);
          this.publicHelper.processService.processStop(pName, false);
        }
      }
      );
  }
  stepOne = true;
  stepTwo = false;
  onEmailConfirm(): void {
    this.dataModel.captchaKey = this.captchaModel.key;
    this.coreAuthService.ServiceEmailConfirm(this.dataModel).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.cmsToastrService.typeSuccessEmailConfirm();
          if (this.stepOne) {
            this.stepOne = false;
            this.stepTwo = true;
            this.cmsToastrService.typeSuccessMessage("کد برای ایمیل شما ارسال شد");
          } else if (this.stepTwo) {
            this.stepOne = false;
            this.stepTwo = false;
            this.cmsToastrService.typeSuccessMessage("ایمیل شما با موفقیت تایید شد");
            this.dialogRef.close({ dialogChangedDate: true });
          }
        } else {

          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
          this.firstRun = false;
          this.formInfo.buttonSubmittedEnabled = true;
          this.onCaptchaOrder();
        }
      }
    });
  }
  onOtpChange(otp) {
    this.dataModel.code = otp;
  }
  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }

  onCaptchaOrder(): void {
    if (this.onCaptchaOrderInProcess) {
      return;
    }
    this.countAutoCaptchaOrder = this.countAutoCaptchaOrder + 1;
    this.dataModel.captchaText = '';
    const pName = this.constructor.name + '.ServiceCaptcha';
    this.translate.get('MESSAGE.get_security_photo_content').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });
    this.coreAuthService.ServiceCaptcha().subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.captchaModel = ret.item;
          this.expireDate = ret.item.expire;//.split('+')[1];
          const startDate = new Date();
          const endDate = new Date(ret.item.expire);
          const seconds = (endDate.getTime() - startDate.getTime());
          if (this.countAutoCaptchaOrder < 10) {
            this.countAutoCaptchaOrder = this.countAutoCaptchaOrder + 1;
            setTimeout(() => {
              if (!this.firstRun)
                this.onCaptchaOrder();
            }, seconds);
          }
        } else {
          this.cmsToastrService.typeErrorGetCpatcha(ret.errorMessage);
        }
        this.onCaptchaOrderInProcess = false;
        this.publicHelper.processService.processStop(pName);
      },
      error: (er) => {
        this.onCaptchaOrderInProcess = false;
        this.publicHelper.processService.processStop(pName);
      }
    }
    );
  }
}
