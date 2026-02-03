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
import { TranslateService } from "@ngx-translate/core";
import {
    CoreEnumService,
    ErrorExceptionResult,
    FilterModel,
    SmsMainApiPathCompanyModel,
    SmsMainApiPathCompanyService,
} from "ntk-cms-api";
import { Subscription } from "rxjs";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

@Component({
  selector: "app-sms-apipathcompany-tree-mobile",
  templateUrl: "./tree.mobile.component.html",
  styleUrls: ["./tree.mobile.component.scss"],
  standalone: false,
})
export class SmsMainApiPathCompanyTreeMobileComponent
  implements OnInit, OnDestroy
{
  constructorInfoAreaId = this.constructor.name;
  constructor(
    public cmsToastrService: CmsToastrService,
    public coreEnumService: CoreEnumService,
    public categoryService: SmsMainApiPathCompanyService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
    private tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
    public translate: TranslateService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;
  }
  @Input() set optionSelectForce(x: number | SmsMainApiPathCompanyModel) {
    this.onActionSelectForce(x);
  }
  dataModelSelect: SmsMainApiPathCompanyModel | null =
    new SmsMainApiPathCompanyModel();
  dataModelResult: ErrorExceptionResult<SmsMainApiPathCompanyModel> =
    new ErrorExceptionResult<SmsMainApiPathCompanyModel>();
  filterModel = new FilterModel();

  @Output() optionChange = new EventEmitter<SmsMainApiPathCompanyModel>();
  private unsubscribe: Subscription[] = [];
  @Input() optionReload = () => this.onActionButtonReload();

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
  onActionSelect(model: SmsMainApiPathCompanyModel): void {
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
    this.dataModelSelect = new SmsMainApiPathCompanyModel();
    this.DataGetAll();
  }
  onActionSelectForce(id: number | SmsMainApiPathCompanyModel): void {}
}
