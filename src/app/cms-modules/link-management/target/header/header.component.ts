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
  LinkManagementTargetModel,
  LinkManagementTargetService,
} from "ntk-cms-api";
import { Subscription } from "rxjs";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

@Component({
  selector: "app-linkmanagement-target-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  standalone: false,
})
export class LinkManagementTargetHeaderComponent implements OnInit, OnDestroy {
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private targetService: LinkManagementTargetService,
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

  /** شناسه تارگت انتخاب شده (اختیاری) */
  @Input() optionTargetId = 0;

  targetResult: ErrorExceptionResult<LinkManagementTargetModel> =
    new ErrorExceptionResult<LinkManagementTargetModel>();

  targetFieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();

  private unsubscribe: Subscription[] = [];

  ngOnInit(): void {
    if (this.optionTargetId > 0) {
      this.dataGetTarget();
    }

    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.tokenInfoStore)
        .subscribe(async () => {
          if (this.optionTargetId > 0) {
            this.dataGetTarget();
          }
        }),
    );
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }
  }

  private dataGetTarget(): void {
    const pName = this.constructor.name + "Target";
    this.translate
      .get("MESSAGE.Receiving_information")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });

    this.targetService.setAccessLoad();
    this.targetService.ServiceGetOneById(this.optionTargetId).subscribe({
      next: (ret) => {
        this.targetFieldsInfo = this.publicHelper.fieldInfoConvertor(
          ret.access,
        );
        if (ret.isSuccess) {
          this.targetResult = ret;
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
