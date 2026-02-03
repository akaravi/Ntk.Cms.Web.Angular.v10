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
    SmsMainApiPathPublicConfigModel,
    SmsMainApiPathPublicConfigService,
} from "ntk-cms-api";
import { Subscription } from "rxjs";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

@Component({
  selector: "app-sms-publicconfig-tree-mobile",
  templateUrl: "./tree.mobile.component.html",
  styleUrls: ["./tree.mobile.component.scss"],
  standalone: false,
})
export class SmsMainApiPathPublicConfigTreeMobileComponent
  implements OnInit, OnDestroy
{
  constructorInfoAreaId = this.constructor.name;
  constructor(
    public cmsToastrService: CmsToastrService,
    public coreEnumService: CoreEnumService,
    public categoryService: SmsMainApiPathPublicConfigService,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
    private tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
    public translate: TranslateService,
    public dialog: MatDialog,
  ) {
    this.publicHelper.processService.cdr = this.cdr;
  }
  @Input() set optionSelectForce(x: string | SmsMainApiPathPublicConfigModel) {
    this.onActionSelectForce(x);
  }
  dataModelSelect: SmsMainApiPathPublicConfigModel | null =
    new SmsMainApiPathPublicConfigModel();
  dataModelResult: ErrorExceptionResult<SmsMainApiPathPublicConfigModel> =
    new ErrorExceptionResult<SmsMainApiPathPublicConfigModel>();
  filterModel = new FilterModel();

  @Output() optionChange = new EventEmitter<SmsMainApiPathPublicConfigModel>();
  private unsubscribe: Subscription[] = [];
  @Input() optionReload = () => this.onActionButtonReload();

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
        }
        this.publicHelper.processService.processStop(pName);
      },
      error: (er) => {
        this.cmsToastrService.typeError(er);
        this.publicHelper.processService.processStop(pName, false);
      },
    });
  }
  onActionSelect(model: SmsMainApiPathPublicConfigModel): void {
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
    this.dataModelSelect = new SmsMainApiPathPublicConfigModel();
    this.DataGetAll();
  }
  onActionSelectForce(id: string | SmsMainApiPathPublicConfigModel): void {}
}
