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
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
  CoreEnumService,
  CoreUserService,
  ErrorExceptionResult,
  FilterModel,
  RessellerChartModel,
} from "ntk-cms-api";
import { Subscription } from "rxjs";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

@Component({
  selector: "app-core-user-reseller-chart",
  templateUrl: "./reseller-chart.component.html",
  styleUrls: ["./reseller-chart.component.scss"],
  standalone: false,
})
export class CoreUserResellerChartComponent implements OnInit, OnDestroy {
  requestLinkUserId = 0;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private cmsToastrService: CmsToastrService,
    public coreEnumService: CoreEnumService,
    public categoryService: CoreUserService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
    private tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
    public translate: TranslateService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;

    this.requestLinkUserId = +Number(
      this.activatedRoute.snapshot.paramMap.get("linkUserId"),
    );
  }

  dataModelSelect: RessellerChartModel = new RessellerChartModel();
  dataModelResult: ErrorExceptionResult<RessellerChartModel> =
    new ErrorExceptionResult<RessellerChartModel>();
  filterModel = new FilterModel();

  dataSource = new MatTreeNestedDataSource<RessellerChartModel>();
  @Output() optionChange = new EventEmitter<RessellerChartModel>();
  private unsubscribe: Subscription[] = [];
  @Input() optionReload = () => this.onActionButtonReload();

  hasChild(_: number, node: RessellerChartModel): boolean {
    if (node && node.userChilds && node.userChilds.length > 0) {
      return true;
    }
    return false;
  }
  childrenAccessor = (node: RessellerChartModel) => node.userChilds ?? [];

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

    this.categoryService
      .ServiceGetRessellerChart(this.requestLinkUserId)
      .subscribe({
        next: (ret) => {
          if (ret.isSuccess) {
            this.dataModelResult = ret;
            this.dataSource.data = [this.dataModelResult.item];
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
  onActionSelect(model: RessellerChartModel): void {
    this.dataModelSelect = model;
    this.optionChange.emit(this.dataModelSelect);
  }
  onActionButtonReload(): void {
    if (this.dataModelSelect) {
      this.onActionSelect(this.dataModelSelect);
    } else {
      this.onActionSelect(null);
    }
    this.dataModelSelect = new RessellerChartModel();
    this.DataGetAll();
  }
}
