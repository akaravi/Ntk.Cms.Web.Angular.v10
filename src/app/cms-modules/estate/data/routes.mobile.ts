import { Routes } from "@angular/router";
import { EstateDataComponent } from "./estate-data.component";
import { EstatePropertyAdsAddMobileComponent } from "./property-ads/add/add.mobile.component";
import { EstatePropertyAdsEditMobileComponent } from "./property-ads/edit/edit.mobile.component";
import { EstatePropertyAdsListMobileComponent } from "./property-ads/list/list.mobile.component";
import { EstatePropertyAdsSaleListComponent } from "./property-ads/sale-list/sale-list.component";
import { EstatePropertyCompanyAddComponent } from "./property-company/add/add.component";
import { EstatePropertyCompanyAddMobileComponent } from "./property-company/add/add.mobile.component";
import { EstatePropertyCompanyEditComponent } from "./property-company/edit/edit.component";
import { EstatePropertyCompanyEditMobileComponent } from "./property-company/edit/edit.mobile.component";
import { EstatePropertyCompanyListMobileComponent } from "./property-company/list/list.mobile.component";
import { EstateBillboardAddComponent } from "./billboard/add/add.component";
import { EstateBillboardAddMobileComponent } from "./billboard/add/add.mobile.component";
import { EstateBillboardEditComponent } from "./billboard/edit/edit.component";
import { EstateBillboardEditMobileComponent } from "./billboard/edit/edit.mobile.component";
import { EstateBillboardListMobileComponent } from "./billboard/list/list.mobile.component";
import { EstatePropertyProjectAddComponent } from "./property-project/add/add.component";
import { EstatePropertyProjectAddMobileComponent } from "./property-project/add/add.mobile.component";
import { EstatePropertyProjectEditComponent } from "./property-project/edit/edit.component";
import { EstatePropertyProjectEditMobileComponent } from "./property-project/edit/edit.mobile.component";
import { EstatePropertyProjectListMobileComponent } from "./property-project/list/list.mobile.component";
import { EstatePropertySupplierAddComponent } from "./property-supplier/add/add.component";
import { EstatePropertySupplierAddMobileComponent } from "./property-supplier/add/add.mobile.component";
import { EstatePropertySupplierEditComponent } from "./property-supplier/edit/edit.component";
import { EstatePropertySupplierEditMobileComponent } from "./property-supplier/edit/edit.mobile.component";
import { EstatePropertySupplierListMobileComponent } from "./property-supplier/list/list.mobile.component";
import { EstatePropertyAddMobileComponent } from "./property/add/add.mobile.component";
import { EstatePropertyEditComponent } from "./property/edit/edit.component";
import { EstatePropertyListMobileComponent } from "./property/list/list.mobile.component";

