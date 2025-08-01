
import { ENTER } from '@angular/cdk/keycodes';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as Leaflet from 'leaflet';
import { Map as leafletMap } from 'leaflet';
import {
  AccessModel, CoreEnumService, CoreSiteCategoryModel, CoreSiteModel,
  CoreSiteService, CoreUserModel,
  ErrorExceptionResult,
  ErrorExceptionResultBase,
  FormInfoModel, InfoEnumModel, ManageUserAccessDataTypesEnum
} from 'ntk-cms-api';
import { NodeInterface, TreeModel } from 'ntk-cms-filemanager';
import { Subscription } from 'rxjs';
import { EditBaseComponent } from 'src/app/core/cmsComponent/editBaseComponent';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { PoinModel } from 'src/app/core/models/pointModel';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
import { CmsStoreService } from 'src/app/core/reducers/cmsStore.service';


@Component({
  selector: 'app-core-site-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  standalone: false
})
export class CoreSiteEditComponent extends EditBaseComponent<CoreSiteService, CoreSiteModel, number>
  implements OnInit, OnDestroy {
  requestId = 0;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private activatedRoute: ActivatedRoute,
    public publicHelper: PublicHelper,
    public coreEnumService: CoreEnumService,
    private coreSiteService: CoreSiteService,
    private cmsToastrService: CmsToastrService,
    private cmsStoreService:CmsStoreService,
    private router: Router,
    public translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private tokenHelper: TokenHelper
  ) {
    super(coreSiteService, new CoreSiteModel(), publicHelper, translate);

    this.publicHelper.processService.cdr = this.cdr;

    this.requestId = + Number(this.activatedRoute.snapshot.paramMap.get('Id'));
    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;
    if (this.tokenInfo) {
      if (this.requestId > 0) {
        this.DataGetOne(this.requestId);
      } else {
        this.DataGetOne(this.tokenInfo.access.siteId);
      }
    }
    this.cmsStoreService.getState((state) => state.tokenInfoStore).subscribe(async (value) => {
        this.tokenInfo = value;
        if (this.requestId > 0) {
          this.DataGetOne(this.requestId);
        } else {
          this.DataGetOne(this.tokenInfo.access.siteId);
        }
    });
  }
  @ViewChild('vform', { static: false }) formGroup: FormGroup;

  formInfo: FormInfoModel = new FormInfoModel();
  dataAccessModel: AccessModel;

  dataModel = new CoreSiteModel();
  dataModelResult: ErrorExceptionResultBase = new ErrorExceptionResultBase();

  dataModelEnumSiteStatusResult: ErrorExceptionResult<InfoEnumModel> = new ErrorExceptionResult<InfoEnumModel>();
  dataModelEnumLanguageResult: ErrorExceptionResult<InfoEnumModel> = new ErrorExceptionResult<InfoEnumModel>();
  selectFileTypeMainImage = ['jpg', 'jpeg', 'png'];
  fileManagerOpenFormAboutUsLinkImageId = false;
  fileManagerOpenFormLinkFavIconId = false;
  fileManagerOpenFormPwaIconSize72x72Id = false;
  fileManagerOpenFormPwaIconSize192x192Id = false;
  fileManagerOpenFormPwaIconSize384x384Id = false;
  fileManagerOpenFormPwaIconSize512x512Id = false;
  fileManagerOpenFormLinkFileIdLogo = false;
  fileManagerOpenFormLinkImageLogoId = false;
  appLanguage = 'fa';

  cmsApiStoreSubscribe: Subscription;
  fileManagerTree: TreeModel;
  mapMarker: any;
  private mapModel: leafletMap;
  private mapMarkerPoints: Array<PoinModel> = [];
  mapOptonCenter = new PoinModel();
  keywordDataModel = [];
  ngOnInit(): void {

    this.getEnumSiteStatus();
    this.getEnumLanguage();

  }
  ngOnDestroy() {
    if (this.cmsApiStoreSubscribe) {
      this.cmsApiStoreSubscribe.unsubscribe();
    }
  }
  getEnumSiteStatus(): void {
    this.coreEnumService.ServiceSiteStatusEnum().subscribe({
      next: (ret) => {
        this.dataModelEnumSiteStatusResult = ret;
      }
    });
  }
  getEnumLanguage(): void {
    this.coreEnumService.ServiceLanguageEnum().subscribe({
      next: (ret) => {
        this.dataModelEnumLanguageResult = ret;
      }
    });
  }


  onFormSubmit(): void {
    if (!this.formGroup.valid) {
      this.cmsToastrService.typeErrorFormInvalid();
      return;
    }
    if (this.dataModel.linkSiteCategoryId <= 0) {
      this.translate.get('MESSAGE.Specify_the_source_code_of_the_program').subscribe((str: string) => {
        this.cmsToastrService.typeErrorEdit(str);
      });

      return;
    }
    this.dataModel.seoKeyword = '';
    if (this.keywordDataModel && this.keywordDataModel.length > 0) {
      const listKeyword = [];
      this.keywordDataModel.forEach(element => {
        if (element.display) {
          listKeyword.push(element.display);
        } else {
          listKeyword.push(element);
        }
      });
      if (listKeyword && listKeyword.length > 0) {
        this.dataModel.seoKeyword = listKeyword.join(',');
      }
    }
    this.DataEditContent();
  }
  DataGetOne(id: number): void {
    if (!id || id <= 0)
      return;
    this.formInfo.formSubmitAllow = false;
    this.translate.get('MESSAGE.get_information_from_the_server').subscribe((str: string) => { this.formInfo.formAlert = str; });
    this.formInfo.formError = '';
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });
    /*َAccess Field*/
    this.coreSiteService.setAccessLoad();
    this.coreSiteService.setAccessDataType(ManageUserAccessDataTypesEnum.Editor);
    this.coreSiteService
      .ServiceGetOneById(id)
      .subscribe({
        next: (ret) => {
          /*َAccess Field*/
          this.dataAccessModel = ret.access;
          this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
          this.dataModelResult = ret;
          this.formInfo.formSubmitAllow = true;
          if (ret.isSuccess) {
            this.dataModel = ret.item;
            const lat = this.dataModel.aboutUsGeolocationlatitude;
            const lon = this.dataModel.aboutUsGeolocationlongitude;
            if (lat > 0 && lon > 0) {
              this.mapMarkerPoints = [];
              this.mapMarkerPoints.push({ lat, lon });
              this.receiveMap();
            }
            this.keywordDataModel = [];
            if (this.dataModel.seoKeyword && this.dataModel.seoKeyword.length > 0) {
              this.keywordDataModel = this.dataModel.seoKeyword.split(',');
            }
          } else {
            this.cmsToastrService.typeErrorGetOne(ret.errorMessage);
          }
          this.publicHelper.processService.processStop(pName);
        },
        error: (er) => {
          this.formInfo.formSubmitAllow = true;
          this.cmsToastrService.typeErrorGetOne(er);
          this.publicHelper.processService.processStop(pName, false);
        }
      }
      );
  }
  DataEditContent(): void {
    //! for convert color to hex
    this.dataModel.pwaThemeColor = this.dataModel.pwaThemeColor?.toString();
    //! for convert color to hex
    this.dataModel.pwaThemeBackgroundColor = this.dataModel.pwaThemeBackgroundColor?.toString();
    this.formInfo.formSubmitAllow = false;
    this.translate.get('MESSAGE.sending_information_to_the_server').subscribe((str: string) => { this.formInfo.formAlert = str; });
    this.formInfo.formError = '';
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.sending_information_to_the_server').subscribe((str: string) => { this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId); });
    this.coreSiteService
      .ServiceEdit(this.dataModel)
      .subscribe({
        next: (ret) => {
          this.formInfo.formSubmitAllow = !ret.isSuccess;
          this.dataModelResult = ret;
          if (ret.isSuccess) {
            this.translate.get('MESSAGE.registration_completed_successfully').subscribe((str: string) => { this.formInfo.formAlert = str; });
            this.cmsToastrService.typeSuccessEdit();
            this.formInfo.formSubmitAllow = true;
          } else {
            this.cmsToastrService.typeErrorEdit(ret.errorMessage);
          }
          this.publicHelper.processService.processStop(pName);
        },
        error: (er) => {
          this.publicHelper.processService.processStop(pName);
          this.formInfo.formSubmitAllow = true;
          this.cmsToastrService.typeError(er);;
        }
      }
      );
  }
  onStepClick(event: StepperSelectionEvent, stepper: MatStepper): void {
    if (event.previouslySelectedIndex < event.selectedIndex) {
      // if (!this.formGroup.valid) {
      //   this.cmsToastrService.typeErrorFormInvalid();
      //   setTimeout(() => {
      //     stepper.selectedIndex = event.previouslySelectedIndex;
      //     // stepper.previous();
      //   }, 10);
      // }
    }
  }
  receiveMap(model: leafletMap = this.mapModel): void {
    if (!model) {
      return;
    }
    this.mapModel = model;
    if (this.mapMarkerPoints && this.mapMarkerPoints.length > 0) {
      this.mapMarkerPoints.forEach(item => {
        this.mapMarker = Leaflet.marker([item.lat, item.lon]).addTo(this.mapModel);
      });
      this.mapOptonCenter = this.mapMarkerPoints[0];
      this.mapMarkerPoints = [];
    }
    this.mapModel.on('click', (e) => {
      // @ts-ignore
      const lat = e.latlng.lat;
      // @ts-ignore
      const lon = e.latlng.lng;
      if (this.mapMarker !== undefined) {
        this.mapModel.removeLayer(this.mapMarker);
      }
      if (lat === this.dataModel.aboutUsGeolocationlatitude && lon === this.dataModel.aboutUsGeolocationlongitude) {
        this.dataModel.aboutUsGeolocationlatitude = null;
        this.dataModel.aboutUsGeolocationlongitude = null;
        return;
      }
      this.mapMarker = Leaflet.marker([lat, lon]).addTo(this.mapModel);
      this.dataModel.aboutUsGeolocationlatitude = lat;
      this.dataModel.aboutUsGeolocationlongitude = lon;
    });
  }
  onActionBackToParent(): void {
    this.router.navigate(['/core/site/']);
  }
  onActionFileSelectedAboutUsLinkImageId(model: NodeInterface): void {
    this.dataModel.aboutUsLinkImageId = model.id;
    this.dataModel.aboutUsLinkImageIdSrc = model.downloadLinksrc;
  }
  onActionFileSelectedLinkFavIconId(model: NodeInterface): void {
    this.dataModel.linkFavIconId = model.id;
    this.dataModel.linkFavIconIdSrc = model.downloadLinksrc;
  }
  onActionFileSelectedPwaIconSize72x72Id(model: NodeInterface): void {
    this.dataModel.pwaIconSize72x72Id = model.id;
    this.dataModel.pwaIconSize72x72IdSrc = model.downloadLinksrc;
  }
  onActionFileSelectedPwaIconSize192x192Id(model: NodeInterface): void {
    this.dataModel.pwaIconSize192x192Id = model.id;
    this.dataModel.pwaIconSize192x192IdSrc = model.downloadLinksrc;
  }
  onActionFileSelectedPwaIconSize384x384Id(model: NodeInterface): void {
    this.dataModel.pwaIconSize384x384Id = model.id;
    this.dataModel.pwaIconSize384x384IdSrc = model.downloadLinksrc;
  }
  onActionFileSelectedPwaIconSize512x512Id(model: NodeInterface): void {
    this.dataModel.pwaIconSize512x512Id = model.id;
    this.dataModel.pwaIconSize512x512IdSrc = model.downloadLinksrc;
  }
  onActionFileSelectedLinkImageLogoId(model: NodeInterface): void {
    this.dataModel.linkImageLogoId = model.id;
    this.dataModel.linkImageLogoIdSrc = model.downloadLinksrc;
  }
  onActionSelectCategory(model: CoreSiteCategoryModel | null): void {
    if (!model || model.id <= 0) {
      this.translate.get('MESSAGE.category_of_site_is_not_clear').subscribe((str: string) => {
        this.cmsToastrService.typeErrorSelected(str);
      });
      return;
    }
    this.dataModel.linkSiteCategoryId = model.id;
  }
  onActionSelectCreatedBy(model: CoreSiteModel | null): void {
    if (!model || model.id <= 0) {
      this.translate.get('MESSAGE.category_of_site_is_not_clear').subscribe((str: string) => {
        this.cmsToastrService.typeErrorSelected(str);
      });
      return;
    }
    this.dataModel.linkCreatedBySiteId = model.id;
  }
  onActionSelectorLinkResellerSiteIdSelect(model: CoreSiteModel | null): void {
    this.dataModel.linkResellerSiteId = null;
    if (!model || model.id <= 0) {
      return;
    }
    this.dataModel.linkResellerSiteId = model.id;
  }
  onActionSelectorLinkResellerUserIdSelect(model: CoreUserModel | null): void {
    this.dataModel.linkResellerUserId = null;
    if (!model || model.id <= 0) {
      return;
    }
    this.dataModel.linkResellerUserId = model.id;
  }
  /**
  * tag
  */
  addOnBlurTag = true;
  readonly separatorKeysCodes = [ENTER] as const;
  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our item
    if (value) {
      this.keywordDataModel.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  removeTag(item: string): void {
    const index = this.keywordDataModel.indexOf(item);

    if (index >= 0) {
      this.keywordDataModel.splice(index, 1);
    }
  }
  /**
   * tag
   */
}
