import { Routes } from "@angular/router";
import { ApplicationComponent } from "./application.component";
import { ApplicationAppAddComponent } from "./content/add/add.component";
import { ApplicationAppEditComponent } from "./content/edit/edit.component";
import { ApplicationAppListMobileComponent } from "./content/list/list.mobile.component";
import { ApplicationIntroAddComponent } from "./intro/add/add.component";
import { ApplicationIntroEditComponent } from "./intro/edit/edit.component";
import { ApplicationIntroListMobileComponent } from "./intro/list/list.mobile.component";
import { ApplicationMemberInfoListMobileComponent } from "./memberInfo/list/list.mobile.component";
import { ApplicationLogNotificationListMobileComponent } from "./notification/list/list.mobile.component";
import { ApplicationSourceAddComponent } from "./source/add/add.component";
import { ApplicationSourceEditComponent } from "./source/edit/edit.component";
import { ApplicationSourceListMobileComponent } from "./source/list/list.mobile.component";
import { ApplicationThemeConfigListMobileComponent } from "./themeConfig/list/list.mobile.component";

export const routesMobile: Routes = [
  {
    path: "",
    component: ApplicationComponent,
    data: { title: "ROUTE.APPLICATION" },
    children: [
      {
        path: "source",
        component: ApplicationSourceListMobileComponent,
        data: { title: "ROUTE.APPLICATION.SOURCE" },
      },
      {
        path: "source/add",
        component: ApplicationSourceAddComponent,
        data: { title: "ROUTE.APPLICATION.SOURCE" },
      },
      {
        path: "source/edit/:id",
        component: ApplicationSourceEditComponent,
        data: { title: "ROUTE.APPLICATION.SOURCE" },
      },
      {
        path: "app",
        component: ApplicationAppListMobileComponent,
        data: { title: "ROUTE.APPLICATION.APP" },
      },
      {
        path: "app/LinkSourceId/:LinkSourceId",
        component: ApplicationAppListMobileComponent,
        data: { title: "ROUTE.APPLICATION.APP" },
      },
      {
        path: "app/LinkThemeConfigId/:LinkThemeConfigId",
        component: ApplicationAppListMobileComponent,
        data: { title: "ROUTE.APPLICATION.APP" },
      },
      {
        path: "app/add",
        component: ApplicationAppAddComponent,
        data: { title: "ROUTE.APPLICATION.APP" },
      },
      {
        path: "app/add/:SourceId",
        component: ApplicationAppAddComponent,
        data: { title: "ROUTE.APPLICATION.APP" },
      },
      {
        path: "app/edit/:id",
        component: ApplicationAppEditComponent,
        data: { title: "ROUTE.APPLICATION.APP" },
      },
      {
        path: "intro",
        component: ApplicationIntroListMobileComponent,
        data: { title: "ROUTE.APPLICATION.INTRO" },
      },
      {
        path: "intro/LinkApplicationId/:LinkApplicationId",
        component: ApplicationIntroListMobileComponent,
        data: { title: "ROUTE.APPLICATION.INTRO" },
      },
      {
        path: "intro/add/:LinkApplicationId",
        component: ApplicationIntroAddComponent,
        data: { title: "ROUTE.APPLICATION.INTRO" },
      },
      {
        path: "intro/edit/:id",
        component: ApplicationIntroEditComponent,
        data: { title: "ROUTE.APPLICATION.INTRO" },
      },
      {
        path: "memberinfo",
        component: ApplicationMemberInfoListMobileComponent,
        data: { title: "ROUTE.APPLICATION.MEMBERINFO" },
      },
      {
        path: "memberinfo/LinkMemberId/:LinkMemberId",
        component: ApplicationMemberInfoListMobileComponent,
        data: { title: "ROUTE.APPLICATION.MEMBERINFO" },
      },
      {
        path: "memberinfo/LinkUserId/:LinkUserId",
        component: ApplicationMemberInfoListMobileComponent,
        data: { title: "ROUTE.APPLICATION.MEMBERINFO" },
      },
      {
        path: "memberinfo/LinkApplicationId/:LinkApplicationId",
        component: ApplicationMemberInfoListMobileComponent,
        data: { title: "ROUTE.APPLICATION.MEMBERINFO" },
      },
      {
        path: "notification",
        component: ApplicationLogNotificationListMobileComponent,
        data: { title: "ROUTE.APPLICATION.NOTIFICATION" },
      },
      {
        path: "notification/LinkApplicationId/:LinkApplicationId",
        component: ApplicationLogNotificationListMobileComponent,
        data: { title: "ROUTE.APPLICATION.NOTIFICATION" },
      },
      {
        path: "notification/LinkApplicationMemberId/:LinkApplicationMemberId",
        component: ApplicationLogNotificationListMobileComponent,
        data: { title: "ROUTE.APPLICATION.NOTIFICATION" },
      },
      {
        path: "themeconfig",
        component: ApplicationThemeConfigListMobileComponent,
        data: { title: "ROUTE.APPLICATION.THEMECONFIG" },
      },
      {
        path: "themeconfig/LinkSourceId/:LinkSourceId",
        component: ApplicationThemeConfigListMobileComponent,
        data: { title: "ROUTE.APPLICATION.THEMECONFIG" },
      },
      {
        path: "config",
        loadChildren: () =>
          import("./config/application-config.module").then(
            (m) => m.ApplicationConfigModule,
          ),
        data: { title: "ROUTE.APPLICATION" },
      },
    ],
  },
];
