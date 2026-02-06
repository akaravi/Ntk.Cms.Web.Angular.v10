import { Routes } from "@angular/router";
import { CrmSupplierPriceListAddComponent } from "../supplier-price-list/add/add.component";
import { CrmSupplierPriceListComponent } from "../supplier-price-list/list/list.component";
import { CrmSupplierRatingAddComponent } from "../supplier-rating/add/add.component";
import { CrmSupplierRatingListComponent } from "../supplier-rating/list/list.component";
import { CrmAccountAddComponent } from "./account/add/add.component";
import { CrmAccountEditComponent } from "./account/edit/edit.component";
import { CrmAccountListComponent } from "./account/list/list.component";
import { CrmActivityAddComponent } from "./activity/add/add.component";
import { CrmActivityEditComponent } from "./activity/edit/edit.component";
import { CrmActivityListComponent } from "./activity/list/list.component";
import { CrmCampaignAddComponent } from "./campaign/add/add.component";
import { CrmCampaignEditComponent } from "./campaign/edit/edit.component";
import { CrmCampaignListComponent } from "./campaign/list/list.component";
import { CrmContactAddComponent } from "./contact/add/add.component";
import { CrmContactEditComponent } from "./contact/edit/edit.component";
import { CrmContactListComponent } from "./contact/list/list.component";
import { CrmMainComponent } from "./crm-main.component";
import { CrmDealAddComponent } from "./deal/add/add.component";
import { CrmDealEditComponent } from "./deal/edit/edit.component";
import { CrmDealListComponent } from "./deal/list/list.component";
import { CrmLeadAddComponent } from "./lead/add/add.component";
import { CrmLeadEditComponent } from "./lead/edit/edit.component";
import { CrmLeadListComponent } from "./lead/list/list.component";
import { CrmOpportunityAddComponent } from "./opportunity/add/add.component";
import { CrmOpportunityEditComponent } from "./opportunity/edit/edit.component";
import { CrmOpportunityListComponent } from "./opportunity/list/list.component";
import { CrmPipelineAddComponent } from "./pipeline/add/add.component";
import { CrmPipelineEditComponent } from "./pipeline/edit/edit.component";
import { CrmPipelineListComponent } from "./pipeline/list/list.component";
import { CrmStageAddComponent } from "./stage/add/add.component";
import { CrmStageEditComponent } from "./stage/edit/edit.component";
import { CrmStageListComponent } from "./stage/list/list.component";

export const routesMobile: Routes = [
  {
    path: "",
    component: CrmMainComponent,
    data: { title: "ROUTE.CRM.MAIN" },
    children: [
      {
        path: "lead",
        component: CrmLeadListComponent,
        data: { title: "ROUTE.CRM.LEAD" },
      },
      {
        path: "lead/add",
        component: CrmLeadAddComponent,
        data: { title: "ROUTE.CRM.LEAD.ADD" },
      },
      {
        path: "lead/edit/:id",
        component: CrmLeadEditComponent,
        data: { title: "ROUTE.CRM.LEAD.EDIT" },
      },
      {
        path: "account",
        component: CrmAccountListComponent,
        data: { title: "ROUTE.CRM.ACCOUNT" },
      },
      {
        path: "account/add",
        component: CrmAccountAddComponent,
        data: { title: "ROUTE.CRM.ACCOUNT.ADD" },
      },
      {
        path: "account/edit/:id",
        component: CrmAccountEditComponent,
        data: { title: "ROUTE.CRM.ACCOUNT.EDIT" },
      },
      {
        path: "contact",
        component: CrmContactListComponent,
        data: { title: "ROUTE.CRM.CONTACT" },
      },
      {
        path: "contact/add",
        component: CrmContactAddComponent,
        data: { title: "ROUTE.CRM.CONTACT.ADD" },
      },
      {
        path: "contact/edit/:id",
        component: CrmContactEditComponent,
        data: { title: "ROUTE.CRM.CONTACT.EDIT" },
      },
      {
        path: "opportunity",
        component: CrmOpportunityListComponent,
        data: { title: "ROUTE.CRM.OPPORTUNITY" },
      },
      {
        path: "opportunity/add",
        component: CrmOpportunityAddComponent,
        data: { title: "ROUTE.CRM.OPPORTUNITY.ADD" },
      },
      {
        path: "opportunity/edit/:id",
        component: CrmOpportunityEditComponent,
        data: { title: "ROUTE.CRM.OPPORTUNITY.EDIT" },
      },
      {
        path: "pipeline",
        component: CrmPipelineListComponent,
        data: { title: "ROUTE.CRM.PIPELINE" },
      },
      {
        path: "pipeline/add",
        component: CrmPipelineAddComponent,
        data: { title: "ROUTE.CRM.PIPELINE.ADD" },
      },
      {
        path: "pipeline/edit/:id",
        component: CrmPipelineEditComponent,
        data: { title: "ROUTE.CRM.PIPELINE.EDIT" },
      },
      {
        path: "stage",
        component: CrmStageListComponent,
        data: { title: "ROUTE.CRM.STAGE" },
      },
      {
        path: "stage/add",
        component: CrmStageAddComponent,
        data: { title: "ROUTE.CRM.STAGE.ADD" },
      },
      {
        path: "stage/edit/:id",
        component: CrmStageEditComponent,
        data: { title: "ROUTE.CRM.STAGE.EDIT" },
      },
      {
        path: "deal",
        component: CrmDealListComponent,
        data: { title: "ROUTE.CRM.DEAL" },
      },
      {
        path: "deal/add",
        component: CrmDealAddComponent,
        data: { title: "ROUTE.CRM.DEAL.ADD" },
      },
      {
        path: "deal/edit/:id",
        component: CrmDealEditComponent,
        data: { title: "ROUTE.CRM.DEAL.EDIT" },
      },
      {
        path: "activity",
        component: CrmActivityListComponent,
        data: { title: "ROUTE.CRM.ACTIVITY" },
      },
      {
        path: "activity/add",
        component: CrmActivityAddComponent,
        data: { title: "ROUTE.CRM.ACTIVITY.ADD" },
      },
      {
        path: "activity/edit/:id",
        component: CrmActivityEditComponent,
        data: { title: "ROUTE.CRM.ACTIVITY.EDIT" },
      },
      {
        path: "campaign",
        component: CrmCampaignListComponent,
        data: { title: "ROUTE.CRM.CAMPAIGN" },
      },
      {
        path: "campaign/add",
        component: CrmCampaignAddComponent,
        data: { title: "ROUTE.CRM.CAMPAIGN.ADD" },
      },
      {
        path: "campaign/edit/:id",
        component: CrmCampaignEditComponent,
        data: { title: "ROUTE.CRM.CAMPAIGN.EDIT" },
      },
      {
        path: "supplier-price-list",
        component: CrmSupplierPriceListComponent,
        data: { title: "ROUTE.CRM.SUPPLIER_PRICE_LIST" },
      },
      {
        path: "supplier-price-list/add",
        component: CrmSupplierPriceListAddComponent,
        data: { title: "ROUTE.CRM.SUPPLIER_PRICE_LIST.ADD" },
      },
      {
        path: "supplier-rating",
        component: CrmSupplierRatingListComponent,
        data: { title: "ROUTE.CRM.SUPPLIER_RATING" },
      },
      {
        path: "supplier-rating/add",
        component: CrmSupplierRatingAddComponent,
        data: { title: "ROUTE.CRM.SUPPLIER_RATING.ADD" },
      },
      {
        path: "",
        redirectTo: "lead",
        pathMatch: "full",
      },
    ],
  },
];
