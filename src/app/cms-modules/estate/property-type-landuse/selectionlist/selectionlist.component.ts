
import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import {
  CoreEnumService,
  ErrorExceptionResult, EstatePropertyTypeLanduseModel,
  EstatePropertyTypeLanduseService, FilterModel
} from 'ntk-cms-api';
import { Subscription } from 'rxjs';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { CmsStoreService } from 'src/app/core/reducers/cmsStore.service';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';


@Component({
  selector: 'app-estate-property-type-landuse-selectionlist',
  templateUrl: './selectionlist.component.html',
  standalone: false
})
export class EstatePropertyTypeLanduseSelectionlistComponent implements OnInit, OnDestroy {

  constructorInfoAreaId = this.constructor.name;
  constructor(
    public coreEnumService: CoreEnumService,
    public categoryService: EstatePropertyTypeLanduseService,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
    public tokenHelper: TokenHelper,
    public translate: TranslateService,
    private cmsStoreService: CmsStoreService,
    private cmsToastrService: CmsToastrService) {
    this.publicHelper.processService.cdr = this.cdr;
  }
  dataModelResult: ErrorExceptionResult<EstatePropertyTypeLanduseModel> = new ErrorExceptionResult<EstatePropertyTypeLanduseModel>();
  dataModelSelect: EstatePropertyTypeLanduseModel[] = [];
  dataIdsSelect: string[] = [];

  formControl = new FormControl();
  fieldsStatus: Map<string, boolean> = new Map<string, boolean>();

  @Input() optionDisabled = false;
  @Input() optionSelectFirstItem = false;
  @Input() optionPlaceholder = '';
  @Output() optionChange = new EventEmitter<EstatePropertyTypeLanduseModel[]>();
  @Output() optionSelectAdded = new EventEmitter();
  @Output() optionSelectRemoved = new EventEmitter();
  @Input() optionReload = () => this.onActionButtonReload();
  @Input() set optionSelectForce(x: string[] | EstatePropertyTypeLanduseModel[]) {
    this.onActionSelectForce(x);
  }
  cmsApiStoreSubscribe: Subscription;

  ngOnInit(): void {
    setTimeout(() => {

      this.DataGetAll();
    }, 500);
    this.cmsApiStoreSubscribe = this.cmsStoreService.getState((state) => state.tokenInfoStore).subscribe(async (value) => {
      this.DataGetAll();
    });
  }
  ngOnDestroy(): void {
    if (this.cmsApiStoreSubscribe) {
      this.cmsApiStoreSubscribe.unsubscribe();
    }
  }
  DataGetAll(): void {
    const filterModel = new FilterModel();
    filterModel.rowPerPage = 50;
    filterModel.accessLoad = true;


    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });

    this.categoryService.ServiceGetAll(filterModel).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.dataModelResult = ret;
          this.dataModelResult.listItems.forEach((el) => this.fieldsStatus.set(el.id, false));
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
      }
    }
    );
  }
  onActionSelect(value: EstatePropertyTypeLanduseModel): void {
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


  onActionSelectForce(ids: string[] | EstatePropertyTypeLanduseModel[]): void {
    if (typeof ids === typeof Array(String)) {
      ids.forEach(element => {
        this.dataIdsSelect.push(element);
      });
    } else if (typeof ids === typeof Array(EstatePropertyTypeLanduseModel)) {
      ids.forEach(element => {
        this.dataIdsSelect.push(element.id);
      });
    }
    this.dataIdsSelect.forEach((el) => this.fieldsStatus.set(el, true));
  }

  onActionButtonReload(): void {
    this.DataGetAll();
  }
}
