import { FormInfoModel } from "../../../../core/models/formInfoModel";

import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import {BiographyCommentModel,
  BiographyCommentService,
  CoreEnumService,
  ErrorExceptionResultBase,ManageUserAccessDataTypesEnum} from "ntk-cms-api";
import { EditBaseComponent } from "src/app/core/cmsComponent/editBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { ComponentActionEnum } from "src/app/core/models/component-action-enum";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
@Component({
  selector: "app-biography-comment-edit",
  templateUrl: "./edit.component.html",

  standalone: false,
})
export class BiographyCommentEditComponent
  extends EditBaseComponent<
    BiographyCommentService,
    BiographyCommentModel,
    number
  >
  implements OnInit
{
  requestId = 0;
  requestParentId = 0;
  requestContentId = 0;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<BiographyCommentEditComponent>,
    public coreEnumService: CoreEnumService,
    public biographyCommentService: BiographyCommentService,
    public cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
  ) {
    super(
      biographyCommentService,
      new BiographyCommentModel(),
      publicHelper,
      translate,
    );

    this.publicHelper.processService.cdr = this.cdr;

    if (data) {
      this.requestId = +data.id || 0;
      this.requestParentId = +data.parentId || 0;
      this.requestContentId = +data.contentId || 0;
    }
    if (this.requestParentId > 0) {
      this.dataModel.linkParentId = this.requestParentId;
    }
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;

  dataModelResult: ErrorExceptionResultBase = new ErrorExceptionResultBase();
  dataModel: BiographyCommentModel = new BiographyCommentModel();
  ComponentAction = ComponentActionEnum.none;

  selected: any;
  openFormFileManager = false;
  ngOnInit(): void {
    if (this.requestId > 0) {
      this.ComponentAction = ComponentActionEnum.edit;
      this.translate.get("TITLE.Edit_Comment").subscribe((str: string) => {
        this.formInfo.formTitle = str;
      });
      this.DataGetOneContent();
    } else if (this.requestContentId > 0) {
      this.ComponentAction = ComponentActionEnum.add;
      this.translate
        .get("TITLE.Submit_A_New_Comment")
        .subscribe((str: string) => {
          this.formInfo.formTitle = str;
        });
    }
    if (this.ComponentAction === ComponentActionEnum.none) {
      this.cmsToastrService.typeErrorComponentAction();
      this.dialogRef.close({ dialogChangedDate: false });
    }
  }

  DataGetOneContent(): void {
    if (this.requestId <= 0) {
      this.cmsToastrService.typeErrorEditRowIsNull();
      return;
    }
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
    this.biographyCommentService.setAccessLoad();
    this.biographyCommentService.setAccessDataType(
      ManageUserAccessDataTypesEnum.Editor,
    );
    this.biographyCommentService.ServiceGetOneById(this.requestId).subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
        this.dataModel = ret.item;
        if (ret.isSuccess) {
          this.formInfo.submitResultMessage = "";
          this.formInfo.submitResultMessageType = this.formSubmitedStatusEnum.Success;
              } else {
          this.translate
            .get("ERRORMESSAGE.MESSAGE.typeError")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
            });
          this.formInfo.submitResultMessage = ret.errorMessage;
          this.formInfo.submitResultMessageType = this.formSubmitedStatusEnum.Error;
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
    this.dataModel.linkContentId = this.requestContentId;
    this.biographyCommentService.ServiceAdd(this.dataModel).subscribe({
      next: (ret) => {
        this.formInfo.submitButtonEnabled = true;
        this.dataModelResult = ret;
        if (ret.isSuccess) {
          this.translate
            .get("MESSAGE.registration_completed_successfully")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
          this.formInfo.submitResultMessageType = this.formSubmitedStatusEnum.Success;
            });
          this.cmsToastrService.typeSuccessAdd();
          this.dialogRef.close({ dialogChangedDate: true });
        } else {
          this.translate
            .get("ERRORMESSAGE.MESSAGE.typeError")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
            });
          this.formInfo.submitResultMessage = ret.errorMessage;
          this.formInfo.submitResultMessageType = this.formSubmitedStatusEnum.Error;
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
  DataEditContent(): void {
    this.translate
      .get("MESSAGE.sending_information_to_the_server")
      .subscribe((str: string) => {
        this.formInfo.submitResultMessage = str;
      });
    this.formInfo.submitResultMessage = "";
    const pName = this.constructor.name + "main";
    this.translate
      .get("MESSAGE.sending_information_to_the_server")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });
    this.biographyCommentService.ServiceEdit(this.dataModel).subscribe({
      next: (ret) => {
        this.formInfo.submitButtonEnabled = true;
        this.dataModelResult = ret;
        if (ret.isSuccess) {
          this.translate
            .get("MESSAGE.registration_completed_successfully")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
          this.formInfo.submitResultMessageType = this.formSubmitedStatusEnum.Success;
            });
          this.cmsToastrService.typeSuccessEdit();
          this.dialogRef.close({ dialogChangedDate: true });
        } else {
          this.translate
            .get("ERRORMESSAGE.MESSAGE.typeError")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
            });
          this.formInfo.submitResultMessage = ret.errorMessage;
          this.formInfo.submitResultMessageType = this.formSubmitedStatusEnum.Error;
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
    if (this.ComponentAction === ComponentActionEnum.add) {
      this.DataAddContent();
    }
    if (this.ComponentAction === ComponentActionEnum.edit) {
      this.DataEditContent();
    }
  }
  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }
}
