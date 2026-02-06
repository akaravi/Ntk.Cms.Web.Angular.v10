import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { CoreSharedModule } from "../core-main/core.shared.module";
import { CrmComponent } from "./crm.component";
import { CrmRoutes } from "./crm.routing";
import { CrmAccountAddComponent } from "./main/account/add/add.component";
import { CrmAccountEditComponent } from "./main/account/edit/edit.component";
import { CrmAccountHeaderComponent } from "./main/account/header/header.component";
import { CrmAccountListComponent } from "./main/account/list/list.component";
import { CrmAccountListMobileComponent } from "./main/account/list/list.mobile.component";
import { CrmAccountSelectorComponent } from "./main/account/selector/selector.component";
import { CrmActivityAddComponent } from "./main/activity/add/add.component";
import { CrmActivityEditComponent } from "./main/activity/edit/edit.component";
import { CrmActivityListComponent } from "./main/activity/list/list.component";
import { CrmActivityListMobileComponent } from "./main/activity/list/list.mobile.component";
import { CrmCampaignAddComponent } from "./main/campaign/add/add.component";
import { CrmCampaignEditComponent } from "./main/campaign/edit/edit.component";
import { CrmCampaignHeaderComponent } from "./main/campaign/header/header.component";
import { CrmCampaignListComponent } from "./main/campaign/list/list.component";
import { CrmCampaignListMobileComponent } from "./main/campaign/list/list.mobile.component";
import { CrmCampaignSelectorComponent } from "./main/campaign/selector/selector.component";
import { CrmContactAddComponent } from "./main/contact/add/add.component";
import { CrmContactEditComponent } from "./main/contact/edit/edit.component";
import { CrmContactHeaderComponent } from "./main/contact/header/header.component";
import { CrmContactListComponent } from "./main/contact/list/list.component";
import { CrmContactListMobileComponent } from "./main/contact/list/list.mobile.component";
import { CrmContactSelectorComponent } from "./main/contact/selector/selector.component";
import { CrmMainComponent } from "./main/crm-main.component";
import { CrmDealAddComponent } from "./main/deal/add/add.component";
import { CrmDealEditComponent } from "./main/deal/edit/edit.component";
import { CrmDealListComponent } from "./main/deal/list/list.component";
import { CrmDealListMobileComponent } from "./main/deal/list/list.mobile.component";
import { CrmDealSelectorComponent } from "./main/deal/selector/selector.component";
import { CrmLeadAddComponent } from "./main/lead/add/add.component";
import { CrmLeadEditComponent } from "./main/lead/edit/edit.component";
import { CrmLeadListComponent } from "./main/lead/list/list.component";
import { CrmLeadListMobileComponent } from "./main/lead/list/list.mobile.component";
import { CrmLeadSelectorComponent } from "./main/lead/selector/selector.component";
import { CrmOpportunityAddComponent } from "./main/opportunity/add/add.component";
import { CrmOpportunityEditComponent } from "./main/opportunity/edit/edit.component";
import { CrmOpportunityListComponent } from "./main/opportunity/list/list.component";
import { CrmOpportunityListMobileComponent } from "./main/opportunity/list/list.mobile.component";
import { CrmOpportunitySelectorComponent } from "./main/opportunity/selector/selector.component";
import { CrmOpportunityStageHistoryListComponent } from "./main/opportunity/stage-history/list/list.component";
import { CrmOpportunityStageHistoryListMobileComponent } from "./main/opportunity/stage-history/list/list.mobile.component";
import { CrmPipelineAddComponent } from "./main/pipeline/add/add.component";
import { CrmPipelineEditComponent } from "./main/pipeline/edit/edit.component";
import { CrmPipelineListComponent } from "./main/pipeline/list/list.component";
import { CrmPipelineListMobileComponent } from "./main/pipeline/list/list.mobile.component";
import { CrmPipelineSelectorComponent } from "./main/pipeline/selector/selector.component";
import { CrmStageAddComponent } from "./main/stage/add/add.component";
import { CrmStageEditComponent } from "./main/stage/edit/edit.component";
import { CrmStageListComponent } from "./main/stage/list/list.component";
import { CrmStageListMobileComponent } from "./main/stage/list/list.mobile.component";
import { CrmStageSelectorComponent } from "./main/stage/selector/selector.component";
import { CrmSupplierPriceListAddComponent } from "./supplier-price-list/add/add.component";
import { CrmSupplierPriceListComponent } from "./supplier-price-list/list/list.component";
import { CrmSupplierPriceListMobileComponent } from "./supplier-price-list/list/list.mobile.component";
import { CrmSupplierRatingAddComponent } from "./supplier-rating/add/add.component";
import { CrmSupplierRatingListComponent } from "./supplier-rating/list/list.component";
import { CrmSupplierRatingListMobileComponent } from "./supplier-rating/list/list.mobile.component";

/**
 * ماژول اصلی CRM.
 * این ماژول به عنوان container برای sub-moduleهای CRM عمل می‌کند.
 */
@NgModule({
  declarations: [CrmComponent
    CrmAccountAddComponent,
    CrmAccountEditComponent,
    CrmAccountHeaderComponent,
    CrmAccountListComponent,
    CrmAccountListMobileComponent,
    CrmAccountSelectorComponent,
    CrmActivityAddComponent,
    CrmActivityEditComponent,
    CrmActivityListComponent,
    CrmActivityListMobileComponent,
    CrmCampaignAddComponent,
    CrmCampaignEditComponent,
    CrmCampaignHeaderComponent,
    CrmCampaignListComponent,
    CrmCampaignListMobileComponent,
    CrmCampaignSelectorComponent,
    CrmContactAddComponent,
    CrmContactEditComponent,
    CrmContactHeaderComponent,
    CrmContactListComponent,
    CrmContactListMobileComponent,
    CrmContactSelectorComponent,
    CrmMainComponent,
    CrmDealAddComponent,
    CrmDealEditComponent,
    CrmDealListComponent,
    CrmDealListMobileComponent,
    CrmDealSelectorComponent,
    CrmLeadAddComponent,
    CrmLeadEditComponent,
    CrmLeadListComponent,
    CrmLeadListMobileComponent,
    CrmLeadSelectorComponent,
    CrmOpportunityAddComponent,
    CrmOpportunityEditComponent,
    CrmOpportunityListComponent,
    CrmOpportunityListMobileComponent,
    CrmOpportunitySelectorComponent,
    CrmOpportunityStageHistoryListComponent,
    CrmOpportunityStageHistoryListMobileComponent,
    CrmPipelineAddComponent,
    CrmPipelineEditComponent,
    CrmPipelineListComponent,
    CrmPipelineListMobileComponent,
    CrmPipelineSelectorComponent,
    CrmStageAddComponent,
    CrmStageEditComponent,
    CrmStageListComponent,
    CrmStageListMobileComponent,
    CrmStageSelectorComponent,
    CrmSupplierPriceListAddComponent,
    CrmSupplierPriceListComponent,
    CrmSupplierPriceListMobileComponent,
    CrmSupplierRatingAddComponent,
    CrmSupplierRatingListComponent,
    CrmSupplierRatingListMobileComponent,],
  imports: [
    CommonModule,
    CrmRoutes,
    SharedModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
    CoreSharedModule,
  ],
  providers: [],
})
export class CrmModule {}


