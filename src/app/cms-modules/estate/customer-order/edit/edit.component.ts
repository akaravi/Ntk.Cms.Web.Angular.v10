
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectorRef, Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  CoreCurrencyModel, CoreEnumService, CoreUserModel, DataFieldInfoModel,
  ErrorExceptionResultBase, EstateAccountAgencyModel, EstateAccountExpertModel, EstateContractTypeModel, EstateContractTypeService, EstateCustomerCategoryModel, EstateCustomerOrderModel, EstateCustomerOrderService, EstatePropertyDetailGroupService, EstatePropertyDetailValueModel, EstatePropertyService, EstatePropertyTypeLanduseModel,
  EstatePropertyTypeUsageModel, FilterDataModel,
  FilterModel, FormInfoModel,
  InputDataTypeEnum, ManageUserAccessDataTypesEnum, ManageUserAccessUserTypesEnum, RecordStatusEnum, SortTypeEnum
} from 'ntk-cms-api';
import { TreeModel } from 'ntk-cms-filemanager';
import { EditBaseComponent } from 'src/app/core/cmsComponent/editBaseComponent';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
import { environment } from 'src/environments/environment';
import { EstateAccountAgencyListComponent } from '../../account-agency/list/list.component';
import { EstateAccountExpertListComponent } from '../../account-expert/list/list.component';
import { EstatePropertyHistoryAddComponent } from '../../property-history/add/add.component';
import { EstatePropertyHistoryListComponent } from '../../property-history/list/list.component';
import { EstatePropertyListComponent } from '../../property/list/list.component';
import { EstateCustomerOrderActionComponent } from '../action/action.component';
import { CmsStoreService } from 'src/app/core/reducers/cmsStore.service';
import { ThemeService } from 'src/app/core/services/theme.service';


