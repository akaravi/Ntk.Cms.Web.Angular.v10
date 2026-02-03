@Component({
  selector: "app-data-provider-plan-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  standalone: false,
})
export class DataProviderPlanHeaderComponent implements OnInit, OnDestroy {
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private headerService: DataProviderPlanService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
        public dialog: MatDialog,
    public translate: TranslateService,
    private cmsStoreService: CmsStoreService,
    public tokenHelper: TokenHelper,
  ) {
    this.publicHelper.processService.cdr = this.cdr;
  }
  @Input() optionId: string | number = "";

  dataModelResult: ErrorExceptionResult<DataProviderPlanModel> =
    new ErrorExceptionResult<DataProviderPlanModel>();
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();

  private unsubscribe: Subscription[] = [];
  ngOnInit(): void {
    if (this.optionId && (typeof this.optionId === 'string' ? this.optionId.length > 0 : this.optionId > 0)) {
      this.DataGetOneContent();
    }

    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.tokenInfoStore)
        .subscribe(async () => {
          this.DataGetOneContent();
        }),
    );
  }
  ngOnDestroy(): void {
    if (this.unsubscribe) this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  DataGetOneContent(): void {
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
    const id = typeof this.optionId === 'string' ? this.optionId : this.optionId.toString();
    this.headerService.ServiceGetOneById(id).subscribe({
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
  onActionButtonLinkTo(
    model: DataProviderPlanModel = this.dataModelResult.item,
  ): void {
    if (!model?.id || (typeof model.id === 'string' ? model.id.length === 0 : model.id <= 0)) {
      this.cmsToastrService.typeErrorSelectedRow();
      return;
    }
    if (model.recordStatus != RecordStatusEnum.Available) {
      this.cmsToastrService.typeWarningRecordStatusNoAvailable();
      return;
    }
    var panelClass = "";
    if (this.publicHelper.isMobile) panelClass = "dialog-fullscreen";
    else panelClass = "dialog-min";
    //open popup
    const dialogRef = this.dialog.open(CmsLinkToComponent, {
      height: "90%",
      width: "90%",
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: {
        // title: model.title,
        urlViewContentQRCodeBase64: "",
        urlViewContent: "",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
      }
    });
    //open popup
  }
}
