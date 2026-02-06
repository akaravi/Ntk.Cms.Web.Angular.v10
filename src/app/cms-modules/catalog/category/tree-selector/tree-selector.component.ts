import { SelectionModel } from "@angular/cdk/collections";
import { NestedTreeControl } from "@angular/cdk/tree";
import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { TranslateService } from "@ngx-translate/core";
import {
    CatalogCategoryModel,
    CatalogCategoryService,
    CoreEnumService,
    ErrorExceptionResult,
    FilterModel,
} from "ntk-cms-api";
import { Subscription } from "rxjs";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

@Component({
  selector: "app-catalog-category-treeselector",
  templateUrl: "./tree-selector.component.html",
  standalone: false,
})
export class CatalogCategoryTreeSelectorComponent implements OnInit, OnDestroy {
  constructorInfoAreaId = this.constructor.name;
  constructor(
    public cmsToastrService: CmsToastrService,
    public coreEnumService: CoreEnumService,
    public categoryService: CatalogCategoryService,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
    public translate: TranslateService,
    private tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
    public dialog: MatDialog,
  ) {
    this.publicHelper.processService.cdr = this.cdr;

    this.checklistSelection.changed.subscribe((x) => {
      if (!this.runComplate) {
        return;
      }
      const listId = [];
      this.checklistSelection.selected.forEach((element) => {
        listId.push(element.id);
      });
      this.optionModelChange.emit(listId);
      if (x.added && x.added.length > 0) {
        x.added.forEach((element) => {
          this.optionSelectChecked.emit(element.id);
        });
      }
      if (x.removed && x.removed.length > 0) {
        x.removed.forEach((element) => {
          this.optionSelectDisChecked.emit(element.id);
        });
      }
    });
  }
  @Input()
  set optionModel(model: string[]) {
    this.dataModelSelect = model;
    this.loadCheked();
  }

  dataModelSelect: string[] = [];
  dataModelResult: ErrorExceptionResult<CatalogCategoryModel> =
    new ErrorExceptionResult<CatalogCategoryModel>();
  filterModel = new FilterModel();

  dataSource = new MatTreeNestedDataSource<CatalogCategoryModel>();
  runComplate = false;
  @Output() optionSelectChecked = new EventEmitter<string>();
  @Output() optionSelectDisChecked = new EventEmitter<string>();
  @Output() optionModelChange = new EventEmitter<string[]>();
  private unsubscribe: Subscription[] = [];

  checklistSelection = new SelectionModel<CatalogCategoryModel>(
    true /* multiple */,
  );

  hasChild = (_: string, node: CatalogCategoryModel) =>
    !!node.children && node.children.length > 0;
  childrenAccessor = (node: CatalogCategoryModel) => node.children ?? [];
  hasNoContent = (_: string, nodeData: CatalogCategoryModel) =>
    nodeData.children;

  ngOnInit(): void {
    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.tokenInfoStore)
        .subscribe(async (value) => {
          this.DataGetAll();
        }),
    );
  }
  ngOnDestroy(): void {
    if (this.unsubscribe) this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  loadCheked() {
    this.runComplate = false;
    this.CompileDataByCheked(
      this.dataModelResult.listItems,
      this.dataModelSelect,
    );
    this.runComplate = true;
  }
  CompileDataByCheked(
    model: CatalogCategoryModel[],
    selectedItems: string[],
  ): boolean {
    if (!(model?.length > 0)) return false;
    let checkedAny = false;
    for (const item of model) {
      let localCheckedAny = false;
      if (selectedItems?.includes(item.id)) {
        this.checklistSelection.select(item);
        checkedAny = true;
      } else {
        this.checklistSelection.deselect(item);
      }
      if (item.children?.length > 0) {
        localCheckedAny = this.CompileDataByCheked(
          item.children,
          selectedItems,
        );
        if (localCheckedAny) {
          checkedAny = true;
          item["isExpanded"] = true;
        }
      }
    }
    return checkedAny;
  }
  DataGetAll(): void {
    this.filterModel.rowPerPage = 200;
    this.filterModel.accessLoad = true;

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

    this.categoryService.ServiceGetAll(this.filterModel).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.dataModelResult = ret;
          this.dataSource.data = this.dataModelResult.listItems;
          this.loadCheked();
        } else {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.publicHelper.processService.processStop(pName);
      },
      error: (er) => {
        this.publicHelper.processService.processStop(pName);
        this.cmsToastrService.typeError(er);
      },
    });
  }
  treeControl = new NestedTreeControl<CatalogCategoryModel>(
    (node) => node.children,
  );
  /** Whether all the descendants of the node are selected */
  descendantsAllSelected(node: CatalogCategoryModel): boolean {
    const descendants = this.treeControl.getDescendants(node);
    return descendants.every((child) =>
      this.checklistSelection.isSelected(child),
    );
  }
  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: CatalogCategoryModel): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some((child) =>
      this.checklistSelection.isSelected(child),
    );
    return result && !this.descendantsAllSelected(node);
  }
  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: CatalogCategoryModel): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
  }
}
