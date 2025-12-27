import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import {
  ClauseTypeEnum,
  CoreEnumService,
  ErrorExceptionResult,
  FilterDataModel,
  FilterDataModelSearchTypesEnum,
  FilterModel,
  ManageUserAccessDataTypesEnum,
  RecordStatusEnum,
  SmsMainApiPathModel,
  SmsMainApiPathPaginationModel,
  SmsMainApiPathPaginationService,
  SmsMainApiPathService,
  SortTypeEnum,
} from "ntk-cms-api";
import { Observable, firstValueFrom } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
} from "rxjs/operators";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

@Component({
  selector: "app-sms-apipath-pagination-selector",
  templateUrl: "./selector.component.html",
  standalone: false,
})
export class SmsMainApiPathPaginationSelectorComponent implements OnInit {
  static nextId = 0;
  id = ++SmsMainApiPathPaginationSelectorComponent.nextId;

  constructorInfoAreaId = this.constructor.name;
  constructor(
    public coreEnumService: CoreEnumService,
    private cmsToastrService: CmsToastrService,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
    public translate: TranslateService,
    public smsMainApiPathService: SmsMainApiPathService,
    public categoryService: SmsMainApiPathPaginationService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;
  }

  dataModelResult: ErrorExceptionResult<SmsMainApiPathPaginationModel> =
    new ErrorExceptionResult<SmsMainApiPathPaginationModel>();
  dataModelSelect: SmsMainApiPathPaginationModel =
    new SmsMainApiPathPaginationModel();
  dataModelApiPathResult: ErrorExceptionResult<SmsMainApiPathModel> =
    new ErrorExceptionResult<SmsMainApiPathModel>();
  formControl = new FormControl();
  filteredOptions: Observable<SmsMainApiPathPaginationModel[]>;
  @Input() optionDisabled = false;
  @Input() optionRequired = false;
  @Input() optionSelectFirstItem = false;
  @Input() optionSelectForSendMessage = false;
  @Input() optionPlaceholder = "";
  @Input() optionLabel = "";
  @Input() optionAccessDataType: ManageUserAccessDataTypesEnum;
  @Output() optionChange = new EventEmitter<SmsMainApiPathPaginationModel>();
  @Input() optionReload = () => this.onActionButtonReload();
  @Input() set optionSelectForce(x: string | SmsMainApiPathPaginationModel) {
    this.onActionSelectForce(x);
  }

  ngOnInit(): void {
    this.loadOptions();
    if (
      !this.optionLabel ||
      (this.optionLabel.length == 0 && this.optionPlaceholder?.length > 0)
    )
      this.optionLabel = this.optionPlaceholder;
    this.getPrivateConfig();
  }
  loadOptions(): void {
    this.filteredOptions = this.formControl.valueChanges.pipe(
      startWith(""),
      debounceTime(1500),
      distinctUntilChanged(),
      switchMap((val) => {
        if (typeof val === "string" || typeof val === "number") {
          return this.DataGetAll(val || "");
        }
        return [];
      }),
      // tap(() => this.myControl.setValue(this.options[0]))
    );
  }
  getPrivateConfig(): void {
    const filter = new FilterModel();
    filter.rowPerPage = 100;
    this.smsMainApiPathService.ServiceGetAll(filter).subscribe({
      next: (ret) => {
        this.dataModelApiPathResult = ret;
      },
    });
  }
  displayFn(model?: SmsMainApiPathPaginationModel): string | undefined {
    if (model && this.dataModelApiPathResult?.listItems?.length > 0) {
      const find = this.dataModelApiPathResult.listItems.find(
        (x) => x.id === model.linkApiPathId,
      );
      if (!find) return "";
      return find.title + " | " + model.title;
    } else return model ? model.title : undefined;
  }
  displayOption(model?: SmsMainApiPathPaginationModel): string | undefined {
    if (model && this.dataModelApiPathResult?.listItems?.length > 0) {
      const find = this.dataModelApiPathResult.listItems.find(
        (x) => x.id === model.linkApiPathId,
      );
      if (!find) return "";
      return find.title + " | " + model.title;
    } else return model ? model.title : undefined;
  }

  async DataGetAll(
    text: string | number | any,
  ): Promise<SmsMainApiPathPaginationModel[]> {
    const filterModel = new FilterModel();
    filterModel.rowPerPage = 20;
    filterModel.accessLoad = true;
    let filter = new FilterDataModel();
    filter.propertyName = "title";
    filter.value = text;
    filter.searchType = FilterDataModelSearchTypesEnum.Contains;
    filter.clauseType = ClauseTypeEnum.Or;
    filterModel.filters.push(filter);
    if (text && typeof +text === "number" && +text > 0) {
      filter = new FilterDataModel();
      filter.propertyName = "id";
      filter.value = text;
      filter.searchType = FilterDataModelSearchTypesEnum.Equal;
      filter.clauseType = ClauseTypeEnum.Or;
      filterModel.filters.push(filter);
    }
    if (this.optionSelectForSendMessage) {
      filter = new FilterDataModel();
      filter.propertyName = "recordStatus";
      filter.value = RecordStatusEnum.Available;
      filter.searchType = FilterDataModelSearchTypesEnum.Equal;
      filterModel.filters.push(filter);
    }
    const pName = this.constructor.name + "main";
    this.translate
      .get("MESSAGE.get_information_list")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });
    /*filter Sort*/
    filterModel.sortColumn = "priority";
    filterModel.sortType = SortTypeEnum.Ascending;
    if (this.optionAccessDataType)
      this.categoryService.setAccessDataType(this.optionAccessDataType);
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
        //setTimeout(() => {
        this.formControl.setValue(this.dataModelResult.listItems[0]);
        //}, 1000);
        this.onActionSelect(this.dataModelResult.listItems[0]);
      }
      /*select First Item */
      this.publicHelper.processService.processStop(pName);
      return response.listItems;
    });
  }
  onActionSelect(model: SmsMainApiPathPaginationModel): void {
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
    newvalue: SmsMainApiPathPaginationModel,
  ): Observable<SmsMainApiPathPaginationModel[]> {
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
  onActionSelectForce(id: string | SmsMainApiPathPaginationModel): void {
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
    if (typeof id === typeof SmsMainApiPathPaginationModel) {
      this.filteredOptions = this.push(id as SmsMainApiPathPaginationModel);
      this.dataModelSelect = id as SmsMainApiPathPaginationModel;
      this.formControl.setValue(id);
      return;
    }
    this.formControl.setValue(null);
  }

  onActionButtonReload(): void {
    this.dataModelSelect = new SmsMainApiPathPaginationModel();
    this.onActionSelectClear();
    this.loadOptions();
  }
}
