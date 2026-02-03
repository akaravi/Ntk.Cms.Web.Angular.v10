import { Routes } from "@angular/router";
import { PollingComponent } from "./polling.component";
import { PollingContentListComponent } from "./content/list/list.component";
import { PollingContentAddComponent } from "./content/add/add.component";
import { PollingContentEditComponent } from "./content/edit/edit.component";
import { PollingVoteListComponent } from "./vote/list/list.component";

export const routesNormal: Routes = [
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
        component: PollingContentListComponent,
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
        component: PollingVoteListComponent,
        data: { title: "ROUTE.POLLING.VOTE" },
      },
      {
        path: "vote/ContentId/:ContentId",
        component: PollingVoteListComponent,
        data: { title: "ROUTE.POLLING.VOTE" },
      },
      {
        path: "vote/OptionId/:OptionId",
        component: PollingVoteListComponent,
        data: { title: "ROUTE.POLLING.VOTE" },
      },
    ],
  },
];
