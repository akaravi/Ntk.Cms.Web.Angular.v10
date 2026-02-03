
@Component({
  selector: "app-data-provider-client-charge",
  templateUrl: "./charge.component.html",
  standalone: false,
})
export class DataProviderClientChargeComponent implements OnInit {
  requestLinkClientId = "";
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(DOCUMENT) private document: any,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private coreSiteService: CoreSiteService,
        private router: Router,
    public translate: TranslateService,
  ) {
    this.requestLinkClientId =
      this.activatedRoute.snapshot.paramMap.get("LinkClientId") || "";
    this.dataModelCalculate.linkClientId = this.requestLinkClientId;
  }
  price = "";
  currency = "";
  viewCalculate = false;

  dataModelCalculate: DataProviderModuleCalculateDtoModel =
    new DataProviderModuleCalculateDtoModel();
  LinkPlanPriceId = this.dataModelCalculate.linkPlanPriceId;

  ngOnInit(): void {
    this.DataGetCurrency();
    const transactionId = localStorage.getItem("TransactionId") || "";
    if (transactionId?.length > 0) {
      const dialogRef = this.dialog.open(
        CmsBankpaymentTransactionInfoComponent,
        {
          // height: "90%",
          data: {
            id: transactionId,
          },
        },
      );
      dialogRef.afterClosed().subscribe((result) => {
        if (result && result.dialogChangedDate) {
          localStorage.removeItem("TransactionId");
        }
      });
    }
  }

  DataGetCurrency(): void {
    this.coreSiteService.ServiceGetCurrencyMaster().subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.currency = ret.item;
        }
      },
      error: (er) => {
        this.cmsToastrService.typeError(er);
      },
    });
  }

  onActionButtonBuy(): void {
    const dialogRef = this.dialog.open(
      DataProviderClientChargePaymentComponent,
      {
        height: "90%",

        data: {
          LinkPlanPriceId: this.dataModelCalculate.linkPlanPriceId,
          LinkClientId: this.dataModelCalculate.linkClientId,
        },
      },
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
      }
    });
  }

  onActionBackToParent(): void {
    this.router.navigate(["/data-provider/client/"]);
  }
  onInputChange(e: Event): void {
    this.price = (<HTMLInputElement>e.target).value;
  }
}
