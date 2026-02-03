import { Routes } from "@angular/router";
import { WebDesignerComponent } from "./web-designer.component";
import { WebDesignerMainIntroListMobileComponent } from "./intro/list/list.mobile.component";
import { WebDesignerLogMemberInfoListMobileComponent } from "./log-member-info/list/list.mobile.component";
import { WebDesignerMainMenuListMobileComponent } from "./menu/list/list.mobile.component";
import { WebDesignerMainPageDependencyListMobileComponent } from "./page-dependency/list/list.mobile.component";
import { WebDesignerMainPageTemplateListMobileComponent } from "./page-template/list/list.mobile.component";
import { WebDesignerMainPageListMobileComponent } from "./page/list/list.mobile.component";
import { WebDesignerMainIntroAddComponent } from "./intro/add/add.component";
import { WebDesignerMainIntroEditComponent } from "./intro/edit/edit.component";
import { WebDesignerMainPageListGridComponent } from "./page/list-grid/list-grid.component";

export const routesMobile: Routes = [
  {
    path: "",
    component: WebDesignerComponent,
    data: { title: "ROUTE.WEBDESIGNER" },
    children: [
      /* Config */
      {
        path: "config",
        loadChildren: () =>
          import("./config/web-designer-config.module").then(
            (m) => m.WebDesignerConfigModule,
          ),
        data: { title: "ROUTE.WEBDESIGNER" },
      },
      /* Config */
      /** */
      {
        path: "intro",
        component: WebDesignerMainIntroListMobileComponent,
        data: { title: "ROUTE.WEBDESIGNER.INTRO" },
      },
      {
        path: "intro/LinkPageId/:LinkPageId",
        component: WebDesignerMainIntroListMobileComponent,
        data: { title: "ROUTE.WEBDESIGNER.INTRO" },
      },
      {
        path: "intro/add",
        component: WebDesignerMainIntroAddComponent,
        data: { title: "ROUTE.WEBDESIGNER.INTRO" },
      },
      {
        path: "intro/add/:LinkPageId",
        component: WebDesignerMainIntroAddComponent,
        data: { title: "ROUTE.WEBDESIGNER.INTRO" },
      },
      {
        path: "intro/edit/:id",
        component: WebDesignerMainIntroEditComponent,
        data: { title: "ROUTE.WEBDESIGNER.INTRO" },
      },
      /** */
      /** */
      {
        path: "menu",
        component: WebDesignerMainMenuListMobileComponent,
        data: { title: "ROUTE.WEBDESIGNER.MENU" },
      },
      /** */
      {
        path: "logmemberinfo",
        component: WebDesignerLogMemberInfoListMobileComponent,
        data: { title: "ROUTE.WEBDESIGNER.LOGMEMBERINFO" },
      },
      /** */
      {
        path: "pagetemplate",
        component: WebDesignerMainPageTemplateListMobileComponent,
        data: { title: "ROUTE.WEBDESIGNER.PAGETEMPLATE" },
      },
      /** */
      /** */
      {
        path: "pagedependency",
        component: WebDesignerMainPageDependencyListMobileComponent,
        data: { title: "ROUTE.WEBDESIGNER.PAGEDEPENDENCY" },
      },
      /** */
      {
        path: "page",
        component: WebDesignerMainPageListMobileComponent,
        data: { title: "ROUTE.WEBDESIGNER.PAGE" },
      },
      {
        path: "page/LinkPageTemplateGuId/:LinkPageTemplateGuId",
        component: WebDesignerMainPageListMobileComponent,
        data: { title: "ROUTE.WEBDESIGNER.PAGE" },
      },
      {
        path: "page/LinkPageParentGuId/:LinkPageParentGuId",
        component: WebDesignerMainPageListMobileComponent,
        data: { title: "ROUTE.WEBDESIGNER.PAGE" },
      },
      {
        path: "page/LinkPageDependencyGuId/:LinkPageDependencyGuId",
        component: WebDesignerMainPageListMobileComponent,
        data: { title: "ROUTE.WEBDESIGNER.PAGE" },
      },
      /** */
      {
        path: "page/list-grid",
        component: WebDesignerMainPageListGridComponent,
        data: { title: "ROUTE.WEBDESIGNER.PAGE" },
      },
      {
        path: "page/list-grid/LinkPageTemplateGuId/:LinkPageTemplateGuId",
        component: WebDesignerMainPageListGridComponent,
        data: { title: "ROUTE.WEBDESIGNER.PAGE" },
      },
      {
        path: "page/list-grid/LinkPageParentGuId/:LinkPageParentGuId",
        component: WebDesignerMainPageListGridComponent,
        data: { title: "ROUTE.WEBDESIGNER.PAGE" },
      },
      {
        path: "page/list-grid/LinkPageDependencyGuId/:LinkPageDependencyGuId",
        component: WebDesignerMainPageListGridComponent,
        data: { title: "ROUTE.WEBDESIGNER.PAGE" },
      },
      /** */
    ],
  },
];
