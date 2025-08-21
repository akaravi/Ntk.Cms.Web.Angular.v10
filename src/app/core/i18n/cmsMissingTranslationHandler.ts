import { Injectable } from "@angular/core";
import {
  MissingTranslationHandler,
  MissingTranslationHandlerParams,
} from "@ngx-translate/core";

@Injectable()
export class CmsMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    console.log(`|${params.translateService.currentLang}:?${params.key}?|`);
    return `|?${params.key}?|`;
  }
}
