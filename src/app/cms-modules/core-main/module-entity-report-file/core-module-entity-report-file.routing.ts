import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoreModuleEntityReportFileListComponent } from "./list/list.component";

const routes: Routes = [
  {
    path: "",
    data: { title: "ROUTE.CORE.ENTITYREPORTFILE" },
    children: [
      {
        path: "",
        component: CoreModuleEntityReportFileListComponent,
        data: { title: "ROUTE.CORE.ENTITYREPORTFILE" },
      },
      {
        path: "LinkModuleEntityReportFileId/:LinkModuleEntityReportFileId",
        component: CoreModuleEntityReportFileListComponent,
        data: { title: "ROUTE.CORE.ENTITYREPORTFILE" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreModuleEntityReportFileRouting {}
