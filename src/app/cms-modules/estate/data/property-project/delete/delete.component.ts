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
  DataFieldInfoModel,
  ErrorExceptionResult,
  EstatePropertyProjectModel,
  EstatePropertyProjectService,
  ManageUserAccessDataTypesEnum,
  TokenInfoModelV3,
} from "ntk-cms-api";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

import { FormInfoModel } from "../../../../../core/models/formInfoModel";
import { FormSubmitedStatusEnum } from "../../../../../core/models/formSubmitedStatusEnum";

@Component({
  selector: "app-estate-property-project-delete",
  templateUrl: "./delete.component.html",
  standalone: false,
})
export class EstatePropertyProjectDeleteComponent implements OnInit {
  requestId = "";
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EstatePropertyProjectDeleteComponent>,
    public publicHelper: PublicHelper,
    public contentService: EstatePropertyProjectService,
    private cdr: ChangeDetectorRef,
    public cmsToastrService: CmsToastrService,
    private cmsStoreService: CmsStoreService,
    public tokenHelper: TokenHelper,
    public translate: TranslateService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;

    if (data) {
      this.requestId = data.id;
    }

    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();

  tokenInfo = new TokenInfoModelV3();

  dataModelResultContent: ErrorExceptionResult<EstatePropertyProjectModel> =
    new ErrorExceptionResult<EstatePropertyProjectModel>();
  formInfo: FormInfoModel = new FormInfoModel();
  ngOnInit(): void {
    if (this.requestId.length <= 0) {
      this.cmsToastrService.typeErrorDeleteRowIsNull();
      this.dialogRef.close({ dialogChangedDate: false });
      return;
    }
    this.DataGetOne();
  }

  DataGetOne(): void {
    if (this.requestId.length === 0) {
      this.cmsToastrService.typeErrorDeleteRowIsNull();
      return;
    }
    this.translate.get("TITLE.Loading_Information").subscribe((str: string) => {
      this.formInfo.submitResultMessage = str;
    });
    const pName = this.constructor.name + "fieldInfoConvertor";
    this.translate
      .get("MESSAGE.Receiving_information")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });
    this.contentService.setAccessLoad();
    this.contentService.setAccessDataType(ManageUserAccessDataTypesEnum.Editor);
    this.contentService.ServiceGetOneById(this.requestId).subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);

        this.dataModelResultContent = ret;
        if (!ret.isSuccess) {
          this.translate
            .get("ERRORMESSAGE.MESSAGE.typeError")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
            });
          this.formInfo.submitResultMessage = ret.errorMessage;
          this.formInfo.submitResultMessageType =
            FormSubmitedStatusEnum.Success;
          this.cmsToastrService.typeErrorGetOne();
        } else {
          this.formInfo.submitResultMessage = "";
        }
        this.publicHelper.processService.processStop(pName);
      },
      error: (er) => {
        this.translate
          .get("ERRORMESSAGE.MESSAGE.typeError")
          .subscribe((str: string) => {
            this.formInfo.submitResultMessage = str;
          });
        this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Success;
        this.cmsToastrService.typeError(er);
        this.publicHelper.processService.processStop(pName, false);
      },
    });
  }
  onFormDelete(): void {
    if (this.requestId.length === 0) {
      this.cmsToastrService.typeErrorDeleteRowIsNull();
      return;
    }
    this.formInfo.submitButtonEnabled = false;
    this.formInfo.submitButtonEnabled = false;
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
    this.contentService.ServiceDelete(this.requestId).subscribe({
      next: (ret) => {
        this.formInfo.submitButtonEnabled = !ret.isSuccess;
        if (!ret.isSuccess) {
          this.translate
            .get("ERRORMESSAGE.MESSAGE.typeError")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
            });
          this.formInfo.submitResultMessage = ret.errorMessage;
          this.cmsToastrService.typeErrorRemove();
        } else {
          this.translate
            .get("MESSAGE.Deletion_Was_Successful")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
            });
          this.cmsToastrService.typeSuccessRemove();
          this.dialogRef.close({ dialogChangedDate: true });
        }
        this.formInfo.submitButtonEnabled = true;
        this.publicHelper.processService.processStop(pName);
      },
      error: (er) => {
        this.translate
          .get("ERRORMESSAGE.MESSAGE.typeError")
          .subscribe((str: string) => {
            this.formInfo.submitResultMessage = str;
          });
        this.formInfo.submitButtonEnabled = true;
        this.cmsToastrService.typeError(er);
        this.formInfo.submitButtonEnabled = true;
        this.publicHelper.processService.processStop(pName);
      },
    });
  }
  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }
}
