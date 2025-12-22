import { Routes } from "@angular/router";
import { CrmMainComponent } from "./crm-main.component";
import { CrmLeadListComponent } from "./lead/list/list.component";
import { CrmAccountListComponent } from "./account/list/list.component";
import { CrmContactListComponent } from "./contact/list/list.component";
import { CrmOpportunityListComponent } from "./opportunity/list/list.component";
import { CrmPipelineListComponent } from "./pipeline/list/list.component";
import { CrmStageListComponent } from "./stage/list/list.component";
import { CrmDealListComponent } from "./deal/list/list.component";
import { CrmActivityListComponent } from "./activity/list/list.component";
import { CrmCampaignListComponent } from "./campaign/list/list.component";

export const routesNormal: Routes = [
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
        path: "account",
        component: CrmAccountListComponent,
        data: { title: "ROUTE.CRM.ACCOUNT" },
      },
      {
        path: "contact",
        component: CrmContactListComponent,
        data: { title: "ROUTE.CRM.CONTACT" },
      },
      {
        path: "opportunity",
        component: CrmOpportunityListComponent,
        data: { title: "ROUTE.CRM.OPPORTUNITY" },
      },
      {
        path: "pipeline",
        component: CrmPipelineListComponent,
        data: { title: "ROUTE.CRM.PIPELINE" },
      },
      {
        path: "stage",
        component: CrmStageListComponent,
        data: { title: "ROUTE.CRM.STAGE" },
      },
      {
        path: "deal",
        component: CrmDealListComponent,
        data: { title: "ROUTE.CRM.DEAL" },
      },
      {
        path: "activity",
        component: CrmActivityListComponent,
        data: { title: "ROUTE.CRM.ACTIVITY" },
      },
      {
        path: "campaign",
        component: CrmCampaignListComponent,
        data: { title: "ROUTE.CRM.CAMPAIGN" },
      },
      {
        path: "",
        redirectTo: "lead",
        pathMatch: "full",
      },
    ],
  },
];