@Component({
  selector: 'app-estate-customer-order-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  standalone: false
})
export class EstateCustomerOrderEditComponent extends EditBaseComponent<EstateCustomerOrderService, EstateCustomerOrderModel, string>
  implements OnInit {
  requestId = '';
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private router: Router,
    public coreEnumService: CoreEnumService,
    public estateCustomerOrderService: EstateCustomerOrderService,
    private estateContractTypeService: EstateContractTypeService,
    private estatePropertyService: EstatePropertyService,
    public estatePropertyDetailGroupService: EstatePropertyDetailGroupService,
    private cmsToastrService: CmsToastrService,
    public themeService: ThemeService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private cmsStoreService: CmsStoreService,
    public http: HttpClient,
    public tokenHelper: TokenHelper,
    public translate: TranslateService,
    public dialog: MatDialog,
  ) {
    super(estateCustomerOrderService, new EstateCustomerOrderModel(), publicHelper, translate);

    this.publicHelper.processService.cdr = this.cdr;
    this.requestId = this.activatedRoute.snapshot.paramMap.get('id');

    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;

  }
  @ViewChild('vform', { static: false }) formGroup: FormGroup;
  @ViewChild(EstatePropertyListComponent) estatePropertyListComponent: EstatePropertyListComponent;
  @ViewChild(EstatePropertyListComponent) estatePropertyHaveHistoryListComponent: EstatePropertyListComponent;

  @ViewChild(EstateAccountAgencyListComponent) estateAccountAgencyListComponent: EstateAccountAgencyListComponent;
  @ViewChild(EstateAccountExpertListComponent) estateAccountExpertListComponent: EstateAccountExpertListComponent;
  @ViewChild(EstatePropertyHistoryListComponent) estatePropertyHistoryListComponent: EstatePropertyHistoryListComponent;
  allowActionSend = false;


  selectFileTypeMainImage = ['jpg', 'jpeg', 'png'];
  enumInputDataType = InputDataTypeEnum;
  numbers: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  fileManagerTree: TreeModel;
  appLanguage = 'fa';


  dataModelResult: ErrorExceptionResultBase = new ErrorExceptionResultBase();
  dataModel: EstateCustomerOrderModel = new EstateCustomerOrderModel();
  dataModelCorCurrencySelector = new CoreCurrencyModel();
  formInfo: FormInfoModel = new FormInfoModel();
  contractTypeSelected: EstateContractTypeModel;

  fileManagerOpenForm = false;
  propertyDetails: Map<string, string> = new Map<string, string>();
  PropertyTypeSelected = new EstatePropertyTypeLanduseModel();
  optionloadComponent = false;
  LinkPropertyIdsInUse = false;
  areaAddressView = false;


  // ** Accardon */
  step = 0;
  hidden = true;

  ngOnInit(): void {
    this.translate.get('TITLE.Edit').subscribe((str: string) => { this.formInfo.formTitle = str; });
    if (!this.requestId || this.requestId.length === 0) {
      this.cmsToastrService.typeErrorComponentAction();
      setTimeout(() => this.router.navigate(['/estate/customer-order']), 1000);
      return;
    }
    this.DataGetOneContent();
    this.DataGetAccessEstate();

  }


  lastRecordStatus: RecordStatusEnum;
  dataFieldInfoModel: DataFieldInfoModel[];
  DataGetAccessEstate(): void {
    this.estatePropertyService
      .ServiceViewModel()
      .subscribe({
        next: (ret) => {
          if (ret.isSuccess) {
            this.dataFieldInfoModel = ret.access.fieldsInfo;
          } else {
            this.cmsToastrService.typeErrorGetAccess(ret.errorMessage);
          }
          this.cdr.detectChanges();
        },
        error: (er) => {
          this.cmsToastrService.typeErrorGetAccess(er);
        }
      }
      );

  }
  DataGetOneContent(): void {

    this.translate.get('MESSAGE.Receiving_Information_From_The_Server').subscribe((str: string) => { this.formInfo.formAlert = str; });
    this.formInfo.formError = '';
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });

    this.estateCustomerOrderService.setAccessLoad();
    this.estateCustomerOrderService.setAccessDataType(ManageUserAccessDataTypesEnum.Editor);
    this.estateCustomerOrderService.ServiceGetOneById(this.requestId).subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
        this.lastRecordStatus = ret.item.recordStatus;
        this.dataModel = ret.item;
        if (ret.isSuccess) {
          if (!this.dataModel.caseCode || this.dataModel.caseCode.length <= 0)
            this.dataModel.caseCode = this.publicHelper.StringRandomGenerator(5, true);
          this.formInfo.formTitle = this.formInfo.formTitle + ' ' + ret.item.title;
          if (this.dataModel.linkPropertyIds && this.dataModel.linkPropertyIds.length > 0)
            this.LinkPropertyIdsInUse = true;
          this.formInfo.formAlert = '';
          /** load Value */
          if (this.dataModel.propertyDetailGroups)
            this.dataModel.propertyDetailGroups.forEach(itemGroup => {
              itemGroup.propertyDetails.forEach(element => {
                this.propertyDetails[element.id] = 0;
                if (this.dataModel.propertyDetailValues) {
                  const value = this.dataModel.propertyDetailValues.find(x => x.linkPropertyDetailId === element.id);
                  if (value) {
                    this.propertyDetails[element.id] = value.value;
                  }
                }
              });
            });
          /** load Value */
          /** */
          if (this.dataModel.linkContractTypeId.length > 0) {
            this.estateContractTypeService.ServiceGetOneById(this.dataModel.linkContractTypeId).subscribe({
              next: (ret) => {
                if (ret.isSuccess) {
                  this.contractTypeSelected = ret.item;
                } else {
                  this.cmsToastrService.typeErrorMessage(ret.errorMessage);
                }
              }
            });
          }
          this.cdr.detectChanges();
          /** */
        } else {
          this.translate.get('ERRORMESSAGE.MESSAGE.typeError').subscribe((str: string) => { this.formInfo.formAlert = str; });
          this.formInfo.formError = ret.errorMessage;
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.publicHelper.processService.processStop(pName);

      },
      error: (er) => {
        this.cmsToastrService.typeError(er);
        this.publicHelper.processService.processStop(pName, false);
      }
    }
    );
  }
  DataEditContent(forcePopupMessageAction = false): void {
    this.translate.get('MESSAGE.sending_information_to_the_server').subscribe((str: string) => { this.formInfo.formAlert = str; });
    this.formInfo.formError = '';
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.sending_information_to_the_server').subscribe((str: string) => { this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId); });

    this.estateCustomerOrderService.ServiceEdit(this.dataModel).subscribe({
      next: (ret) => {
        this.dataModelResult = ret;
        if (ret.isSuccess) {
          this.translate.get('MESSAGE.registration_completed_successfully').subscribe((str: string) => { this.formInfo.formAlert = str; });
          this.cmsToastrService.typeSuccessEdit();
          this.optionReload();
          if ((this.tokenHelper.isAdminSite || this.tokenHelper.isSupportSite || this.tokenInfo.access.userAccessUserType == ManageUserAccessUserTypesEnum.ResellerCpSite || this.tokenInfo.access.userAccessUserType == ManageUserAccessUserTypesEnum.ResellerEmployeeCpSite) && this.dataModel.recordStatus == RecordStatusEnum.Available) {
            var panelClass = '';
            if (this.publicHelper.isMobile)
              panelClass = 'dialog-fullscreen';
            else
              panelClass = 'dialog-min';
            const dialogRef = this.dialog.open(EstateCustomerOrderActionComponent, {
              panelClass: panelClass,
              enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
              exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
              data: { model: this.dataModel }
            });
            dialogRef.afterClosed().subscribe(result => {
              this.formInfo.formSubmitAllow = true;
              this.publicHelper.processService.processStop(pName);
            });
          }
          this.cdr.detectChanges();
        } else {
          this.translate.get('ERRORMESSAGE.MESSAGE.typeError').subscribe((str: string) => { this.formInfo.formAlert = str; });
          this.formInfo.formError = ret.errorMessage;
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.publicHelper.processService.processStop(pName);

        this.formInfo.formSubmitAllow = true;
      },
      error: (er) => {
        this.formInfo.formSubmitAllow = true;
        this.cmsToastrService.typeError(er);
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
    this.translate.get('MESSAGE.Get_detailed_information').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });
    this.estatePropertyDetailGroupService.ServiceGetAll(filteModelProperty)
      .subscribe({
        next: (ret) => {
          if (ret.isSuccess) {
            this.dataModel.propertyDetailGroups = ret.listItems;
            /** load Value */
            if (this.dataModel.propertyDetailGroups)
              this.dataModel.propertyDetailGroups.forEach(itemGroup => {
                itemGroup.propertyDetails.forEach(element => {
                  this.propertyDetails[element.id] = 0;

                  if (this.dataModel.propertyDetailValues) {
                    const value = this.dataModel.propertyDetailValues.find(x => x.linkPropertyDetailId === element.id);
                    if (value) {
                      this.propertyDetails[element.id] = value.value;
                    }
                  }
                });
              });
            /** load Value */
          } else {
            this.cmsToastrService.typeErrorGetAccess(ret.errorMessage);
          }
          this.cdr.detectChanges();
          this.publicHelper.processService.processStop(pName);
        },
        error: (er) => {
          this.cmsToastrService.typeErrorGetAccess(er);
          this.publicHelper.processService.processStop(pName, false);
        }
      }
      );
  }
  onActionCopied(): void {
    this.cmsToastrService.typeSuccessCopedToClipboard();
  }
  onActionSelectorSelectUsage(model: EstatePropertyTypeUsageModel | null): void {
    if (!model || !model.id || model.id.length <= 0) {
      this.translate.get('MESSAGE.category_of_information_is_not_clear').subscribe((str: string) => { this.cmsToastrService.typeWarningSelected(str); });
      return;
    }
    this.dataModel.linkPropertyTypeUsageId = model.id;
    this.cdr.detectChanges();
  }
  onActionSelectorSelectLanduse(model: EstatePropertyTypeLanduseModel | null): void {
    this.PropertyTypeSelected = null;
    this.dataModel.linkPropertyTypeLanduseId = null;
    if (!model || !model.id || model.id.length <= 0) {
      this.translate.get('MESSAGE.category_of_information_is_not_clear').subscribe((str: string) => { this.cmsToastrService.typeWarningSelected(str); });
      return;
    }
    this.PropertyTypeSelected = model;
    this.dataModel.linkPropertyTypeLanduseId = model.id;
    this.DataGetPropertyDetailGroup(model.id);
    this.cdr.detectChanges();
  }
  onActionSelectorContarctType(model: EstateContractTypeModel | null): void {
    this.contractTypeSelected = null;
    this.dataModel.linkContractTypeId = null;
    if (!model || !model.id || model.id.length <= 0) {
      this.translate.get('MESSAGE.Type_of_property_transaction_is_not_known').subscribe((str: string) => {
        this.cmsToastrService.typeWarningSelected(str);
      });
      return;
    }
    this.contractTypeSelected = model;
    this.dataModel.linkContractTypeId = model.id;

    this.cdr.detectChanges();
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
  onActionSelectorLocation(model: number[] | null): void {

    this.dataModel.linkLocationIds = model;
  }
  onActionSelectorProperty(model: string[] | null): void {
    this.dataModel.linkPropertyIds = model;
    if (this.dataModel.linkPropertyIds && this.dataModel.linkPropertyIds.length > 0) {
      this.LinkPropertyIdsInUse = true;
    } else {
      this.LinkPropertyIdsInUse = false;
    }
  }
  onActionSelectorPropertyIgnored(model: string[] | null): void {
    this.dataModel.linkPropertyIdsIgnored = model;

  }
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
  onFormSendMessage() {
    this.onFormSubmit(true);
  }
  onFormSubmit(forcePopupMessageAction = false): void {
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

    this.DataEditContent(forcePopupMessageAction);


  }

  onActionSelectorSelect(model: EstateCustomerCategoryModel | null): void {
    if (!model || model.id.length <= 0) {
      this.translate.get('MESSAGE.category_of_information_is_not_clear').subscribe((str: string) => { this.cmsToastrService.typeErrorSelected(str); });
      return;
    }
    this.dataModel.linkEstateCustomerCategoryId = model.id;
  }
  onFormCancel(): void {
    this.router.navigate(['/estate/customer-order/']);
  }
  optionReload = (): void => {
    this.loadResult = ''
  }
  loadResult = '';
  onFormLoadEstateResult(): void {
    this.loadResult = 'estatePropertyList';
    this.cdr.detectChanges();
    this.estatePropertyListComponent.optionloadComponent = true;
    this.estatePropertyListComponent.DataGetAll();
  }
  onFormLoadEstateHaveHistoryResult(): void {
    this.loadResult = 'estatePropertyHaveHistoryList';
    this.cdr.detectChanges();
    this.estatePropertyHaveHistoryListComponent.optionloadComponent = true;
    this.estatePropertyHaveHistoryListComponent.DataGetAll();
  }
  onActionSelectCurrency(model: CoreCurrencyModel): void {
    if (!model || model.id <= 0) {
      // this.cmsToastrService.typeErrorSelected();
      this.dataModelCorCurrencySelector = null;
      this.dataModel.linkCoreCurrencyId = null;
      return;
    }
    this.dataModelCorCurrencySelector = model;
    this.dataModel.linkCoreCurrencyId = model.id;
  }
  onFormLoadEstateAgencyResult(): void {
    this.loadResult = 'estateAccountAgencyList';
    this.cdr.detectChanges();
    this.estateAccountAgencyListComponent.optionloadComponent = true;
    this.estateAccountAgencyListComponent.DataGetAll();
  }
  onFormLoadEstateUserResult(): void {
    this.loadResult = 'estateAccountExpertList';
    this.cdr.detectChanges();
    this.estateAccountExpertListComponent.optionloadComponent = true;
    this.estateAccountExpertListComponent.DataGetAll();
  }

  onFormLoadEstateHistoryResult(): void {
    this.loadResult = 'estateHistoryList';
    this.cdr.detectChanges();
    this.estatePropertyHistoryListComponent.optionloadComponent = true;
    this.estatePropertyHistoryListComponent.DataGetAll();
  }
  onActionSelectorCmsUser(model: CoreUserModel | null): void {
    if (!model || !model.id || model.id <= 0) {
      this.dataModel.linkCmsUserId = null;
      return;
    }
    this.dataModel.linkCmsUserId = model.id;
  }

  onActionButtonQuickHistoryAddRow(): void {
    var panelClass = '';
    if (this.publicHelper.isMobile)
      panelClass = 'dialog-fullscreen';
    else
      panelClass = 'dialog-min';
    const dialogRef = this.dialog.open(EstatePropertyHistoryAddComponent, {
      height: '90%',
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: {
        linkActivityTypeId: null,
        linkPropertyId: null,
        linkEstateExpertId: null,
        linkCustomerOrderId: this.dataModel.id,
        linkEstateAgencyId: null
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.dialogChangedDate) {

      }
    });
  }

  onActionSortArrow() {
    if (this.dataModel.resultSortType == SortTypeEnum.Ascending)
      this.dataModel.resultSortType = SortTypeEnum.Descending;
    else if (this.dataModel.resultSortType == SortTypeEnum.Descending)
      this.dataModel.resultSortType = SortTypeEnum.Random;
    else if (this.dataModel.resultSortType == SortTypeEnum.Random)
      this.dataModel.resultSortType = SortTypeEnum.Ascending;
    else
      this.dataModel.resultSortType = SortTypeEnum.Ascending;
  }
}

