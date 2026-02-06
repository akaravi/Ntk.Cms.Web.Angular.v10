import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CoreConfigurationService, CoreCpMainMenuService } from "ntk-cms-api";
import { ApplicationWidgetModule } from "src/app/cms-modules/application/shared/application-widget.module";
import { ArticleWidgetModule } from "src/app/cms-modules/article/shared/article-widget.module";
import { BiographyWidgetModule } from "src/app/cms-modules/biography/shared/biography-widget.module";
import { BlogWidgetModule } from "src/app/cms-modules/blog/shared/blog-widget.module";
import { CatalogWidgetModule } from "src/app/cms-modules/catalog/shared/catalog-widget.module";
import { ChartWidgetModule } from "src/app/cms-modules/chart/shared/chart-widget.module";
import { CoreMainWidgetModule } from "src/app/cms-modules/core-main/shared/core-main-widget.module";
import { CoreModuleWidgetModule } from "src/app/cms-modules/core-module/shared/core-module-widget.module";
import { EstateWidgetModule } from "src/app/cms-modules/estate/shared/estate-widget.module";
import { NewsWidgetModule } from "src/app/cms-modules/news/shared/news-widget.module";
import { SmsWidgetModule } from "src/app/cms-modules/sms/shared/sms-widget.module";
import { TicketingWidgetModule } from "src/app/cms-modules/ticketing/shared/ticketing-widget.module";
import { WebDesignerWidgetModule } from "src/app/cms-modules/web-designer/shared/web-designer-widget.module";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";

