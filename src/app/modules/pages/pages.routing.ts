import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageAboutusComponent } from "./page-aboutus/page-aboutus.component";
import { PageContactusComponent } from "./page-contactus/page-contactus.component";
import { PageIndexComponent } from "./page-index/page-index.component";
import { PagesComponent } from "./pages.component";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    data: { title: "ROUTE.PAGES" },
    children: [
      {
        path: "",
        component: PageIndexComponent,
        data: { title: "ROUTE.PAGES" },
      },
      {
        path: "aboutus",
        component: PageAboutusComponent,
        data: { title: "ROUTE.PAGES.ABOUTUS" },
      },
      {
        path: "contactus",
        component: PageContactusComponent,
        data: { title: "ROUTE.TICKETING.CONTACTUS" },
      },

      {
        path: "",
        redirectTo: "",
        pathMatch: "full",
        data: { title: "ROUTE.PAGES" },
      },
      {
        path: "**",
        redirectTo: "",
        pathMatch: "full",
        data: { title: "ROUTE.PAGES" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
