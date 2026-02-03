import { Routes } from "@angular/router";
import { TicketingComponent } from "./ticketing.component";
import { TicketingAnswerListMobileComponent } from "./answer/list/list.mobile.component";
import { TicketingDepartemenEditComponent } from "./departemen/edit/edit.component";
import { TicketingDepartemenListMobileComponent } from "./departemen/list/list.mobile.component";
import { TicketingDepartemenLogListMobileComponent } from "./departemenLog/list/list.mobile.component";
import { TicketingFaqListMobileComponent } from "./faq/list/list.mobile.component";
import { TicketingFaqOriginListComponent } from "./faq/origin-list/origin-list.component";
import { TicketingTaskContactUsAddComponent } from "./task/contact-us-add/contact-us-add.component";
import { TicketingTaskContactUsListComponent } from "./task/contact-us-list/contact-us-list.component";
import { TicketingTaskListMobileComponent } from "./task/list/list.mobile.component";
import { TicketingTemplateListMobileComponent } from "./template/list/list.mobile.component";

export const routesMobile: Routes = [
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
        component: TicketingDepartemenListMobileComponent,
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
        component: TicketingDepartemenLogListMobileComponent,
        data: { title: "ROUTE.TICKETING.DEPARTMENTLOG" },
      },
      {
        path: "departemenlog/OperatorId/:OperatorId",
        component: TicketingDepartemenLogListMobileComponent,
        data: { title: "ROUTE.TICKETING.DEPARTMENTLOG" },
      },
      {
        path: "faq",
        component: TicketingFaqOriginListComponent,
        data: { title: "ROUTE.TICKETING.FAQ" },
      },
      {
        path: "faq/:DepartemenId",
        component: TicketingFaqListMobileComponent,
        data: { title: "ROUTE.TICKETING.FAQ" },
      },
      {
        path: "faq/list",
        component: TicketingFaqListMobileComponent,
        data: { title: "ROUTE.TICKETING.LIST" },
      },
      {
        path: "template",
        component: TicketingTemplateListMobileComponent,
        data: { title: "ROUTE.TICKETING.TEMPLATE" },
      },
      {
        path: "template/:DepartemenId",
        component: TicketingTemplateListMobileComponent,
        data: { title: "ROUTE.TICKETING.TEMPLATE" },
      },
      {
        path: "contactus",
        component: TicketingTaskContactUsAddComponent,
        data: { title: "ROUTE.TICKETING.CONTACTUS" },
      },
      {
        path: "task",
        component: TicketingTaskListMobileComponent,
        data: { title: "ROUTE.TICKETING.TASK" },
      },
      {
        path: "task/listTicketStatus/:TicketStatus",
        component: TicketingTaskListMobileComponent,
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
        component: TicketingTaskListMobileComponent,
        data: { title: "ROUTE.TICKETING.TASK" },
      },
      {
        path: "task/LinkCmsUserId/:LinkCmsUserId",
        component: TicketingTaskListMobileComponent,
        data: { title: "ROUTE.TICKETING.TASK" },
      },
      {
        path: "answer",
        component: TicketingAnswerListMobileComponent,
        data: { title: "ROUTE.TICKETING.ANSWER" },
      },
      {
        path: "answer/LinkTaskId/:LinkTaskId",
        component: TicketingAnswerListMobileComponent,
        data: { title: "ROUTE.TICKETING.ANSWER" },
      },
    ],
  },
];
