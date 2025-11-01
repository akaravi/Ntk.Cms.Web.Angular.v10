import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModuleService } from 'ntk-cms-api';
import { CoreComponent } from './core.component';
import { CoreRoutes } from './core.routing';
import { CoreSharedModule } from './core.shared.module';

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
  declarations: [CoreComponent],
  exports: [],
  providers: [CoreModuleService],
})
export class CoreModule {}
