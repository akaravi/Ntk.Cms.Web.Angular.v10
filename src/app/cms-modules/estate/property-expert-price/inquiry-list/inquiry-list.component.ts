
import {
  ChangeDetectorRef, Component, Inject, OnInit,
  ViewChild
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import {
  CoreCurrencyModel, CoreEnumService, CoreLocationModel, ErrorExceptionResult, EstateEnumService, EstatePriceInquiryDtoModel, EstatePropertyExpertPriceModel,
  EstatePropertyExpertPriceService, EstatePropertyTypeLanduseModel, EstatePropertyTypeUsageModel, FormInfoModel, InfoEnumModel
} from 'ntk-cms-api';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';

@Component({
    selector: 'app-estate-property-expert-price-inquiry-list',
    templateUrl: './inquiry-list.component.html',
    styleUrls: ['./inquiry-list.component.scss'],
    standalone: false
})
export class EstatePropertyExpertPriceInquiryListComponent implements OnInit {
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EstatePropertyExpertPriceInquiryListComponent>,
    public coreEnumService: CoreEnumService,
    public estatePropertyExpertPriceService: EstatePropertyExpertPriceService,
    private estateEnumService: EstateEnumService,
    private cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;
    if (data) {
      this.dataModel.linkLocationId = +data.linkLocationId | 0;
      this.dataModel.linkCoreCurrencyId = +data.linkCoreCurrencyId | 0;
      this.dataModel.createdYaer = +data.createdYaer | 0;
      this.dataModel.linkContractTypeId = data.linkContractTypeId;
      this.dataModel.linkPropertyTypeLanduseId = data.linkPropertyTypeLanduseId;
      this.dataModel.linkPropertyTypeUsageId = data.linkPropertyTypeUsageId;
    }
  }
  @ViewChild('vform', { static: false }) formGroup: FormGroup;
  appLanguage = 'fa';



  dataModel: EstatePriceInquiryDtoModel = new EstatePriceInquiryDtoModel();
  dataModelResult: ErrorExceptionResult<EstatePropertyExpertPriceModel> = new ErrorExceptionResult<EstatePropertyExpertPriceModel>();
  dataModelEstatePropertyExpertPriceTypeEnumResult: ErrorExceptionResult<InfoEnumModel> = new ErrorExceptionResult<InfoEnumModel>();


  formInfo: FormInfoModel = new FormInfoModel();

  PropertyTypeSelected = new EstatePropertyTypeLanduseModel();
  dataModelCorCurrencySelector = new CoreCurrencyModel();
  fileManagerOpenForm = false;

  ngOnInit(): void {
    this.translate.get('TITLE.Expert_Price_Inquiry').subscribe((str: string) => {
      this.formInfo.formTitle = str;
    });

    this.getEstatePropertyExpertPriceTypeEnum();
    if (this.dataModel.linkLocationId > 0 &&
      this.dataModel.linkCoreCurrencyId > 0 &&
      this.dataModel.createdYaer > 0 &&
      this.dataModel.linkContractTypeId && this.dataModel.linkContractTypeId.length > 0 &&
      this.dataModel.linkPropertyTypeLanduseId && this.dataModel.linkPropertyTypeLanduseId.length > 0 &&
      this.dataModel.linkPropertyTypeUsageId && this.dataModel.linkPropertyTypeUsageId.length > 0) {
      this.DataActionContent();
    }
  }


  getEstatePropertyExpertPriceTypeEnum(): void {
    this.estateEnumService.ServiceEstatePropertyExpertPriceTypeEnum().subscribe({
      next: (ret) => {
        this.dataModelEstatePropertyExpertPriceTypeEnumResult = ret;
      }
    });
  }

  DataActionContent(): void {
    this.translate.get('MESSAGE.sending_information_to_the_server').subscribe((str: string) => { this.formInfo.formAlert = str; });
    this.formInfo.formError = '';
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });

    this.dataModelResult = new ErrorExceptionResult<EstatePropertyExpertPriceModel>();
    this.estatePropertyExpertPriceService.ServicePriceInquiryList(this.dataModel).subscribe({
      next: (ret) => {
        this.formInfo.formSubmitAllow = true;

        if (ret.isSuccess) {
          this.translate.get('MESSAGE.registration_completed_successfully').subscribe((str: string) => { this.formInfo.formAlert = str; });
          if (ret.listItems && ret.listItems.length > 0) {
            this.dataModelResult = ret;
          } else {
            this.translate.get('MESSAGE.PriceInquiryCalculateNotFind').subscribe((str: string) => {
        this.cmsToastrService.typeWarningMessage(str);
      });
            this.dialogRef.close({ dialogChangedDate: true });
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
  onActionSelectorSelectUsage(model: EstatePropertyTypeUsageModel | null): void {
    if (!model || !model.id || model.id.length <= 0) {
      this.translate.get('MESSAGE.category_of_information_is_not_clear').subscribe((str: string) => { this.cmsToastrService.typeWarningSelected(str); });
      return;
    }
    this.dataModel.linkPropertyTypeUsageId = model.id;
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
  }

  onActionSelectorContarctType(model: EstatePropertyTypeLanduseModel | null): void {
          this.dataModel.linkContractTypeId = null;
      if (!model || !model.id || model.id.length <= 0) {
        this.translate.get('MESSAGE.Type_of_property_transaction_is_not_known').subscribe((str: string) => {
          this.cmsToastrService.typeWarningSelected(str);
        });
        return;
      }
    this.dataModel.linkContractTypeId = model.id;

  }

  onActionSelectorLocation(model: CoreLocationModel | null): void {
    this.dataModel.linkLocationId = null;
    if (model && model.id > 0) {
      this.dataModel.linkLocationId = model.id;
    }
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

  onFormSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }
    this.formInfo.formSubmitAllow = false;

    this.DataActionContent();

  }
  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }
}
