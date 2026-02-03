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
    SmsMainApiPathModel,
    SmsMainApiPathService,
} from "ntk-cms-api";
import { Subscription } from "rxjs";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

@Component({
  selector: "app-sms-apipath-tree",
  templateUrl: "./tree.component.html",
  standalone: false,
})
export class SmsMainApiPathTreeComponent implements OnInit, OnDestroy {
  constructorInfoAreaId = this.constructor.name;
  constructor(
    public cmsToastrService: CmsToastrService,
    public coreEnumService: CoreEnumService,
    public categoryService: SmsMainApiPathService,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
    private tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
    public translate: TranslateService,
    public dialog: MatDialog,
  ) {
    this.publicHelper.processService.cdr = this.cdr;
  }
  @Input() set optionSelectForce(x: number | SmsMainApiPathModel) {
    this.onActionSelectForce(x);
  }
  dataModelSelect: SmsMainApiPathModel | null = new SmsMainApiPathModel();
  dataModelResult: ErrorExceptionResult<SmsMainApiPathModel> =
    new ErrorExceptionResult<SmsMainApiPathModel>();
  filterModel = new FilterModel();

  dataSource = new MatTreeNestedDataSource<SmsMainApiPathModel>();
  @Output() optionChange = new EventEmitter<SmsMainApiPathModel>();
  private unsubscribe: Subscription[] = [];
  @Input() optionReload = () => this.onActionButtonReload();

  hasChild = (_: number, node: SmsMainApiPathModel) => false;
  childrenAccessor = (node: SmsMainApiPathModel) => [];

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
        }
        this.publicHelper.processService.processStop(pName);
      },
      error: (er) => {
        this.cmsToastrService.typeError(er);
        this.publicHelper.processService.processStop(pName, false);
      },
    });
  }
  onActionSelect(model: SmsMainApiPathModel): void {
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
    this.dataModelSelect = new SmsMainApiPathModel();
    this.DataGetAll();
  }
  onActionSelectForce(id: number | SmsMainApiPathModel): void {}
}
