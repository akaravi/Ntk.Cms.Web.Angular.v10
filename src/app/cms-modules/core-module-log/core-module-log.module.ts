import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CoreModuleLogComponent } from "./core-module-log.component";
import { CoreModuleLogRoutes } from "./core-module-log.routing";

import { AngularEditorModule } from "@kolkov/angular-editor";
import { CmsFileManagerModule } from "ntk-cms-filemanager";
import { SharedModule } from "src/app/shared/shared.module";

import {
  CoreModuleDataMemoService,
  CoreModuleLogContentCountService,
  CoreModuleLogFavoriteService,
  CoreModuleLogLikeService,
  CoreModuleLogReportAbuseService,
  CoreModuleLogScoreService,
  CoreModuleLogShowKeyService,
  CoreModuleLogSiteCreditBlockedService,
  CoreModuleLogSiteCreditService,
  CoreModuleLogSiteUserCreditBlockedService,
  CoreModuleLogSiteUserCreditService,
  CoreModuleService,
  CoreModuleSiteCreditService,
  CoreModuleSiteUserCreditService,
  CoreModuleTagCategoryService,
  CoreModuleTagService,
} from "ntk-cms-api";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";
import { CoreModuleLogContentCountEditComponent } from "./content-count/edit/edit.component";
import { CoreModuleLogContentCountListComponent } from "./content-count/list/list.component";
import { CoreModuleLogContentCountListMobileComponent } from "./content-count/list/list.mobile.component";
import { CoreModuleLogContentCountViewComponent } from "./content-count/view/view.component";
import { CoreModuleLogFavoriteEditComponent } from "./favorite/edit/edit.component";
import { CoreModuleLogFavoriteListComponent } from "./favorite/list/list.component";
import { CoreModuleLogFavoriteListMobileComponent } from "./favorite/list/list.mobile.component";
import { CoreModuleLogFavoriteViewComponent } from "./favorite/view/view.component";
import { CoreModuleLogLikeEditComponent } from "./like/edit/edit.component";
import { CoreModuleLogLikeListComponent } from "./like/list/list.component";
import { CoreModuleLogLikeListMobileComponent } from "./like/list/list.mobile.component";
import { CoreModuleLogLikeViewComponent } from "./like/view/view.component";
import { CoreModuleLogReportAbuseEditComponent } from "./report-abuse/edit/edit.component";
import { CoreModuleLogReportAbuseListComponent } from "./report-abuse/list/list.component";
import { CoreModuleLogReportAbuseListMobileComponent } from "./report-abuse/list/list.mobile.component";
import { CoreModuleLogReportAbuseViewComponent } from "./report-abuse/view/view.component";
import { CoreModuleLogScoreEditComponent } from "./score/edit/edit.component";
import { CoreModuleLogScoreListComponent } from "./score/list/list.component";
import { CoreModuleLogScoreListMobileComponent } from "./score/list/list.mobile.component";
import { CoreModuleLogScoreViewComponent } from "./score/view/view.component";
import { CoreModuleLogShowKeyAddComponent } from "./show-key/add/add.component";
import { CoreModuleLogShowKeyEditComponent } from "./show-key/edit/edit.component";
import { CoreModuleLogShowKeyListComponent } from "./show-key/list/list.component";
import { CoreModuleLogShowKeyListMobileComponent } from "./show-key/list/list.mobile.component";
import { CoreModuleLogShowKeyViewComponent } from "./show-key/view/view.component";
import { CoreModuleLogSiteCreditBlockedEditComponent } from "./site-credit-blocked/edit/edit.component";
import { CoreModuleLogSiteCreditBlockedListComponent } from "./site-credit-blocked/list/list.component";
import { CoreModuleLogSiteCreditBlockedListMobileComponent } from "./site-credit-blocked/list/list.mobile.component";
import { CoreModuleLogSiteCreditBlockedViewComponent } from "./site-credit-blocked/view/view.component";
import { CoreModuleLogSiteCreditEditComponent } from "./site-credit/edit/edit.component";
import { CoreModuleLogSiteCreditListComponent } from "./site-credit/list/list.component";
import { CoreModuleLogSiteCreditListMobileComponent } from "./site-credit/list/list.mobile.component";
import { CoreModuleLogSiteCreditViewComponent } from "./site-credit/view/view.component";
import { CoreModuleLogSiteUserCreditBlockedEditComponent } from "./site-user-credit-blocked/edit/edit.component";
import { CoreModuleLogSiteUserCreditBlockedListComponent } from "./site-user-credit-blocked/list/list.component";
import { CoreModuleLogSiteUserCreditBlockedListMobileComponent } from "./site-user-credit-blocked/list/list.mobile.component";
import { CoreModuleLogSiteUserCreditBlockedViewComponent } from "./site-user-credit-blocked/view/view.component";
import { CoreModuleLogSiteUserCreditEditComponent } from "./site-user-credit/edit/edit.component";
import { CoreModuleLogSiteUserCreditListComponent } from "./site-user-credit/list/list.component";
import { CoreModuleLogSiteUserCreditListMobileComponent } from "./site-user-credit/list/list.mobile.component";
import { CoreModuleLogSiteUserCreditViewComponent } from "./site-user-credit/view/view.component";
import { CoreSharedModule } from "../core-main/core.shared.module";

