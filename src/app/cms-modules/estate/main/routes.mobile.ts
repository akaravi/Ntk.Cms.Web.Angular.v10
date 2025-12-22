import { Routes } from "@angular/router";
import { EstateCategoryRackAddMobileComponent } from "../category-rack/add/add.mobile.component";
import { EstateCategoryRackEditMobileComponent } from "../category-rack/edit/edit.mobile.component";
import { EstateCategoryRackListMobileComponent } from "../category-rack/list/list.mobile.component";
import { EstateCategoryZoneAddMobileComponent } from "../category-zone/add/add.mobile.component";
import { EstateCategoryZoneEditMobileComponent } from "../category-zone/edit/edit.mobile.component";
import { EstateCategoryZoneListMobileComponent } from "../category-zone/list/list.mobile.component";
import { EstateAccountAgencyAddMobileComponent } from "./account-agency/add/add.mobile.component";
import { EstateAccountAgencyEditMobileComponent } from "./account-agency/edit/edit.mobile.component";
import { EstateAccountAgencyAdsAddMobileComponent } from "./account-agency-ads/add/add.mobile.component";
import { EstateAccountAgencyAdsEditMobileComponent } from "./account-agency-ads/edit/edit.mobile.component";
import { EstateAccountAgencyAdsListMobileComponent } from "./account-agency-ads/list/list.mobile.component";
import { EstateAccountAgencyListMobileComponent } from "./account-agency/list/list.mobile.component";
import { EstateAccountExpertAddMobileComponent } from "./account-expert/add/add.mobile.component";
import { EstateAccountExpertEditMobileComponent } from "./account-expert/edit/edit.mobile.component";
import { EstateAccountExpertListMobileComponent } from "./account-expert/list/list.mobile.component";
import { EstateActivityTypeAddMobileComponent } from "./activity-type/add/add.mobile.component";
import { EstateActivityTypeEditMobileComponent } from "./activity-type/edit/edit.mobile.component";
import { EstateActivityTypeListMobileComponent } from "./activity-type/list/list.mobile.component";
import { EstateAdsTypeAddMobileComponent } from "./ads-type/add/add.mobile.component";
import { EstateAdsTypeEditMobileComponent } from "./ads-type/edit/edit.mobile.component";
import { EstateAdsTypeListMobileComponent } from "./ads-type/list/list.mobile.component";
import { EstateContractTypeAddMobileComponent } from "./contract-type/add/add.mobile.component";
import { EstateContractTypeEditMobileComponent } from "./contract-type/edit/edit.mobile.component";
import { EstateContractTypeListMobileComponent } from "./contract-type/list/list.mobile.component";
import { EstateMainComponent } from "./estate-main.component";
import { EstatePropertyDetailGroupAddMobileComponent } from "./property-detail-group/add/add.mobile.component";
import { EstatePropertyDetailGroupEditMobileComponent } from "./property-detail-group/edit/edit.mobile.component";
import { EstatePropertyDetailGroupListMobileComponent } from "./property-detail-group/list/list.mobile.component";
import { EstatePropertyDetailAddMobileComponent } from "./property-detail/add/add.mobile.component";
import { EstatePropertyDetailEditMobileComponent } from "./property-detail/edit/edit.mobile.component";
import { EstatePropertyDetailListMobileComponent } from "./property-detail/list/list.mobile.component";
import { EstatePropertyTypeLanduseAddMobileComponent } from "./property-type-landuse/add/add.mobile.component";
import { EstatePropertyTypeLanduseEditMobileComponent } from "./property-type-landuse/edit/edit.mobile.component";
import { EstatePropertyTypeLanduseListMobileComponent } from "./property-type-landuse/list/list.mobile.component";
import { EstatePropertyTypeUsageAddMobileComponent } from "./property-type-usage/add/add.mobile.component";
import { EstatePropertyTypeUsageEditMobileComponent } from "./property-type-usage/edit/edit.mobile.component";
import { EstatePropertyTypeUsageListMobileComponent } from "./property-type-usage/list/list.mobile.component";

