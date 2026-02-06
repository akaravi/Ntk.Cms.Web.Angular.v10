import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SmsComponent } from "./sms.component";
import { SmsRoutes } from "./sms.routing";

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
  SmsActionService,
  SmsEnumService,
  SmsLogInBoxService,
  SmsLogOutBoxService,
  SmsLogOutBoxQueueService,
  SmsLogOutBoxTaskSchedulerService,
  SmsMainApiPathPaginationService,
  SmsMainApiPathService,
  SmsMainMessageContentService,
} from "ntk-cms-api";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";
import { SmsDashboardComponent } from "./dashboard/dashboard.component";
import { SmsActionSendMessageApiComponent } from "./action/send-message-api/send-message-api.component";
import { SmsActionSendMessageApiMobileComponent } from "./action/send-message-api/send-message-api.mobile.component";
import { SmsActionSendMessageCalculateResultComponent } from "./action/send-message/send-message-calculate-result/send-message-calculate-result.component";
import { SmsActionSendMessageResultComponent } from "./action/send-message/send-message-result/send-message-result.component";
import { SmsActionSendMessageComponent } from "./action/send-message/send-message.component";
import { SmsActionSendMessageMobileComponent } from "./action/send-message/send-message.mobile.component";
import { SmsActionComponent } from "./action/sms-action.component";
import { SmsConfigCheckSiteComponent } from "./config/check-site/check-site.component";
import { SmsConfigCheckSiteMobileComponent } from "./config/check-site/check-site.mobile.component";
import { SmsConfigCheckUserComponent } from "./config/check-user/check-user.component";
import { SmsConfigCheckUserMobileComponent } from "./config/check-user/check-user.mobile.component";
import { SmsConfigMainAdminComponent } from "./config/main-admin/config-main-admin.component";
import { SmsConfigMainAdminMobileComponent } from "./config/main-admin/config-main-admin.mobile.component";
import { SmsConfigSiteComponent } from "./config/site/config-site.component";
import { SmsConfigSiteMobileComponent } from "./config/site/config-site.mobile.component";
import { SmsConfigComponent } from "./config/sms-config.component";
import { SmsLogApiPathListComponent } from "./log/api-path/list/list.component";
import { SmsLogApiPathListMobileComponent } from "./log/api-path/list/list.mobile.component";
import { SmsLogInBoxEditComponent } from "./log/inbox/edit/edit.component";
import { SmsLogInBoxListComponent } from "./log/inbox/list/list.component";
import { SmsLogInBoxListMobileComponent } from "./log/inbox/list/list.mobile.component";
import { SmsLogInBoxViewComponent } from "./log/inbox/view/view.component";
import { SmsLogInBoxViewMobileComponent } from "./log/inbox/view/view.mobile.component";
import { SmsLogInBoxWidgetComponent } from "./log/inbox/widget/widget.component";
import { SmsLogInBoxWidgetMobileComponent } from "./log/inbox/widget/widget.mobile.component";
import { SmsLogOutBoxDetailListComponent } from "./log/outbox-detail/list/list.component";
import { SmsLogOutBoxDetailListMobileComponent } from "./log/outbox-detail/list/list.mobile.component";
import { SmsLogOutBoxDetailViewComponent } from "./log/outbox-detail/view/view.component";
import { SmsLogOutBoxDetailViewMobileComponent } from "./log/outbox-detail/view/view.mobile.component";
import { SmsLogOutBoxQueueEditComponent } from "./log/outbox-queue/edit/edit.component";
import { SmsLogOutBoxQueueListComponent } from "./log/outbox-queue/list/list.component";
import { SmsLogOutBoxQueueListMobileComponent } from "./log/outbox-queue/list/list.mobile.component";
import { SmsLogOutBoxQueueViewComponent } from "./log/outbox-queue/view/view.component";
import { SmsLogOutBoxQueueViewMobileComponent } from "./log/outbox-queue/view/view.mobile.component";
import { SmsLogOutBoxQueueWidgetComponent } from "./log/outbox-queue/widget/widget.component";
import { SmsLogOutBoxQueueWidgetMobileComponent } from "./log/outbox-queue/widget/widget.mobile.component";
import { SmsLogOutBoxTaskSchedulerEditComponent } from "./log/outbox-task-scheduler/edit/edit.component";
import { SmsLogOutBoxTaskSchedulerListComponent } from "./log/outbox-task-scheduler/list/list.component";
import { SmsLogOutBoxTaskSchedulerListMobileComponent } from "./log/outbox-task-scheduler/list/list.mobile.component";
import { ScheduleRunInfoListComponent } from "./log/outbox-task-scheduler/schedule-run-info-list/schedule-run-info-list.component";
import { SmsLogOutBoxTaskSchedulerViewComponent } from "./log/outbox-task-scheduler/view/view.component";
import { SmsLogOutBoxTaskSchedulerViewMobileComponent } from "./log/outbox-task-scheduler/view/view.mobile.component";
import { SmsLogOutBoxTaskSchedulerWidgetComponent } from "./log/outbox-task-scheduler/widget/widget.component";
import { SmsLogOutBoxTaskSchedulerWidgetMobileComponent } from "./log/outbox-task-scheduler/widget/widget.mobile.component";
import { SmsLogOutBoxEditComponent } from "./log/outbox/edit/edit.component";
import { SmsLogOutBoxHeaderComponent } from "./log/outbox/header/header.component";
import { SmsLogOutBoxListComponent } from "./log/outbox/list/list.component";
import { SmsLogOutBoxListMobileComponent } from "./log/outbox/list/list.mobile.component";
import { SmsLogOutBoxViewComponent } from "./log/outbox/view/view.component";
import { SmsLogOutBoxViewMobileComponent } from "./log/outbox/view/view.mobile.component";
import { SmsLogOutBoxWidgetComponent } from "./log/outbox/widget/widget.component";
import { SmsLogOutBoxWidgetMobileComponent } from "./log/outbox/widget/widget.mobile.component";
import { SmsLogComponent } from "./log/sms-log.component";
import { SmsMainApiNumberPermissionAddComponent } from "./main/api-number-permission/add/add.component";
import { SmsMainApiNumberPermissionAddMobileComponent } from "./main/api-number-permission/add/add.mobile.component";
import { SmsMainApiNumberPermissionEditComponent } from "./main/api-number-permission/edit/edit.component";
import { SmsMainApiNumberPermissionEditMobileComponent } from "./main/api-number-permission/edit/edit.mobile.component";
import { SmsMainApiNumberPermissionListComponent } from "./main/api-number-permission/list/list.component";
import { SmsMainApiNumberPermissionListMobileComponent } from "./main/api-number-permission/list/list.mobile.component";
import { SmsMainApiNumberAddComponent } from "./main/api-number/add/add.component";
import { SmsMainApiNumberAddMobileComponent } from "./main/api-number/add/add.mobile.component";
import { SmsMainApiNumberEditComponent } from "./main/api-number/edit/edit.component";
import { SmsMainApiNumberEditMobileComponent } from "./main/api-number/edit/edit.mobile.component";
import { SmsMainApiNumberHeaderComponent } from "./main/api-number/header/header.component";
import { SmsMainApiNumberListComponent } from "./main/api-number/list/list.component";
import { SmsMainApiNumberListMobileComponent } from "./main/api-number/list/list.mobile.component";
import { SmsMainApiNumberSelectorComponent } from "./main/api-number/selector/selector.component";
import { SmsMainApiPathCompanyAddComponent } from "./main/api-path-company/add/add.component";
import { SmsMainApiPathCompanyAddMobileComponent } from "./main/api-path-company/add/add.mobile.component";
import { SmsMainApiPathCompanyEditComponent } from "./main/api-path-company/edit/edit.component";
import { SmsMainApiPathCompanyEditMobileComponent } from "./main/api-path-company/edit/edit.mobile.component";
import { SmsMainApiPathCompanyListComponent } from "./main/api-path-company/list/list.component";
import { SmsMainApiPathCompanyListMobileComponent } from "./main/api-path-company/list/list.mobile.component";
import { SmsMainApiPathCompanySelectorComponent } from "./main/api-path-company/selector/selector.component";
import { SmsMainApiPathCompanyTreeComponent } from "./main/api-path-company/tree/tree.component";
import { SmsMainApiPathCompanyTreeMobileComponent } from "./main/api-path-company/tree/tree.mobile.component";
import { SmsMainApiPathPaginationAddComponent } from "./main/api-path-pagination/add/add.component";
import { SmsMainApiPathPaginationAddMobileComponent } from "./main/api-path-pagination/add/add.mobile.component";
import { SmsMainApiPathPaginationEditComponent } from "./main/api-path-pagination/edit/edit.component";
import { SmsMainApiPathPaginationEditMobileComponent } from "./main/api-path-pagination/edit/edit.mobile.component";
import { SmsMainApiPathPaginationHeaderComponent } from "./main/api-path-pagination/header/header.component";
import { SmsMainApiPathPaginationListComponent } from "./main/api-path-pagination/list/list.component";
import { SmsMainApiPathPaginationListMobileComponent } from "./main/api-path-pagination/list/list.mobile.component";
import { SmsMainApiPathPaginationSelectorComponent } from "./main/api-path-pagination/selector/selector.component";
import { SmsMainApiPathPaginationTreeComponent } from "./main/api-path-pagination/tree/tree.component";
import { SmsMainApiPathPaginationTreeMobileComponent } from "./main/api-path-pagination/tree/tree.mobile.component";
import { SmsMainApiPathPermissionAddComponent } from "./main/api-path-permission/add/add.component";
import { SmsMainApiPathPermissionAddMobileComponent } from "./main/api-path-permission/add/add.mobile.component";
import { SmsMainApiPathPermissionEditComponent } from "./main/api-path-permission/edit/edit.component";
import { SmsMainApiPathPermissionEditMobileComponent } from "./main/api-path-permission/edit/edit.mobile.component";
import { SmsMainApiPathPermissionListComponent } from "./main/api-path-permission/list/list.component";
import { SmsMainApiPathPermissionListMobileComponent } from "./main/api-path-permission/list/list.mobile.component";
import { SmsMainApiPathPricePermissionAddComponent } from "./main/api-path-price-permission/add/add.component";
import { SmsMainApiPathPricePermissionAddMobileComponent } from "./main/api-path-price-permission/add/add.mobile.component";
import { SmsMainApiPathPricePermissionEditComponent } from "./main/api-path-price-permission/edit/edit.component";
import { SmsMainApiPathPricePermissionEditMobileComponent } from "./main/api-path-price-permission/edit/edit.mobile.component";
import { SmsMainApiPathPricePermissionListComponent } from "./main/api-path-price-permission/list/list.component";
import { SmsMainApiPathPricePermissionListMobileComponent } from "./main/api-path-price-permission/list/list.mobile.component";
import { SmsMainApiPathAddComponent } from "./main/api-path/add/add.component";
import { SmsMainApiPathAddMobileComponent } from "./main/api-path/add/add.mobile.component";
import { SmsMainApiPathEditComponent } from "./main/api-path/edit/edit.component";
import { SmsMainApiPathEditMobileComponent } from "./main/api-path/edit/edit.mobile.component";
import { SmsMainApiPathHeaderComponent } from "./main/api-path/header/header.component";
import { SmsMainApiPathListComponent } from "./main/api-path/list/list.component";
import { SmsMainApiPathListMobileComponent } from "./main/api-path/list/list.mobile.component";
import { SmsMainApiPathSelectionlistComponent } from "./main/api-path/selectionlist/selectionlist.component";
import { SmsMainApiPathSelectorComponent } from "./main/api-path/selector/selector.component";
import { SmsMainApiPathSendTestComponent } from "./main/api-path/sendTest/sendTest.component";
import { SmsMainApiPathTreeComponent } from "./main/api-path/tree/tree.component";
import { SmsMainApiPathTreeMobileComponent } from "./main/api-path/tree/tree.mobile.component";
import { SmsMainClientApplicationPermissionAddComponent } from "./main/client-application-permission/add/add.component";
import { SmsMainClientApplicationPermissionEditComponent } from "./main/client-application-permission/edit/edit.component";
import { SmsMainClientApplicationPermissionListComponent } from "./main/client-application-permission/list/list.component";
import { SmsMainClientApplicationPermissionListMobileComponent } from "./main/client-application-permission/list/list.mobile.component";
import { SmsMainClientApplicationAddComponent } from "./main/client-application/add/add.component";
import { SmsMainClientApplicationAddMobileComponent } from "./main/client-application/add/add.mobile.component";
import { SmsMainClientApplicationEditComponent } from "./main/client-application/edit/edit.component";
import { SmsMainClientApplicationEditMobileComponent } from "./main/client-application/edit/edit.mobile.component";
import { SmsMainClientApplicationListComponent } from "./main/client-application/list/list.component";
import { SmsMainClientApplicationListMobileComponent } from "./main/client-application/list/list.mobile.component";
import { SmsMainClientApplicationSelectorComponent } from "./main/client-application/selector/selector.component";
import { SmsMainMessageCategoryAddComponent } from "./main/message-category/add/add.component";
import { SmsMainMessageCategoryDeleteComponent } from "./main/message-category/delete/delete.component";
import { SmsMainMessageCategoryEditComponent } from "./main/message-category/edit/edit.component";
import { SmsMainMessageCategorySelectorComponent } from "./main/message-category/selector/selector.component";
import { SmsMainMessageCategoryTreeComponent } from "./main/message-category/tree/tree.component";
import { SmsMainMessageCategoryTreeMobileComponent } from "./main/message-category/tree/tree.mobile.component";
import { SmsMainMessageContentAddComponent } from "./main/message-content/add/add.component";
import { SmsMainMessageContentAddMobileComponent } from "./main/message-content/add/add.mobile.component";
import { SmsMainMessageContentEditComponent } from "./main/message-content/edit/edit.component";
import { SmsMainMessageContentEditMobileComponent } from "./main/message-content/edit/edit.mobile.component";
import { SmsMainMessageContentListComponent } from "./main/message-content/list/list.component";
import { SmsMainMessageContentListMobileComponent } from "./main/message-content/list/list.mobile.component";
import { SmsMainMessageContentSelectorComponent } from "./main/message-content/selector/selector.component";
import { SmsMainApiPathPublicConfigAddComponent } from "./main/public-config/add/add.component";
import { SmsMainApiPathPublicConfigAddMobileComponent } from "./main/public-config/add/add.mobile.component";
import { SmsMainApiPathPublicConfigEditComponent } from "./main/public-config/edit/edit.component";
import { SmsMainApiPathPublicConfigEditMobileComponent } from "./main/public-config/edit/edit.mobile.component";
import { SmsMainApiPathPublicConfigHeaderComponent } from "./main/public-config/header/header.component";
import { SmsMainApiPathPublicConfigListComponent } from "./main/public-config/list/list.component";
import { SmsMainApiPathPublicConfigListMobileComponent } from "./main/public-config/list/list.mobile.component";
import { SmsMainApiPathPublicConfigSelectorComponent } from "./main/public-config/selector/selector.component";
import { SmsMainApiPathPublicConfigTreeComponent } from "./main/public-config/tree/tree.component";
import { SmsMainApiPathPublicConfigTreeMobileComponent } from "./main/public-config/tree/tree.mobile.component";
import { SmsMainComponent } from "./main/sms-main.component";
import { SmsMessageTypeEnumSelectionlistComponent } from "./shared/sms-message-type-enum/selectionlist/selectionlist.component";
import { SmsMessageTypeEnumSelectorComponent } from "./shared/sms-message-type-enum/selector/selector.component";
import { SmsOutBoxTypeEnumSelectionlistComponent } from "./shared/sms-out-box-type-enum/selectionlist/selectionlist.component";
import { SmsOutBoxTypeEnumSelectorComponent } from "./shared/sms-out-box-type-enum/selector/selector.component";

