
@Component({
  selector: "app-data-provider-source-path-add-mobile",
  templateUrl: "./add.mobile.component.html",
  styleUrls: ["./add.mobile.component.scss"],
  standalone: false,
})
export class DataProviderSourcePathAddMobileComponent
  extends AddBaseComponent<
    DataProviderSourcePathService,
    DataProviderSourcePathModel,
    string
  >
  implements OnInit
{
  requestId = "";
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DataProviderSourcePathAddMobileComponent>,
    public coreEnumService: CoreEnumService,
    public dataProviderSourcePathService: DataProviderSourcePathService,
        public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    private router: Router,
    public translate: TranslateService,
  ) {
    super(
      dataProviderSourcePathService,
      new DataProviderSourcePathModel(),
      publicHelper,
      translate,
    );
    this.publicHelper.processService.cdr = this.cdr;
    if (data && data.id) {
      this.requestId = data.id;
    }
    if (data && data.linkSourceCompanyId) {
      this.dataModel.linkSourceCompanyId = data.linkSourceCompanyId + "";
    }
    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();

  selectFileTypeMainImage = ["jpg", "jpeg", "png"];

  fileManagerTree: TreeModel;
  appLanguage = "fa";

  dataModelResult: ErrorExceptionResult<DataProviderSourcePathModel> =
    new ErrorExceptionResult<DataProviderSourcePathModel>();
  dataModel: DataProviderSourcePathModel = new DataProviderSourcePathModel();

  fileManagerOpenForm = false;

  ngOnInit(): void {
    if (this.requestId && this.requestId.length > 0) {
      this.translate.get("TITLE.ADD").subscribe((str: string) => {
        this.formInfo.formTitle = str + " copy";
      });
      this.DataClone();
    } else {
      this.translate.get("TITLE.ADD").subscribe((str: string) => {
        this.formInfo.formTitle = str;
      });
    }

    this.DataGetAccess();
  }

  DataClone(): void {
    this.translate
      .get("MESSAGE.sending_information_to_the_server")
      .subscribe((str: string) => {
        this.formInfo.submitResultMessage = str;
      });
    this.formInfo.submitResultMessage = "";
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
    this.dataProviderSourcePathService
      .ServiceGetOneById(this.requestId)
      .subscribe({
        next: (ret) => {
          this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);

          if (ret.isSuccess) {
            this.dataModel = ret.item;
            ret.item.title = ret.item.title + " copy";
            this.formInfo.formTitle = this.formInfo.formTitle;
            this.formInfo.submitResultMessage = "";
            this.formInfo.submitResultMessageType =
              this.formSubmitedStatusEnum.Success;
          } else {
            this.translate
              .get("ERRORMESSAGE.MESSAGE.typeError")
              .subscribe((str: string) => {
                this.formInfo.submitResultMessage = str;
              });
            this.formInfo.submitResultMessage = ret.errorMessage;
            this.formInfo.submitResultMessageType =
              this.formSubmitedStatusEnum.Error;
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

  DataAddContent(): void {
    this.translate
      .get("MESSAGE.sending_information_to_the_server")
      .subscribe((str: string) => {
        this.formInfo.submitResultMessage = str;
      });
    this.formInfo.submitResultMessage = "";
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

    this.dataProviderSourcePathService.ServiceAdd(this.dataModel).subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);

        this.formInfo.submitButtonEnabled = true;
        this.dataModelResult = ret;
        if (ret.isSuccess) {
          this.translate
            .get("MESSAGE.registration_completed_successfully")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
            });
          this.formInfo.submitResultMessageType =
            this.formSubmitedStatusEnum.Success;
          this.cmsToastrService.typeSuccessAdd();
          this.dialogRef.close({ dialogChangedDate: true });
        } else {
          this.translate
            .get("ERRORMESSAGE.MESSAGE.typeError")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
            });
          this.formInfo.submitResultMessage = ret.errorMessage;
          this.formInfo.submitResultMessageType =
            this.formSubmitedStatusEnum.Error;
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.publicHelper.processService.processStop(pName);
      },
      error: (er) => {
        this.formInfo.submitButtonEnabled = true;
        this.cmsToastrService.typeError(er);
        this.publicHelper.processService.processStop(pName, false);
      },
    });
  }
  onActionSelectorSelectlinkSourceCompanyId(
    model: DataProviderSourceCompanyModel | null,
  ): void {
    if (!model || model.id.length <= 0) {
      this.translate
        .get("MESSAGE.Service_company_is_not_clear")
        .subscribe((message: string) => {
          this.cmsToastrService.typeErrorSelected(message);
        });
      return;
    }
    this.dataModel.linkSourceCompanyId = model.id;
  }
  onActionSelectSource(model: DataProviderSourcePublicConfigModel): void {
    this.dataModel.linkPublicConfigId = null;
    if (model && model.id?.length > 0) {
      this.dataModel.linkPublicConfigId = model.id;
    }
  }
  onActionBackToParent(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }
  onFormSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }
    if (
      !this.dataModel.linkSourceCompanyId ||
      this.dataModel.linkSourceCompanyId.length == 0
    ) {
      this.translate
        .get("MESSAGE.Service_company_is_not_clear")
        .subscribe((message: string) => {
          this.cmsToastrService.typeErrorSelected(message);
        });
      return;
    }
    if (
      !this.dataModel.linkPublicConfigId ||
      this.dataModel.linkPublicConfigId.length == 0
    ) {
      this.translate
        .get("MESSAGE.Service_type_is_not_clear")
        .subscribe((message: string) => {
          this.cmsToastrService.typeErrorSelected(message);
        });
      return;
    }
    this.formInfo.submitButtonEnabled = false;

    this.DataAddContent();
  }
  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }
}
