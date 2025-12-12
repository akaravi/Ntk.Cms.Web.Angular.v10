import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { TransactionAssistantConfigurationService, CoreModuleService } from "ntk-cms-api";
import { SharedModule } from "src/app/shared/shared.module";
import { TransactionAssistantConfigRouting } from "./transaction-assistant-config.routing";
import { TransactionAssistantConfigCheckSiteComponent } from "./check-site/check-site.component";
import { TransactionAssistantConfigCheckUserComponent } from "./check-user/check-user.component";
import { TransactionAssistantConfigMainAdminComponent } from "./main-admin/config-main-admin.component";
import { TransactionAssistantConfigSiteComponent } from "./site/config-site.component";
import { TransactionAssistantConfigComponent } from "./transaction-assistant-config.component";
@NgModule({
  declarations: [
    TransactionAssistantConfigComponent,
    /*Config*/
    TransactionAssistantConfigMainAdminComponent,
    TransactionAssistantConfigSiteComponent,
    TransactionAssistantConfigCheckUserComponent,
    TransactionAssistantConfigCheckSiteComponent,
    /*Config*/
  ],
  providers: [CoreModuleService, TransactionAssistantConfigurationService],
  imports: [
    CommonModule,
    FormsModule,
    TransactionAssistantConfigRouting,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
    SharedModule,
    AngularEditorModule,
  ],
  exports: [
    /*Config*/
    TransactionAssistantConfigMainAdminComponent,
    TransactionAssistantConfigSiteComponent,
    TransactionAssistantConfigCheckUserComponent,
    TransactionAssistantConfigCheckSiteComponent,
    /*Config*/
  ],
})
export class TransactionAssistantConfigModule {}

