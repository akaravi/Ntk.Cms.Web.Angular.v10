import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { CoreSharedModule } from "../core-main/core.shared.module";
import { CrmComponent } from "./crm.component";
import { CrmRoutes } from "./crm.routing";

/**
 * ماژول اصلی CRM.
 * این ماژول به عنوان container برای sub-moduleهای CRM عمل می‌کند.
 */
@NgModule({
  declarations: [CrmComponent],
  imports: [
    CommonModule,
    CrmRoutes,
    SharedModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
    CoreSharedModule,
  ],
  providers: [],
})
export class CrmModule {}


