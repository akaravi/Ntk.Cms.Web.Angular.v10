import { Routes } from "@angular/router";
import { EstateBillboardAddComponent } from "../billboard/add/add.component";
import { EstateBillboardEditComponent } from "../billboard/edit/edit.component";
import { EstateBillboardListComponent } from "../billboard/list/list.component";
import { EstateCategoryRackListComponent } from "../category-rack/list/list.component";
import { EstateCategoryZoneListComponent } from "../category-zone/list/list.component";
import { EstateContractTypeListComponent } from "./contract-type/list/list.component";
import { EstateDashboardComponent } from "../dashboard/dashboard.component";
import { EstatePropertyDetailGroupListComponent } from "./property-detail-group/list/list.component";
import { EstatePropertyDetailListComponent } from "./property-detail/list/list.component";
import { EstatePropertyTypeLanduseListComponent } from "./property-type-landuse/list/list.component";
import { EstatePropertyTypeUsageListComponent } from "./property-type-usage/list/list.component";
import { EstateAccountAgencyAdsListComponent } from "./account-agency-ads/list/list.component";
import { EstateAccountAgencyListComponent } from "./account-agency/list/list.component";
import { EstateAccountExpertListComponent } from "./account-expert/list/list.component";
import { EstateActivityTypeListComponent } from "./activity-type/list/list.component";
import { EstateAdsTypeListComponent } from "./ads-type/list/list.component";
import { EstateMainComponent } from "./estate-main.component";

export const routesNormal: Routes = [
  {
    path: "",
    component: EstateMainComponent,
    data: { title: "ROUTE.ESTATE.MAIN" },
    children: [
      /* Dashboard */
      {
        path: "",
        pathMatch: "full",
        component: EstateDashboardComponent,
        data: { title: "ROUTE.ESTATE.MAIN" },
      },
      /**/
      {
        path: "property-type-usage",
        component: EstatePropertyTypeUsageListComponent,
        data: { title: "ROUTE.ESTATE.TYPEUSAGE" },
      },
      {
        path: "property-type-landuse",
        component: EstatePropertyTypeLanduseListComponent,
        data: { title: "ROUTE.ESTATE.LANDUSE" },
      },
      /**/
      {
        path: "activity-type",
        component: EstateActivityTypeListComponent,
        data: { title: "ROUTE.ESTATE.ACTIVITYTYPE" },
      },
      /**/
      {
        path: "ads-type",
        component: EstateAdsTypeListComponent,
        data: { title: "ROUTE.ESTATE.ADSTYPE" },
      },
      /**/
      {
        path: "account-agency",
        component: EstateAccountAgencyListComponent,
        data: { title: "ROUTE.ESTATE.ACCOUNTAGENCY" },
      },
      {
        path: "account-agency/LinkAccountUserId/:LinkAccountUserId",
        component: EstateAccountAgencyListComponent,
        data: { title: "ROUTE.ESTATE.ACCOUNTAGENCY" },
      },
      /**/ {
        path: "account-user",
        component: EstateAccountExpertListComponent,
        data: { title: "ROUTE.ESTATE.ACCOUNTUSER" },
      },
      {
        path: "account-user/LinkAccountAgencyId/:LinkAccountAgencyId",
        component: EstateAccountExpertListComponent,
        data: { title: "ROUTE.ESTATE.ACCOUNTUSER" },
      },
      /**/
      {
        path: "account-agency-ads",
        component: EstateAccountAgencyAdsListComponent,
        data: { title: "ROUTE.ESTATE.ACCOUNTAGENCYADS" },
      },
      /**/
      {
        path: "contract-type",
        component: EstateContractTypeListComponent,
        data: { title: "ROUTE.ESTATE.CONTRACTTYPE" },
      },
      /**/
      {
        path: "billboard",
        component: EstateBillboardListComponent,
        data: { title: "ROUTE.ESTATE.BILLBOARD" },
      },
      {
        path: "billboard/add",
        component: EstateBillboardAddComponent,
        data: { title: "ROUTE.ESTATE.BILLBOARD" },
      },
      {
        path: "billboard/add-copy/:id",
        component: EstateBillboardAddComponent,
        data: { title: "ROUTE.ESTATE.BILLBOARD" },
      },
      {
        path: "billboard/edit/:id",
        component: EstateBillboardEditComponent,
        data: { title: "ROUTE.ESTATE.BILLBOARD" },
      },
      /**/
      {
        path: "category-zone",
        component: EstateCategoryZoneListComponent,
        data: { title: "ROUTE.ESTATE.CATEGORY.ZONE" },
      },
      {
        path: "category-rack",
        component: EstateCategoryRackListComponent,
        data: { title: "ROUTE.ESTATE.CATEGORY.RACK" },
      },
      /**/
      {
        path: "property-detail-group",
        component: EstatePropertyDetailGroupListComponent,
        data: { title: "ROUTE.ESTATE.DETAIL.GROUP" },
      },
      /**/
      {
        path: "property-detail",
        component: EstatePropertyDetailListComponent,
        data: { title: "ROUTE.ESTATE.PROPERTYDETAIL" },
      },
      {
        path: "property-detail/LinkPropertyTypeLanduseId/:LinkPropertyTypeLanduseId",
        component: EstatePropertyDetailListComponent,
        data: { title: "ROUTE.ESTATE.PROPERTYDETAIL" },
      },
      /** */
    ],
  },
];
