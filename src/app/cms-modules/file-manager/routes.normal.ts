import { Routes } from "@angular/router";
import { FileManagerComponent } from "./file-manager.component";
import { FileContentListComponent } from "./content/list/list.component";
import { FileContentExplorerComponent } from "./content/explorer/explorer.component";

export const routesNormal: Routes = [
  {
    path: "",
    component: FileManagerComponent,
    data: { title: "ROUTE.FILEMANAGER" },
    children: [
      {
        path: "content",
        component: FileContentListComponent,
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
