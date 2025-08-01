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
  DataFieldInfoModel, ErrorExceptionResult,
  FormInfoModel, InfoEnumModel
} from 'ntk-cms-api';
import { NodeInterface, TreeModel } from 'ntk-cms-filemanager';
import { AddBaseComponent } from 'src/app/core/cmsComponent/addBaseComponent';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { PoinModel } from 'src/app/core/models/pointModel';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
@Component({
    selector: 'app-aplication-intro-add',
    templateUrl: './add.component.html',
    standalone: false
})
export class ApplicationAppAddComponent extends AddBaseComponent<ApplicationAppService, ApplicationAppModel, number> implements OnInit {
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private activatedRoute: ActivatedRoute,
    public coreEnumService: CoreEnumService,
    public applicationEnumService: ApplicationEnumService,
    private applicationAppService: ApplicationAppService,
    private cmsToastrService: CmsToastrService,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
    private router: Router,
    public publicHelper: PublicHelper,) {
    super(applicationAppService, new ApplicationAppModel(), publicHelper, translate);
    this.publicHelper.processService.cdr = this.cdr;

    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
  }
  requestSourceId = 0;
  @ViewChild('vform', { static: false }) formGroup: FormGroup;
  formInfo: FormInfoModel = new FormInfoModel();
  dataAccessModel: AccessModel;
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<string, DataFieldInfoModel>();
  dataModel = new ApplicationAppModel();
  dataModelResult: ErrorExceptionResult<ApplicationAppModel> = new ErrorExceptionResult<ApplicationAppModel>();

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
    this.requestSourceId = + Number(this.activatedRoute.snapshot.paramMap.get('SourceId'));

    this.dataModel.linkSourceId = this.requestSourceId;
    this.DataGetAccess();

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
    this.DataAddContent();
  }
  DataAddContent(): void {
    this.formInfo.formSubmitAllow = false;
    this.translate.get('MESSAGE.sending_information_to_the_server').subscribe((str: string) => { this.formInfo.formAlert = str; });
    this.formInfo.formError = '';
    const pName = this.constructor.name + 'setAccessLoad';
    this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });
    this.applicationAppService.setAccessLoad();
    this.applicationAppService
      .ServiceAdd(this.dataModel)
      .subscribe({
        next: (ret) => {
          this.formInfo.formSubmitAllow = !ret.isSuccess;
          this.dataModelResult = ret;
          if (ret.isSuccess) {
            this.translate.get('MESSAGE.registration_completed_successfully').subscribe((str: string) => { this.formInfo.formAlert = str; });
            this.cmsToastrService.typeSuccessAdd();
            setTimeout(() => this.router.navigate(['/application/app/']), 1000);
          } else {
            this.cmsToastrService.typeErrorAdd(ret.errorMessage);
          }
          this.publicHelper.processService.processStop(pName);
        },
        error: (er) => {
          this.formInfo.formSubmitAllow = true;
          this.cmsToastrService.typeErrorAdd(er);
          this.publicHelper.processService.processStop(pName, false);
        }
      }
      );
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
      this.translate.get(['MESSAGE.The_source_of_the_information_application_is_not_known', 'MESSAGE.Specify_the_source']).subscribe((str: any) => {
        this.cmsToastrService.typeErrorMessage(str['MESSAGE.The_source_of_the_information_application_is_not_known'], str['MESSAGE.Specify_the_source']);
      });
      return;
    }
    this.dataModel.linkSourceId = model.id;
  }
  onActionSelectTheme(model: ApplicationThemeConfigModel | null): void {
    if (!model || model.id <= 0) {
      this.translate.get(['MESSAGE.Information_application_format_is_not_clear', 'MESSAGE.Specify_the_template']).subscribe((str: any) => {
        this.cmsToastrService.typeErrorMessage(str['MESSAGE.Information_application_format_is_not_clear'], str['MESSAGE.Specify_the_template']);
      });
      return;
    }
    this.dataModel.linkThemeConfigId = model.id;
  }
}
