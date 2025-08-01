
import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import {
  ClauseTypeEnum, CoreEnumService, ErrorExceptionResult, EstatePropertyTypeUsageModel,
  EstatePropertyTypeUsageService, FilterDataModel, FilterDataModelSearchTypesEnum, FilterModel
} from 'ntk-cms-api';
import { Observable, Subscription, firstValueFrom } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
import { CmsStoreService } from 'src/app/core/reducers/cmsStore.service';



@Component({
  selector: 'app-estate-property-type-usage-selector',
  templateUrl: './selector.component.html',
  standalone: false
})
export class EstatePropertyTypeUsageSelectorComponent implements OnInit, OnDestroy {

  constructorInfoAreaId = this.constructor.name;
  constructor(
    public coreEnumService: CoreEnumService,
    private cmsToastrService: CmsToastrService,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
    public translate: TranslateService,
    private tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
    public categoryService: EstatePropertyTypeUsageService) {
    this.publicHelper.processService.cdr = this.cdr;

  }

  dataModelResult: ErrorExceptionResult<EstatePropertyTypeUsageModel> = new ErrorExceptionResult<EstatePropertyTypeUsageModel>();
  dataModelSelect: EstatePropertyTypeUsageModel = new EstatePropertyTypeUsageModel();
  formControl = new FormControl();
  filteredOptions: Observable<EstatePropertyTypeUsageModel[]>;
  @Input() optionTypeView = 1;
  @Input() optionAllowUnSelect = false;
  @Input() optionDisabled = false;
  @Input() optionSelectFirstItem = false;
  @Input() optionPlaceholder = '';
  @Output() optionChange = new EventEmitter<EstatePropertyTypeUsageModel>();
  @Input() optionReload = () => this.onActionButtonReload();
  @Input() set optionSelectForce(x: string | EstatePropertyTypeUsageModel) {
    if (x && ((typeof x === 'string' && x.length > 0) || typeof x === typeof EstatePropertyTypeUsageModel))
      this.onActionSelectForce(x);
  }
  cmsApiStoreSubscribe: Subscription;



  ngOnInit(): void {
    this.loadOptions();
    this.cmsApiStoreSubscribe = this.cmsStoreService.getState((state) => state.tokenInfoStore).subscribe(async (value) => {
      this.loadOptions();
    });
  }
  ngOnDestroy(): void {
    if (this.cmsApiStoreSubscribe) {
      this.cmsApiStoreSubscribe.unsubscribe();
    }
  }
  loadOptions(): void {
    this.filteredOptions = this.formControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(1500),
        distinctUntilChanged(),
        switchMap(val => {
          if (typeof val === 'string' || typeof val === 'number') {
            return this.DataGetAll(val || '');
          }
          return [];
        }),
        // tap(() => this.myControl.setValue(this.options[0]))
      );
  }

  displayFn(model?: EstatePropertyTypeUsageModel): string | undefined {
    return model ? model.titleML : undefined;
  }
  displayOption(model?: EstatePropertyTypeUsageModel): string | undefined {
    return model ? model.titleML : undefined;
  }
  async DataGetAll(text: string | number | any): Promise<EstatePropertyTypeUsageModel[]> {
    const filterModel = new FilterModel();
    filterModel.rowPerPage = 20;
    filterModel.accessLoad = true;

    if (typeof text === 'string' && text.length > 0) {
      let filter = new FilterDataModel();
      filter.propertyName = 'Name';
      filter.value = text;
      filter.searchType = FilterDataModelSearchTypesEnum.Contains;
      filterModel.filters.push(filter);
      /* */
      filter = new FilterDataModel();
      filter.propertyName = 'Id';
      filter.value = text;
      filter.searchType = FilterDataModelSearchTypesEnum.Equal;
      filter.clauseType = ClauseTypeEnum.Or;
      filterModel.filters.push(filter);
    }

    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });

    return await firstValueFrom(this.categoryService.ServiceGetAll(filterModel))
      .then(
        (response) => {
          this.dataModelResult = response;
          /*select First Item */
          if (this.optionSelectFirstItem &&
            (!this.dataModelSelect || !this.dataModelSelect.id || this.dataModelSelect.id.length === 0) &&
            this.dataModelResult.listItems.length > 0) {
            this.optionSelectFirstItem = false;
            setTimeout(() => { this.formControl.setValue(this.dataModelResult.listItems[0]); }, 1000);
            this.onActionSelect(this.dataModelResult.listItems[0]);
          }
          /*select First Item */
          this.publicHelper.processService.processStop(pName);

          return response.listItems;
        });
  }
  onActionSelect(model: EstatePropertyTypeUsageModel): void {
    if (this.optionDisabled) {
      return;
    }
    if (this.optionAllowUnSelect && this.dataModelSelect && this.dataModelSelect.id == model.id)
      this.onActionSelectClear()
    this.dataModelSelect = model;
    this.optionChange.emit(this.dataModelSelect);
  }
  onActionSelectClear(): void {
    if (this.optionDisabled) {
      return;
    }
    this.dataModelSelect = null;
    this.formControl.patchValue('');
    this.optionChange.emit(null);
    this.cdr.detectChanges();
  }

  push(newvalue: EstatePropertyTypeUsageModel): Observable<EstatePropertyTypeUsageModel[]> {
    return this.filteredOptions.pipe(map(items => {
      if (items.find(x => x.id === newvalue.id)) {
        return items;
      }
      items.push(newvalue);
      return items;
    }));

  }
  onActionSelectForce(id: string | EstatePropertyTypeUsageModel): void {
    if (!id || (typeof id === 'string' && id.length === 0)) {
      this.dataModelSelect = new EstatePropertyTypeUsageModel();
    }
    if (typeof id === 'string' && id.length > 0) {
      if (this.dataModelSelect && this.dataModelSelect.id === id) {
        return;
      }
      if (this.dataModelResult && this.dataModelResult.listItems && this.dataModelResult.listItems.find(x => x.id === id)) {
        const item = this.dataModelResult.listItems.find(x => x.id === id);
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
        }
      });
      return;
    }
    if (typeof id === typeof EstatePropertyTypeUsageModel) {
      this.filteredOptions = this.push((id as EstatePropertyTypeUsageModel));
      this.dataModelSelect = (id as EstatePropertyTypeUsageModel);
      this.formControl.setValue(id);
      return;
    }
    this.formControl.setValue(null);
  }

  onActionButtonReload(): void {
    // if (this.dataModelSelect && this.dataModelSelect.id > 0) {
    //   this.onActionSelect(null);
    // }
    this.dataModelSelect = new EstatePropertyTypeUsageModel();
    // this.optionsData.Select = new EstatePropertyTypeUsageModel();
    this.loadOptions();
  }
}
