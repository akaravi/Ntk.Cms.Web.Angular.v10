import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FilePickerModule } from "ngx-ntk-file-picker";
import { CmsFileUploaderComponent } from "./cms-file-uploader.component";

@NgModule({
  declarations: [CmsFileUploaderComponent],
  exports: [CmsFileUploaderComponent],
  imports: [CommonModule, FilePickerModule],
  providers: [],
})
export class CmsFileUploaderModule {}
