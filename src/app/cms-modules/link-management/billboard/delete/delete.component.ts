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
import {DataFieldInfoModel,
  ErrorExceptionResult,LinkManagementBillboardModel,
  LinkManagementBillboardService,
  ManageUserAccessDataTypesEnum} from "ntk-cms-api";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

import { FormInfoModel } from "../../../../core/models/formInfoModel";

@Component({
  selector: "app-linkmanagement-billboard-delete",
  templateUrl: "./delete.component.html",
  standalone: false,
})
export class LinkManagementBillboardDeleteComponent implements OnInit {
  requestId = 0;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<LinkManagementBillboardDeleteComponent>,
    public publicHelper: PublicHelper,
    private linkManagementBillboardService: LinkManagementBillboardService,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
    public cmsToastrService: CmsToastrService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;
    if (data) {
      this.requestId = +data.id || 0;
    }
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();

  dataModelResultContent: ErrorExceptionResult<LinkManagementBillboardModel> =
    new ErrorExceptionResult<LinkManagementBillboardModel>();
  formInfo: FormInfoModel = new FormInfoModel();
  ngOnInit(): void {
    if (this.requestId <= 0) {
      this.cmsToastrService.typeErrorDeleteRowIsNull();
      this.dialogRef.close({ dialogChangedDate: false });
      return;
    }
    this.DataGetOne();
  }

  DataGetOne(): void {
    if (this.requestId === 0) {
      this.cmsToastrService.typeErrorDeleteRowIsNull();
      return;
    }
    this.translate.get("TITLE.Loading_Information").subscribe((str: string) => {
      this.formInfo.submitResultMessage = str;
    });
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

    this.linkManagementBillboardService.setAccessLoad();
    this.linkManagementBillboardService.setAccessDataType(
      ManageUserAccessDataTypesEnum.Editor,
    );
    this.linkManagementBillboardService
      .ServiceGetOneById(this.requestId)
      .subscribe({
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
          this.formInfo.submitResultMessageType =
            FormSubmitedStatusEnum.Success;
          this.cmsToastrService.typeError(er);
          this.publicHelper.processService.processStop(pName, false);
        },
      });
  }

  onFormDelete(): void {
    if (this.requestId === 0) {
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

    this.linkManagementBillboardService
      .ServiceDelete(this.requestId)
      .subscribe({
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
