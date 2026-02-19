import { Routes } from "@angular/router";
import { ContactComponent } from "./contact.component";
import { ContactContentAddComponent } from "./content/add/add.component";
import { ContactContentEditComponent } from "./content/edit/edit.component";
import { ContactContentImportComponent } from "./content/import/import.component";
import { ContactContentListMobileComponent } from "./content/list/list.mobile.component";

export const routesMobile: Routes = [
  {
    path: "",
    component: ContactComponent,
    data: { title: "ROUTE.CONTACT" },
    children: [
      {
        path: "content",
        component: ContactContentListMobileComponent,
        data: { title: "ROUTE.CONTACT" },
      },
      {
        path: "content/add/:CategoryId",
        component: ContactContentAddComponent,
        data: { title: "ROUTE.CONTACT" },
      },
      {
        path: "content/edit/:id",
        component: ContactContentEditComponent,
        data: { title: "ROUTE.CONTACT" },
      },
      {
        path: "content/import",
        component: ContactContentImportComponent,
        data: { title: "ROUTE.CONTACT" },
      },
      {
        path: "config",
        loadChildren: () =>
          import("./config/contact-config.module").then(
            (m) => m.ContactConfigModule,
          ),
        data: { title: "ROUTE.CONTACT" },
      },
    ],
  },
];
