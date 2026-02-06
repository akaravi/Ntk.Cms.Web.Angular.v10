import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CoreModuleService } from "ntk-cms-api";
import { CoreComponent } from "./core.component";
import { CoreRoutes } from "./core.routing";
import { CoreSharedModule } from "./core.shared.module";
import { CoreMainActionComponent } from "./action/core-main-action.component";
import { CoreMainActionSendNotificationComponent } from "./action/send-notification/send-notification.component";
import { CoreConfigCheckSiteComponent } from "./config/check-site/check-site.component";
import { CoreConfigCheckUserComponent } from "./config/check-user/check-user.component";
import { CoreConfigComponent } from "./config/core-config.component";
import { CoreConfigMainAdminComponent } from "./config/main-admin/config-main-admin.component";
import { CoreConfigSiteComponent } from "./config/site/config-site.component";
import { CoreCpMainMenuAddComponent } from "./cp-main-menu/add/add.component";
import { CoreCpMainMenuComponent } from "./cp-main-menu/coreCpMainMenu.component";
import { CoreCpMainMenuEditComponent } from "./cp-main-menu/edit/edit.component";
import { CoreCpMainMenuListComponent } from "./cp-main-menu/list/list.component";
import { CoreCpMainMenuListMobileComponent } from "./cp-main-menu/list/list.mobile.component";
import { CoreCpMainMenuSelectorComponent } from "./cp-main-menu/selector/selector.component";
import { CoreCpMainMenuTreeComponent } from "./cp-main-menu/tree/tree.component";
import { CoreCurrencyAddComponent } from "./currency/add/add.component";
import { CoreCurrencyComponent } from "./currency/coreCurrency.component";
import { CoreCurrencyEditComponent } from "./currency/edit/edit.component";
import { CoreCurrencyListComponent } from "./currency/list/list.component";
import { CoreCurrencyListMobileComponent } from "./currency/list/list.mobile.component";
import { CoreCurrencySelectorComponent } from "./currency/selector/selector.component";
import { CoreDeviceAddComponent } from "./device/add/add.component";
import { CoreDeviceComponent } from "./device/coreDevice.component";
import { CoreDeviceEditComponent } from "./device/edit/edit.component";
import { CoreDeviceListComponent } from "./device/list/list.component";
import { CoreDeviceListMobileComponent } from "./device/list/list.mobile.component";
import { CoreDeviceSelectorComponent } from "./device/selector/selector.component";
import { CoreGuideAddComponent } from "./guides/add/add.component";
import { CoreGuideComponent } from "./guides/coreGuide.component";
import { CoreGuideEditComponent } from "./guides/edit/edit.component";
import { CoreGuideListComponent } from "./guides/list/list.component";
import { CoreGuideListMobileComponent } from "./guides/list/list.mobile.component";
import { CoreGuideSelectorComponent } from "./guides/selector/selector.component";
import { CoreGuideTreeComponent } from "./guides/tree/tree.component";
import { CoreLocationAddBulkComponent } from "./location/add-bulk/add-bulk.component";
import { CoreLocationAddComponent } from "./location/add/add.component";
import { CoreLocationComponent } from "./location/coreLocation.component";
import { CoreLocationEditComponent } from "./location/edit/edit.component";
import { CoreLocationListComponent } from "./location/list/list.component";
import { CoreLocationListMobileComponent } from "./location/list/list.mobile.component";
import { CoreLocationSelectorComponent } from "./location/selector/selector.component";
import { CoreLocationTreeComponent } from "./location/tree/tree.component";
import { CoreModuleEntityReportFileAddComponent } from "./module-entity-report-file/add/add.component";
import { CoreModuleEntityReportFileComponent } from "./module-entity-report-file/core-module-entity-report-file.component";
import { CoreModuleEntityReportFileEditComponent } from "./module-entity-report-file/edit/edit.component";
import { CoreModuleEntityReportFileListComponent } from "./module-entity-report-file/list/list.component";
import { CoreModuleEntityReportFileListMobileComponent } from "./module-entity-report-file/list/list.mobile.component";
import { CoreModuleEntityComponent } from "./module-entity/core-module-entity.component";
import { CoreModuleEntityEditComponent } from "./module-entity/edit/edit.component";
import { CoreModuleEntityListComponent } from "./module-entity/list/list.component";
import { CoreModuleEntityListMobileComponent } from "./module-entity/list/list.mobile.component";
import { CoreModuleEntitySelectorComponent } from "./module-entity/selector/selector.component";
import { CoreModuleSaleComponent } from "./module-sale/core-module-sale.component";
import { CoreModuleSaleHeaderGroupAddComponent } from "./module-sale/header-group/add/add.component";
import { CoreModuleSaleHeaderGroupEditComponent } from "./module-sale/header-group/edit/edit.component";
import { CoreModuleSaleHeaderGroupHeaderComponent } from "./module-sale/header-group/header/header.component";
import { CoreModuleSaleHeaderGroupListComponent } from "./module-sale/header-group/list/list.component";
import { CoreModuleSaleHeaderGroupListMobileComponent } from "./module-sale/header-group/list/list.mobile.component";
import { CoreModuleSaleHeaderGroupSelectorComponent } from "./module-sale/header-group/selector/selector.component";
import { CoreModuleSaleHeaderGroupTreeComponent } from "./module-sale/header-group/tree/tree.component";
import { CoreModuleSaleHeaderAddComponent } from "./module-sale/header/add/add.component";
import { CoreModuleSaleHeaderEditComponent } from "./module-sale/header/edit/edit.component";
import { CoreModuleSaleHeaderHeaderComponent } from "./module-sale/header/header/header.component";
import { CoreModuleSaleHeaderListComponent } from "./module-sale/header/list/list.component";
import { CoreModuleSaleHeaderListMobileComponent } from "./module-sale/header/list/list.mobile.component";
import { CoreModuleSaleHeaderSaleListComponent } from "./module-sale/header/sale-list/sale-list.component";
import { CoreModuleSaleHeaderSalePaymentComponent } from "./module-sale/header/sale-payment/sale-payment.component";
import { CoreModuleSaleHeaderSelectorComponent } from "./module-sale/header/selector/selector.component";
import { CoreModuleSaleHeaderTreeComponent } from "./module-sale/header/tree/tree.component";
import { CoreModuleSaleInvoiceDetailListComponent } from "./module-sale/invoice-detail/list/list.component";
import { CoreModuleSaleInvoiceDetailListMobileComponent } from "./module-sale/invoice-detail/list/list.mobile.component";
import { CoreModuleSaleInvoiceDetailViewComponent } from "./module-sale/invoice-detail/view/view.component";
import { CoreModuleSaleInvoiceListComponent } from "./module-sale/invoice/list/list.component";
import { CoreModuleSaleInvoiceListMobileComponent } from "./module-sale/invoice/list/list.mobile.component";
import { CoreModuleSaleInvoiceViewComponent } from "./module-sale/invoice/view/view.component";
import { CoreModuleSaleItemAddComponent } from "./module-sale/Item/add/add.component";
import { CoreModuleSaleItemEditComponent } from "./module-sale/Item/edit/edit.component";
import { CoreModuleSaleItemListComponent } from "./module-sale/Item/list/list.component";
import { CoreModuleSaleItemListMobileComponent } from "./module-sale/Item/list/list.mobile.component";
import { CoreModuleSaleItemListViewComponent } from "./module-sale/Item/listview/listview.component";
import { CoreModuleSaleItemSelectorComponent } from "./module-sale/Item/selector/selector.component";
import { CoreModuleSaleSerialAddComponent } from "./module-sale/serial/add/add.component";
import { CoreModuleSaleSerialCheckListComponent } from "./module-sale/serial/check-list/check-list.component";
import { CoreModuleSaleSerialEditComponent } from "./module-sale/serial/edit/edit.component";
import { CoreModuleSaleSerialHeaderComponent } from "./module-sale/serial/header/header.component";
import { CoreModuleSaleSerialListComponent } from "./module-sale/serial/list/list.component";
import { CoreModuleSaleSerialListMobileComponent } from "./module-sale/serial/list/list.mobile.component";
import { CoreModuleSaleSerialSelectorComponent } from "./module-sale/serial/selector/selector.component";
import { CoreModuleAddComponent } from "./module/add/add.component";
import { CoreModuleComponent } from "./module/coreModule.component";
import { CoreModuleEditComponent } from "./module/edit/edit.component";
import { CoreModuleHeaderComponent } from "./module/header/header.component";
import { CoreModuleListComponent } from "./module/list/list.component";
import { CoreModuleListMobileComponent } from "./module/list/list.mobile.component";
import { CoreModuleSelectionlistComponent } from "./module/selectionlist/selectionlist.component";
import { CoreModuleSelectorComponent } from "./module/selector/selector.component";
import { CoreModuleTreeComponent } from "./module/tree/tree.component";
import { CoreSiteCategoryCmsModuleAddComponent } from "./site-category-module/add/add.component";
import { CoreSiteCategoryCmsModuleComponent } from "./site-category-module/coreSiteCategoryCmsModule.component";
import { CoreSiteCategoryCmsModuleEditComponent } from "./site-category-module/edit/edit.component";
import { CoreSiteCategoryCmsModuleListComponent } from "./site-category-module/list/list.component";
import { CoreSiteCategoryCmsModuleListMobileComponent } from "./site-category-module/list/list.mobile.component";
import { CoreSiteCategoryCmsModuleListViewComponent } from "./site-category-module/listview/listview.component";
import { CoreSiteCategoryCmsModuleSelectorComponent } from "./site-category-module/selector/selector.component";
import { CoreSiteCategoryAddComponent } from "./site-category/add/add.component";
import { CoreSiteCategoryComponent } from "./site-category/coreSiteCategory.component";
import { CoreSiteCategoryEditComponent } from "./site-category/edit/edit.component";
import { CoreSiteCategoryListComponent } from "./site-category/list/list.component";
import { CoreSiteCategoryListMobileComponent } from "./site-category/list/list.mobile.component";
import { CoreSiteCategorySelectorComponent } from "./site-category/selector/selector.component";
import { CoreSiteCategoryTreeComponent } from "./site-category/tree/tree.component";
import { CoreSiteDomainAliasAddComponent } from "./site-domain-alias/add/add.component";
import { CoreSiteDomainAliasComponent } from "./site-domain-alias/coreSiteDomainAlias.component";
import { CoreSiteDomainAliasEditComponent } from "./site-domain-alias/edit/edit.component";
import { CoreSiteDomainAliasListComponent } from "./site-domain-alias/list/list.component";
import { CoreSiteDomainAliasListMobileComponent } from "./site-domain-alias/list/list.mobile.component";
import { CoreSiteDomainAliasSelectorComponent } from "./site-domain-alias/selector/selector.component";
import { CoreSiteAddComponent } from "./site/add/add.component";
import { CoreSiteAddFirstComponent } from "./site/addFirst/addFirst.component";
import { CoreSiteComponent } from "./site/coreSite.component";
import { CoreSiteDeleteComponent } from "./site/delete/delete.component";
import { CoreSiteEditComponent } from "./site/edit/edit.component";
import { CoreSiteHeaderComponent } from "./site/header/header.component";
import { CoreInfoComponent } from "./site/info/core-info.component";
import { CoreSiteListComponent } from "./site/list/list.component";
import { CoreSiteListMobileComponent } from "./site/list/list.mobile.component";
import { CoreSiteModuleSiteInfoComponent } from "./site/module-site-info/module-site-info.component";
import { CoreSiteModuleSiteOptimazeComponent } from "./site/module-site-optimaze/module-site-optimaze.component";
import { CoreSiteModuleAddComponent } from "./site/moduleAdd/moduleAdd.component";
import { CoreSiteModuleEditComponent } from "./site/moduleEdit/moduleEdit.component";
import { CoreSiteModuleListComponent } from "./site/moduleList/moduleList.component";
import { CoreSiteResellerChartComponent } from "./site/reseller-chart/reseller-chart.component";
import { CoreSiteSelectorComponent } from "./site/selector/selector.component";
import { CoreSiteSiteSelectComponent } from "./site/site-select/site-select.component";
import { CoreSiteTreeComponent } from "./site/tree/tree.component";
import { CoreSiteUserAddComponent } from "./site/user-add/user-add.component";
import { CoreSiteUserEditComponent } from "./site/user-edit/user-edit.component";
import { CoreSiteUserListComponent } from "./site/user-list/user-list.component";
import { CoreSiteWidgetCountComponent } from "./site/widget/count/widget.component";
import { CoreSiteWidgetModuleComponent } from "./site/widget/module/widget.component";
import { CoreSiteWidgetStatusComponent } from "./site/widget/status/widget.component";
import { CoreUserClaimContentAddComponent } from "./user-claim/content/add/add.component";
import { CoreUserClaimContentCheckListComponent } from "./user-claim/content/check-list/check-list.component";
import { CoreUserClaimContentEditComponent } from "./user-claim/content/edit/edit.component";
import { CoreUserClaimContentListComponent } from "./user-claim/content/list/list.component";
import { CoreUserClaimContentListMobileComponent } from "./user-claim/content/list/list.mobile.component";
import { CoreUserClaimContentWidgetStatusComponent } from "./user-claim/content/widget/widget-status.component";
import { CoreUserClaimComponent } from "./user-claim/core-user-claim.component";
import { CoreUserClaimGroupDetailAddComponent } from "./user-claim/group-detail/add/add.component";
import { CoreUserClaimGroupDetailEditComponent } from "./user-claim/group-detail/edit/edit.component";
import { CoreUserClaimGroupDetailListComponent } from "./user-claim/group-detail/list/list.component";
import { CoreUserClaimGroupDetailListMobileComponent } from "./user-claim/group-detail/list/list.mobile.component";
import { CoreUserClaimGroupDetailSelectorComponent } from "./user-claim/group-detail/selector/selector.component";
import { CoreUserClaimGroupDetailTreeComponent } from "./user-claim/group-detail/tree/tree.component";
import { CoreUserClaimGroupAddComponent } from "./user-claim/group/add/add.component";
import { CoreUserClaimGroupEditComponent } from "./user-claim/group/edit/edit.component";
import { CoreUserClaimGroupHeaderComponent } from "./user-claim/group/header/header.component";
import { CoreUserClaimGroupListComponent } from "./user-claim/group/list/list.component";
import { CoreUserClaimGroupListMobileComponent } from "./user-claim/group/list/list.mobile.component";
import { CoreUserClaimGroupSelectionlistComponent } from "./user-claim/group/selectionlist/selectionlist.component";
import { CoreUserClaimGroupSelectorComponent } from "./user-claim/group/selector/selector.component";
import { CoreUserClaimGroupTreeComponent } from "./user-claim/group/tree/tree.component";
import { CoreUserClaimTypeAddComponent } from "./user-claim/type/add/add.component";
import { CoreUserClaimTypeEditComponent } from "./user-claim/type/edit/edit.component";
import { CoreUserClaimTypeHeaderComponent } from "./user-claim/type/header/header.component";
import { CoreUserClaimTypeListComponent } from "./user-claim/type/list/list.component";
import { CoreUserClaimTypeListMobileComponent } from "./user-claim/type/list/list.mobile.component";
import { CoreUserClaimTypeSelectionlistComponent } from "./user-claim/type/selectionlist/selectionlist.component";
import { CoreUserClaimTypeSelectorComponent } from "./user-claim/type/selector/selector.component";
import { CoreUserClaimTypeTreeComponent } from "./user-claim/type/tree/tree.component";
import { CoreUserGroupAddComponent } from "./user-group/add/add.component";
import { CoreUserGroupComponent } from "./user-group/coreUserGroup.component";
import { CoreUserGroupEditComponent } from "./user-group/edit/edit.component";
import { CoreUserGroupListComponent } from "./user-group/list/list.component";
import { CoreUserGroupListMobileComponent } from "./user-group/list/list.mobile.component";
import { CoreUserGroupSelectionlistComponent } from "./user-group/selectionlist/selectionlist.component";
import { CoreUserGroupSelectorComponent } from "./user-group/selector/selector.component";
import { CoreUserGroupTreeComponent } from "./user-group/tree/tree.component";
import { CoreUserSupportAccessAddComponent } from "./user-support-access/add/add.component";
import { CoreUserSupportAccessComponent } from "./user-support-access/core-user-support-access.component";
import { CoreUserSupportAccessEditComponent } from "./user-support-access/edit/edit.component";
import { CoreUserSupportAccessListComponent } from "./user-support-access/list/list.component";
import { CoreUserSupportAccessListMobileComponent } from "./user-support-access/list/list.mobile.component";
import { CoreUserAddComponent } from "./user/add/add.component";
import { CoreUserChangePasswordComponent } from "./user/changePassword/changePassword.component";
import { CoreUserComponent } from "./user/coreUser.component";
import { CoreUserEditComponent } from "./user/edit/edit.component";
import { CoreUserEmailConfirmComponent } from "./user/emailConfirm/emailConfirm.component";
import { CoreUserHeaderComponent } from "./user/header/header.component";
import { CoreUserListComponent } from "./user/list/list.component";
import { CoreUserListMobileComponent } from "./user/list/list.mobile.component";
import { CoreUserMobileConfirmComponent } from "./user/mobileConfirm/mobileConfirm.component";
import { CoreUserResellerChartComponent } from "./user/reseller-chart/reseller-chart.component";
import { CoreUserSelectorComponent } from "./user/selector/selector.component";
import { CoreUserViewComponent } from "./user/view/view.component";
import { CoreUserWidgetComponent } from "./user/widget/widget.component";

@NgModule({
  imports: [
    CoreRoutes,
    CommonModule,
    // FormsModule,
    // ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    // SharedModule,
    // AngularEditorModule,

    CoreSharedModule,
  ],
  declarations: [CoreComponent
    CoreMainActionComponent,
    CoreMainActionSendNotificationComponent,
    CoreConfigCheckSiteComponent,
    CoreConfigCheckUserComponent,
    CoreConfigComponent,
    CoreConfigMainAdminComponent,
    CoreConfigSiteComponent,
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
    CoreUserWidgetComponent,],
  exports: [],
  providers: [CoreModuleService],
})
export class CoreModule {}
