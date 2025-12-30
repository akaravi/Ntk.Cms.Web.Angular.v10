import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  CoreEnumService,
  CoreLogTokenConnectionService,
  CoreLogTokenMicroServiceService,
  CoreModuleService,
  CoreTokenActivationService,
  CoreTokenAuthUserLogService,
  CoreTokenAuthUserService,
  CoreTokenConnectionService,
  CoreTokenMicroServiceService,
  CoreTokenUserBadLoginService,
  CoreUserService,
} from "ntk-cms-api";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";
import { SharedModule } from "src/app/shared/shared.module";
import { CoreSharedModule } from "../core-main/core.shared.module";
import { CoreTokenActivationEditComponent } from "./activation/edit/edit.component";
import { CoreTokenActivationListComponent } from "./activation/list/list.component";
import { CoreTokenActivationViewComponent } from "./activation/view/view.component";
import { CoreTokenAuthUserLogListComponent } from "./auth-user-log/list/list.component";
import { CoreTokenAuthUserLogViewComponent } from "./auth-user-log/view/view.component";
import { CoreTokenAuthUserListComponent } from "./auth-user/list/list.component";
import { CoreTokenAuthUserViewComponent } from "./auth-user/view/view.component";
import { CoreTokenComponent } from "./core-token.component";
import { CoreTokenRoutes } from "./core-token.routing";
import { CoreLogTokenMicroServiceEditComponent } from "./micro-service-log/edit/edit.component";
import { CoreLogTokenMicroServiceListComponent } from "./micro-service-log/list/list.component";
import { CoreLogTokenMicroServiceViewComponent } from "./micro-service-log/view/view.component";
import { CoreTokenMicroServiceEditComponent } from "./micro-service/edit/edit.component";
import { CoreTokenMicroServiceListComponent } from "./micro-service/list/list.component";
import { CoreTokenMicroServiceViewComponent } from "./micro-service/view/view.component";
import { CoreLogTokenConnectionEditComponent } from "./notification-log/edit/edit.component";
import { CoreLogTokenConnectionListComponent } from "./notification-log/list/list.component";
import { CoreLogTokenConnectionViewComponent } from "./notification-log/view/view.component";
import { CoreTokenConnectionEditComponent } from "./notification/edit/edit.component";
import { CoreTokenConnectionListOnlineComponent } from "./notification/list-online/list-online.component";
import { CoreTokenConnectionListComponent } from "./notification/list/list.component";
import { CoreTokenConnectionViewComponent } from "./notification/view/view.component";
import { CoreTokenUserBadLoginEditComponent } from "./userBadLogin/edit/edit.component";
import { CoreTokenUserBadLoginListComponent } from "./userBadLogin/list/list.component";
import { CoreTokenUserBadLoginViewComponent } from "./userBadLogin/view/view.component";

@NgModule({
  imports: [
    CoreTokenRoutes,
    CommonModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
    SharedModule,
    CoreSharedModule,
  ],
  declarations: [
    CoreTokenComponent,

    /** */
    CoreTokenAuthUserListComponent,
    CoreTokenAuthUserViewComponent,

    /** */
    CoreTokenAuthUserLogListComponent,
    CoreTokenAuthUserLogViewComponent,
    /** */
    CoreTokenUserBadLoginListComponent,
    CoreTokenUserBadLoginEditComponent,
    CoreTokenUserBadLoginViewComponent,
    /** */
    /** */
    CoreTokenActivationListComponent,
    CoreTokenActivationEditComponent,
    CoreTokenActivationViewComponent,
    /** */
    /** */
    CoreTokenMicroServiceListComponent,
    CoreTokenMicroServiceEditComponent,
    CoreTokenMicroServiceViewComponent,
    /** */
    /** */
    CoreLogTokenMicroServiceListComponent,
    CoreLogTokenMicroServiceEditComponent,
    CoreLogTokenMicroServiceViewComponent,
    /** */

    /** */
    CoreTokenConnectionListComponent,
    CoreTokenConnectionListOnlineComponent,
    CoreTokenConnectionEditComponent,
    CoreTokenConnectionViewComponent,
    /** */
    /** */
    CoreLogTokenConnectionListComponent,
    CoreLogTokenConnectionEditComponent,
    CoreLogTokenConnectionViewComponent,
    /** */
  ],
  providers: [
    CoreModuleService,
    CoreEnumService,
    CoreTokenAuthUserService,
    CoreTokenAuthUserLogService,
    CoreTokenUserBadLoginService,
    CoreTokenActivationService,
    CoreTokenMicroServiceService,
    CoreLogTokenMicroServiceService,
    CoreTokenConnectionService,
    CoreLogTokenConnectionService,
    CoreUserService,
    CmsConfirmationDialogService,
  ],
})
export class CoreTokenModule {}
