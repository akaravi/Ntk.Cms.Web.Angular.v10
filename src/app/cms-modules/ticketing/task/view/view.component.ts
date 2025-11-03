import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import {
  CoreEnumService,
  DataFieldInfoModel,
  ErrorExceptionResult,
  ErrorExceptionResultBase,
  FormInfoModel,
  InfoEnumModel,
  TicketingEnumService,
  TicketingTaskModel,
  TicketingTaskService,
  TokenInfoModelV3,
} from "ntk-cms-api";
import { Subscription } from "rxjs";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

@Component({
  selector: "app-ticketing-task-view",
  templateUrl: "./view.component.html",
  standalone: false,
})
export class TicketingTaskViewComponent implements OnInit, OnDestroy {
  requestId = 0;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TicketingTaskViewComponent>,
    public coreEnumService: CoreEnumService,
    public ticketingTaskService: TicketingTaskService,
    private cmsToastrService: CmsToastrService,
    private tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
    private cdr: ChangeDetectorRef,
    private ticketingEnumService: TicketingEnumService,
    public publicHelper: PublicHelper,
    public translate: TranslateService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;

    if (data) {
      this.requestId = +data.id || 0;
    }
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;
  tokenInfo = new TokenInfoModelV3();

  dataModelResult: ErrorExceptionResult<TicketingTaskModel> =
    new ErrorExceptionResult<TicketingTaskModel>();
  dataModel: TicketingTaskModel = new TicketingTaskModel();
  formInfo: FormInfoModel = new FormInfoModel();
  dataModelEnumTicketStatusResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();
  dataTaskReadedResult: ErrorExceptionResultBase =
    new ErrorExceptionResultBase();

  fileManagerOpenForm = false;

  cmsApiStoreSubscribe: Subscription;
  ngOnInit(): void {
    this.translate.get("TITLE.VIEW").subscribe((str: string) => {
      this.formInfo.formTitle = str;
    });
    if (this.requestId === 0) {
      this.cmsToastrService.typeErrorComponentAction();
      this.dialogRef.close({ dialogChangedDate: false });
      return;
    }
    this.DataGetOneContent();
    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;

    this.cmsApiStoreSubscribe = this.cmsStoreService
      .getState((state) => state.tokenInfoStore)
      .subscribe(async (value) => {
        this.tokenInfo = value;
      });
    this.getEnumTicketStatus();
  }

  getEnumTicketStatus(): void {
    this.ticketingEnumService.ServiceTicketStatusEnum().subscribe({
      next: (ret) => {
        this.dataModelEnumTicketStatusResult = ret;
      },
    });
  }

  ngOnDestroy(): void {
    if (this.cmsApiStoreSubscribe) {
      this.cmsApiStoreSubscribe.unsubscribe();
    }
  }

  DataGetOneContent(): void {
    this.translate
      .get("MESSAGE.Receiving_Information_From_The_Server")
      .subscribe((str: string) => {
        this.formInfo.formAlert = str;
      });
    this.formInfo.formError = "";
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

    /*َAccess Field*/
    this.ticketingTaskService.setAccessLoad();

    this.ticketingTaskService.ServiceGetOneById(this.requestId).subscribe({
      next: (ret) => {
        /*َAccess Field*/
        // this.dataAccessModel = next.access;
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
        this.dataModel = ret.item;
        if (ret.isSuccess) {
          this.formInfo.formTitle =
            this.formInfo.formTitle +
            " " +
            ret.item.title +
            " ( " +
            ret.item.id +
            " ) ";
          this.formInfo.formAlert = "";

          this.dataTaskReaded(this.requestId);
        } else {
          this.translate
            .get("ERRORMESSAGE.MESSAGE.typeError")
            .subscribe((str: string) => {
              this.formInfo.formAlert = str;
            });
          this.formInfo.formError = ret.errorMessage;
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

  dataTaskReaded(id: number) {
    this.ticketingTaskService.ServiceTaskReaded(id).subscribe({
      next: (ret) => {
        // console.log('ret',ret);
        if (ret.isSuccess) {
          this.dataTaskReadedResult = ret;
        }
      },
    });
  }

  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }
}
