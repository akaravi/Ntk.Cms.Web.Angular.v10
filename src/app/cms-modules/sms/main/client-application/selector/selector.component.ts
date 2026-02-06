import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
  ClauseTypeEnum,
  CoreEnumService,
    ErrorExceptionResult,
    FilterDataModel,
    FilterDataModelSearchTypesEnum,
    FilterModel,
    RecordStatusEnum,
    SmsMainClientApplicationModel,
    SmsMainClientApplicationService,
    SortTypeEnum,
} from "ntk-cms-api";
import { Observable, Subscription, debounceTime, distinctUntilChanged, firstValueFrom, map, startWith, switchMap } from "rxjs";
import { ListBaseComponent } from "src/app/core/cmsComponent/listBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
import { PageInfoService } from "src/app/core/services/page-info.service";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";
import { environment } from "src/environments/environment";
import { SmsMainClientApplicationAddComponent } from "../add/add.component";
import { SmsMainClientApplicationEditComponent } from "../edit/edit.component";
import { FormControl } from "@angular/forms";


@Component({
  selector: "app-sms-client-application-selector",
  templateUrl: "./selector.component.html",
  standalone: false,
})
export class SmsMainClientApplicationSelectorComponent implements OnInit {
  static nextId = 0;
  id = ++SmsMainClientApplicationSelectorComponent.nextId;

  constructorInfoAreaId = this.constructor.name;
  constructor(
    public coreEnumService: CoreEnumService,
        private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
    public translate: TranslateService,
    public categoryService: SmsMainClientApplicationService,
    public cmsToastrService: CmsToastrService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;
  }

  dataModelResult: ErrorExceptionResult<SmsMainClientApplicationModel> =
    new ErrorExceptionResult<SmsMainClientApplicationModel>();
  dataModelSelect: SmsMainClientApplicationModel = new SmsMainClientApplicationModel();
  formControl = new FormControl();
  filteredOptions: Observable<SmsMainClientApplicationModel[]>;
  @Input() optionDisabled = false;
  @Input() optionRequired = false;
  @Input() optionSelectFirstItem = false;
  @Input() optionPlaceholder = "";
  @Input() optionLabel = "";
  @Output() optionChange = new EventEmitter<SmsMainClientApplicationModel>();
  @Input() optionReload = () => this.onActionButtonReload();
  @Input() set optionSelectForce(x: string | number | SmsMainClientApplicationModel) {
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

  displayFn(model?: SmsMainClientApplicationModel): string | undefined {
    return model ? model.title : undefined;
  }
  displayOption(model?: SmsMainClientApplicationModel): string | undefined {
    return model ? model.title : undefined;
  }
  async DataGetAll(
    text: string | number | any,
  ): Promise<SmsMainClientApplicationModel[]> {
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
          (typeof this.dataModelSelect.id === 'string' ? this.dataModelSelect.id.length === 0 : this.dataModelSelect.id <= 0)) &&
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
  onActionSelect(model: SmsMainClientApplicationModel): void {
    this.dataModelSelect = model;
    this.optionChange.emit(this.dataModelSelect);
  }
  onActionSelectClear(): void {
    this.dataModelSelect = null;
    this.formControl.setValue(null);
    this.optionChange.emit(null);
  }
  push(
    newvalue: SmsMainClientApplicationModel,
  ): Observable<SmsMainClientApplicationModel[]> {
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
  onActionSelectForce(id: string | number | SmsMainClientApplicationModel): void {
    if ((typeof id === "string" && id.length > 0) || (typeof id === "number" && id > 0)) {
      const idStr = typeof id === "string" ? id : String(id);
      if (this.dataModelSelect && String(this.dataModelSelect.id) === idStr) {
        return;
      }
      if (
        this.dataModelResult &&
        this.dataModelResult.listItems &&
        this.dataModelResult.listItems.find((x) => String(x.id) === idStr)
      ) {
        const item = this.dataModelResult.listItems.find((x) => String(x.id) === idStr);
        this.dataModelSelect = item;
        this.formControl.setValue(item);
        return;
      }
      this.categoryService.ServiceGetOneById(idStr).subscribe({
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
    if (typeof id === typeof SmsMainClientApplicationModel) {
      this.filteredOptions = this.push(id as SmsMainClientApplicationModel);
      this.dataModelSelect = id as SmsMainClientApplicationModel;
      this.formControl.setValue(id);
      return;
    }
    this.formControl.setValue(null);
  }

  onActionButtonReload(): void {
    this.dataModelSelect = new SmsMainClientApplicationModel();
    this.loadOptions();
  }
}
