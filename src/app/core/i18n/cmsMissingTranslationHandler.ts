import { Injectable } from "@angular/core";
import {
  MissingTranslationHandler,
  MissingTranslationHandlerParams,
} from "@ngx-translate/core";

@Injectable()
export class CmsMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    if (
      params.key.indexOf("filemanager.") < 0 &&
      params.key.indexOf("CRON.") < 0 &&
      params.key.indexOf("querybuilder.") < 0
    )
      console.log(`|${params.translateService.currentLang}:?${params.key}?|`);
    return `|?${params.key}?|`;
  }
}
