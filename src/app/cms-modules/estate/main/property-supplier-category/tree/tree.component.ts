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
    EstatePropertySupplierCategoryModel,
    EstatePropertySupplierCategoryService,
    FilterModel,
} from "ntk-cms-api";
import { Subscription } from "rxjs";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";
import { environment } from "src/environments/environment";
import { EstatePropertySupplierCategoryAddComponent } from "../add/add.component";
import { EstatePropertySupplierCategoryEditComponent } from "../edit/edit.component";

@Component({
  selector: "app-estate-property-supplier-category-tree",
  templateUrl: "./tree.component.html",
  standalone: false,
})
export class EstatePropertySupplierCategoryTreeComponent
  implements OnInit, OnDestroy
{
  constructorInfoAreaId = this.constructor.name;
  constructor(
    public cmsToastrService: CmsToastrService,
    public coreEnumService: CoreEnumService,
    public categoryService: EstatePropertySupplierCategoryService,
    private cmsConfirmationDialogService: CmsConfirmationDialogService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
    public translate: TranslateService,
    private tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;
  }
  @Input() set optionSelectForce(
    x: number | EstatePropertySupplierCategoryModel,
  ) {
    this.onActionSelectForce(x);
  }
  dataModelSelect: EstatePropertySupplierCategoryModel | null = new EstatePropertySupplierCategoryModel();
  dataModelResult: ErrorExceptionResult<EstatePropertySupplierCategoryModel> =
    new ErrorExceptionResult<EstatePropertySupplierCategoryModel>();
  filterModel = new FilterModel();

  dataSource =
    new MatTreeNestedDataSource<EstatePropertySupplierCategoryModel>();
  @Output() optionChange =
    new EventEmitter<EstatePropertySupplierCategoryModel>();
  private unsubscribe: Subscription[] = [];
  @Input() optionReload = () => this.onActionButtonReload();

  hasChild = (_: number, node: EstatePropertySupplierCategoryModel) => false;
  childrenAccessor = (node: EstatePropertySupplierCategoryModel) => [];

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
    onActionSelect(model: EstatePropertySupplierCategoryModel): void {
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

    this.dataModelSelect = new EstatePropertySupplierCategoryModel();
    this.DataGetAll();
  }
  onActionSelectForce(id: number | EstatePropertySupplierCategoryModel): void {}

  onActionAdd(): void {
    var panelClass = "";
    if (this.publicHelper.isMobile) panelClass = "dialog-fullscreen";
    else panelClass = "dialog-min";
    const dialogRef = this.dialog.open(
      EstatePropertySupplierCategoryAddComponent,
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
    if (
      this.dataModelSelect &&
      this.dataModelSelect.id &&
      this.dataModelSelect.id.length > 0
    ) {
      id = this.dataModelSelect.id;
    }
    if (id === "") {
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
      EstatePropertySupplierCategoryEditComponent,
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

  onActionDelete(): void {
    let id = "";
    if (
      this.dataModelSelect &&
      this.dataModelSelect.id &&
      this.dataModelSelect.id.length > 0
    ) {
      id = this.dataModelSelect.id;
    }
    if (id === "") {
      this.translate
        .get("ERRORMESSAGE.MESSAGE.typeErrorCategoryNotSelected")
        .subscribe((str: string) => {
          this.cmsToastrService.typeErrorSelected(str);
        });

      return;
    }

    var title = "";
    var message = "";
    this.translate
      .get([
        "MESSAGE.Please_Confirm",
        "MESSAGE.Do_you_want_to_delete_this_content",
      ])
      .subscribe((str: string) => {
        title = str["MESSAGE.Please_Confirm"];
        message =
          str["MESSAGE.Do_you_want_to_delete_this_content"] +
          "?" +
          "<br> ( " +
          this.dataModelSelect.title +
          " ) ";

        this.cmsConfirmationDialogService
          .confirm(title, message)
          .then((confirmed) => {
            if (confirmed) {
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

              this.categoryService
                .ServiceDelete(this.dataModelSelect.id)
                .subscribe({
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
                  },
                });
            }
          })
          .catch(() => {
            // console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)')
          });
      });
  }
}
