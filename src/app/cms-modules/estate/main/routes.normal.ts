import { Routes } from "@angular/router";
import { EstateBillboardAddComponent } from "../billboard/add/add.component";
import { EstateBillboardEditComponent } from "../billboard/edit/edit.component";
import { EstateBillboardListComponent } from "../billboard/list/list.component";
import { EstateCategoryRackListComponent } from "../category-rack/list/list.component";
import { EstateCategoryZoneListComponent } from "../category-zone/list/list.component";
import { EstateContractTypeListComponent } from "../contract-type/list/list.component";
import { EstateDashboardComponent } from "../dashboard/dashboard.component";
import { EstatePropertyAdsListComponent } from "../property-ads/list/list.component";
import { EstatePropertyAdsSaleListComponent } from "../property-ads/sale-list/sale-list.component";
import { EstatePropertyCompanyAddComponent } from "../property-company/add/add.component";
import { EstatePropertyCompanyEditComponent } from "../property-company/edit/edit.component";
import { EstatePropertyCompanyListComponent } from "../property-company/list/list.component";
import { EstatePropertyDetailGroupListComponent } from "../property-detail-group/list/list.component";
import { EstatePropertyDetailListComponent } from "../property-detail/list/list.component";
import { EstatePropertyProjectAddComponent } from "../property-project/add/add.component";
import { EstatePropertyProjectEditComponent } from "../property-project/edit/edit.component";
import { EstatePropertyProjectListComponent } from "../property-project/list/list.component";
import { EstatePropertySupplierAddComponent } from "../property-supplier/add/add.component";
import { EstatePropertySupplierEditComponent } from "../property-supplier/edit/edit.component";
import { EstatePropertySupplierListComponent } from "../property-supplier/list/list.component";
import { EstatePropertyTypeLanduseListComponent } from "../property-type-landuse/list/list.component";
import { EstatePropertyTypeUsageListComponent } from "../property-type-usage/list/list.component";
import { EstatePropertyAddComponent } from "../property/add/add.component";
import { EstatePropertyEditComponent } from "../property/edit/edit.component";
import { EstatePropertyListComponent } from "../property/list/list.component";
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

      {
        path: "property",
        component: EstatePropertyListComponent,
        data: { title: "ROUTE.ESTATE.PROPERTY" },
      },
      {
        path: "property/Action/:Action",
        component: EstatePropertyListComponent,
        data: { title: "ROUTE.ESTATE.PROPERTY" },
      },
      {
        path: "property/LinkPropertyTypeLanduseId/:LinkPropertyTypeLanduseId",
        component: EstatePropertyListComponent,
        data: { title: "ROUTE.ESTATE.PROPERTY" },
      },
      {
        path: "property/LinkPropertyTypeUsageId/:LinkPropertyTypeUsageId",
        component: EstatePropertyListComponent,
        data: { title: "ROUTE.ESTATE.PROPERTY" },
      },
      {
        path: "property/LinkContractTypeId/:LinkContractTypeId",
        component: EstatePropertyListComponent,
        data: { title: "ROUTE.ESTATE.PROPERTY" },
      },
      {
        path: "property/LinkBillboardId/:LinkBillboardId",
        component: EstatePropertyListComponent,
        data: { title: "ROUTE.ESTATE.PROPERTY" },
      },
      {
        path: "property/LinkCustomerOrderId/:LinkCustomerOrderId",
        component: EstatePropertyListComponent,
        data: { title: "ROUTE.ESTATE.PROPERTY" },
      },
      {
        path: "property/LinkUserId/:LinkUserId",
        component: EstatePropertyListComponent,
        data: { title: "ROUTE.ESTATE.PROPERTY" },
      },
      {
        path: "property/LinkProjectId/:LinkProjectId",
        component: EstatePropertyListComponent,
        data: { title: "ROUTE.ESTATE.PROPERTY" },
      },
      {
        path: "property/LinkCompanyId/:LinkCompanyId",
        component: EstatePropertyListComponent,
        data: { title: "ROUTE.ESTATE.PROPERTY" },
      },
      {
        path: "property/LinkEstateExpertId/:LinkEstateExpertId",
        component: EstatePropertyListComponent,
        data: { title: "ROUTE.ESTATE.PROPERTY" },
      },
      {
        path: "property/LinkEstateAgencyId/:LinkEstateAgencyId",
        component: EstatePropertyListComponent,
        data: { title: "ROUTE.ESTATE.PROPERTY" },
      },
      {
        path: "property/InChecking/:InChecking",
        component: EstatePropertyListComponent,
        data: { title: "ROUTE.ESTATE.PROPERTY" },
      },
      {
        path: "property/recordstatus/:RecordStatus",
        component: EstatePropertyListComponent,
        data: { title: "ROUTE.ESTATE.PROPERTY" },
      },
      {
        path: "property/add",
        component: EstatePropertyAddComponent,
        data: { title: "ROUTE.ESTATE.PROPERTYADD" },
      },
      {
        path: "property/add/LinkPropertyTypeLanduseId/:LinkPropertyTypeLanduseId",
        component: EstatePropertyAddComponent,
        data: { title: "ROUTE.ESTATE.PROPERTYADD" },
      },
      {
        path: "property/edit/:id",
        component: EstatePropertyEditComponent,
        data: { title: "ROUTE.ESTATE.PROPERTYEDIT" },
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
        path: "property-ads/LinkPropertyId/:LinkPropertyId",
        component: EstatePropertyAdsListComponent,
        data: { title: "ROUTE.ESTATE.PROPERTYADS" },
      },
      {
        path: "property-ads",
        component: EstatePropertyAdsListComponent,
        data: { title: "ROUTE.ESTATE.PROPERTYADS" },
      },
      {
        path: "property-ads/sale/:LinkPropertyId",
        component: EstatePropertyAdsSaleListComponent,
        data: { title: "ROUTE.ESTATE.PROPERTYADS" },
      },
      /**/
      {
        path: "activity-type",
        component: EstateActivityTypeListComponent,
        data: { title: "ROUTE.ESTATE.ACTIVITYTYPE" },
      },
      /**/
      /**/
      {
        path: "property-company",
        component: EstatePropertyCompanyListComponent,
        data: { title: "ROUTE.ESTATE.COMPANY" },
      },
      {
        path: "property-company/LinkProjectId/:LinkProjectId",
        component: EstatePropertyCompanyListComponent,
        data: { title: "ROUTE.ESTATE.COMPANY" },
      },
      {
        path: "property-company/add",
        component: EstatePropertyCompanyAddComponent,
        data: { title: "ROUTE.ESTATE.COMPANY" },
      },
      {
        path: "property-company/edit/:id",
        component: EstatePropertyCompanyEditComponent,
        data: { title: "ROUTE.ESTATE.COMPANY" },
      },
      /**/
      /**/
      {
        path: "property-supplier",
        component: EstatePropertySupplierListComponent,
        data: { title: "ROUTE.ESTATE.SUPPLIER" },
      },
      {
        path: "property-supplier/LinkProjectId/:LinkProjectId",
        component: EstatePropertySupplierListComponent,
        data: { title: "ROUTE.ESTATE.SUPPLIER" },
      },
      {
        path: "property-supplier/add",
        component: EstatePropertySupplierAddComponent,
        data: { title: "ROUTE.ESTATE.SUPPLIER" },
      },
      {
        path: "property-supplier/edit/:id",
        component: EstatePropertySupplierEditComponent,
        data: { title: "ROUTE.ESTATE.SUPPLIER" },
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
        path: "property-project",
        component: EstatePropertyProjectListComponent,
        data: { title: "ROUTE.ESTATE.PROJECT" },
      },
      {
        path: "property-project/add",
        component: EstatePropertyProjectAddComponent,
        data: { title: "ROUTE.ESTATE.PROJECT" },
      },
      {
        path: "property-project/edit/:id",
        component: EstatePropertyProjectEditComponent,
        data: { title: "ROUTE.ESTATE.PROJECT" },
      },
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