import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { ApiTelegramActionSendMessageSimpleComponent } from "./api-telegram/action/send-message-simple/send-message-simple.component";
import { ApiTelegramActionSendMessageComponent } from "./api-telegram/action/send-message/send-message.component";
import { ApiTelegramComponent } from "./api-telegram/api-telegram.component";
import { ApiTelegramBotConfigAddComponent } from "./api-telegram/bot-config/add/add.component";
import { ApiTelegramBotConfigEditComponent } from "./api-telegram/bot-config/edit/edit.component";
import { ApiTelegramBotConfigListComponent } from "./api-telegram/bot-config/list/list.component";
import { ApiTelegramBotConfigListMobileComponent } from "./api-telegram/bot-config/list/list.mobile.component";
import { ApiTelegramBotConfigSelectorComponent } from "./api-telegram/bot-config/selector/selector.component";
import { ApiTelegramConfigComponent } from "./api-telegram/config/api-telegram-config.component";
import { ApiTelegramConfigCheckSiteComponent } from "./api-telegram/config/check-site/check-site.component";
import { ApiTelegramConfigCheckUserComponent } from "./api-telegram/config/check-user/check-user.component";
import { ApiTelegramConfigMainAdminComponent } from "./api-telegram/config/main-admin/config-main-admin.component";
import { ApiTelegramConfigSiteComponent } from "./api-telegram/config/site/config-site.component";
import { ApiTelegramLogInputListComponent } from "./api-telegram/log-input/list/list.component";
import { ApiTelegramLogInputListMobileComponent } from "./api-telegram/log-input/list/list.mobile.component";
import { ApiTelegramLogOutputListComponent } from "./api-telegram/log-output/list/list.component";
import { ApiTelegramLogOutputListMobileComponent } from "./api-telegram/log-output/list/list.mobile.component";
import { ApiTelegramMemberInfoListComponent } from "./api-telegram/member-info/list/list.component";
import { ApiTelegramMemberInfoListMobileComponent } from "./api-telegram/member-info/list/list.mobile.component";
import { ApiTelegramReceivedFileListComponent } from "./api-telegram/received-file/list/list.component";
import { ApiTelegramReceivedFileListMobileComponent } from "./api-telegram/received-file/list/list.mobile.component";
import { ApiTelegramUploadedFileListComponent } from "./api-telegram/uploaded-file/list/list.component";
import { ApiTelegramUploadedFileListMobileComponent } from "./api-telegram/uploaded-file/list/list.mobile.component";
import { ApplicationComponent } from "./application/application.component";
import { ApplicationConfigComponent } from "./application/config/application-config.component";
import { ApplicationConfigCheckSiteComponent } from "./application/config/check-site/check-site.component";
import { ApplicationConfigCheckUserComponent } from "./application/config/check-user/check-user.component";
import { ApplicationConfigMainAdminComponent } from "./application/config/main-admin/config-main-admin.component";
import { ApplicationConfigSiteComponent } from "./application/config/site/config-site.component";
import { ApplicationAppAddComponent } from "./application/content/add/add.component";
import { ApplicationAppDownloadComponent } from "./application/content/download/download.component";
import { ApplicationAppEditComponent } from "./application/content/edit/edit.component";
import { ApplicationAppListComponent } from "./application/content/list/list.component";
import { ApplicationAppListMobileComponent } from "./application/content/list/list.mobile.component";
import { ApplicationAppSelectorComponent } from "./application/content/selector/selector.component";
import { ApplicationAppTreeComponent } from "./application/content/tree/tree.component";
import { ApplicationAppUploadAppComponent } from "./application/content/uploadApp/uploadApp.component";
import { ApplicationAppUploadUpdateComponent } from "./application/content/uploadUpdate/uploadUpdate.component";
import { ApplicationAppWidgetComponent } from "./application/content/widget/widget.component";
import { ApplicationIntroAddComponent } from "./application/intro/add/add.component";
import { ApplicationIntroEditComponent } from "./application/intro/edit/edit.component";
import { ApplicationIntroListComponent } from "./application/intro/list/list.component";
import { ApplicationIntroListMobileComponent } from "./application/intro/list/list.mobile.component";
import { EditComponent } from "./application/memberInfo/edit/edit.component";
import { ApplicationMemberInfoListComponent } from "./application/memberInfo/list/list.component";
import { ApplicationMemberInfoListMobileComponent } from "./application/memberInfo/list/list.mobile.component";
import { ApplicationMemberInfoSelectorComponent } from "./application/memberInfo/selector/selector.component";
import { ApplicationMemberInfoViewComponent } from "./application/memberInfo/view/view.component";
import { ApplicationMemberInfoWidgetComponent } from "./application/memberInfo/widget/widget.component";
import { ApplicationLogNotificationActionSendComponent } from "./application/notification/action-send/action-send.component";
import { ApplicationLogNotificationListComponent } from "./application/notification/list/list.component";
import { ApplicationLogNotificationListMobileComponent } from "./application/notification/list/list.mobile.component";
import { ApplicationLogNotificationViewComponent } from "./application/notification/view/view.component";
import { ApplicationSourceAddComponent } from "./application/source/add/add.component";
import { ApplicationSourceEditComponent } from "./application/source/edit/edit.component";
import { ApplicationSourceListComponent } from "./application/source/list/list.component";
import { ApplicationSourceListMobileComponent } from "./application/source/list/list.mobile.component";
import { ApplicationSourceSelectorComponent } from "./application/source/selector/selector.component";
import { ApplicationSourceTreeComponent } from "./application/source/tree/tree.component";
import { ApplicationThemeConfigAddComponent } from "./application/themeConfig/add/add.component";
import { ApplicationThemeConfigEditComponent } from "./application/themeConfig/edit/edit.component";
import { ApplicationThemeConfigListComponent } from "./application/themeConfig/list/list.component";
import { ApplicationThemeConfigListMobileComponent } from "./application/themeConfig/list/list.mobile.component";
import { ApplicationThemeConfigSelectorComponent } from "./application/themeConfig/selector/selector.component";
import { ArticleComponent } from "./article/article.component";
import { ArticleCategoryAddComponent } from "./article/category/add/add.component";
import { ArticleCategoryDeleteComponent } from "./article/category/delete/delete.component";
import { ArticleCategoryEditComponent } from "./article/category/edit/edit.component";
import { ArticleCategorySelectorComponent } from "./article/category/selector/selector.component";
import { ArticleCategoryTreeSelectorComponent } from "./article/category/tree-selector/tree-selector.component";
import { ArticleCategoryTreeComponent } from "./article/category/tree/tree.component";
import { ArticleCommentEditComponent } from "./article/comment/edit/edit.component";
import { ArticleCommentListComponent } from "./article/comment/list/list.component";
import { ArticleCommentListMobileComponent } from "./article/comment/list/list.mobile.component";
import { ArticleConfigComponent } from "./article/config/article-config.component";
import { ArticleConfigCheckSiteComponent } from "./article/config/check-site/check-site.component";
import { ArticleConfigCheckUserComponent } from "./article/config/check-user/check-user.component";
import { ArticleConfigMainAdminComponent } from "./article/config/main-admin/config-main-admin.component";
import { ArticleConfigSiteComponent } from "./article/config/site/config-site.component";
import { ArticleContentAddComponent } from "./article/content/add/add.component";
import { ArticleContentDeleteComponent } from "./article/content/delete/delete.component";
import { ArticleContentEditComponent } from "./article/content/edit/edit.component";
import { ArticletHeaderComponent } from "./article/content/header/header.component";
import { ArticleContentListComponent } from "./article/content/list/list.component";
import { ArticleContentListMobileComponent } from "./article/content/list/list.mobile.component";
import { ArticleContentSelectorComponent } from "./article/content/selector/selector.component";
import { ArticleContentWidgetComponent } from "./article/content/widget/widget.component";
import { AuthComponent } from "./auth/auth.component";
import { AuthForgotPasswordComponent } from "./auth/forgot-password/forgot-password.component";
import { AuthSignInBySmsComponent } from "./auth/signin-bysms/signin-bysms.component";
import { AuthSignInByUsernameComponent } from "./auth/signin-byusername/signin-byusername.component";
import { AuthSignOutComponent } from "./auth/signout/signout.component";
import { SignupRuleComponent } from "./auth/signup-rule/signup-rule.component";
import { AuthSignUpComponent } from "./auth/signup/signup.component";
import { BankPaymentComponent } from "./bank-payment/bank-payment.component";
import { BankPaymentConfigComponent } from "./bank-payment/config/bank-payment-config.component";
import { BankPaymentConfigCheckSiteComponent } from "./bank-payment/config/check-site/check-site.component";
import { BankPaymentConfigCheckUserComponent } from "./bank-payment/config/check-user/check-user.component";
import { BankPaymentConfigMainAdminComponent } from "./bank-payment/config/main-admin/config-main-admin.component";
import { BankPaymentConfigSiteComponent } from "./bank-payment/config/site/config-site.component";
import { BankPaymentPrivateSiteConfigAddComponent } from "./bank-payment/private-site-config/add/add.component";
import { BankPaymentPrivateSiteConfigEditComponent } from "./bank-payment/private-site-config/edit/edit.component";
import { BankPaymentPrivateSiteConfigListComponent } from "./bank-payment/private-site-config/list/list.component";
import { BankPaymentPrivateSiteConfigListMobileComponent } from "./bank-payment/private-site-config/list/list.mobile.component";
import { BankPaymentPrivateSiteConfigPaymentTestComponent } from "./bank-payment/private-site-config/paymentTest/paymentTest.component";
import { BankPaymentPrivateSiteConfigSelectorComponent } from "./bank-payment/private-site-config/selector/selector.component";
import { BankPaymentPrivateSiteConfigTreeComponent } from "./bank-payment/private-site-config/tree/tree.component";
import { BankPaymentPublicConfigAddComponent } from "./bank-payment/public-config/add/add.component";
import { BankPaymentPublicConfigEditComponent } from "./bank-payment/public-config/edit/edit.component";
import { BankPaymentPublicConfigHeaderComponent } from "./bank-payment/public-config/header/header.component";
import { BankPaymentPublicConfigListComponent } from "./bank-payment/public-config/list/list.component";
import { BankPaymentPublicConfigListMobileComponent } from "./bank-payment/public-config/list/list.mobile.component";
import { BankPaymentPublicConfigSelectorComponent } from "./bank-payment/public-config/selector/selector.component";
import { BankPaymentPublicConfigTreeComponent } from "./bank-payment/public-config/tree/tree.component";
import { BankPaymentTransactionLogListComponent } from "./bank-payment/transaction-log/list/list.component";
import { BankPaymentTransactionLogListMobileComponent } from "./bank-payment/transaction-log/list/list.mobile.component";
import { BankPaymentTransactionLogViewComponent } from "./bank-payment/transaction-log/view/view.component";
import { BankPaymentTransactionEditComponent } from "./bank-payment/transaction/edit/edit.component";
import { BankPaymentTransactionHeaderComponent } from "./bank-payment/transaction/header/header.component";
import { BankPaymentTransactionListComponent } from "./bank-payment/transaction/list/list.component";
import { BankPaymentTransactionListMobileComponent } from "./bank-payment/transaction/list/list.mobile.component";
import { BankPaymentTransactionViewComponent } from "./bank-payment/transaction/view/view.component";
import { BiographyComponent } from "./biography/biography.component";
import { BiographyCategoryAddComponent } from "./biography/category/add/add.component";
import { BiographyCategoryDeleteComponent } from "./biography/category/delete/delete.component";
import { BiographyCategoryEditComponent } from "./biography/category/edit/edit.component";
import { BiographyCategorySelectorComponent } from "./biography/category/selector/selector.component";
import { BiographyCategoryTreeSelectorComponent } from "./biography/category/tree-selector/tree-selector.component";
import { BiographyCategoryTreeComponent } from "./biography/category/tree/tree.component";
import { BiographyCommentEditComponent } from "./biography/comment/edit/edit.component";
import { BiographyCommentListComponent } from "./biography/comment/list/list.component";
import { BiographyCommentListMobileComponent } from "./biography/comment/list/list.mobile.component";
import { BiographyConfigComponent } from "./biography/config/biography-config.component";
import { BiographyConfigCheckSiteComponent } from "./biography/config/check-site/check-site.component";
import { BiographyConfigCheckUserComponent } from "./biography/config/check-user/check-user.component";
import { BiographyConfigMainAdminComponent } from "./biography/config/main-admin/config-main-admin.component";
import { BiographyConfigSiteComponent } from "./biography/config/site/config-site.component";
import { BiographyContentAddComponent } from "./biography/content/add/add.component";
import { BiographyContentDeleteComponent } from "./biography/content/delete/delete.component";
import { BiographyContentEditComponent } from "./biography/content/edit/edit.component";
import { BiographyContentListComponent } from "./biography/content/list/list.component";
import { BiographyContentListMobileComponent } from "./biography/content/list/list.mobile.component";
import { BiographyContentSelectorComponent } from "./biography/content/selector/selector.component";
import { BiographyContentWidgetComponent } from "./biography/content/widget/widget.component";
import { BlogComponent } from "./blog/blog.component";
import { BlogCategoryAddComponent } from "./blog/category/add/add.component";
import { BlogCategoryDeleteComponent } from "./blog/category/delete/delete.component";
import { BlogCategoryEditComponent } from "./blog/category/edit/edit.component";
import { BlogCategorySelectorComponent } from "./blog/category/selector/selector.component";
import { BlogCategoryTreeSelectorComponent } from "./blog/category/tree-selector/tree-selector.component";
import { BlogCategoryTreeComponent } from "./blog/category/tree/tree.component";
import { BlogCommentEditComponent } from "./blog/comment/edit/edit.component";
import { BlogCommentListComponent } from "./blog/comment/list/list.component";
import { BlogCommentListMobileComponent } from "./blog/comment/list/list.mobile.component";
import { BlogConfigComponent } from "./blog/config/blog-config.component";
import { BlogConfigCheckSiteComponent } from "./blog/config/check-site/check-site.component";
import { BlogConfigCheckUserComponent } from "./blog/config/check-user/check-user.component";
import { BlogConfigMainAdminComponent } from "./blog/config/main-admin/config-main-admin.component";
import { BlogConfigSiteComponent } from "./blog/config/site/config-site.component";
import { BlogContentAddComponent } from "./blog/content/add/add.component";
import { BlogContentDeleteComponent } from "./blog/content/delete/delete.component";
import { BlogContentEditComponent } from "./blog/content/edit/edit.component";
import { BlogContentHeaderComponent } from "./blog/content/header/header.component";
import { BlogContentListComponent } from "./blog/content/list/list.component";
import { BlogContentListMobileComponent } from "./blog/content/list/list.mobile.component";
import { BlogContentSelectorComponent } from "./blog/content/selector/selector.component";
import { BlogContentWidgetComponent } from "./blog/content/widget/widget.component";
import { CatalogComponent } from "./catalog/catalog.component";
import { CatalogCategoryAddComponent } from "./catalog/category/add/add.component";
import { CatalogCategoryDeleteComponent } from "./catalog/category/delete/delete.component";
import { CatalogCategoryEditComponent } from "./catalog/category/edit/edit.component";
import { CatalogCategorySelectorComponent } from "./catalog/category/selector/selector.component";
import { CatalogCategoryTreeSelectorComponent } from "./catalog/category/tree-selector/tree-selector.component";
import { CatalogCategoryTreeComponent } from "./catalog/category/tree/tree.component";
import { CatalogConfigComponent } from "./catalog/config/catalog-config.component";
import { CatalogConfigCheckSiteComponent } from "./catalog/config/check-site/check-site.component";
import { CatalogConfigCheckUserComponent } from "./catalog/config/check-user/check-user.component";
import { CatalogConfigMainAdminComponent } from "./catalog/config/main-admin/config-main-admin.component";
import { CatalogConfigSiteComponent } from "./catalog/config/site/config-site.component";
import { CatalogContentAddComponent } from "./catalog/content/add/add.component";
import { CatalogContentDeleteComponent } from "./catalog/content/delete/delete.component";
import { CatalogContentEditComponent } from "./catalog/content/edit/edit.component";
import { CatalogContentHeaderComponent } from "./catalog/content/header/header.component";
import { CatalogContentListComponent } from "./catalog/content/list/list.component";
import { CatalogContentListMobileComponent } from "./catalog/content/list/list.mobile.component";
import { CatalogContentSelectorComponent } from "./catalog/content/selector/selector.component";
import { CatalogContentWidgetComponent } from "./catalog/content/widget/widget.component";
import { ChartCategoryAddComponent } from "./chart/category/add/add.component";
import { ChartCategoryDeleteComponent } from "./chart/category/delete/delete.component";
import { ChartCategoryEditComponent } from "./chart/category/edit/edit.component";
import { ChartCategorySelectorComponent } from "./chart/category/selector/selector.component";
import { ChartCategoryTreeSelectorComponent } from "./chart/category/tree-selector/tree-selector.component";
import { ChartCategoryTreeComponent } from "./chart/category/tree/tree.component";
import { ChartComponent } from "./chart/chart.component";
import { ChartCommentEditComponent } from "./chart/comment/edit/edit.component";
import { ChartCommentListComponent } from "./chart/comment/list/list.component";
import { ChartCommentListMobileComponent } from "./chart/comment/list/list.mobile.component";
import { ChartConfigComponent } from "./chart/config/chart-config.component";
import { ChartConfigCheckSiteComponent } from "./chart/config/check-site/check-site.component";
import { ChartConfigCheckUserComponent } from "./chart/config/check-user/check-user.component";
import { ChartConfigMainAdminComponent } from "./chart/config/main-admin/config-main-admin.component";
import { ChartConfigSiteComponent } from "./chart/config/site/config-site.component";
import { ChartContentAddComponent } from "./chart/content/add/add.component";
import { ChartContentDeleteComponent } from "./chart/content/delete/delete.component";
import { ChartContentEditComponent } from "./chart/content/edit/edit.component";
import { ChartContentListComponent } from "./chart/content/list/list.component";
import { ChartContentListMobileComponent } from "./chart/content/list/list.mobile.component";
import { ChartContentSelectorComponent } from "./chart/content/selector/selector.component";
import { ChartContentWidgetComponent } from "./chart/content/widget/widget.component";
import { ContactCategoryAddComponent } from "./contact/category/add/add.component";
import { ContactCategoryDeleteComponent } from "./contact/category/delete/delete.component";
import { ContactCategoryEditComponent } from "./contact/category/edit/edit.component";
import { ContactCategorySelectorComponent } from "./contact/category/selector/selector.component";
import { ContactCategoryTreeSelectorComponent } from "./contact/category/tree-selector/tree-selector.component";
import { ContactCategoryTreeComponent } from "./contact/category/tree/tree.component";
import { ContactConfigCheckSiteComponent } from "./contact/config/check-site/check-site.component";
import { ContactConfigCheckUserComponent } from "./contact/config/check-user/check-user.component";
import { ContactConfigComponent } from "./contact/config/contact-config.component";
import { ContactConfigMainAdminComponent } from "./contact/config/main-admin/config-main-admin.component";
import { ContactConfigSiteComponent } from "./contact/config/site/config-site.component";
import { ContactComponent } from "./contact/contact.component";
import { ContactContentAddComponent } from "./contact/content/add/add.component";
import { ContactContentEditComponent } from "./contact/content/edit/edit.component";
import { ContactContentImportComponent } from "./contact/content/import/import.component";
import { ContactContentListComponent } from "./contact/content/list/list.component";
import { ContactContentListMobileComponent } from "./contact/content/list/list.mobile.component";
import { ContactContentSelectionlistComponent } from "./contact/content/selection-list/selectionlist.component";
import { ContactContentSelectorComponent } from "./contact/content/selector/selector.component";
import { CoreLogAvoidDuplicateDataEntryEditComponent } from "./core-log/avoid-duplicate/edit/edit.component";
import { CoreLogAvoidDuplicateDataEntryListComponent } from "./core-log/avoid-duplicate/list/list.component";
import { CoreLogAvoidDuplicateDataEntryListMobileComponent } from "./core-log/avoid-duplicate/list/list.mobile.component";
import { CoreLogComponent } from "./core-log/coreLog.component";
import { CoreLogCurrencyListComponent } from "./core-log/currency/list/list.component";
import { CoreLogCurrencyListMobileComponent } from "./core-log/currency/list/list.mobile.component";
import { CoreLogCurrencyViewComponent } from "./core-log/currency/view/view.component";
import { CoreLogEmailEditComponent } from "./core-log/email/edit/edit.component";
import { CoreLogEmailListComponent } from "./core-log/email/list/list.component";
import { CoreLogEmailListMobileComponent } from "./core-log/email/list/list.mobile.component";
import { CoreLogEmailViewComponent } from "./core-log/email/view/view.component";
import { CoreLogErrorEditComponent } from "./core-log/error/edit/edit.component";
import { CoreLogErrorListComponent } from "./core-log/error/list/list.component";
import { CoreLogErrorListMobileComponent } from "./core-log/error/list/list.mobile.component";
import { CoreLogMemberEditComponent } from "./core-log/member/edit/edit.component";
import { CoreLogMemberListComponent } from "./core-log/member/list/list.component";
import { CoreLogMemberListMobileComponent } from "./core-log/member/list/list.mobile.component";
import { CoreLogMemberViewComponent } from "./core-log/member/view/view.component";
import { CoreLogNotificationEditComponent } from "./core-log/notification/edit/edit.component";
import { CoreLogNotificationListComponent } from "./core-log/notification/list/list.component";
import { CoreLogNotificationListMobileComponent } from "./core-log/notification/list/list.mobile.component";
import { CoreLogNotificationViewComponent } from "./core-log/notification/view/view.component";
import { CoreLogReportDataEditComponent } from "./core-log/report-data/edit/edit.component";
import { CoreLogReportDataListComponent } from "./core-log/report-data/list/list.component";
import { CoreLogReportDataListMobileComponent } from "./core-log/report-data/list/list.mobile.component";
import { CoreLogReportDataViewComponent } from "./core-log/report-data/view/view.component";
import { CoreLogSmsEditComponent } from "./core-log/sms/edit/edit.component";
import { CoreLogSmsListComponent } from "./core-log/sms/list/list.component";
import { CoreLogSmsListMobileComponent } from "./core-log/sms/list/list.mobile.component";
import { CoreLogSmsViewComponent } from "./core-log/sms/view/view.component";
import { CoreLogSmsViewMobileComponent } from "./core-log/sms/view/view.mobile.component";
import { CoreMainActionComponent } from "./core-main/action/core-main-action.component";
import { CoreMainActionSendNotificationComponent } from "./core-main/action/send-notification/send-notification.component";
import { CoreConfigCheckSiteComponent } from "./core-main/config/check-site/check-site.component";
import { CoreConfigCheckUserComponent } from "./core-main/config/check-user/check-user.component";
import { CoreConfigComponent } from "./core-main/config/core-config.component";
import { CoreConfigMainAdminComponent } from "./core-main/config/main-admin/config-main-admin.component";
import { CoreConfigSiteComponent } from "./core-main/config/site/config-site.component";
import { CoreComponent } from "./core-main/core.component";
import { CoreCpMainMenuAddComponent } from "./core-main/cp-main-menu/add/add.component";
import { CoreCpMainMenuComponent } from "./core-main/cp-main-menu/coreCpMainMenu.component";
import { CoreCpMainMenuEditComponent } from "./core-main/cp-main-menu/edit/edit.component";
import { CoreCpMainMenuListComponent } from "./core-main/cp-main-menu/list/list.component";
import { CoreCpMainMenuListMobileComponent } from "./core-main/cp-main-menu/list/list.mobile.component";
import { CoreCpMainMenuSelectorComponent } from "./core-main/cp-main-menu/selector/selector.component";
import { CoreCpMainMenuTreeComponent } from "./core-main/cp-main-menu/tree/tree.component";
import { CoreCurrencyAddComponent } from "./core-main/currency/add/add.component";
import { CoreCurrencyComponent } from "./core-main/currency/coreCurrency.component";
import { CoreCurrencyEditComponent } from "./core-main/currency/edit/edit.component";
import { CoreCurrencyListComponent } from "./core-main/currency/list/list.component";
import { CoreCurrencyListMobileComponent } from "./core-main/currency/list/list.mobile.component";
import { CoreCurrencySelectorComponent } from "./core-main/currency/selector/selector.component";
import { CoreDeviceAddComponent } from "./core-main/device/add/add.component";
import { CoreDeviceComponent } from "./core-main/device/coreDevice.component";
import { CoreDeviceEditComponent } from "./core-main/device/edit/edit.component";
import { CoreDeviceListComponent } from "./core-main/device/list/list.component";
import { CoreDeviceListMobileComponent } from "./core-main/device/list/list.mobile.component";
import { CoreDeviceSelectorComponent } from "./core-main/device/selector/selector.component";
import { CoreGuideAddComponent } from "./core-main/guides/add/add.component";
import { CoreGuideComponent } from "./core-main/guides/coreGuide.component";
import { CoreGuideEditComponent } from "./core-main/guides/edit/edit.component";
import { CoreGuideListComponent } from "./core-main/guides/list/list.component";
import { CoreGuideListMobileComponent } from "./core-main/guides/list/list.mobile.component";
import { CoreGuideSelectorComponent } from "./core-main/guides/selector/selector.component";
import { CoreGuideTreeComponent } from "./core-main/guides/tree/tree.component";
import { CoreLocationAddBulkComponent } from "./core-main/location/add-bulk/add-bulk.component";
import { CoreLocationAddComponent } from "./core-main/location/add/add.component";
import { CoreLocationComponent } from "./core-main/location/coreLocation.component";
import { CoreLocationEditComponent } from "./core-main/location/edit/edit.component";
import { CoreLocationListComponent } from "./core-main/location/list/list.component";
import { CoreLocationListMobileComponent } from "./core-main/location/list/list.mobile.component";
import { CoreLocationSelectorComponent } from "./core-main/location/selector/selector.component";
import { CoreLocationTreeComponent } from "./core-main/location/tree/tree.component";
import { CoreModuleEntityReportFileAddComponent } from "./core-main/module-entity-report-file/add/add.component";
import { CoreModuleEntityReportFileComponent } from "./core-main/module-entity-report-file/core-module-entity-report-file.component";
import { CoreModuleEntityReportFileEditComponent } from "./core-main/module-entity-report-file/edit/edit.component";
import { CoreModuleEntityReportFileListComponent } from "./core-main/module-entity-report-file/list/list.component";
import { CoreModuleEntityReportFileListMobileComponent } from "./core-main/module-entity-report-file/list/list.mobile.component";
import { CoreModuleEntityComponent } from "./core-main/module-entity/core-module-entity.component";
import { CoreModuleEntityEditComponent } from "./core-main/module-entity/edit/edit.component";
import { CoreModuleEntityListComponent } from "./core-main/module-entity/list/list.component";
import { CoreModuleEntityListMobileComponent } from "./core-main/module-entity/list/list.mobile.component";
import { CoreModuleEntitySelectorComponent } from "./core-main/module-entity/selector/selector.component";
import { CoreModuleSaleComponent } from "./core-main/module-sale/core-module-sale.component";
import { CoreModuleSaleHeaderGroupAddComponent } from "./core-main/module-sale/header-group/add/add.component";
import { CoreModuleSaleHeaderGroupEditComponent } from "./core-main/module-sale/header-group/edit/edit.component";
import { CoreModuleSaleHeaderGroupHeaderComponent } from "./core-main/module-sale/header-group/header/header.component";
import { CoreModuleSaleHeaderGroupListComponent } from "./core-main/module-sale/header-group/list/list.component";
import { CoreModuleSaleHeaderGroupListMobileComponent } from "./core-main/module-sale/header-group/list/list.mobile.component";
import { CoreModuleSaleHeaderGroupSelectorComponent } from "./core-main/module-sale/header-group/selector/selector.component";
import { CoreModuleSaleHeaderGroupTreeComponent } from "./core-main/module-sale/header-group/tree/tree.component";
import { CoreModuleSaleHeaderAddComponent } from "./core-main/module-sale/header/add/add.component";
import { CoreModuleSaleHeaderEditComponent } from "./core-main/module-sale/header/edit/edit.component";
import { CoreModuleSaleHeaderHeaderComponent } from "./core-main/module-sale/header/header/header.component";
import { CoreModuleSaleHeaderListComponent } from "./core-main/module-sale/header/list/list.component";
import { CoreModuleSaleHeaderListMobileComponent } from "./core-main/module-sale/header/list/list.mobile.component";
import { CoreModuleSaleHeaderSaleListComponent } from "./core-main/module-sale/header/sale-list/sale-list.component";
import { CoreModuleSaleHeaderSalePaymentComponent } from "./core-main/module-sale/header/sale-payment/sale-payment.component";
import { CoreModuleSaleHeaderSelectorComponent } from "./core-main/module-sale/header/selector/selector.component";
import { CoreModuleSaleHeaderTreeComponent } from "./core-main/module-sale/header/tree/tree.component";
import { CoreModuleSaleInvoiceDetailListComponent } from "./core-main/module-sale/invoice-detail/list/list.component";
import { CoreModuleSaleInvoiceDetailListMobileComponent } from "./core-main/module-sale/invoice-detail/list/list.mobile.component";
import { CoreModuleSaleInvoiceDetailViewComponent } from "./core-main/module-sale/invoice-detail/view/view.component";
import { CoreModuleSaleInvoiceListComponent } from "./core-main/module-sale/invoice/list/list.component";
import { CoreModuleSaleInvoiceListMobileComponent } from "./core-main/module-sale/invoice/list/list.mobile.component";
import { CoreModuleSaleInvoiceViewComponent } from "./core-main/module-sale/invoice/view/view.component";
import { CoreModuleSaleItemAddComponent } from "./core-main/module-sale/Item/add/add.component";
import { CoreModuleSaleItemEditComponent } from "./core-main/module-sale/Item/edit/edit.component";
import { CoreModuleSaleItemListComponent } from "./core-main/module-sale/Item/list/list.component";
import { CoreModuleSaleItemListMobileComponent } from "./core-main/module-sale/Item/list/list.mobile.component";
import { CoreModuleSaleItemListViewComponent } from "./core-main/module-sale/Item/listview/listview.component";
import { CoreModuleSaleItemSelectorComponent } from "./core-main/module-sale/Item/selector/selector.component";
import { CoreModuleSaleSerialAddComponent } from "./core-main/module-sale/serial/add/add.component";
import { CoreModuleSaleSerialCheckListComponent } from "./core-main/module-sale/serial/check-list/check-list.component";
import { CoreModuleSaleSerialEditComponent } from "./core-main/module-sale/serial/edit/edit.component";
import { CoreModuleSaleSerialHeaderComponent } from "./core-main/module-sale/serial/header/header.component";
import { CoreModuleSaleSerialListComponent } from "./core-main/module-sale/serial/list/list.component";
import { CoreModuleSaleSerialListMobileComponent } from "./core-main/module-sale/serial/list/list.mobile.component";
import { CoreModuleSaleSerialSelectorComponent } from "./core-main/module-sale/serial/selector/selector.component";
import { CoreModuleAddComponent } from "./core-main/module/add/add.component";
import { CoreModuleComponent } from "./core-main/module/coreModule.component";
import { CoreModuleEditComponent } from "./core-main/module/edit/edit.component";
import { CoreModuleHeaderComponent } from "./core-main/module/header/header.component";
import { CoreModuleListComponent } from "./core-main/module/list/list.component";
import { CoreModuleListMobileComponent } from "./core-main/module/list/list.mobile.component";
import { CoreModuleSelectionlistComponent } from "./core-main/module/selectionlist/selectionlist.component";
import { CoreModuleSelectorComponent } from "./core-main/module/selector/selector.component";
import { CoreModuleTreeComponent } from "./core-main/module/tree/tree.component";
import { CoreSiteCategoryCmsModuleAddComponent } from "./core-main/site-category-module/add/add.component";
import { CoreSiteCategoryCmsModuleComponent } from "./core-main/site-category-module/coreSiteCategoryCmsModule.component";
import { CoreSiteCategoryCmsModuleEditComponent } from "./core-main/site-category-module/edit/edit.component";
import { CoreSiteCategoryCmsModuleListComponent } from "./core-main/site-category-module/list/list.component";
import { CoreSiteCategoryCmsModuleListMobileComponent } from "./core-main/site-category-module/list/list.mobile.component";
import { CoreSiteCategoryCmsModuleListViewComponent } from "./core-main/site-category-module/listview/listview.component";
import { CoreSiteCategoryCmsModuleSelectorComponent } from "./core-main/site-category-module/selector/selector.component";
import { CoreSiteCategoryAddComponent } from "./core-main/site-category/add/add.component";
import { CoreSiteCategoryComponent } from "./core-main/site-category/coreSiteCategory.component";
import { CoreSiteCategoryEditComponent } from "./core-main/site-category/edit/edit.component";
import { CoreSiteCategoryListComponent } from "./core-main/site-category/list/list.component";
import { CoreSiteCategoryListMobileComponent } from "./core-main/site-category/list/list.mobile.component";
import { CoreSiteCategorySelectorComponent } from "./core-main/site-category/selector/selector.component";
import { CoreSiteCategoryTreeComponent } from "./core-main/site-category/tree/tree.component";
import { CoreSiteDomainAliasAddComponent } from "./core-main/site-domain-alias/add/add.component";
import { CoreSiteDomainAliasComponent } from "./core-main/site-domain-alias/coreSiteDomainAlias.component";
import { CoreSiteDomainAliasEditComponent } from "./core-main/site-domain-alias/edit/edit.component";
import { CoreSiteDomainAliasListComponent } from "./core-main/site-domain-alias/list/list.component";
import { CoreSiteDomainAliasListMobileComponent } from "./core-main/site-domain-alias/list/list.mobile.component";
import { CoreSiteDomainAliasSelectorComponent } from "./core-main/site-domain-alias/selector/selector.component";
import { CoreSiteAddComponent } from "./core-main/site/add/add.component";
import { CoreSiteAddFirstComponent } from "./core-main/site/addFirst/addFirst.component";
import { CoreSiteComponent } from "./core-main/site/coreSite.component";
import { CoreSiteDeleteComponent } from "./core-main/site/delete/delete.component";
import { CoreSiteEditComponent } from "./core-main/site/edit/edit.component";
import { CoreSiteHeaderComponent } from "./core-main/site/header/header.component";
import { CoreInfoComponent } from "./core-main/site/info/core-info.component";
import { CoreSiteListComponent } from "./core-main/site/list/list.component";
import { CoreSiteListMobileComponent } from "./core-main/site/list/list.mobile.component";
import { CoreSiteModuleSiteInfoComponent } from "./core-main/site/module-site-info/module-site-info.component";
import { CoreSiteModuleSiteOptimazeComponent } from "./core-main/site/module-site-optimaze/module-site-optimaze.component";
import { CoreSiteModuleAddComponent } from "./core-main/site/moduleAdd/moduleAdd.component";
import { CoreSiteModuleEditComponent } from "./core-main/site/moduleEdit/moduleEdit.component";
import { CoreSiteModuleListComponent } from "./core-main/site/moduleList/moduleList.component";
import { CoreSiteResellerChartComponent } from "./core-main/site/reseller-chart/reseller-chart.component";
import { CoreSiteSelectorComponent } from "./core-main/site/selector/selector.component";
import { CoreSiteSiteSelectComponent } from "./core-main/site/site-select/site-select.component";
import { CoreSiteTreeComponent } from "./core-main/site/tree/tree.component";
import { CoreSiteUserAddComponent } from "./core-main/site/user-add/user-add.component";
import { CoreSiteUserEditComponent } from "./core-main/site/user-edit/user-edit.component";
import { CoreSiteUserListComponent } from "./core-main/site/user-list/user-list.component";
import { CoreSiteWidgetCountComponent } from "./core-main/site/widget/count/widget.component";
import { CoreSiteWidgetModuleComponent } from "./core-main/site/widget/module/widget.component";
import { CoreSiteWidgetStatusComponent } from "./core-main/site/widget/status/widget.component";
import { CoreUserClaimContentAddComponent } from "./core-main/user-claim/content/add/add.component";
import { CoreUserClaimContentCheckListComponent } from "./core-main/user-claim/content/check-list/check-list.component";
import { CoreUserClaimContentEditComponent } from "./core-main/user-claim/content/edit/edit.component";
import { CoreUserClaimContentListComponent } from "./core-main/user-claim/content/list/list.component";
import { CoreUserClaimContentListMobileComponent } from "./core-main/user-claim/content/list/list.mobile.component";
import { CoreUserClaimContentWidgetStatusComponent } from "./core-main/user-claim/content/widget/widget-status.component";
import { CoreUserClaimComponent } from "./core-main/user-claim/core-user-claim.component";
import { CoreUserClaimGroupDetailAddComponent } from "./core-main/user-claim/group-detail/add/add.component";
import { CoreUserClaimGroupDetailEditComponent } from "./core-main/user-claim/group-detail/edit/edit.component";
import { CoreUserClaimGroupDetailListComponent } from "./core-main/user-claim/group-detail/list/list.component";
import { CoreUserClaimGroupDetailListMobileComponent } from "./core-main/user-claim/group-detail/list/list.mobile.component";
import { CoreUserClaimGroupDetailSelectorComponent } from "./core-main/user-claim/group-detail/selector/selector.component";
import { CoreUserClaimGroupDetailTreeComponent } from "./core-main/user-claim/group-detail/tree/tree.component";
import { CoreUserClaimGroupAddComponent } from "./core-main/user-claim/group/add/add.component";
import { CoreUserClaimGroupEditComponent } from "./core-main/user-claim/group/edit/edit.component";
import { CoreUserClaimGroupHeaderComponent } from "./core-main/user-claim/group/header/header.component";
import { CoreUserClaimGroupListComponent } from "./core-main/user-claim/group/list/list.component";
import { CoreUserClaimGroupListMobileComponent } from "./core-main/user-claim/group/list/list.mobile.component";
import { CoreUserClaimGroupSelectionlistComponent } from "./core-main/user-claim/group/selectionlist/selectionlist.component";
import { CoreUserClaimGroupSelectorComponent } from "./core-main/user-claim/group/selector/selector.component";
import { CoreUserClaimGroupTreeComponent } from "./core-main/user-claim/group/tree/tree.component";
import { CoreUserClaimTypeAddComponent } from "./core-main/user-claim/type/add/add.component";
import { CoreUserClaimTypeEditComponent } from "./core-main/user-claim/type/edit/edit.component";
import { CoreUserClaimTypeHeaderComponent } from "./core-main/user-claim/type/header/header.component";
import { CoreUserClaimTypeListComponent } from "./core-main/user-claim/type/list/list.component";
import { CoreUserClaimTypeListMobileComponent } from "./core-main/user-claim/type/list/list.mobile.component";
import { CoreUserClaimTypeSelectionlistComponent } from "./core-main/user-claim/type/selectionlist/selectionlist.component";
import { CoreUserClaimTypeSelectorComponent } from "./core-main/user-claim/type/selector/selector.component";
import { CoreUserClaimTypeTreeComponent } from "./core-main/user-claim/type/tree/tree.component";
import { CoreUserGroupAddComponent } from "./core-main/user-group/add/add.component";
import { CoreUserGroupComponent } from "./core-main/user-group/coreUserGroup.component";
import { CoreUserGroupEditComponent } from "./core-main/user-group/edit/edit.component";
import { CoreUserGroupListComponent } from "./core-main/user-group/list/list.component";
import { CoreUserGroupListMobileComponent } from "./core-main/user-group/list/list.mobile.component";
import { CoreUserGroupSelectionlistComponent } from "./core-main/user-group/selectionlist/selectionlist.component";
import { CoreUserGroupSelectorComponent } from "./core-main/user-group/selector/selector.component";
import { CoreUserGroupTreeComponent } from "./core-main/user-group/tree/tree.component";
import { CoreUserSupportAccessAddComponent } from "./core-main/user-support-access/add/add.component";
import { CoreUserSupportAccessComponent } from "./core-main/user-support-access/core-user-support-access.component";
import { CoreUserSupportAccessEditComponent } from "./core-main/user-support-access/edit/edit.component";
import { CoreUserSupportAccessListComponent } from "./core-main/user-support-access/list/list.component";
import { CoreUserSupportAccessListMobileComponent } from "./core-main/user-support-access/list/list.mobile.component";
import { CoreUserAddComponent } from "./core-main/user/add/add.component";
import { CoreUserChangePasswordComponent } from "./core-main/user/changePassword/changePassword.component";
import { CoreUserComponent } from "./core-main/user/coreUser.component";
import { CoreUserEditComponent } from "./core-main/user/edit/edit.component";
import { CoreUserEmailConfirmComponent } from "./core-main/user/emailConfirm/emailConfirm.component";
import { CoreUserHeaderComponent } from "./core-main/user/header/header.component";
import { CoreUserListComponent } from "./core-main/user/list/list.component";
import { CoreUserListMobileComponent } from "./core-main/user/list/list.mobile.component";
import { CoreUserMobileConfirmComponent } from "./core-main/user/mobileConfirm/mobileConfirm.component";
import { CoreUserResellerChartComponent } from "./core-main/user/reseller-chart/reseller-chart.component";
import { CoreUserSelectorComponent } from "./core-main/user/selector/selector.component";
import { CoreUserViewComponent } from "./core-main/user/view/view.component";
import { CoreUserWidgetComponent } from "./core-main/user/widget/widget.component";
import { CoreModuleDataCommentAddComponent } from "./core-module-data/comment/add/add.component";
import { CoreModuleDataCommentEditComponent } from "./core-module-data/comment/edit/edit.component";
import { CoreModuleDataCommentListComponent } from "./core-module-data/comment/list/list.component";
import { CoreModuleDataCommentListMobileComponent } from "./core-module-data/comment/list/list.mobile.component";
import { CoreModuleDataCommentViewComponent } from "./core-module-data/comment/view/view.component";
import { CoreModuleDataComponent } from "./core-module-data/core-module-data.component";
import { CoreModuleDataMemoAddComponent } from "./core-module-data/memo/add/add.component";
import { CoreModuleDataMemoEditComponent } from "./core-module-data/memo/edit/edit.component";
import { CoreModuleDataMemoListComponent } from "./core-module-data/memo/list/list.component";
import { CoreModuleDataMemoListMobileComponent } from "./core-module-data/memo/list/list.mobile.component";
import { CoreModuleDataMemoViewComponent } from "./core-module-data/memo/view/view.component";
import { CoreModuleDataPinAddComponent } from "./core-module-data/pin/add/add.component";
import { CoreModuleDataPinEditComponent } from "./core-module-data/pin/edit/edit.component";
import { CoreModuleDataPinListComponent } from "./core-module-data/pin/list/list.component";
import { CoreModuleDataPinListMobileComponent } from "./core-module-data/pin/list/list.mobile.component";
import { CoreModuleDataPinViewComponent } from "./core-module-data/pin/view/view.component";
import { CoreModuleDataTaskAddComponent } from "./core-module-data/task/add/add.component";
import { CoreModuleDataTaskEditComponent } from "./core-module-data/task/edit/edit.component";
import { CoreModuleDataTaskListComponent } from "./core-module-data/task/list/list.component";
import { CoreModuleDataTaskListMobileComponent } from "./core-module-data/task/list/list.mobile.component";
import { CoreModuleDataTaskViewComponent } from "./core-module-data/task/view/view.component";
import { CoreModuleLogContentCountEditComponent } from "./core-module-log/content-count/edit/edit.component";
import { CoreModuleLogContentCountListComponent } from "./core-module-log/content-count/list/list.component";
import { CoreModuleLogContentCountListMobileComponent } from "./core-module-log/content-count/list/list.mobile.component";
import { CoreModuleLogContentCountViewComponent } from "./core-module-log/content-count/view/view.component";
import { CoreModuleLogComponent } from "./core-module-log/core-module-log.component";
import { CoreModuleLogFavoriteEditComponent } from "./core-module-log/favorite/edit/edit.component";
import { CoreModuleLogFavoriteListComponent } from "./core-module-log/favorite/list/list.component";
import { CoreModuleLogFavoriteListMobileComponent } from "./core-module-log/favorite/list/list.mobile.component";
import { CoreModuleLogFavoriteViewComponent } from "./core-module-log/favorite/view/view.component";
import { CoreModuleLogLikeEditComponent } from "./core-module-log/like/edit/edit.component";
import { CoreModuleLogLikeListComponent } from "./core-module-log/like/list/list.component";
import { CoreModuleLogLikeListMobileComponent } from "./core-module-log/like/list/list.mobile.component";
import { CoreModuleLogLikeViewComponent } from "./core-module-log/like/view/view.component";
import { CoreModuleLogReportAbuseEditComponent } from "./core-module-log/report-abuse/edit/edit.component";
import { CoreModuleLogReportAbuseListComponent } from "./core-module-log/report-abuse/list/list.component";
import { CoreModuleLogReportAbuseListMobileComponent } from "./core-module-log/report-abuse/list/list.mobile.component";
import { CoreModuleLogReportAbuseViewComponent } from "./core-module-log/report-abuse/view/view.component";
import { CoreModuleLogReportAbuseWidgetComponent } from "./core-module-log/report-abuse/widget/widget.component";
import { CoreModuleLogScoreEditComponent } from "./core-module-log/score/edit/edit.component";
import { CoreModuleLogScoreListComponent } from "./core-module-log/score/list/list.component";
import { CoreModuleLogScoreListMobileComponent } from "./core-module-log/score/list/list.mobile.component";
import { CoreModuleLogScoreViewComponent } from "./core-module-log/score/view/view.component";
import { CoreModuleLogShowKeyAddComponent } from "./core-module-log/show-key/add/add.component";
import { CoreModuleLogShowKeyEditComponent } from "./core-module-log/show-key/edit/edit.component";
import { CoreModuleLogShowKeyListComponent } from "./core-module-log/show-key/list/list.component";
import { CoreModuleLogShowKeyListMobileComponent } from "./core-module-log/show-key/list/list.mobile.component";
import { CoreModuleLogShowKeyViewComponent } from "./core-module-log/show-key/view/view.component";
import { CoreModuleLogSiteCreditBlockedEditComponent } from "./core-module-log/site-credit-blocked/edit/edit.component";
import { CoreModuleLogSiteCreditBlockedListComponent } from "./core-module-log/site-credit-blocked/list/list.component";
import { CoreModuleLogSiteCreditBlockedListMobileComponent } from "./core-module-log/site-credit-blocked/list/list.mobile.component";
import { CoreModuleLogSiteCreditBlockedViewComponent } from "./core-module-log/site-credit-blocked/view/view.component";
import { CoreModuleLogSiteCreditEditComponent } from "./core-module-log/site-credit/edit/edit.component";
import { CoreModuleLogSiteCreditListComponent } from "./core-module-log/site-credit/list/list.component";
import { CoreModuleLogSiteCreditListMobileComponent } from "./core-module-log/site-credit/list/list.mobile.component";
import { CoreModuleLogSiteCreditViewComponent } from "./core-module-log/site-credit/view/view.component";
import { CoreModuleLogSiteUserCreditBlockedEditComponent } from "./core-module-log/site-user-credit-blocked/edit/edit.component";
import { CoreModuleLogSiteUserCreditBlockedListComponent } from "./core-module-log/site-user-credit-blocked/list/list.component";
import { CoreModuleLogSiteUserCreditBlockedListMobileComponent } from "./core-module-log/site-user-credit-blocked/list/list.mobile.component";
import { CoreModuleLogSiteUserCreditBlockedViewComponent } from "./core-module-log/site-user-credit-blocked/view/view.component";
import { CoreModuleLogSiteUserCreditEditComponent } from "./core-module-log/site-user-credit/edit/edit.component";
import { CoreModuleLogSiteUserCreditListComponent } from "./core-module-log/site-user-credit/list/list.component";
import { CoreModuleLogSiteUserCreditListMobileComponent } from "./core-module-log/site-user-credit/list/list.mobile.component";
import { CoreModuleLogSiteUserCreditViewComponent } from "./core-module-log/site-user-credit/view/view.component";
import { CoreModuleComponent } from "./core-module/coreModule.component";
import { CoreModuleSiteCreditChargeDirectComponent } from "./core-module/site-credit/charge-direct/charge-direct.component";
import { CoreModuleSiteCreditChargeOnlineCalculateComponent } from "./core-module/site-credit/charge-online-calculate/charge-online-calculate.component";
import { CoreModuleSiteCreditChargeOnlineComponent } from "./core-module/site-credit/charge-online/charge-online.component";
import { CoreModuleSiteCreditEditComponent } from "./core-module/site-credit/edit/edit.component";
import { CoreModuleSiteCreditListComponent } from "./core-module/site-credit/list/list.component";
import { CoreModuleSiteCreditListMobileComponent } from "./core-module/site-credit/list/list.mobile.component";
import { CoreModuleSiteCreditWidgetCreditComponent } from "./core-module/site-credit/widget/widget-credit.component";
import { CoreModuleSiteUserCreditChargeDirectComponent } from "./core-module/site-user-credit/charge-direct/charge-direct.component";
import { CoreModuleSiteUserCreditChargeOnlineCalculateComponent } from "./core-module/site-user-credit/charge-online-calculate/charge-online-calculate.component";
import { CoreModuleSiteUserCreditChargeOnlineComponent } from "./core-module/site-user-credit/charge-online/charge-online.component";
import { CoreModuleSiteUserCreditEditComponent } from "./core-module/site-user-credit/edit/edit.component";
import { CoreModuleSiteUserCreditListComponent } from "./core-module/site-user-credit/list/list.component";
import { CoreModuleSiteUserCreditListMobileComponent } from "./core-module/site-user-credit/list/list.mobile.component";
import { CoreModuleSiteUserCreditMyselfListComponent } from "./core-module/site-user-credit/myself-list/myself-list.component";
import { CoreModuleSiteUserCreditWidgetCreditComponent } from "./core-module/site-user-credit/widget/widget-credit.component";
import { CoreModuleTagAddBulkComponent } from "./core-module/tag/add-bulk/add-bulk.component";
import { CoreModuleTagEditComponent } from "./core-module/tag/edit/edit.component";
import { CoreModuleTagListComponent } from "./core-module/tag/list/list.component";
import { CoreModuleTagListMobileComponent } from "./core-module/tag/list/list.mobile.component";
import { CoreModuleTagSelectorComponent } from "./core-module/tag/selector/selector.component";
import { CoreModuleTagCategoryDeleteComponent } from "./core-module/tagCategory/delete/delete.component";
import { CoreModuleTagCategoryEditComponent } from "./core-module/tagCategory/edit/edit.component";
import { CoreModuleTagCategorySelectorComponent } from "./core-module/tagCategory/selector/selector.component";
import { CoreModuleTagCategoryTreeComponent } from "./core-module/tagCategory/tree/tree.component";
import { CoreTokenActivationEditComponent } from "./core-token/activation/edit/edit.component";
import { CoreTokenActivationListComponent } from "./core-token/activation/list/list.component";
import { CoreTokenActivationListMobileComponent } from "./core-token/activation/list/list.mobile.component";
import { CoreTokenActivationViewComponent } from "./core-token/activation/view/view.component";
import { CoreTokenAuthUserLogListComponent } from "./core-token/auth-user-log/list/list.component";
import { CoreTokenAuthUserLogListMobileComponent } from "./core-token/auth-user-log/list/list.mobile.component";
import { CoreTokenAuthUserLogViewComponent } from "./core-token/auth-user-log/view/view.component";
import { CoreTokenAuthUserListComponent } from "./core-token/auth-user/list/list.component";
import { CoreTokenAuthUserListMobileComponent } from "./core-token/auth-user/list/list.mobile.component";
import { CoreTokenAuthUserViewComponent } from "./core-token/auth-user/view/view.component";
import { CoreTokenComponent } from "./core-token/core-token.component";
import { CoreLogTokenMicroServiceEditComponent } from "./core-token/micro-service-log/edit/edit.component";
import { CoreLogTokenMicroServiceListComponent } from "./core-token/micro-service-log/list/list.component";
import { CoreLogTokenMicroServiceListMobileComponent } from "./core-token/micro-service-log/list/list.mobile.component";
import { CoreLogTokenMicroServiceViewComponent } from "./core-token/micro-service-log/view/view.component";
import { CoreTokenMicroServiceEditComponent } from "./core-token/micro-service/edit/edit.component";
import { CoreTokenMicroServiceListComponent } from "./core-token/micro-service/list/list.component";
import { CoreTokenMicroServiceListMobileComponent } from "./core-token/micro-service/list/list.mobile.component";
import { CoreTokenMicroServiceViewComponent } from "./core-token/micro-service/view/view.component";
import { CoreLogTokenConnectionEditComponent } from "./core-token/notification-log/edit/edit.component";
import { CoreLogTokenConnectionListComponent } from "./core-token/notification-log/list/list.component";
import { CoreLogTokenConnectionListMobileComponent } from "./core-token/notification-log/list/list.mobile.component";
import { CoreLogTokenConnectionViewComponent } from "./core-token/notification-log/view/view.component";
import { CoreTokenConnectionEditComponent } from "./core-token/notification/edit/edit.component";
import { CoreTokenConnectionListOnlineComponent } from "./core-token/notification/list-online/list-online.component";
import { CoreTokenConnectionListComponent } from "./core-token/notification/list/list.component";
import { CoreTokenConnectionListMobileComponent } from "./core-token/notification/list/list.mobile.component";
import { CoreTokenConnectionViewComponent } from "./core-token/notification/view/view.component";
import { CoreTokenUserEditComponent } from "./core-token/user/edit/edit.component";
import { CoreTokenUserListComponent } from "./core-token/user/list/list.component";
import { CoreTokenUserViewComponent } from "./core-token/user/view/view.component";
import { CoreTokenUserBadLoginEditComponent } from "./core-token/userBadLogin/edit/edit.component";
import { CoreTokenUserBadLoginListComponent } from "./core-token/userBadLogin/list/list.component";
import { CoreTokenUserBadLoginListMobileComponent } from "./core-token/userBadLogin/list/list.mobile.component";
import { CoreTokenUserBadLoginViewComponent } from "./core-token/userBadLogin/view/view.component";
import { CoreLogTokenUserEditComponent } from "./core-token/userLog/edit/edit.component";
import { CoreLogTokenUserListComponent } from "./core-token/userLog/list/list.component";
import { CoreLogTokenUserViewComponent } from "./core-token/userLog/view/view.component";
import { CrmComponent } from "./crm/crm.component";
import { CrmAccountAddComponent } from "./crm/main/account/add/add.component";
import { CrmAccountEditComponent } from "./crm/main/account/edit/edit.component";
import { CrmAccountHeaderComponent } from "./crm/main/account/header/header.component";
import { CrmAccountListComponent } from "./crm/main/account/list/list.component";
import { CrmAccountListMobileComponent } from "./crm/main/account/list/list.mobile.component";
import { CrmAccountSelectorComponent } from "./crm/main/account/selector/selector.component";
import { CrmActivityAddComponent } from "./crm/main/activity/add/add.component";
import { CrmActivityEditComponent } from "./crm/main/activity/edit/edit.component";
import { CrmActivityListComponent } from "./crm/main/activity/list/list.component";
import { CrmActivityListMobileComponent } from "./crm/main/activity/list/list.mobile.component";
import { CrmCampaignAddComponent } from "./crm/main/campaign/add/add.component";
import { CrmCampaignEditComponent } from "./crm/main/campaign/edit/edit.component";
import { CrmCampaignHeaderComponent } from "./crm/main/campaign/header/header.component";
import { CrmCampaignListComponent } from "./crm/main/campaign/list/list.component";
import { CrmCampaignListMobileComponent } from "./crm/main/campaign/list/list.mobile.component";
import { CrmCampaignSelectorComponent } from "./crm/main/campaign/selector/selector.component";
import { CrmContactAddComponent } from "./crm/main/contact/add/add.component";
import { CrmContactEditComponent } from "./crm/main/contact/edit/edit.component";
import { CrmContactHeaderComponent } from "./crm/main/contact/header/header.component";
import { CrmContactListComponent } from "./crm/main/contact/list/list.component";
import { CrmContactListMobileComponent } from "./crm/main/contact/list/list.mobile.component";
import { CrmContactSelectorComponent } from "./crm/main/contact/selector/selector.component";
import { CrmMainComponent } from "./crm/main/crm-main.component";
import { CrmDealAddComponent } from "./crm/main/deal/add/add.component";
import { CrmDealEditComponent } from "./crm/main/deal/edit/edit.component";
import { CrmDealListComponent } from "./crm/main/deal/list/list.component";
import { CrmDealListMobileComponent } from "./crm/main/deal/list/list.mobile.component";
import { CrmDealSelectorComponent } from "./crm/main/deal/selector/selector.component";
import { CrmLeadAddComponent } from "./crm/main/lead/add/add.component";
import { CrmLeadEditComponent } from "./crm/main/lead/edit/edit.component";
import { CrmLeadListComponent } from "./crm/main/lead/list/list.component";
import { CrmLeadListMobileComponent } from "./crm/main/lead/list/list.mobile.component";
import { CrmLeadSelectorComponent } from "./crm/main/lead/selector/selector.component";
import { CrmOpportunityAddComponent } from "./crm/main/opportunity/add/add.component";
import { CrmOpportunityEditComponent } from "./crm/main/opportunity/edit/edit.component";
import { CrmOpportunityListComponent } from "./crm/main/opportunity/list/list.component";
import { CrmOpportunityListMobileComponent } from "./crm/main/opportunity/list/list.mobile.component";
import { CrmOpportunitySelectorComponent } from "./crm/main/opportunity/selector/selector.component";
import { CrmOpportunityStageHistoryListComponent } from "./crm/main/opportunity/stage-history/list/list.component";
import { CrmOpportunityStageHistoryListMobileComponent } from "./crm/main/opportunity/stage-history/list/list.mobile.component";
import { CrmPipelineAddComponent } from "./crm/main/pipeline/add/add.component";
import { CrmPipelineEditComponent } from "./crm/main/pipeline/edit/edit.component";
import { CrmPipelineListComponent } from "./crm/main/pipeline/list/list.component";
import { CrmPipelineListMobileComponent } from "./crm/main/pipeline/list/list.mobile.component";
import { CrmPipelineSelectorComponent } from "./crm/main/pipeline/selector/selector.component";
import { CrmStageAddComponent } from "./crm/main/stage/add/add.component";
import { CrmStageEditComponent } from "./crm/main/stage/edit/edit.component";
import { CrmStageListComponent } from "./crm/main/stage/list/list.component";
import { CrmStageListMobileComponent } from "./crm/main/stage/list/list.mobile.component";
import { CrmStageSelectorComponent } from "./crm/main/stage/selector/selector.component";
import { CrmSupplierPriceListAddComponent } from "./crm/supplier-price-list/add/add.component";
import { CrmSupplierPriceListComponent } from "./crm/supplier-price-list/list/list.component";
import { CrmSupplierPriceListMobileComponent } from "./crm/supplier-price-list/list/list.mobile.component";
import { CrmSupplierRatingAddComponent } from "./crm/supplier-rating/add/add.component";
import { CrmSupplierRatingListComponent } from "./crm/supplier-rating/list/list.component";
import { CrmSupplierRatingListMobileComponent } from "./crm/supplier-rating/list/list.mobile.component";
import { DataProviderClientAddComponent } from "./data-provider/client/add/add.component";
import { DataProviderClientChargePaymentComponent } from "./data-provider/client/charge-payment/charge-payment.component";
import { DataProviderClientChargeComponent } from "./data-provider/client/charge/charge.component";
import { DataProviderClientDeleteComponent } from "./data-provider/client/delete/delete.component";
import { DataProviderClientEditComponent } from "./data-provider/client/edit/edit.component";
import { DataProviderClientHeaderComponent } from "./data-provider/client/header/header.component";
import { DataProviderClientListComponent } from "./data-provider/client/list/list.component";
import { DataProviderClientSelectorComponent } from "./data-provider/client/selector/selector.component";
import { DataProviderClientTreeComponent } from "./data-provider/client/tree/tree.component";
import { DataProviderConfigCheckSiteComponent } from "./data-provider/config/check-site/check-site.component";
import { DataProviderConfigCheckUserComponent } from "./data-provider/config/check-user/check-user.component";
import { DataProviderConfigComponent } from "./data-provider/config/data-provider-config.component";
import { DataProviderConfigMainAdminComponent } from "./data-provider/config/main-admin/config-main-admin.component";
import { DataProviderConfigSiteComponent } from "./data-provider/config/site/config-site.component";
import { DataProviderDashboardComponent } from "./data-provider/dashboard/dashboard.component";
import { DataProviderComponent } from "./data-provider/data-provider.component";
import { DataProviderLogClientListComponent } from "./data-provider/log-client/list/list.component";
import { DataProviderLogClientViewComponent } from "./data-provider/log-client/view/view.component";
import { DataProviderLogPlanListComponent } from "./data-provider/log-plan/list/list.component";
import { DataProviderLogPlanViewComponent } from "./data-provider/log-plan/view/view.component";
import { DataProviderLogSourceListComponent } from "./data-provider/log-source/list/list.component";
import { DataProviderLogSourceViewComponent } from "./data-provider/log-source/view/view.component";
import { DataProviderLogClientListComponent } from "./data-provider/log/client/list/list.component";
import { DataProviderLogClientListMobileComponent } from "./data-provider/log/client/list/list.mobile.component";
import { DataProviderLogClientViewComponent } from "./data-provider/log/client/view/view.component";
import { DataProviderLogComponent } from "./data-provider/log/data-provider-log.component";
import { DataProviderLogPlanListComponent } from "./data-provider/log/plan/list/list.component";
import { DataProviderLogPlanListMobileComponent } from "./data-provider/log/plan/list/list.mobile.component";
import { DataProviderLogPlanViewComponent } from "./data-provider/log/plan/view/view.component";
import { DataProviderLogSourceListComponent } from "./data-provider/log/source/list/list.component";
import { DataProviderLogSourceListMobileComponent } from "./data-provider/log/source/list/list.mobile.component";
import { DataProviderLogSourceViewComponent } from "./data-provider/log/source/view/view.component";
import { DataProviderClientApplicationPermissionAddComponent } from "./data-provider/main/client-application-permission/add/add.component";
import { DataProviderClientApplicationPermissionEditComponent } from "./data-provider/main/client-application-permission/edit/edit.component";
import { DataProviderClientApplicationPermissionListComponent } from "./data-provider/main/client-application-permission/list/list.component";
import { DataProviderClientApplicationPermissionListMobileComponent } from "./data-provider/main/client-application-permission/list/list.mobile.component";
import { DataProviderClientApplicationAddComponent } from "./data-provider/main/client-application/add/add.component";
import { DataProviderClientApplicationEditComponent } from "./data-provider/main/client-application/edit/edit.component";
import { DataProviderClientApplicationListComponent } from "./data-provider/main/client-application/list/list.component";
import { DataProviderClientApplicationListMobileComponent } from "./data-provider/main/client-application/list/list.mobile.component";
import { DataProviderClientApplicationSelectorComponent } from "./data-provider/main/client-application/selector/selector.component";
import { DataProviderClientAddComponent } from "./data-provider/main/client/add/add.component";
import { DataProviderClientChargePaymentComponent } from "./data-provider/main/client/charge-payment/charge-payment.component";
import { DataProviderClientChargeComponent } from "./data-provider/main/client/charge/charge.component";
import { DataProviderClientDeleteComponent } from "./data-provider/main/client/delete/delete.component";
import { DataProviderClientEditComponent } from "./data-provider/main/client/edit/edit.component";
import { DataProviderClientHeaderComponent } from "./data-provider/main/client/header/header.component";
import { DataProviderClientListComponent } from "./data-provider/main/client/list/list.component";
import { DataProviderClientListMobileComponent } from "./data-provider/main/client/list/list.mobile.component";
import { DataProviderClientSelectorComponent } from "./data-provider/main/client/selector/selector.component";
import { DataProviderClientTreeComponent } from "./data-provider/main/client/tree/tree.component";
import { DataProviderMainComponent } from "./data-provider/main/data-provider-main.component";
import { DataProviderPlanCategoryAddComponent } from "./data-provider/main/plan-category/add/add.component";
import { DataProviderPlanCategoryDeleteComponent } from "./data-provider/main/plan-category/delete/delete.component";
import { DataProviderPlanCategoryEditComponent } from "./data-provider/main/plan-category/edit/edit.component";
import { DataProviderPlanCategorySelectorComponent } from "./data-provider/main/plan-category/selector/selector.component";
import { DataProviderPlanCategoryTreeComponent } from "./data-provider/main/plan-category/tree/tree.component";
import { DataProviderPlanClientAddComponent } from "./data-provider/main/plan-client/add/add.component";
import { DataProviderPlanClientDeleteComponent } from "./data-provider/main/plan-client/delete/delete.component";
import { DataProviderPlanClientEditComponent } from "./data-provider/main/plan-client/edit/edit.component";
import { DataProviderPlanClientHeaderComponent } from "./data-provider/main/plan-client/header/header.component";
import { DataProviderPlanClientListComponent } from "./data-provider/main/plan-client/list/list.component";
import { DataProviderPlanClientListMobileComponent } from "./data-provider/main/plan-client/list/list.mobile.component";
import { DataProviderPlanClientSelectorComponent } from "./data-provider/main/plan-client/selector/selector.component";
import { DataProviderPlanClientTreeComponent } from "./data-provider/main/plan-client/tree/tree.component";
import { DataProviderPlanPriceAddComponent } from "./data-provider/main/plan-price/add/add.component";
import { DataProviderPlanPriceChargePaymentComponent } from "./data-provider/main/plan-price/charge-payment/charge-payment.component";
import { DataProviderPlanPriceChargeComponent } from "./data-provider/main/plan-price/charge/charge.component";
import { DataProviderPlanPriceDeleteComponent } from "./data-provider/main/plan-price/delete/delete.component";
import { DataProviderPlanPriceEditComponent } from "./data-provider/main/plan-price/edit/edit.component";
import { DataProviderPlanPriceHeaderComponent } from "./data-provider/main/plan-price/header/header.component";
import { DataProviderPlanPriceListComponent } from "./data-provider/main/plan-price/list/list.component";
import { DataProviderPlanPriceListMobileComponent } from "./data-provider/main/plan-price/list/list.mobile.component";
import { DataProviderPlanPriceSelectorComponent } from "./data-provider/main/plan-price/selector/selector.component";
import { DataProviderPlanPriceTreeComponent } from "./data-provider/main/plan-price/tree/tree.component";
import { DataProviderPlanSourceAddComponent } from "./data-provider/main/plan-source/add/add.component";
import { DataProviderPlanSourceDeleteComponent } from "./data-provider/main/plan-source/delete/delete.component";
import { DataProviderPlanSourceEditComponent } from "./data-provider/main/plan-source/edit/edit.component";
import { DataProviderPlanSourceHeaderComponent } from "./data-provider/main/plan-source/header/header.component";
import { DataProviderPlanSourceListComponent } from "./data-provider/main/plan-source/list/list.component";
import { DataProviderPlanSourceListMobileComponent } from "./data-provider/main/plan-source/list/list.mobile.component";
import { DataProviderPlanSourceSelectorComponent } from "./data-provider/main/plan-source/selector/selector.component";
import { DataProviderPlanSourceTreeComponent } from "./data-provider/main/plan-source/tree/tree.component";
import { DataProviderPlanAddComponent } from "./data-provider/main/plan/add/add.component";
import { DataProviderPlanDeleteComponent } from "./data-provider/main/plan/delete/delete.component";
import { DataProviderPlanEditComponent } from "./data-provider/main/plan/edit/edit.component";
import { DataProviderPlanHeaderComponent } from "./data-provider/main/plan/header/header.component";
import { DataProviderPlanListComponent } from "./data-provider/main/plan/list/list.component";
import { DataProviderPlanListMobileComponent } from "./data-provider/main/plan/list/list.mobile.component";
import { DataProviderPlanSelectionlistComponent } from "./data-provider/main/plan/selectionlist/selectionlist.component";
import { DataProviderPlanSelectorComponent } from "./data-provider/main/plan/selector/selector.component";
import { DataProviderPlanTreeComponent } from "./data-provider/main/plan/tree/tree.component";
import { DataProviderSourceCompanyAddComponent } from "./data-provider/main/source-company/add/add.component";
import { DataProviderSourceCompanyEditComponent } from "./data-provider/main/source-company/edit/edit.component";
import { DataProviderSourceCompanyListComponent } from "./data-provider/main/source-company/list/list.component";
import { DataProviderSourceCompanyListMobileComponent } from "./data-provider/main/source-company/list/list.mobile.component";
import { DataProviderSourceCompanySelectorComponent } from "./data-provider/main/source-company/selector/selector.component";
import { DataProviderSourceCompanyTreeComponent } from "./data-provider/main/source-company/tree/tree.component";
import { DataProviderSourcePathPaginationAddComponent } from "./data-provider/main/source-path-pagination/add/add.component";
import { DataProviderSourcePathPaginationEditComponent } from "./data-provider/main/source-path-pagination/edit/edit.component";
import { DataProviderSourcePathPaginationListComponent } from "./data-provider/main/source-path-pagination/list/list.component";
import { DataProviderSourcePathPaginationListMobileComponent } from "./data-provider/main/source-path-pagination/list/list.mobile.component";
import { DataProviderSourcePathPaginationSelectorComponent } from "./data-provider/main/source-path-pagination/selector/selector.component";
import { DataProviderSourcePathAddComponent } from "./data-provider/main/source-path/add/add.component";
import { DataProviderSourcePathAddMobileComponent } from "./data-provider/main/source-path/add/add.mobile.component";
import { DataProviderSourcePathEditComponent } from "./data-provider/main/source-path/edit/edit.component";
import { DataProviderSourcePathEditMobileComponent } from "./data-provider/main/source-path/edit/edit.mobile.component";
import { DataProviderSourcePathHeaderComponent } from "./data-provider/main/source-path/header/header.component";
import { DataProviderSourcePathListComponent } from "./data-provider/main/source-path/list/list.component";
import { DataProviderSourcePathListMobileComponent } from "./data-provider/main/source-path/list/list.mobile.component";
import { DataProviderSourcePathSelectionlistComponent } from "./data-provider/main/source-path/selectionlist/selectionlist.component";
import { DataProviderSourcePathSelectorComponent } from "./data-provider/main/source-path/selector/selector.component";
import { DataProviderSourcePathTreeComponent } from "./data-provider/main/source-path/tree/tree.component";
import { DataProviderSourcePathTreeMobileComponent } from "./data-provider/main/source-path/tree/tree.mobile.component";
import { DataProviderSourcePublicConfigAddComponent } from "./data-provider/main/source-public-config/add/add.component";
import { DataProviderSourcePublicConfigEditComponent } from "./data-provider/main/source-public-config/edit/edit.component";
import { DataProviderSourcePublicConfigListComponent } from "./data-provider/main/source-public-config/list/list.component";
import { DataProviderSourcePublicConfigListMobileComponent } from "./data-provider/main/source-public-config/list/list.mobile.component";
import { DataProviderSourcePublicConfigSelectorComponent } from "./data-provider/main/source-public-config/selector/selector.component";
import { DataProviderSourcePublicConfigTreeComponent } from "./data-provider/main/source-public-config/tree/tree.component";
import { DataProviderSourcePublicConfigTreeMobileComponent } from "./data-provider/main/source-public-config/tree/tree.mobile.component";
import { DataProviderSourceAddComponent } from "./data-provider/main/source/add/add.component";
import { DataProviderSourceDeleteComponent } from "./data-provider/main/source/delete/delete.component";
import { DataProviderSourceEditComponent } from "./data-provider/main/source/edit/edit.component";
import { DataProviderSourceHeaderComponent } from "./data-provider/main/source/header/header.component";
import { DataProviderSourceListComponent } from "./data-provider/main/source/list/list.component";
import { DataProviderSourceListMobileComponent } from "./data-provider/main/source/list/list.mobile.component";
import { DataProviderSourceSelectorComponent } from "./data-provider/main/source/selector/selector.component";
import { DataProviderSourceTreeComponent } from "./data-provider/main/source/tree/tree.component";
import { DataProviderOverviewEventsComponent } from "./data-provider/overview/events/events.component";
import { DataProviderOverviewSummaryComponent } from "./data-provider/overview/summary/summary.component";
import { DataProviderPlanCategoryAddComponent } from "./data-provider/plan-category/add/add.component";
import { DataProviderPlanCategoryDeleteComponent } from "./data-provider/plan-category/delete/delete.component";
import { DataProviderPlanCategoryEditComponent } from "./data-provider/plan-category/edit/edit.component";
import { DataProviderPlanCategorySelectorComponent } from "./data-provider/plan-category/selector/selector.component";
import { DataProviderPlanCategoryTreeComponent } from "./data-provider/plan-category/tree/tree.component";
import { DataProviderPlanClientAddComponent } from "./data-provider/plan-client/add/add.component";
import { DataProviderPlanClientDeleteComponent } from "./data-provider/plan-client/delete/delete.component";
import { DataProviderPlanClientEditComponent } from "./data-provider/plan-client/edit/edit.component";
import { DataProviderPlanClientHeaderComponent } from "./data-provider/plan-client/header/header.component";
import { DataProviderPlanClientListComponent } from "./data-provider/plan-client/list/list.component";
import { DataProviderPlanClientSelectorComponent } from "./data-provider/plan-client/selector/selector.component";
import { DataProviderPlanClientTreeComponent } from "./data-provider/plan-client/tree/tree.component";
import { DataProviderPlanPriceAddComponent } from "./data-provider/plan-price/add/add.component";
import { DataProviderPlanPriceChargePaymentComponent } from "./data-provider/plan-price/charge-payment/charge-payment.component";
import { DataProviderPlanPriceChargeComponent } from "./data-provider/plan-price/charge/charge.component";
import { DataProviderPlanPriceDeleteComponent } from "./data-provider/plan-price/delete/delete.component";
import { DataProviderPlanPriceEditComponent } from "./data-provider/plan-price/edit/edit.component";
import { DataProviderPlanPriceHeaderComponent } from "./data-provider/plan-price/header/header.component";
import { DataProviderPlanPriceListComponent } from "./data-provider/plan-price/list/list.component";
import { DataProviderPlanPriceSelectorComponent } from "./data-provider/plan-price/selector/selector.component";
import { DataProviderPlanPriceTreeComponent } from "./data-provider/plan-price/tree/tree.component";
import { DataProviderPlanSourceAddComponent } from "./data-provider/plan-source/add/add.component";
import { DataProviderPlanSourceDeleteComponent } from "./data-provider/plan-source/delete/delete.component";
import { DataProviderPlanSourceEditComponent } from "./data-provider/plan-source/edit/edit.component";
import { DataProviderPlanSourceHeaderComponent } from "./data-provider/plan-source/header/header.component";
import { DataProviderPlanSourceListComponent } from "./data-provider/plan-source/list/list.component";
import { DataProviderPlanSourceSelectorComponent } from "./data-provider/plan-source/selector/selector.component";
import { DataProviderPlanSourceTreeComponent } from "./data-provider/plan-source/tree/tree.component";
import { DataProviderPlanAddComponent } from "./data-provider/plan/add/add.component";
import { DataProviderPlanDeleteComponent } from "./data-provider/plan/delete/delete.component";
import { DataProviderPlanEditComponent } from "./data-provider/plan/edit/edit.component";
import { DataProviderPlanHeaderComponent } from "./data-provider/plan/header/header.component";
import { DataProviderPlanListComponent } from "./data-provider/plan/list/list.component";
import { DataProviderPlanSelectionlistComponent } from "./data-provider/plan/selectionlist/selectionlist.component";
import { DataProviderPlanSelectorComponent } from "./data-provider/plan/selector/selector.component";
import { DataProviderPlanTreeComponent } from "./data-provider/plan/tree/tree.component";
import { DataProviderSourceAddComponent } from "./data-provider/source/add/add.component";
import { DataProviderSourceDeleteComponent } from "./data-provider/source/delete/delete.component";
import { DataProviderSourceEditComponent } from "./data-provider/source/edit/edit.component";
import { DataProviderSourceHeaderComponent } from "./data-provider/source/header/header.component";
import { DataProviderSourceListComponent } from "./data-provider/source/list/list.component";
import { DataProviderSourceSelectorComponent } from "./data-provider/source/selector/selector.component";
import { DataProviderSourceTreeComponent } from "./data-provider/source/tree/tree.component";
import { DataProviderTransactionComponent } from "./data-provider/transaction/data-provider-transaction.component";
import { DataProviderTransactionListComponent } from "./data-provider/transaction/list/list.component";
import { DataProviderTransactionListMobileComponent } from "./data-provider/transaction/list/list.mobile.component";
import { DataProviderTransactionViewComponent } from "./data-provider/transaction/view/view.component";
import { DonateConfigCheckSiteComponent } from "./donate/config/check-site/check-site.component";
import { DonateConfigCheckUserComponent } from "./donate/config/check-user/check-user.component";
import { DonateConfigComponent } from "./donate/config/donate-config.component";
import { DonateConfigMainAdminComponent } from "./donate/config/main-admin/config-main-admin.component";
import { DonateConfigSiteComponent } from "./donate/config/site/config-site.component";
import { DonateComponent } from "./donate/donate.component";
import { DonateLogViewListComponent } from "./donate/log-view/list/list.component";
import { DonateLogViewListMobileComponent } from "./donate/log-view/list/list.mobile.component";
import { DonateLogViewComponent } from "./donate/log-view/view/view.component";
import { DonateSponserAddComponent } from "./donate/sponser/add/add.component";
import { DonateSponserDeleteComponent } from "./donate/sponser/delete/delete.component";
import { DonateSponserEditComponent } from "./donate/sponser/edit/edit.component";
import { DonateSponserHeaderComponent } from "./donate/sponser/header/header.component";
import { DonateSponserListComponent } from "./donate/sponser/list/list.component";
import { DonateSponserListMobileComponent } from "./donate/sponser/list/list.mobile.component";
import { DonateSponserSelectorComponent } from "./donate/sponser/selector/selector.component";
import { DonateSponserTreeComponent } from "./donate/sponser/tree/tree.component";
import { DonateTargetCategoryAddComponent } from "./donate/target-category/add/add.component";
import { DonateTargetCategoryDeleteComponent } from "./donate/target-category/delete/delete.component";
import { DonateTargetCategoryEditComponent } from "./donate/target-category/edit/edit.component";
import { DonateTargetCategorySelectorComponent } from "./donate/target-category/selector/selector.component";
import { DonateTargetCategoryTreeComponent } from "./donate/target-category/tree/tree.component";
import { DonateTargetPeriodSponserAddComponent } from "./donate/target-period-sponsor/add/add.component";
import { DonateTargetPeriodSponserDeleteComponent } from "./donate/target-period-sponsor/delete/delete.component";
import { DonateTargetPeriodSponserEditComponent } from "./donate/target-period-sponsor/edit/edit.component";
import { DonateTargetPeriodSponserHeaderComponent } from "./donate/target-period-sponsor/header/header.component";
import { DonateTargetPeriodSponserListComponent } from "./donate/target-period-sponsor/list/list.component";
import { DonateTargetPeriodSponserListMobileComponent } from "./donate/target-period-sponsor/list/list.mobile.component";
import { DonateTargetPeriodSponserSelectorComponent } from "./donate/target-period-sponsor/selector/selector.component";
import { DonateTargetPeriodSponserTreeComponent } from "./donate/target-period-sponsor/tree/tree.component";
import { DonateTargetPeriodAddComponent } from "./donate/target-period/add/add.component";
import { DonateTargetPeriodChargePaymentComponent } from "./donate/target-period/charge-payment/charge-payment.component";
import { DonateTargetPeriodChargeComponent } from "./donate/target-period/charge/charge.component";
import { DonateTargetPeriodDeleteComponent } from "./donate/target-period/delete/delete.component";
import { DonateTargetPeriodEditComponent } from "./donate/target-period/edit/edit.component";
import { DonateTargetPeriodHeaderComponent } from "./donate/target-period/header/header.component";
import { DonateTargetPeriodListComponent } from "./donate/target-period/list/list.component";
import { DonateTargetPeriodListMobileComponent } from "./donate/target-period/list/list.mobile.component";
import { DonateTargetPeriodSelectorComponent } from "./donate/target-period/selector/selector.component";
import { DonateTargetAddComponent } from "./donate/target/add/add.component";
import { DonateTargetDeleteComponent } from "./donate/target/delete/delete.component";
import { DonateTargetEditComponent } from "./donate/target/edit/edit.component";
import { DonateTargetHeaderComponent } from "./donate/target/header/header.component";
import { DonateTargetListComponent } from "./donate/target/list/list.component";
import { DonateTargetListMobileComponent } from "./donate/target/list/list.mobile.component";
import { DonateTargetSelectorComponent } from "./donate/target/selector/selector.component";
import { DonateTargetTreeComponent } from "./donate/target/tree/tree.component";
import { DonateTransactionListComponent } from "./donate/transaction/list/list.component";
import { DonateTransactionListMobileComponent } from "./donate/transaction/list/list.mobile.component";
import { DonateTransactionViewComponent } from "./donate/transaction/view/view.component";
import { EstateActionComponent } from "./estate/action/estate-action.component";
import { EstateCategoryRackAddComponent } from "./estate/category-rack/add/add.component";
import { EstateCategoryRackAddMobileComponent } from "./estate/category-rack/add/add.mobile.component";
import { EstateCategoryRackEditComponent } from "./estate/category-rack/edit/edit.component";
import { EstateCategoryRackEditMobileComponent } from "./estate/category-rack/edit/edit.mobile.component";
import { EstateCategoryRackListComponent } from "./estate/category-rack/list/list.component";
import { EstateCategoryRackListMobileComponent } from "./estate/category-rack/list/list.mobile.component";
import { EstateCategoryRackSelectorComponent } from "./estate/category-rack/selector/selector.component";
import { EstateCategoryRackTreeComponent } from "./estate/category-rack/tree/tree.component";
import { EstateCategoryZoneAddComponent } from "./estate/category-zone/add/add.component";
import { EstateCategoryZoneAddMobileComponent } from "./estate/category-zone/add/add.mobile.component";
import { EstateCategoryZoneEditComponent } from "./estate/category-zone/edit/edit.component";
import { EstateCategoryZoneEditMobileComponent } from "./estate/category-zone/edit/edit.mobile.component";
import { EstateCategoryZoneListComponent } from "./estate/category-zone/list/list.component";
import { EstateCategoryZoneListMobileComponent } from "./estate/category-zone/list/list.mobile.component";
import { EstateCategoryZoneSelectorComponent } from "./estate/category-zone/selector/selector.component";
import { EstateCategoryZoneTreeComponent } from "./estate/category-zone/tree/tree.component";
import { EstateConfigCheckSiteComponent } from "./estate/config/check-site/check-site.component";
import { EstateConfigCheckUserComponent } from "./estate/config/check-user/check-user.component";
import { EstateConfigComponent } from "./estate/config/estate-config.component";
import { EstateConfigMainAdminComponent } from "./estate/config/main-admin/config-main-admin.component";
import { EstateConfigSiteComponent } from "./estate/config/site/config-site.component";
import { EstateDashboardComponent } from "./estate/dashboard/dashboard.component";
import { EstateBillboardAddComponent } from "./estate/data/billboard/add/add.component";
import { EstateBillboardAddMobileComponent } from "./estate/data/billboard/add/add.mobile.component";
import { EstateBillboardEditComponent } from "./estate/data/billboard/edit/edit.component";
import { EstateBillboardEditMobileComponent } from "./estate/data/billboard/edit/edit.mobile.component";
import { EstateBillboardHeaderComponent } from "./estate/data/billboard/header/header.component";
import { EstateBillboardListComponent } from "./estate/data/billboard/list/list.component";
import { EstateBillboardListMobileComponent } from "./estate/data/billboard/list/list.mobile.component";
import { EstateBillboardSelectorComponent } from "./estate/data/billboard/selector/selector.component";
import { EstateBillboardTreeComponent } from "./estate/data/billboard/tree/tree.component";
import { EstateDataComponent } from "./estate/data/estate-data.component";
import { EstatePropertyAdsAddComponent } from "./estate/data/property-ads/add/add.component";
import { EstatePropertyAdsAddMobileComponent } from "./estate/data/property-ads/add/add.mobile.component";
import { EstatePropertyAdsEditComponent } from "./estate/data/property-ads/edit/edit.component";
import { EstatePropertyAdsEditMobileComponent } from "./estate/data/property-ads/edit/edit.mobile.component";
import { EstatePropertyAdsListComponent } from "./estate/data/property-ads/list/list.component";
import { EstatePropertyAdsListMobileComponent } from "./estate/data/property-ads/list/list.mobile.component";
import { EstatePropertyAdsSaleListComponent } from "./estate/data/property-ads/sale-list/sale-list.component";
import { EstatePropertyAdsSalePaymentComponent } from "./estate/data/property-ads/sale-payment/sale-payment.component";
import { EstatePropertyCompanyAddComponent } from "./estate/data/property-company/add/add.component";
import { EstatePropertyCompanyAddMobileComponent } from "./estate/data/property-company/add/add.mobile.component";
import { EstatePropertyCompanyDeleteComponent } from "./estate/data/property-company/delete/delete.component";
import { EstatePropertyCompanyEditComponent } from "./estate/data/property-company/edit/edit.component";
import { EstatePropertyCompanyEditMobileComponent } from "./estate/data/property-company/edit/edit.mobile.component";
import { EstatePropertyCompanyHeaderComponent } from "./estate/data/property-company/header/header.component";
import { EstatePropertyCompanyListComponent } from "./estate/data/property-company/list/list.component";
import { EstatePropertyCompanyListMobileComponent } from "./estate/data/property-company/list/list.mobile.component";
import { EstatePropertyCompanyQuickViewComponent } from "./estate/data/property-company/quick-view/quick-view.component";
import { EstatePropertyCompanySelectorComponent } from "./estate/data/property-company/selector/selector.component";
import { EstatePropertyCompanyTreeComponent } from "./estate/data/property-company/tree/tree.component";
import { EstatePropertyProjectAddComponent } from "./estate/data/property-project/add/add.component";
import { EstatePropertyProjectAddMobileComponent } from "./estate/data/property-project/add/add.mobile.component";
import { EstatePropertyProjectDeleteComponent } from "./estate/data/property-project/delete/delete.component";
import { EstatePropertyProjectEditComponent } from "./estate/data/property-project/edit/edit.component";
import { EstatePropertyProjectEditMobileComponent } from "./estate/data/property-project/edit/edit.mobile.component";
import { EstatePropertyProjectHeaderComponent } from "./estate/data/property-project/header/header.component";
import { EstatePropertyProjectListComponent } from "./estate/data/property-project/list/list.component";
import { EstatePropertyProjectListMobileComponent } from "./estate/data/property-project/list/list.mobile.component";
import { EstatePropertyProjectQuickViewComponent } from "./estate/data/property-project/quick-view/quick-view.component";
import { EstatePropertyProjectSelectorComponent } from "./estate/data/property-project/selector/selector.component";
import { EstatePropertyProjectTreeComponent } from "./estate/data/property-project/tree/tree.component";
import { EstatePropertySupplierAddComponent } from "./estate/data/property-supplier/add/add.component";
import { EstatePropertySupplierAddMobileComponent } from "./estate/data/property-supplier/add/add.mobile.component";
import { EstatePropertySupplierDeleteComponent } from "./estate/data/property-supplier/delete/delete.component";
import { EstatePropertySupplierEditComponent } from "./estate/data/property-supplier/edit/edit.component";
import { EstatePropertySupplierEditMobileComponent } from "./estate/data/property-supplier/edit/edit.mobile.component";
import { EstatePropertySupplierHeaderComponent } from "./estate/data/property-supplier/header/header.component";
import { EstatePropertySupplierListComponent } from "./estate/data/property-supplier/list/list.component";
import { EstatePropertySupplierListMobileComponent } from "./estate/data/property-supplier/list/list.mobile.component";
import { EstatePropertySupplierQuickViewComponent } from "./estate/data/property-supplier/quick-view/quick-view.component";
import { EstatePropertySupplierSelectorComponent } from "./estate/data/property-supplier/selector/selector.component";
import { EstatePropertySupplierTreeComponent } from "./estate/data/property-supplier/tree/tree.component";
import { EstatePropertyActionComponent } from "./estate/data/property/action/action.component";
import { EstatePropertyAddComponent } from "./estate/data/property/add/add.component";
import { EstatePropertyAddMobileComponent } from "./estate/data/property/add/add.mobile.component";
import { EstatePropertyCompleteComponent } from "./estate/data/property/autocomplete/autocomplete.component";
import { EstatePropertyEditComponent } from "./estate/data/property/edit/edit.component";
import { EstatePropertyHeaderComponent } from "./estate/data/property/header/header.component";
import { EstatePropertyListComponent } from "./estate/data/property/list/list.component";
import { EstatePropertyListMobileComponent } from "./estate/data/property/list/list.mobile.component";
import { EstatePropertyQuickAddComponent } from "./estate/data/property/quick-add/quick-add.component";
import { EstatePropertyQuickListComponent } from "./estate/data/property/quick-list/quick-list.component";
import { EstatePropertyQuickViewComponent } from "./estate/data/property/quick-view/quick-view.component";
import { EstatePropertyResponsibleUserListComponent } from "./estate/data/property/responsible-user-list/responsible-user-list.component";
import { EstatePropertySelectorComponent } from "./estate/data/property/selector/selector.component";
import { EstatePropertyWidgetComponent } from "./estate/data/property/widget/widget.component";
import { EstateComponent } from "./estate/estate.component";
import { EstateCustomerOrderResultListComponent } from "./estate/log/customer-order-result/list/list.component";
import { EstateCustomerOrderResultListMobileComponent } from "./estate/log/customer-order-result/list/list.mobile.component";
import { EstateCustomerOrderResultViewComponent } from "./estate/log/customer-order-result/view/view.component";
import { EstateCustomerOrderActionComponent } from "./estate/log/customer-order/action/action.component";
import { EstateCustomerOrderAddToEditComponent } from "./estate/log/customer-order/add/add-to-edit.component";
import { EstateCustomerOrderAddMobileComponent } from "./estate/log/customer-order/add/add.mobile.component";
import { EstateCustomerOrderEditComponent } from "./estate/log/customer-order/edit/edit.component";
import { EstateCustomerOrderEditMobileComponent } from "./estate/log/customer-order/edit/edit.mobile.component";
import { EstateCustomerOrderHeaderComponent } from "./estate/log/customer-order/header/header.component";
import { EstateCustomerOrderListComponent } from "./estate/log/customer-order/list/list.component";
import { EstateCustomerOrderListMobileComponent } from "./estate/log/customer-order/list/list.mobile.component";
import { EstateCustomerOrderQuickViewComponent } from "./estate/log/customer-order/quick-view/quick-view.component";
import { EstateCustomerOrderResponsibleUserListComponent } from "./estate/log/customer-order/responsible-user-list/responsible-user-list.component";
import { EstateCustomerOrderSelectorComponent } from "./estate/log/customer-order/selector/selector.component";
import { EstateCustomerOrderWidgetComponent } from "./estate/log/customer-order/widget/widget.component";
import { EstateLogComponent } from "./estate/log/estate-log.component";
import { EstatePropertyExpertPriceAddComponent } from "./estate/log/property-expert-price/add/add.component";
import { EstatePropertyExpertPriceAddMobileComponent } from "./estate/log/property-expert-price/add/add.mobile.component";
import { EstatePropertyExpertPriceEditComponent } from "./estate/log/property-expert-price/edit/edit.component";
import { EstatePropertyExpertPriceEditMobileComponent } from "./estate/log/property-expert-price/edit/edit.mobile.component";
import { EstatePropertyExpertPriceHeaderComponent } from "./estate/log/property-expert-price/header/header.component";
import { EstatePropertyExpertPriceInquiryCalculateComponent } from "./estate/log/property-expert-price/inquiry-calculate/inquiry-calculate.component";
import { EstatePropertyExpertPriceInquiryListComponent } from "./estate/log/property-expert-price/inquiry-list/inquiry-list.component";
import { EstatePropertyExpertPriceListComponent } from "./estate/log/property-expert-price/list/list.component";
import { EstatePropertyExpertPriceListMobileComponent } from "./estate/log/property-expert-price/list/list.mobile.component";
import { EstatePropertyHistoryAddComponent } from "./estate/log/property-history/add/add.component";
import { EstatePropertyHistoryAddMobileComponent } from "./estate/log/property-history/add/add.mobile.component";
import { EstatePropertyHistoryEditComponent } from "./estate/log/property-history/edit/edit.component";
import { EstatePropertyHistoryEditMobileComponent } from "./estate/log/property-history/edit/edit.mobile.component";
import { EstatePropertyHistoryListComponent } from "./estate/log/property-history/list/list.component";
import { EstatePropertyHistoryListMobileComponent } from "./estate/log/property-history/list/list.mobile.component";
import { EstatePropertyHistoryQuickViewComponent } from "./estate/log/property-history/quick-view/quick-view.component";
import { EstatePropertyHistoryResponsibleUserListComponent } from "./estate/log/property-history/responsible-user-list/responsible-user-list.component";
import { EstatePropertyHistoryWidgetComponent } from "./estate/log/property-history/widget/widget.component";
import { EstateAccountAgencyAdsAddComponent } from "./estate/main/account-agency-ads/add/add.component";
import { EstateAccountAgencyAdsAddMobileComponent } from "./estate/main/account-agency-ads/add/add.mobile.component";
import { EstateAccountAgencyAdsEditComponent } from "./estate/main/account-agency-ads/edit/edit.component";
import { EstateAccountAgencyAdsEditMobileComponent } from "./estate/main/account-agency-ads/edit/edit.mobile.component";
import { EstateAccountAgencyAdsListComponent } from "./estate/main/account-agency-ads/list/list.component";
import { EstateAccountAgencyAdsListMobileComponent } from "./estate/main/account-agency-ads/list/list.mobile.component";
import { EstateAccountAgencyAdsSaleListComponent } from "./estate/main/account-agency-ads/sale-list/sale-list.component";
import { EstateAccountAgencyAdsSalePaymentComponent } from "./estate/main/account-agency-ads/sale-payment/sale-payment.component";
import { EstateAccountAgencyExpertAddComponent } from "./estate/main/account-agency-expert/add/add.component";
import { EstateAccountAgencyExpertListComponent } from "./estate/main/account-agency-expert/list/list.component";
import { EstateAccountAgencyExpertListMobileComponent } from "./estate/main/account-agency-expert/list/list.mobile.component";
import { EstateAccountAgencyWorkAreaAddComponent } from "./estate/main/account-agency-work-area/add/add.component";
import { EstateAccountAgencyWorkAreaListComponent } from "./estate/main/account-agency-work-area/list/list.component";
import { EstateAccountAgencyWorkAreaListMobileComponent } from "./estate/main/account-agency-work-area/list/list.mobile.component";
import { EstateAccountAgencyAddComponent } from "./estate/main/account-agency/add/add.component";
import { EstateAccountAgencyAddMobileComponent } from "./estate/main/account-agency/add/add.mobile.component";
import { EstateAccountAgencyEditComponent } from "./estate/main/account-agency/edit/edit.component";
import { EstateAccountAgencyEditMobileComponent } from "./estate/main/account-agency/edit/edit.mobile.component";
import { EstateAccountAgencyHeaderComponent } from "./estate/main/account-agency/header/header.component";
import { EstateAccountAgencyListComponent } from "./estate/main/account-agency/list/list.component";
import { EstateAccountAgencyListMobileComponent } from "./estate/main/account-agency/list/list.mobile.component";
import { EstateAccountAgencySelectionlistComponent } from "./estate/main/account-agency/selectionlist/selectionlist.component";
import { EstateAccountAgencySelectorComponent } from "./estate/main/account-agency/selector/selector.component";
import { EstateAccountAgencyTreeComponent } from "./estate/main/account-agency/tree/tree.component";
import { EstateAccountExpertWorkAreaAddComponent } from "./estate/main/account-expert-work-area/add/add.component";
import { EstateAccountExpertWorkAreaListComponent } from "./estate/main/account-expert-work-area/list/list.component";
import { EstateAccountExpertWorkAreaListMobileComponent } from "./estate/main/account-expert-work-area/list/list.mobile.component";
import { EstateAccountExpertAddComponent } from "./estate/main/account-expert/add/add.component";
import { EstateAccountExpertAddMobileComponent } from "./estate/main/account-expert/add/add.mobile.component";
import { EstateAccountExpertEditComponent } from "./estate/main/account-expert/edit/edit.component";
import { EstateAccountExpertEditMobileComponent } from "./estate/main/account-expert/edit/edit.mobile.component";
import { EstateAccountExpertHeaderComponent } from "./estate/main/account-expert/header/header.component";
import { EstateAccountExpertListComponent } from "./estate/main/account-expert/list/list.component";
import { EstateAccountExpertListMobileComponent } from "./estate/main/account-expert/list/list.mobile.component";
import { EstateAccountExpertSelectionlistComponent } from "./estate/main/account-expert/selectionlist/selectionlist.component";
import { EstateAccountExpertSelectorComponent } from "./estate/main/account-expert/selector/selector.component";
import { EstateAccountExpertTreeComponent } from "./estate/main/account-expert/tree/tree.component";
import { EstateActivityTypeAddComponent } from "./estate/main/activity-type/add/add.component";
import { EstateActivityTypeAddMobileComponent } from "./estate/main/activity-type/add/add.mobile.component";
import { EstateActivityTypeCompleteComponent } from "./estate/main/activity-type/autocomplete/autocomplete.component";
import { EstateActivityTypeEditComponent } from "./estate/main/activity-type/edit/edit.component";
import { EstateActivityTypeEditMobileComponent } from "./estate/main/activity-type/edit/edit.mobile.component";
import { EstateActivityTypeHeaderComponent } from "./estate/main/activity-type/header/header.component";
import { EstateActivityTypeListComponent } from "./estate/main/activity-type/list/list.component";
import { EstateActivityTypeListMobileComponent } from "./estate/main/activity-type/list/list.mobile.component";
import { EstateActivityTypeSelectionlistComponent } from "./estate/main/activity-type/selectionlist/selectionlist.component";
import { EstateActivityTypeSelectorComponent } from "./estate/main/activity-type/selector/selector.component";
import { EstateActivityTypeTreeComponent } from "./estate/main/activity-type/tree/tree.component";
import { EstateAdsTypeAddComponent } from "./estate/main/ads-type/add/add.component";
import { EstateAdsTypeAddMobileComponent } from "./estate/main/ads-type/add/add.mobile.component";
import { EstateAdsTypeEditComponent } from "./estate/main/ads-type/edit/edit.component";
import { EstateAdsTypeEditMobileComponent } from "./estate/main/ads-type/edit/edit.mobile.component";
import { EstateAdsTypeListComponent } from "./estate/main/ads-type/list/list.component";
import { EstateAdsTypeListMobileComponent } from "./estate/main/ads-type/list/list.mobile.component";
import { EstateAdsTypeSelectorComponent } from "./estate/main/ads-type/selector/selector.component";
import { EstateContractTypeAddComponent } from "./estate/main/contract-type/add/add.component";
import { EstateContractTypeAddMobileComponent } from "./estate/main/contract-type/add/add.mobile.component";
import { EstateContractTypeCompleteComponent } from "./estate/main/contract-type/autocomplete/autocomplete.component";
import { EstateContractTypeEditComponent } from "./estate/main/contract-type/edit/edit.component";
import { EstateContractTypeEditMobileComponent } from "./estate/main/contract-type/edit/edit.mobile.component";
import { EstateContractTypeHeaderComponent } from "./estate/main/contract-type/header/header.component";
import { EstateContractTypeListComponent } from "./estate/main/contract-type/list/list.component";
import { EstateContractTypeListMobileComponent } from "./estate/main/contract-type/list/list.mobile.component";
import { EstateContractTypeSelectorComponent } from "./estate/main/contract-type/selector/selector.component";
import { EstateContractTypeTreeComponent } from "./estate/main/contract-type/tree/tree.component";
import { EstateCustomerCategoryAddComponent } from "./estate/main/customer-category/add/add.component";
import { EstateCustomerCategoryEditComponent } from "./estate/main/customer-category/edit/edit.component";
import { EstateCustomerCategorySelectorComponent } from "./estate/main/customer-category/selector/selector.component";
import { EstateCustomerCategoryTreeComponent } from "./estate/main/customer-category/tree/tree.component";
import { EstateMainComponent } from "./estate/main/estate-main.component";
import { EstatePropertyDetailGroupAddComponent } from "./estate/main/property-detail-group/add/add.component";
import { EstatePropertyDetailGroupAddMobileComponent } from "./estate/main/property-detail-group/add/add.mobile.component";
import { EstatePropertyDetailGroupEditComponent } from "./estate/main/property-detail-group/edit/edit.component";
import { EstatePropertyDetailGroupEditMobileComponent } from "./estate/main/property-detail-group/edit/edit.mobile.component";
import { EstatePropertyDetailGroupListComponent } from "./estate/main/property-detail-group/list/list.component";
import { EstatePropertyDetailGroupListMobileComponent } from "./estate/main/property-detail-group/list/list.mobile.component";
import { EstatePropertyDetailGroupSelectorComponent } from "./estate/main/property-detail-group/selector/selector.component";
import { EstatePropertyDetailGroupTreeComponent } from "./estate/main/property-detail-group/tree/tree.component";
import { EstatePropertyDetailAddComponent } from "./estate/main/property-detail/add/add.component";
import { EstatePropertyDetailAddMobileComponent } from "./estate/main/property-detail/add/add.mobile.component";
import { EstatePropertyDetailEditComponent } from "./estate/main/property-detail/edit/edit.component";
import { EstatePropertyDetailEditMobileComponent } from "./estate/main/property-detail/edit/edit.mobile.component";
import { EstatePropertyDetailListComponent } from "./estate/main/property-detail/list/list.component";
import { EstatePropertyDetailListMobileComponent } from "./estate/main/property-detail/list/list.mobile.component";
import { EstatePropertyDetailSelectorComponent } from "./estate/main/property-detail/selector/selector.component";
import { EstatePropertyDetailTreeComponent } from "./estate/main/property-detail/tree/tree.component";
import { EstatePropertySupplierCategoryAddComponent } from "./estate/main/property-supplier-category/add/add.component";
import { EstatePropertySupplierCategoryEditComponent } from "./estate/main/property-supplier-category/edit/edit.component";
import { EstatePropertySupplierCategorySelectorComponent } from "./estate/main/property-supplier-category/selector/selector.component";
import { EstatePropertySupplierCategoryTreeSelectorComponent } from "./estate/main/property-supplier-category/tree-selector/tree-selector.component";
import { EstatePropertySupplierCategoryTreeComponent } from "./estate/main/property-supplier-category/tree/tree.component";
import { EstatePropertyTypeLanduseAddComponent } from "./estate/main/property-type-landuse/add/add.component";
import { EstatePropertyTypeLanduseAddMobileComponent } from "./estate/main/property-type-landuse/add/add.mobile.component";
import { EstatePropertyTypeLanduseCompleteComponent } from "./estate/main/property-type-landuse/autocomplete/autocomplete.component";
import { EstatePropertyTypeLanduseEditComponent } from "./estate/main/property-type-landuse/edit/edit.component";
import { EstatePropertyTypeLanduseEditMobileComponent } from "./estate/main/property-type-landuse/edit/edit.mobile.component";
import { EstatePropertyTypeLanduseHeaderComponent } from "./estate/main/property-type-landuse/header/header.component";
import { EstatePropertyTypeLanduseListComponent } from "./estate/main/property-type-landuse/list/list.component";
import { EstatePropertyTypeLanduseListMobileComponent } from "./estate/main/property-type-landuse/list/list.mobile.component";
import { EstatePropertyTypeLanduseSelectionlistComponent } from "./estate/main/property-type-landuse/selectionlist/selectionlist.component";
import { EstatePropertyTypeLanduseSelectorComponent } from "./estate/main/property-type-landuse/selector/selector.component";
import { EstatePropertyTypeLanduseTreeComponent } from "./estate/main/property-type-landuse/tree/tree.component";
import { EstatePropertyTypeUsageAddComponent } from "./estate/main/property-type-usage/add/add.component";
import { EstatePropertyTypeUsageAddMobileComponent } from "./estate/main/property-type-usage/add/add.mobile.component";
import { EstatePropertyTypeUsageCompleteComponent } from "./estate/main/property-type-usage/autocomplete/autocomplete.component";
import { EstatePropertyTypeUsageEditComponent } from "./estate/main/property-type-usage/edit/edit.component";
import { EstatePropertyTypeUsageEditMobileComponent } from "./estate/main/property-type-usage/edit/edit.mobile.component";
import { EstatePropertyTypeUsageHeaderComponent } from "./estate/main/property-type-usage/header/header.component";
import { EstatePropertyTypeUsageListComponent } from "./estate/main/property-type-usage/list/list.component";
import { EstatePropertyTypeUsageListMobileComponent } from "./estate/main/property-type-usage/list/list.mobile.component";
import { EstatePropertyTypeUsageSelectionlistComponent } from "./estate/main/property-type-usage/selectionlist/selectionlist.component";
import { EstatePropertyTypeUsageSelectorComponent } from "./estate/main/property-type-usage/selector/selector.component";
import { EstatePropertyTypeUsageTreeComponent } from "./estate/main/property-type-usage/tree/tree.component";
import { EstateOverviewEventsComponent } from "./estate/overview/events/events.component";
import { EstateOverviewSummaryComponent } from "./estate/overview/summary/summary.component";
import { FileCategoryDeleteComponent } from "./file-manager/category/delete/delete.component";
import { FileCategoryEditComponent } from "./file-manager/category/edit/edit.component";
import { FileCategorySelectorComponent } from "./file-manager/category/selector/selector.component";
import { FileCategoryTreeComponent } from "./file-manager/category/tree/tree.component";
import { FileContentDeleteComponent } from "./file-manager/content/delete/delete.component";
import { FileContentEditComponent } from "./file-manager/content/edit/edit.component";
import { FileContentExplorerComponent } from "./file-manager/content/explorer/explorer.component";
import { FileContentListComponent } from "./file-manager/content/list/list.component";
import { FileContentListMobileComponent } from "./file-manager/content/list/list.mobile.component";
import { FileContentSelectorComponent } from "./file-manager/content/selector/selector.component";
import { FileManagerComponent } from "./file-manager/file-manager.component";
import { HyperShopCategoryAddComponent } from "./hyper-shop/category/add/add.component";
import { HyperShopCategoryEditComponent } from "./hyper-shop/category/edit/edit.component";
import { HyperShopCategoryListComponent } from "./hyper-shop/category/list/list.component";
import { HyperShopCategoryListMobileComponent } from "./hyper-shop/category/list/list.mobile.component";
import { HyperShopCategorySelectorComponent } from "./hyper-shop/category/selector/selector.component";
import { HyperShopCategoryTreeComponent } from "./hyper-shop/category/tree/tree.component";
import { HyperShopConfigCheckSiteComponent } from "./hyper-shop/config/check-site/check-site.component";
import { HyperShopConfigCheckUserComponent } from "./hyper-shop/config/check-user/check-user.component";
import { HyperShopConfigComponent } from "./hyper-shop/config/hyper-shop-config.component";
import { HyperShopConfigMainAdminComponent } from "./hyper-shop/config/main-admin/config-main-admin.component";
import { HyperShopConfigSiteComponent } from "./hyper-shop/config/site/config-site.component";
import { HyperShopContentAddComponent } from "./hyper-shop/content/add/add.component";
import { HyperShopContentEditComponent } from "./hyper-shop/content/edit/edit.component";
import { HyperShopContentListComponent } from "./hyper-shop/content/list/list.component";
import { HyperShopContentListMobileComponent } from "./hyper-shop/content/list/list.mobile.component";
import { HyperShopContentViewComponent } from "./hyper-shop/content/view/view.component";
import { HyperShopComponent } from "./hyper-shop/hyper-shop.component";
import { LinkManagementAccountingDetailAddComponent } from "./link-management/accounting-detail/add/add.component";
import { LinkManagementAccountingDetailDeleteComponent } from "./link-management/accounting-detail/delete/delete.component";
import { LinkManagementAccountingDetailEditComponent } from "./link-management/accounting-detail/edit/edit.component";
import { LinkManagementAccountingDetailListComponent } from "./link-management/accounting-detail/list/list.component";
import { LinkManagementAccountingDetailListMobileComponent } from "./link-management/accounting-detail/list/list.mobile.component";
import { LinkManagementAccountingAddComponent } from "./link-management/accounting/add/add.component";
import { LinkManagementAccountingDeleteComponent } from "./link-management/accounting/delete/delete.component";
import { LinkManagementAccountingEditComponent } from "./link-management/accounting/edit/edit.component";
import { LinkManagementAccountingListComponent } from "./link-management/accounting/list/list.component";
import { LinkManagementAccountingListMobileComponent } from "./link-management/accounting/list/list.mobile.component";
import { LinkManagementAccountingSelectorComponent } from "./link-management/accounting/selector/selector.component";
import { LinkManagementBillboardPatternAddComponent } from "./link-management/billboard-pattern/add/add.component";
import { LinkManagementBillboardPatternDeleteComponent } from "./link-management/billboard-pattern/delete/delete.component";
import { LinkManagementBillboardPatternEditComponent } from "./link-management/billboard-pattern/edit/edit.component";
import { LinkManagementBillboardPatternListComponent } from "./link-management/billboard-pattern/list/list.component";
import { LinkManagementBillboardPatternListMobileComponent } from "./link-management/billboard-pattern/list/list.mobile.component";
import { LinkManagementBillboardPatternSelectorComponent } from "./link-management/billboard-pattern/selector/selector.component";
import { LinkManagementBillboardPatternTreeSelectorComponent } from "./link-management/billboard-pattern/tree-selector/tree-selector.component";
import { LinkManagementBillboardPatternTreeComponent } from "./link-management/billboard-pattern/tree/tree.component";
import { LinkManagementBillboardAddComponent } from "./link-management/billboard/add/add.component";
import { LinkManagementBillboardDeleteComponent } from "./link-management/billboard/delete/delete.component";
import { LinkManagementBillboardEditComponent } from "./link-management/billboard/edit/edit.component";
import { LinkManagementBillboardListComponent } from "./link-management/billboard/list/list.component";
import { LinkManagementBillboardListMobileComponent } from "./link-management/billboard/list/list.mobile.component";
import { LinkManagementCategoryAddComponent } from "./link-management/category/add/add.component";
import { LinkManagementCategoryDeleteComponent } from "./link-management/category/delete/delete.component";
import { LinkManagementCategoryEditComponent } from "./link-management/category/edit/edit.component";
import { LinkManagementCategorySelectorComponent } from "./link-management/category/selector/selector.component";
import { LinkManagementCategoryTreeSelectorComponent } from "./link-management/category/tree-selector/tree-selector.component";
import { LinkManagementCategoryTreeComponent } from "./link-management/category/tree/tree.component";
import { LinkManagementConfigCheckSiteComponent } from "./link-management/config/check-site/check-site.component";
import { LinkManagementConfigCheckUserComponent } from "./link-management/config/check-user/check-user.component";
import { LinkManagementConfigComponent } from "./link-management/config/link-management-config.component";
import { LinkManagementConfigMainAdminComponent } from "./link-management/config/main-admin/config-main-admin.component";
import { LinkManagementConfigSiteComponent } from "./link-management/config/site/config-site.component";
import { LinkManagementComponent } from "./link-management/link-management.component";
import { LinkManagementMemberAddComponent } from "./link-management/member/add/add.component";
import { LinkManagementMemberDeleteComponent } from "./link-management/member/delete/delete.component";
import { LinkManagementMemberEditComponent } from "./link-management/member/edit/edit.component";
import { LinkManagementMemberListComponent } from "./link-management/member/list/list.component";
import { LinkManagementMemberListMobileComponent } from "./link-management/member/list/list.mobile.component";
import { LinkManagementMemberSelectorComponent } from "./link-management/member/selector/selector.component";
import { LinkManagementTargetBillboardLogDeleteComponent } from "./link-management/target-billboard-log/delete/delete.component";
import { LinkManagementTargetBillboardLogEditComponent } from "./link-management/target-billboard-log/edit/edit.component";
import { LinkManagementTargetBillboardLogListComponent } from "./link-management/target-billboard-log/list/list.component";
import { LinkManagementTargetBillboardLogListMobileComponent } from "./link-management/target-billboard-log/list/list.mobile.component";
import { LinkManagementTargetAddComponent } from "./link-management/target/add/add.component";
import { LinkManagementTargetDeleteComponent } from "./link-management/target/delete/delete.component";
import { LinkManagementTargetEditComponent } from "./link-management/target/edit/edit.component";
import { LinkManagementTargetListComponent } from "./link-management/target/list/list.component";
import { LinkManagementTargetListMobileComponent } from "./link-management/target/list/list.mobile.component";
import { MemberGroupAddComponent } from "./member/group/add/add.component";
import { MemberGroupDeleteComponent } from "./member/group/delete/delete.component";
import { MemberGroupEditComponent } from "./member/group/edit/edit.component";
import { MemberGroupHeaderComponent } from "./member/group/header/header.component";
import { MemberGroupListComponent } from "./member/group/list/list.component";
import { MemberGroupListMobileComponent } from "./member/group/list/list.mobile.component";
import { MemberGroupSelectorComponent } from "./member/group/selector/selector.component";
import { MemberGroupTreeComponent } from "./member/group/tree/tree.component";
import { MemberComponent } from "./member/member.component";
import { MemberPropertyAliasAddComponent } from "./member/property-alias/add/add.component";
import { MemberPropertyAliasDeleteComponent } from "./member/property-alias/delete/delete.component";
import { MemberPropertyAliasEditComponent } from "./member/property-alias/edit/edit.component";
import { MemberPropertyAliasHeaderComponent } from "./member/property-alias/header/header.component";
import { MemberPropertyAliasListComponent } from "./member/property-alias/list/list.component";
import { MemberPropertyAliasListMobileComponent } from "./member/property-alias/list/list.mobile.component";
import { MemberPropertyAliasSelectorComponent } from "./member/property-alias/selector/selector.component";
import { MemberPropertyAliasTreeComponent } from "./member/property-alias/tree/tree.component";
import { MemberPropertyDetailGroupAddComponent } from "./member/property-detail-group/add/add.component";
import { MemberPropertyDetailGroupEditComponent } from "./member/property-detail-group/edit/edit.component";
import { MemberPropertyDetailGroupListComponent } from "./member/property-detail-group/list/list.component";
import { MemberPropertyDetailGroupListMobileComponent } from "./member/property-detail-group/list/list.mobile.component";
import { MemberPropertyDetailGroupSelectorComponent } from "./member/property-detail-group/selector/selector.component";
import { MemberPropertyDetailGroupTreeComponent } from "./member/property-detail-group/tree/tree.component";
import { MemberPropertyDetailAddComponent } from "./member/property-detail/add/add.component";
import { MemberPropertyDetailEditComponent } from "./member/property-detail/edit/edit.component";
import { MemberPropertyDetailListComponent } from "./member/property-detail/list/list.component";
import { MemberPropertyDetailListMobileComponent } from "./member/property-detail/list/list.mobile.component";
import { MemberPropertyDetailSelectorComponent } from "./member/property-detail/selector/selector.component";
import { MemberPropertyDetailTreeComponent } from "./member/property-detail/tree/tree.component";
import { NewsCategoryAddComponent } from "./news/category/add/add.component";
import { NewsCategoryAddMobileComponent } from "./news/category/add/add.mobile.component";
import { NewsCategoryDeleteComponent } from "./news/category/delete/delete.component";
import { NewsCategoryDeleteMobileComponent } from "./news/category/delete/delete.mobile.component";
import { NewsCategoryEditComponent } from "./news/category/edit/edit.component";
import { NewsCategoryEditMobileComponent } from "./news/category/edit/edit.mobile.component";
import { NewsCategoryListComponent } from "./news/category/list/list.component";
import { NewsCategoryListMobileComponent } from "./news/category/list/list.mobile.component";
import { NewsCategoryMenuComponent } from "./news/category/menu/menu.component";
import { NewsCategorySelectorComponent } from "./news/category/selector/selector.component";
import { NewsCategoryTreeSelectorComponent } from "./news/category/tree-selector/tree-selector.component";
import { NewsCategoryTreeComponent } from "./news/category/tree/tree.component";
import { NewsCategoryViewComponent } from "./news/category/view/view.component";
import { NewsCategoryViewMobileComponent } from "./news/category/view/view.mobile.component";
import { NewsCommentEditComponent } from "./news/comment/edit/edit.component";
import { NewsCommentListComponent } from "./news/comment/list/list.component";
import { NewsCommentListMobileComponent } from "./news/comment/list/list.mobile.component";
import { NewsConfigCheckSiteComponent } from "./news/config/check-site/check-site.component";
import { NewsConfigCheckUserComponent } from "./news/config/check-user/check-user.component";
import { NewsConfigMainAdminComponent } from "./news/config/main-admin/config-main-admin.component";
import { NewsConfigComponent } from "./news/config/news-config.component";
import { NewsConfigSiteComponent } from "./news/config/site/config-site.component";
import { NewsContentAddComponent } from "./news/content/add/add.component";
import { NewsContentAddMobileComponent } from "./news/content/add/add.mobile.component";
import { NewsContentDeleteComponent } from "./news/content/delete/delete.component";
import { NewsContentDeleteMobileComponent } from "./news/content/delete/delete.mobile.component";
import { NewsContentEditComponent } from "./news/content/edit/edit.component";
import { NewsContentEditMobileComponent } from "./news/content/edit/edit.mobile.component";
import { NewsContentHeaderComponent } from "./news/content/header/header.component";
import { NewsContentListComponent } from "./news/content/list/list.component";
import { NewsContentListMobileComponent } from "./news/content/list/list.mobile.component";
import { NewsContentSelectorComponent } from "./news/content/selector/selector.component";
import { NewsContentViewComponent } from "./news/content/view/view.component";
import { NewsContentViewMobileComponent } from "./news/content/view/view.mobile.component";
import { NewsContentWidgetComponent } from "./news/content/widget/widget.component";
import { NewsComponent } from "./news/news.component";
import { PollingCategoryAddComponent } from "./polling/category/add/add.component";
import { PollingCategoryDeleteComponent } from "./polling/category/delete/delete.component";
import { PollingCategoryEditComponent } from "./polling/category/edit/edit.component";
import { PollingCategorySelectorComponent } from "./polling/category/selector/selector.component";
import { PollingCategoryTreeComponent } from "./polling/category/tree/tree.component";
import { PollingConfigCheckSiteComponent } from "./polling/config/check-site/check-site.component";
import { PollingConfigCheckUserComponent } from "./polling/config/check-user/check-user.component";
import { PollingConfigMainAdminComponent } from "./polling/config/main-admin/config-main-admin.component";
import { PollingConfigComponent } from "./polling/config/polling-config.component";
import { PollingConfigSiteComponent } from "./polling/config/site/config-site.component";
import { PollingContentAddComponent } from "./polling/content/add/add.component";
import { PollingContentDeleteComponent } from "./polling/content/delete/delete.component";
import { PollingContentEditComponent } from "./polling/content/edit/edit.component";
import { PollingContentListComponent } from "./polling/content/list/list.component";
import { PollingContentListMobileComponent } from "./polling/content/list/list.mobile.component";
import { PollingComponent } from "./polling/polling.component";
import { PollingVoteEditComponent } from "./polling/vote/edit/edit.component";
import { PollingVoteListComponent } from "./polling/vote/list/list.component";
import { PollingVoteListMobileComponent } from "./polling/vote/list/list.mobile.component";
import { SmsActionSendMessageApiComponent } from "./sms/action/send-message-api/send-message-api.component";
import { SmsActionSendMessageApiMobileComponent } from "./sms/action/send-message-api/send-message-api.mobile.component";
import { SmsActionSendMessageCalculateResultComponent } from "./sms/action/send-message/send-message-calculate-result/send-message-calculate-result.component";
import { SmsActionSendMessageResultComponent } from "./sms/action/send-message/send-message-result/send-message-result.component";
import { SmsActionSendMessageComponent } from "./sms/action/send-message/send-message.component";
import { SmsActionSendMessageMobileComponent } from "./sms/action/send-message/send-message.mobile.component";
import { SmsActionComponent } from "./sms/action/sms-action.component";
import { SmsConfigCheckSiteComponent } from "./sms/config/check-site/check-site.component";
import { SmsConfigCheckSiteMobileComponent } from "./sms/config/check-site/check-site.mobile.component";
import { SmsConfigCheckUserComponent } from "./sms/config/check-user/check-user.component";
import { SmsConfigCheckUserMobileComponent } from "./sms/config/check-user/check-user.mobile.component";
import { SmsConfigMainAdminComponent } from "./sms/config/main-admin/config-main-admin.component";
import { SmsConfigMainAdminMobileComponent } from "./sms/config/main-admin/config-main-admin.mobile.component";
import { SmsConfigSiteComponent } from "./sms/config/site/config-site.component";
import { SmsConfigSiteMobileComponent } from "./sms/config/site/config-site.mobile.component";
import { SmsConfigComponent } from "./sms/config/sms-config.component";
import { SmsDashboardComponent } from "./sms/dashboard/dashboard.component";
import { SmsLogApiPathListComponent } from "./sms/log/api-path/list/list.component";
import { SmsLogApiPathListMobileComponent } from "./sms/log/api-path/list/list.mobile.component";
import { SmsLogInBoxEditComponent } from "./sms/log/inbox/edit/edit.component";
import { SmsLogInBoxListComponent } from "./sms/log/inbox/list/list.component";
import { SmsLogInBoxListMobileComponent } from "./sms/log/inbox/list/list.mobile.component";
import { SmsLogInBoxViewComponent } from "./sms/log/inbox/view/view.component";
import { SmsLogInBoxViewMobileComponent } from "./sms/log/inbox/view/view.mobile.component";
import { SmsLogInBoxWidgetComponent } from "./sms/log/inbox/widget/widget.component";
import { SmsLogInBoxWidgetMobileComponent } from "./sms/log/inbox/widget/widget.mobile.component";
import { SmsLogOutBoxDetailListComponent } from "./sms/log/outbox-detail/list/list.component";
import { SmsLogOutBoxDetailListMobileComponent } from "./sms/log/outbox-detail/list/list.mobile.component";
import { SmsLogOutBoxDetailViewComponent } from "./sms/log/outbox-detail/view/view.component";
import { SmsLogOutBoxDetailViewMobileComponent } from "./sms/log/outbox-detail/view/view.mobile.component";
import { SmsLogOutBoxQueueEditComponent } from "./sms/log/outbox-queue/edit/edit.component";
import { SmsLogOutBoxQueueListComponent } from "./sms/log/outbox-queue/list/list.component";
import { SmsLogOutBoxQueueListMobileComponent } from "./sms/log/outbox-queue/list/list.mobile.component";
import { SmsLogOutBoxQueueViewComponent } from "./sms/log/outbox-queue/view/view.component";
import { SmsLogOutBoxQueueViewMobileComponent } from "./sms/log/outbox-queue/view/view.mobile.component";
import { SmsLogOutBoxQueueWidgetComponent } from "./sms/log/outbox-queue/widget/widget.component";
import { SmsLogOutBoxQueueWidgetMobileComponent } from "./sms/log/outbox-queue/widget/widget.mobile.component";
import { SmsLogOutBoxTaskSchedulerEditComponent } from "./sms/log/outbox-task-scheduler/edit/edit.component";
import { SmsLogOutBoxTaskSchedulerListComponent } from "./sms/log/outbox-task-scheduler/list/list.component";
import { SmsLogOutBoxTaskSchedulerListMobileComponent } from "./sms/log/outbox-task-scheduler/list/list.mobile.component";
import { ScheduleRunInfoListComponent } from "./sms/log/outbox-task-scheduler/schedule-run-info-list/schedule-run-info-list.component";
import { SmsLogOutBoxTaskSchedulerViewComponent } from "./sms/log/outbox-task-scheduler/view/view.component";
import { SmsLogOutBoxTaskSchedulerViewMobileComponent } from "./sms/log/outbox-task-scheduler/view/view.mobile.component";
import { SmsLogOutBoxTaskSchedulerWidgetComponent } from "./sms/log/outbox-task-scheduler/widget/widget.component";
import { SmsLogOutBoxTaskSchedulerWidgetMobileComponent } from "./sms/log/outbox-task-scheduler/widget/widget.mobile.component";
import { SmsLogOutBoxEditComponent } from "./sms/log/outbox/edit/edit.component";
import { SmsLogOutBoxHeaderComponent } from "./sms/log/outbox/header/header.component";
import { SmsLogOutBoxListComponent } from "./sms/log/outbox/list/list.component";
import { SmsLogOutBoxListMobileComponent } from "./sms/log/outbox/list/list.mobile.component";
import { SmsLogOutBoxViewComponent } from "./sms/log/outbox/view/view.component";
import { SmsLogOutBoxViewMobileComponent } from "./sms/log/outbox/view/view.mobile.component";
import { SmsLogOutBoxWidgetComponent } from "./sms/log/outbox/widget/widget.component";
import { SmsLogOutBoxWidgetMobileComponent } from "./sms/log/outbox/widget/widget.mobile.component";
import { SmsLogComponent } from "./sms/log/sms-log.component";
import { SmsMainApiNumberPermissionAddComponent } from "./sms/main/api-number-permission/add/add.component";
import { SmsMainApiNumberPermissionAddMobileComponent } from "./sms/main/api-number-permission/add/add.mobile.component";
import { SmsMainApiNumberPermissionEditComponent } from "./sms/main/api-number-permission/edit/edit.component";
import { SmsMainApiNumberPermissionEditMobileComponent } from "./sms/main/api-number-permission/edit/edit.mobile.component";
import { SmsMainApiNumberPermissionListComponent } from "./sms/main/api-number-permission/list/list.component";
import { SmsMainApiNumberPermissionListMobileComponent } from "./sms/main/api-number-permission/list/list.mobile.component";
import { SmsMainApiNumberAddComponent } from "./sms/main/api-number/add/add.component";
import { SmsMainApiNumberAddMobileComponent } from "./sms/main/api-number/add/add.mobile.component";
import { SmsMainApiNumberEditComponent } from "./sms/main/api-number/edit/edit.component";
import { SmsMainApiNumberEditMobileComponent } from "./sms/main/api-number/edit/edit.mobile.component";
import { SmsMainApiNumberHeaderComponent } from "./sms/main/api-number/header/header.component";
import { SmsMainApiNumberListComponent } from "./sms/main/api-number/list/list.component";
import { SmsMainApiNumberListMobileComponent } from "./sms/main/api-number/list/list.mobile.component";
import { SmsMainApiNumberSelectorComponent } from "./sms/main/api-number/selector/selector.component";
import { SmsMainApiPathCompanyAddComponent } from "./sms/main/api-path-company/add/add.component";
import { SmsMainApiPathCompanyAddMobileComponent } from "./sms/main/api-path-company/add/add.mobile.component";
import { SmsMainApiPathCompanyEditComponent } from "./sms/main/api-path-company/edit/edit.component";
import { SmsMainApiPathCompanyEditMobileComponent } from "./sms/main/api-path-company/edit/edit.mobile.component";
import { SmsMainApiPathCompanyListComponent } from "./sms/main/api-path-company/list/list.component";
import { SmsMainApiPathCompanyListMobileComponent } from "./sms/main/api-path-company/list/list.mobile.component";
import { SmsMainApiPathCompanySelectorComponent } from "./sms/main/api-path-company/selector/selector.component";
import { SmsMainApiPathCompanyTreeComponent } from "./sms/main/api-path-company/tree/tree.component";
import { SmsMainApiPathCompanyTreeMobileComponent } from "./sms/main/api-path-company/tree/tree.mobile.component";
import { SmsMainApiPathPaginationAddComponent } from "./sms/main/api-path-pagination/add/add.component";
import { SmsMainApiPathPaginationAddMobileComponent } from "./sms/main/api-path-pagination/add/add.mobile.component";
import { SmsMainApiPathPaginationEditComponent } from "./sms/main/api-path-pagination/edit/edit.component";
import { SmsMainApiPathPaginationEditMobileComponent } from "./sms/main/api-path-pagination/edit/edit.mobile.component";
import { SmsMainApiPathPaginationHeaderComponent } from "./sms/main/api-path-pagination/header/header.component";
import { SmsMainApiPathPaginationListComponent } from "./sms/main/api-path-pagination/list/list.component";
import { SmsMainApiPathPaginationListMobileComponent } from "./sms/main/api-path-pagination/list/list.mobile.component";
import { SmsMainApiPathPaginationSelectorComponent } from "./sms/main/api-path-pagination/selector/selector.component";
import { SmsMainApiPathPaginationTreeComponent } from "./sms/main/api-path-pagination/tree/tree.component";
import { SmsMainApiPathPaginationTreeMobileComponent } from "./sms/main/api-path-pagination/tree/tree.mobile.component";
import { SmsMainApiPathPermissionAddComponent } from "./sms/main/api-path-permission/add/add.component";
import { SmsMainApiPathPermissionAddMobileComponent } from "./sms/main/api-path-permission/add/add.mobile.component";
import { SmsMainApiPathPermissionEditComponent } from "./sms/main/api-path-permission/edit/edit.component";
import { SmsMainApiPathPermissionEditMobileComponent } from "./sms/main/api-path-permission/edit/edit.mobile.component";
import { SmsMainApiPathPermissionListComponent } from "./sms/main/api-path-permission/list/list.component";
import { SmsMainApiPathPermissionListMobileComponent } from "./sms/main/api-path-permission/list/list.mobile.component";
import { SmsMainApiPathPricePermissionAddComponent } from "./sms/main/api-path-price-permission/add/add.component";
import { SmsMainApiPathPricePermissionAddMobileComponent } from "./sms/main/api-path-price-permission/add/add.mobile.component";
import { SmsMainApiPathPricePermissionEditComponent } from "./sms/main/api-path-price-permission/edit/edit.component";
import { SmsMainApiPathPricePermissionEditMobileComponent } from "./sms/main/api-path-price-permission/edit/edit.mobile.component";
import { SmsMainApiPathPricePermissionListComponent } from "./sms/main/api-path-price-permission/list/list.component";
import { SmsMainApiPathPricePermissionListMobileComponent } from "./sms/main/api-path-price-permission/list/list.mobile.component";
import { SmsMainApiPathAddComponent } from "./sms/main/api-path/add/add.component";
import { SmsMainApiPathAddMobileComponent } from "./sms/main/api-path/add/add.mobile.component";
import { SmsMainApiPathEditComponent } from "./sms/main/api-path/edit/edit.component";
import { SmsMainApiPathEditMobileComponent } from "./sms/main/api-path/edit/edit.mobile.component";
import { SmsMainApiPathHeaderComponent } from "./sms/main/api-path/header/header.component";
import { SmsMainApiPathListComponent } from "./sms/main/api-path/list/list.component";
import { SmsMainApiPathListMobileComponent } from "./sms/main/api-path/list/list.mobile.component";
import { SmsMainApiPathSelectionlistComponent } from "./sms/main/api-path/selectionlist/selectionlist.component";
import { SmsMainApiPathSelectorComponent } from "./sms/main/api-path/selector/selector.component";
import { SmsMainApiPathSendTestComponent } from "./sms/main/api-path/sendTest/sendTest.component";
import { SmsMainApiPathTreeComponent } from "./sms/main/api-path/tree/tree.component";
import { SmsMainApiPathTreeMobileComponent } from "./sms/main/api-path/tree/tree.mobile.component";
import { SmsMainClientApplicationPermissionAddComponent } from "./sms/main/client-application-permission/add/add.component";
import { SmsMainClientApplicationPermissionEditComponent } from "./sms/main/client-application-permission/edit/edit.component";
import { SmsMainClientApplicationPermissionListComponent } from "./sms/main/client-application-permission/list/list.component";
import { SmsMainClientApplicationPermissionListMobileComponent } from "./sms/main/client-application-permission/list/list.mobile.component";
import { SmsMainClientApplicationAddComponent } from "./sms/main/client-application/add/add.component";
import { SmsMainClientApplicationAddMobileComponent } from "./sms/main/client-application/add/add.mobile.component";
import { SmsMainClientApplicationEditComponent } from "./sms/main/client-application/edit/edit.component";
import { SmsMainClientApplicationEditMobileComponent } from "./sms/main/client-application/edit/edit.mobile.component";
import { SmsMainClientApplicationListComponent } from "./sms/main/client-application/list/list.component";
import { SmsMainClientApplicationListMobileComponent } from "./sms/main/client-application/list/list.mobile.component";
import { SmsMainClientApplicationSelectorComponent } from "./sms/main/client-application/selector/selector.component";
import { SmsMainMessageCategoryAddComponent } from "./sms/main/message-category/add/add.component";
import { SmsMainMessageCategoryDeleteComponent } from "./sms/main/message-category/delete/delete.component";
import { SmsMainMessageCategoryEditComponent } from "./sms/main/message-category/edit/edit.component";
import { SmsMainMessageCategorySelectorComponent } from "./sms/main/message-category/selector/selector.component";
import { SmsMainMessageCategoryTreeComponent } from "./sms/main/message-category/tree/tree.component";
import { SmsMainMessageCategoryTreeMobileComponent } from "./sms/main/message-category/tree/tree.mobile.component";
import { SmsMainMessageContentAddComponent } from "./sms/main/message-content/add/add.component";
import { SmsMainMessageContentAddMobileComponent } from "./sms/main/message-content/add/add.mobile.component";
import { SmsMainMessageContentEditComponent } from "./sms/main/message-content/edit/edit.component";
import { SmsMainMessageContentEditMobileComponent } from "./sms/main/message-content/edit/edit.mobile.component";
import { SmsMainMessageContentListComponent } from "./sms/main/message-content/list/list.component";
import { SmsMainMessageContentListMobileComponent } from "./sms/main/message-content/list/list.mobile.component";
import { SmsMainMessageContentSelectorComponent } from "./sms/main/message-content/selector/selector.component";
import { SmsMainApiPathPublicConfigAddComponent } from "./sms/main/public-config/add/add.component";
import { SmsMainApiPathPublicConfigAddMobileComponent } from "./sms/main/public-config/add/add.mobile.component";
import { SmsMainApiPathPublicConfigEditComponent } from "./sms/main/public-config/edit/edit.component";
import { SmsMainApiPathPublicConfigEditMobileComponent } from "./sms/main/public-config/edit/edit.mobile.component";
import { SmsMainApiPathPublicConfigHeaderComponent } from "./sms/main/public-config/header/header.component";
import { SmsMainApiPathPublicConfigListComponent } from "./sms/main/public-config/list/list.component";
import { SmsMainApiPathPublicConfigListMobileComponent } from "./sms/main/public-config/list/list.mobile.component";
import { SmsMainApiPathPublicConfigSelectorComponent } from "./sms/main/public-config/selector/selector.component";
import { SmsMainApiPathPublicConfigTreeComponent } from "./sms/main/public-config/tree/tree.component";
import { SmsMainApiPathPublicConfigTreeMobileComponent } from "./sms/main/public-config/tree/tree.mobile.component";
import { SmsMainComponent } from "./sms/main/sms-main.component";
import { SmsMessageTypeEnumSelectionlistComponent } from "./sms/shared/sms-message-type-enum/selectionlist/selectionlist.component";
import { SmsMessageTypeEnumSelectorComponent } from "./sms/shared/sms-message-type-enum/selector/selector.component";
import { SmsOutBoxTypeEnumSelectionlistComponent } from "./sms/shared/sms-out-box-type-enum/selectionlist/selectionlist.component";
import { SmsOutBoxTypeEnumSelectorComponent } from "./sms/shared/sms-out-box-type-enum/selector/selector.component";
import { SmsComponent } from "./sms/sms.component";
import { TicketingAnswerAddComponent } from "./ticketing/answer/add/add.component";
import { TicketingAnswerEditComponent } from "./ticketing/answer/edit/edit.component";
import { TicketingAnswerListComponent } from "./ticketing/answer/list/list.component";
import { TicketingAnswerListMobileComponent } from "./ticketing/answer/list/list.mobile.component";
import { TicketingAnswerViewComponent } from "./ticketing/answer/view/view.component";
import { TicketingConfigCheckSiteComponent } from "./ticketing/config/check-site/check-site.component";
import { TicketingConfigCheckUserComponent } from "./ticketing/config/check-user/check-user.component";
import { TicketingConfigMainAdminComponent } from "./ticketing/config/main-admin/config-main-admin.component";
import { TicketingConfigSiteComponent } from "./ticketing/config/site/config-site.component";
import { TicketingConfigComponent } from "./ticketing/config/ticketing-config.component";
import { TicketingDepartemenAddComponent } from "./ticketing/departemen/add/add.component";
import { TicketingDepartemenDeleteComponent } from "./ticketing/departemen/delete/delete.component";
import { TicketingDepartemenEditComponent } from "./ticketing/departemen/edit/edit.component";
import { TicketingDepartemenListComponent } from "./ticketing/departemen/list/list.component";
import { TicketingDepartemenListMobileComponent } from "./ticketing/departemen/list/list.mobile.component";
import { TicketingDepartemenSelectorComponent } from "./ticketing/departemen/selector/selector.component";
import { TicketingDepartemenTreeComponent } from "./ticketing/departemen/tree/tree.component";
import { TicketingDepartemenLogEditComponent } from "./ticketing/departemenLog/edit/edit.component";
import { TicketingDepartemenLogListComponent } from "./ticketing/departemenLog/list/list.component";
import { TicketingDepartemenLogListMobileComponent } from "./ticketing/departemenLog/list/list.mobile.component";
import { TicketingDepartemenOperatorAddComponent } from "./ticketing/departemenOperator/add/add.component";
import { DeleteComponent } from "./ticketing/departemenOperator/delete/delete.component";
import { TicketingDepartemenOperatorEditComponent } from "./ticketing/departemenOperator/edit/edit.component";
import { TicketingDepartemenOperatorListComponent } from "./ticketing/departemenOperator/list/list.component";
import { TicketingDepartemenOperatorListMobileComponent } from "./ticketing/departemenOperator/list/list.mobile.component";
import { TicketingDepartemenOperatorSelectorComponent } from "./ticketing/departemenOperator/selector/selector.component";
import { TicketingDepartemenOperatorTreeComponent } from "./ticketing/departemenOperator/tree/tree.component";
import { TicketingFaqAddComponent } from "./ticketing/faq/add/add.component";
import { TicketingFaqEditComponent } from "./ticketing/faq/edit/edit.component";
import { TicketingFaqListComponent } from "./ticketing/faq/list/list.component";
import { TicketingFaqListMobileComponent } from "./ticketing/faq/list/list.mobile.component";
import { TicketingFaqOriginListComponent } from "./ticketing/faq/origin-list/origin-list.component";
import { TicketingTaskAddComponent } from "./ticketing/task/add/add.component";
import { TicketingTaskContactUsAddComponent } from "./ticketing/task/contact-us-add/contact-us-add.component";
import { TicketingTaskContactUsListComponent } from "./ticketing/task/contact-us-list/contact-us-list.component";
import { DeleteComponent } from "./ticketing/task/delete/delete.component";
import { TicketingTaskEditComponent } from "./ticketing/task/edit/edit.component";
import { TicketingTaskHeaderComponent } from "./ticketing/task/header/header.component";
import { TicketingTaskListComponent } from "./ticketing/task/list/list.component";
import { TicketingTaskListMobileComponent } from "./ticketing/task/list/list.mobile.component";
import { TicketingTaskViewComponent } from "./ticketing/task/view/view.component";
import { TicketingTaskWidgetComponent } from "./ticketing/task/widget/widget.component";
import { TicketingTemplateAddComponent } from "./ticketing/template/add/add.component";
import { TicketingTemplateEditComponent } from "./ticketing/template/edit/edit.component";
import { TicketingTemplateListComponent } from "./ticketing/template/list/list.component";
import { TicketingTemplateListMobileComponent } from "./ticketing/template/list/list.mobile.component";
import { TicketingTemplateSelectorComponent } from "./ticketing/template/selector/selector.component";
import { TicketingComponent } from "./ticketing/ticketing.component";
import { TransactionAssistantAddressAddComponent } from "./transaction-assistant/address/add/add.component";
import { TransactionAssistantAddressEditComponent } from "./transaction-assistant/address/edit/edit.component";
import { TransactionAssistantAddressListComponent } from "./transaction-assistant/address/list/list.component";
import { TransactionAssistantAddressListMobileComponent } from "./transaction-assistant/address/list/list.mobile.component";
import { TransactionAssistantCartAddComponent } from "./transaction-assistant/cart/add/add.component";
import { TransactionAssistantCartEditComponent } from "./transaction-assistant/cart/edit/edit.component";
import { TransactionAssistantCartListComponent } from "./transaction-assistant/cart/list/list.component";
import { TransactionAssistantCartListMobileComponent } from "./transaction-assistant/cart/list/list.mobile.component";
import { TransactionAssistantCategoryAddComponent } from "./transaction-assistant/category/add/add.component";
import { TransactionAssistantCategoryEditComponent } from "./transaction-assistant/category/edit/edit.component";
import { TransactionAssistantCategoryListComponent } from "./transaction-assistant/category/list/list.component";
import { TransactionAssistantCategoryListMobileComponent } from "./transaction-assistant/category/list/list.mobile.component";
import { TransactionAssistantConfigCheckSiteComponent } from "./transaction-assistant/config/check-site/check-site.component";
import { TransactionAssistantConfigCheckUserComponent } from "./transaction-assistant/config/check-user/check-user.component";
import { TransactionAssistantConfigMainAdminComponent } from "./transaction-assistant/config/main-admin/config-main-admin.component";
import { TransactionAssistantConfigSiteComponent } from "./transaction-assistant/config/site/config-site.component";
import { TransactionAssistantConfigComponent } from "./transaction-assistant/config/transaction-assistant-config.component";
import { TransactionAssistantDashboardComponent } from "./transaction-assistant/dashboard/dashboard.component";
import { TransactionAssistantInventoryAddComponent } from "./transaction-assistant/inventory/add/add.component";
import { TransactionAssistantInventoryEditComponent } from "./transaction-assistant/inventory/edit/edit.component";
import { TransactionAssistantInventoryListComponent } from "./transaction-assistant/inventory/list/list.component";
import { TransactionAssistantInventoryListMobileComponent } from "./transaction-assistant/inventory/list/list.mobile.component";
import { TransactionAssistantInvoiceAddComponent } from "./transaction-assistant/invoice/add/add.component";
import { TransactionAssistantInvoiceEditComponent } from "./transaction-assistant/invoice/edit/edit.component";
import { TransactionAssistantInvoiceListComponent } from "./transaction-assistant/invoice/list/list.component";
import { TransactionAssistantInvoiceListMobileComponent } from "./transaction-assistant/invoice/list/list.mobile.component";
import { TransactionAssistantOfferAddComponent } from "./transaction-assistant/offer/add/add.component";
import { TransactionAssistantOfferEditComponent } from "./transaction-assistant/offer/edit/edit.component";
import { TransactionAssistantOfferListComponent } from "./transaction-assistant/offer/list/list.component";
import { TransactionAssistantOfferListMobileComponent } from "./transaction-assistant/offer/list/list.mobile.component";
import { TransactionAssistantOrderAddComponent } from "./transaction-assistant/order/add/add.component";
import { TransactionAssistantOrderEditComponent } from "./transaction-assistant/order/edit/edit.component";
import { TransactionAssistantOrderListComponent } from "./transaction-assistant/order/list/list.component";
import { TransactionAssistantOrderListMobileComponent } from "./transaction-assistant/order/list/list.mobile.component";
import { TransactionAssistantPaymentAddComponent } from "./transaction-assistant/payment/add/add.component";
import { TransactionAssistantPaymentEditComponent } from "./transaction-assistant/payment/edit/edit.component";
import { TransactionAssistantPaymentListComponent } from "./transaction-assistant/payment/list/list.component";
import { TransactionAssistantPaymentListMobileComponent } from "./transaction-assistant/payment/list/list.mobile.component";
import { TransactionAssistantProductAddComponent } from "./transaction-assistant/product/add/add.component";
import { TransactionAssistantProductEditComponent } from "./transaction-assistant/product/edit/edit.component";
import { TransactionAssistantProductListComponent } from "./transaction-assistant/product/list/list.component";
import { TransactionAssistantProductListMobileComponent } from "./transaction-assistant/product/list/list.mobile.component";
import { TransactionAssistantRatingAddComponent } from "./transaction-assistant/rating/add/add.component";
import { TransactionAssistantRatingEditComponent } from "./transaction-assistant/rating/edit/edit.component";
import { TransactionAssistantRatingListComponent } from "./transaction-assistant/rating/list/list.component";
import { TransactionAssistantRatingListMobileComponent } from "./transaction-assistant/rating/list/list.mobile.component";
import { TransactionAssistantRequestAddComponent } from "./transaction-assistant/request/add/add.component";
import { TransactionAssistantRequestEditComponent } from "./transaction-assistant/request/edit/edit.component";
import { TransactionAssistantRequestListComponent } from "./transaction-assistant/request/list/list.component";
import { TransactionAssistantRequestListMobileComponent } from "./transaction-assistant/request/list/list.mobile.component";
import { TransactionAssistantShipmentAddComponent } from "./transaction-assistant/shipment/add/add.component";
import { TransactionAssistantShipmentEditComponent } from "./transaction-assistant/shipment/edit/edit.component";
import { TransactionAssistantShipmentListComponent } from "./transaction-assistant/shipment/list/list.component";
import { TransactionAssistantShipmentListMobileComponent } from "./transaction-assistant/shipment/list/list.mobile.component";
import { TransactionAssistantSupplierAddComponent } from "./transaction-assistant/supplier/add/add.component";
import { TransactionAssistantSupplierEditComponent } from "./transaction-assistant/supplier/edit/edit.component";
import { TransactionAssistantSupplierListComponent } from "./transaction-assistant/supplier/list/list.component";
import { TransactionAssistantSupplierListMobileComponent } from "./transaction-assistant/supplier/list/list.mobile.component";
import { TransactionAssistantTagAddComponent } from "./transaction-assistant/tag/add/add.component";
import { TransactionAssistantTagEditComponent } from "./transaction-assistant/tag/edit/edit.component";
import { TransactionAssistantTagListComponent } from "./transaction-assistant/tag/list/list.component";
import { TransactionAssistantTagListMobileComponent } from "./transaction-assistant/tag/list/list.mobile.component";
import { TransactionAssistantComponent } from "./transaction-assistant/transaction-assistant.component";
import { UniversalMenuComponent } from "./universal-menu/universal-menu.component";
import { WebDesignerBuilderHtmlBodyComponent } from "./web-designer-builder/html/body/body.component";
import { WebDesignerBuilderHtmlContainerComponent } from "./web-designer-builder/html/container/container.component";
import { WebDesignerBuilderHtmlHeaderComponent } from "./web-designer-builder/html/header/header.component";
import { WebDesignerBuilderHtmlItemsComponent } from "./web-designer-builder/html/items/items.component";
import { WebDesignerBuilderHtmlRowComponent } from "./web-designer-builder/html/row/row.component";
import { WebDesignerBuilderModuleBlogComponent } from "./web-designer-builder/module/blog/blog.component";
import { WebDesignerBuilderModuleNewsComponent } from "./web-designer-builder/module/news/news.component";
import { WebDesignerBuilderModuleTicketingComponent } from "./web-designer-builder/module/ticketing/ticketing.component";
import { WebDesignerBuilderComponent } from "./web-designer-builder/web-designer-builder.component";
import { WebDesignerConfigCheckSiteComponent } from "./web-designer/config/check-site/check-site.component";
import { WebDesignerConfigCheckUserComponent } from "./web-designer/config/check-user/check-user.component";
import { WebDesignerConfigMainAdminComponent } from "./web-designer/config/main-admin/config-main-admin.component";
import { WebDesignerConfigSiteComponent } from "./web-designer/config/site/config-site.component";
import { WebDesignerConfigComponent } from "./web-designer/config/web-designer-config.component";
import { WebDesignerMainIntroAddComponent } from "./web-designer/intro/add/add.component";
import { WebDesignerMainIntroEditComponent } from "./web-designer/intro/edit/edit.component";
import { WebDesignerMainIntroListComponent } from "./web-designer/intro/list/list.component";
import { WebDesignerMainIntroListMobileComponent } from "./web-designer/intro/list/list.mobile.component";
import { EditComponent } from "./web-designer/log-member-info/edit/edit.component";
import { WebDesignerLogMemberInfoListComponent } from "./web-designer/log-member-info/list/list.component";
import { WebDesignerLogMemberInfoListMobileComponent } from "./web-designer/log-member-info/list/list.mobile.component";
import { WebDesignerLogMemberInfoSelectorComponent } from "./web-designer/log-member-info/selector/selector.component";
import { WebDesignerLogMemberInfoViewComponent } from "./web-designer/log-member-info/view/view.component";
import { WebDesignerLogMemberInfoWidgetComponent } from "./web-designer/log-member-info/widget/widget.component";
import { WebDesignerMainMenuAddComponent } from "./web-designer/menu/add/add.component";
import { WebDesignerMainMenuEditComponent } from "./web-designer/menu/edit/edit.component";
import { WebDesignerMainMenuListComponent } from "./web-designer/menu/list/list.component";
import { WebDesignerMainMenuListMobileComponent } from "./web-designer/menu/list/list.mobile.component";
import { WebDesignerMainMenuSelectorComponent } from "./web-designer/menu/selector/selector.component";
import { WebDesignerMainMenuTreeComponent } from "./web-designer/menu/tree/tree.component";
import { WebDesignerMainPageDependencyAddComponent } from "./web-designer/page-dependency/add/add.component";
import { WebDesignerMainPageDependencyAutoAddPageComponent } from "./web-designer/page-dependency/auto-add-page/auto-add-page.component";
import { WebDesignerMainPageDependencyEditComponent } from "./web-designer/page-dependency/edit/edit.component";
import { WebDesignerMainPageDependencyHeaderComponent } from "./web-designer/page-dependency/header/header.component";
import { WebDesignerMainPageDependencyListComponent } from "./web-designer/page-dependency/list/list.component";
import { WebDesignerMainPageDependencyListMobileComponent } from "./web-designer/page-dependency/list/list.mobile.component";
import { WebDesignerMainPageDependencySelectorComponent } from "./web-designer/page-dependency/selector/selector.component";
import { WebDesignerMainPageDependencyTreeComponent } from "./web-designer/page-dependency/tree/tree.component";
import { WebDesignerMainPageTemplateAddComponent } from "./web-designer/page-template/add/add.component";
import { WebDesignerMainPageTemplateEditComponent } from "./web-designer/page-template/edit/edit.component";
import { WebDesignerMainPageTemplateHeaderComponent } from "./web-designer/page-template/header/header.component";
import { WebDesignerMainPageTemplateListComponent } from "./web-designer/page-template/list/list.component";
import { WebDesignerMainPageTemplateListMobileComponent } from "./web-designer/page-template/list/list.mobile.component";
import { WebDesignerMainPageTemplateSelectorComponent } from "./web-designer/page-template/selector/selector.component";
import { WebDesignerMainPageTemplateTreeComponent } from "./web-designer/page-template/tree/tree.component";
import { WebDesignerMainPageAddComponent } from "./web-designer/page/add/add.component";
import { WebDesignerMainPageEditComponent } from "./web-designer/page/edit/edit.component";
import { WebDesignerMainPageHeaderComponent } from "./web-designer/page/header/header.component";
import { WebDesignerMainPageListGridComponent } from "./web-designer/page/list-grid/list-grid.component";
import { WebDesignerMainPageListComponent } from "./web-designer/page/list/list.component";
import { WebDesignerMainPageListMobileComponent } from "./web-designer/page/list/list.mobile.component";
import { WebDesignerMainPageSelectorComponent } from "./web-designer/page/selector/selector.component";
import { WebDesignerMainPageTreeComponent } from "./web-designer/page/tree/tree.component";
import { WebDesignerComponent } from "./web-designer/web-designer.component";