export const routesMobile: Routes = [
  {
    path: "",
    component: EstateMainComponent,
    data: { title: "ROUTE.ESTATE.MAIN" },
    children: [
      /**/
      {
        path: "property-type-usage",
        component: EstatePropertyTypeUsageListMobileComponent,
        data: { title: "ROUTE.ESTATE.TYPEUSAGE" },
      },
      {
        path: "property-type-usage/add",
        component: EstatePropertyTypeUsageAddMobileComponent,
        data: { title: "ROUTE.ESTATE.TYPEUSAGE" },
      },
      {
        path: "property-type-usage/add/:id",
        component: EstatePropertyTypeUsageAddMobileComponent,
        data: { title: "ROUTE.ESTATE.TYPEUSAGE" },
      },
      {
        path: "property-type-usage/edit/:id",
        component: EstatePropertyTypeUsageEditMobileComponent,
        data: { title: "ROUTE.ESTATE.TYPEUSAGE" },
      },
      {
        path: "property-type-landuse",
        component: EstatePropertyTypeLanduseListMobileComponent,
        data: { title: "ROUTE.ESTATE.LANDUSE" },
      },
      {
        path: "property-type-landuse/add",
        component: EstatePropertyTypeLanduseAddMobileComponent,
        data: { title: "ROUTE.ESTATE.LANDUSE" },
      },
      {
        path: "property-type-landuse/add/:id",
        component: EstatePropertyTypeLanduseAddMobileComponent,
        data: { title: "ROUTE.ESTATE.LANDUSE" },
      },
      {
        path: "property-type-landuse/edit/:id",
        component: EstatePropertyTypeLanduseEditMobileComponent,
        data: { title: "ROUTE.ESTATE.LANDUSE" },
      },
      /**/
      {
        path: "activity-type",
        component: EstateActivityTypeListMobileComponent,
        data: { title: "ROUTE.ESTATE.ACTIVITYTYPE" },
      },
      {
        path: "activity-type/add",
        component: EstateActivityTypeAddMobileComponent,
        data: { title: "ROUTE.ESTATE.ACTIVITYTYPE" },
      },
      {
        path: "activity-type/add/:id",
        component: EstateActivityTypeAddMobileComponent,
        data: { title: "ROUTE.ESTATE.ACTIVITYTYPE" },
      },
      {
        path: "activity-type/edit/:id",
        component: EstateActivityTypeEditMobileComponent,
        data: { title: "ROUTE.ESTATE.ACTIVITYTYPE" },
      },
      /**/
      {
        path: "ads-type",
        component: EstateAdsTypeListMobileComponent,
        data: { title: "ROUTE.ESTATE.ADSTYPE" },
      },
      {
        path: "ads-type/add",
        component: EstateAdsTypeAddMobileComponent,
        data: { title: "ROUTE.ESTATE.ADSTYPE" },
      },
      {
        path: "ads-type/add/:id",
        component: EstateAdsTypeAddMobileComponent,
        data: { title: "ROUTE.ESTATE.ADSTYPE" },
      },
      {
        path: "ads-type/edit/:id",
        component: EstateAdsTypeEditMobileComponent,
        data: { title: "ROUTE.ESTATE.ADSTYPE" },
      },
      /**/
      {
        path: "account-agency",
        component: EstateAccountAgencyListMobileComponent,
        data: { title: "ROUTE.ESTATE.ACCOUNTAGENCY" },
      },
      {
        path: "account-agency/LinkAccountUserId/:LinkAccountUserId",
        component: EstateAccountAgencyListMobileComponent,
        data: { title: "ROUTE.ESTATE.ACCOUNTAGENCY" },
      },
      {
        path: "account-agency/add",
        component: EstateAccountAgencyAddMobileComponent,
        data: { title: "ROUTE.ESTATE.ACCOUNTAGENCY" },
      },
      {
        path: "account-agency/add/:id",
        component: EstateAccountAgencyAddMobileComponent,
        data: { title: "ROUTE.ESTATE.ACCOUNTAGENCY" },
      },
      {
        path: "account-agency/edit/:id",
        component: EstateAccountAgencyEditMobileComponent,
        data: { title: "ROUTE.ESTATE.ACCOUNTAGENCY" },
      },
      /**/
      {
        path: "account-user",
        component: EstateAccountExpertListMobileComponent,
        data: { title: "ROUTE.ESTATE.ACCOUNTUSER" },
      },
      {
        path: "account-user/LinkAccountAgencyId/:LinkAccountAgencyId",
        component: EstateAccountExpertListMobileComponent,
        data: { title: "ROUTE.ESTATE.ACCOUNTUSER" },
      },
      {
        path: "account-user/add",
        component: EstateAccountExpertAddMobileComponent,
        data: { title: "ROUTE.ESTATE.ACCOUNTUSER" },
      },
      {
        path: "account-user/add/:id",
        component: EstateAccountExpertAddMobileComponent,
        data: { title: "ROUTE.ESTATE.ACCOUNTUSER" },
      },
      {
        path: "account-user/edit/:id",
        component: EstateAccountExpertEditMobileComponent,
        data: { title: "ROUTE.ESTATE.ACCOUNTUSER" },
      },
      /**/
      {
        path: "account-agency-ads",
        component: EstateAccountAgencyAdsListMobileComponent,
        data: { title: "ROUTE.ESTATE.ACCOUNTAGENCYADS" },
      },
      {
        path: "account-agency-ads/add",
        component: EstateAccountAgencyAdsAddMobileComponent,
        data: { title: "ROUTE.ESTATE.ACCOUNTAGENCYADS" },
      },
      {
        path: "account-agency-ads/add/:id",
        component: EstateAccountAgencyAdsAddMobileComponent,
        data: { title: "ROUTE.ESTATE.ACCOUNTAGENCYADS" },
      },
      {
        path: "account-agency-ads/edit/:id",
        component: EstateAccountAgencyAdsEditMobileComponent,
        data: { title: "ROUTE.ESTATE.ACCOUNTAGENCYADS" },
      },
      /**/
      {
        path: "contract-type",
        component: EstateContractTypeListMobileComponent,
        data: { title: "ROUTE.ESTATE.CONTRACTTYPE" },
      },
      {
        path: "contract-type/add",
        component: EstateContractTypeAddMobileComponent,
        data: { title: "ROUTE.ESTATE.CONTRACTTYPE" },
      },
      {
        path: "contract-type/add/:id",
        component: EstateContractTypeAddMobileComponent,
        data: { title: "ROUTE.ESTATE.CONTRACTTYPE" },
      },
      {
        path: "contract-type/edit/:id",
        component: EstateContractTypeEditMobileComponent,
        data: { title: "ROUTE.ESTATE.CONTRACTTYPE" },
      },
      /**/
      {
        path: "category-zone",
        component: EstateCategoryZoneListMobileComponent,
        data: { title: "ROUTE.ESTATE.CATEGORY.ZONE" },
      },
      {
        path: "category-zone/add",
        component: EstateCategoryZoneAddMobileComponent,
        data: { title: "ROUTE.ESTATE.CATEGORY.ZONE" },
      },
      {
        path: "category-zone/add/:id",
        component: EstateCategoryZoneAddMobileComponent,
        data: { title: "ROUTE.ESTATE.CATEGORY.ZONE" },
      },
      {
        path: "category-zone/edit/:id",
        component: EstateCategoryZoneEditMobileComponent,
        data: { title: "ROUTE.ESTATE.CATEGORY.ZONE" },
      },
      {
        path: "category-rack",
        component: EstateCategoryRackListMobileComponent,
        data: { title: "ROUTE.ESTATE.CATEGORY.RACK" },
      },
      {
        path: "category-rack/add",
        component: EstateCategoryRackAddMobileComponent,
        data: { title: "ROUTE.ESTATE.CATEGORY.RACK" },
      },
      {
        path: "category-rack/add/:id",
        component: EstateCategoryRackAddMobileComponent,
        data: { title: "ROUTE.ESTATE.CATEGORY.RACK" },
      },
      {
        path: "category-rack/edit/:id",
        component: EstateCategoryRackEditMobileComponent,
        data: { title: "ROUTE.ESTATE.CATEGORY.RACK" },
      },
      /**/
      {
        path: "property-detail-group",
        component: EstatePropertyDetailGroupListMobileComponent,
        data: { title: "ROUTE.ESTATE.DETAIL.GROUP" },
      },
      {
        path: "property-detail-group/add",
        component: EstatePropertyDetailGroupAddMobileComponent,
        data: { title: "ROUTE.ESTATE.DETAIL.GROUP" },
      },
      {
        path: "property-detail-group/add/:id",
        component: EstatePropertyDetailGroupAddMobileComponent,
        data: { title: "ROUTE.ESTATE.DETAIL.GROUP" },
      },
      {
        path: "property-detail-group/edit/:id",
        component: EstatePropertyDetailGroupEditMobileComponent,
        data: { title: "ROUTE.ESTATE.DETAIL.GROUP" },
      },
      /**/
      {
        path: "property-detail",
        component: EstatePropertyDetailListMobileComponent,
        data: { title: "ROUTE.ESTATE.PROPERTYDETAIL" },
      },
      {
        path: "property-detail/LinkPropertyTypeLanduseId/:LinkPropertyTypeLanduseId",
        component: EstatePropertyDetailListMobileComponent,
        data: { title: "ROUTE.ESTATE.PROPERTYDETAIL" },
      },
      {
        path: "property-detail/add",
        component: EstatePropertyDetailAddMobileComponent,
        data: { title: "ROUTE.ESTATE.PROPERTYDETAIL" },
      },
      {
        path: "property-detail/add/:id",
        component: EstatePropertyDetailAddMobileComponent,
        data: { title: "ROUTE.ESTATE.PROPERTYDETAIL" },
      },
      {
        path: "property-detail/edit/:id",
        component: EstatePropertyDetailEditMobileComponent,
        data: { title: "ROUTE.ESTATE.PROPERTYDETAIL" },
      },
      /** */
    ],
  },
];
