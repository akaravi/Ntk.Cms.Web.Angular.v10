import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CatalogComponent } from "./catalog.component";
import { CatalogRouting } from "./catalog.routing";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  CatalogCategoryService,
  CatalogConfigurationService,
  CatalogContentService,
  CoreEnumService,
  CoreModuleService,
  CoreModuleTagService,
} from "ntk-cms-api";
import { CatalogCategoryDeleteComponent } from "./category/delete/delete.component";
import { CatalogCategoryEditComponent } from "./category/edit/edit.component";
import { CatalogContentAddComponent } from "./content/add/add.component";
import { CatalogContentEditComponent } from "./content/edit/edit.component";

import { SharedModule } from "src/app/shared/shared.module";

import { AngularEditorModule } from "@kolkov/angular-editor";

import { CmsFileManagerModule } from "ntk-cms-filemanager";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";
import { CatalogCategoryAddComponent } from "./category/add/add.component";
import { CatalogCategorySelectorComponent } from "./category/selector/selector.component";
import { CatalogCategoryTreeSelectorComponent } from "./category/tree-selector/tree-selector.component";
import { CatalogCategoryTreeComponent } from "./category/tree/tree.component";
import { CatalogContentDeleteComponent } from "./content/delete/delete.component";
import { CatalogContentHeaderComponent } from "./content/header/header.component";
import { CatalogContentListComponent } from "./content/list/list.component";
import { CatalogContentSelectorComponent } from "./content/selector/selector.component";
import { CatalogConfigComponent } from "./config/catalog-config.component";
import { CatalogConfigCheckSiteComponent } from "./config/check-site/check-site.component";
import { CatalogConfigCheckUserComponent } from "./config/check-user/check-user.component";
import { CatalogConfigMainAdminComponent } from "./config/main-admin/config-main-admin.component";
import { CatalogConfigSiteComponent } from "./config/site/config-site.component";
import { CatalogContentListMobileComponent } from "./content/list/list.mobile.component";
import { CatalogContentWidgetComponent } from "./content/widget/widget.component";

@NgModule({
  declarations: [
    CatalogComponent,
    /** */
    CatalogContentAddComponent,
    CatalogContentEditComponent,
    CatalogContentDeleteComponent,
    CatalogContentListComponent,
    CatalogContentHeaderComponent,
    CatalogContentSelectorComponent,
    CatalogCategoryTreeComponent,
    CatalogCategorySelectorComponent,
    CatalogCategoryAddComponent,
    CatalogCategoryEditComponent,
    CatalogCategoryDeleteComponent,
    CatalogCategoryTreeSelectorComponent,
    CatalogConfigComponent,
    CatalogConfigCheckSiteComponent,
    CatalogConfigCheckUserComponent,
    CatalogConfigMainAdminComponent,
    CatalogConfigSiteComponent,
    CatalogContentListMobileComponent,
    CatalogContentWidgetComponent,
  ],
  imports: [
    CommonModule,
    CatalogRouting,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
    SharedModule,
    AngularEditorModule,

    CmsFileManagerModule,
  ],
  providers: [
    CoreModuleService,
    CoreEnumService,
    /*Config*/
    CatalogConfigurationService,
    /*Config*/
    CoreModuleTagService,
    CmsConfirmationDialogService,
    CatalogCategoryService,
    CatalogConfigurationService,
    CatalogContentService,
  ],
})
export class CatalogModule {}
