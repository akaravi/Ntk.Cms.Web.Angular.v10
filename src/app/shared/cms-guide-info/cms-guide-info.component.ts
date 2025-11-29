import { Component, Input, OnDestroy, OnInit } from "@angular/core";

import { CoreGuideService, TokenInfoModelV3 } from "ntk-cms-api";
import { Subscription } from "rxjs";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-cms-guide-info",
  templateUrl: "./cms-guide-info.component.html",
  standalone: false,
})
export class CmsGuideinfoComponent implements OnInit, OnDestroy {
  static nextId = 0;
  id = ++CmsGuideinfoComponent.nextId;
  @Input() Identity: number;
  @Input() Key: string;
  @Input() title: string;
  description: string;
  body: string;
  @Input() btnOkText: string;
  show = true;
  constructor(
    private tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
    private coreGuideService: CoreGuideService,
    private cmsToastrService: CmsToastrService,
  ) {}
  closeResult = "";
  private unsubscribe: Subscription[] = [];
  tokenInfo = new TokenInfoModelV3();
  lang = "";
  ngOnInit(): void {
    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;
    if (this.tokenInfo) {
      this.lang = this.tokenInfo.access.language;
    }
    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.tokenInfoStore)
        .subscribe(async (value) => {
          if (value && value.access) this.lang = value.access.language;
        }),
    );
  }
  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }
  }
  onActionGuideClick(content): void {
    if (this.Identity > 0) {
      this.coreGuideService.ServiceGetOneById(this.Identity).subscribe({
        next: (ret) => {
          if (ret.isSuccess) {
            switch (this.lang) {
              case "fa": {
                this.title = ret.item.titleFa;
                this.description = ret.item.descriptionFa;
                this.body = ret.item.bodyFa;
                break;
              }
              case "en": {
                this.title = ret.item.titleEn;
                this.description = ret.item.descriptionEn;
                this.body = ret.item.bodyEn;
                break;
              }
              case "ar": {
                this.title = ret.item.titleAr;
                this.description = ret.item.descriptionAr;
                this.body = ret.item.bodyAr;
                break;
              }
              case "de": {
                this.title = ret.item.titleDe;
                this.description = ret.item.descriptionDe;
                this.body = ret.item.bodyDe;
                break;
              }
              default: {
                this.title = ret.item.titleFa;
                this.description = ret.item.descriptionFa;
                this.body = ret.item.bodyFa;
                break;
              }
            }
            this.openModal(content);
          } else if (!environment.production) {
            console.log(ret.errorMessage, this.Key);
            this.cmsToastrService.typeWarningMessage(
              ret.errorMessage,
              this.Key + " راهنما یافت نشد ",
            );
          }
        },
        error: (err) => {
          this.cmsToastrService.typeError(err);
        },
      });
    } else if (this.Key && this.Key.length > 0) {
      this.coreGuideService.ServiceGetOneByKey(this.Key).subscribe({
        next: (ret) => {
          if (ret.isSuccess) {
            switch (this.lang) {
              case "fa": {
                this.title = ret.item.titleFa;
                this.description = ret.item.descriptionFa;
                this.body = ret.item.bodyFa;
                break;
              }
              case "en": {
                this.title = ret.item.titleEn;
                this.description = ret.item.descriptionEn;
                this.body = ret.item.bodyEn;
                break;
              }
              case "ar": {
                this.title = ret.item.titleAr;
                this.description = ret.item.descriptionAr;
                this.body = ret.item.bodyAr;
                break;
              }
              case "de": {
                this.title = ret.item.titleDe;
                this.description = ret.item.descriptionDe;
                this.body = ret.item.bodyDe;
                break;
              }
              default: {
                this.title = ret.item.titleFa;
                this.description = ret.item.descriptionFa;
                this.body = ret.item.bodyFa;
                break;
              }
            }
            this.openModal(content);
          } else if (!environment.production) {
            console.log(ret.errorMessage, this.Key);
            this.cmsToastrService.typeWarningMessage(
              ret.errorMessage,
              this.Key + " راهنما یافت نشد ",
            );
          }
        },
        error: (err) => {
          this.cmsToastrService.typeError(err);
        },
      });
    } else if (this.description && this.description.length > 0) {
      this.openModal(content);
    }
  }
  openModal(content): void {
    //karavi error on angular 18//
    // this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
  }
  private getDismissReason(reason: any): string {
    //karavi error on angular 18//
    // if (reason === ModalDismissReasons.ESC) {
    //   return 'by pressing ESC';
    // } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    //   return 'by clicking on a backdrop';
    // } else {
    //   return `with: ${reason}`;
    // }
    return "";
  }
}
