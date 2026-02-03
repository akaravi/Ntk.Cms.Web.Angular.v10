import { Routes } from "@angular/router";
import { PollingComponent } from "./polling.component";
import { PollingContentListMobileComponent } from "./content/list/list.mobile.component";
import { PollingContentAddComponent } from "./content/add/add.component";
import { PollingContentEditComponent } from "./content/edit/edit.component";
import { PollingVoteListMobileComponent } from "./vote/list/list.mobile.component";

export const routesMobile: Routes = [
  {
    path: "",
    component: PollingComponent,
    data: { title: "ROUTE.POLLING" },
    children: [
      /* Config */
      {
        path: "config",
        loadChildren: () =>
          import("./config/polling-config.module").then(
            (m) => m.PollingConfigModule,
          ),
        data: { title: "ROUTE.POLLING" },
      },
      /* Config */
      {
        path: "content",
        component: PollingContentListMobileComponent,
        data: { title: "ROUTE.POLLING.CONTENT" },
      },
      {
        path: "content/add/:CategoryId",
        component: PollingContentAddComponent,
        data: { title: "ROUTE.POLLING.CONTENT" },
      },
      {
        path: "content/edit/:id",
        component: PollingContentEditComponent,
        data: { title: "ROUTE.POLLING.CONTENT" },
      },
      {
        path: "vote",
        component: PollingVoteListMobileComponent,
        data: { title: "ROUTE.POLLING.VOTE" },
      },
      {
        path: "vote/ContentId/:ContentId",
        component: PollingVoteListMobileComponent,
        data: { title: "ROUTE.POLLING.VOTE" },
      },
      {
        path: "vote/OptionId/:OptionId",
        component: PollingVoteListMobileComponent,
        data: { title: "ROUTE.POLLING.VOTE" },
      },
    ],
  },
];
