import {
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit,
    ViewChild
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import {
    CoreEnumService,
    CoreUserModel,
    CrmAccountModel,
    CrmCampaignModel,
    CrmContactModel,
    CrmEnumService,
    CrmLeadModel,
    CrmOpportunityModel,
    CrmOpportunityService,
    CrmPipelineModel,
    CrmStageModel,
    DataFieldInfoModel,
    ErrorExceptionResult,
    InfoEnumModel,
    TokenInfoModelV3
} from "ntk-cms-api";
import { EditBaseComponent } from "src/app/core/cmsComponent/editBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";


/**
 * Component ویرایش Opportunity در CRM.
 * این component فرم ویرایش Opportunity موجود را نمایش می‌دهد.
 */
@Component({
  selector: "app-crm-opportunity-edit",
  templateUrl: "./edit.component.html",
  standalone: false,
})
export class CrmOpportunityEditComponent
  extends EditBaseComponent<CrmOpportunityService, CrmOpportunityModel, string>
  implements OnInit
{
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CrmOpportunityEditComponent>,
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
    if (data && data.id && data.id.length > 0) {
      this.requestId = data.id;
    }
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

  requestId = "";

  dataModelCrmOpportunityStatusEnumResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();
  dataModelCrmOpportunityTypeEnumResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();

  ngOnInit(): void {
    if (this.requestId.length > 0) {
      this.DataGetOneContent();
    } else {
      this.cmsToastrService.typeErrorEditRowIsNull();
    }
    this.getCrmOpportunityStatusEnum();
    // Commented: Enum method not available in API
    // this.getCrmOpportunityTypeEnum();
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
   */
  getCrmOpportunityTypeEnum(): void {
    // Commented: Enum method not available in API
    // this.crmEnumService.ServiceCrmOpportunityTypeEnum().subscribe((res) => {
    //   this.dataModelCrmOpportunityTypeEnumResult = res;
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

    this.crmOpportunityService.ServiceGetOneById(this.requestId).subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
        this.dataModelResult = ret as ErrorExceptionResult<CrmOpportunityModel>;
        if (!ret.isSuccess) {
          this.formInfo.submitButtonEnabled = true;
          this.cmsToastrService.typeErrorEdit(ret.errorMessage);
        } else {
          this.dataModel = ret.item;
          if (ret.item) {
            this.formInfo.formTitle =
              this.formInfo.formTitle + " " + ret.item.name;
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

    this.crmOpportunityService.ServiceEdit(this.dataModel).subscribe({
      next: (ret) => {
        this.dataModelResult = ret as ErrorExceptionResult<CrmOpportunityModel>;
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
    this.DataEditContent();
  }
  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }
}
