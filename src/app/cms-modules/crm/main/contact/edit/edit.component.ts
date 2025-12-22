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
  CoreEnumService,
  CoreUserModel,
  DataFieldInfoModel,
  ErrorExceptionResult,
  CrmContactModel,
  CrmContactService,
  TokenInfoModelV3,
  CrmAccountModel,
} from "ntk-cms-api";
import { NodeInterface, TreeModel } from "ntk-cms-filemanager";
import { EditBaseComponent } from "src/app/core/cmsComponent/editBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

import { FormInfoModel } from "../../../../../core/models/formInfoModel";
import { FormSubmitedStatusEnum } from "../../../../../core/models/formSubmitedStatusEnum";

/**
 * Component ویرایش Contact در CRM.
 * این component فرم ویرایش Contact موجود را نمایش می‌دهد.
 */
@Component({
  selector: "app-crm-contact-edit",
  templateUrl: "./edit.component.html",
  standalone: false,
})
export class CrmContactEditComponent
  extends EditBaseComponent<CrmContactService, CrmContactModel, string>
  implements OnInit
{
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CrmContactEditComponent>,
    public coreEnumService: CoreEnumService,
    public crmContactService: CrmContactService,
    private cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    private cmsStoreService: CmsStoreService,
    public tokenHelper: TokenHelper,
    public translate: TranslateService,
  ) {
    super(crmContactService, new CrmContactModel(), publicHelper, translate);
    this.publicHelper.processService.cdr = this.cdr;
    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;
    if (data && data.id && data.id.length > 0) {
      this.requestId = data.id;
    }
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();

  selectFileTypeMainImage = ["jpg", "jpeg", "png"];
  fileManagerTree: TreeModel;
  appLanguage = "fa";
  tokenInfo = new TokenInfoModelV3();
  dataModelResult: ErrorExceptionResult<CrmContactModel> =
    new ErrorExceptionResult<CrmContactModel>();
  dataModel: CrmContactModel = new CrmContactModel();
  formInfo: FormInfoModel = new FormInfoModel();
  requestId = "";

  fileManagerOpenForm = false;

  ngOnInit(): void {
    if (this.requestId.length > 0) {
      this.DataGetOneContent();
    } else {
      this.cmsToastrService.typeErrorEditRowIsNull();
    }
  }

  DataGetOneContent(): void {
    this.translate.get("MESSAGE.Receiving_information").subscribe((str: string) => {
      this.formInfo.formTitle = str;
    });
    if (!this.requestId || this.requestId.length === 0) {
      this.cmsToastrService.typeErrorEditRowIsNull();
      return;
    }
    this.formInfo.formSubmitAllow = false;
    this.formInfo.buttonSubmittedEnabled = false;
    const pName = this.constructor.name + "main";
    this.publicHelper.processService.processStart(
      pName,
      "",
      this.constructorInfoAreaId,
    );

    this.crmContactService.ServiceGetOneById(this.requestId).subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
        this.dataModelResult = ret;
        if (!ret.isSuccess) {
          this.formInfo.formSubmitAllow = true;
          this.cmsToastrService.typeErrorEdit(ret.errorMessage);
        } else {
          this.dataModel = ret.item;
          if (ret.item) {
            this.formInfo.formTitle =
              this.formInfo.formTitle + " " + (ret.item.fullName || ret.item.firstName + " " + ret.item.lastName);
          }
          this.formInfo.formSubmitAllow = true;
        }
        this.formInfo.buttonSubmittedEnabled = true;
        this.publicHelper.processService.processStop(pName);
      },
      error: (er) => {
        this.formInfo.formSubmitAllow = true;
        this.cmsToastrService.typeError(er);
        this.formInfo.buttonSubmittedEnabled = true;
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
    this.publicHelper.processService.processStart(
      pName,
      "",
      this.constructorInfoAreaId,
    );

    this.crmContactService.ServiceEdit(this.dataModel).subscribe({
      next: (ret) => {
        this.dataModelResult = ret;
        if (ret.isSuccess) {
          this.translate
            .get("MESSAGE.registration_completed_successfully")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
              this.formInfo.submitResultMessageType =
                FormSubmitedStatusEnum.Success;
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
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Error;
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.publicHelper.processService.processStop(pName);

        this.formInfo.submitButtonEnabled = true;
      },
      error: (er) => {
        this.formInfo.submitButtonEnabled = true;
        this.cmsToastrService.typeError(er);
        this.publicHelper.processService.processStop(pName, false);
      },
    });
  }

  onActionFileSelected(model: NodeInterface): void {
    this.dataModel.linkMainImageId = model.id;
    this.dataModel.linkMainImageIdSrc = model.downloadLinksrc;
  }
  onActionSelectorUser(model: CoreUserModel | null): void {
    this.dataModel.linkAssignedUserId = null;
    if (model && model.id > 0) {
      this.dataModel.linkAssignedUserId = model.id;
    }
  }

  /**
   * متد انتخاب Account
   * @param model - مدل Account انتخاب شده یا null
   */
  onActionSelectorAccount(model: CrmAccountModel | null): void {
    this.dataModel.linkAccountId = null;
    if (model && model.id) {
      this.dataModel.linkAccountId = model.id;
      if (model.name) {
        this.dataModel.companyName = model.name;
      }
    }
  }
  onFormSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }
    this.formInfo.submitButtonEnabled = false;
    this.DataEditContent();
  }
  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }
}

