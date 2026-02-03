import { Routes } from "@angular/router";
import { FileManagerComponent } from "./file-manager.component";
import { FileContentListMobileComponent } from "./content/list/list.mobile.component";
import { FileContentExplorerComponent } from "./content/explorer/explorer.component";

export const routesMobile: Routes = [
  {
    path: "",
    component: FileManagerComponent,
    data: { title: "ROUTE.FILEMANAGER" },
    children: [
      {
        path: "content",
        component: FileContentListMobileComponent,
        data: { title: "ROUTE.FILEMANAGER" },
      },
      {
        path: "explorer",
        component: FileContentExplorerComponent,
        data: { title: "ROUTE.FILEMANAGER" },
      },
      {
        path: "",
        redirectTo: "explorer",
        pathMatch: "full",
        data: { title: "ROUTE.FILEMANAGER" },
      },
    ],
  },
];
