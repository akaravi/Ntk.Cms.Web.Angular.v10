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
  CrmOpportunityModel,
  CrmOpportunityService,
  TokenInfoModelV3,
  CrmAccountModel,
  CrmContactModel,
  CrmLeadModel,
  CrmPipelineModel,
  CrmStageModel,
  CrmCampaignModel,
  CrmEnumService,
  InfoEnumModel } from "ntk-cms-api";
import { AddBaseComponent } from "src/app/core/cmsComponent/addBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

import { FormInfoModel } from "../../../../../core/models/formInfoModel";

/**
 * Component افزودن Opportunity جدید در CRM.
 * این component فرم افزودن Opportunity جدید را نمایش می‌دهد.
 */
@Component({
  selector: "app-crm-opportunity-add",
  templateUrl: "./add.component.html",
  standalone: false,
})
export class CrmOpportunityAddComponent
  extends AddBaseComponent<CrmOpportunityService, CrmOpportunityModel, string>
  implements OnInit
{
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CrmOpportunityAddComponent>,
    public coreEnumService: CoreEnumService,
    public crmOpportunityService: CrmOpportunityService,
    public crmEnumService: CrmEnumService,
    public cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    private cmsStoreService: CmsStoreService,
    public tokenHelper: TokenHelper,
    public translate: TranslateService,
  ) {
    super(crmOpportunityService, new CrmOpportunityModel(), publicHelper, translate);
    this.publicHelper.processService.cdr = this.cdr;
    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();

  appLanguage = "fa";
  tokenInfo = new TokenInfoModelV3();
  dataModelResult: ErrorExceptionResult<CrmOpportunityModel> =
    new ErrorExceptionResult<CrmOpportunityModel>();
  dataModel: CrmOpportunityModel = new CrmOpportunityModel();

  dataModelCrmOpportunityStatusEnumResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();
  dataModelCrmOpportunityTypeEnumResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();

  ngOnInit(): void {
    this.translate.get("TITLE.ADD").subscribe((str: string) => {
      this.formInfo.formTitle = str;
    });

    this.DataGetAccess();
    this.getCrmOpportunityStatusEnum();
    this.getCrmOpportunityTypeEnum();
  }

  /**
   * دریافت اطلاعات CrmOpportunityStatusEnum
   */
  getCrmOpportunityStatusEnum(): void {
    this.crmEnumService.ServiceCrmOpportunityStatusEnum().subscribe((res) => {
      this.dataModelCrmOpportunityStatusEnumResult = res;
    });
  }

  /**
   * دریافت اطلاعات CrmOpportunityTypeEnum
   * Commented: Enum method not available in API
   */
  getCrmOpportunityTypeEnum(): void {
    // this.crmEnumService.ServiceCrmOpportunityTypeEnum().subscribe((res) => {
    //   this.dataModelCrmOpportunityTypeEnumResult = res;
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

    this.crmOpportunityService.ServiceAdd(this.dataModel).subscribe({
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
    }
  }

  /**
   * متد انتخاب Lead
   * @param model - مدل Lead انتخاب شده یا null
   */
  onActionSelectorLead(model: CrmLeadModel | null): void {
    this.dataModel.linkLeadId = null;
    if (model && model.id) {
      this.dataModel.linkLeadId = model.id;
    }
  }

  /**
   * متد انتخاب Pipeline
   * @param model - مدل Pipeline انتخاب شده یا null
   */
  onActionSelectorPipeline(model: CrmPipelineModel | null): void {
    this.dataModel.linkPipelineId = null;
    this.dataModel.linkStageId = null; // Reset stage when pipeline changes
    if (model && model.id) {
      this.dataModel.linkPipelineId = model.id;
    }
  }

  /**
   * متد انتخاب Stage
   * @param model - مدل Stage انتخاب شده یا null
   */
  onActionSelectorStage(model: CrmStageModel | null): void {
    this.dataModel.linkStageId = null;
    if (model && model.id) {
      this.dataModel.linkStageId = model.id;
      if (model.probability) {
        this.dataModel.probability = model.probability;
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