@NgModule({
  imports: [
    CoreModuleLogRoutes,
    CommonModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),

    SharedModule,
    AngularEditorModule,

    CoreSharedModule,

    CmsFileManagerModule,
  ],
  declarations: [
    CoreModuleLogComponent,

    /**ShowKey */
    CoreModuleLogShowKeyListComponent,
    CoreModuleLogShowKeyListMobileComponent,
    CoreModuleLogShowKeyEditComponent,
    CoreModuleLogShowKeyAddComponent,
    CoreModuleLogShowKeyViewComponent,
    /**ReportAbuse */
    CoreModuleLogReportAbuseListComponent,
    CoreModuleLogReportAbuseListMobileComponent,
    CoreModuleLogReportAbuseEditComponent,
    CoreModuleLogReportAbuseViewComponent,
    /**Favorite */
    CoreModuleLogFavoriteListComponent,
    CoreModuleLogFavoriteListMobileComponent,
    CoreModuleLogFavoriteEditComponent,
    CoreModuleLogFavoriteViewComponent,
    /**ContentCount */
    CoreModuleLogContentCountListComponent,
    CoreModuleLogContentCountListMobileComponent,
    CoreModuleLogContentCountEditComponent,
    CoreModuleLogContentCountViewComponent,
    /**Like */
    CoreModuleLogLikeListComponent,
    CoreModuleLogLikeListMobileComponent,
    CoreModuleLogLikeEditComponent,
    CoreModuleLogLikeViewComponent,
    /**score */
    CoreModuleLogScoreListComponent,
    CoreModuleLogScoreListMobileComponent,
    CoreModuleLogScoreEditComponent,
    CoreModuleLogScoreViewComponent,
    /**SiteCreditBlocked */
    CoreModuleLogSiteCreditBlockedListComponent,
    CoreModuleLogSiteCreditBlockedListMobileComponent,
    CoreModuleLogSiteCreditBlockedEditComponent,
    CoreModuleLogSiteCreditBlockedViewComponent,
    /**SiteUserCreditBlocked */
    CoreModuleLogSiteUserCreditBlockedListComponent,
    CoreModuleLogSiteUserCreditBlockedListMobileComponent,
    CoreModuleLogSiteUserCreditBlockedEditComponent,
    CoreModuleLogSiteUserCreditBlockedViewComponent,
    /**SiteCredit */
    CoreModuleLogSiteCreditListComponent,
    CoreModuleLogSiteCreditListMobileComponent,
    CoreModuleLogSiteCreditEditComponent,
    CoreModuleLogSiteCreditViewComponent,
    /**SiteUserCredit */
    CoreModuleLogSiteUserCreditListComponent,
    CoreModuleLogSiteUserCreditListMobileComponent,
    CoreModuleLogSiteUserCreditEditComponent,
    CoreModuleLogSiteUserCreditViewComponent,
  ],
  exports: [
    CoreModuleLogComponent,

    /**ReportAbuse */
    CoreModuleLogReportAbuseListComponent,
    CoreModuleLogReportAbuseListMobileComponent,
    CoreModuleLogReportAbuseEditComponent,
    CoreModuleLogReportAbuseViewComponent,
    /**Favorite */
    CoreModuleLogFavoriteListComponent,
    CoreModuleLogFavoriteListMobileComponent,
    CoreModuleLogFavoriteEditComponent,
    CoreModuleLogFavoriteViewComponent,
    /**ContentCount */
    CoreModuleLogContentCountListComponent,
    CoreModuleLogContentCountListMobileComponent,
    CoreModuleLogContentCountEditComponent,
    CoreModuleLogContentCountViewComponent,
    /**Like */
    CoreModuleLogLikeListComponent,
    CoreModuleLogLikeListMobileComponent,
    CoreModuleLogLikeEditComponent,
    CoreModuleLogLikeViewComponent,
    /**score */
    CoreModuleLogScoreListComponent,
    CoreModuleLogScoreListMobileComponent,
    CoreModuleLogScoreEditComponent,
    CoreModuleLogScoreViewComponent,
    /**SiteCreditBlocked */
    CoreModuleLogSiteCreditBlockedListComponent,
    CoreModuleLogSiteCreditBlockedListMobileComponent,
    CoreModuleLogSiteCreditBlockedEditComponent,
    CoreModuleLogSiteCreditBlockedViewComponent,
    /**SiteUserCreditBlocked */
    CoreModuleLogSiteUserCreditBlockedListComponent,
    CoreModuleLogSiteUserCreditBlockedListMobileComponent,
    CoreModuleLogSiteUserCreditBlockedEditComponent,
    CoreModuleLogSiteUserCreditBlockedViewComponent,
    /**SiteCredit */
    CoreModuleLogSiteCreditListComponent,
    CoreModuleLogSiteCreditListMobileComponent,
    CoreModuleLogSiteCreditEditComponent,
    CoreModuleLogSiteCreditViewComponent,
    /**SiteUserCredit */
    CoreModuleLogSiteUserCreditListComponent,
    CoreModuleLogSiteUserCreditListMobileComponent,
    CoreModuleLogSiteUserCreditEditComponent,
    CoreModuleLogSiteUserCreditViewComponent,
  ],
  providers: [
    CoreModuleService,
    CoreModuleTagService,
    CoreModuleTagCategoryService,
    CoreModuleSiteCreditService,
    CoreModuleSiteUserCreditService,
    CoreModuleLogFavoriteService,
    CoreModuleLogContentCountService,
    CoreModuleLogLikeService,
    CoreModuleDataMemoService,
    CoreModuleLogShowKeyService,
    CoreModuleLogReportAbuseService,
    CoreModuleLogScoreService,
    CoreModuleLogSiteCreditBlockedService,
    CoreModuleLogSiteUserCreditBlockedService,
    CoreModuleLogSiteCreditService,
    CoreModuleLogSiteUserCreditService,
    CmsConfirmationDialogService,
  ],
})
export class CoreModuleLogModule {}
