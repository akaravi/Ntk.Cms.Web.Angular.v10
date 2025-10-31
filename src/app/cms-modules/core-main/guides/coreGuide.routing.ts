import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoreGuideListComponent } from "./list/list.component";

const routes: Routes = [
  {
    path: "",
    data: { title: "ROUTE.CORE.GUIDE" },
    children: [
      {
        path: "",
        component: CoreGuideListComponent,
        data: { title: "ROUTE.CORE.GUIDE" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreGuideRouting {}
