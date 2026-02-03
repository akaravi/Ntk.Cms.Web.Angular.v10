
@Component({
  selector: "app-data-provider-source-path-edit-mobile",
  templateUrl: "./edit.mobile.component.html",
  styleUrls: ["./edit.mobile.component.scss"],
  standalone: false,
})
export class DataProviderSourcePathEditMobileComponent
  extends EditBaseComponent<
    DataProviderSourcePathService,
    DataProviderSourcePathModel,
    string
  >
  implements OnInit
{
  requestId = "";
  constructorInfoAreaId = this.constructor.name;
  constructor(
    public coreEnumService: CoreEnumService,
    public dataProviderSourcePathService: DataProviderSourcePathService,
        public publicHelper: PublicHelper,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    public translate: TranslateService,
  ) {
    super(
      dataProviderSourcePathService,
      new DataProviderSourcePathModel(),
      publicHelper,
      translate,
    );

    this.publicHelper.processService.cdr = this.cdr;
    if (this.activatedRoute.snapshot.paramMap.get("id")) {
      this.requestId = this.activatedRoute.snapshot.paramMap.get("id");
    }

    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;

  complatedView = false;
  selectFileTypeMainImage = ["jpg", "jpeg", "png"];

  fileManagerTree: TreeModel;
  appLanguage = "fa";

  dataModelResult: ErrorExceptionResultBase = new ErrorExceptionResultBase();
  dataModel: DataProviderSourcePathAliasJsonModel =
    new DataProviderSourcePathAliasJsonModel();

  fileManagerOpenForm = false;

  ngOnInit(): void {
    if (this.requestId.length > 0) {
      this.translate.get("TITLE.Edit").subscribe((str: string) => {
        this.formInfo.formTitle = str;
      });
      this.DataGetOneContent();
    } else {
      this.cmsToastrService.typeErrorComponentAction();
      this.router.navigate(["/data-provider/main/source-path/list"]);
      return;
    }
  }

  DataGetOneContent(): void {
    if (this.requestId.length <= 0) {
      this.cmsToastrService.typeErrorEditRowIsNull();
      return;
    }

    this.translate
      .get("MESSAGE.Receiving_Information_From_The_Server")
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

    this.dataProviderSourcePathService.setAccessLoad();
    this.dataProviderSourcePathService.setAccessDataType(
      ManageUserAccessDataTypesEnum.Editor,
    );
    this.dataProviderSourcePathService
      .ServiceGetOneWithJsonFormatter(this.requestId)
      .subscribe({
        next: (ret) => {
          this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
          if (!ret.item.perriodStartWorkTime) {
            ret.item.perriodStartWorkTime = "";
          } else {
            ret.item.perriodStartWorkTime =
              ret.item.perriodStartWorkTime.substring(
                0,
                ret.item.perriodStartWorkTime.indexOf(
                  ":",
                  ret.item.perriodStartWorkTime.indexOf(":") + 1,
                ),
              );
          }
          if (!ret.item.perriodEndWorkTime) {
            ret.item.perriodEndWorkTime = "";
          } else {
            ret.item.perriodEndWorkTime = ret.item.perriodEndWorkTime.substring(
              0,
              ret.item.perriodEndWorkTime.indexOf(
                ":",
                ret.item.perriodEndWorkTime.indexOf(":") + 1,
              ),
            );
          }
          this.dataModel = ret.item;
          if (ret.isSuccess) {
            this.formInfo.formTitle =
              this.formInfo.formTitle + " " + ret.item.title;
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

  DataEditContent(): void {
    this.translate
      .get("MESSAGE.sending_information_to_the_server")
      .subscribe((str: string) => {
        this.formInfo.submitResultMessage = str;
      });
    this.formInfo.submitResultMessage = "";
    const pName = this.constructor.name + "main";
    this.translate
      .get("MESSAGE.sending_information_to_the_server")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });

    this.dataProviderSourcePathService.ServiceEdit(this.dataModel).subscribe({
      next: (ret) => {
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
          this.cmsToastrService.typeSuccessEdit();
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

  onActionButtonGetToken(): any {
    const pName = this.constructor.name + "GetToken";
    this.translate
      .get("MESSAGE.Receiving_information")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });

    // this.dataProviderSourcePathService
    //   .ServiceGetToken(this.requestId)
    //   .subscribe({
    //     next: (ret) => {
    //       if (ret.isSuccess) {
    //         this.cmsToastrService.typeSuccessMessage(
    //           ret.item.info + " " + ret.item.status + " ",
    //         );
    //         setTimeout(() => this.DataGetOneContent(), 2000);
    //       } else {
    //         this.cmsToastrService.typeErrorMessage(ret.errorMessage);
    //       }
    //       this.publicHelper.processService.processStop(pName);
    //     },
    //     error: (er) => {
    //       this.cmsToastrService.typeError(er);
    //       this.publicHelper.processService.processStop(pName, false);
    //     },
    //   });
  }
  onActionButtonGetBalance(): any {
    const pName = this.constructor.name + "GetBalance";
    this.translate
      .get("MESSAGE.Receiving_information")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });

    // this.dataProviderSourcePathService
    //   .ServiceGetBalance(this.requestId)
    //   .subscribe({
    //     next: (ret) => {
    //       if (ret.isSuccess) {
    //         this.cmsToastrService.typeSuccessMessage(
    //           ret.item.info + " " + ret.item.status + " " + ret.item.credit,
    //         );
    //       } else {
    //         this.cmsToastrService.typeErrorMessage(
    //           ret.errorMessage + ret.item.info + " " + ret.item.status,
    //         );
    //       }
    //       this.publicHelper.processService.processStop(pName);
    //     },
    //     error: (er) => {
    //       this.cmsToastrService.typeError(er);
    //       this.publicHelper.processService.processStop(pName, false);
    //     },
    //   });
  }
  onActionSelectorSelectlinkSourceCompanyId(
    model: DataProviderSourceCompanyModel | null,
  ): void {
    if (!model || model.id.length <= 0) {
      this.translate
        .get("MESSAGE.Information_application_is_not_clear")
        .subscribe((message: string) => {
          this.cmsToastrService.typeErrorSelected(message);
        });
      return;
    }
    this.dataModel.linkSourceCompanyId = model.id;
  }

  onStepClick(event: StepperSelectionEvent, stepper: MatStepper): void {
    if (event.previouslySelectedIndex < event.selectedIndex) {
      if (!this.formGroup.valid) {
        this.cmsToastrService.typeErrorFormInvalid();
        setTimeout(() => {
          stepper.selectedIndex = event.previouslySelectedIndex;
        }, 10);
      }
    }
  }
  onActionBackToParent(): void {
    this.router.navigate(["/data-provider/main/source-path/list"]);
  }
  onActionSelectSource(model: DataProviderSourcePublicConfigModel): void {
    this.dataModel.linkPublicConfigId = null;
    if (model && model.id?.length > 0) {
      this.dataModel.linkPublicConfigId = model.id;
    }
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
    this.DataEditContent();
  }
  onFormCancel(): void {
    this.router.navigate(["/data-provider/main/source-path/list"]);
  }
}
