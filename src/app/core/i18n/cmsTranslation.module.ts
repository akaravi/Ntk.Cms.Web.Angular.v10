import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CmsTranslationService } from './cmsTranslation.service';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CmsMissingTranslationHandler } from './cmsMissingTranslationHandler';
// Required for AOT compilation
export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}
@NgModule({
  imports: [CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient]
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: CmsMissingTranslationHandler,
      },
    }),],
  exports: [TranslateModule],
  providers: [CmsTranslationService, CmsMissingTranslationHandler],
})
export class CmsTranslateModule { }