@NgModule({
  declarations: [SmsComponent, SmsDashboardComponent
    SmsActionSendMessageApiComponent,
    SmsActionSendMessageApiMobileComponent,
    SmsActionSendMessageCalculateResultComponent,
    SmsActionSendMessageResultComponent,
    SmsActionSendMessageComponent,
    SmsActionSendMessageMobileComponent,
    SmsActionComponent,
    SmsConfigCheckSiteComponent,
    SmsConfigCheckSiteMobileComponent,
    SmsConfigCheckUserComponent,
    SmsConfigCheckUserMobileComponent,
    SmsConfigMainAdminComponent,
    SmsConfigMainAdminMobileComponent,
    SmsConfigSiteComponent,
    SmsConfigSiteMobileComponent,
    SmsConfigComponent,
    SmsLogApiPathListComponent,
    SmsLogApiPathListMobileComponent,
    SmsLogInBoxEditComponent,
    SmsLogInBoxListComponent,
    SmsLogInBoxListMobileComponent,
    SmsLogInBoxViewComponent,
    SmsLogInBoxViewMobileComponent,
    SmsLogInBoxWidgetComponent,
    SmsLogInBoxWidgetMobileComponent,
    SmsLogOutBoxDetailListComponent,
    SmsLogOutBoxDetailListMobileComponent,
    SmsLogOutBoxDetailViewComponent,
    SmsLogOutBoxDetailViewMobileComponent,
    SmsLogOutBoxQueueEditComponent,
    SmsLogOutBoxQueueListComponent,
    SmsLogOutBoxQueueListMobileComponent,
    SmsLogOutBoxQueueViewComponent,
    SmsLogOutBoxQueueViewMobileComponent,
    SmsLogOutBoxQueueWidgetComponent,
    SmsLogOutBoxQueueWidgetMobileComponent,
    SmsLogOutBoxTaskSchedulerEditComponent,
    SmsLogOutBoxTaskSchedulerListComponent,
    SmsLogOutBoxTaskSchedulerListMobileComponent,
    ScheduleRunInfoListComponent,
    SmsLogOutBoxTaskSchedulerViewComponent,
    SmsLogOutBoxTaskSchedulerViewMobileComponent,
    SmsLogOutBoxTaskSchedulerWidgetComponent,
    SmsLogOutBoxTaskSchedulerWidgetMobileComponent,
    SmsLogOutBoxEditComponent,
    SmsLogOutBoxHeaderComponent,
    SmsLogOutBoxListComponent,
    SmsLogOutBoxListMobileComponent,
    SmsLogOutBoxViewComponent,
    SmsLogOutBoxViewMobileComponent,
    SmsLogOutBoxWidgetComponent,
    SmsLogOutBoxWidgetMobileComponent,
    SmsLogComponent,
    SmsMainApiNumberPermissionAddComponent,
    SmsMainApiNumberPermissionAddMobileComponent,
    SmsMainApiNumberPermissionEditComponent,
    SmsMainApiNumberPermissionEditMobileComponent,
    SmsMainApiNumberPermissionListComponent,
    SmsMainApiNumberPermissionListMobileComponent,
    SmsMainApiNumberAddComponent,
    SmsMainApiNumberAddMobileComponent,
    SmsMainApiNumberEditComponent,
    SmsMainApiNumberEditMobileComponent,
    SmsMainApiNumberHeaderComponent,
    SmsMainApiNumberListComponent,
    SmsMainApiNumberListMobileComponent,
    SmsMainApiNumberSelectorComponent,
    SmsMainApiPathCompanyAddComponent,
    SmsMainApiPathCompanyAddMobileComponent,
    SmsMainApiPathCompanyEditComponent,
    SmsMainApiPathCompanyEditMobileComponent,
    SmsMainApiPathCompanyListComponent,
    SmsMainApiPathCompanyListMobileComponent,
    SmsMainApiPathCompanySelectorComponent,
    SmsMainApiPathCompanyTreeComponent,
    SmsMainApiPathCompanyTreeMobileComponent,
    SmsMainApiPathPaginationAddComponent,
    SmsMainApiPathPaginationAddMobileComponent,
    SmsMainApiPathPaginationEditComponent,
    SmsMainApiPathPaginationEditMobileComponent,
    SmsMainApiPathPaginationHeaderComponent,
    SmsMainApiPathPaginationListComponent,
    SmsMainApiPathPaginationListMobileComponent,
    SmsMainApiPathPaginationSelectorComponent,
    SmsMainApiPathPaginationTreeComponent,
    SmsMainApiPathPaginationTreeMobileComponent,
    SmsMainApiPathPermissionAddComponent,
    SmsMainApiPathPermissionAddMobileComponent,
    SmsMainApiPathPermissionEditComponent,
    SmsMainApiPathPermissionEditMobileComponent,
    SmsMainApiPathPermissionListComponent,
    SmsMainApiPathPermissionListMobileComponent,
    SmsMainApiPathPricePermissionAddComponent,
    SmsMainApiPathPricePermissionAddMobileComponent,
    SmsMainApiPathPricePermissionEditComponent,
    SmsMainApiPathPricePermissionEditMobileComponent,
    SmsMainApiPathPricePermissionListComponent,
    SmsMainApiPathPricePermissionListMobileComponent,
    SmsMainApiPathAddComponent,
    SmsMainApiPathAddMobileComponent,
    SmsMainApiPathEditComponent,
    SmsMainApiPathEditMobileComponent,
    SmsMainApiPathHeaderComponent,
    SmsMainApiPathListComponent,
    SmsMainApiPathListMobileComponent,
    SmsMainApiPathSelectionlistComponent,
    SmsMainApiPathSelectorComponent,
    SmsMainApiPathSendTestComponent,
    SmsMainApiPathTreeComponent,
    SmsMainApiPathTreeMobileComponent,
    SmsMainClientApplicationPermissionAddComponent,
    SmsMainClientApplicationPermissionEditComponent,
    SmsMainClientApplicationPermissionListComponent,
    SmsMainClientApplicationPermissionListMobileComponent,
    SmsMainClientApplicationAddComponent,
    SmsMainClientApplicationAddMobileComponent,
    SmsMainClientApplicationEditComponent,
    SmsMainClientApplicationEditMobileComponent,
    SmsMainClientApplicationListComponent,
    SmsMainClientApplicationListMobileComponent,
    SmsMainClientApplicationSelectorComponent,
    SmsMainMessageCategoryAddComponent,
    SmsMainMessageCategoryDeleteComponent,
    SmsMainMessageCategoryEditComponent,
    SmsMainMessageCategorySelectorComponent,
    SmsMainMessageCategoryTreeComponent,
    SmsMainMessageCategoryTreeMobileComponent,
    SmsMainMessageContentAddComponent,
    SmsMainMessageContentAddMobileComponent,
    SmsMainMessageContentEditComponent,
    SmsMainMessageContentEditMobileComponent,
    SmsMainMessageContentListComponent,
    SmsMainMessageContentListMobileComponent,
    SmsMainMessageContentSelectorComponent,
    SmsMainApiPathPublicConfigAddComponent,
    SmsMainApiPathPublicConfigAddMobileComponent,
    SmsMainApiPathPublicConfigEditComponent,
    SmsMainApiPathPublicConfigEditMobileComponent,
    SmsMainApiPathPublicConfigHeaderComponent,
    SmsMainApiPathPublicConfigListComponent,
    SmsMainApiPathPublicConfigListMobileComponent,
    SmsMainApiPathPublicConfigSelectorComponent,
    SmsMainApiPathPublicConfigTreeComponent,
    SmsMainApiPathPublicConfigTreeMobileComponent,
    SmsMainComponent,
    SmsMessageTypeEnumSelectionlistComponent,
    SmsMessageTypeEnumSelectorComponent,
    SmsOutBoxTypeEnumSelectionlistComponent,
    SmsOutBoxTypeEnumSelectorComponent,],
  imports: [
    CommonModule,
    SmsRoutes,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),

    SharedModule,
    AngularEditorModule,

    MatIconModule,
    MatFormFieldModule,
    MatStepperModule,
    RouterModule,
  ],
  providers: [
    CoreModuleService,
    CoreEnumService,
    CoreAuthV3Service,
    /*Config*/
    CmsConfirmationDialogService,
    /*Config*/
    CmsConfirmationDialogService,
    SmsEnumService,
    SmsActionService,
    CoreModuleTagService,
    SmsMainApiPathPaginationService,
    /*Dashboard*/
    SmsLogInBoxService,
    SmsLogOutBoxService,
    SmsLogOutBoxQueueService,
    SmsLogOutBoxTaskSchedulerService,
    SmsMainApiPathService,
    SmsMainMessageContentService,
    /*Dashboard*/
  ],
})
export class SmsModule {}
