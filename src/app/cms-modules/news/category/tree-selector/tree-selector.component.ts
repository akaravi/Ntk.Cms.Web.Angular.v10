
import { SelectionModel } from '@angular/cdk/collections';
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
  CoreEnumService,
  ErrorExceptionResult,
  FilterModel,
  NewsCategoryModel,
  NewsCategoryService
} from 'ntk-cms-api';
import { Subscription } from 'rxjs';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
import { CmsStoreService } from 'src/app/core/reducers/cmsStore.service';


@Component({
  selector: 'app-news-category-treeselector',
  templateUrl: './tree-selector.component.html',
  standalone: false
})
export class NewsCategoryTreeSelectorComponent implements OnInit, OnDestroy {
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private cmsToastrService: CmsToastrService,
    public coreEnumService: CoreEnumService,
    public categoryService: NewsCategoryService,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
    public dialog: MatDialog,
    public translate: TranslateService,
    private tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;
    this.checklistSelection.changed.subscribe(x => {
      if (!this.runComplate) {
        return;
      }
      const listId = [];
      this.checklistSelection.selected.forEach(element => {
        listId.push(element.id);
      });
      this.optionModelChange.emit(listId);
      if (x.added && x.added.length > 0) {
        x.added.forEach(element => {
          this.optionSelectChecked.emit(element.id);
        });
      }
      if (x.removed && x.removed.length > 0) {
        x.removed.forEach(element => {
          this.optionSelectDisChecked.emit(element.id);
        });
      }
    });
  }
  @Input()
  set optionModel(model: number[]) {
    this.dataModelSelect = model;
    this.loadCheked();
  }
  dataModelSelect: number[] = [];
  dataModelResult: ErrorExceptionResult<NewsCategoryModel> = new ErrorExceptionResult<NewsCategoryModel>();
  filterModel = new FilterModel();

  treeControl = new NestedTreeControl<NewsCategoryModel>(node => node.children);
  dataSource = new MatTreeNestedDataSource<NewsCategoryModel>();
  runComplate = false;
  @Output() optionSelectChecked = new EventEmitter<number>();
  @Output() optionSelectDisChecked = new EventEmitter<number>();
  @Output() optionModelChange = new EventEmitter<number[]>();
  cmsApiStoreSubscribe: Subscription;
  checklistSelection = new SelectionModel<NewsCategoryModel>(true /* multiple */);
  hasChild = (_: number, node: NewsCategoryModel) => !!node.children && node.children.length > 0;
  hasNoContent = (_: number, nodeData: NewsCategoryModel) => nodeData.children;

  ngOnInit(): void {
    setTimeout(() => {

      this.DataGetAll();
    }, 500);
    this.cmsApiStoreSubscribe = this.cmsStoreService.getState((state) => state.tokenInfoStore).subscribe(async (value) => {
      this.DataGetAll();
    })
  }
  ngOnDestroy(): void {
    if (this.cmsApiStoreSubscribe) {
      this.cmsApiStoreSubscribe.unsubscribe();
    }
  }
  loadCheked(model: NewsCategoryModel[] = this.treeControl.dataNodes): void {
    this.runComplate = false;
    if (this.treeControl.dataNodes && this.dataModelSelect && this.dataModelSelect.length > 0) {
      model.forEach(element => {
        const fItem = this.dataModelSelect.find(z => z === element.id);
        if (fItem) {
          this.checklistSelection.select(element);
        }
        if (element.children && element.children.length > 0) {
          this.loadCheked(element.children);
        }
      });
    }
    this.runComplate = true;
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
          this.treeControl.dataNodes = this.dataModelResult.listItems;
          this.loadCheked();
        }
        else {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.publicHelper.processService.processStop(pName);
      },
      error: (er) => {
        this.publicHelper.processService.processStop(pName);
        this.cmsToastrService.typeError(er);
      }
    }
    );
  }
  /** Whether all the descendants of the node are selected */
  descendantsAllSelected(node: NewsCategoryModel): boolean {
    const descendants = this.treeControl.getDescendants(node);
    return descendants.every(child => this.checklistSelection.isSelected(child));
  }
  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: NewsCategoryModel): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }
  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: NewsCategoryModel): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
  }
}
