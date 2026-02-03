import { Routes } from "@angular/router";
import { ApiTelegramComponent } from "./api-telegram.component";
import { ApiTelegramBotConfigListMobileComponent } from "./bot-config/list/list.mobile.component";
import { ApiTelegramLogInputListMobileComponent } from "./log-input/list/list.mobile.component";
import { ApiTelegramLogOutputListMobileComponent } from "./log-output/list/list.mobile.component";
import { ApiTelegramMemberInfoListMobileComponent } from "./member-info/list/list.mobile.component";
import { ApiTelegramReceivedFileListMobileComponent } from "./received-file/list/list.mobile.component";
import { ApiTelegramUploadedFileListMobileComponent } from "./uploaded-file/list/list.mobile.component";

export const routesMobile: Routes = [
  {
    path: "",
    component: ApiTelegramComponent,
    data: { title: "ROUTE.APITELEGRAM" },
    children: [
      /*Config*/
      {
        path: "config",
        loadChildren: () =>
          import("./config/api-telegram-config.module").then(
            (m) => m.ApiTelegramConfigModule,
          ),
        data: { title: "ROUTE.APITELEGRAM" },
      },
      /*Config*/
      {
        path: "bot-config",
        component: ApiTelegramBotConfigListMobileComponent,
        data: { title: "ROUTE.APITELEGRAM.BOTCONFIG" },
      },
      {
        path: "log-input",
        component: ApiTelegramLogInputListMobileComponent,
        data: { title: "ROUTE.APITELEGRAM.LOGINPUT" },
      },
      {
        path: "log-input/LinkBotConfigId/:LinkBotConfigId",
        component: ApiTelegramLogInputListMobileComponent,
        data: { title: "ROUTE.APITELEGRAM.LOGINPUT" },
      },
      {
        path: "log-output",
        component: ApiTelegramLogOutputListMobileComponent,
        data: { title: "ROUTE.APITELEGRAM.LOGOUTPUT" },
      },
      {
        path: "log-output/LinkBotConfigId/:LinkBotConfigId",
        component: ApiTelegramLogOutputListMobileComponent,
        data: { title: "ROUTE.APITELEGRAM.LOGOUTPUT" },
      },
      {
        path: "member-info",
        component: ApiTelegramMemberInfoListMobileComponent,
        data: { title: "ROUTE.APITELEGRAM.MEMBERINFO" },
      },
      {
        path: "received-file",
        component: ApiTelegramReceivedFileListMobileComponent,
        data: { title: "ROUTE.APITELEGRAM.RECEIVEDFILE" },
      },
      {
        path: "uploaded-file",
        component: ApiTelegramUploadedFileListMobileComponent,
        data: { title: "ROUTE.APITELEGRAM.UPLOADEDFILE" },
      },
    ],
  },
];
