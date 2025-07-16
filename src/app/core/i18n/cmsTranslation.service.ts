// Localization is based on '@ngx-translate/core';
// Please be familiar with official documentations first => https://github.com/ngx-translate/core

import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, firstValueFrom } from 'rxjs';

export interface Locale {
  lang: string;
  data: any;
}

const LOCALIZATION_LOCAL_STORAGE_KEY = 'language';

// @Injectable({
//   providedIn: 'root',
// })
@Injectable()
export class CmsTranslationService {
  // Private properties
  private langIds: any = [];

  constructor(public translate: TranslateService) {
    const langToSet = localStorage.getItem(LOCALIZATION_LOCAL_STORAGE_KEY) || this.translate.getDefaultLang()||"en";
    
    // add new langIds to the list
    translate.addLangs([langToSet]);
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang(langToSet);
  }
  

  loadTranslations(...args: Locale[]): void {
    const locales = [...args];

    locales.forEach((locale) => {
      // use setTranslation() with the third argument set to true
      // to append translations instead of replacing them
      this.translate.setTranslation(locale.lang, locale.data, true);

      this.langIds.push(locale.lang);
    });

    // add new languages to the list
    this.translate.addLangs(this.langIds);
    this.translate.use(this.getSelectedLanguage());//در قالب جدید از روی قالب جدید اضافه کردم
  }
  
  setLanguage(lang: string): void {
    if (lang && lang.length > 0) {
      const langToSet = localStorage.getItem(LOCALIZATION_LOCAL_STORAGE_KEY) || this.translate?.getDefaultLang() || 'fa';
      firstValueFrom(this.translate.use(langToSet));
      if (langToSet !== lang)
        firstValueFrom(this.translate.use(lang));
      localStorage.setItem(LOCALIZATION_LOCAL_STORAGE_KEY, lang);
    }
  }
  
  instantDefault(key: string | Array<string>, interpolateParams?: Object): string | any {
    return this.translate.instant(key);
  }

  instant(key: string | Array<string>, interpolateParams?: Object): string | any {
    return this.translate.instant(key);
  }

  get(key: string | Array<string>, interpolateParams?: Object): Observable<string | any> {
    return this.translate.get(key);
  }



  /**
   * Returns selected language
   */
  getSelectedLanguage(): string {
    return (
      localStorage.getItem(LOCALIZATION_LOCAL_STORAGE_KEY) ||      this.translate.getDefaultLang()||"en"
    );
  }
}
function resolve(text: string): void {
  throw new Error('Function not implemented.');
}

