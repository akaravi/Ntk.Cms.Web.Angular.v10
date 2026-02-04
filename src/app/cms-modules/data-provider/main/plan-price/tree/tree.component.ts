
import { MatTreeNestedDataSource } from "@angular/material/tree";
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import {
  CoreEnumService,
  DataProviderPlanPriceModel,
  DataProviderPlanPriceService,
  ErrorExceptionResult,
  FilterModel,
} from "ntk-cms-api";
import { Subscription } from "rxjs";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
import { environment } from "src/environments/environment";
import { DataProviderPlanPriceAddComponent } from "../add/add.component";
import { DataProviderPlanPriceEditComponent } from "../edit/edit.component";
import { DataProviderPlanPriceDeleteComponent } from "../delete/delete.component";

@Component({
  selector: "app-data-provider-plan-price-tree",
  templateUrl: "./tree.component.html",
  standalone: false,
})
export class DataProviderPlanPriceTreeComponent implements OnInit, OnDestroy {
  constructorInfoAreaId = this.constructor.name;
  constructor(
    public coreEnumService: CoreEnumService,
    public categoryService: DataProviderPlanPriceService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
    private tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
    public translate: TranslateService,
    public cmsToastrService: CmsToastrService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;
  }
  @Input() set optionSelectForce(x: string | DataProviderPlanPriceModel) {
    this.onActionSelectForce(x);
  }
  dataModelSelect: DataProviderPlanPriceModel | null =
    new DataProviderPlanPriceModel();
  dataModelResult: ErrorExceptionResult<DataProviderPlanPriceModel> =
    new ErrorExceptionResult<DataProviderPlanPriceModel>();
  filterModel = new FilterModel();

  dataSource = new MatTreeNestedDataSource<DataProviderPlanPriceModel>();
  @Output() optionChange = new EventEmitter<DataProviderPlanPriceModel>();
  private unsubscribe: Subscription[] = [];
  @Input() optionReload = () => this.onActionButtonReload();

  hasChild = (_: string, node: DataProviderPlanPriceModel) => null;
  childrenAccessor = (node: DataProviderPlanPriceModel) => null;

  ngOnInit(): void {
    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.tokenInfoStore)
        .subscribe(async () => {
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
        } else {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.publicHelper.processService.processStop(pName);
      },
      error: (er) => {
        this.cmsToastrService.typeError(er);
        this.publicHelper.processService.processStop(pName, false);
      },
    });
  }
  onActionSelect(model: DataProviderPlanPriceModel): void {
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

    this.dataModelSelect = new DataProviderPlanPriceModel();
    this.DataGetAll();
  }
  onActionSelectForce(id: string | DataProviderPlanPriceModel): void {}

  onActionAdd(): void {
    let parentId = "";
    if (this.dataModelSelect && this.dataModelSelect.id?.length > 0) {
      parentId = this.dataModelSelect.id;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = "90%";
    dialogConfig.data = { parentId };

    const dialogRef = this.dialog.open(
      DataProviderPlanPriceAddComponent,
      dialogConfig,
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
    const dialogRef = this.dialog.open(DataProviderPlanPriceEditComponent, {
      height: "90%",
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: { id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      // console.log(`Dialog result: ${result}`);
      if (result && result.dialogChangedDate) {
        this.DataGetAll();
      }
    });
  }

  onActionDelete(): void {
    // this.categoryService.ServiceDelete(this.getNodeOfId.id).subscribe((res) => {
    //   if (res.isSuccess) {
    //   }
    // });
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
    const dialogRef = this.dialog.open(DataProviderPlanPriceDeleteComponent, {
      height: "90%",
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: { id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      // console.log(`Dialog result: ${result}`);
      if (result && result.dialogChangedDate) {
        this.DataGetAll();
      }
    });
  }
}
