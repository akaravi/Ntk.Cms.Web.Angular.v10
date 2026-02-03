import { Routes } from "@angular/router";
import { MemberComponent } from "./member.component";
import { MemberGroupListMobileComponent } from "./group/list/list.mobile.component";
import { MemberPropertyAliasListMobileComponent } from "./property-alias/list/list.mobile.component";
import { MemberPropertyDetailGroupListMobileComponent } from "./property-detail-group/list/list.mobile.component";
import { MemberPropertyDetailListMobileComponent } from "./property-detail/list/list.mobile.component";

export const routesMobile: Routes = [
  {
    path: "",
    component: MemberComponent,
    data: { title: "ROUTE.MEMBER" },
    children: [
      {
        path: "group",
        component: MemberGroupListMobileComponent,
        data: { title: "ROUTE.MEMBER.GROUP" },
      },
      {
        path: "property-alias",
        component: MemberPropertyAliasListMobileComponent,
        data: { title: "ROUTE.MEMBER.PROPERTYALIAS" },
      },
      {
        path: "property-detail-group",
        component: MemberPropertyDetailGroupListMobileComponent,
        data: { title: "ROUTE.MEMBER.PROPERTYDETAILGROUP" },
      },
      {
        path: "property-detail",
        component: MemberPropertyDetailListMobileComponent,
        data: { title: "ROUTE.MEMBER.PROPERTYDETAIL" },
      },
      {
        path: "property-detail/LinkPropertyId/:LinkPropertyId",
        component: MemberPropertyDetailListMobileComponent,
        data: { title: "ROUTE.MEMBER.PROPERTYDETAIL" },
      },
    ],
  },
];
