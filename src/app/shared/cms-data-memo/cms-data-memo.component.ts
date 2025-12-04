import { HttpClient } from "@angular/common/http";
import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import {
  CoreModuleDataMemoDtoModel,
  CoreModuleDataMemoModel,
  ErrorExceptionResult,
  ErrorExceptionResultBase,
  FormInfoModel,
  FormSubmitedStatusEnum,
  IApiCmsServerBase,
  TokenInfoModelV3,
} from "ntk-cms-api";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

@Component({
  selector: "app-cms-data-memo",
  templateUrl: "./cms-data-memo.component.html",
  styleUrls: ["./cms-data-memo.component.scss"],
  standalone: false,
})
export class CmsDataMemoComponent implements OnInit {
  enumFormSubmitedStatus = FormSubmitedStatusEnum;
  static nextId = 0;
  id = ++CmsDataMemoComponent.nextId;
  service: IApiCmsServerBase;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private cmsToastrService: CmsToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CmsDataMemoComponent>,
    public http: HttpClient,
    public publicHelper: PublicHelper,
    public translate: TranslateService,
    private cmsStoreService: CmsStoreService,
    private cdr: ChangeDetectorRef,
    public tokenHelper: TokenHelper,
  ) {
    this.publicHelper.processService.cdr = this.cdr;

    if (data) {
      this.service = data.service;
      this.dataModel.moduleEntityId = data.id;
      this.dataModel.subjectTitle = data.title;
      this.formInfo.formTitle = data.title;
    }
    this.formInfo.formDescription = "یادداشت خود را مدیریت کنید";

    this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Error;
    ////
    if (!this.service) this.dialogRef.close({ dialogChangedDate: true });
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;

  showFormAdd = true;

  dataModelResult: ErrorExceptionResult<CoreModuleDataMemoModel> =
    new ErrorExceptionResult<CoreModuleDataMemoModel>();
  dataModelResultBase: ErrorExceptionResultBase =
    new ErrorExceptionResultBase();
  dataModel: CoreModuleDataMemoDtoModel = new CoreModuleDataMemoDtoModel();
  formInfo: FormInfoModel = new FormInfoModel();
  tokenInfo = new TokenInfoModelV3();

  ngOnInit(): void {
    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;
    if (this.tokenInfo) {
      this.DataGetAll();
    }
    if (!this.service) this.dialogRef.close({ dialogChangedDate: true });
  }

  DataGetAll(): void {
    const pName = this.constructor.name + "main";
    this.translate
      .get("MESSAGE.get_information_list")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });
    /*filter CLone*/
    if (
      this.dataModel.moduleEntityId &&
      this.dataModel.moduleEntityId.length > 0
    ) {
      this.service
        .ServiceMemoGetAllEntity(this.dataModel.moduleEntityId)
        .subscribe({
          next: (ret) => {
            this.dataModelResult = ret;
            if (ret.listItems?.length > 0) this.showFormAdd = false;
            if (!ret.isSuccess) {
              this.cmsToastrService.typeErrorMessage(ret.errorMessage);
            }
            this.publicHelper.processService.processStop(pName);
            this.dataModel = new CoreModuleDataMemoDtoModel();
            if (this.data) {
              this.dataModel.moduleEntityId = this.data.id;
              this.dataModel.subjectTitle = this.data.title;
            }
            this.formInfo.submitResultMessage = "";
          },
          error: (er) => {
            this.cmsToastrService.typeError(er);
            this.publicHelper.processService.processStop(pName, false);
          },
        });
    } else {
      this.service.ServiceMemoGetAll().subscribe({
        next: (ret) => {
          this.dataModelResult = ret;
          if (ret.listItems?.length > 0) this.showFormAdd = false;
          if (!ret.isSuccess)
            this.cmsToastrService.typeErrorMessage(ret.errorMessage);
          this.dataModel = new CoreModuleDataMemoDtoModel();
          if (this.data) {
            this.dataModel.moduleEntityId = this.data.id;
            this.dataModel.subjectTitle = this.data.title;
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

  DataAddContent(): void {
    this.translate
      .get("MESSAGE.sending_information_to_the_server")
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

    this.service.ServiceMemoAdd(this.dataModel).subscribe({
      next: (ret) => {
        this.formInfo.submitButtonEnabled = true;
        // this.dataModelResultBase = ret;
        if (ret.isSuccess) {
          this.translate
            .get("MESSAGE.registration_completed_successfully")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
            });
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.cmsToastrService.typeSuccessAdd();
          this.DataGetAll();
        } else {
          this.translate
            .get("ERRORMESSAGE.MESSAGE.typeError")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
            });
          this.formInfo.submitResultMessage = ret.errorMessage;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Error;
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.publicHelper.processService.processStop(pName);
      },
      error: (er) => {
        this.formInfo.submitButtonEnabled = true;
        this.cmsToastrService.typeError(er);
        this.publicHelper.processService.processStop(pName, false);
      },
    });
  }
  DataDeleteContent(id: string): void {
    this.translate
      .get("MESSAGE.sending_information_to_the_server")
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

    this.service.ServiceMemoDelete(id).subscribe({
      next: (ret) => {
        this.formInfo.submitButtonEnabled = true;
        // this.dataModelResultBase = ret;
        if (ret.isSuccess) {
          this.translate
            .get("MESSAGE.registration_completed_successfully")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
            });
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
          this.cmsToastrService.typeSuccessRemove();
          this.DataGetAll();
          //this.dialogRef.close({ dialogChangedDate: true });
        } else {
          this.translate
            .get("ERRORMESSAGE.MESSAGE.typeError")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
            });
          this.formInfo.submitResultMessage = ret.errorMessage;
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Error;
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.publicHelper.processService.processStop(pName);
      },
      error: (er) => {
        this.formInfo.submitButtonEnabled = true;
        this.cmsToastrService.typeError(er);
        this.publicHelper.processService.processStop(pName, false);
      },
    });
  }

  onFormSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }
    this.formInfo.submitButtonEnabled = false;
    this.DataAddContent();
  }

  onActionAdd() {
    this.showFormAdd = !this.showFormAdd;
  }
  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }
}
