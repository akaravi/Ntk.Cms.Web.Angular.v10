import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TestComponent } from "./test.component";
import { TestRoutingModule } from "./test.routing";
import { TestOneComponent } from "./testOne/testOne.component";
import { TestTwoComponent } from "./testTwo/testTwo.component";

@NgModule({
  declarations: [TestComponent],
  imports: [CommonModule, TestRoutingModule, RouterModule, TestOneComponent, TestTwoComponent],
})
export class TestModule {}
