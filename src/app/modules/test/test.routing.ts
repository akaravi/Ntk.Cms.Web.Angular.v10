import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TestComponent } from "./test.component";
import { TestOneComponent } from "./testOne/testOne.component";
import { TestTwoComponent } from "./testTwo/testTwo.component";

const routes: Routes = [
  {
    path: "",
    component: TestComponent,
    data: { title: "ROUTE.TEST" },
    children: [
      {
        path: "1",
        component: TestOneComponent,
        data: { title: "ROUTE.TEST.1" },
      },
      {
        path: "2",
        component: TestTwoComponent,
        data: { title: "ROUTE.TEST.2" },
      },
      {
        path: "",
        redirectTo: "1",
        pathMatch: "full",
        data: { title: "ROUTE.TEST" },
      },
      {
        path: "**",
        redirectTo: "1",
        pathMatch: "full",
        data: { title: "ROUTE.TEST" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestRoutingModule {}
