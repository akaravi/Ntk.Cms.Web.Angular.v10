
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TranslateService } from '@ngx-translate/core';
import {
  ActionGoStepEnum, CoreCpMainMenuModel,
  CoreCpMainMenuService, CoreEnumService,
  EditStepDtoModel, ErrorExceptionResult, FilterDataModel, FilterModel, InfoEnumModel, RecordStatusEnum, SortTypeEnum
} from 'ntk-cms-api';
import { Subscription } from 'rxjs';
import { ListBaseComponent } from 'src/app/core/cmsComponent/listBaseComponent';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
import { PageInfoService } from 'src/app/core/services/page-info.service';
import { CmsConfirmationDialogService } from 'src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service';
import { environment } from 'src/environments/environment';
import { CoreCpMainMenuAddComponent } from '../add/add.component';
import { CoreCpMainMenuEditComponent } from '../edit/edit.component';
import { CmsStoreService } from 'src/app/core/reducers/cmsStore.service';
import { ThemeService } from 'src/app/core/services/theme.service';


@Component({
  selector: 'app-core-user-list',
  templateUrl: './list.component.html',
  standalone: false
})
export class CoreCpMainMenuListComponent extends ListBaseComponent<CoreCpMainMenuService, CoreCpMainMenuModel, number>
  implements OnInit, OnDestroy {
  constructorInfoAreaId = this.constructor.name;
  constructor(
    public contentService: CoreCpMainMenuService,
    private cmsConfirmationDialogService: CmsConfirmationDialogService,
    private cmsToastrService: CmsToastrService,
    public tokenHelper: TokenHelper,
    public coreEnumService: CoreEnumService,
    private cdr: ChangeDetectorRef,
    private cmsStoreService: CmsStoreService,
    public translate: TranslateService,
    public pageInfo: PageInfoService,
    public publicHelper: PublicHelper,
    public themeService: ThemeService,
    public dialog: MatDialog) {
    super(contentService, new CoreCpMainMenuModel(), publicHelper, tokenHelper, translate);
    this.publicHelper.processService.cdr = this.cdr;

    this.optionsSearch.parentMethods = {
      onSubmit: (model) => this.onSubmitOptionsSearch(model),
    };

    /*filter Sort*/
    this.filteModelContent.sortColumn = 'ShowInMenuOrder';
    this.filteModelContent.sortType = SortTypeEnum.Ascending;
  }
  comment: string;
  author: string;
  flag = false;
  tableContentSelected = [];

  filteModelContent = new FilterModel();



  tabledisplayedColumns: string[] = [];
  tabledisplayedColumnsSource: string[] = [
    'Icon',
    'Id',
    'RecordStatus',
    // 'Title',
    'TitleML',
    'ShowInMenu',
    'ShowInAccessAdminAllowToProfessionalData',
    'MenuPlaceType',
    'ShowInMenuOrder',
    // 'Action',
    'position'
  ];
  tabledisplayedColumnsMobileSource: string[] = [
    'Icon',
    'Id',
    'RecordStatus',
    // 'Title',
    'TitleML',
    'ShowInMenu',
    'ShowInAccessAdminAllowToProfessionalData',
    'MenuPlaceType',
    'ShowInMenuOrder',
    // 'Action',
    'position'
  ];

  dataModelEnumMenuPlaceTypeResult: ErrorExceptionResult<InfoEnumModel> = new ErrorExceptionResult<InfoEnumModel>();


  expandedElement: CoreCpMainMenuModel | null;
  cmsApiStoreSubscribe: Subscription;
  categoryModelSelected: CoreCpMainMenuModel;
  ngOnInit(): void {

    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;
    if (this.tokenInfo) {
      this.DataGetAll();
    }

    this.cmsApiStoreSubscribe = this.cmsStoreService.getState((state) => state.tokenInfoStore).subscribe(async (value) => {
      this.tokenInfo = value;
      this.DataGetAll();
    });
    this.getEnumMenuPlaceType();
  }
  getEnumMenuPlaceType(): void {
    this.coreEnumService.ServiceMenuPlaceTypeEnum().subscribe({
      next: (ret) => {
        this.dataModelEnumMenuPlaceTypeResult = ret;
      }
    });
  }
  ngOnDestroy(): void {
    if (this.cmsApiStoreSubscribe) {
      this.cmsApiStoreSubscribe.unsubscribe();
    }
  }


  DataGetAll(): void {
    this.tabledisplayedColumns = this.publicHelper.TableDisplayedColumns(this.tabledisplayedColumnsSource, this.tabledisplayedColumnsMobileSource, [], this.tokenInfo);
    this.tableRowsSelected = [];
    this.onActionTableRowSelect(new CoreCpMainMenuModel());
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.get_information_list').subscribe((str: string) => { this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId); });
    this.filteModelContent.accessLoad = true;

    /*filter CLone*/
    const filterModel = JSON.parse(JSON.stringify(this.filteModelContent));
    /*filter CLone*/
    if (this.categoryModelSelected && this.categoryModelSelected.id > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = 'LinkParentId';
      filter.value = this.categoryModelSelected.id;
      filterModel.filters.push(filter);
    }
    this.contentService.ServiceGetAllEditor(filterModel).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
          this.dataModelResult = ret;
          this.tableSource.data = ret.listItems;
          if (this.optionsStatist?.data?.show)
            this.onActionButtonStatist(true);
          setTimeout(() => {
            if (this.optionsSearch.childMethods)
              this.optionsSearch.childMethods.setAccess(ret.access);
          }, 1000);
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


  onTableSortData(sort: MatSort): void {
    if (this.tableSource && this.tableSource.sort && this.tableSource.sort.active === sort.active) {
      if (this.tableSource.sort.start === 'asc') {
        sort.start = 'desc';
        this.filteModelContent.sortColumn = sort.active;
        this.filteModelContent.sortType = SortTypeEnum.Descending;
      } else if (this.tableSource.sort.start === 'desc') {
        sort.start = 'asc';
        this.filteModelContent.sortColumn = '';
        this.filteModelContent.sortType = SortTypeEnum.Ascending;
      } else {
        sort.start = 'desc';
      }
    } else {
      this.filteModelContent.sortColumn = sort.active;
      this.filteModelContent.sortType = SortTypeEnum.Descending;
    }
    this.tableSource.sort = sort;
    this.filteModelContent.currentPageNumber = 0;
    this.DataGetAll();
  }
  onTablePageingData(event?: PageEvent): void {
    this.filteModelContent.currentPageNumber = event.pageIndex + 1;
    this.filteModelContent.rowPerPage = event.pageSize;
    this.DataGetAll();
  }

  onTableDropRow(event: CdkDragDrop<CoreCpMainMenuModel[]>): void {
    const previousIndex = this.tableSource.data.findIndex(row => row === event.item.data);
    const model = new EditStepDtoModel<number>();
    model.id = this.tableSource.data[previousIndex].id;
    model.centerId = this.tableSource.data[event.currentIndex].id;
    if (previousIndex > event.currentIndex) {
      model.actionGo = ActionGoStepEnum.GoUp;
    }
    else {
      model.actionGo = ActionGoStepEnum.GoDown;
    }
    this.contentService.ServiceEditStep(model).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          moveItemInArray(this.tableSource.data, previousIndex, event.currentIndex);
          this.tableSource.data = this.tableSource.data.slice();
        } else {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
      },
      error: (er) => {
        this.cmsToastrService.typeError(er);
      }
    }
    );
  }
  onActionSelectorSelect(model: CoreCpMainMenuModel | null): void {

    /*filter */
    var sortColumn = this.filteModelContent.sortColumn;
    var sortType = this.filteModelContent.sortType;
    this.filteModelContent = new FilterModel();
    this.filteModelContent.sortColumn = sortColumn;
    this.filteModelContent.sortType = sortType;
    /*filter */
    this.filteModelContent.sortColumn = 'ShowInMenuOrder';
    this.categoryModelSelected = model;
    this.DataGetAll();
  }
  onActionButtonNewRow(): void {

    if (
      this.dataModelResult == null ||
      this.dataModelResult.access == null ||
      !this.dataModelResult.access.accessAddRow
    ) {
      this.cmsToastrService.typeErrorAccessAdd();
      return;
    }
    var panelClass = '';
    if (this.publicHelper.isMobile)
      panelClass = 'dialog-fullscreen';
    else
      panelClass = 'dialog-min';
    const dialogRef = this.dialog.open(CoreCpMainMenuAddComponent, {
      height: '90%',
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: { parentId: this.categoryModelSelected.id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.dialogChangedDate) {
        this.onActionButtonEditRow(result.model);
        //this.DataGetAll();
      }
    });
  }

  onActionButtonEditRow(model: CoreCpMainMenuModel = this.tableRowSelected): void {

    if (!model || !model.id || model.id === 0) {
      this.cmsToastrService.typeErrorSelectedRow();
      return;
    }
    this.onActionTableRowSelect(model);
    if (
      this.dataModelResult == null ||
      this.dataModelResult.access == null ||
      !this.dataModelResult.access.accessEditRow
    ) {
      this.cmsToastrService.typeErrorAccessEdit();
      return;
    }
    var panelClass = '';
    if (this.publicHelper.isMobile)
      panelClass = 'dialog-fullscreen';
    else
      panelClass = 'dialog-min';
    const dialogRef = this.dialog.open(CoreCpMainMenuEditComponent, {
      height: '90%',
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: { id: this.tableRowSelected.id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.dialogChangedDate) {
        this.DataGetAll();
      }
    });
  }

  onActionButtonDeleteRow(mode: CoreCpMainMenuModel = this.tableRowSelected): void {
    if (mode == null || !mode.id || mode.id === 0) {
      this.cmsToastrService.typeErrorDeleteRowIsNull();
      return;
    }
    this.tableRowSelected = mode;
    if (
      this.dataModelResult == null ||
      this.dataModelResult.access == null ||
      !this.dataModelResult.access.accessDeleteRow
    ) {
      this.cmsToastrService.typeErrorAccessDelete();
      return;
    }
    var title = "";
    var message = "";
    this.translate.get(['MESSAGE.Please_Confirm', 'MESSAGE.Do_you_want_to_delete_this_content']).subscribe((str: string) => {
      title = str['MESSAGE.Please_Confirm'];
      message = str['MESSAGE.Do_you_want_to_delete_this_content'] + '?' + '<br> ( ' + this.tableRowSelected.title + ' ) ';
    });
    this.cmsConfirmationDialogService.confirm(title, message)
      .then((confirmed) => {
        if (confirmed) {
          const pName = this.constructor.name + 'main';
          this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => {
            this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
          });

          this.contentService.ServiceDelete(this.tableRowSelected.id).subscribe({
            next: (ret) => {
              if (ret.isSuccess) {
                this.cmsToastrService.typeSuccessRemove();
                this.DataGetAll();
              } else {
                this.cmsToastrService.typeErrorRemove();
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
      }
      )
      .catch(() => {
        // console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)')
      }
      );
  }


  onActionButtonStatist(view = !this.optionsStatist.data.show): void {
    this.optionsStatist.data.show = view;
    if (!this.optionsStatist.data.show) {
      return;
    }
    const statist = new Map<string, number>();
    this.translate.get('MESSAGE.Active').subscribe((str: string) => { statist.set(str, 0); });
    this.translate.get('MESSAGE.All').subscribe((str: string) => { statist.set(str, 0); });
    const pName = this.constructor.name + '.ServiceStatist';
    this.translate.get('MESSAGE.Get_the_statist').subscribe((str: string) => { this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId); });
    this.contentService.ServiceGetCount(this.filteModelContent).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.translate.get('MESSAGE.All').subscribe((str: string) => { statist.set(str, ret.totalRowCount) });
          this.optionsStatist.childMethods.setStatistValue(statist);
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

    const filterStatist1 = JSON.parse(JSON.stringify(this.filteModelContent));
    const fastfilter = new FilterDataModel();
    fastfilter.propertyName = 'RecordStatus';
    fastfilter.value = RecordStatusEnum.Available;
    filterStatist1.filters.push(fastfilter);
    this.contentService.ServiceGetCount(filterStatist1).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.translate.get('MESSAGE.Active').subscribe((str: string) => { statist.set(str, ret.totalRowCount) });
          this.optionsStatist.childMethods.setStatistValue(statist);
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




  onActionButtonReload(): void {
    this.filteModelContent.sortColumn = 'ShowInMenuOrder';

    this.DataGetAll();
  }
  onSubmitOptionsSearch(model: any): void {
    this.filteModelContent.filters = model;
    this.DataGetAll();
  }


}
