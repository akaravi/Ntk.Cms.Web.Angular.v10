import { Routes } from "@angular/router";
import { MemberComponent } from "./member.component";
import { MemberGroupListComponent } from "./group/list/list.component";
import { MemberPropertyAliasListComponent } from "./property-alias/list/list.component";
import { MemberPropertyDetailGroupListComponent } from "./property-detail-group/list/list.component";
import { MemberPropertyDetailListComponent } from "./property-detail/list/list.component";

export const routesNormal: Routes = [
  {
    path: "",
    component: MemberComponent,
    data: { title: "ROUTE.MEMBER" },
    children: [
      {
        path: "group",
        component: MemberGroupListComponent,
        data: { title: "ROUTE.MEMBER.GROUP" },
      },
      {
        path: "property-alias",
        component: MemberPropertyAliasListComponent,
        data: { title: "ROUTE.MEMBER.PROPERTYALIAS" },
      },
      {
        path: "property-detail-group",
        component: MemberPropertyDetailGroupListComponent,
        data: { title: "ROUTE.MEMBER.PROPERTYDETAILGROUP" },
      },
      {
        path: "property-detail",
        component: MemberPropertyDetailListComponent,
        data: { title: "ROUTE.MEMBER.PROPERTYDETAIL" },
      },
      {
        path: "property-detail/LinkPropertyId/:LinkPropertyId",
        component: MemberPropertyDetailListComponent,
        data: { title: "ROUTE.MEMBER.PROPERTYDETAIL" },
      },
    ],
  },
];
