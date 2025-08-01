import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as Leaflet from 'leaflet';
import { Map as leafletMap } from 'leaflet';
import {
  AccessModel, ApplicationAppModel,
  ApplicationAppService, ApplicationEnumService, ApplicationSourceModel, ApplicationThemeConfigModel, CoreEnumService,
  ErrorExceptionResult,
  ErrorExceptionResultBase,
  FormInfoModel, InfoEnumModel, ManageUserAccessDataTypesEnum
} from 'ntk-cms-api';
import { NodeInterface, TreeModel } from 'ntk-cms-filemanager';
import { EditBaseComponent } from 'src/app/core/cmsComponent/editBaseComponent';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { PoinModel } from 'src/app/core/models/pointModel';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
import { CmsMapComponent } from 'src/app/shared/cms-map/cms-map.component';
@Component({
    selector: 'app-aplication-app-edit',
    templateUrl: './edit.component.html',
    standalone: false
})
export class ApplicationAppEditComponent extends EditBaseComponent<ApplicationAppService, ApplicationAppModel, number>
  implements OnInit {
  requestId = 0;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    public contentService: ApplicationAppService,
    private activatedRoute: ActivatedRoute,
    public publicHelper: PublicHelper,
    public coreEnumService: CoreEnumService,
    public applicationEnumService: ApplicationEnumService,
    private applicationAppService: ApplicationAppService,
    private cmsToastrService: CmsToastrService,
    public translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private router: Router) {
    super(contentService, new ApplicationAppModel(), publicHelper, translate);
    this.publicHelper.processService.cdr = this.cdr;

    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
  }
  @ViewChild('vform', { static: false }) formGroup: FormGroup;
  @ViewChild(CmsMapComponent) childMap: CmsMapComponent;

  formInfo: FormInfoModel = new FormInfoModel();
  dataAccessModel: AccessModel;

  dataModel = new ApplicationAppModel();
  dataModelResult: ErrorExceptionResultBase = new ErrorExceptionResultBase();

  dataModelEnumLangResult: ErrorExceptionResult<InfoEnumModel> = new ErrorExceptionResult<InfoEnumModel>();
  selectFileTypeMainImage = ['jpg', 'jpeg', 'png'];
  fileManagerOpenFormAboutUsLinkImageId = false;
  fileManagerOpenFormLinkFileIdIcon = false;
  fileManagerOpenFormLinkFileIdLogo = false;
  fileManagerOpenFormLinkFileIdSplashScreen = false;
  fileManagerOpenFormLinkMainImageId = false;
  appLanguage = 'fa';
  fileManagerTree: TreeModel;
  mapMarker: any;
  private mapModel: leafletMap;
  private mapMarkerPoints: Array<PoinModel> = [];
  mapOptonCenter = new PoinModel();
  ngOnInit(): void {
    this.requestId = + Number(this.activatedRoute.snapshot.paramMap.get('Id'));
    if (!this.requestId || this.requestId === 0) {
      this.cmsToastrService.typeErrorAddRowParentIsNull();
      return;
    }
    this.DataGetOne(this.requestId);

    this.getEnumLang();
  }
  getEnumLang(): void {
    this.coreEnumService.ServiceLanguageEnum().subscribe((res) => {
      this.dataModelEnumLangResult = res;
    });
  }

  onFormSubmit(): void {
    if (!this.formGroup.valid) {
      this.cmsToastrService.typeErrorFormInvalid();
      return;
    }
    if (this.dataModel.linkSourceId <= 0) {
      this.translate.get('MESSAGE.Specify_the_source_code_of_the_program').subscribe((str: string) => {
        this.cmsToastrService.typeErrorAdd(str);
      });
      return;
    }
    if (this.dataModel.linkThemeConfigId <= 0) {
      this.translate.get('MESSAGE.Specify_the_application_format').subscribe((str: string) => {
        this.cmsToastrService.typeErrorAdd(str);
      });
      return;
    }
    this.DataEditContent();
  }
  DataGetOne(requestId: number): void {
    this.formInfo.formSubmitAllow = false;
    this.translate.get('MESSAGE.get_information_from_the_server').subscribe((str: string) => { this.formInfo.formAlert = str; });
    this.formInfo.formError = '';
    const pName = this.constructor.name + 'ServiceGetOneById';

    this.translate.get('MESSAGE.get_information_from_the_server').subscribe((str: string) => { this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId); });
    /*َAccess Field*/
    this.applicationAppService.setAccessLoad();
    this.applicationAppService.setAccessDataType(ManageUserAccessDataTypesEnum.Editor);
    this.applicationAppService
      .ServiceGetOneById(requestId)
      .subscribe({
        next: (ret) => {
          /*َAccess Field*/
          this.dataAccessModel = ret.access;
          this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
          this.dataModelResult = ret;
          this.formInfo.formSubmitAllow = true;
          if (ret.isSuccess) {
            this.dataModel = ret.item;
            this.checkIsNull(this.dataModel);
            const lat = this.dataModel.aboutUsGeolocationlatitude;
            const lon = this.dataModel.aboutUsGeolocationlongitude;
            if (lat > 0 && lon > 0) {
              this.mapMarkerPoints = [];
              this.mapMarkerPoints.push({ lat, lon });
              this.receiveMap();
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
    this.formInfo.formSubmitAllow = false;
    this.translate.get('MESSAGE.sending_information_to_the_server').subscribe((str: string) => { this.formInfo.formAlert = str; });
    this.formInfo.formError = '';
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.sending_information_to_the_server').subscribe((str: string) => { this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId); });
    this.applicationAppService
      .ServiceEdit(this.dataModel)
      .subscribe({
        next: (ret) => {
          this.formInfo.formSubmitAllow = !ret.isSuccess;
          this.dataModelResult = ret;
          if (ret.isSuccess) {
            this.translate.get('MESSAGE.registration_completed_successfully').subscribe((str: string) => { this.formInfo.formAlert = str; });
            this.cmsToastrService.typeSuccessEdit();
            setTimeout(() => this.router.navigate(['/application/app/']), 1000);
          } else {
            this.cmsToastrService.typeErrorEdit(ret.errorMessage);
          }
          this.publicHelper.processService.processStop(pName);
        },
        error: (er) => {
          this.formInfo.formSubmitAllow = true;
          this.cmsToastrService.typeError(er);
          this.publicHelper.processService.processStop(pName, false);
        }
      }
      );
  }
  checkIsNull(dataModel: ApplicationAppModel): void {
    if (this.dataModel.configBuilderAdminJsonValues == 'null')
      this.dataModel.configBuilderAdminJsonValues = '';
    if (this.dataModel.configRuntimeAdminJsonValues == 'null')
      this.dataModel.configRuntimeAdminJsonValues = '';
    if (this.dataModel.configBuilderSiteJsonValues == 'null')
      this.dataModel.configBuilderSiteJsonValues = '';
    if (this.dataModel.configRuntimeSiteJsonValues == 'null')
      this.dataModel.configRuntimeSiteJsonValues = '';
  }
  onStepClick(event: StepperSelectionEvent, stepper: MatStepper): void {
    if (event.previouslySelectedIndex < event.selectedIndex) {

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
    this.router.navigate(['/application/app/']);
  }
  onActionFileSelectedLinkMainImageId(model: NodeInterface): void {
    this.dataModel.linkMainImageId = model.id;
    this.dataModel.linkMainImageIdSrc = model.downloadLinksrc;
  }
  onActionFileSelectedLinkFileIdIcon(model: NodeInterface): void {
    this.dataModel.linkFileIdIcon = model.id;
    this.dataModel.linkFileIdIconSrc = model.downloadLinksrc;
  }
  onActionFileSelectedLinkFileIdLogo(model: NodeInterface): void {
    this.dataModel.linkFileIdLogo = model.id;
    this.dataModel.linkFileIdLogoSrc = model.downloadLinksrc;
  }
  onActionFileSelectedLinkFileIdSplashScreen(model: NodeInterface): void {
    this.dataModel.linkFileIdSplashScreen = model.id;
    this.dataModel.linkFileIdSplashScreenSrc = model.downloadLinksrc;
  }
  onActionFileSelectedAboutUsLinkImageId(model: NodeInterface): void {
    this.dataModel.aboutUsLinkImageId = model.id;
    this.dataModel.aboutUsLinkImageIdSrc = model.downloadLinksrc;
  }
  onActionSelectSource(model: ApplicationSourceModel | null): void {
    if (!model || model.id <= 0) {
      this.translate.get(['MESSAGE.Specify_the_source', 'MESSAGE.The_source_of_the_information_application_is_not_known']).subscribe((str: any) => {
        this.cmsToastrService.typeErrorMessage(str['MESSAGE.Specify_the_source'], str['MESSAGE.The_source_of_the_information_application_is_not_known']);
      });
      return;
    }
    if (this.dataModel.linkSourceId !== model.id) {
      this.translate.get(['MESSAGE.The_source_can_not_changed', 'MESSAGE.Application_source_cannot_be_changed_in_editing_mode']).subscribe((str: any) => {
        this.cmsToastrService.typeErrorMessage(str['MESSAGE.The_source_can_not_changed'], str['MESSAGE.Application_source_cannot_be_changed_in_editing_mode']);
      });
    }
  }
  onActionSelectTheme(model: ApplicationThemeConfigModel | null): void {
    if (!model || model.id <= 0) {
      this.translate.get(['MESSAGE.Specify_the_template', 'MESSAGE.Information_application_format_is_not_clear']).subscribe((str: any) => {
        this.cmsToastrService.typeErrorMessage(str['MESSAGE.Specify_the_template'], str['MESSAGE.Information_application_format_is_not_clear']);
      });
      return;
    }
    this.dataModel.linkThemeConfigId = model.id;
  }
  ActionCurrentPoint(): void {
    this.childMap.getPosition().then(pos => {
      const lat = pos.lat;
      const lon = pos.lon;
      if (lat > 0 && lon > 0) {
        if (this.mapMarker !== undefined) {
          this.mapModel.removeLayer(this.mapMarker);
        }
        this.mapMarkerPoints = [];
        this.mapMarkerPoints.push({ lat, lon });
        this.dataModel.aboutUsGeolocationlatitude = lat;
        this.dataModel.aboutUsGeolocationlongitude = lon;
        this.receiveMap();
      }
    });
  }
}
