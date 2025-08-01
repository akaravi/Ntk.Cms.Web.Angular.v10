
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as Leaflet from 'leaflet';
import { Map as leafletMap } from 'leaflet';
import {
  CoreCurrencyModel, CoreEnumService, CoreLocationModel, CoreUserModel, DataFieldInfoModel, ErrorExceptionResult, EstateAccountAgencyModel, EstateAccountExpertModel, EstateContractModel, EstateContractTypeModel, EstateContractTypeService, EstatePropertyCompanyModel, EstatePropertyDetailGroupService, EstatePropertyDetailValueModel, EstatePropertyModel, EstatePropertyProjectModel, EstatePropertyService, EstatePropertyTypeLanduseModel, EstatePropertyTypeLanduseService, EstatePropertyTypeModel,
  EstatePropertyTypeService, EstatePropertyTypeUsageModel, FilterDataModel,
  FilterModel, FormInfoModel,
  InputDataTypeEnum, ManageUserAccessUserTypesEnum, RecordStatusEnum, TokenInfoModelV3
} from 'ntk-cms-api';
import { NodeInterface, TreeModel } from 'ntk-cms-filemanager';
import { Subscription } from 'rxjs';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { ConnectionStatusModel } from 'src/app/core/models/connectionStatusModel';
import { PoinModel } from 'src/app/core/models/pointModel';
import { CmsFormsErrorStateMatcher } from 'src/app/core/pipe/cmsFormsErrorStateMatcher';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
import { CmsMapComponent } from 'src/app/shared/cms-map/cms-map.component';
import { environment } from 'src/environments/environment';
import { EstatePropertyExpertPriceInquiryListComponent } from '../../property-expert-price/inquiry-list/inquiry-list.component';
import { EstatePropertyActionComponent } from '../action/action.component';
import { EstatePropertyQuickListComponent } from '../quick-list/quick-list.component';
import { CmsStoreService } from 'src/app/core/reducers/cmsStore.service';
import { ThemeService } from 'src/app/core/services/theme.service';


