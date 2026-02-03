
@Component({
  selector: "app-data-provider-source-public-config-selector",
  templateUrl: "./selector.component.html",
  standalone: false,
})
export class DataProviderSourcePublicConfigSelectorComponent implements OnInit {
  static nextId = 0;
  id = ++DataProviderSourcePublicConfigSelectorComponent.nextId;

  constructorInfoAreaId = this.constructor.name;
  constructor(
    public coreEnumService: CoreEnumService,
        private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
    public translate: TranslateService,
    public categoryService: DataProviderSourcePublicConfigService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;
  }
  dataModelResult: ErrorExceptionResult<DataProviderSourcePublicConfigModel> =
    new ErrorExceptionResult<DataProviderSourcePublicConfigModel>();
  dataModelSelect: DataProviderSourcePublicConfigModel =
    new DataProviderSourcePublicConfigModel();
  formControl = new FormControl();
  filteredOptions: Observable<DataProviderSourcePublicConfigModel[]>;
  @Input() optionDisabled = false;
  @Input() optionRequired = false;
  @Input() optionSelectFirstItem = false;
  @Input() optionPlaceholder = "";
  @Input() optionLabel = "";
  @Output() optionChange =
    new EventEmitter<DataProviderSourcePublicConfigModel>();
  @Input() optionReload = () => this.onActionButtonReload();
  @Input() set optionSelectForce(
    x: string | DataProviderSourcePublicConfigModel,
  ) {
    this.onActionSelectForce(x);
  }

  ngOnInit(): void {
    this.loadOptions();
    if (
      !this.optionLabel ||
      (this.optionLabel.length == 0 && this.optionPlaceholder?.length > 0)
    )
      this.optionLabel = this.optionPlaceholder;
  }
  loadOptions(): void {
    this.filteredOptions = this.formControl.valueChanges.pipe(
      startWith(""),
      debounceTime(1500),
      distinctUntilChanged(),
      switchMap((val) => {
        if (typeof val === "string") {
          return this.DataGetAll(val || "");
        }
        return [];
      }),
      // tap(() => this.myControl.setValue(this.options[0]))
    );
  }

  displayFn(model?: DataProviderSourcePublicConfigModel): string | undefined {
    return model ? model.title + " | " + model.id : undefined;
  }
  displayOption(
    model?: DataProviderSourcePublicConfigModel,
  ): string | undefined {
    return model ? model.title + " | " + model.id : undefined;
  }
  async DataGetAll(
    text: string | any,
  ): Promise<DataProviderSourcePublicConfigModel[]> {
    const filterModel = new FilterModel();
    filterModel.rowPerPage = 20;
    filterModel.accessLoad = true;
    let filter = new FilterDataModel();
    if (text && text.length > 0) {
      filter.propertyName = "title";
      filter.value = text;
      filter.searchType = FilterDataModelSearchTypesEnum.Contains;
      filter.clauseType = ClauseTypeEnum.Or;
      filterModel.filters.push(filter);
    }
    if (text && typeof text === "string" && text.length > 10) {
      filter = new FilterDataModel();
      filter.propertyName = "id";
      filter.value = text;
      filter.searchType = FilterDataModelSearchTypesEnum.Equal;
      filter.clauseType = ClauseTypeEnum.Or;
      filterModel.filters.push(filter);
    }

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

    return await firstValueFrom(
      this.categoryService.ServiceGetAll(filterModel),
    ).then((response) => {
      this.dataModelResult = response;
      /*select First Item */
      if (
        this.optionSelectFirstItem &&
        (!this.dataModelSelect ||
          !this.dataModelSelect.id ||
          this.dataModelSelect.id.length <= 0) &&
        this.dataModelResult.listItems.length > 0
      ) {
        this.optionSelectFirstItem = false;
        setTimeout(() => {
          this.formControl.setValue(this.dataModelResult.listItems[0]);
        }, 1000);
        this.onActionSelect(this.dataModelResult.listItems[0]);
      }
      /*select First Item */
      this.publicHelper.processService.processStop(pName);

      return response.listItems;
    });
  }
  onActionSelect(model: DataProviderSourcePublicConfigModel): void {
    if (this.optionDisabled) {
      return;
    }
    this.dataModelSelect = model;
    this.optionChange.emit(this.dataModelSelect);
  }
  onActionSelectClear(): void {
    if (this.optionDisabled) {
      return;
    }
    this.dataModelSelect = null;
    this.formControl.setValue(null);
    this.optionChange.emit(null);
  }

  push(
    newvalue: DataProviderSourcePublicConfigModel,
  ): Observable<DataProviderSourcePublicConfigModel[]> {
    return this.filteredOptions.pipe(
      map((items) => {
        if (items.find((x) => x.id === newvalue.id)) {
          return items;
        }
        items.push(newvalue);
        return items;
      }),
    );
  }
  onActionSelectForce(id: string | DataProviderSourcePublicConfigModel): void {
    if (typeof id === "string" && id.length > 0) {
      if (this.dataModelSelect && this.dataModelSelect.id === id) {
        return;
      }
      if (
        this.dataModelResult &&
        this.dataModelResult.listItems &&
        this.dataModelResult.listItems.find((x) => x.id === id)
      ) {
        const item = this.dataModelResult.listItems.find((x) => x.id === id);
        this.dataModelSelect = item;
        this.formControl.setValue(item);
        return;
      }
      this.categoryService.ServiceGetOneById(id).subscribe({
        next: (ret) => {
          if (ret.isSuccess) {
            this.filteredOptions = this.push(ret.item);
            this.dataModelSelect = ret.item;
            this.formControl.setValue(ret.item);
            this.optionChange.emit(ret.item);
          } else {
            this.cmsToastrService.typeErrorMessage(ret.errorMessage);
          }
        },
      });
      return;
    }
    if (typeof id === typeof DataProviderSourcePublicConfigModel) {
      this.filteredOptions = this.push(
        id as DataProviderSourcePublicConfigModel,
      );
      this.dataModelSelect = id as DataProviderSourcePublicConfigModel;
      this.formControl.setValue(id);
      return;
    }
    this.formControl.setValue(null);
  }

  onActionButtonReload(): void {
    this.dataModelSelect = new DataProviderSourcePublicConfigModel();
    this.loadOptions();
  }
}
