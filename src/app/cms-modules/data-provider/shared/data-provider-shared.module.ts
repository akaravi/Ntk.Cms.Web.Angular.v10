import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatStepperModule } from "@angular/material/stepper";
import {
  CoreModuleService,
  DataProviderEnumService,
  DataProviderPlanService,
  DataProviderPlanCategoryService,
} from "ntk-cms-api";
import { SharedModule } from "src/app/shared/shared.module";
import { CoreSharedModule } from "src/app/cms-modules/core-main/core.shared.module";
// Plan Category
import { DataProviderPlanCategorySelectorComponent } from "../main/plan-category/selector/selector.component";
// Plan
import { DataProviderPlanHeaderComponent } from "../main/plan/header/header.component";
import { DataProviderPlanSelectionlistComponent } from "../main/plan/selectionlist/selectionlist.component";
import { DataProviderPlanTreeComponent } from "../main/plan/tree/tree.component";

@NgModule({
  declarations: [
    /* Plan Category */
    DataProviderPlanCategorySelectorComponent,
    /* Plan */
    DataProviderPlanHeaderComponent,
    DataProviderPlanSelectionlistComponent,
    DataProviderPlanTreeComponent,
  ],
  exports: [
    /* Plan Category */
    DataProviderPlanCategorySelectorComponent,
    /* Plan */
    DataProviderPlanHeaderComponent,
    DataProviderPlanSelectionlistComponent,
    DataProviderPlanTreeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
    SharedModule,
    CoreSharedModule,
    AngularEditorModule,
    MatIconModule,
    MatFormFieldModule,
    MatStepperModule,
    MatDialogModule,
  ],
  providers: [
    CoreModuleService,
    DataProviderEnumService,
    DataProviderPlanService,
    DataProviderPlanCategoryService,
  ],
})
export class DataProviderSharedModule {}
