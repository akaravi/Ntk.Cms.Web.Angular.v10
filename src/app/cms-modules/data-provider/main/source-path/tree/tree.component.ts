
@Component({
  selector: "app-data-provider-source-path-tree",
  templateUrl: "./tree.component.html",
  standalone: false,
})
export class DataProviderSourcePathTreeComponent implements OnInit, OnDestroy {
  constructorInfoAreaId = this.constructor.name;
  constructor(
        public coreEnumService: CoreEnumService,
    public categoryService: DataProviderSourcePathService,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
    private tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
    public translate: TranslateService,
    public dialog: MatDialog,
  ) {
    this.publicHelper.processService.cdr = this.cdr;
  }
  @Input() set optionSelectForce(x: number | DataProviderSourcePathModel) {
    this.onActionSelectForce(x);
  }
  dataModelSelect: DataProviderSourcePathModel | null =
    new DataProviderSourcePathModel();
  dataModelResult: ErrorExceptionResult<DataProviderSourcePathModel> =
    new ErrorExceptionResult<DataProviderSourcePathModel>();
  filterModel = new FilterModel();

  dataSource = new MatTreeNestedDataSource<DataProviderSourcePathModel>();
  @Output() optionChange = new EventEmitter<DataProviderSourcePathModel>();
  private unsubscribe: Subscription[] = [];
  @Input() optionReload = () => this.onActionButtonReload();

  hasChild = (_: number, node: DataProviderSourcePathModel) => false;
  childrenAccessor = (node: DataProviderSourcePathModel) => [];

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
        }
        this.publicHelper.processService.processStop(pName);
      },
      error: (er) => {
        this.cmsToastrService.typeError(er);
        this.publicHelper.processService.processStop(pName, false);
      },
    });
  }
  onActionSelect(model: DataProviderSourcePathModel): void {
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
    this.dataModelSelect = new DataProviderSourcePathModel();
    this.DataGetAll();
  }
  onActionSelectForce(id: number | DataProviderSourcePathModel): void {}
}
