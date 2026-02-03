
@Component({
  selector: "app-data-provider-client-tree",
  templateUrl: "./tree.component.html",
  standalone: false,
})
export class DataProviderClientTreeComponent implements OnInit, OnDestroy {
  constructorInfoAreaId = this.constructor.name;
  constructor(
        public coreEnumService: CoreEnumService,
    public categoryService: DataProviderClientService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
    private tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
    public translate: TranslateService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;
  }
  @Input() set optionSelectForce(x: number | DataProviderClientModel) {
    this.onActionSelectForce(x);
  }
  dataModelSelect: DataProviderClientModel | null = new DataProviderClientModel();
  dataModelResult: ErrorExceptionResult<DataProviderClientModel> =
    new ErrorExceptionResult<DataProviderClientModel>();
  filterModel = new FilterModel();

  dataSource = new MatTreeNestedDataSource<DataProviderClientModel>();
  @Output() optionChange = new EventEmitter<DataProviderClientModel>();
  private unsubscribe: Subscription[] = [];
  @Input() optionReload = () => this.onActionButtonReload();

  hasChild = (_: number, node: DataProviderClientModel) => null;
  childrenAccessor = (node: DataProviderClientModel) => [];

  ngOnInit(): void {
    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.tokenInfoStore)
        .subscribe(async () => {
          this.DataGetAll();
        }),
    );
  }
  ngOnDestroy(): void {
    if (this.unsubscribe) this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  DataGetAll(): void {
    this.filterModel.rowPerPage = 200;
    this.filterModel.accessLoad = true;

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

    this.categoryService.ServiceGetAll(this.filterModel).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.dataModelResult = ret;
          this.dataSource.data = this.dataModelResult.listItems;
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
    onActionSelect(model: DataProviderClientModel): void {
    if (model && this.dataModelSelect && model.id == this.dataModelSelect.id) {
      this.dataModelSelect = null;
      this.optionChange.emit(null);
    } else {
      this.dataModelSelect = model;
      this.optionChange.emit(this.dataModelSelect);
    }
  }
  onActionButtonReload(): void {
    this.onActionSelect(null);

    this.dataModelSelect = new DataProviderClientModel();
    this.DataGetAll();
  }
  onActionSelectForce(id: string | number | DataProviderClientModel): void {}

  onActionAdd(): void {
    let parentId = "";
    if (this.dataModelSelect && (typeof this.dataModelSelect.id === 'string' ? this.dataModelSelect.id.length > 0 : this.dataModelSelect.id > 0)) {
      parentId = String(this.dataModelSelect.id);
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = "90%";
    dialogConfig.data = { parentId };

    const dialogRef = this.dialog.open(
      DataProviderClientAddComponent,
      dialogConfig,
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
        this.DataGetAll();
      }
    });
  }

  onActionEdit(): void {
    let id = "";
    if (this.dataModelSelect && (typeof this.dataModelSelect.id === 'string' ? this.dataModelSelect.id.length > 0 : this.dataModelSelect.id > 0)) {
      id = String(this.dataModelSelect.id);
    }
    if (id.length === 0) {
      this.translate
        .get("ERRORMESSAGE.MESSAGE.typeErrorCategoryNotSelected")
        .subscribe((str: string) => {
          this.cmsToastrService.typeErrorSelected(str);
        });
      return;
    }
    var panelClass = "";
    if (this.publicHelper.isMobile) panelClass = "dialog-fullscreen";
    else panelClass = "dialog-min";
    const dialogRef = this.dialog.open(DataProviderClientEditComponent, {
      height: "90%",
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: { id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
        this.DataGetAll();
      }
    });
  }

  onActionDelete(): void {
    let id = "";
    if (this.dataModelSelect && (typeof this.dataModelSelect.id === 'string' ? this.dataModelSelect.id.length > 0 : this.dataModelSelect.id > 0)) {
      id = String(this.dataModelSelect.id);
    }
    if (id.length === 0) {
      this.translate
        .get("ERRORMESSAGE.MESSAGE.typeErrorCategoryNotSelected")
        .subscribe((str: string) => {
          this.cmsToastrService.typeErrorSelected(str);
        });
      return;
    }
    var panelClass = "";
    if (this.publicHelper.isMobile) panelClass = "dialog-fullscreen";
    else panelClass = "dialog-min";
    const dialogRef = this.dialog.open(DataProviderClientDeleteComponent, {
      height: "90%",
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: { id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
        this.DataGetAll();
      }
    });
  }
}