@NgModule({
  declarations: [
    /*widget*/
    /*widget*/
    ApiTelegramActionSendMessageSimpleComponent,
    ApiTelegramActionSendMessageComponent,
    ApiTelegramComponent,
    ApiTelegramBotConfigAddComponent,
    ApiTelegramBotConfigEditComponent,
    ApiTelegramBotConfigListComponent,
    ApiTelegramBotConfigListMobileComponent,
    ApiTelegramBotConfigSelectorComponent,
    ApiTelegramConfigComponent,
    ApiTelegramConfigCheckSiteComponent,
    ApiTelegramConfigCheckUserComponent,
    ApiTelegramConfigMainAdminComponent,
    ApiTelegramConfigSiteComponent,
    ApiTelegramLogInputListComponent,
    ApiTelegramLogInputListMobileComponent,
    ApiTelegramLogOutputListComponent,
    ApiTelegramLogOutputListMobileComponent,
    ApiTelegramMemberInfoListComponent,
    ApiTelegramMemberInfoListMobileComponent,
    ApiTelegramReceivedFileListComponent,
    ApiTelegramReceivedFileListMobileComponent,
    ApiTelegramUploadedFileListComponent,
    ApiTelegramUploadedFileListMobileComponent,
    ApplicationComponent,
    ApplicationConfigComponent,
    ApplicationConfigCheckSiteComponent,
    ApplicationConfigCheckUserComponent,
    ApplicationConfigMainAdminComponent,
    ApplicationConfigSiteComponent,
    ApplicationAppAddComponent,
    ApplicationAppDownloadComponent,
    ApplicationAppEditComponent,
    ApplicationAppListComponent,
    ApplicationAppListMobileComponent,
    ApplicationAppSelectorComponent,
    ApplicationAppTreeComponent,
    ApplicationAppUploadAppComponent,
    ApplicationAppUploadUpdateComponent,
    ApplicationAppWidgetComponent,
    ApplicationIntroAddComponent,
    ApplicationIntroEditComponent,
    ApplicationIntroListComponent,
    ApplicationIntroListMobileComponent,
    EditComponent,
    ApplicationMemberInfoListComponent,
    ApplicationMemberInfoListMobileComponent,
    ApplicationMemberInfoSelectorComponent,
    ApplicationMemberInfoViewComponent,
    ApplicationMemberInfoWidgetComponent,
    ApplicationLogNotificationActionSendComponent,
    ApplicationLogNotificationListComponent,
    ApplicationLogNotificationListMobileComponent,
    ApplicationLogNotificationViewComponent,
    ApplicationSourceAddComponent,
    ApplicationSourceEditComponent,
    ApplicationSourceListComponent,
    ApplicationSourceListMobileComponent,
    ApplicationSourceSelectorComponent,
    ApplicationSourceTreeComponent,
    ApplicationThemeConfigAddComponent,
    ApplicationThemeConfigEditComponent,
    ApplicationThemeConfigListComponent,
    ApplicationThemeConfigListMobileComponent,
    ApplicationThemeConfigSelectorComponent,
    ArticleComponent,
    ArticleCategoryAddComponent,
    ArticleCategoryDeleteComponent,
    ArticleCategoryEditComponent,
    ArticleCategorySelectorComponent,
    ArticleCategoryTreeSelectorComponent,
    ArticleCategoryTreeComponent,
    ArticleCommentEditComponent,
    ArticleCommentListComponent,
    ArticleCommentListMobileComponent,
    ArticleConfigComponent,
    ArticleConfigCheckSiteComponent,
    ArticleConfigCheckUserComponent,
    ArticleConfigMainAdminComponent,
    ArticleConfigSiteComponent,
    ArticleContentAddComponent,
    ArticleContentDeleteComponent,
    ArticleContentEditComponent,
    ArticletHeaderComponent,
    ArticleContentListComponent,
    ArticleContentListMobileComponent,
    ArticleContentSelectorComponent,
    ArticleContentWidgetComponent,
    AuthComponent,
    AuthForgotPasswordComponent,
    AuthSignInBySmsComponent,
    AuthSignInByUsernameComponent,
    AuthSignOutComponent,
    SignupRuleComponent,
    AuthSignUpComponent,
    BankPaymentComponent,
    BankPaymentConfigComponent,
    BankPaymentConfigCheckSiteComponent,
    BankPaymentConfigCheckUserComponent,
    BankPaymentConfigMainAdminComponent,
    BankPaymentConfigSiteComponent,
    BankPaymentPrivateSiteConfigAddComponent,
    BankPaymentPrivateSiteConfigEditComponent,
    BankPaymentPrivateSiteConfigListComponent,
    BankPaymentPrivateSiteConfigListMobileComponent,
    BankPaymentPrivateSiteConfigPaymentTestComponent,
    BankPaymentPrivateSiteConfigSelectorComponent,
    BankPaymentPrivateSiteConfigTreeComponent,
    BankPaymentPublicConfigAddComponent,
    BankPaymentPublicConfigEditComponent,
    BankPaymentPublicConfigHeaderComponent,
    BankPaymentPublicConfigListComponent,
    BankPaymentPublicConfigListMobileComponent,
    BankPaymentPublicConfigSelectorComponent,
    BankPaymentPublicConfigTreeComponent,
    BankPaymentTransactionLogListComponent,
    BankPaymentTransactionLogListMobileComponent,
    BankPaymentTransactionLogViewComponent,
    BankPaymentTransactionEditComponent,
    BankPaymentTransactionHeaderComponent,
    BankPaymentTransactionListComponent,
    BankPaymentTransactionListMobileComponent,
    BankPaymentTransactionViewComponent,
    BiographyComponent,
    BiographyCategoryAddComponent,
    BiographyCategoryDeleteComponent,
    BiographyCategoryEditComponent,
    BiographyCategorySelectorComponent,
    BiographyCategoryTreeSelectorComponent,
    BiographyCategoryTreeComponent,
    BiographyCommentEditComponent,
    BiographyCommentListComponent,
    BiographyCommentListMobileComponent,
    BiographyConfigComponent,
    BiographyConfigCheckSiteComponent,
    BiographyConfigCheckUserComponent,
    BiographyConfigMainAdminComponent,
    BiographyConfigSiteComponent,
    BiographyContentAddComponent,
    BiographyContentDeleteComponent,
    BiographyContentEditComponent,
    BiographyContentListComponent,
    BiographyContentListMobileComponent,
    BiographyContentSelectorComponent,
    BiographyContentWidgetComponent,
    BlogComponent,
    BlogCategoryAddComponent,
    BlogCategoryDeleteComponent,
    BlogCategoryEditComponent,
    BlogCategorySelectorComponent,
    BlogCategoryTreeSelectorComponent,
    BlogCategoryTreeComponent,
    BlogCommentEditComponent,
    BlogCommentListComponent,
    BlogCommentListMobileComponent,
    BlogConfigComponent,
    BlogConfigCheckSiteComponent,
    BlogConfigCheckUserComponent,
    BlogConfigMainAdminComponent,
    BlogConfigSiteComponent,
    BlogContentAddComponent,
    BlogContentDeleteComponent,
    BlogContentEditComponent,
    BlogContentHeaderComponent,
    BlogContentListComponent,
    BlogContentListMobileComponent,
    BlogContentSelectorComponent,
    BlogContentWidgetComponent,
    CatalogComponent,
    CatalogCategoryAddComponent,
    CatalogCategoryDeleteComponent,
    CatalogCategoryEditComponent,
    CatalogCategorySelectorComponent,
    CatalogCategoryTreeSelectorComponent,
    CatalogCategoryTreeComponent,
    CatalogConfigComponent,
    CatalogConfigCheckSiteComponent,
    CatalogConfigCheckUserComponent,
    CatalogConfigMainAdminComponent,
    CatalogConfigSiteComponent,
    CatalogContentAddComponent,
    CatalogContentDeleteComponent,
    CatalogContentEditComponent,
    CatalogContentHeaderComponent,
    CatalogContentListComponent,
    CatalogContentListMobileComponent,
    CatalogContentSelectorComponent,
    CatalogContentWidgetComponent,
    ChartCategoryAddComponent,
    ChartCategoryDeleteComponent,
    ChartCategoryEditComponent,
    ChartCategorySelectorComponent,
    ChartCategoryTreeSelectorComponent,
    ChartCategoryTreeComponent,
    ChartComponent,
    ChartCommentEditComponent,
    ChartCommentListComponent,
    ChartCommentListMobileComponent,
    ChartConfigComponent,
    ChartConfigCheckSiteComponent,
    ChartConfigCheckUserComponent,
    ChartConfigMainAdminComponent,
    ChartConfigSiteComponent,
    ChartContentAddComponent,
    ChartContentDeleteComponent,
    ChartContentEditComponent,
    ChartContentListComponent,
    ChartContentListMobileComponent,
    ChartContentSelectorComponent,
    ChartContentWidgetComponent,
    ContactCategoryAddComponent,
    ContactCategoryDeleteComponent,
    ContactCategoryEditComponent,
    ContactCategorySelectorComponent,
    ContactCategoryTreeSelectorComponent,
    ContactCategoryTreeComponent,
    ContactConfigCheckSiteComponent,
    ContactConfigCheckUserComponent,
    ContactConfigComponent,
    ContactConfigMainAdminComponent,
    ContactConfigSiteComponent,
    ContactComponent,
    ContactContentAddComponent,
    ContactContentEditComponent,
    ContactContentImportComponent,
    ContactContentListComponent,
    ContactContentListMobileComponent,
    ContactContentSelectionlistComponent,
    ContactContentSelectorComponent,
    CoreLogAvoidDuplicateDataEntryEditComponent,
    CoreLogAvoidDuplicateDataEntryListComponent,
    CoreLogAvoidDuplicateDataEntryListMobileComponent,
    CoreLogComponent,
    CoreLogCurrencyListComponent,
    CoreLogCurrencyListMobileComponent,
    CoreLogCurrencyViewComponent,
    CoreLogEmailEditComponent,
    CoreLogEmailListComponent,
    CoreLogEmailListMobileComponent,
    CoreLogEmailViewComponent,
    CoreLogErrorEditComponent,
    CoreLogErrorListComponent,
    CoreLogErrorListMobileComponent,
    CoreLogMemberEditComponent,
    CoreLogMemberListComponent,
    CoreLogMemberListMobileComponent,
    CoreLogMemberViewComponent,
    CoreLogNotificationEditComponent,
    CoreLogNotificationListComponent,
    CoreLogNotificationListMobileComponent,
    CoreLogNotificationViewComponent,
    CoreLogReportDataEditComponent,
    CoreLogReportDataListComponent,
    CoreLogReportDataListMobileComponent,
    CoreLogReportDataViewComponent,
    CoreLogSmsEditComponent,
    CoreLogSmsListComponent,
    CoreLogSmsListMobileComponent,
    CoreLogSmsViewComponent,
    CoreLogSmsViewMobileComponent,
    CoreMainActionComponent,
    CoreMainActionSendNotificationComponent,
    CoreConfigCheckSiteComponent,
    CoreConfigCheckUserComponent,
    CoreConfigComponent,
    CoreConfigMainAdminComponent,
    CoreConfigSiteComponent,
    CoreComponent,
    CoreCpMainMenuAddComponent,
    CoreCpMainMenuComponent,
    CoreCpMainMenuEditComponent,
    CoreCpMainMenuListComponent,
    CoreCpMainMenuListMobileComponent,
    CoreCpMainMenuSelectorComponent,
    CoreCpMainMenuTreeComponent,
    CoreCurrencyAddComponent,
    CoreCurrencyComponent,
    CoreCurrencyEditComponent,
    CoreCurrencyListComponent,
    CoreCurrencyListMobileComponent,
    CoreCurrencySelectorComponent,
    CoreDeviceAddComponent,
    CoreDeviceComponent,
    CoreDeviceEditComponent,
    CoreDeviceListComponent,
    CoreDeviceListMobileComponent,
    CoreDeviceSelectorComponent,
    CoreGuideAddComponent,
    CoreGuideComponent,
    CoreGuideEditComponent,
    CoreGuideListComponent,
    CoreGuideListMobileComponent,
    CoreGuideSelectorComponent,
    CoreGuideTreeComponent,
    CoreLocationAddBulkComponent,
    CoreLocationAddComponent,
    CoreLocationComponent,
    CoreLocationEditComponent,
    CoreLocationListComponent,
    CoreLocationListMobileComponent,
    CoreLocationSelectorComponent,
    CoreLocationTreeComponent,
    CoreModuleEntityReportFileAddComponent,
    CoreModuleEntityReportFileComponent,
    CoreModuleEntityReportFileEditComponent,
    CoreModuleEntityReportFileListComponent,
    CoreModuleEntityReportFileListMobileComponent,
    CoreModuleEntityComponent,
    CoreModuleEntityEditComponent,
    CoreModuleEntityListComponent,
    CoreModuleEntityListMobileComponent,
    CoreModuleEntitySelectorComponent,
    CoreModuleSaleComponent,
    CoreModuleSaleHeaderGroupAddComponent,
    CoreModuleSaleHeaderGroupEditComponent,
    CoreModuleSaleHeaderGroupHeaderComponent,
    CoreModuleSaleHeaderGroupListComponent,
    CoreModuleSaleHeaderGroupListMobileComponent,
    CoreModuleSaleHeaderGroupSelectorComponent,
    CoreModuleSaleHeaderGroupTreeComponent,
    CoreModuleSaleHeaderAddComponent,
    CoreModuleSaleHeaderEditComponent,
    CoreModuleSaleHeaderHeaderComponent,
    CoreModuleSaleHeaderListComponent,
    CoreModuleSaleHeaderListMobileComponent,
    CoreModuleSaleHeaderSaleListComponent,
    CoreModuleSaleHeaderSalePaymentComponent,
    CoreModuleSaleHeaderSelectorComponent,
    CoreModuleSaleHeaderTreeComponent,
    CoreModuleSaleInvoiceDetailListComponent,
    CoreModuleSaleInvoiceDetailListMobileComponent,
    CoreModuleSaleInvoiceDetailViewComponent,
    CoreModuleSaleInvoiceListComponent,
    CoreModuleSaleInvoiceListMobileComponent,
    CoreModuleSaleInvoiceViewComponent,
    CoreModuleSaleItemAddComponent,
    CoreModuleSaleItemEditComponent,
    CoreModuleSaleItemListComponent,
    CoreModuleSaleItemListMobileComponent,
    CoreModuleSaleItemListViewComponent,
    CoreModuleSaleItemSelectorComponent,
    CoreModuleSaleSerialAddComponent,
    CoreModuleSaleSerialCheckListComponent,
    CoreModuleSaleSerialEditComponent,
    CoreModuleSaleSerialHeaderComponent,
    CoreModuleSaleSerialListComponent,
    CoreModuleSaleSerialListMobileComponent,
    CoreModuleSaleSerialSelectorComponent,
    CoreModuleAddComponent,
    CoreModuleComponent,
    CoreModuleEditComponent,
    CoreModuleHeaderComponent,
    CoreModuleListComponent,
    CoreModuleListMobileComponent,
    CoreModuleSelectionlistComponent,
    CoreModuleSelectorComponent,
    CoreModuleTreeComponent,
    CoreSiteCategoryCmsModuleAddComponent,
    CoreSiteCategoryCmsModuleComponent,
    CoreSiteCategoryCmsModuleEditComponent,
    CoreSiteCategoryCmsModuleListComponent,
    CoreSiteCategoryCmsModuleListMobileComponent,
    CoreSiteCategoryCmsModuleListViewComponent,
    CoreSiteCategoryCmsModuleSelectorComponent,
    CoreSiteCategoryAddComponent,
    CoreSiteCategoryComponent,
    CoreSiteCategoryEditComponent,
    CoreSiteCategoryListComponent,
    CoreSiteCategoryListMobileComponent,
    CoreSiteCategorySelectorComponent,
    CoreSiteCategoryTreeComponent,
    CoreSiteDomainAliasAddComponent,
    CoreSiteDomainAliasComponent,
    CoreSiteDomainAliasEditComponent,
    CoreSiteDomainAliasListComponent,
    CoreSiteDomainAliasListMobileComponent,
    CoreSiteDomainAliasSelectorComponent,
    CoreSiteAddComponent,
    CoreSiteAddFirstComponent,
    CoreSiteComponent,
    CoreSiteDeleteComponent,
    CoreSiteEditComponent,
    CoreSiteHeaderComponent,
    CoreInfoComponent,
    CoreSiteListComponent,
    CoreSiteListMobileComponent,
    CoreSiteModuleSiteInfoComponent,
    CoreSiteModuleSiteOptimazeComponent,
    CoreSiteModuleAddComponent,
    CoreSiteModuleEditComponent,
    CoreSiteModuleListComponent,
    CoreSiteResellerChartComponent,
    CoreSiteSelectorComponent,
    CoreSiteSiteSelectComponent,
    CoreSiteTreeComponent,
    CoreSiteUserAddComponent,
    CoreSiteUserEditComponent,
    CoreSiteUserListComponent,
    CoreSiteWidgetCountComponent,
    CoreSiteWidgetModuleComponent,
    CoreSiteWidgetStatusComponent,
    CoreUserClaimContentAddComponent,
    CoreUserClaimContentCheckListComponent,
    CoreUserClaimContentEditComponent,
    CoreUserClaimContentListComponent,
    CoreUserClaimContentListMobileComponent,
    CoreUserClaimContentWidgetStatusComponent,
    CoreUserClaimComponent,
    CoreUserClaimGroupDetailAddComponent,
    CoreUserClaimGroupDetailEditComponent,
    CoreUserClaimGroupDetailListComponent,
    CoreUserClaimGroupDetailListMobileComponent,
    CoreUserClaimGroupDetailSelectorComponent,
    CoreUserClaimGroupDetailTreeComponent,
    CoreUserClaimGroupAddComponent,
    CoreUserClaimGroupEditComponent,
    CoreUserClaimGroupHeaderComponent,
    CoreUserClaimGroupListComponent,
    CoreUserClaimGroupListMobileComponent,
    CoreUserClaimGroupSelectionlistComponent,
    CoreUserClaimGroupSelectorComponent,
    CoreUserClaimGroupTreeComponent,
    CoreUserClaimTypeAddComponent,
    CoreUserClaimTypeEditComponent,
    CoreUserClaimTypeHeaderComponent,
    CoreUserClaimTypeListComponent,
    CoreUserClaimTypeListMobileComponent,
    CoreUserClaimTypeSelectionlistComponent,
    CoreUserClaimTypeSelectorComponent,
    CoreUserClaimTypeTreeComponent,
    CoreUserGroupAddComponent,
    CoreUserGroupComponent,
    CoreUserGroupEditComponent,
    CoreUserGroupListComponent,
    CoreUserGroupListMobileComponent,
    CoreUserGroupSelectionlistComponent,
    CoreUserGroupSelectorComponent,
    CoreUserGroupTreeComponent,
    CoreUserSupportAccessAddComponent,
    CoreUserSupportAccessComponent,
    CoreUserSupportAccessEditComponent,
    CoreUserSupportAccessListComponent,
    CoreUserSupportAccessListMobileComponent,
    CoreUserAddComponent,
    CoreUserChangePasswordComponent,
    CoreUserComponent,
    CoreUserEditComponent,
    CoreUserEmailConfirmComponent,
    CoreUserHeaderComponent,
    CoreUserListComponent,
    CoreUserListMobileComponent,
    CoreUserMobileConfirmComponent,
    CoreUserResellerChartComponent,
    CoreUserSelectorComponent,
    CoreUserViewComponent,
    CoreUserWidgetComponent,
    CoreModuleDataCommentAddComponent,
    CoreModuleDataCommentEditComponent,
    CoreModuleDataCommentListComponent,
    CoreModuleDataCommentListMobileComponent,
    CoreModuleDataCommentViewComponent,
    CoreModuleDataComponent,
    CoreModuleDataMemoAddComponent,
    CoreModuleDataMemoEditComponent,
    CoreModuleDataMemoListComponent,
    CoreModuleDataMemoListMobileComponent,
    CoreModuleDataMemoViewComponent,
    CoreModuleDataPinAddComponent,
    CoreModuleDataPinEditComponent,
    CoreModuleDataPinListComponent,
    CoreModuleDataPinListMobileComponent,
    CoreModuleDataPinViewComponent,
    CoreModuleDataTaskAddComponent,
    CoreModuleDataTaskEditComponent,
    CoreModuleDataTaskListComponent,
    CoreModuleDataTaskListMobileComponent,
    CoreModuleDataTaskViewComponent,
    CoreModuleLogContentCountEditComponent,
    CoreModuleLogContentCountListComponent,
    CoreModuleLogContentCountListMobileComponent,
    CoreModuleLogContentCountViewComponent,
    CoreModuleLogComponent,
    CoreModuleLogFavoriteEditComponent,
    CoreModuleLogFavoriteListComponent,
    CoreModuleLogFavoriteListMobileComponent,
    CoreModuleLogFavoriteViewComponent,
    CoreModuleLogLikeEditComponent,
    CoreModuleLogLikeListComponent,
    CoreModuleLogLikeListMobileComponent,
    CoreModuleLogLikeViewComponent,
    CoreModuleLogReportAbuseEditComponent,
    CoreModuleLogReportAbuseListComponent,
    CoreModuleLogReportAbuseListMobileComponent,
    CoreModuleLogReportAbuseViewComponent,
    CoreModuleLogReportAbuseWidgetComponent,
    CoreModuleLogScoreEditComponent,
    CoreModuleLogScoreListComponent,
    CoreModuleLogScoreListMobileComponent,
    CoreModuleLogScoreViewComponent,
    CoreModuleLogShowKeyAddComponent,
    CoreModuleLogShowKeyEditComponent,
    CoreModuleLogShowKeyListComponent,
    CoreModuleLogShowKeyListMobileComponent,
    CoreModuleLogShowKeyViewComponent,
    CoreModuleLogSiteCreditBlockedEditComponent,
    CoreModuleLogSiteCreditBlockedListComponent,
    CoreModuleLogSiteCreditBlockedListMobileComponent,
    CoreModuleLogSiteCreditBlockedViewComponent,
    CoreModuleLogSiteCreditEditComponent,
    CoreModuleLogSiteCreditListComponent,
    CoreModuleLogSiteCreditListMobileComponent,
    CoreModuleLogSiteCreditViewComponent,
    CoreModuleLogSiteUserCreditBlockedEditComponent,
    CoreModuleLogSiteUserCreditBlockedListComponent,
    CoreModuleLogSiteUserCreditBlockedListMobileComponent,
    CoreModuleLogSiteUserCreditBlockedViewComponent,
    CoreModuleLogSiteUserCreditEditComponent,
    CoreModuleLogSiteUserCreditListComponent,
    CoreModuleLogSiteUserCreditListMobileComponent,
    CoreModuleLogSiteUserCreditViewComponent,
    CoreModuleComponent,
    CoreModuleSiteCreditChargeDirectComponent,
    CoreModuleSiteCreditChargeOnlineCalculateComponent,
    CoreModuleSiteCreditChargeOnlineComponent,
    CoreModuleSiteCreditEditComponent,
    CoreModuleSiteCreditListComponent,
    CoreModuleSiteCreditListMobileComponent,
    CoreModuleSiteCreditWidgetCreditComponent,
    CoreModuleSiteUserCreditChargeDirectComponent,
    CoreModuleSiteUserCreditChargeOnlineCalculateComponent,
    CoreModuleSiteUserCreditChargeOnlineComponent,
    CoreModuleSiteUserCreditEditComponent,
    CoreModuleSiteUserCreditListComponent,
    CoreModuleSiteUserCreditListMobileComponent,
    CoreModuleSiteUserCreditMyselfListComponent,
    CoreModuleSiteUserCreditWidgetCreditComponent,
    CoreModuleTagAddBulkComponent,
    CoreModuleTagEditComponent,
    CoreModuleTagListComponent,
    CoreModuleTagListMobileComponent,
    CoreModuleTagSelectorComponent,
    CoreModuleTagCategoryDeleteComponent,
    CoreModuleTagCategoryEditComponent,
    CoreModuleTagCategorySelectorComponent,
    CoreModuleTagCategoryTreeComponent,
    CoreTokenActivationEditComponent,
    CoreTokenActivationListComponent,
    CoreTokenActivationListMobileComponent,
    CoreTokenActivationViewComponent,
    CoreTokenAuthUserLogListComponent,
    CoreTokenAuthUserLogListMobileComponent,
    CoreTokenAuthUserLogViewComponent,
    CoreTokenAuthUserListComponent,
    CoreTokenAuthUserListMobileComponent,
    CoreTokenAuthUserViewComponent,
    CoreTokenComponent,
    CoreLogTokenMicroServiceEditComponent,
    CoreLogTokenMicroServiceListComponent,
    CoreLogTokenMicroServiceListMobileComponent,
    CoreLogTokenMicroServiceViewComponent,
    CoreTokenMicroServiceEditComponent,
    CoreTokenMicroServiceListComponent,
    CoreTokenMicroServiceListMobileComponent,
    CoreTokenMicroServiceViewComponent,
    CoreLogTokenConnectionEditComponent,
    CoreLogTokenConnectionListComponent,
    CoreLogTokenConnectionListMobileComponent,
    CoreLogTokenConnectionViewComponent,
    CoreTokenConnectionEditComponent,
    CoreTokenConnectionListOnlineComponent,
    CoreTokenConnectionListComponent,
    CoreTokenConnectionListMobileComponent,
    CoreTokenConnectionViewComponent,
    CoreTokenUserEditComponent,
    CoreTokenUserListComponent,
    CoreTokenUserViewComponent,
    CoreTokenUserBadLoginEditComponent,
    CoreTokenUserBadLoginListComponent,
    CoreTokenUserBadLoginListMobileComponent,
    CoreTokenUserBadLoginViewComponent,
    CoreLogTokenUserEditComponent,
    CoreLogTokenUserListComponent,
    CoreLogTokenUserViewComponent,
    CrmComponent,
    CrmAccountAddComponent,
    CrmAccountEditComponent,
    CrmAccountHeaderComponent,
    CrmAccountListComponent,
    CrmAccountListMobileComponent,
    CrmAccountSelectorComponent,
    CrmActivityAddComponent,
    CrmActivityEditComponent,
    CrmActivityListComponent,
    CrmActivityListMobileComponent,
    CrmCampaignAddComponent,
    CrmCampaignEditComponent,
    CrmCampaignHeaderComponent,
    CrmCampaignListComponent,
    CrmCampaignListMobileComponent,
    CrmCampaignSelectorComponent,
    CrmContactAddComponent,
    CrmContactEditComponent,
    CrmContactHeaderComponent,
    CrmContactListComponent,
    CrmContactListMobileComponent,
    CrmContactSelectorComponent,
    CrmMainComponent,
    CrmDealAddComponent,
    CrmDealEditComponent,
    CrmDealListComponent,
    CrmDealListMobileComponent,
    CrmDealSelectorComponent,
    CrmLeadAddComponent,
    CrmLeadEditComponent,
    CrmLeadListComponent,
    CrmLeadListMobileComponent,
    CrmLeadSelectorComponent,
    CrmOpportunityAddComponent,
    CrmOpportunityEditComponent,
    CrmOpportunityListComponent,
    CrmOpportunityListMobileComponent,
    CrmOpportunitySelectorComponent,
    CrmOpportunityStageHistoryListComponent,
    CrmOpportunityStageHistoryListMobileComponent,
    CrmPipelineAddComponent,
    CrmPipelineEditComponent,
    CrmPipelineListComponent,
    CrmPipelineListMobileComponent,
    CrmPipelineSelectorComponent,
    CrmStageAddComponent,
    CrmStageEditComponent,
    CrmStageListComponent,
    CrmStageListMobileComponent,
    CrmStageSelectorComponent,
    CrmSupplierPriceListAddComponent,
    CrmSupplierPriceListComponent,
    CrmSupplierPriceListMobileComponent,
    CrmSupplierRatingAddComponent,
    CrmSupplierRatingListComponent,
    CrmSupplierRatingListMobileComponent,
    DataProviderClientAddComponent,
    DataProviderClientChargePaymentComponent,
    DataProviderClientChargeComponent,
    DataProviderClientDeleteComponent,
    DataProviderClientEditComponent,
    DataProviderClientHeaderComponent,
    DataProviderClientListComponent,
    DataProviderClientSelectorComponent,
    DataProviderClientTreeComponent,
    DataProviderConfigCheckSiteComponent,
    DataProviderConfigCheckUserComponent,
    DataProviderConfigComponent,
    DataProviderConfigMainAdminComponent,
    DataProviderConfigSiteComponent,
    DataProviderDashboardComponent,
    DataProviderComponent,
    DataProviderLogClientListComponent,
    DataProviderLogClientViewComponent,
    DataProviderLogPlanListComponent,
    DataProviderLogPlanViewComponent,
    DataProviderLogSourceListComponent,
    DataProviderLogSourceViewComponent,
    DataProviderLogClientListComponent,
    DataProviderLogClientListMobileComponent,
    DataProviderLogClientViewComponent,
    DataProviderLogComponent,
    DataProviderLogPlanListComponent,
    DataProviderLogPlanListMobileComponent,
    DataProviderLogPlanViewComponent,
    DataProviderLogSourceListComponent,
    DataProviderLogSourceListMobileComponent,
    DataProviderLogSourceViewComponent,
    DataProviderClientApplicationPermissionAddComponent,
    DataProviderClientApplicationPermissionEditComponent,
    DataProviderClientApplicationPermissionListComponent,
    DataProviderClientApplicationPermissionListMobileComponent,
    DataProviderClientApplicationAddComponent,
    DataProviderClientApplicationEditComponent,
    DataProviderClientApplicationListComponent,
    DataProviderClientApplicationListMobileComponent,
    DataProviderClientApplicationSelectorComponent,
    DataProviderClientAddComponent,
    DataProviderClientChargePaymentComponent,
    DataProviderClientChargeComponent,
    DataProviderClientDeleteComponent,
    DataProviderClientEditComponent,
    DataProviderClientHeaderComponent,
    DataProviderClientListComponent,
    DataProviderClientListMobileComponent,
    DataProviderClientSelectorComponent,
    DataProviderClientTreeComponent,
    DataProviderMainComponent,
    DataProviderPlanCategoryAddComponent,
    DataProviderPlanCategoryDeleteComponent,
    DataProviderPlanCategoryEditComponent,
    DataProviderPlanCategorySelectorComponent,
    DataProviderPlanCategoryTreeComponent,
    DataProviderPlanClientAddComponent,
    DataProviderPlanClientDeleteComponent,
    DataProviderPlanClientEditComponent,
    DataProviderPlanClientHeaderComponent,
    DataProviderPlanClientListComponent,
    DataProviderPlanClientListMobileComponent,
    DataProviderPlanClientSelectorComponent,
    DataProviderPlanClientTreeComponent,
    DataProviderPlanPriceAddComponent,
    DataProviderPlanPriceChargePaymentComponent,
    DataProviderPlanPriceChargeComponent,
    DataProviderPlanPriceDeleteComponent,
    DataProviderPlanPriceEditComponent,
    DataProviderPlanPriceHeaderComponent,
    DataProviderPlanPriceListComponent,
    DataProviderPlanPriceListMobileComponent,
    DataProviderPlanPriceSelectorComponent,
    DataProviderPlanPriceTreeComponent,
    DataProviderPlanSourceAddComponent,
    DataProviderPlanSourceDeleteComponent,
    DataProviderPlanSourceEditComponent,
    DataProviderPlanSourceHeaderComponent,
    DataProviderPlanSourceListComponent,
    DataProviderPlanSourceListMobileComponent,
    DataProviderPlanSourceSelectorComponent,
    DataProviderPlanSourceTreeComponent,
    DataProviderPlanAddComponent,
    DataProviderPlanDeleteComponent,
    DataProviderPlanEditComponent,
    DataProviderPlanHeaderComponent,
    DataProviderPlanListComponent,
    DataProviderPlanListMobileComponent,
    DataProviderPlanSelectionlistComponent,
    DataProviderPlanSelectorComponent,
    DataProviderPlanTreeComponent,
    DataProviderSourceCompanyAddComponent,
    DataProviderSourceCompanyEditComponent,
    DataProviderSourceCompanyListComponent,
    DataProviderSourceCompanyListMobileComponent,
    DataProviderSourceCompanySelectorComponent,
    DataProviderSourceCompanyTreeComponent,
    DataProviderSourcePathPaginationAddComponent,
    DataProviderSourcePathPaginationEditComponent,
    DataProviderSourcePathPaginationListComponent,
    DataProviderSourcePathPaginationListMobileComponent,
    DataProviderSourcePathPaginationSelectorComponent,
    DataProviderSourcePathAddComponent,
    DataProviderSourcePathAddMobileComponent,
    DataProviderSourcePathEditComponent,
    DataProviderSourcePathEditMobileComponent,
    DataProviderSourcePathHeaderComponent,
    DataProviderSourcePathListComponent,
    DataProviderSourcePathListMobileComponent,
    DataProviderSourcePathSelectionlistComponent,
    DataProviderSourcePathSelectorComponent,
    DataProviderSourcePathTreeComponent,
    DataProviderSourcePathTreeMobileComponent,
    DataProviderSourcePublicConfigAddComponent,
    DataProviderSourcePublicConfigEditComponent,
    DataProviderSourcePublicConfigListComponent,
    DataProviderSourcePublicConfigListMobileComponent,
    DataProviderSourcePublicConfigSelectorComponent,
    DataProviderSourcePublicConfigTreeComponent,
    DataProviderSourcePublicConfigTreeMobileComponent,
    DataProviderSourceAddComponent,
    DataProviderSourceDeleteComponent,
    DataProviderSourceEditComponent,
    DataProviderSourceHeaderComponent,
    DataProviderSourceListComponent,
    DataProviderSourceListMobileComponent,
    DataProviderSourceSelectorComponent,
    DataProviderSourceTreeComponent,
    DataProviderOverviewEventsComponent,
    DataProviderOverviewSummaryComponent,
    DataProviderPlanCategoryAddComponent,
    DataProviderPlanCategoryDeleteComponent,
    DataProviderPlanCategoryEditComponent,
    DataProviderPlanCategorySelectorComponent,
    DataProviderPlanCategoryTreeComponent,
    DataProviderPlanClientAddComponent,
    DataProviderPlanClientDeleteComponent,
    DataProviderPlanClientEditComponent,
    DataProviderPlanClientHeaderComponent,
    DataProviderPlanClientListComponent,
    DataProviderPlanClientSelectorComponent,
    DataProviderPlanClientTreeComponent,
    DataProviderPlanPriceAddComponent,
    DataProviderPlanPriceChargePaymentComponent,
    DataProviderPlanPriceChargeComponent,
    DataProviderPlanPriceDeleteComponent,
    DataProviderPlanPriceEditComponent,
    DataProviderPlanPriceHeaderComponent,
    DataProviderPlanPriceListComponent,
    DataProviderPlanPriceSelectorComponent,
    DataProviderPlanPriceTreeComponent,
    DataProviderPlanSourceAddComponent,
    DataProviderPlanSourceDeleteComponent,
    DataProviderPlanSourceEditComponent,
    DataProviderPlanSourceHeaderComponent,
    DataProviderPlanSourceListComponent,
    DataProviderPlanSourceSelectorComponent,
    DataProviderPlanSourceTreeComponent,
    DataProviderPlanAddComponent,
    DataProviderPlanDeleteComponent,
    DataProviderPlanEditComponent,
    DataProviderPlanHeaderComponent,
    DataProviderPlanListComponent,
    DataProviderPlanSelectionlistComponent,
    DataProviderPlanSelectorComponent,
    DataProviderPlanTreeComponent,
    DataProviderSourceAddComponent,
    DataProviderSourceDeleteComponent,
    DataProviderSourceEditComponent,
    DataProviderSourceHeaderComponent,
    DataProviderSourceListComponent,
    DataProviderSourceSelectorComponent,
    DataProviderSourceTreeComponent,
    DataProviderTransactionComponent,
    DataProviderTransactionListComponent,
    DataProviderTransactionListMobileComponent,
    DataProviderTransactionViewComponent,
    DonateConfigCheckSiteComponent,
    DonateConfigCheckUserComponent,
    DonateConfigComponent,
    DonateConfigMainAdminComponent,
    DonateConfigSiteComponent,
    DonateComponent,
    DonateLogViewListComponent,
    DonateLogViewListMobileComponent,
    DonateLogViewComponent,
    DonateSponserAddComponent,
    DonateSponserDeleteComponent,
    DonateSponserEditComponent,
    DonateSponserHeaderComponent,
    DonateSponserListComponent,
    DonateSponserListMobileComponent,
    DonateSponserSelectorComponent,
    DonateSponserTreeComponent,
    DonateTargetCategoryAddComponent,
    DonateTargetCategoryDeleteComponent,
    DonateTargetCategoryEditComponent,
    DonateTargetCategorySelectorComponent,
    DonateTargetCategoryTreeComponent,
    DonateTargetPeriodSponserAddComponent,
    DonateTargetPeriodSponserDeleteComponent,
    DonateTargetPeriodSponserEditComponent,
    DonateTargetPeriodSponserHeaderComponent,
    DonateTargetPeriodSponserListComponent,
    DonateTargetPeriodSponserListMobileComponent,
    DonateTargetPeriodSponserSelectorComponent,
    DonateTargetPeriodSponserTreeComponent,
    DonateTargetPeriodAddComponent,
    DonateTargetPeriodChargePaymentComponent,
    DonateTargetPeriodChargeComponent,
    DonateTargetPeriodDeleteComponent,
    DonateTargetPeriodEditComponent,
    DonateTargetPeriodHeaderComponent,
    DonateTargetPeriodListComponent,
    DonateTargetPeriodListMobileComponent,
    DonateTargetPeriodSelectorComponent,
    DonateTargetAddComponent,
    DonateTargetDeleteComponent,
    DonateTargetEditComponent,
    DonateTargetHeaderComponent,
    DonateTargetListComponent,
    DonateTargetListMobileComponent,
    DonateTargetSelectorComponent,
    DonateTargetTreeComponent,
    DonateTransactionListComponent,
    DonateTransactionListMobileComponent,
    DonateTransactionViewComponent,
    EstateActionComponent,
    EstateCategoryRackAddComponent,
    EstateCategoryRackAddMobileComponent,
    EstateCategoryRackEditComponent,
    EstateCategoryRackEditMobileComponent,
    EstateCategoryRackListComponent,
    EstateCategoryRackListMobileComponent,
    EstateCategoryRackSelectorComponent,
    EstateCategoryRackTreeComponent,
    EstateCategoryZoneAddComponent,
    EstateCategoryZoneAddMobileComponent,
    EstateCategoryZoneEditComponent,
    EstateCategoryZoneEditMobileComponent,
    EstateCategoryZoneListComponent,
    EstateCategoryZoneListMobileComponent,
    EstateCategoryZoneSelectorComponent,
    EstateCategoryZoneTreeComponent,
    EstateConfigCheckSiteComponent,
    EstateConfigCheckUserComponent,
    EstateConfigComponent,
    EstateConfigMainAdminComponent,
    EstateConfigSiteComponent,
    EstateDashboardComponent,
    EstateBillboardAddComponent,
    EstateBillboardAddMobileComponent,
    EstateBillboardEditComponent,
    EstateBillboardEditMobileComponent,
    EstateBillboardHeaderComponent,
    EstateBillboardListComponent,
    EstateBillboardListMobileComponent,
    EstateBillboardSelectorComponent,
    EstateBillboardTreeComponent,
    EstateDataComponent,
    EstatePropertyAdsAddComponent,
    EstatePropertyAdsAddMobileComponent,
    EstatePropertyAdsEditComponent,
    EstatePropertyAdsEditMobileComponent,
    EstatePropertyAdsListComponent,
    EstatePropertyAdsListMobileComponent,
    EstatePropertyAdsSaleListComponent,
    EstatePropertyAdsSalePaymentComponent,
    EstatePropertyCompanyAddComponent,
    EstatePropertyCompanyAddMobileComponent,
    EstatePropertyCompanyDeleteComponent,
    EstatePropertyCompanyEditComponent,
    EstatePropertyCompanyEditMobileComponent,
    EstatePropertyCompanyHeaderComponent,
    EstatePropertyCompanyListComponent,
    EstatePropertyCompanyListMobileComponent,
    EstatePropertyCompanyQuickViewComponent,
    EstatePropertyCompanySelectorComponent,
    EstatePropertyCompanyTreeComponent,
    EstatePropertyProjectAddComponent,
    EstatePropertyProjectAddMobileComponent,
    EstatePropertyProjectDeleteComponent,
    EstatePropertyProjectEditComponent,
    EstatePropertyProjectEditMobileComponent,
    EstatePropertyProjectHeaderComponent,
    EstatePropertyProjectListComponent,
    EstatePropertyProjectListMobileComponent,
    EstatePropertyProjectQuickViewComponent,
    EstatePropertyProjectSelectorComponent,
    EstatePropertyProjectTreeComponent,
    EstatePropertySupplierAddComponent,
    EstatePropertySupplierAddMobileComponent,
    EstatePropertySupplierDeleteComponent,
    EstatePropertySupplierEditComponent,
    EstatePropertySupplierEditMobileComponent,
    EstatePropertySupplierHeaderComponent,
    EstatePropertySupplierListComponent,
    EstatePropertySupplierListMobileComponent,
    EstatePropertySupplierQuickViewComponent,
    EstatePropertySupplierSelectorComponent,
    EstatePropertySupplierTreeComponent,
    EstatePropertyActionComponent,
    EstatePropertyAddComponent,
    EstatePropertyAddMobileComponent,
    EstatePropertyCompleteComponent,
    EstatePropertyEditComponent,
    EstatePropertyHeaderComponent,
    EstatePropertyListComponent,
    EstatePropertyListMobileComponent,
    EstatePropertyQuickAddComponent,
    EstatePropertyQuickListComponent,
    EstatePropertyQuickViewComponent,
    EstatePropertyResponsibleUserListComponent,
    EstatePropertySelectorComponent,
    EstatePropertyWidgetComponent,
    EstateComponent,
    EstateCustomerOrderResultListComponent,
    EstateCustomerOrderResultListMobileComponent,
    EstateCustomerOrderResultViewComponent,
    EstateCustomerOrderActionComponent,
    EstateCustomerOrderAddToEditComponent,
    EstateCustomerOrderAddMobileComponent,
    EstateCustomerOrderEditComponent,
    EstateCustomerOrderEditMobileComponent,
    EstateCustomerOrderHeaderComponent,
    EstateCustomerOrderListComponent,
    EstateCustomerOrderListMobileComponent,
    EstateCustomerOrderQuickViewComponent,
    EstateCustomerOrderResponsibleUserListComponent,
    EstateCustomerOrderSelectorComponent,
    EstateCustomerOrderWidgetComponent,
    EstateLogComponent,
    EstatePropertyExpertPriceAddComponent,
    EstatePropertyExpertPriceAddMobileComponent,
    EstatePropertyExpertPriceEditComponent,
    EstatePropertyExpertPriceEditMobileComponent,
    EstatePropertyExpertPriceHeaderComponent,
    EstatePropertyExpertPriceInquiryCalculateComponent,
    EstatePropertyExpertPriceInquiryListComponent,
    EstatePropertyExpertPriceListComponent,
    EstatePropertyExpertPriceListMobileComponent,
    EstatePropertyHistoryAddComponent,
    EstatePropertyHistoryAddMobileComponent,
    EstatePropertyHistoryEditComponent,
    EstatePropertyHistoryEditMobileComponent,
    EstatePropertyHistoryListComponent,
    EstatePropertyHistoryListMobileComponent,
    EstatePropertyHistoryQuickViewComponent,
    EstatePropertyHistoryResponsibleUserListComponent,
    EstatePropertyHistoryWidgetComponent,
    EstateAccountAgencyAdsAddComponent,
    EstateAccountAgencyAdsAddMobileComponent,
    EstateAccountAgencyAdsEditComponent,
    EstateAccountAgencyAdsEditMobileComponent,
    EstateAccountAgencyAdsListComponent,
    EstateAccountAgencyAdsListMobileComponent,
    EstateAccountAgencyAdsSaleListComponent,
    EstateAccountAgencyAdsSalePaymentComponent,
    EstateAccountAgencyExpertAddComponent,
    EstateAccountAgencyExpertListComponent,
    EstateAccountAgencyExpertListMobileComponent,
    EstateAccountAgencyWorkAreaAddComponent,
    EstateAccountAgencyWorkAreaListComponent,
    EstateAccountAgencyWorkAreaListMobileComponent,
    EstateAccountAgencyAddComponent,
    EstateAccountAgencyAddMobileComponent,
    EstateAccountAgencyEditComponent,
    EstateAccountAgencyEditMobileComponent,
    EstateAccountAgencyHeaderComponent,
    EstateAccountAgencyListComponent,
    EstateAccountAgencyListMobileComponent,
    EstateAccountAgencySelectionlistComponent,
    EstateAccountAgencySelectorComponent,
    EstateAccountAgencyTreeComponent,
    EstateAccountExpertWorkAreaAddComponent,
    EstateAccountExpertWorkAreaListComponent,
    EstateAccountExpertWorkAreaListMobileComponent,
    EstateAccountExpertAddComponent,
    EstateAccountExpertAddMobileComponent,
    EstateAccountExpertEditComponent,
    EstateAccountExpertEditMobileComponent,
    EstateAccountExpertHeaderComponent,
    EstateAccountExpertListComponent,
    EstateAccountExpertListMobileComponent,
    EstateAccountExpertSelectionlistComponent,
    EstateAccountExpertSelectorComponent,
    EstateAccountExpertTreeComponent,
    EstateActivityTypeAddComponent,
    EstateActivityTypeAddMobileComponent,
    EstateActivityTypeCompleteComponent,
    EstateActivityTypeEditComponent,
    EstateActivityTypeEditMobileComponent,
    EstateActivityTypeHeaderComponent,
    EstateActivityTypeListComponent,
    EstateActivityTypeListMobileComponent,
    EstateActivityTypeSelectionlistComponent,
    EstateActivityTypeSelectorComponent,
    EstateActivityTypeTreeComponent,
    EstateAdsTypeAddComponent,
    EstateAdsTypeAddMobileComponent,
    EstateAdsTypeEditComponent,
    EstateAdsTypeEditMobileComponent,
    EstateAdsTypeListComponent,
    EstateAdsTypeListMobileComponent,
    EstateAdsTypeSelectorComponent,
    EstateContractTypeAddComponent,
    EstateContractTypeAddMobileComponent,
    EstateContractTypeCompleteComponent,
    EstateContractTypeEditComponent,
    EstateContractTypeEditMobileComponent,
    EstateContractTypeHeaderComponent,
    EstateContractTypeListComponent,
    EstateContractTypeListMobileComponent,
    EstateContractTypeSelectorComponent,
    EstateContractTypeTreeComponent,
    EstateCustomerCategoryAddComponent,
    EstateCustomerCategoryEditComponent,
    EstateCustomerCategorySelectorComponent,
    EstateCustomerCategoryTreeComponent,
    EstateMainComponent,
    EstatePropertyDetailGroupAddComponent,
    EstatePropertyDetailGroupAddMobileComponent,
    EstatePropertyDetailGroupEditComponent,
    EstatePropertyDetailGroupEditMobileComponent,
    EstatePropertyDetailGroupListComponent,
    EstatePropertyDetailGroupListMobileComponent,
    EstatePropertyDetailGroupSelectorComponent,
    EstatePropertyDetailGroupTreeComponent,
    EstatePropertyDetailAddComponent,
    EstatePropertyDetailAddMobileComponent,
    EstatePropertyDetailEditComponent,
    EstatePropertyDetailEditMobileComponent,
    EstatePropertyDetailListComponent,
    EstatePropertyDetailListMobileComponent,
    EstatePropertyDetailSelectorComponent,
    EstatePropertyDetailTreeComponent,
    EstatePropertySupplierCategoryAddComponent,
    EstatePropertySupplierCategoryEditComponent,
    EstatePropertySupplierCategorySelectorComponent,
    EstatePropertySupplierCategoryTreeSelectorComponent,
    EstatePropertySupplierCategoryTreeComponent,
    EstatePropertyTypeLanduseAddComponent,
    EstatePropertyTypeLanduseAddMobileComponent,
    EstatePropertyTypeLanduseCompleteComponent,
    EstatePropertyTypeLanduseEditComponent,
    EstatePropertyTypeLanduseEditMobileComponent,
    EstatePropertyTypeLanduseHeaderComponent,
    EstatePropertyTypeLanduseListComponent,
    EstatePropertyTypeLanduseListMobileComponent,
    EstatePropertyTypeLanduseSelectionlistComponent,
    EstatePropertyTypeLanduseSelectorComponent,
    EstatePropertyTypeLanduseTreeComponent,
    EstatePropertyTypeUsageAddComponent,
    EstatePropertyTypeUsageAddMobileComponent,
    EstatePropertyTypeUsageCompleteComponent,
    EstatePropertyTypeUsageEditComponent,
    EstatePropertyTypeUsageEditMobileComponent,
    EstatePropertyTypeUsageHeaderComponent,
    EstatePropertyTypeUsageListComponent,
    EstatePropertyTypeUsageListMobileComponent,
    EstatePropertyTypeUsageSelectionlistComponent,
    EstatePropertyTypeUsageSelectorComponent,
    EstatePropertyTypeUsageTreeComponent,
    EstateOverviewEventsComponent,
    EstateOverviewSummaryComponent,
    FileCategoryDeleteComponent,
    FileCategoryEditComponent,
    FileCategorySelectorComponent,
    FileCategoryTreeComponent,
    FileContentDeleteComponent,
    FileContentEditComponent,
    FileContentExplorerComponent,
    FileContentListComponent,
    FileContentListMobileComponent,
    FileContentSelectorComponent,
    FileManagerComponent,
    HyperShopCategoryAddComponent,
    HyperShopCategoryEditComponent,
    HyperShopCategoryListComponent,
    HyperShopCategoryListMobileComponent,
    HyperShopCategorySelectorComponent,
    HyperShopCategoryTreeComponent,
    HyperShopConfigCheckSiteComponent,
    HyperShopConfigCheckUserComponent,
    HyperShopConfigComponent,
    HyperShopConfigMainAdminComponent,
    HyperShopConfigSiteComponent,
    HyperShopContentAddComponent,
    HyperShopContentEditComponent,
    HyperShopContentListComponent,
    HyperShopContentListMobileComponent,
    HyperShopContentViewComponent,
    HyperShopComponent,
    LinkManagementAccountingDetailAddComponent,
    LinkManagementAccountingDetailDeleteComponent,
    LinkManagementAccountingDetailEditComponent,
    LinkManagementAccountingDetailListComponent,
    LinkManagementAccountingDetailListMobileComponent,
    LinkManagementAccountingAddComponent,
    LinkManagementAccountingDeleteComponent,
    LinkManagementAccountingEditComponent,
    LinkManagementAccountingListComponent,
    LinkManagementAccountingListMobileComponent,
    LinkManagementAccountingSelectorComponent,
    LinkManagementBillboardPatternAddComponent,
    LinkManagementBillboardPatternDeleteComponent,
    LinkManagementBillboardPatternEditComponent,
    LinkManagementBillboardPatternListComponent,
    LinkManagementBillboardPatternListMobileComponent,
    LinkManagementBillboardPatternSelectorComponent,
    LinkManagementBillboardPatternTreeSelectorComponent,
    LinkManagementBillboardPatternTreeComponent,
    LinkManagementBillboardAddComponent,
    LinkManagementBillboardDeleteComponent,
    LinkManagementBillboardEditComponent,
    LinkManagementBillboardListComponent,
    LinkManagementBillboardListMobileComponent,
    LinkManagementCategoryAddComponent,
    LinkManagementCategoryDeleteComponent,
    LinkManagementCategoryEditComponent,
    LinkManagementCategorySelectorComponent,
    LinkManagementCategoryTreeSelectorComponent,
    LinkManagementCategoryTreeComponent,
    LinkManagementConfigCheckSiteComponent,
    LinkManagementConfigCheckUserComponent,
    LinkManagementConfigComponent,
    LinkManagementConfigMainAdminComponent,
    LinkManagementConfigSiteComponent,
    LinkManagementComponent,
    LinkManagementMemberAddComponent,
    LinkManagementMemberDeleteComponent,
    LinkManagementMemberEditComponent,
    LinkManagementMemberListComponent,
    LinkManagementMemberListMobileComponent,
    LinkManagementMemberSelectorComponent,
    LinkManagementTargetBillboardLogDeleteComponent,
    LinkManagementTargetBillboardLogEditComponent,
    LinkManagementTargetBillboardLogListComponent,
    LinkManagementTargetBillboardLogListMobileComponent,
    LinkManagementTargetAddComponent,
    LinkManagementTargetDeleteComponent,
    LinkManagementTargetEditComponent,
    LinkManagementTargetListComponent,
    LinkManagementTargetListMobileComponent,
    MemberGroupAddComponent,
    MemberGroupDeleteComponent,
    MemberGroupEditComponent,
    MemberGroupHeaderComponent,
    MemberGroupListComponent,
    MemberGroupListMobileComponent,
    MemberGroupSelectorComponent,
    MemberGroupTreeComponent,
    MemberComponent,
    MemberPropertyAliasAddComponent,
    MemberPropertyAliasDeleteComponent,
    MemberPropertyAliasEditComponent,
    MemberPropertyAliasHeaderComponent,
    MemberPropertyAliasListComponent,
    MemberPropertyAliasListMobileComponent,
    MemberPropertyAliasSelectorComponent,
    MemberPropertyAliasTreeComponent,
    MemberPropertyDetailGroupAddComponent,
    MemberPropertyDetailGroupEditComponent,
    MemberPropertyDetailGroupListComponent,
    MemberPropertyDetailGroupListMobileComponent,
    MemberPropertyDetailGroupSelectorComponent,
    MemberPropertyDetailGroupTreeComponent,
    MemberPropertyDetailAddComponent,
    MemberPropertyDetailEditComponent,
    MemberPropertyDetailListComponent,
    MemberPropertyDetailListMobileComponent,
    MemberPropertyDetailSelectorComponent,
    MemberPropertyDetailTreeComponent,
    NewsCategoryAddComponent,
    NewsCategoryAddMobileComponent,
    NewsCategoryDeleteComponent,
    NewsCategoryDeleteMobileComponent,
    NewsCategoryEditComponent,
    NewsCategoryEditMobileComponent,
    NewsCategoryListComponent,
    NewsCategoryListMobileComponent,
    NewsCategoryMenuComponent,
    NewsCategorySelectorComponent,
    NewsCategoryTreeSelectorComponent,
    NewsCategoryTreeComponent,
    NewsCategoryViewComponent,
    NewsCategoryViewMobileComponent,
    NewsCommentEditComponent,
    NewsCommentListComponent,
    NewsCommentListMobileComponent,
    NewsConfigCheckSiteComponent,
    NewsConfigCheckUserComponent,
    NewsConfigMainAdminComponent,
    NewsConfigComponent,
    NewsConfigSiteComponent,
    NewsContentAddComponent,
    NewsContentAddMobileComponent,
    NewsContentDeleteComponent,
    NewsContentDeleteMobileComponent,
    NewsContentEditComponent,
    NewsContentEditMobileComponent,
    NewsContentHeaderComponent,
    NewsContentListComponent,
    NewsContentListMobileComponent,
    NewsContentSelectorComponent,
    NewsContentViewComponent,
    NewsContentViewMobileComponent,
    NewsContentWidgetComponent,
    NewsComponent,
    PollingCategoryAddComponent,
    PollingCategoryDeleteComponent,
    PollingCategoryEditComponent,
    PollingCategorySelectorComponent,
    PollingCategoryTreeComponent,
    PollingConfigCheckSiteComponent,
    PollingConfigCheckUserComponent,
    PollingConfigMainAdminComponent,
    PollingConfigComponent,
    PollingConfigSiteComponent,
    PollingContentAddComponent,
    PollingContentDeleteComponent,
    PollingContentEditComponent,
    PollingContentListComponent,
    PollingContentListMobileComponent,
    PollingComponent,
    PollingVoteEditComponent,
    PollingVoteListComponent,
    PollingVoteListMobileComponent,
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
    SmsDashboardComponent,
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
    SmsOutBoxTypeEnumSelectorComponent,
    SmsComponent,
    TicketingAnswerAddComponent,
    TicketingAnswerEditComponent,
    TicketingAnswerListComponent,
    TicketingAnswerListMobileComponent,
    TicketingAnswerViewComponent,
    TicketingConfigCheckSiteComponent,
    TicketingConfigCheckUserComponent,
    TicketingConfigMainAdminComponent,
    TicketingConfigSiteComponent,
    TicketingConfigComponent,
    TicketingDepartemenAddComponent,
    TicketingDepartemenDeleteComponent,
    TicketingDepartemenEditComponent,
    TicketingDepartemenListComponent,
    TicketingDepartemenListMobileComponent,
    TicketingDepartemenSelectorComponent,
    TicketingDepartemenTreeComponent,
    TicketingDepartemenLogEditComponent,
    TicketingDepartemenLogListComponent,
    TicketingDepartemenLogListMobileComponent,
    TicketingDepartemenOperatorAddComponent,
    DeleteComponent,
    TicketingDepartemenOperatorEditComponent,
    TicketingDepartemenOperatorListComponent,
    TicketingDepartemenOperatorListMobileComponent,
    TicketingDepartemenOperatorSelectorComponent,
    TicketingDepartemenOperatorTreeComponent,
    TicketingFaqAddComponent,
    TicketingFaqEditComponent,
    TicketingFaqListComponent,
    TicketingFaqListMobileComponent,
    TicketingFaqOriginListComponent,
    TicketingTaskAddComponent,
    TicketingTaskContactUsAddComponent,
    TicketingTaskContactUsListComponent,
    DeleteComponent,
    TicketingTaskEditComponent,
    TicketingTaskHeaderComponent,
    TicketingTaskListComponent,
    TicketingTaskListMobileComponent,
    TicketingTaskViewComponent,
    TicketingTaskWidgetComponent,
    TicketingTemplateAddComponent,
    TicketingTemplateEditComponent,
    TicketingTemplateListComponent,
    TicketingTemplateListMobileComponent,
    TicketingTemplateSelectorComponent,
    TicketingComponent,
    TransactionAssistantAddressAddComponent,
    TransactionAssistantAddressEditComponent,
    TransactionAssistantAddressListComponent,
    TransactionAssistantAddressListMobileComponent,
    TransactionAssistantCartAddComponent,
    TransactionAssistantCartEditComponent,
    TransactionAssistantCartListComponent,
    TransactionAssistantCartListMobileComponent,
    TransactionAssistantCategoryAddComponent,
    TransactionAssistantCategoryEditComponent,
    TransactionAssistantCategoryListComponent,
    TransactionAssistantCategoryListMobileComponent,
    TransactionAssistantConfigCheckSiteComponent,
    TransactionAssistantConfigCheckUserComponent,
    TransactionAssistantConfigMainAdminComponent,
    TransactionAssistantConfigSiteComponent,
    TransactionAssistantConfigComponent,
    TransactionAssistantDashboardComponent,
    TransactionAssistantInventoryAddComponent,
    TransactionAssistantInventoryEditComponent,
    TransactionAssistantInventoryListComponent,
    TransactionAssistantInventoryListMobileComponent,
    TransactionAssistantInvoiceAddComponent,
    TransactionAssistantInvoiceEditComponent,
    TransactionAssistantInvoiceListComponent,
    TransactionAssistantInvoiceListMobileComponent,
    TransactionAssistantOfferAddComponent,
    TransactionAssistantOfferEditComponent,
    TransactionAssistantOfferListComponent,
    TransactionAssistantOfferListMobileComponent,
    TransactionAssistantOrderAddComponent,
    TransactionAssistantOrderEditComponent,
    TransactionAssistantOrderListComponent,
    TransactionAssistantOrderListMobileComponent,
    TransactionAssistantPaymentAddComponent,
    TransactionAssistantPaymentEditComponent,
    TransactionAssistantPaymentListComponent,
    TransactionAssistantPaymentListMobileComponent,
    TransactionAssistantProductAddComponent,
    TransactionAssistantProductEditComponent,
    TransactionAssistantProductListComponent,
    TransactionAssistantProductListMobileComponent,
    TransactionAssistantRatingAddComponent,
    TransactionAssistantRatingEditComponent,
    TransactionAssistantRatingListComponent,
    TransactionAssistantRatingListMobileComponent,
    TransactionAssistantRequestAddComponent,
    TransactionAssistantRequestEditComponent,
    TransactionAssistantRequestListComponent,
    TransactionAssistantRequestListMobileComponent,
    TransactionAssistantShipmentAddComponent,
    TransactionAssistantShipmentEditComponent,
    TransactionAssistantShipmentListComponent,
    TransactionAssistantShipmentListMobileComponent,
    TransactionAssistantSupplierAddComponent,
    TransactionAssistantSupplierEditComponent,
    TransactionAssistantSupplierListComponent,
    TransactionAssistantSupplierListMobileComponent,
    TransactionAssistantTagAddComponent,
    TransactionAssistantTagEditComponent,
    TransactionAssistantTagListComponent,
    TransactionAssistantTagListMobileComponent,
    TransactionAssistantComponent,
    UniversalMenuComponent,
    WebDesignerBuilderHtmlBodyComponent,
    WebDesignerBuilderHtmlContainerComponent,
    WebDesignerBuilderHtmlHeaderComponent,
    WebDesignerBuilderHtmlItemsComponent,
    WebDesignerBuilderHtmlRowComponent,
    WebDesignerBuilderModuleBlogComponent,
    WebDesignerBuilderModuleNewsComponent,
    WebDesignerBuilderModuleTicketingComponent,
    WebDesignerBuilderComponent,
    WebDesignerConfigCheckSiteComponent,
    WebDesignerConfigCheckUserComponent,
    WebDesignerConfigMainAdminComponent,
    WebDesignerConfigSiteComponent,
    WebDesignerConfigComponent,
    WebDesignerMainIntroAddComponent,
    WebDesignerMainIntroEditComponent,
    WebDesignerMainIntroListComponent,
    WebDesignerMainIntroListMobileComponent,
    EditComponent,
    WebDesignerLogMemberInfoListComponent,
    WebDesignerLogMemberInfoListMobileComponent,
    WebDesignerLogMemberInfoSelectorComponent,
    WebDesignerLogMemberInfoViewComponent,
    WebDesignerLogMemberInfoWidgetComponent,
    WebDesignerMainMenuAddComponent,
    WebDesignerMainMenuEditComponent,
    WebDesignerMainMenuListComponent,
    WebDesignerMainMenuListMobileComponent,
    WebDesignerMainMenuSelectorComponent,
    WebDesignerMainMenuTreeComponent,
    WebDesignerMainPageDependencyAddComponent,
    WebDesignerMainPageDependencyAutoAddPageComponent,
    WebDesignerMainPageDependencyEditComponent,
    WebDesignerMainPageDependencyHeaderComponent,
    WebDesignerMainPageDependencyListComponent,
    WebDesignerMainPageDependencyListMobileComponent,
    WebDesignerMainPageDependencySelectorComponent,
    WebDesignerMainPageDependencyTreeComponent,
    WebDesignerMainPageTemplateAddComponent,
    WebDesignerMainPageTemplateEditComponent,
    WebDesignerMainPageTemplateHeaderComponent,
    WebDesignerMainPageTemplateListComponent,
    WebDesignerMainPageTemplateListMobileComponent,
    WebDesignerMainPageTemplateSelectorComponent,
    WebDesignerMainPageTemplateTreeComponent,
    WebDesignerMainPageAddComponent,
    WebDesignerMainPageEditComponent,
    WebDesignerMainPageHeaderComponent,
    WebDesignerMainPageListGridComponent,
    WebDesignerMainPageListComponent,
    WebDesignerMainPageListMobileComponent,
    WebDesignerMainPageSelectorComponent,
    WebDesignerMainPageTreeComponent,
    WebDesignerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    SmsWidgetModule,
    EstateWidgetModule,
    ApplicationWidgetModule,
    ArticleWidgetModule,
    BiographyWidgetModule,
    BlogWidgetModule,
    CatalogWidgetModule,
    ChartWidgetModule,
    NewsWidgetModule,
    CoreMainWidgetModule,
    CoreModuleWidgetModule,
    TicketingWidgetModule,
    WebDesignerWidgetModule,
    // ComponentsModule,
  ],
  exports: [
    /*widget*/
    SmsWidgetModule,
    EstateWidgetModule,
    ApplicationWidgetModule,
    ArticleWidgetModule,
    BiographyWidgetModule,
    BlogWidgetModule,
    CatalogWidgetModule,
    ChartWidgetModule,
    NewsWidgetModule,
    CoreMainWidgetModule,
    CoreModuleWidgetModule,
    TicketingWidgetModule,
    WebDesignerWidgetModule,
    /*widget*/
  ],
  providers: [
    CmsConfirmationDialogService,
    CoreCpMainMenuService,
    CoreConfigurationService,
  ],
})
export class CmsModulesWidgetModule {}
