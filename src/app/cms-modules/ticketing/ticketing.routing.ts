import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { routesMobile } from "./routes.mobile";
import { routesNormal } from "./routes.normal";
/**توجه این روت دو بخش داد باید در هر دو بخش روت ها اضفا شود */

@NgModule({
  imports: [
    RouterModule.forChild(window.innerWidth < 1000 ? routesMobile : routesNormal),
  ],
  exports: [RouterModule],
})
export class TicketingRouting {}
  {
    path: "",
    component: TicketingComponent,
    data: { title: "ROUTE.TICKETING" },

    children: [
      /* Config */
      {
        path: "config",
        loadChildren: () =>
          import("./config/ticketing-config.module").then(
            (m) => m.TicketingConfigModule,
          ),
        data: { title: "ROUTE.TICKETING" },
      },
      /* Config */
      {
        path: "departemen",
        component: TicketingDepartemenListComponent,
        data: { title: "ROUTE.TICKETING.DEPARTMENT" },
      },
      {
        path: "departemen/add/",
        component: TicketingDepartemenEditComponent,
        data: { title: "ROUTE.TICKETING.DEPARTMENT" },
      },
      {
        path: "departemen/edit/:id",
        component: TicketingDepartemenEditComponent,
        data: { title: "ROUTE.TICKETING.DEPARTMENT" },
      },
      {
        path: "departemenlog/DepartemenId/:DepartemenId",
        component: TicketingDepartemenLogListComponent,
        data: { title: "ROUTE.TICKETING.DEPARTMENTLOG" },
      },
      {
        path: "departemenlog/OperatorId/:OperatorId",
        component: TicketingDepartemenLogListComponent,
        data: { title: "ROUTE.TICKETING.DEPARTMENTLOG" },
      },
      {
        path: "faq",
        component: TicketingFaqOriginListComponent,
        data: { title: "ROUTE.TICKETING.FAQ" },
      },
      {
        path: "faq/:DepartemenId",
        component: TicketingFaqListComponent,
        data: { title: "ROUTE.TICKETING.FAQ" },
      },
      {
        path: "faq/list",
        component: TicketingFaqListComponent,
        data: { title: "ROUTE.TICKETING.LIST" },
      },
      {
        path: "template",
        component: TicketingTemplateListComponent,
        data: { title: "ROUTE.TICKETING.TEMPLATE" },
      },
      {
        path: "template/:DepartemenId",
        component: TicketingTemplateListComponent,
        data: { title: "ROUTE.TICKETING.TEMPLATE" },
      },
      {
        path: "contactus",
        component: TicketingTaskContactUsAddComponent,
        data: { title: "ROUTE.TICKETING.CONTACTUS" },
      },
      {
        path: "task",
        component: TicketingTaskListComponent,
        data: { title: "ROUTE.TICKETING.TASK" },
      },
      {
        path: "task/listTicketStatus/:TicketStatus",
        component: TicketingTaskListComponent,
        data: { title: "ROUTE.TICKETING.TASK" },
      },
      {
        path: "task/contactus-list",
        component: TicketingTaskContactUsListComponent,
        data: { title: "ROUTE.TICKETING.TASK" },
      },
      {
        path: "task/contactus-list/LinkCmsUserId/:LinkCmsUserId",
        component: TicketingTaskContactUsListComponent,
        data: { title: "ROUTE.TICKETING.TASK" },
      },
      {
        path: "task/:DepartemenId",
        component: TicketingTaskListComponent,
        data: { title: "ROUTE.TICKETING.TASK" },
      },
      {
        path: "task/LinkCmsUserId/:LinkCmsUserId",
        component: TicketingTaskListComponent,
        data: { title: "ROUTE.TICKETING.TASK" },
      },
      // ,
      // {
      //   path: 'task/edit/:id',
      //   component: TicketingTaskEditComponent
      // }
      {
        path: "answer",
        component: TicketingAnswerListComponent,
        data: { title: "ROUTE.TICKETING.ANSWER" },
      },
      {
        path: "answer/LinkTaskId/:LinkTaskId",
        component: TicketingAnswerListComponent,
        data: { title: "ROUTE.TICKETING.ANSWER" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketingRouting {}
