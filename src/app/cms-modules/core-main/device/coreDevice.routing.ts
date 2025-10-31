import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoreDeviceListComponent } from "./list/list.component";

const routes: Routes = [
  {
    path: "",
    data: { title: "ROUTE.CORE.DEVICE" },
    children: [
      {
        path: "",
        component: CoreDeviceListComponent,
        data: { title: "ROUTE.CORE.DEVICE" },
      },
      {
        path: ":LinkSiteId",
        component: CoreDeviceListComponent,
        data: { title: "ROUTE.CORE.DEVICE" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreDeviceRouting {}
