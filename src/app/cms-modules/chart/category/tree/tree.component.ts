
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
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
  MatTreeNestedDataSource
} from '@angular/material/tree';
import { TranslateService } from '@ngx-translate/core';
import {
  ChartCategoryModel,
  ChartCategoryService, CoreEnumService,
  ErrorExceptionResult,
  FilterModel
} from 'ntk-cms-api';
import { Subscription } from 'rxjs';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
import { environment } from 'src/environments/environment';
import { ChartCategoryAddComponent } from '../add/add.component';
import { ChartCategoryDeleteComponent } from '../delete/delete.component';
import { ChartCategoryEditComponent } from '../edit/edit.component';
import { CmsStoreService } from 'src/app/core/reducers/cmsStore.service';



@Component({
  selector: 'app-chart-category-tree',
  templateUrl: './tree.component.html',
  standalone: false
})
export class ChartCategoryTreeComponent implements OnInit, OnDestroy {
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private cmsToastrService: CmsToastrService,
    public coreEnumService: CoreEnumService,
    public categoryService: ChartCategoryService,
    private tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
    public translate: TranslateService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
  ) {
    this.publicHelper.processService.cdr = this.cdr;

  }
  @Input() set optionSelectForce(x: number | ChartCategoryModel) {
    this.onActionSelectForce(x);
  }
  dataModelSelect: ChartCategoryModel = new ChartCategoryModel();
  dataModelResult: ErrorExceptionResult<ChartCategoryModel> = new ErrorExceptionResult<ChartCategoryModel>();
  filterModel = new FilterModel();


  treeControl = new NestedTreeControl<ChartCategoryModel>(node => node.children);
  dataSource = new MatTreeNestedDataSource<ChartCategoryModel>();
  @Output() optionChange = new EventEmitter<ChartCategoryModel>();
  cmsApiStoreSubscribe: Subscription;
  @Input() optionReload = () => this.onActionButtonReload();

  hasChild = (_: number, node: ChartCategoryModel) => !!node.children && node.children.length > 0;


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
  onActionSelect(model: ChartCategoryModel): void {
    this.dataModelSelect = model;
    this.optionChange.emit(this.dataModelSelect);
  }
  onActionButtonReload(): void {
    this.onActionSelect(null);

    this.dataModelSelect = new ChartCategoryModel();
    this.DataGetAll();
  }
  onActionSelectForce(id: number | ChartCategoryModel): void {

  }

  onActionAdd(): void {
    let parentId = 0;
    if (this.dataModelSelect && this.dataModelSelect.id > 0) {
      parentId = this.dataModelSelect.id;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { parentId };


    const dialogRef = this.dialog.open(ChartCategoryAddComponent, dialogConfig);
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
    const dialogRef = this.dialog.open(ChartCategoryEditComponent, {
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

  onActionDelete(): void {
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
    const dialogRef = this.dialog.open(ChartCategoryDeleteComponent, {
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
