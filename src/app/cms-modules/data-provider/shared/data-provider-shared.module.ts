import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatStepperModule } from "@angular/material/stepper";
import { CoreModuleService, DataProviderEnumService } from "ntk-cms-api";
import { SharedModule } from "src/app/shared/shared.module";

// TODO: در صورت نیاز، enum selector ها و کامپوننت‌های مشترک را به اینجا اضافه کنید
// مثال:
// import { DataProviderClientSelectorComponent } from "../main/client/selector/selector.component";
// import { DataProviderPlanSelectorComponent } from "../main/plan/selector/selector.component";

@NgModule({
  declarations: [
    // TODO: اضافه کردن کامپوننت‌های مشترک در آینده
    // مثال:
    // DataProviderClientSelectorComponent,
    // DataProviderPlanSelectorComponent,
  ],
  exports: [
    // TODO: export کردن کامپوننت‌های مشترک در آینده
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
    SharedModule,
    AngularEditorModule,
    MatIconModule,
    MatFormFieldModule,
    MatStepperModule,
  ],
  providers: [CoreModuleService, DataProviderEnumService],
})
export class DataProviderSharedModule {}

