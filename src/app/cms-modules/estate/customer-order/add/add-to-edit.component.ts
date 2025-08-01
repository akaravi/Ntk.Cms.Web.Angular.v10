
import {
  ChangeDetectorRef, Component, Inject, OnInit,
  ViewChild
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import {
  CoreEnumService,
  CoreUserModel,
  ErrorExceptionResult, EstateAccountAgencyModel, EstateAccountExpertModel, EstateCustomerCategoryModel,
  EstateCustomerOrderModel,
  EstateCustomerOrderService,
  FormInfoModel,
  ManageUserAccessDataTypesEnum
} from 'ntk-cms-api';
import { AddBaseComponent } from 'src/app/core/cmsComponent/addBaseComponent';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
import { CmsStoreService } from 'src/app/core/reducers/cmsStore.service';


@Component({
    selector: 'app-estate-customer-order-add-to-edit',
    templateUrl: './add-to-edit.component.html',
    standalone: false
})
export class EstateCustomerOrderAddToEditComponent extends AddBaseComponent<EstateCustomerOrderService, EstateCustomerOrderModel, string> implements OnInit {
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EstateCustomerOrderAddToEditComponent>,
    public coreEnumService: CoreEnumService,
    public estateCustomerOrderService: EstateCustomerOrderService,
    private cmsToastrService: CmsToastrService,
    private cmsStoreService:CmsStoreService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
    public tokenHelper: TokenHelper,

  ) {
    super(estateCustomerOrderService, new EstateCustomerOrderModel(), publicHelper, translate);
    this.publicHelper.processService.cdr = this.cdr;

    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;

    if (data && data.linkEstateCustomerCategoryId?.length > 0) {
      this.dataModel.linkEstateCustomerCategoryId = data.linkEstateCustomerCategoryId;
    }
    if (data && data.copyId?.length > 0) {
      this.DataGetOneContent(data.copyId);
    }

    this.dataModel.caseCode = this.publicHelper.StringRandomGenerator(5, true);
  }
  @ViewChild('vform', { static: false }) formGroup: FormGroup;
  dataModelResult: ErrorExceptionResult<EstateCustomerOrderModel> = new ErrorExceptionResult<EstateCustomerOrderModel>();
  dataModel: EstateCustomerOrderModel = new EstateCustomerOrderModel();
  formInfo: FormInfoModel = new FormInfoModel();

  fileManagerOpenForm = false;

  ngOnInit(): void {

    this.translate.get('TITLE.ADD').subscribe((str: string) => { this.formInfo.formTitle = str; });

    this.DataGetAccess();

  }

  DataGetOneContent(requestId: string): void {

    this.translate.get('MESSAGE.Receiving_Information_From_The_Server').subscribe((str: string) => { this.formInfo.formAlert = str; });
    this.formInfo.formError = '';
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });

    this.estateCustomerOrderService.setAccessLoad();
    this.estateCustomerOrderService.setAccessDataType(ManageUserAccessDataTypesEnum.Editor);
    this.estateCustomerOrderService.ServiceGetOneById(requestId).subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);

        this.dataModel = ret.item;
        this.dataModel.title = "Copy of " + this.dataModel.title
        if (ret.isSuccess) {
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
  DataAddContent(): void {
    this.translate.get('MESSAGE.sending_information_to_the_server').subscribe((str: string) => { this.formInfo.formAlert = str; });
    this.formInfo.formError = '';
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });

    this.dataModel.scoreLiquidityPower=5;
    this.dataModel.scorePurchaseDecision=5;
    this.dataModel.scorePurchasingPower=5;
    this.dataModel.scoreRushToBuy=5;

    this.estateCustomerOrderService.ServiceAdd(this.dataModel).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.translate.get('MESSAGE.registration_completed_successfully').subscribe((str: string) => { this.formInfo.formAlert = str; });
          this.cmsToastrService.typeSuccessAdd();

          this.dialogRef.close({
            id: ret.item.id,
            dialogChangedDate: true
          });

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

  onFormSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }
    this.formInfo.formSubmitAllow = false;
    this.DataAddContent();
  }
  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }
  onActionSelectorSelect(model: EstateCustomerCategoryModel | null): void {
    if (!model || model.id.length <= 0) {
      this.translate.get('MESSAGE.category_of_information_is_not_clear').subscribe((str: string) => { this.cmsToastrService.typeErrorSelected(str); });
      return;
    }
    this.dataModel.linkEstateCustomerCategoryId = model.id;
  }
  onActionSelectorCmsUser(model: CoreUserModel | null): void {
    if (!model || !model.id || model.id <= 0) {
      this.dataModel.linkCmsUserId = null;
      return;
    }
    this.dataModel.linkCmsUserId = model.id;
  }
  onActionSelectorEstateAgency(model: EstateAccountAgencyModel | null): void {
    this.dataModel.linkEstateAgencyId = null;
    if (!model || !model.id || model.id.length <= 0) {
      return;
    }
    this.dataModel.linkEstateAgencyId = model.id;
  }
  onActionSelectorEstateUser(model: EstateAccountExpertModel | null): void {
    this.dataModel.linkEstateExpertId = null;
    if (!model || !model.id || model.id.length <= 0) {
      return;
    }
    this.dataModel.linkEstateExpertId = model.id;
  }
}
