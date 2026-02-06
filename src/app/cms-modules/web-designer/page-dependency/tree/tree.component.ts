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
    CoreEnumService,
    ErrorExceptionResult,
    FilterModel,
    WebDesignerMainPageDependencyModel,
    WebDesignerMainPageDependencyService,
} from "ntk-cms-api";
import { Subscription } from "rxjs";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
import { ThemeService } from "src/app/core/services/theme.service";
import { environment } from "src/environments/environment";
import { WebDesignerMainPageDependencyAddComponent } from "../add/add.component";
import { WebDesignerMainPageDependencyEditComponent } from "../edit/edit.component";

@Component({
  selector: "app-webdesigner-pagedependency-tree",
  templateUrl: "./tree.component.html",
  standalone: false,
})
export class WebDesignerMainPageDependencyTreeComponent
  implements OnInit, OnDestroy
{
  constructorInfoAreaId = this.constructor.name;
  constructor(
    public cmsToastrService: CmsToastrService,
    public coreEnumService: CoreEnumService,
    public categoryService: WebDesignerMainPageDependencyService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
    private tokenHelper: TokenHelper,
    public themeService: ThemeService,
    private cmsStoreService: CmsStoreService,
    private translate: TranslateService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;
  }
  @Input() set optionSelectForce(
    x: number | WebDesignerMainPageDependencyModel,
  ) {
    this.onActionSelectForce(x);
  }
  dataModelSelect: WebDesignerMainPageDependencyModel | null = new WebDesignerMainPageDependencyModel();
  dataModelResult: ErrorExceptionResult<WebDesignerMainPageDependencyModel> =
    new ErrorExceptionResult<WebDesignerMainPageDependencyModel>();
  filterModel = new FilterModel();

  dataSource =
    new MatTreeNestedDataSource<WebDesignerMainPageDependencyModel>();
  @Output() optionChange =
    new EventEmitter<WebDesignerMainPageDependencyModel>();
  private unsubscribe: Subscription[] = [];
  @Input() optionReload = () => this.onActionButtonReload();
  hasChild = (_: number, node: WebDesignerMainPageDependencyModel) => false;
  childrenAccessor = (node: WebDesignerMainPageDependencyModel) => [];
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
        }
        this.publicHelper.processService.processStop(pName);
      },
      error: (err) => {
        this.cmsToastrService.typeError(err);
        this.publicHelper.processService.processStop(pName);
      },
    });
  }
  onActionSelect(model: WebDesignerMainPageDependencyModel): void {
    if (model && this.dataModelSelect && model.id == this.dataModelSelect.id) {
      this.dataModelSelect = null;
      this.optionChange.emit(null);
    } else {
      this.dataModelSelect = model;
      this.optionChange.emit(this.dataModelSelect);
    }
  }
  onActionButtonReload(): void {
    this.onActionSelect(null);
    this.dataModelSelect = new WebDesignerMainPageDependencyModel();
    this.DataGetAll();
  }
  onActionSelectForce(id: number | WebDesignerMainPageDependencyModel): void {}
  onActionAdd(): void {
    var panelClass = "";
    if (this.publicHelper.isMobile) panelClass = "dialog-fullscreen";
    else panelClass = "dialog-min";
    const dialogRef = this.dialog.open(
      WebDesignerMainPageDependencyAddComponent,
      {
        height: "90%",
        panelClass: panelClass,
        enterAnimationDuration:
          environment.cmsViewConfig.enterAnimationDuration,
        exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
        data: {},
      },
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
        this.DataGetAll();
      }
    });
  }
  onActionEdit(): void {
    let id = "";
    if (this.dataModelSelect && this.dataModelSelect.id?.length > 0) {
      id = this.dataModelSelect.id;
    }
    if (id.length === 0) {
      this.translate
        .get("ERRORMESSAGE.MESSAGE.typeErrorCategoryNotSelected")
        .subscribe((str: string) => {
          this.cmsToastrService.typeErrorSelected(str);
        });
      return;
    }
    var panelClass = "";
    if (this.publicHelper.isMobile) panelClass = "dialog-fullscreen";
    else panelClass = "dialog-min";
    const dialogRef = this.dialog.open(
      WebDesignerMainPageDependencyEditComponent,
      {
        height: "90%",
        panelClass: panelClass,
        enterAnimationDuration:
          environment.cmsViewConfig.enterAnimationDuration,
        exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
        data: { id },
      },
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
        this.DataGetAll();
      }
    });
  }
}
