import { DragDropModule } from "@angular/cdk/drag-drop";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatStepperModule } from "@angular/material/stepper";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { IconPickerModule } from "ngx-ntk-icon-picker";
import {
  EstateAccountAgencyAdsService,
  EstateAccountAgencyService,
  EstateAccountExpertService,
  EstateCustomerOrderService,
  EstatePropertyAdsService,
  EstatePropertyCompanyService,
  EstatePropertyHistoryService,
  EstatePropertyProjectService,
  EstatePropertyService,
  EstatePropertySupplierService,
} from "ntk-cms-api";
import { NgxMatColorPickerModule } from "src/app/shared/color-picker.module";
import { SharedModule } from "src/app/shared/shared.module";
import { CoreSharedModule } from "../core-main/core.shared.module";
import { EstateDashboardComponent } from "./dashboard/dashboard.component";
import { EstateComponent } from "./estate.component";
import { EstateRoutes } from "./estate.routing";
import { EstateOverviewEventsComponent } from "./overview/events/events.component";
import { EstateOverviewSummaryComponent } from "./overview/summary/summary.component";
import { EstateSharedModule } from "./shared/estate-shared.module";

@NgModule({
  declarations: [
    EstateComponent,

    /* Dashboard */
    EstateDashboardComponent,
    /* Dashboard */
    /* */
    EstateOverviewEventsComponent,
    EstateOverviewSummaryComponent,
    /* */
  ],
  imports: [
    CommonModule,
    EstateRoutes,
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
    CoreSharedModule,
    EstateSharedModule,
    CurrencyMaskModule,
    MatIconModule,
    MatFormFieldModule,
    MatStepperModule,
    IconPickerModule,
    DragDropModule,
    NgxMatColorPickerModule,
    NgOptimizedImage,
  ],
  exports: [
    /* Dashboard */
    EstateDashboardComponent,
    /* Dashboard */
    /* */
    EstateOverviewEventsComponent,
    EstateOverviewSummaryComponent,
    /* */
  ],
  providers: [
    EstatePropertyService,
    EstatePropertyAdsService,
    EstateAccountAgencyAdsService,
    EstatePropertyProjectService,
    EstatePropertyCompanyService,
    EstatePropertySupplierService,
    EstateAccountAgencyService,
    EstateAccountExpertService,
    EstateCustomerOrderService,
    EstatePropertyHistoryService,
  ],
})
export class EstateModule {}
