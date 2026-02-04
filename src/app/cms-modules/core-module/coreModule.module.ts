import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CoreModuleComponent } from "./coreModule.component";
import { CoreModuleRoutes } from "./coreModule.routing";

import { AngularEditorModule } from "@kolkov/angular-editor";
import { CmsFileManagerModule } from "ntk-cms-filemanager";
import { SharedModule } from "src/app/shared/shared.module";

import { CurrencyMaskModule } from "ng2-currency-mask";
import {
  CoreModuleService,
  CoreModuleSiteCreditService,
  CoreModuleSiteUserCreditService,
  CoreModuleTagCategoryService,
  CoreModuleTagService,
} from "ntk-cms-api";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";
import { CoreSharedModule } from "../core-main/core.shared.module";
import { CoreModuleSiteCreditChargeDirectComponent } from "./site-credit/charge-direct/charge-direct.component";
import { CoreModuleSiteCreditChargeOnlineCalculateComponent } from "./site-credit/charge-online-calculate/charge-online-calculate.component";
import { CoreModuleSiteCreditChargeOnlineComponent } from "./site-credit/charge-online/charge-online.component";
import { CoreModuleSiteCreditEditComponent } from "./site-credit/edit/edit.component";
import { CoreModuleSiteCreditListComponent } from "./site-credit/list/list.component";
import { CoreModuleSiteCreditListMobileComponent } from "./site-credit/list/list.mobile.component";

import { CoreModuleSiteUserCreditChargeDirectComponent } from "./site-user-credit/charge-direct/charge-direct.component";
import { CoreModuleSiteUserCreditChargeOnlineCalculateComponent } from "./site-user-credit/charge-online-calculate/charge-online-calculate.component";
import { CoreModuleSiteUserCreditChargeOnlineComponent } from "./site-user-credit/charge-online/charge-online.component";
import { CoreModuleSiteUserCreditEditComponent } from "./site-user-credit/edit/edit.component";
import { CoreModuleSiteUserCreditListComponent } from "./site-user-credit/list/list.component";
import { CoreModuleSiteUserCreditListMobileComponent } from "./site-user-credit/list/list.mobile.component";
import { CoreModuleSiteUserCreditMyselfListComponent } from "./site-user-credit/myself-list/myself-list.component";
import { CoreModuleTagAddBulkComponent } from "./tag/add-bulk/add-bulk.component";
import { CoreModuleTagEditComponent } from "./tag/edit/edit.component";
import { CoreModuleTagListComponent } from "./tag/list/list.component";
import { CoreModuleTagListMobileComponent } from "./tag/list/list.mobile.component";
import { CoreModuleTagSelectorComponent } from "./tag/selector/selector.component";
import { CoreModuleTagCategoryDeleteComponent } from "./tagCategory/delete/delete.component";
import { CoreModuleTagCategoryEditComponent } from "./tagCategory/edit/edit.component";
import { CoreModuleTagCategorySelectorComponent } from "./tagCategory/selector/selector.component";
import { CoreModuleTagCategoryTreeComponent } from "./tagCategory/tree/tree.component";

@NgModule({
  imports: [
    CoreModuleRoutes,
    CommonModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
    CurrencyMaskModule,
    SharedModule,
    AngularEditorModule,
    CoreSharedModule,
    CmsFileManagerModule,
  ],
  declarations: [
    CoreModuleComponent,
    CoreModuleTagEditComponent,
    CoreModuleTagListComponent,
    CoreModuleTagCategoryEditComponent,
    CoreModuleTagCategoryDeleteComponent,
    CoreModuleTagCategoryTreeComponent,
    CoreModuleTagCategorySelectorComponent,
    CoreModuleTagSelectorComponent,
    CoreModuleTagAddBulkComponent,
    CoreModuleSiteCreditEditComponent,
    CoreModuleSiteCreditListComponent,

    CoreModuleSiteUserCreditEditComponent,
    CoreModuleSiteUserCreditListComponent,
    CoreModuleSiteUserCreditMyselfListComponent,
    CoreModuleSiteUserCreditChargeOnlineComponent,
    CoreModuleSiteCreditChargeOnlineComponent,
    CoreModuleSiteCreditChargeOnlineCalculateComponent,
    CoreModuleSiteUserCreditChargeOnlineCalculateComponent,
    CoreModuleSiteCreditChargeDirectComponent,
    CoreModuleSiteUserCreditChargeDirectComponent,
  ],
  exports: [
    CoreModuleComponent,
    CoreModuleTagEditComponent,
    CoreModuleTagListComponent,
    CoreModuleTagListMobileComponent,
    CoreModuleTagCategoryEditComponent,
    CoreModuleTagCategoryDeleteComponent,
    CoreModuleTagCategoryTreeComponent,
    CoreModuleTagCategorySelectorComponent,
    CoreModuleTagSelectorComponent,
    CoreModuleTagAddBulkComponent,
    CoreModuleSiteCreditEditComponent,
    CoreModuleSiteCreditListComponent,
    CoreModuleSiteCreditListMobileComponent,

    CoreModuleSiteUserCreditEditComponent,
    CoreModuleSiteUserCreditListComponent,
    CoreModuleSiteUserCreditListMobileComponent,
    CoreModuleSiteUserCreditMyselfListComponent,
    CoreModuleSiteUserCreditChargeOnlineComponent,
    CoreModuleSiteCreditChargeOnlineComponent,
    CoreModuleSiteCreditChargeOnlineCalculateComponent,
    CoreModuleSiteUserCreditChargeOnlineCalculateComponent,
    CoreModuleSiteCreditChargeDirectComponent,
    CoreModuleSiteUserCreditChargeDirectComponent,
  ],
  providers: [
    CoreModuleService,
    CoreModuleTagService,
    CoreModuleTagCategoryService,
    CoreModuleSiteCreditService,
    CoreModuleSiteUserCreditService,
    CmsConfirmationDialogService,
  ],
})
export class CoreModuleModule {}
