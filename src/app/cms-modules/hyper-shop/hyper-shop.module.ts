import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HyperShopComponent } from "./hyper-shop.component";
import { HyperShopRoutes } from "./hyper-shop.routing";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AngularEditorModule } from "@kolkov/angular-editor";
import { SharedModule } from "src/app/shared/shared.module";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatStepperModule } from "@angular/material/stepper";
import {
  CoreAuthV3Service,
  CoreEnumService,
  CoreModuleService,
  CoreModuleTagService,
  HyperShopCategoryService,
  HyperShopConfigurationService,
  HyperShopContentService,
} from "ntk-cms-api";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";
import { HyperShopCategoryAddComponent } from "./category/add/add.component";
import { HyperShopCategoryEditComponent } from "./category/edit/edit.component";
import { HyperShopCategoryListComponent } from "./category/list/list.component";
import { HyperShopCategorySelectorComponent } from "./category/selector/selector.component";
import { HyperShopCategoryTreeComponent } from "./category/tree/tree.component";
import { HyperShopContentAddComponent } from "./content/add/add.component";
import { HyperShopContentEditComponent } from "./content/edit/edit.component";
import { HyperShopContentListComponent } from "./content/list/list.component";
import { HyperShopContentViewComponent } from "./content/view/view.component";
import { HyperShopCategoryListMobileComponent } from "./category/list/list.mobile.component";
import { HyperShopConfigCheckSiteComponent } from "./config/check-site/check-site.component";
import { HyperShopConfigCheckUserComponent } from "./config/check-user/check-user.component";
import { HyperShopConfigComponent } from "./config/hyper-shop-config.component";
import { HyperShopConfigMainAdminComponent } from "./config/main-admin/config-main-admin.component";
import { HyperShopConfigSiteComponent } from "./config/site/config-site.component";
import { HyperShopContentListMobileComponent } from "./content/list/list.mobile.component";

@NgModule({
  declarations: [
    HyperShopComponent,
    /* */
    HyperShopCategoryAddComponent,
    HyperShopCategoryEditComponent,
    HyperShopCategoryListComponent,
    HyperShopCategorySelectorComponent,
    HyperShopCategoryTreeComponent,
    /* */
    HyperShopContentAddComponent,
    HyperShopContentEditComponent,
    HyperShopContentListComponent,
    HyperShopContentViewComponent,
    HyperShopCategoryListMobileComponent,
    HyperShopConfigCheckSiteComponent,
    HyperShopConfigCheckUserComponent,
    HyperShopConfigComponent,
    HyperShopConfigMainAdminComponent,
    HyperShopConfigSiteComponent,
    HyperShopContentListMobileComponent,
  ],
  imports: [
    CommonModule,
    HyperShopRoutes,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),

    SharedModule,
    AngularEditorModule,

    MatIconModule,
    MatFormFieldModule,
    MatStepperModule,
  ],
  providers: [
    CoreModuleService,
    CoreEnumService,
    CoreAuthV3Service,
    /*Config*/
    HyperShopConfigurationService,
    /*Config*/
    HyperShopCategoryService,
    HyperShopContentService,
    CmsConfirmationDialogService,
    CoreModuleTagService,
  ],
})
export class HyperShopModule {}
