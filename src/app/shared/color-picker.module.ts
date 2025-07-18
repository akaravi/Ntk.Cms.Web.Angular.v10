import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import {
  NGX_MAT_COLOR_PICKER_SCROLL_STRATEGY_FACTORY_PROVIDER,
  NgxMatColorCanvasComponent,
  NgxMatColorCollectionComponent,
  NgxMatColorPaletteComponent,
  NgxMatColorPickerComponent,
  NgxMatColorPickerContentComponent,
  NgxMatColorPickerInput, NgxMatColorSliderComponent,
  NgxMatColorToggleComponent,
  NgxMatColorpickerToggleIcon
} from '@ngxmc/color-picker';
import { NumericColorInputDirective } from '@ngxmc/color-picker';
import { ColorAdapter } from '@ngxmc/color-picker';

@NgModule({
  declarations: [

  ],
  imports: [
    NgxMatColorPaletteComponent,
    NgxMatColorCanvasComponent,
    NgxMatColorCollectionComponent,
    NgxMatColorSliderComponent,
    NumericColorInputDirective,
    NgxMatColorPickerContentComponent,
    NgxMatColorPickerComponent,
    NgxMatColorToggleComponent,
    NgxMatColorpickerToggleIcon,
    NgxMatColorPickerInput,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    PortalModule,
    MatIconModule
  ],
  exports: [
    NgxMatColorToggleComponent,
    NgxMatColorPickerInput,
    NgxMatColorPickerComponent,
    NgxMatColorpickerToggleIcon
  ],
  providers: [
    ColorAdapter,
    NGX_MAT_COLOR_PICKER_SCROLL_STRATEGY_FACTORY_PROVIDER
  ]
})
export class NgxMatColorPickerModule { }