@Component({
  selector: 'app-estate-property-add-mobile',
  templateUrl: './add.mobile.component.html',
  standalone: false
})
export class EstatePropertyAddMobileComponent implements OnInit, OnDestroy {
  requestLinkPropertyTypeLanduseId = '';
  requestLinkPropertyTypeUsageId = '';
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private activatedRoute: ActivatedRoute,
    public coreEnumService: CoreEnumService,
    public estateContractTypeService: EstateContractTypeService,
    public estatePropertyService: EstatePropertyService,
    public estatePropertyDetailGroupService: EstatePropertyDetailGroupService,
    private estatePropertyTypeService: EstatePropertyTypeService,
    private estatePropertyTypeLanduseService: EstatePropertyTypeLanduseService,
    private cmsToastrService: CmsToastrService,
    private cmsStoreService: CmsStoreService,
    private router: Router,
    public publicHelper: PublicHelper,
    public themeService: ThemeService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    public tokenHelper: TokenHelper,
    public translate: TranslateService,
  ) {

    this.publicHelper.processService.cdr = this.cdr;

    this.requestLinkPropertyTypeLanduseId = this.activatedRoute.snapshot.paramMap.get('LinkPropertyTypeLanduseId');

    if (this.requestLinkPropertyTypeLanduseId && this.requestLinkPropertyTypeLanduseId.length > 0) {
      this.dataModel.linkPropertyTypeLanduseId = this.requestLinkPropertyTypeLanduseId;
    }
    this.requestLinkPropertyTypeUsageId = this.activatedRoute.snapshot.paramMap.get('LinkPropertyTypeUsageId');

    if (this.requestLinkPropertyTypeUsageId && this.requestLinkPropertyTypeUsageId.length > 0) {
      this.dataModel.linkPropertyTypeUsageId = this.requestLinkPropertyTypeUsageId;
    }
    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;

    this.unsubscribe.push(this.cmsStoreService.getState((state) => state.connectionStatusStore).subscribe(async (value) => {
      this.connectionStatus = value;
    }));
  }
  connectionStatus = new ConnectionStatusModel();

  @ViewChild('vform', { static: false }) formGroup: FormGroup;
  @ViewChild(CmsMapComponent) childMap: CmsMapComponent;
  currencyOptionSelectFirstItem = true;
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<string, DataFieldInfoModel>();
  enumInputDataType = InputDataTypeEnum;
  tokenInfo = new TokenInfoModelV3();
  selectFileTypeMainImage = ['jpg', 'jpeg', 'png'];
  fileManagerTree: TreeModel;
  appLanguage = 'fa';
  formMatcher = new CmsFormsErrorStateMatcher();

  dataModelResult: ErrorExceptionResult<EstatePropertyModel> = new ErrorExceptionResult<EstatePropertyModel>();
  dataModelEstateContractTypeResult: ErrorExceptionResult<EstateContractTypeModel> = new ErrorExceptionResult<EstateContractTypeModel>();
  dataModelEstatePropertyTypeResult: ErrorExceptionResult<EstatePropertyTypeModel> = new ErrorExceptionResult<EstatePropertyTypeModel>();
  dataModelEstatePropertyTypeLanduseResult: ErrorExceptionResult<EstatePropertyTypeLanduseModel>
    = new ErrorExceptionResult<EstatePropertyTypeLanduseModel>();
  dataModel: EstatePropertyModel = new EstatePropertyModel();
  dataFileModelImgaes = new Map<number, string>();
  dataFileModelFiles = new Map<number, string>();
  formInfo: FormInfoModel = new FormInfoModel();

  fileManagerOpenForm = false;
  dataModelCorCurrencySelector = new CoreCurrencyModel();
  contractTypeSelected: EstateContractTypeModel;
  PropertyTypeSelected = new EstatePropertyTypeLanduseModel();
  contractDataModel = new EstateContractModel();
  optionActionTitle = '';

  optionTabledataSource = new MatTableDataSource<EstateContractModel>();
  optionTabledisplayedColumns = ['LinkEstateContractTypeId', 'SalePrice', 'RentPrice', 'DepositPrice', 'PeriodPrice', 'Action'];
  propertyDetails: Map<string, string> = new Map<string, string>();
  step = 0;
  numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  /** map */
  viewMap = false;
  private mapModel: leafletMap;
  mapMarker: any;
  private mapMarkerPoints: Array<PoinModel> = [];
  mapOptonCenter = new PoinModel();
  listTypeLanduse: EstatePropertyTypeLanduseModel[] = [];
  dataProfessional = false;
  hidden = true;
  cmsApiStoreSubscribe: Subscription;
  private unsubscribe: Subscription[] = [];

  ngOnInit(): void {


    this.translate.get('TITLE.Submit_New_Content').subscribe((str: string) => {
      this.formInfo.formTitle = str;
    });


    this.DataGetAccess();
    this.getEstateContractType();
    this.getEstatePropertyType();
    this.getEstatePropertyTypeLanduse();
    this.dataModel.caseCode = this.publicHelper.StringRandomGenerator(5, true);
    this.cmsApiStoreSubscribe = this.cmsStoreService.getState((state) => state.tokenInfoStore).subscribe(async (value) => {
      this.DataGetAccess();
      this.getEstateContractType();
      this.getEstatePropertyType();
      this.getEstatePropertyTypeLanduse();
      this.translate.get('ACTION.Add_To_List').subscribe((str: string) => {
      this.optionActionTitle = str;
    });
      this.tokenInfo = value;
    });
  }
  ngOnDestroy(): void {
    if (this.cmsApiStoreSubscribe) {
      this.cmsApiStoreSubscribe.unsubscribe();
    }
    if (this.unsubscribe)
      this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  getEstateContractType(): void {
    const pName = this.constructor.name + 'getEstateContractType';
    this.translate.get('TITLE.Get_Estate_Contract_Type').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });
    this.estateContractTypeService.ServiceGetAll(null).subscribe({
      next: (ret) => {
        this.dataModelEstateContractTypeResult = ret;
        this.publicHelper.processService.processStop(pName);
      }, error: (err) => {
        this.publicHelper.processService.processStop(pName);
      }
    });
  }
  getEstatePropertyType(): void {
    const pName = this.constructor.name + 'getEstatePropertyType';
    this.translate.get('TITLE.Get_Estate_property_Type').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });
    this.estatePropertyTypeService.ServiceGetAll(null).subscribe({
      next: (ret) => {
        this.dataModelEstatePropertyTypeResult = ret;
        this.publicHelper.processService.processStop(pName);
      }, error: (err) => {
        this.publicHelper.processService.processStop(pName);
      }
    });
  }
  getEstatePropertyTypeLanduse(): void {
    const pName = this.constructor.name + 'getEstatePropertyType';
    this.translate.get('TITLE.Get_Estate_user_Type').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });
    this.estatePropertyTypeLanduseService.ServiceGetAll(null).subscribe({
      next: (ret) => {
        this.dataModelEstatePropertyTypeLanduseResult = ret;
        this.publicHelper.processService.processStop(pName);
      }, error: (err) => {
        this.publicHelper.processService.processStop(pName);
      }
    });
  }


  DataGetAccess(): void {
    const pName = this.constructor.name + 'ServiceViewModel';
    this.translate.get('TITLE.Get_Estate_access').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });
    this.estatePropertyService
      .ServiceViewModel()
      .subscribe({
        next: (ret) => {
          if (ret.isSuccess) {
            this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
          } else {
            this.cmsToastrService.typeErrorGetAccess(ret.errorMessage);
          }
          this.publicHelper.processService.processStop(pName);
        },
        error: (er) => {
          this.cmsToastrService.typeErrorGetAccess(er);
          this.publicHelper.processService.processStop(pName, false);
        }
      }
      );
  }

  DataGetPropertyDetailGroup(id: string): void {
    const filteModelProperty = new FilterModel();
    const filter = new FilterDataModel();
    filter.propertyName = 'LinkPropertyTypeLanduseId';
    filter.value = id;
    filteModelProperty.filters.push(filter);
    this.dataModel.propertyDetailGroups = [];
    const pName = this.constructor.name + 'DataGetPropertyDetailGroup';
    this.translate.get('TITLE.Get_Details').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });
    this.estatePropertyDetailGroupService.ServiceGetAll(filteModelProperty)
      .subscribe({
        next: (ret) => {
          if (ret.isSuccess) {
            this.dataModel.propertyDetailGroups = ret.listItems;
          } else {
            this.cmsToastrService.typeErrorGetAccess(ret.errorMessage);
          }
          this.publicHelper.processService.processStop(pName);
        },
        error: (er) => {
          this.cmsToastrService.typeErrorGetAccess(er);
          this.publicHelper.processService.processStop(pName, false);
        }
      }
      );
  }
  DataAdd(): void {
    this.translate.get('MESSAGE.sending_information_to_the_server').subscribe((str: string) => { this.formInfo.formAlert = str; });
    this.formInfo.formError = '';

    if (this.dataFileModelFiles) {
      const keys = Array.from(this.dataFileModelFiles.keys());
      if (keys && keys.length > 0) {
        this.dataModel.linkFileIds = keys.join(',');
      }
    }
    if (this.dataFileModelImgaes) {
      const keys = Array.from(this.dataFileModelImgaes.keys());
      if (keys && keys.length > 0) {
        this.dataModel.linkExtraImageIds = keys.join(',');
      }
    }
    const pName = this.constructor.name + 'ServiceAdd';
    this.translate.get('TITLE.Property_registration').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });
    this.estatePropertyService.ServiceAdd(this.dataModel).subscribe({
      next: (ret) => {
        this.formInfo.formSubmitAllow = true;
        this.dataModelResult = ret;
        if (ret.isSuccess) {
          this.translate.get('MESSAGE.registration_completed_successfully').subscribe((str: string) => { this.formInfo.formAlert = str; });
          this.cmsToastrService.typeSuccessAdd();

          if ((this.tokenHelper.isAdminSite || this.tokenHelper.isSupportSite || this.tokenInfo.access.userAccessUserType == ManageUserAccessUserTypesEnum.ResellerCpSite || this.tokenInfo.access.userAccessUserType == ManageUserAccessUserTypesEnum.ResellerEmployeeCpSite) && this.dataModel.recordStatus == RecordStatusEnum.Available) {
            var panelClass = '';
            if (this.publicHelper.isMobile)
              panelClass = 'dialog-fullscreen';
            else
              panelClass = 'dialog-min';
            const dialogRef = this.dialog.open(EstatePropertyActionComponent, {
              height: '90%',
              panelClass: panelClass,
              enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
              exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
              data: { model: this.dataModelResult.item }
            });
            dialogRef.afterClosed().subscribe(result => {
              setTimeout(() => this.router.navigate(['/estate/property']), 1000);
            });
          }
          else {
            setTimeout(() => this.router.navigate(['/estate/property']), 1000);
          }
        } else {
          this.translate.get('ERRORMESSAGE.MESSAGE.typeError').subscribe((str: string) => { this.formInfo.formAlert = str; });
          this.formInfo.formError = ret.errorMessage;
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
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
      if (lat === this.dataModel.geolocationlatitude && lon === this.dataModel.geolocationlongitude) {
        this.dataModel.geolocationlatitude = null;
        this.dataModel.geolocationlongitude = null;
        return;
      }
      this.mapMarker = Leaflet.marker([lat, lon]).addTo(this.mapModel);
      this.dataModel.geolocationlatitude = lat;
      this.dataModel.geolocationlongitude = lon;
    });

  }

  receiveZoom(zoom: number): void {
  }
  onActionSelectorSelectUsage(model: EstatePropertyTypeUsageModel | null): void {
    if (!model || !model.id || model.id.length <= 0) {
      this.translate.get('MESSAGE.category_of_information_is_not_clear').subscribe((str: string) => { this.cmsToastrService.typeErrorSelected(str); });
      return;
    }
    this.dataModel.linkPropertyTypeUsageId = model.id;
    if (this.dataModelEstatePropertyTypeResult.isSuccess && this.dataModelEstatePropertyTypeLanduseResult.isSuccess) {
      this.listTypeLanduse = [];
      this.dataModelEstatePropertyTypeResult.listItems.forEach(element => {
        if (element.linkPropertyTypeUsageId === model.id) {
          this.dataModelEstatePropertyTypeLanduseResult.listItems.forEach(elementLanduser => {
            if (elementLanduser.id === element.linkPropertyTypeLanduseId) {
              this.listTypeLanduse.push(elementLanduser);
            }
          });

        }
      });
    }
  }
  onActionSelectorSelectLanduse(model: EstatePropertyTypeLanduseModel | null): void {
    if (!model || !model.id || model.id.length <= 0) {
      this.translate.get('MESSAGE.category_of_information_is_not_clear').subscribe((str: string) => { this.cmsToastrService.typeErrorSelected(str); });
      return;
    }
    this.PropertyTypeSelected = model;
    this.dataModel.linkPropertyTypeLanduseId = model.id;
    this.DataGetPropertyDetailGroup(model.id);
  }
  onActionSelectorCmsUser(model: CoreUserModel | null): void {
    if (!model || !model.id || model.id <= 0) {
      this.dataModel.linkCmsUserId = null;
      return;
    }
    this.dataModel.linkCmsUserId = model.id;
  }
  onActionSelectorLocation(model: CoreLocationModel | null): void {
    if (!model || !model.id || model.id <= 0) {
      this.translate.get('MESSAGE.information_area_is_not_clear').subscribe((str: string) => {
        this.cmsToastrService.typeWarningSelected(str);
      });
      this.dataModel.linkLocationId = null;
      return;
    }
    this.dataModel.linkLocationId = model.id;
  }
  onActionSelectorProject(model: EstatePropertyProjectModel | null): void {
    if (!model || !model.id || model.id.length <= 0) {
      this.dataModel.linkPropertyProjectId = null;
      return;
    }
    this.dataModel.linkPropertyProjectId = model.id;
  }
  onActionSelectorCompany(model: EstatePropertyCompanyModel | null): void {
    if (!model || !model.id || model.id.length <= 0) {
      this.dataModel.linkPropertyCompanyId = null;
      return;
    }
    this.dataModel.linkPropertyCompanyId = model.id;
  }
  onActionSelectorEstateUser(model: EstateAccountExpertModel | null): void {
    this.dataModel.linkEstateExpertId = null;
    if (!model || !model.id || model.id.length <= 0) {
      return;
    }
    this.dataModel.linkEstateExpertId = model.id;
  }
  onActionSelectorEstateAgency(model: EstateAccountAgencyModel | null): void {
    this.dataModel.linkEstateAgencyId = null;
    if (!model || !model.id || model.id.length <= 0) {
      return;
    }
    this.dataModel.linkEstateAgencyId = model.id;
  }


  onActionSelectorContractType(model: EstateContractTypeModel | null): void {
    this.contractTypeSelected = null;
    if (!model || !model.id || model.id.length <= 0) {
      this.translate.get('MESSAGE.Type_of_property_transaction_is_not_known').subscribe((str: string) => {
        this.cmsToastrService.typeErrorSelected(str);
      });
      return;
    }
    this.currencyOptionSelectFirstItem = true;
    this.contractTypeSelected = model;
    this.contractDataModel = new EstateContractModel();
    this.contractDataModel.contractType = this.contractTypeSelected;
    this.contractDataModel.linkEstateContractTypeId = this.contractTypeSelected.id;
  }
  onFormSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }
    this.formInfo.formSubmitAllow = false;
    // ** Save Value */
    this.dataModel.propertyDetailValues = [];
    if (this.dataModel.propertyDetailGroups)
      this.dataModel.propertyDetailGroups.forEach(itemGroup => {
        itemGroup.propertyDetails.forEach(element => {
          const value = new EstatePropertyDetailValueModel();
          value.linkPropertyDetailId = element.id;
          value.value = this.propertyDetails[element.id];
          this.dataModel.propertyDetailValues.push(value);
        });
      });
    // ** Save Value */
    if (!this.dataModel.contracts || this.dataModel.contracts.length === 0) {
      this.onActionOptionAddToList(false);
    }
    if (!this.dataModel.contracts || this.dataModel.contracts.length === 0) {
      this.translate.get('MESSAGE.Type_of_property_transaction_is_not_known').subscribe((str: string) => {
        this.cmsToastrService.typeErrorSelected(str);
      });
      this.formInfo.formSubmitAllow = true;
      return;
    }

    this.DataAdd();


  }
  onFormCancel(): void {
    // this.dialogRef.close({ dialogChangedDate: false });
    this.router.navigate(['/estate/property']);
  }

  onActionOptionAddToList(viewAlert: boolean = true): void {
    if (!this.contractTypeSelected || this.contractTypeSelected.id.length === 0) {
      this.translate.get('MESSAGE.Type_of_property_transaction_is_not_known').subscribe((str: string) => {
        if (viewAlert) {
          this.cmsToastrService.typeErrorSelected(str);
        }
      });
      return;
    }
    if (!this.dataModel.contracts) {
      this.dataModel.contracts = [];
    }
    var accepted = false;
    if (this.contractTypeSelected.hasSalePrice) {
      if (this.contractDataModel.salePrice && this.contractDataModel.salePrice > 0)
        accepted = true;
      if (this.contractTypeSelected.salePriceAllowAgreement && this.contractDataModel.salePriceByAgreement)
        accepted = true;

      if (!accepted) {
        this.translate.get('MESSAGE.Sales_amount_is_not_entered_correctly').subscribe((str: string) => {
          this.cmsToastrService.typeErrorSelected(str);
        });
        return;
      }
    }
    accepted = false;
    if (this.contractTypeSelected.hasRentPrice) {
      if (this.contractDataModel.rentPrice && this.contractDataModel.rentPrice > 0)
        accepted = true;
      if (this.contractTypeSelected.rentPriceAllowAgreement && this.contractDataModel.rentPriceByAgreement)
        accepted = true;

      if (!accepted) {
        this.translate.get('MESSAGE.Rent_amount_is_not_entered_correctly').subscribe((str: string) => {
          this.cmsToastrService.typeErrorSelected(str);
        });
        return;
      }
    }
    accepted = false;
    if (this.contractTypeSelected.hasPeriodPrice) {
      if (this.contractDataModel.periodPrice && this.contractDataModel.periodPrice > 0)
        accepted = true;
      if (this.contractTypeSelected.periodPriceAllowAgreement && this.contractDataModel.periodPriceByAgreement)
        accepted = true;

      if (!accepted) {
        this.translate.get('MESSAGE.Period_amount_is_not_entered_correctly').subscribe((str: string) => {
          this.cmsToastrService.typeErrorSelected(str);
        });
        return;
      }
    }
    accepted = false;
    if (this.contractTypeSelected.hasDepositPrice) {
      if (this.contractDataModel.depositPrice && this.contractDataModel.depositPrice > 0)
        accepted = true;
      if (this.contractTypeSelected.depositPriceAllowAgreement && this.contractDataModel.depositPriceByAgreement)
        accepted = true;

      if (!accepted) {
        this.translate.get('MESSAGE.Deposit_amount_is_not_entered_correctly').subscribe((str: string) => {
          this.cmsToastrService.typeErrorSelected(str);
        });
        return;
      }
    }
    this.dataModel.contracts.push(this.contractDataModel);
    this.contractDataModel = new EstateContractModel();
    this.optionTabledataSource.data = this.dataModel.contracts;
    this.contractTypeSelected = null;

  }
  onActionOptionRemoveFromList(index: number): void {
    if (index < 0) {
      return;
    }
    if (!this.dataModel.contracts || this.dataModel.contracts.length === 0) {
      return;
    }
    this.contractDataModel = this.dataModel.contracts[index];
    this.dataModel.contracts.splice(index, 1);
    this.contractDataModel = new EstateContractModel();
    this.optionTabledataSource.data = this.dataModel.contracts;
  }

  onActionFileSelectedLinkMainImageId(model: NodeInterface): void {
    this.dataModel.linkMainImageId = model.id;
    this.dataModel.linkMainImageIdSrc = model.downloadLinksrc;
  }
  onStepClick(event: StepperSelectionEvent, stepper: MatStepper): void {

    if (event.previouslySelectedIndex < event.selectedIndex) {
      if (!this.dataModel.linkPropertyTypeUsageId || this.dataModel.linkPropertyTypeUsageId.length === 0) {
        this.translate.get('TITLE.Select_the_Property_Type_Usage').subscribe((str: string) => {
          this.cmsToastrService.typeErrorFormInvalid(str);
        });

        setTimeout(() => {
          stepper.selectedIndex = event.previouslySelectedIndex;
          // stepper.previous();
        }, 10);
      }

      if (!this.dataModel.linkPropertyTypeLanduseId || this.dataModel.linkPropertyTypeLanduseId.length === 0) {
        this.translate.get('TITLE.Select_the_Property_Type_Landuse').subscribe((str: string) => {
          this.cmsToastrService.typeErrorFormInvalid(str);
        });

        setTimeout(() => {
          stepper.selectedIndex = event.previouslySelectedIndex;
          // stepper.previous();
        }, 10);
      }

      if (!this.formGroup.valid) {

        this.cmsToastrService.typeErrorFormInvalid();
        setTimeout(() => {
          stepper.selectedIndex = event.previouslySelectedIndex;
          // stepper.previous();
        }, 10);
      }
    }
    if ((!this.dataModel.contracts || this.dataModel.contracts.length == 0) && event.previouslySelectedStep.state == "contract" && event.previouslySelectedIndex < event.selectedIndex) {
      this.translate.get('TITLE.Select_the_transaction_type').subscribe((str: string) => {
        this.cmsToastrService.typeErrorFormInvalid(str);
      });

      setTimeout(() => {
        stepper.selectedIndex = event.previouslySelectedIndex;
        // stepper.previous();
      }, 10);
    }
  }
  onActionBackToParent(): void {
    this.router.navigate(['/estate/property/']);
  }
  // ** Accardon */

  setStep(index: number): void {
    this.step = index;
  }

  nextStep(): void {
    this.step++;
  }

  prevStep(): void {
    this.step--;
  }
  // ** Accardon */
  onActionClickSalePriceAllowAgreement(): void {
    if (this.contractDataModel.salePriceByAgreement) {
      this.contractDataModel.salePrice = 0;
    }
  }
  onActionClickRentPriceAllowAgreement(): void {
    if (this.contractDataModel.rentPriceByAgreement) {
      this.contractDataModel.rentPrice = 0;
    }
  }
  onActionClickPeriodPriceAllowAgreement(): void {
    if (this.contractDataModel.periodPriceByAgreement) {
      this.contractDataModel.periodPrice = 0;
    }
  }
  onActionClickDepositPriceByAgreement(): void {
    if (this.contractDataModel.depositPriceByAgreement) {
      this.contractDataModel.depositPrice = 0;
    }
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
        this.dataModel.geolocationlatitude = lat;
        this.dataModel.geolocationlongitude = lon;
        this.receiveMap();
      }
    });
  }
  onActionSelectCurrency(model: CoreCurrencyModel): void {
    if (!model || model.id <= 0) {
      this.cmsToastrService.typeErrorSelected();
      this.dataModelCorCurrencySelector = null;
      this.contractDataModel.linkCoreCurrencyId = null;
      return;
    }
    this.dataModelCorCurrencySelector = model;
    this.contractDataModel.linkCoreCurrencyId = model.id;

    //
    if (this.tokenHelper.isAdminSite && this.contractTypeSelected.allowPriceInquiryCalculate) {
      this.onActionPriceInquiryList()
    }
  }
  onActionPriceInquiryList(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '90%';
    dialogConfig.data = {
      linkLocationId: this.dataModel.linkLocationId,
      linkCoreCurrencyId: this.contractDataModel.linkCoreCurrencyId,
      createdYaer: this.dataModel.createdYaer,
      linkPropertyTypeUsageId: this.dataModel.linkPropertyTypeUsageId,
      linkPropertyTypeLanduseId: this.dataModel.linkPropertyTypeLanduseId,
      linkContractTypeId: this.contractDataModel.linkEstateContractTypeId,
    };

    var panelClass = '';
    if (this.publicHelper.isMobile)
      panelClass = 'dialog-fullscreen';
    else
      panelClass = 'dialog-min';
    const dialogRef = this.dialog.open(EstatePropertyExpertPriceInquiryListComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      if (result && result.dialogChangedDate) {

      }
    });
  }
  onActionButtonQuickListSearchTitle(): void {
    if (!this.dataModel || !this.dataModel.title || this.dataModel.title.length === 0) {
      this.cmsToastrService.typeErrorSelectedRow();
      return;
    }
    var panelClass = '';
    if (this.publicHelper.isMobile)
      panelClass = 'dialog-fullscreen';
    else
      panelClass = 'dialog-min';
    const dialogRef = this.dialog.open(EstatePropertyQuickListComponent, {
      height: '90%',
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: { searchTitle: this.dataModel.title }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.dialogChangedDate) {
      }
    });
  }
  onActionButtonQuickListSearchCustomerTel(): void {
    if (!this.dataModel || !this.dataModel.aboutCustomerTel || this.dataModel.aboutCustomerTel.length === 0) {
      this.cmsToastrService.typeErrorSelectedRow();
      return;
    }
    var panelClass = '';
    if (this.publicHelper.isMobile)
      panelClass = 'dialog-fullscreen';
    else
      panelClass = 'dialog-min';
    const dialogRef = this.dialog.open(EstatePropertyQuickListComponent, {
      height: '90%',
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: { searchCustomerTel: this.dataModel.aboutCustomerTel }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.dialogChangedDate) {
      }
    });
  }
  onActionButtonQuickListSearchCustomerMobile(): void {
    if (!this.dataModel || !this.dataModel.aboutCustomerMobile || this.dataModel.aboutCustomerMobile.length === 0) {
      this.cmsToastrService.typeErrorSelectedRow();
      return;
    }
    var panelClass = '';
    if (this.publicHelper.isMobile)
      panelClass = 'dialog-fullscreen';
    else
      panelClass = 'dialog-min';
    const dialogRef = this.dialog.open(EstatePropertyQuickListComponent, {
      height: '90%',
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: { searchCustomerTel: this.dataModel.aboutCustomerMobile }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.dialogChangedDate) {
      }
    });
  }
  onActionButtonQuickListSearchCaseCode(): void {
    if (!this.dataModel || !this.dataModel.caseCode || this.dataModel.caseCode.length === 0) {
      this.cmsToastrService.typeErrorSelectedRow();
      return;
    }
    var panelClass = '';
    if (this.publicHelper.isMobile)
      panelClass = 'dialog-fullscreen';
    else
      panelClass = 'dialog-min';
    const dialogRef = this.dialog.open(EstatePropertyQuickListComponent, {
      height: '90%',
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: { searchCaseCode: this.dataModel.caseCode }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.dialogChangedDate) {
      }
    });
  }
}
