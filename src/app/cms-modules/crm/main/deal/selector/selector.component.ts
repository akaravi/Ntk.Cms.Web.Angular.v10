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
  FilterModel,
  CrmDealModel,
  CrmDealService,
  FilterDataModel,
  FilterDataModelSearchTypesEnum,
} from "ntk-cms-api";
import { Observable } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
} from "rxjs/operators";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

/**
 * Component Selector برای انتخاب Deal در فرم‌های CRM.
 * این component امکان جستجو و انتخاب Deal را فراهم می‌کند.
 */
@Component({
  selector: "app-crm-deal-selector",
  templateUrl: "./selector.component.html",
  standalone: false,
})
export class CrmDealSelectorComponent implements OnInit {
  constructorInfoAreaId = this.constructor.name;
  constructor(
    public coreEnumService: CoreEnumService,
    public cmsToastrService: CmsToastrService,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
    public translate: TranslateService,
    public categoryService: CrmDealService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;
  }
  dataModelResult: ErrorExceptionResult<CrmDealModel> =
    new ErrorExceptionResult<CrmDealModel>();
  dataModelSelect: CrmDealModel = new CrmDealModel();
  formControl = new FormControl();
  forceSelect: any;
  filteredOptions: Observable<CrmDealModel[]>;
  @Input() optionDisabled = false;
  @Input() optionSelectFirstItem = false;
  @Input() optionPlaceholder = "";
  @Input() optionLabel = "";
  @Input() optionRequired = false;
  @Output() optionChange = new EventEmitter<CrmDealModel>();
  @Input() optionReload = () => this.onActionButtonReload();
  @Input() set optionSelectForce(x: string | CrmDealModel) {
    this.forceSelect = x;
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
        if (typeof val === "string" || typeof val === "number") {
          return this.DataGetAll(val || "");
        }
        return [];
      }),
    );
  }

  displayFn(model?: CrmDealModel): string | undefined {
    if (model) {
      return (
        model.name +
        (model.amount ? " (" + model.amount + " " + (model.currency || "") + ")" : "")
      );
    }
    return undefined;
  }
  displayOption(model?: CrmDealModel): string | undefined {
    return this.displayFn(model);
  }
  async DataGetAll(
    text: string | number | any,
  ): Promise<Observable<CrmDealModel[]>> {
    const filterModel = new FilterModel();
    filterModel.rowPerPage = 20;
    filterModel.accessLoad = true;
    filterModel.sortColumn = "id";
    if (text && text.length > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = "name";
      filter.value = text;
      filter.searchType = FilterDataModelSearchTypesEnum.Contains;
      filter.clauseType = ClauseTypeEnum.Or;
      filterModel.filters.push(filter);
      const filter2 = new FilterDataModel();
      filter2.propertyName = "id";
      filter2.value = text;
      filter2.searchType = FilterDataModelSearchTypesEnum.Equal;
      filter2.clauseType = ClauseTypeEnum.Or;
      filterModel.filters.push(filter2);
    }
    return this.categoryService.ServiceGetAll(filterModel).pipe(
      map((response) => {
        this.dataModelResult = response;
        /*select First Item */
        if (
          this.optionSelectFirstItem &&
          (!this.dataModelSelect ||
            !this.dataModelSelect.id ||
            this.dataModelSelect.id.length === 0) &&
          this.dataModelResult.listItems.length > 0
        ) {
          this.optionSelectFirstItem = false;
          setTimeout(() => {
            this.formControl.setValue(this.dataModelResult.listItems[0]);
          }, 1000);
          this.onActionSelect(this.dataModelResult.listItems[0]);
        }
        /*select First Item */
        return response.listItems;
      }),
    );
  }
  onActionSelectForce(model: string | CrmDealModel): void {
    if (typeof model === "string" && model.length > 0) {
      if (this.dataModelSelect && this.dataModelSelect.id === model) {
        return;
      }
      if (
        this.dataModelResult &&
        this.dataModelResult.listItems &&
        this.dataModelResult.listItems.find((x) => x.id === model)
      ) {
        const item = this.dataModelResult.listItems.find((x) => x.id === model);
        this.dataModelSelect = item;
        this.formControl.setValue(item);
        this.optionChange.emit(item);
        return;
      }
      this.categoryService.ServiceGetOneById(model).subscribe({
        next: (ret) => {
          if (ret.isSuccess) {
            this.dataModelSelect = ret.item;
            this.formControl.setValue(ret.item);
            this.optionChange.emit(ret.item);
          } else {
            this.cmsToastrService.typeErrorMessage(ret.errorMessage);
          }
        },
        error: (er) => {
          this.cmsToastrService.typeError(er);
        },
      });
      return;
    }
    if (model && typeof model !== "string") {
      this.dataModelSelect = model;
      this.formControl.setValue(model);
      this.optionChange.emit(model);
    } else {
      this.formControl.setValue(null);
    }
  }
  onActionSelect(model: CrmDealModel): void {
    if (this.optionDisabled) {
      return;
    }
    this.dataModelSelect = model;
    this.optionChange.emit(this.dataModelSelect);
  }
  onActionButtonReload(): void {
    this.dataModelSelect = new CrmDealModel();
    this.formControl.setValue(null);
    this.optionChange.emit(null);
    this.DataGetAll(null);
  }
  onActionButtonClear(): void {
    this.dataModelSelect = null;
    this.formControl.setValue(null);
    this.optionChange.emit(null);
  }
}
