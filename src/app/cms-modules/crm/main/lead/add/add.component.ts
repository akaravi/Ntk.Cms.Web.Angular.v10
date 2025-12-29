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
import { AddBaseComponent } from "src/app/core/cmsComponent/addBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

import { FormInfoModel } from "../../../../../core/models/formInfoModel";

/**
 * Component افزودن Lead جدید در CRM.
 * این component فرم افزودن Lead جدید را نمایش می‌دهد.
 */
@Component({
  selector: "app-crm-lead-add",
  templateUrl: "./add.component.html",
  standalone: false,
})
export class CrmLeadAddComponent
  extends AddBaseComponent<CrmLeadService, CrmLeadModel, string>
  implements OnInit
{
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CrmLeadAddComponent>,
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
  
  dataModelCrmLeadStatusEnumResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();
  dataModelCrmLeadSourceEnumResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();

  fileManagerOpenForm = false;

  ngOnInit(): void {
    this.translate.get("TITLE.ADD").subscribe((str: string) => {
      this.formInfo.formTitle = str;
    });

    this.DataGetAccess();
    // Commented: Enum methods not available in API
    // this.getCrmLeadStatusEnum();
    // this.getCrmLeadSourceEnum();
  }

  /**
   * دریافت اطلاعات CrmLeadStatusEnum
   * Commented: Enum method not available in API
   */
  getCrmLeadStatusEnum(): void {
    // this.crmEnumService.ServiceCrmLeadStatusEnum().subscribe((res) => {
    //   this.dataModelCrmLeadStatusEnumResult = res;
    // });
  }

  /**
   * دریافت اطلاعات CrmLeadSourceEnum
   * Commented: Enum method not available in API
   */
  getCrmLeadSourceEnum(): void {
    // this.crmEnumService.ServiceCrmLeadSourceEnum().subscribe((res) => {
    //   this.dataModelCrmLeadSourceEnumResult = res;
    // });
  }

  DataAddContent(): void {
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

    this.crmLeadService.ServiceAdd(this.dataModel).subscribe({
      next: (ret) => {
        this.dataModelResult = ret;
        if (ret.isSuccess) {
          this.translate
            .get("MESSAGE.registration_completed_successfully")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
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
    this.DataAddContent();
  }
  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }
}
