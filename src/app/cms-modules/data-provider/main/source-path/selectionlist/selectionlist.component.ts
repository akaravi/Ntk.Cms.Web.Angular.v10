
@Component({
  selector: "app-data-provider-source-path-selectionlist",
  templateUrl: "./selectionlist.component.html",

  standalone: false,
})
export class DataProviderSourcePathSelectionlistComponent implements OnInit {
  constructorInfoAreaId = this.constructor.name;
  constructor(
    public coreEnumService: CoreEnumService,
    public categoryService: DataProviderSourcePathService,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
    public translate: TranslateService,
      ) {
    this.publicHelper.processService.cdr = this.cdr;
  }
  dataModelResult: ErrorExceptionResult<DataProviderSourcePathModel> =
    new ErrorExceptionResult<DataProviderSourcePathModel>();
  dataModelSelect: DataProviderSourcePathModel[] = [];
  dataIdsSelect: string[] = [];

  formControl = new FormControl();
  fieldsStatus: Map<string, boolean> = new Map<string, boolean>();

  @Input() optionDisabled = false;
  @Input() optionSelectFirstItem = false;
  @Input() optionPlaceholder = "";
  @Output() optionChange = new EventEmitter<DataProviderSourcePathModel[]>();
  @Output() optionSelectAdded = new EventEmitter();
  @Output() optionSelectRemoved = new EventEmitter();
  @Input() optionReload = () => this.onActionButtonReload();
  @Input() set optionSelectForce(x: string[] | DataProviderSourcePathModel[]) {
    this.onActionSelectForce(x);
  }

  ngOnInit(): void {
    this.DataGetAll();
  }

  DataGetAll(): void {
    const filterModel = new FilterModel();
    filterModel.rowPerPage = 50;
    filterModel.accessLoad = true;

    // tslint:disable-next-line: no-trailing-whitespace

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

    this.categoryService.ServiceGetAll(filterModel).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.dataModelResult = ret;
          this.dataModelResult.listItems.forEach((el) =>
            this.fieldsStatus.set(el.id, false),
          );
          this.dataIdsSelect.forEach((el) => this.fieldsStatus.set(el, true));
          this.dataModelResult.listItems.forEach((el) => {
            if (this.fieldsStatus.get(el.id)) {
              this.dataModelSelect.push(el);
            }
          });
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
  onActionSelect(value: DataProviderSourcePathModel): void {
    if (this.fieldsStatus.get(value.id)) {
      this.fieldsStatus.set(value.id, false);
      this.optionSelectRemoved.emit(value);
      this.dataModelSelect.splice(this.dataModelSelect.indexOf(value), 1);
    } else {
      this.fieldsStatus.set(value.id, true);
      this.optionSelectAdded.emit(value);
      this.dataModelSelect.push(value);
    }
    this.optionChange.emit(this.dataModelSelect);
  }

  onActionSelectForce(ids: string[] | DataProviderSourcePathModel[]): void {
    if (typeof ids === typeof Array(String)) {
      ids.forEach((element) => {
        this.dataIdsSelect.push(element);
      });
    } else if (typeof ids === typeof Array(DataProviderSourcePathModel)) {
      ids.forEach((element) => {
        this.dataIdsSelect.push(element.id);
      });
    }
    this.dataIdsSelect.forEach((el) => this.fieldsStatus.set(el, true));
  }

  onActionButtonReload(): void {
    // this.dataModelSelect = new DataProviderSourcePathModel();
    this.DataGetAll();
  }
}
