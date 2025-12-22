import { Routes } from "@angular/router";
import { EstateDataComponent } from "./estate-data.component";
import { EstatePropertyAdsListComponent } from "./property-ads/list/list.component";
import { EstatePropertyAdsSaleListComponent } from "./property-ads/sale-list/sale-list.component";
import { EstatePropertyCompanyAddComponent } from "./property-company/add/add.component";
import { EstatePropertyCompanyEditComponent } from "./property-company/edit/edit.component";
import { EstatePropertyCompanyListComponent } from "./property-company/list/list.component";
import { EstateBillboardAddComponent } from "./billboard/add/add.component";
import { EstateBillboardEditComponent } from "./billboard/edit/edit.component";
import { EstateBillboardListComponent } from "./billboard/list/list.component";
import { EstatePropertyProjectAddComponent } from "./property-project/add/add.component";
import { EstatePropertyProjectEditComponent } from "./property-project/edit/edit.component";
import { EstatePropertyProjectListComponent } from "./property-project/list/list.component";
import { EstatePropertySupplierAddComponent } from "./property-supplier/add/add.component";
import { EstatePropertySupplierEditComponent } from "./property-supplier/edit/edit.component";
import { EstatePropertySupplierListComponent } from "./property-supplier/list/list.component";
import { EstatePropertyAddMobileComponent } from "./property/add/add.mobile.component";
import { EstatePropertyEditComponent } from "./property/edit/edit.component";
import { EstatePropertyListComponent } from "./property/list/list.component";

export const routesMobile: Routes = [
  {
    path: "",
    component: EstateDataComponent,
    data: { title: "ROUTE.ESTATE.DATA" },
    children: [
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
    ],
  },
];