export const routesMobile: Routes = [
  {
    path: "",
    component: EstateDataComponent,
    data: { title: "ROUTE.ESTATE.DATA" },
    children: [
      {
        path: "property",
        component: EstatePropertyListMobileComponent,
        data: { title: "ROUTE.ESTATE.PROPERTY" },
      },
      {
        path: "property/Action/:Action",
        component: EstatePropertyListMobileComponent,
        data: { title: "ROUTE.ESTATE.PROPERTY" },
      },
      {
        path: "property/LinkPropertyTypeLanduseId/:LinkPropertyTypeLanduseId",
        component: EstatePropertyListMobileComponent,
        data: { title: "ROUTE.ESTATE.PROPERTY" },
      },
      {
        path: "property/LinkPropertyTypeUsageId/:LinkPropertyTypeUsageId",
        component: EstatePropertyListMobileComponent,
        data: { title: "ROUTE.ESTATE.PROPERTY" },
      },
      {
        path: "property/LinkContractTypeId/:LinkContractTypeId",
        component: EstatePropertyListMobileComponent,
        data: { title: "ROUTE.ESTATE.PROPERTY" },
      },
      {
        path: "property/LinkBillboardId/:LinkBillboardId",
        component: EstatePropertyListMobileComponent,
        data: { title: "ROUTE.ESTATE.PROPERTY" },
      },
      {
        path: "property/LinkCustomerOrderId/:LinkCustomerOrderId",
        component: EstatePropertyListMobileComponent,
        data: { title: "ROUTE.ESTATE.PROPERTY" },
      },
      {
        path: "property/LinkUserId/:LinkUserId",
        component: EstatePropertyListMobileComponent,
        data: { title: "ROUTE.ESTATE.PROPERTY" },
      },
      {
        path: "property/LinkProjectId/:LinkProjectId",
        component: EstatePropertyListMobileComponent,
        data: { title: "ROUTE.ESTATE.PROPERTY" },
      },
      {
        path: "property/LinkCompanyId/:LinkCompanyId",
        component: EstatePropertyListMobileComponent,
        data: { title: "ROUTE.ESTATE.PROPERTY" },
      },
      {
        path: "property/LinkEstateExpertId/:LinkEstateExpertId",
        component: EstatePropertyListMobileComponent,
        data: { title: "ROUTE.ESTATE.PROPERTY" },
      },
      {
        path: "property/LinkEstateAgencyId/:LinkEstateAgencyId",
        component: EstatePropertyListMobileComponent,
        data: { title: "ROUTE.ESTATE.PROPERTY" },
      },
      {
        path: "property/InChecking/:InChecking",
        component: EstatePropertyListMobileComponent,
        data: { title: "ROUTE.ESTATE.PROPERTY" },
      },
      {
        path: "property/recordstatus/:RecordStatus",
        component: EstatePropertyListMobileComponent,
        data: { title: "ROUTE.ESTATE.PROPERTY" },
      },
      {
        path: "property/add",
        component: EstatePropertyAddMobileComponent,
        data: { title: "ROUTE.ESTATE.PROPERTYADD" },
      },
      {
        path: "property/add/LinkPropertyTypeLanduseId/:LinkPropertyTypeLanduseId",
        component: EstatePropertyAddMobileComponent,
        data: { title: "ROUTE.ESTATE.PROPERTYADD" },
      },
      {
        path: "property/edit/:id",
        component: EstatePropertyEditComponent,
        data: { title: "ROUTE.ESTATE.PROPERTYEDIT" },
      },
      {
        path: "property-ads/LinkPropertyId/:LinkPropertyId",
        component: EstatePropertyAdsListMobileComponent,
        data: { title: "ROUTE.ESTATE.PROPERTYADS" },
      },
      {
        path: "property-ads",
        component: EstatePropertyAdsListMobileComponent,
        data: { title: "ROUTE.ESTATE.PROPERTYADS" },
      },
      {
        path: "property-ads/add",
        component: EstatePropertyAdsAddMobileComponent,
        data: { title: "ROUTE.ESTATE.PROPERTYADS" },
      },
      {
        path: "property-ads/add/LinkPropertyId/:LinkPropertyId",
        component: EstatePropertyAdsAddMobileComponent,
        data: { title: "ROUTE.ESTATE.PROPERTYADS" },
      },
      {
        path: "property-ads/edit/:id",
        component: EstatePropertyAdsEditMobileComponent,
        data: { title: "ROUTE.ESTATE.PROPERTYADS" },
      },
      {
        path: "property-ads/sale/:LinkPropertyId",
        component: EstatePropertyAdsSaleListComponent,
        data: { title: "ROUTE.ESTATE.PROPERTYADS" },
      },
      {
        path: "billboard",
        component: EstateBillboardListMobileComponent,
        data: { title: "ROUTE.ESTATE.BILLBOARD" },
      },
      {
        path: "billboard/add",
        component: EstateBillboardAddMobileComponent,
        data: { title: "ROUTE.ESTATE.BILLBOARD" },
      },
      {
        path: "billboard/add-copy/:id",
        component: EstateBillboardAddMobileComponent,
        data: { title: "ROUTE.ESTATE.BILLBOARD" },
      },
      {
        path: "billboard/edit/:id",
        component: EstateBillboardEditMobileComponent,
        data: { title: "ROUTE.ESTATE.BILLBOARD" },
      },
      {
        path: "property-company",
        component: EstatePropertyCompanyListMobileComponent,
        data: { title: "ROUTE.ESTATE.COMPANY" },
      },
      {
        path: "property-company/LinkProjectId/:LinkProjectId",
        component: EstatePropertyCompanyListMobileComponent,
        data: { title: "ROUTE.ESTATE.COMPANY" },
      },
      {
        path: "property-company/add",
        component: EstatePropertyCompanyAddMobileComponent,
        data: { title: "ROUTE.ESTATE.COMPANY" },
      },
      {
        path: "property-company/edit/:id",
        component: EstatePropertyCompanyEditMobileComponent,
        data: { title: "ROUTE.ESTATE.COMPANY" },
      },
      {
        path: "property-supplier",
        component: EstatePropertySupplierListMobileComponent,
        data: { title: "ROUTE.ESTATE.SUPPLIER" },
      },
      {
        path: "property-supplier/LinkProjectId/:LinkProjectId",
        component: EstatePropertySupplierListMobileComponent,
        data: { title: "ROUTE.ESTATE.SUPPLIER" },
      },
      {
        path: "property-supplier/add",
        component: EstatePropertySupplierAddMobileComponent,
        data: { title: "ROUTE.ESTATE.SUPPLIER" },
      },
      {
        path: "property-supplier/edit/:id",
        component: EstatePropertySupplierEditMobileComponent,
        data: { title: "ROUTE.ESTATE.SUPPLIER" },
      },
      {
        path: "property-project",
        component: EstatePropertyProjectListMobileComponent,
        data: { title: "ROUTE.ESTATE.PROJECT" },
      },
      {
        path: "property-project/add",
        component: EstatePropertyProjectAddMobileComponent,
        data: { title: "ROUTE.ESTATE.PROJECT" },
      },
      {
        path: "property-project/edit/:id",
        component: EstatePropertyProjectEditMobileComponent,
        data: { title: "ROUTE.ESTATE.PROJECT" },
      },
    ],
  },
];
