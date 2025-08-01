import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  AccessModel, ChartConfigurationService,
  ChartModuleConfigSiteAccessValuesModel,
  ChartModuleConfigSiteValuesModel,
  ChartModuleSiteStorageValuesModel, CoreEnumService,
  DataFieldInfoModel,
  FormInfoModel,
  TokenInfoModelV3
} from 'ntk-cms-api';
import { TreeModel } from 'ntk-cms-filemanager';
import { Subscription } from 'rxjs';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { PoinModel } from 'src/app/core/models/pointModel';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
import { CmsStoreService } from 'src/app/core/reducers/cmsStore.service';



@Component({
  selector: 'app-chart-config-site',
  templateUrl: './config-site.component.html',
  standalone: false
})
export class ChartConfigSiteComponent implements OnInit, OnDestroy {

  requestLinkSiteId = 0;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private configService: ChartConfigurationService,
    private tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
    public publicHelper: PublicHelper,
    public coreEnumService: CoreEnumService,
    private cmsToastrService: CmsToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;

    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
  }
  dataSiteStorageModel = new ChartModuleSiteStorageValuesModel();
  dataConfigSiteValuesModel = new ChartModuleConfigSiteValuesModel();
  dataConfigSiteAccessValuesModel = new ChartModuleConfigSiteAccessValuesModel();
  tokenInfo = new TokenInfoModelV3();

  @ViewChild('vform', { static: false }) formGroup: FormGroup;

  formInfo: FormInfoModel = new FormInfoModel();
  dataAccessModel: AccessModel;
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<string, DataFieldInfoModel>();


  selectFileTypeMainImage = ['jpg', 'jpeg', 'png'];
  fileManagerOpenForm = false;
  appLanguage = 'fa';

  fileManagerTree: TreeModel;
  mapMarker: any;
  mapOptonCenter = new PoinModel();

  cmsApiStoreSubscribe: Subscription;


  ngOnInit(): void {
    this.requestLinkSiteId = + Number(this.activatedRoute.snapshot.paramMap.get('LinkSiteId'));
    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;
    if (this.tokenInfo) {
      this.onLoadDate();
    }

    this.cmsApiStoreSubscribe = this.cmsStoreService.getState((state) => state.tokenInfoStore).subscribe(async (value) => {
      this.tokenInfo = value;
      this.onLoadDate();
    });


  }
  ngOnDestroy(): void {
    if (this.cmsApiStoreSubscribe) {
      this.cmsApiStoreSubscribe.unsubscribe();
    }
  }
  onLoadDate(): void {
    if (!this.requestLinkSiteId || this.requestLinkSiteId === 0) {
      this.requestLinkSiteId = this.tokenInfo.access.siteId;
    }

    if (this.requestLinkSiteId > 0) {
      this.GetServiceSiteStorage(this.requestLinkSiteId);
      this.GetServiceSiteConfig(this.requestLinkSiteId);
      this.GetServiceSiteAccess(this.requestLinkSiteId);
    }
  }
  onFormSubmit(): void {
    if (!this.formGroup.valid) {
      this.cmsToastrService.typeErrorFormInvalid();
      return;
    }

    if (this.requestLinkSiteId > 0) {
      this.SetServiceSiteConfigSave(this.requestLinkSiteId);
      if (this.tokenInfo.access.userAccessAdminAllowToProfessionalData) {
        this.SetServiceSiteStorageSave(this.requestLinkSiteId);
        this.SetServiceSiteAccessSave(this.requestLinkSiteId);
      }
    }
  }



  onStepClick(event: StepperSelectionEvent, stepper: any): void {
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

  onActionBackToParent(): void {
    this.router.navigate(['/core/site/']);
  }

  GetServiceSiteStorage(SiteId: number): void {
    this.formInfo.formSubmitAllow = false;
    this.translate.get('MESSAGE.get_information_from_the_server').subscribe((str: string) => { this.formInfo.formAlert = str; });
    this.formInfo.formError = '';
    const pName = this.constructor.name + 'ServiceSiteStorage';
    this.translate.get('MESSAGE.get_saved_module_values').subscribe((str: string) => { this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId); });

    this.configService
      .ServiceSiteStorage(SiteId)
      .subscribe({
        next: (ret) => {
          this.formInfo.formSubmitAllow = true;
          if (ret.isSuccess) {
            this.dataSiteStorageModel = ret.item;
          } else {
            this.cmsToastrService.typeErrorGetOne(ret.errorMessage);
          }
          this.formInfo.formSubmitAllow = true;
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
  SetServiceSiteStorageSave(SiteId: number): void {
    this.formInfo.formSubmitAllow = false;
    this.translate.get('MESSAGE.Saving_Information_On_The_Server').subscribe((str: string) => { this.formInfo.formAlert = str; });
    this.formInfo.formError = '';

    const pName = this.constructor.name + 'ServiceSiteStorageSave';
    this.translate.get('MESSAGE.Save_the_stored_values_of_the_module').subscribe((str: string) => { this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId); });
    this.configService
      .ServiceSiteStorageSave(SiteId, this.dataSiteStorageModel)
      .subscribe({
        next: (ret) => {
          this.formInfo.formSubmitAllow = true;
          if (ret.isSuccess) {
            this.dataSiteStorageModel = ret.item;
          } else {
            this.cmsToastrService.typeErrorGetOne(ret.errorMessage);
          }
          this.formInfo.formSubmitAllow = true;
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
  GetServiceSiteConfig(SiteId: number): void {
    if (!(SiteId && SiteId > 0))
      return;
    this.formInfo.formSubmitAllow = false;
    this.translate.get('MESSAGE.get_information_from_the_server').subscribe((str: string) => { this.formInfo.formAlert = str; });
    this.formInfo.formError = '';

    const pName = this.constructor.name + 'ServiceSiteConfig';
    this.translate.get('MESSAGE.get_module_setting').subscribe((str: string) => { this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId); });
    this.configService
      .ServiceSiteConfig(SiteId)
      .subscribe({
        next: (ret) => {
          if (ret.isSuccess) {
            this.dataConfigSiteValuesModel = ret.item;
          } else {
            this.cmsToastrService.typeErrorGetOne(ret.errorMessage);
          }
          this.formInfo.formSubmitAllow = true;
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
  SetServiceSiteConfigSave(SiteId: number): void {
    this.formInfo.formSubmitAllow = false;
    this.translate.get('MESSAGE.Saving_Information_On_The_Server').subscribe((str: string) => { this.formInfo.formAlert = str; });
    this.formInfo.formError = '';
    const pName = this.constructor.name + 'ServiceSiteConfigSave';
    this.translate.get('MESSAGE.Save_module_setting').subscribe((str: string) => { this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId); });

    this.configService
      .ServiceSiteConfigSave(SiteId, this.dataConfigSiteValuesModel)
      .subscribe({
        next: (ret) => {
          if (ret.isSuccess) {
            this.dataConfigSiteValuesModel = ret.item;
          } else {
            this.cmsToastrService.typeErrorGetOne(ret.errorMessage);
          }
          this.formInfo.formSubmitAllow = true;
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
  GetServiceSiteAccess(SiteId: number): void {
    this.formInfo.formSubmitAllow = false;
    this.translate.get('MESSAGE.get_information_from_the_server').subscribe((str: string) => { this.formInfo.formAlert = str; });
    this.formInfo.formError = '';

    const pName = this.constructor.name + 'ServiceSiteAccess';
    this.translate.get('MESSAGE.get_module_access').subscribe((str: string) => { this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId); });

    this.configService
      .ServiceSiteAccess(SiteId)
      .subscribe({
        next: (ret) => {
          if (ret.isSuccess) {
            this.dataConfigSiteAccessValuesModel = ret.item;
          } else {
            this.cmsToastrService.typeErrorGetOne(ret.errorMessage);
          }
          this.formInfo.formSubmitAllow = true;
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
  SetServiceSiteAccessSave(SiteId: number): void {
    this.formInfo.formSubmitAllow = false;
    this.translate.get('MESSAGE.Saving_Information_On_The_Server').subscribe((str: string) => { this.formInfo.formAlert = str; });
    this.formInfo.formError = '';



    const pName = this.constructor.name + 'ServiceSiteAccessSave';
    this.translate.get('MESSAGE.Save_module_access').subscribe((str: string) => { this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId); });

    this.configService
      .ServiceSiteAccessSave(SiteId, this.dataConfigSiteAccessValuesModel)
      .subscribe({
        next: (ret) => {
          if (ret.isSuccess) {
            this.dataConfigSiteAccessValuesModel = ret.item;
          } else {
            this.cmsToastrService.typeErrorGetOne(ret.errorMessage);
          }
          this.formInfo.formSubmitAllow = true;
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
}
