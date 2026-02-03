

import { FormInfoModel } from "src/app/core/models/formInfoModel";

@Component({
  selector: "app-data-provider-client-charge-payment",
  templateUrl: "./charge-payment.component.html",
  styleUrls: ["./charge-payment.component.scss"],
  standalone: false,
})
export class DataProviderClientChargePaymentComponent implements OnInit {
  requestLinkPlanPriceId = "";
  requestLinkClientId = "";
  requestBankPrivateMaster = false;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(DOCUMENT) private document: any,
    private dialogRef: MatDialogRef<DataProviderClientChargePaymentComponent>,
        private dataProviderTransactionService: DataProviderTransactionService,
    public translate: TranslateService,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
  ) {
    this.publicHelper.processService.cdr = this.cdr;

    if (data) {
      if (data.linkPlanPriceId && data.linkPlanPriceId?.length > 0) {
        this.requestLinkPlanPriceId = data.linkPlanPriceId.toString();
      }
      if (data.linkClientId && data.linkClientId?.length > 0) {
        this.requestLinkClientId = data.linkClientId.toString();
      }
    }
    if (this.requestLinkPlanPriceId?.length === 0) {
      this.cmsToastrService.typeErrorComponentAction();
      this.dialogRef.close({ dialogChangedDate: false });
      return;
    }
    if (this.requestLinkClientId?.length === 0) {
      this.cmsToastrService.typeErrorComponentAction();
      this.dialogRef.close({ dialogChangedDate: false });
      return;
    }

    this.dataModelCalculate.linkPlanPriceId = this.requestLinkPlanPriceId;
    this.dataModelCalculate.linkClientId = this.requestLinkClientId;
    this.dataModelPayment.linkPlanPriceId = this.requestLinkPlanPriceId;
    this.dataModelPayment.linkClientId = this.requestLinkClientId;
    this.dataModelPayment.lastUrlAddressInUse = this.document.location.href;
  }
  viewCalculate = false;

  dataModelResult: ErrorExceptionResult<BankPaymentPrivateSiteConfigModel> =
    new ErrorExceptionResult<BankPaymentPrivateSiteConfigModel>();
  dataModelCalculateResult: ErrorExceptionResult<BankPaymentInjectPaymentGotoBankStep1CalculateModel> =
    new ErrorExceptionResult<BankPaymentInjectPaymentGotoBankStep1CalculateModel>();
  dataModelPaymentResult: ErrorExceptionResult<BankPaymentInjectPaymentGotoBankStep2LandingSitePageModel> =
    new ErrorExceptionResult<BankPaymentInjectPaymentGotoBankStep2LandingSitePageModel>();

  dataModelCalculate: DataProviderModuleCalculateDtoModel =
    new DataProviderModuleCalculateDtoModel();
  dataModelPayment: DataProviderModulePaymentDtoModel =
    new DataProviderModulePaymentDtoModel();
  formInfo: FormInfoModel = new FormInfoModel();

  ngOnInit(): void {
    this.translate
      .get("TITLE.Select_Payment_Gateway")
      .subscribe((str: string) => {
        this.formInfo.formTitle = str;
      });
  }

  DataCalculate(): void {
    this.viewCalculate = false;
    const pName = this.constructor.name + "ServiceOrderCalculate";
    this.translate
      .get("MESSAGE.Receiving_information")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });
    this.dataProviderTransactionService
      .ServiceOrderCalculate(this.dataModelCalculate)
      .subscribe({
        next: (ret) => {
          if (ret.isSuccess) {
            this.dataModelCalculateResult = ret;
            this.viewCalculate = true;
          } else {
            this.cmsToastrService.typeErrorMessage(ret.errorMessage);
          }
          this.publicHelper.processService.processStop(pName);
        },
        error: (er) => {
          this.cmsToastrService.typeError(er);

          this.publicHelper.processService.processStop(pName, false);
        },
      });
  }
  DataPayment(): void {
    this.formInfo.submitButtonEnabled = false;
    const pName = this.constructor.name + "ServiceOrderPayment";
    this.translate
      .get("MESSAGE.Receiving_information")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });
    this.dataProviderTransactionService
      .ServiceOrderPayment(this.dataModelPayment)
      .subscribe({
        next: (ret) => {
          if (ret.isSuccess) {
            this.dataModelPaymentResult = ret;
            this.translate
              .get("MESSAGE.Transferring_to_the_payment_gateway")
              .subscribe((str: string) => {
                this.cmsToastrService.typeSuccessMessage(str);
              });
            localStorage.setItem(
              TRANSACTION_ID_LOCAL_STORAGE_KEY,
              ret.item.transactionId.toString(),
            );
            this.document.location.href =
              this.dataModelPaymentResult.item.urlToPay;
          } else {
            this.cmsToastrService.typeErrorMessage(ret.errorMessage);
            this.formInfo.submitButtonEnabled = true;
          }
          this.publicHelper.processService.processStop(pName);
        },
        error: (er) => {
          this.cmsToastrService.typeError(er);
          this.formInfo.submitButtonEnabled = true;
          this.publicHelper.processService.processStop(pName);
        },
      });
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
