import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import {
  CoreEnumService,
  CoreUserModel,
  DataFieldInfoModel,
  ErrorExceptionResult,
  CrmLeadModel,
  CrmLeadService,
  TokenInfoModelV3,
  CrmAccountModel,
  CrmContactModel,
  CrmCampaignModel,
  CrmEnumService,
  InfoEnumModel } from "ntk-cms-api";
import { NodeInterface, TreeModel } from "ntk-cms-filemanager";
import { EditBaseComponent } from "src/app/core/cmsComponent/editBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

import { FormInfoModel } from "../../../../../core/models/formInfoModel";

/**
 * Component ویرایش Lead در CRM.
 * این component فرم ویرایش Lead موجود را نمایش می‌دهد.
 */
@Component({
  selector: "app-crm-lead-edit",
  templateUrl: "./edit.component.html",
  standalone: false,
})
export class CrmLeadEditComponent
  extends EditBaseComponent<CrmLeadService, CrmLeadModel, string>
  implements OnInit
{
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CrmLeadEditComponent>,
    public coreEnumService: CoreEnumService,
    public crmLeadService: CrmLeadService,
    public crmEnumService: CrmEnumService,
    private cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    private cmsStoreService: CmsStoreService,
    public tokenHelper: TokenHelper,
    public translate: TranslateService,
  ) {
    super(crmLeadService, new CrmLeadModel(), publicHelper, translate);
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
  dataModelResult: ErrorExceptionResult<CrmLeadModel> =
    new ErrorExceptionResult<CrmLeadModel>();
  dataModel: CrmLeadModel = new CrmLeadModel();
  
  requestId = "";

  dataModelCrmLeadStatusEnumResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();
  dataModelCrmLeadSourceEnumResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();

  fileManagerOpenForm = false;

  ngOnInit(): void {
    if (this.requestId.length > 0) {
      this.DataGetOneContent();
    } else {
      this.cmsToastrService.typeErrorEditRowIsNull();
    }
    // Commented: Enum methods not available in API
    // this.getCrmLeadStatusEnum();
    // this.getCrmLeadSourceEnum();
  }

  /**
   * دریافت اطلاعات CrmLeadStatusEnum
   */
  getCrmLeadStatusEnum(): void {
    // Commented: Enum method not available in API
    // this.crmEnumService.ServiceCrmLeadStatusEnum().subscribe((res) => {
    //   this.dataModelCrmLeadStatusEnumResult = res;
    // });
  }

  /**
   * دریافت اطلاعات CrmLeadSourceEnum
   */
  getCrmLeadSourceEnum(): void {
    // Commented: Enum method not available in API
    // this.crmEnumService.ServiceCrmLeadSourceEnum().subscribe((res) => {
    //   this.dataModelCrmLeadSourceEnumResult = res;
    // });
  }

  DataGetOneContent(): void {
    this.translate.get("MESSAGE.Receiving_information").subscribe((str: string) => {
      this.formInfo.formTitle = str;
    });
    if (!this.requestId || this.requestId.length === 0) {
      this.cmsToastrService.typeErrorEditRowIsNull();
      return;
    }
    this.formInfo.submitButtonEnabled = false;
    const pName = this.constructor.name + "main";
    this.publicHelper.processService.processStart(
      pName,
      "",
      this.constructorInfoAreaId,
    );

    this.crmLeadService.ServiceGetOneById(this.requestId).subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
        this.dataModelResult = ret as ErrorExceptionResult<CrmLeadModel>;
        if (!ret.isSuccess) {
          this.formInfo.submitButtonEnabled = true;
          this.cmsToastrService.typeErrorEdit(ret.errorMessage);
        } else {
          this.dataModel = ret.item;
          if (ret.item) {
            this.formInfo.formTitle =
              this.formInfo.formTitle + " " + ret.item.title || (ret.item.firstName + " " + ret.item.lastName);
          }
          this.formInfo.submitButtonEnabled = true;
        }
        this.formInfo.submitButtonEnabled = true;
        this.publicHelper.processService.processStop(pName);
      },
      error: (er) => {
        this.formInfo.submitButtonEnabled = true;
        this.cmsToastrService.typeError(er);
        this.formInfo.submitButtonEnabled = true;
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

    this.crmLeadService.ServiceEdit(this.dataModel).subscribe({
      next: (ret) => {
        this.dataModelResult = ret as ErrorExceptionResult<CrmLeadModel>;
        if (ret.isSuccess) {
          this.translate
            .get("MESSAGE.registration_completed_successfully")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
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

  /**
   * متد انتخاب Contact
   * @param model - مدل Contact انتخاب شده یا null
   */
  onActionSelectorContact(model: CrmContactModel | null): void {
    this.dataModel.linkContactId = null;
    if (model && model.id) {
      this.dataModel.linkContactId = model.id;
      if (model.firstName) {
        this.dataModel.firstName = model.firstName;
      }
      if (model.lastName) {
        this.dataModel.lastName = model.lastName;
      }
      if (model.email) {
        this.dataModel.email = model.email;
      }
      if (model.phone) {
        this.dataModel.phone = model.phone;
      }
      if (model.mobile) {
        this.dataModel.mobile = model.mobile;
      }
    }
  }

  /**
   * متد انتخاب Campaign
   * @param model - مدل Campaign انتخاب شده یا null
   */
  onActionSelectorCampaign(model: CrmCampaignModel | null): void {
    this.dataModel.linkCampaignId = null;
    if (model && model.id) {
      this.dataModel.linkCampaignId = model.id;
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
