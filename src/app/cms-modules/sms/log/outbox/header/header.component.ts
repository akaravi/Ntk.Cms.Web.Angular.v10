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
    SmsLogOutBoxModel,
    SmsLogOutBoxService,
} from "ntk-cms-api";
import { Subscription } from "rxjs";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

@Component({
  selector: "app-sms-log-outbox-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  standalone: false,
})
export class SmsLogOutBoxHeaderComponent implements OnInit, OnDestroy {
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private headerService: SmsLogOutBoxService,
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
  @Input() optionId = "";

  dataModelResult: ErrorExceptionResult<SmsLogOutBoxModel> =
    new ErrorExceptionResult<SmsLogOutBoxModel>();
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();

  private unsubscribe: Subscription[] = [];
  ngOnInit(): void {
    if (this.optionId?.length > 0) {
      this.DataGetOneContent();
    }

    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.tokenInfoStore)
        .subscribe(async (value) => {
          this.DataGetOneContent();
        }),
    );
  }
  ngOnDestroy(): void {
    if (this.unsubscribe) this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  DataGetOneContent(): void {
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

    this.headerService.setAccessLoad();
    this.headerService.ServiceGetOneById(this.optionId).subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
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
}
