
import { NestedTreeControl } from '@angular/cdk/tree';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatTreeNestedDataSource
} from '@angular/material/tree';
import { TranslateService } from '@ngx-translate/core';
import {
  BankPaymentPrivateSiteConfigModel,
  BankPaymentPrivateSiteConfigService, CoreEnumService,
  ErrorExceptionResult,
  FilterModel
} from 'ntk-cms-api';
import { Subscription } from 'rxjs';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
import { environment } from 'src/environments/environment';
import { BankPaymentPrivateSiteConfigAddComponent } from '../add/add.component';
import { BankPaymentPrivateSiteConfigEditComponent } from '../edit/edit.component';
import { CmsStoreService } from 'src/app/core/reducers/cmsStore.service';


@Component({
  selector: 'app-bankpayment-privatesiteconfig-tree',
  templateUrl: './tree.component.html',
  standalone: false
})
export class BankPaymentPrivateSiteConfigTreeComponent implements OnInit, OnDestroy {
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private cmsToastrService: CmsToastrService,
    public coreEnumService: CoreEnumService,
    public categoryService: BankPaymentPrivateSiteConfigService,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
    private tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
    public translate: TranslateService,
    public dialog: MatDialog
  ) {
    this.publicHelper.processService.cdr = this.cdr;

  }
  @Input() set optionSelectForce(x: number | BankPaymentPrivateSiteConfigModel) {
    this.onActionSelectForce(x);
  }
  dataModelSelect: BankPaymentPrivateSiteConfigModel = new BankPaymentPrivateSiteConfigModel();
  dataModelResult: ErrorExceptionResult<BankPaymentPrivateSiteConfigModel> = new ErrorExceptionResult<BankPaymentPrivateSiteConfigModel>();
  filterModel = new FilterModel();


  treeControl = new NestedTreeControl<BankPaymentPrivateSiteConfigModel>(node => null);
  dataSource = new MatTreeNestedDataSource<BankPaymentPrivateSiteConfigModel>();
  @Output() optionChange = new EventEmitter<BankPaymentPrivateSiteConfigModel>();
  cmsApiStoreSubscribe: Subscription;
  @Input() optionReload = () => this.onActionButtonReload();
  hasChild = (_: number, node: BankPaymentPrivateSiteConfigModel) => false;

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
    this.filterModel.rowPerPage = 200;
    this.filterModel.accessLoad = true;
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
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
      }
    }
    );
  }
  onActionSelect(model: BankPaymentPrivateSiteConfigModel): void {
    this.dataModelSelect = model;
    this.optionChange.emit(this.dataModelSelect);
  }
  onActionButtonReload(): void {
    this.onActionSelect(null);

    this.dataModelSelect = new BankPaymentPrivateSiteConfigModel();
    this.DataGetAll();
  }
  onActionSelectForce(id: number | BankPaymentPrivateSiteConfigModel): void {
  }
  onActionAdd(): void {
    var panelClass = '';
    if (this.publicHelper.isMobile)
      panelClass = 'dialog-fullscreen';
    else
      panelClass = 'dialog-min';
    const dialogRef = this.dialog.open(BankPaymentPrivateSiteConfigAddComponent, {
      height: '90%',
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.dialogChangedDate) {
        this.DataGetAll();
      }
    });
  }
  onActionEdit(): void {
    let id = 0;
    if (this.dataModelSelect && this.dataModelSelect.id > 0) {
      id = this.dataModelSelect.id;
    }
    if (id === 0) {
      this.translate.get('ERRORMESSAGE.MESSAGE.typeErrorCategoryNotSelected').subscribe((str: string) => { this.cmsToastrService.typeErrorSelected(str); });
      return;
    }
    var panelClass = '';
    if (this.publicHelper.isMobile)
      panelClass = 'dialog-fullscreen';
    else
      panelClass = 'dialog-min';
    const dialogRef = this.dialog.open(BankPaymentPrivateSiteConfigEditComponent, {
      height: '90%',
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: { id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.dialogChangedDate) {
        this.DataGetAll();
      }
    });
  }
}
