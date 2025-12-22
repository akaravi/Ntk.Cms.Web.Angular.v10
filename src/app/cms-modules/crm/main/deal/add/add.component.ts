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
  CrmDealModel,
  CrmDealService,
  TokenInfoModelV3,
  CrmOpportunityModel,
  CrmAccountModel,
  CrmContactModel,
  CrmPipelineModel,
  CrmStageModel,
} from "ntk-cms-api";
import { AddBaseComponent } from "src/app/core/cmsComponent/addBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

import { FormInfoModel } from "../../../../../core/models/formInfoModel";
import { FormSubmitedStatusEnum } from "../../../../../core/models/formSubmitedStatusEnum";

/**
 * Component افزودن Deal جدید در CRM.
 * این component فرم افزودن Deal جدید را نمایش می‌دهد.
 */
@Component({
  selector: "app-crm-deal-add",
  templateUrl: "./add.component.html",
  standalone: false,
})
export class CrmDealAddComponent
  extends AddBaseComponent<CrmDealService, CrmDealModel, string>
  implements OnInit
{
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CrmDealAddComponent>,
    public coreEnumService: CoreEnumService,
    public crmDealService: CrmDealService,
    private cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    private cmsStoreService: CmsStoreService,
    public tokenHelper: TokenHelper,
    public translate: TranslateService,
  ) {
    super(crmDealService, new CrmDealModel(), publicHelper, translate);
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
  dataModelResult: ErrorExceptionResult<CrmDealModel> =
    new ErrorExceptionResult<CrmDealModel>();
  dataModel: CrmDealModel = new CrmDealModel();
  formInfo: FormInfoModel = new FormInfoModel();

  ngOnInit(): void {
    this.translate.get("TITLE.ADD").subscribe((str: string) => {
      this.formInfo.formTitle = str;
    });

    this.DataGetAccess();
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

    this.crmDealService.ServiceAdd(this.dataModel).subscribe({
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
          this.cmsToastrService.typeSuccessAdd();
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

  onActionSelectorUser(model: CoreUserModel | null): void {
    this.dataModel.linkAssignedUserId = null;
    if (model && model.id > 0) {
      this.dataModel.linkAssignedUserId = model.id;
    }
  }

  /**
   * متد انتخاب Opportunity
   * @param model - مدل Opportunity انتخاب شده یا null
   */
  onActionSelectorOpportunity(model: CrmOpportunityModel | null): void {
    this.dataModel.linkOpportunityId = null;
    if (model && model.id) {
      this.dataModel.linkOpportunityId = model.id;
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

