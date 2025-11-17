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
  ContactCategoryModel,
  ContactCategoryService,
  DataFieldInfoModel,
  ErrorExceptionResult,
  FilterModel,
  FormInfoModel,
  ManageUserAccessDataTypesEnum,
} from "ntk-cms-api";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

@Component({
  selector: "app-contact-category-delete",
  templateUrl: "./delete.component.html",
  styleUrls: ["./delete.component.scss"],
  standalone: false,
})
export class ContactCategoryDeleteComponent implements OnInit {
  requestId = "";
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ContactCategoryDeleteComponent>,
    public publicHelper: PublicHelper,
    private contactCategoryService: ContactCategoryService,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
    private cmsToastrService: CmsToastrService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;
    if (data && data.id && data.id.length > 0) {
      this.requestId = data.id;
    }
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();

  dataModelResultCategory: ErrorExceptionResult<ContactCategoryModel> =
    new ErrorExceptionResult<ContactCategoryModel>();
  dataModelResultCategoryAllData: ErrorExceptionResult<ContactCategoryModel> =
    new ErrorExceptionResult<ContactCategoryModel>();
  dataModel: any = {};
  formInfo: FormInfoModel = new FormInfoModel();
  ngOnInit(): void {
    if (this.requestId.length == 0) {
      this.cmsToastrService.typeErrorDeleteRowIsNull();
      this.dialogRef.close({ dialogChangedDate: false });
      return;
    }
    this.DataGetOne();
    this.DataGetAll();
  }

  DataGetOne(): void {
    if (this.requestId.length === 0) {
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

    this.contactCategoryService.setAccessLoad();
    this.contactCategoryService.setAccessDataType(
      ManageUserAccessDataTypesEnum.Editor,
    );
    this.contactCategoryService.ServiceGetOneById(this.requestId).subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);

        this.dataModelResultCategory = ret;
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
  DataGetAll(): void {
    this.translate.get("TITLE.Loading_Information").subscribe((str: string) => {
      this.formInfo.submitResultMessage = str;
    });
    const filterModel: FilterModel = new FilterModel();
    filterModel.rowPerPage = 100;
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

    this.contactCategoryService.ServiceGetAll(filterModel).subscribe({
      next: (ret) => {
        this.dataModelResultCategoryAllData = ret;
        if (!ret.isSuccess) {
          this.translate
            .get("ERRORMESSAGE.MESSAGE.typeError")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
            });
          this.formInfo.submitResultMessage = ret.errorMessage;
          this.formInfo.submitResultMessageType =
            FormSubmitedStatusEnum.Success;
          this.cmsToastrService.typeErrorGetAll();
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
  onFormMove(): void {
    if (this.requestId.length === 0) {
      this.cmsToastrService.typeErrorDeleteRowIsNull();
      return;
    }
    if (!this.formGroup.valid) {
      return;
    }
    this.formInfo.submitButtonEnabled = true;
    if (this.dataModel.newCatId === this.requestId) {
      this.translate
        .get("ERRORMESSAGE.MESSAGE.typeError")
        .subscribe((str: string) => {
          this.formInfo.submitResultMessage = str;
        });
      this.translate
        .get(
          "ERRORMESSAGE.MESSAGE.The_delete_category_ID_is_the_same_as_the_alternate_category",
        )
        .subscribe((str: string) => {
          this.formInfo.submitResultMessage = str;
        });
      this.formInfo.submitButtonEnabled = true;
    }

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

    this.contactCategoryService
      .ServiceMove(this.requestId, this.dataModel.newCatId)
      .subscribe({
        next: (ret) => {
          if (!ret.isSuccess) {
            this.translate
              .get("ERRORMESSAGE.MESSAGE.typeError")
              .subscribe((str: string) => {
                this.formInfo.submitResultMessage = str;
              });
            this.formInfo.submitResultMessage = ret.errorMessage;
            this.cmsToastrService.typeErrorMove();
          } else {
            this.translate
              .get("MESSAGE.The_Transfer_Was_Successful")
              .subscribe((str: string) => {
                this.formInfo.submitResultMessage = str;
              });
            this.cmsToastrService.typeSuccessMove();
          }
          this.formInfo.submitButtonEnabled = true;
          this.formInfo.submitButtonEnabled = true;
          this.publicHelper.processService.processStop(pName);
        },
        error: (er) => {
          this.translate
            .get("ERRORMESSAGE.MESSAGE.typeError")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
            });
          this.cmsToastrService.typeError(er);
          this.formInfo.submitButtonEnabled = true;
          this.formInfo.submitButtonEnabled = true;
          this.publicHelper.processService.processStop(pName);
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

    this.contactCategoryService.ServiceDelete(this.requestId).subscribe({
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
  onFormChangeNewCatId(model: ContactCategoryModel): void {
    this.formInfo.submitResultMessage = "";
    if (this.requestId.length === 0 || !model || model.id.length <= 0) {
      this.cmsToastrService.typeErrorDeleteRowIsNull();
      return;
    }
    this.dataModel.newCatId = model.id;
    if (this.dataModel.newCatId === this.requestId) {
      this.translate
        .get("ERRORMESSAGE.MESSAGE.typeError")
        .subscribe((str: string) => {
          this.formInfo.submitResultMessage = str;
        });
      this.translate
        .get(
          "ERRORMESSAGE.MESSAGE.The_delete_category_ID_is_the_same_as_the_alternate_category",
        )
        .subscribe((str: string) => {
          this.formInfo.submitResultMessage = str;
        });
      this.formInfo.submitButtonEnabled = false;
    } else {
      this.formInfo.submitButtonEnabled = true;
      this.formInfo.submitResultMessage = "";
    }
  }
  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }
}
