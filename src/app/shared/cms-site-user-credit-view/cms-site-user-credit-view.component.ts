import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
  CoreEnumService,
  CoreModuleModel,
  CoreModuleService,
  CoreModuleSiteUserCreditModel,
  CoreModuleSiteUserCreditService,
  DataFieldInfoModel,
  ErrorExceptionResult,
  FormInfoModel,
  TokenInfoModelV3,
} from "ntk-cms-api";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

@Component({
  selector: "app-cms-site-user-credit-view",
  templateUrl: "./cms-site-user-credit-view.component.html",
  styleUrls: ["./cms-site-user-credit-view.component.scss"],
  standalone: false,
})
export class CmsSiteUserCreditViewComponent implements OnInit {
  static nextId = 0;
  id = ++CmsSiteUserCreditViewComponent.nextId;
  constructorInfoAreaId = this.constructor.name;

  requestLinkModuleId = 0;
  requestLinkSiteId = 0;
  requestLinkUserId = 0;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CmsSiteUserCreditViewComponent>,
    public publicHelper: PublicHelper,
    public coreEnumService: CoreEnumService,
    public coreModuleSiteUserCreditService: CoreModuleSiteUserCreditService,
    public coreModuleService: CoreModuleService,
    private cmsToastrService: CmsToastrService,
    private cdr: ChangeDetectorRef,
    private tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
    private router: Router,
    public translate: TranslateService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;

    if (data) {
      this.requestLinkSiteId = +data.linkSiteId || 0;
      this.requestLinkUserId = +data.linkUserId || 0;
      this.requestLinkModuleId = +data.linkModuleId || 0;
    }
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();

  dataModelResult: ErrorExceptionResult<CoreModuleSiteUserCreditModel> =
    new ErrorExceptionResult<CoreModuleSiteUserCreditModel>();
  dataModuleModelResult: ErrorExceptionResult<CoreModuleModel> =
    new ErrorExceptionResult<CoreModuleModel>();
  tokenInfo = new TokenInfoModelV3();

  formInfo: FormInfoModel = new FormInfoModel();

  ngOnInit(): void {
    this.translate.get("TITLE.VALIDITY").subscribe((str: string) => {
      this.formInfo.formTitle = str;
    });

    if (this.requestLinkModuleId <= 0) {
      this.cmsToastrService.typeErrorComponentAction();
      this.dialogRef.close({ dialogChangedDate: false });
      return;
    }
    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;
    if (this.tokenInfo) {
      this.DataGetOneContent();
      this.DataModuleGetOne();
    }
  }

  DataGetOneContent(): void {
    this.translate
      .get("MESSAGE.Receiving_Information_From_The_Server")
      .subscribe((str: string) => {
        this.formInfo.submitResultMessage = str;
      });
    this.formInfo.submitResultMessage = "";
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

    this.coreModuleSiteUserCreditService.setAccessLoad();
    this.coreModuleSiteUserCreditService
      .ServiceGetCredit(this.requestLinkModuleId)
      .subscribe({
        next: (ret) => {
          this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);

          this.dataModelResult = ret;
          if (ret.isSuccess) {
            this.formInfo.formTitle =
              this.formInfo.formTitle + " " + ret.item.linkUserId;
            this.formInfo.submitResultMessage = "";
          } else {
            this.translate
              .get("ERRORMESSAGE.MESSAGE.typeError")
              .subscribe((str: string) => {
                this.formInfo.submitResultMessage = str;
              });
            this.formInfo.submitResultMessage = ret.errorMessage;
            this.cmsToastrService.typeErrorMessage(ret.errorMessage);
          }
          this.publicHelper.processService.processStop(pName);
        },
        error: (err) => {
          this.cmsToastrService.typeError(err);
          this.publicHelper.processService.processStop(pName);
        },
      });
  }

  DataModuleGetOne(): void {
    this.translate
      .get("MESSAGE.Receiving_Information_From_The_Server")
      .subscribe((str: string) => {
        this.formInfo.submitResultMessage = str;
      });
    this.formInfo.submitResultMessage = "";
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

    this.coreModuleService.setAccessLoad();
    this.coreModuleService
      .ServiceGetOneById(this.requestLinkModuleId)
      .subscribe({
        next: (ret) => {
          this.dataModuleModelResult = ret;
          if (ret.isSuccess) {
            this.formInfo.formTitle =
              this.formInfo.formTitle + " " + ret.item.title;
            this.formInfo.submitResultMessage = "";
          } else {
            this.translate
              .get("ERRORMESSAGE.MESSAGE.typeError")
              .subscribe((str: string) => {
                this.formInfo.submitResultMessage = str;
              });
            this.formInfo.submitResultMessage = ret.errorMessage;
            this.cmsToastrService.typeErrorMessage(ret.errorMessage);
          }
          this.publicHelper.processService.processStop(pName);
        },
        error: (err) => {
          this.cmsToastrService.typeError(err);
          this.publicHelper.processService.processStop(pName);
        },
      });
  }
  onFormSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }
    // this.formInfo.submitButtonEnabled = false;
    // if (this.ComponentAction === ComponentActionEnum.add) {
    //   this.DataAddContent();
    // }
    // if (this.ComponentAction === ComponentActionEnum.edit) {
    //   this.DataEditContent();
    // }
  }
  onFormActionCreditCharge(): void {
    setTimeout(
      () =>
        this.router.navigate([
          "/coremodule/site-user-credit-charge-online/",
          this.requestLinkSiteId,
          this.requestLinkUserId,
          this.requestLinkModuleId,
        ]),
      1000,
    );
    this.dialogRef.close({ dialogChangedDate: false });
  }
  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }
}
