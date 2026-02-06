import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CoreLogComponent } from "./coreLog.component";
import { CoreLogRoutes } from "./coreLog.routing";

import { AngularEditorModule } from "@kolkov/angular-editor";
import { CmsFileManagerModule } from "ntk-cms-filemanager";
import { SharedModule } from "src/app/shared/shared.module";

import {
  CoreLogAvoidDuplicateDataEntryService,
  CoreLogCurrencyService,
  CoreLogErrorService,
  CoreLogMemberService,
  CoreLogNotificationService,
  CoreLogReportDataService,
  CoreLogSmsService,
  CoreLogEmailService,
  CoreModuleService,
} from "ntk-cms-api";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";
import { CoreLogAvoidDuplicateDataEntryEditComponent } from "./avoid-duplicate/edit/edit.component";
import { CoreLogAvoidDuplicateDataEntryListComponent } from "./avoid-duplicate/list/list.component";
import { CoreLogCurrencyListComponent } from "./currency/list/list.component";
import { CoreLogCurrencyViewComponent } from "./currency/view/view.component";
import { CoreLogErrorEditComponent } from "./error/edit/edit.component";
import { CoreLogErrorListComponent } from "./error/list/list.component";
import { CoreLogMemberEditComponent } from "./member/edit/edit.component";
import { CoreLogMemberListComponent } from "./member/list/list.component";
import { CoreLogMemberViewComponent } from "./member/view/view.component";
import { CoreLogNotificationEditComponent } from "./notification/edit/edit.component";
import { CoreLogNotificationListComponent } from "./notification/list/list.component";
import { CoreLogNotificationViewComponent } from "./notification/view/view.component";
import { CoreLogReportDataEditComponent } from "./report-data/edit/edit.component";
import { CoreLogReportDataListComponent } from "./report-data/list/list.component";
import { CoreLogReportDataViewComponent } from "./report-data/view/view.component";
import { CoreLogSmsEditComponent } from "./sms/edit/edit.component";
import { CoreLogSmsListComponent } from "./sms/list/list.component";
import { CoreLogSmsViewComponent } from "./sms/view/view.component";
import { CoreLogSmsViewMobileComponent } from "./sms/view/view.mobile.component";
import { CoreLogEmailEditComponent } from "./email/edit/edit.component";
import { CoreLogEmailListComponent } from "./email/list/list.component";
import { CoreLogEmailViewComponent } from "./email/view/view.component";
import { CoreLogAvoidDuplicateDataEntryListMobileComponent } from "./avoid-duplicate/list/list.mobile.component";
import { CoreLogCurrencyListMobileComponent } from "./currency/list/list.mobile.component";
import { CoreLogEmailListMobileComponent } from "./email/list/list.mobile.component";
import { CoreLogErrorListMobileComponent } from "./error/list/list.mobile.component";
import { CoreLogMemberListMobileComponent } from "./member/list/list.mobile.component";
import { CoreLogNotificationListMobileComponent } from "./notification/list/list.mobile.component";
import { CoreLogReportDataListMobileComponent } from "./report-data/list/list.mobile.component";
import { CoreLogSmsListMobileComponent } from "./sms/list/list.mobile.component";

@NgModule({
  imports: [
    CoreLogRoutes,
    CommonModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),

    SharedModule,
    AngularEditorModule,

    CmsFileManagerModule,
  ],
  declarations: [
    CoreLogComponent,
    /** */
    CoreLogSmsListComponent,
    CoreLogSmsEditComponent,
    CoreLogSmsViewComponent,
    CoreLogSmsViewMobileComponent,
    /** */
    CoreLogEmailListComponent,
    CoreLogEmailEditComponent,
    CoreLogEmailViewComponent,
    /** */
    CoreLogNotificationListComponent,
    CoreLogNotificationEditComponent,
    CoreLogNotificationViewComponent,
    /** */
    CoreLogMemberListComponent,
    CoreLogMemberEditComponent,
    CoreLogMemberViewComponent,
    /** */
    CoreLogErrorListComponent,
    CoreLogErrorEditComponent,
    /** */
    CoreLogAvoidDuplicateDataEntryListComponent,
    CoreLogAvoidDuplicateDataEntryEditComponent,
    /** */
    CoreLogCurrencyListComponent,
    CoreLogCurrencyViewComponent,
    /** */
    CoreLogReportDataListComponent,
    CoreLogReportDataEditComponent,
    CoreLogReportDataViewComponent,
    CoreLogAvoidDuplicateDataEntryListMobileComponent,
    CoreLogCurrencyListMobileComponent,
    CoreLogEmailListMobileComponent,
    CoreLogErrorListMobileComponent,
    CoreLogMemberListMobileComponent,
    CoreLogNotificationListMobileComponent,
    CoreLogReportDataListMobileComponent,
    CoreLogSmsListMobileComponent,
  ],
  exports: [
    CoreLogComponent,
    /** */
    CoreLogSmsListComponent,
    CoreLogSmsEditComponent,
    CoreLogSmsViewComponent,
    CoreLogSmsViewMobileComponent,
    /** */
    CoreLogEmailListComponent,
    CoreLogEmailEditComponent,
    CoreLogEmailViewComponent,
    /** */
    CoreLogNotificationListComponent,
    CoreLogNotificationEditComponent,
    CoreLogNotificationViewComponent,
    /** */
    CoreLogMemberListComponent,
    CoreLogMemberEditComponent,
    CoreLogMemberViewComponent,
    /** */
    CoreLogErrorListComponent,
    CoreLogErrorEditComponent,
    /** */
    CoreLogAvoidDuplicateDataEntryListComponent,
    CoreLogAvoidDuplicateDataEntryEditComponent,
    /** */
    CoreLogCurrencyListComponent,
    CoreLogCurrencyViewComponent,
    /** */
    CoreLogReportDataListComponent,
    CoreLogReportDataEditComponent,
    CoreLogReportDataViewComponent,
  ],
  providers: [
    CoreModuleService,
    CoreLogErrorService,
    CoreLogSmsService,
    CoreLogEmailService,
    CoreLogNotificationService,
    CoreLogMemberService,
    CoreLogCurrencyService,
    CoreLogAvoidDuplicateDataEntryService,
    CoreLogReportDataService,
    CmsConfirmationDialogService,
  ],
})
export class CoreLogModule {}
