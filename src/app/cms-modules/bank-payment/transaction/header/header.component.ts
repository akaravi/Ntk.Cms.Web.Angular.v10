import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {
  BankPaymentEnumService,
  BankPaymentTransactionModel,
  BankPaymentTransactionService,
  DataFieldInfoModel,
  ErrorExceptionResult,
  InfoEnumModel,
} from "ntk-cms-api";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

@Component({
  selector: "app-bank-payment-transaction-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  standalone: false,
})
export class BankPaymentTransactionHeaderComponent implements OnInit {
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private headerService: BankPaymentTransactionService,
    private bankPaymentEnumService: BankPaymentEnumService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    public cmsToastrService: CmsToastrService,
    public translate: TranslateService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;
  }
  @Input() optionId = 0;

  dataModelResult: ErrorExceptionResult<BankPaymentTransactionModel> =
    new ErrorExceptionResult<BankPaymentTransactionModel>();
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();
  dataModelEnumTransactionRecordStatusResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();
  dataModelEnumTransactionBankStatusResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();

  ngOnInit(): void {
    this.getEnumTransactionRecordStatus();
    this.getEnumTransactionBankStatus();
    if (this.optionId > 0) {
      this.dataGetOneTransaction();
    }
  }

  private getEnumTransactionRecordStatus(): void {
    this.bankPaymentEnumService.ServiceTransactionRecordStatusEnum().subscribe({
      next: (ret) => {
        this.dataModelEnumTransactionRecordStatusResult = ret;
      },
      error: (er) => {
        this.cmsToastrService.typeError(er);
      },
    });
  }

  private getEnumTransactionBankStatus(): void {
    this.bankPaymentEnumService.ServiceTransactionBankStatusEnum().subscribe({
      next: (ret) => {
        this.dataModelEnumTransactionBankStatusResult = ret;
      },
      error: (er) => {
        this.cmsToastrService.typeError(er);
      },
    });
  }

  private dataGetOneTransaction(): void {
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

    this.headerService.setAccessLoad();
    this.headerService.ServiceGetOneById(this.optionId).subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
        if (ret.isSuccess) {
          this.dataModelResult = ret;
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
}
