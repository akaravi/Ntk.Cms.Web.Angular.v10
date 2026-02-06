import { StepperSelectionEvent } from "@angular/cdk/stepper";
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
  AccessModel,
  CoreEnumService,
  DataFieldInfoModel,
  SmsConfigurationService,
  SmsModuleConfigAdminMainValuesModel,
  SmsModuleConfigSiteAccessValuesModel,
  SmsModuleConfigSiteValuesModel,
  TokenInfoModelV3,
} from "ntk-cms-api";
import { TreeModel } from "ntk-cms-filemanager";
import { Subscription } from "rxjs";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { PoinModel } from "src/app/core/models/pointModel";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

import { FormInfoModel } from "../../../../core/models/formInfoModel";

@Component({
  selector: "app-sms-config-mainadmin-mobile",
  templateUrl: "./config-main-admin.mobile.component.html",
  styleUrls: ["./config-main-admin.mobile.component.scss"],
  standalone: false,
})
export class SmsConfigMainAdminMobileComponent
  implements OnInit, OnDestroy
{
  requestLinkSiteId = 0;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private configService: SmsConfigurationService,
    private activatedRoute: ActivatedRoute,
    private tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
    public publicHelper: PublicHelper,
    public coreEnumService: CoreEnumService,
    public cmsToastrService: CmsToastrService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;
    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
  }
  dataConfigSiteValuesDefaultModel = new SmsModuleConfigSiteValuesModel();
  dataConfigSiteAccessValuesDefaultModel =
    new SmsModuleConfigSiteAccessValuesModel();
  dataConfigAdminMainModel = new SmsModuleConfigAdminMainValuesModel();
  tokenInfo = new TokenInfoModelV3();

  @ViewChild("vform", { static: false }) formGroup: FormGroup;

  formInfo: FormInfoModel = new FormInfoModel();
  dataAccessModel: AccessModel;
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();

  selectFileTypeMainImage = ["jpg", "jpeg", "png"];
  fileManagerOpenForm = false;
  appLanguage = "fa";

  fileManagerTree: TreeModel;
  mapMarker: any;
  mapOptonCenter = new PoinModel();

  private unsubscribe: Subscription[] = [];

  ngOnInit(): void {
    this.requestLinkSiteId = +Number(
      this.activatedRoute.snapshot.paramMap.get("LinkSiteId"),
    );

    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;
    if (this.tokenInfo) {
      this.onLoadDate();
    }

    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.tokenInfoStore)
        .subscribe(async (value) => {
          this.tokenInfo = value;
          this.onLoadDate();
        }),
    );
  }
  ngOnDestroy(): void {
    if (this.unsubscribe) this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  onLoadDate(): void {
    if (!this.requestLinkSiteId || this.requestLinkSiteId === 0) {
      this.requestLinkSiteId = this.tokenInfo.access.siteId;
    }
    if (this.tokenInfo.access.userAccessAdminAllowToProfessionalData) {
      this.GetServiceSiteConfigDefault();
      this.GetServiceSiteAccessDefault();
      this.GetServiceAdminMain();
    }
  }
  onFormSubmit(): void {
    if (!this.formGroup.valid) {
      this.cmsToastrService.typeErrorFormInvalid();
      return;
    }
    if (this.tokenInfo.access.userAccessAdminAllowToProfessionalData) {
      this.SetServiceSiteConfigDefaultSave();
      this.SetServiceSiteAccessDefaultSave();
      this.SetServiceAdminMainSave();
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
    this.router.navigate(["/core/site/"]);
  }

  GetServiceSiteConfigDefault(): void {
    this.formInfo.submitButtonEnabled = false;
    this.translate
      .get("MESSAGE.get_information_from_the_server")
      .subscribe((str: string) => {
        this.formInfo.submitResultMessage = str;
      });
    this.formInfo.submitResultMessage = "";

    const pName = this.constructor.name + "ServiceSiteConfigDefault";
    this.translate
      .get("MESSAGE.get_the_module_default_settings")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });
    this.configService.ServiceSiteConfigDefault().subscribe({
      next: (ret) => {
        this.publicHelper.processService.processStop(pName);
        this.dataConfigSiteValuesDefaultModel = ret.item;
        this.formInfo.submitButtonEnabled = true;
        if (!ret.isSuccess) {
          this.cmsToastrService.typeErrorGetOne(ret.errorMessage);
        }
      },
      error: (er) => {
        this.publicHelper.processService.processStop(pName);
        this.cmsToastrService.typeErrorGetOne(er);
      },
    });
  }

  SetServiceSiteConfigDefaultSave(): void {
    this.formInfo.submitButtonEnabled = false;
    this.translate
      .get("MESSAGE.sending_information_to_the_server")
      .subscribe((str: string) => {
        this.formInfo.submitResultMessage = str;
      });
    this.formInfo.submitResultMessage = "";

    const pName = this.constructor.name + "ServiceSiteConfigDefaultSave";
    this.translate
      .get("MESSAGE.Save_module_default_setting")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });
    this.configService
      .ServiceSiteConfigDefaultSave(this.dataConfigSiteValuesDefaultModel)
      .subscribe({
        next: (ret) => {
          this.publicHelper.processService.processStop(pName);
          this.formInfo.submitButtonEnabled = true;
          if (!ret.isSuccess) {
            this.cmsToastrService.typeErrorGetOne(ret.errorMessage);
          } else {
            this.cmsToastrService.typeSuccessEdit();
          }
        },
        error: (er) => {
          this.publicHelper.processService.processStop(pName);
          this.cmsToastrService.typeErrorGetOne(er);
        },
      });
  }

  GetServiceSiteAccessDefault(): void {
    this.formInfo.submitButtonEnabled = false;
    this.translate
      .get("MESSAGE.get_information_from_the_server")
      .subscribe((str: string) => {
        this.formInfo.submitResultMessage = str;
      });
    this.formInfo.submitResultMessage = "";

    const pName = this.constructor.name + "ServiceSiteAccessDefault";
    this.translate
      .get("MESSAGE.get_the_module_default_access")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });
    this.configService.ServiceSiteAccessDefault().subscribe({
      next: (ret) => {
        this.publicHelper.processService.processStop(pName);
        this.dataConfigSiteAccessValuesDefaultModel = ret.item;
        this.formInfo.submitButtonEnabled = true;
        if (!ret.isSuccess) {
          this.cmsToastrService.typeErrorGetOne(ret.errorMessage);
        }
      },
      error: (er) => {
        this.publicHelper.processService.processStop(pName);
        this.cmsToastrService.typeErrorGetOne(er);
      },
    });
  }

  SetServiceSiteAccessDefaultSave(): void {
    this.formInfo.submitButtonEnabled = false;
    this.translate
      .get("MESSAGE.sending_information_to_the_server")
      .subscribe((str: string) => {
        this.formInfo.submitResultMessage = str;
      });
    this.formInfo.submitResultMessage = "";

    const pName = this.constructor.name + "ServiceSiteAccessDefaultSave";
    this.translate
      .get("MESSAGE.Save_the_module_default_access")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });
    this.configService
      .ServiceSiteAccessDefaultSave(
        this.dataConfigSiteAccessValuesDefaultModel,
      )
      .subscribe({
        next: (ret) => {
          this.publicHelper.processService.processStop(pName);
          this.formInfo.submitButtonEnabled = true;
          if (!ret.isSuccess) {
            this.cmsToastrService.typeErrorGetOne(ret.errorMessage);
          } else {
            this.cmsToastrService.typeSuccessEdit();
          }
        },
        error: (er) => {
          this.publicHelper.processService.processStop(pName);
          this.cmsToastrService.typeErrorGetOne(er);
        },
      });
  }

  GetServiceAdminMain(): void {
    this.formInfo.submitButtonEnabled = false;
    this.translate
      .get("MESSAGE.get_information_from_the_server")
      .subscribe((str: string) => {
        this.formInfo.submitResultMessage = str;
      });
    this.formInfo.submitResultMessage = "";

    const pName = this.constructor.name + "ServiceAdminMain";
    this.translate
      .get("MESSAGE.get_the_module_admin_main")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });
    this.configService.ServiceAdminMain().subscribe({
      next: (ret) => {
        this.publicHelper.processService.processStop(pName);
        this.dataConfigAdminMainModel = ret.item;
        this.formInfo.submitButtonEnabled = true;
        if (!ret.isSuccess) {
          this.cmsToastrService.typeErrorGetOne(ret.errorMessage);
        }
      },
      error: (er) => {
        this.publicHelper.processService.processStop(pName);
        this.cmsToastrService.typeErrorGetOne(er);
      },
    });
  }

  SetServiceAdminMainSave(): void {
    this.formInfo.submitButtonEnabled = false;
    this.translate
      .get("MESSAGE.sending_information_to_the_server")
      .subscribe((str: string) => {
        this.formInfo.submitResultMessage = str;
      });
    this.formInfo.submitResultMessage = "";

    const pName = this.constructor.name + "ServiceAdminMainSave";
    this.translate
      .get("MESSAGE.Save_the_module_admin_main")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });
    this.configService
      .ServiceAdminMainSave(this.dataConfigAdminMainModel)
      .subscribe({
        next: (ret) => {
          this.publicHelper.processService.processStop(pName);
          this.formInfo.submitButtonEnabled = true;
          if (!ret.isSuccess) {
            this.cmsToastrService.typeErrorGetOne(ret.errorMessage);
          } else {
            this.cmsToastrService.typeSuccessEdit();
          }
        },
        error: (er) => {
          this.publicHelper.processService.processStop(pName);
          this.cmsToastrService.typeErrorGetOne(er);
        },
      });
  }
}
