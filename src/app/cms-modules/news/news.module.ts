import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NewsComponent } from "./news.component";
import { NewsRouting } from "./news.routing";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularEditorModule } from "@kolkov/angular-editor";

import {
  CoreEnumService,
  CoreModuleService,
  CoreModuleTagService,
  NewsCategoryService,
  NewsCommentService,
  NewsConfigurationService,
  NewsContentAndParameterValueService,
  NewsContentCategoryService,
  NewsContentOtherInfoService,
  NewsContentParameterService,
  NewsContentParameterTypeService,
  NewsContentService,
  NewsContentSimilarService,
  NewsContentTagService,
  NewsShareMainAdminSettingService,
  NewsShareReceiverCategoryService,
  NewsShareServerCategoryService,
} from "ntk-cms-api";
import { CmsFileManagerModule } from "ntk-cms-filemanager";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";
import { SharedModule } from "src/app/shared/shared.module";
// Category Components
import { NewsCategoryAddComponent } from "./category/add/add.component";
import { NewsCategoryAddMobileComponent } from "./category/add/add.mobile.component";
import { NewsCategoryDeleteComponent } from "./category/delete/delete.component";
import { NewsCategoryDeleteMobileComponent } from "./category/delete/delete.mobile.component";
import { NewsCategoryEditComponent } from "./category/edit/edit.component";
import { NewsCategoryEditMobileComponent } from "./category/edit/edit.mobile.component";
import { NewsCategoryListComponent } from "./category/list/list.component";
import { NewsCategoryListMobileComponent } from "./category/list/list.mobile.component";
import { NewsCategoryMenuComponent } from "./category/menu/menu.component";
import { NewsCategorySelectorComponent } from "./category/selector/selector.component";
import { NewsCategoryTreeSelectorComponent } from "./category/tree-selector/tree-selector.component";
import { NewsCategoryTreeComponent } from "./category/tree/tree.component";
import { NewsCategoryViewComponent } from "./category/view/view.component";
import { NewsCategoryViewMobileComponent } from "./category/view/view.mobile.component";
// Content Components
import { NewsCommentEditComponent } from "./comment/edit/edit.component";
import { NewsCommentListComponent } from "./comment/list/list.component";
import { NewsContentAddComponent } from "./content/add/add.component";
import { NewsContentAddMobileComponent } from "./content/add/add.mobile.component";
import { NewsContentDeleteComponent } from "./content/delete/delete.component";
import { NewsContentDeleteMobileComponent } from "./content/delete/delete.mobile.component";
import { NewsContentEditComponent } from "./content/edit/edit.component";
import { NewsContentEditMobileComponent } from "./content/edit/edit.mobile.component";
import { NewsContentHeaderComponent } from "./content/header/header.component";
import { NewsContentListComponent } from "./content/list/list.component";
import { NewsContentListMobileComponent } from "./content/list/list.mobile.component";
import { NewsContentSelectorComponent } from "./content/selector/selector.component";
import { NewsContentViewComponent } from "./content/view/view.component";
import { NewsContentViewMobileComponent } from "./content/view/view.mobile.component";
@NgModule({
  declarations: [
    NewsComponent,
    // Content - List
    NewsContentListComponent,
    NewsContentListMobileComponent,
    // Content - Add
    NewsContentAddComponent,
    NewsContentAddMobileComponent,
    // Content - Edit
    NewsContentEditComponent,
    NewsContentEditMobileComponent,
    // Content - View
    NewsContentViewComponent,
    NewsContentViewMobileComponent,
    // Content - Delete
    NewsContentDeleteComponent,
    NewsContentDeleteMobileComponent,
    // Content - Other
    NewsContentSelectorComponent,
    NewsContentHeaderComponent,
    // Category - List
    NewsCategoryListComponent,
    NewsCategoryListMobileComponent,
    // Category - Add
    NewsCategoryAddComponent,
    NewsCategoryAddMobileComponent,
    // Category - Edit
    NewsCategoryEditComponent,
    NewsCategoryEditMobileComponent,
    // Category - View
    NewsCategoryViewComponent,
    NewsCategoryViewMobileComponent,
    // Category - Delete
    NewsCategoryDeleteComponent,
    NewsCategoryDeleteMobileComponent,
    // Category - Other
    NewsCategoryTreeComponent,
    NewsCategoryTreeSelectorComponent,
    NewsCategorySelectorComponent,
    NewsCategoryMenuComponent,
    // Comment
    NewsCommentListComponent,
    NewsCommentEditComponent,
  ],
  imports: [
    CommonModule,
    NewsRouting,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
    SharedModule,
    AngularEditorModule,

    CmsFileManagerModule,
  ],
  providers: [
    CoreModuleService,
    CoreEnumService,
    CoreModuleTagService,
    CmsConfirmationDialogService,
    /*Config*/
    NewsConfigurationService,
    /*Config*/
    NewsCategoryService,
    NewsCommentService,
    NewsContentService,
    NewsContentAndParameterValueService,
    NewsContentOtherInfoService,
    NewsContentParameterService,
    NewsContentParameterTypeService,
    NewsContentSimilarService,
    NewsContentTagService,
    NewsShareMainAdminSettingService,
    NewsShareReceiverCategoryService,
    NewsShareServerCategoryService,
    NewsContentCategoryService,
  ],
})
export class NewsModule {}
