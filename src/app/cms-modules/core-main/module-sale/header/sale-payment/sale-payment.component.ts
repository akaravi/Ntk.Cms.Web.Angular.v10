
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectorRef, Component, Inject, OnInit
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import {
  BankPaymentInjectPaymentGotoBankStep1CalculateModel,
  BankPaymentInjectPaymentGotoBankStep2LandingSitePageModel, BankPaymentPrivateSiteConfigModel,
  CoreModuleSaleHeaderCalculateDtoModel,
  CoreModuleSaleHeaderPaymentDtoModel,
  CoreModuleSaleHeaderService, ErrorExceptionResult,
  FormInfoModel
} from 'ntk-cms-api';

import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';

@Component({
    selector: 'app-core-modulesaleheader-sale-payment',
    templateUrl: './sale-payment.component.html',
    styleUrls: ['./sale-payment.component.scss'],
    standalone: false
})
export class CoreModuleSaleHeaderSalePaymentComponent implements OnInit {
  requestLinkHeaderId = 0;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(DOCUMENT) private document: any,
    private dialogRef: MatDialogRef<CoreModuleSaleHeaderSalePaymentComponent>,
    public coreModuleSaleHeaderService: CoreModuleSaleHeaderService,

    private cmsToastrService: CmsToastrService,
    public translate: TranslateService,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
  ) {
    this.publicHelper.processService.cdr = this.cdr;

    if (data) {
      this.requestLinkHeaderId = + data.linkHeaderId || 0;
    }
    if (this.requestLinkHeaderId === 0) {
      this.cmsToastrService.typeErrorComponentAction();
      this.dialogRef.close({ dialogChangedDate: false });
      return;
    }

    this.dataModelCalculate.linkHeaderId = this.requestLinkHeaderId;
    this.dataModelPayment.linkHeaderId = this.requestLinkHeaderId;
    this.dataModelPayment.lastUrlAddressInUse = this.document.location.href;
  }
  viewCalculate = true;


  dataModelResult: ErrorExceptionResult<BankPaymentPrivateSiteConfigModel> = new ErrorExceptionResult<BankPaymentPrivateSiteConfigModel>();
  dataModelCalculateResult: ErrorExceptionResult<BankPaymentInjectPaymentGotoBankStep1CalculateModel>
    = new ErrorExceptionResult<BankPaymentInjectPaymentGotoBankStep1CalculateModel>();
  dataModelPaymentResult: ErrorExceptionResult<BankPaymentInjectPaymentGotoBankStep2LandingSitePageModel>
    = new ErrorExceptionResult<BankPaymentInjectPaymentGotoBankStep2LandingSitePageModel>();
  dataModelCalculate: CoreModuleSaleHeaderCalculateDtoModel = new CoreModuleSaleHeaderCalculateDtoModel();
  dataModelPayment: CoreModuleSaleHeaderPaymentDtoModel = new CoreModuleSaleHeaderPaymentDtoModel();
  formInfo: FormInfoModel = new FormInfoModel();


  ngOnInit(): void {
    this.translate.get('TITLE.Select_Payment_Gateway').subscribe((str: string) => {
      this.formInfo.formTitle = str;
    });

  }

  DataCalculate(): void {
    // this.viewCalculate = true;
    //console.log('r');
    const pName = this.constructor.name + 'ServiceOrderCalculate';
    this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });
    this.coreModuleSaleHeaderService.ServiceOrderCalculate(this.dataModelCalculate).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.dataModelCalculateResult = ret;
          //console.log('a');
          this.viewCalculate = !this.viewCalculate;
        }
        else {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.publicHelper.processService.processStop(pName);

      },
      error: (er) => {
        this.cmsToastrService.typeError(er);

        this.publicHelper.processService.processStop(pName, false);
      }
    }
    );
  }
  DataPayment(): void {
    const pName = this.constructor.name + 'ServiceOrderPayment';
    this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });
    this.coreModuleSaleHeaderService.ServiceOrderPayment(this.dataModelPayment).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.dataModelPaymentResult = ret;
          this.translate.get('MESSAGE.Transferring_to_the_payment_gateway').subscribe((str: string) => {
            this.cmsToastrService.typeSuccessMessage(str);
          });
          localStorage.setItem('TransactionId', ret.item.transactionId.toString());
          this.document.location.href = this.dataModelPaymentResult.item.urlToPay;
        }
        else {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.publicHelper.processService.processStop(pName);

      },
      error: (er) => {
        this.cmsToastrService.typeError(er);
        this.publicHelper.processService.processStop(pName, false);
      }
    }
    );
  }
  onActionSelectCalculate(model: BankPaymentPrivateSiteConfigModel): void {
    this.dataModelCalculate.bankPaymentPrivateId = model.id;
    this.dataModelPayment.bankPaymentPrivateId = model.id;
    this.DataCalculate();
  }
  onActionSelectBankPayment(): void {

    this.DataPayment();
  }
  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }
}
