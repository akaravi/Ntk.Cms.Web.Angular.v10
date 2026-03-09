import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import {
  DataFieldInfoModel,
  ErrorExceptionResult,
  LinkManagementBillboardModel,
  LinkManagementBillboardService,
} from "ntk-cms-api";
import { Subscription } from "rxjs";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

@Component({
  selector: "app-linkmanagement-billboard-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  standalone: false,
})
export class LinkManagementBillboardHeaderComponent
  implements OnInit, OnDestroy
{
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private billboardService: LinkManagementBillboardService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    public cmsToastrService: CmsToastrService,
    public dialog: MatDialog,
    public translate: TranslateService,
    private cmsStoreService: CmsStoreService,
    public tokenHelper: TokenHelper,
  ) {
    this.publicHelper.processService.cdr = this.cdr;
  }

  /** شناسه بیلبورد انتخاب شده */
  @Input() optionBillboardId = 0;

  billboardResult: ErrorExceptionResult<LinkManagementBillboardModel> =
    new ErrorExceptionResult<LinkManagementBillboardModel>();

  billboardFieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();

  private unsubscribe: Subscription[] = [];

  ngOnInit(): void {
    if (this.optionBillboardId > 0) {
      this.dataGetBillboard();
    }

    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.tokenInfoStore)
        .subscribe(async () => {
          if (this.optionBillboardId > 0) {
            this.dataGetBillboard();
          }
        }),
    );
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }
  }

  private dataGetBillboard(): void {
    const pName = this.constructor.name + "Billboard";
    this.translate
      .get("MESSAGE.Receiving_information")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });

    this.billboardService.setAccessLoad();
    this.billboardService.ServiceGetOneById(this.optionBillboardId).subscribe({
      next: (ret) => {
        this.billboardFieldsInfo = this.publicHelper.fieldInfoConvertor(
          ret.access,
        );
        if (ret.isSuccess) {
          this.billboardResult = ret;
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
}
