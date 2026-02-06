import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  CoreEnumService,
  CoreModuleService,
  CoreUserClaimContentService,
  CoreUserClaimGroupDetailService,
  CoreUserClaimGroupService,
  CoreUserClaimTypeService,
} from "ntk-cms-api";

import { AngularEditorModule } from "@kolkov/angular-editor";

import { CmsFileManagerModule } from "ntk-cms-filemanager";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";
import { SharedModule } from "src/app/shared/shared.module";
import { CoreSharedModule } from "../core.shared.module";
import { CoreUserClaimContentAddComponent } from "./content/add/add.component";
import { CoreUserClaimContentCheckListComponent } from "./content/check-list/check-list.component";
import { CoreUserClaimContentEditComponent } from "./content/edit/edit.component";
import { CoreUserClaimContentListComponent } from "./content/list/list.component";
import { CoreUserClaimContentListMobileComponent } from "./content/list/list.mobile.component";
import { CoreUserClaimComponent } from "./core-user-claim.component";
import { CoreUserClaimRouting } from "./core-user-claim.routing";
import { CoreUserClaimGroupDetailAddComponent } from "./group-detail/add/add.component";
import { CoreUserClaimGroupDetailEditComponent } from "./group-detail/edit/edit.component";
import { CoreUserClaimGroupDetailListComponent } from "./group-detail/list/list.component";
import { CoreUserClaimGroupDetailListMobileComponent } from "./group-detail/list/list.mobile.component";
import { CoreUserClaimGroupDetailSelectorComponent } from "./group-detail/selector/selector.component";
import { CoreUserClaimGroupDetailTreeComponent } from "./group-detail/tree/tree.component";
import { CoreUserClaimGroupAddComponent } from "./group/add/add.component";
import { CoreUserClaimGroupEditComponent } from "./group/edit/edit.component";
import { CoreUserClaimGroupHeaderComponent } from "./group/header/header.component";
import { CoreUserClaimGroupListComponent } from "./group/list/list.component";
import { CoreUserClaimGroupListMobileComponent } from "./group/list/list.mobile.component";
import { CoreUserClaimGroupSelectionlistComponent } from "./group/selectionlist/selectionlist.component";
import { CoreUserClaimGroupSelectorComponent } from "./group/selector/selector.component";
import { CoreUserClaimGroupTreeComponent } from "./group/tree/tree.component";
import { CoreUserClaimTypeAddComponent } from "./type/add/add.component";
import { CoreUserClaimTypeEditComponent } from "./type/edit/edit.component";
import { CoreUserClaimTypeHeaderComponent } from "./type/header/header.component";
import { CoreUserClaimTypeListComponent } from "./type/list/list.component";
import { CoreUserClaimTypeListMobileComponent } from "./type/list/list.mobile.component";
import { CoreUserClaimTypeSelectionlistComponent } from "./type/selectionlist/selectionlist.component";
import { CoreUserClaimTypeSelectorComponent } from "./type/selector/selector.component";
import { CoreUserClaimTypeTreeComponent } from "./type/tree/tree.component";

@NgModule({
  declarations: [
    CoreUserClaimComponent,
    /** */
    CoreUserClaimGroupListComponent,
    CoreUserClaimGroupListMobileComponent,
    CoreUserClaimGroupAddComponent,
    CoreUserClaimGroupEditComponent,
    CoreUserClaimGroupSelectorComponent,
    CoreUserClaimGroupTreeComponent,
    CoreUserClaimGroupHeaderComponent,
    /** */
    /** */
    CoreUserClaimTypeListComponent,
    CoreUserClaimTypeListMobileComponent,
    CoreUserClaimTypeAddComponent,
    CoreUserClaimTypeEditComponent,
    CoreUserClaimTypeSelectorComponent,
    CoreUserClaimTypeSelectionlistComponent,
    CoreUserClaimTypeTreeComponent,
    CoreUserClaimTypeHeaderComponent,
    /** */
    /** */
    CoreUserClaimGroupDetailListComponent,
    CoreUserClaimGroupDetailListMobileComponent,
    CoreUserClaimGroupDetailAddComponent,
    CoreUserClaimGroupDetailEditComponent,
    CoreUserClaimGroupDetailSelectorComponent,
    CoreUserClaimGroupDetailTreeComponent,
    CoreUserClaimGroupSelectionlistComponent,
    /** */
    /** */
    CoreUserClaimContentListComponent,
    CoreUserClaimContentCheckListComponent,
    CoreUserClaimContentListMobileComponent,
    CoreUserClaimContentAddComponent,
    CoreUserClaimContentEditComponent,
    /** */
  ],
  exports: [
    CoreUserClaimComponent,
    /** */
    CoreUserClaimGroupListComponent,
    CoreUserClaimGroupListMobileComponent,
    CoreUserClaimGroupAddComponent,
    CoreUserClaimGroupEditComponent,
    CoreUserClaimGroupSelectorComponent,
    CoreUserClaimGroupTreeComponent,
    CoreUserClaimGroupHeaderComponent,
    /** */
    /** */
    CoreUserClaimTypeListComponent,
    CoreUserClaimTypeListMobileComponent,
    CoreUserClaimTypeAddComponent,
    CoreUserClaimTypeEditComponent,
    CoreUserClaimTypeSelectorComponent,
    CoreUserClaimTypeSelectionlistComponent,
    CoreUserClaimTypeTreeComponent,
    CoreUserClaimTypeHeaderComponent,
    /** */
    /** */
    CoreUserClaimGroupDetailListComponent,
    CoreUserClaimGroupDetailListMobileComponent,
    CoreUserClaimGroupDetailAddComponent,
    CoreUserClaimGroupDetailEditComponent,
    CoreUserClaimGroupDetailSelectorComponent,
    CoreUserClaimGroupDetailTreeComponent,
    /** */
    /** */
    CoreUserClaimContentListComponent,
    CoreUserClaimContentCheckListComponent,
    CoreUserClaimContentListMobileComponent,
    CoreUserClaimContentAddComponent,
    CoreUserClaimContentEditComponent,
    /** */
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreUserClaimRouting,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),

    SharedModule,

    CoreSharedModule,

    AngularEditorModule,
    CmsFileManagerModule,
  ],
  providers: [
    CoreModuleService,
    CoreEnumService,
    /** */
    CoreUserClaimContentService,
    CoreUserClaimTypeService,
    CoreUserClaimGroupService,
    CoreUserClaimGroupDetailService,
    /** */
    CmsConfirmationDialogService,
  ],
})
export class CoreUserClaimModule {}
