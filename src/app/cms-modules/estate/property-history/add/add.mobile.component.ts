import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import {
  CoreEnumService,
  DataFieldInfoModel,
  ErrorExceptionResult,
  EstateAccountExpertModel,
  EstateActivityTypeModel,
  EstateActivityTypeService,
  EstateCustomerOrderModel,
  EstateEnumService,
  EstatePropertyHistoryModel,
  EstatePropertyHistoryService,
  EstatePropertyModel,
  FilterModel,
  FormInfoModel,
  InfoEnumModel,
  TokenInfoModelV3,
} from 'ntk-cms-api';
import { TreeModel } from 'ntk-cms-filemanager';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
import { EstatePropertyHistoryAddComponent } from './add.component';
import { CmsStoreService } from 'src/app/core/reducers/cmsStore.service';


@Component({
    selector: 'app-estate-property-history-add-mobile',
    templateUrl: './add.mobile.component.html',
    styleUrls: ['./add.mobile.component.scss'],
    standalone: false
})
export class EstatePropertyHistoryAddMobileComponent implements OnInit {
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EstatePropertyHistoryAddComponent>,
    public coreEnumService: CoreEnumService,
    public estatePropertyHistoryService: EstatePropertyHistoryService,
    public estateActivityTypeService: EstateActivityTypeService,
    private cmsToastrService: CmsToastrService,
    private cmsStoreService:CmsStoreService,
    public estateEnumService: EstateEnumService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    public tokenHelper: TokenHelper,
    public translate: TranslateService
  ) {
    this.publicHelper.processService.cdr = this.cdr;

    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;


    if (data) {
      this.dataModel.linkActivityTypeId = data.linkActivityTypeId;
      this.dataModel.linkPropertyId = data.linkPropertyId;
      this.dataModel.linkEstateExpertId = data.linkEstateExpertId;
      this.dataModel.linkCustomerOrderId = data.linkCustomerOrderId;
      this.dataModel.linkEstateAgencyId = data.linkEstateAgencyId;
    }
  }

  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();
  stepContent = 'title';
  selectFileTypeMainImage = ['jpg', 'jpeg', 'png'];
  fileManagerTree: TreeModel;
  appLanguage = 'fa';
  tokenInfo = new TokenInfoModelV3();

  dataModelResult: ErrorExceptionResult<EstatePropertyHistoryModel> =
    new ErrorExceptionResult<EstatePropertyHistoryModel>();
  dataModelActivityTypeResult: ErrorExceptionResult<EstateActivityTypeModel> =
    new ErrorExceptionResult<EstateActivityTypeModel>();
  dataModel: EstatePropertyHistoryModel = new EstatePropertyHistoryModel();
  dataFileModelFiles = new Map<number, string>();
  formInfo: FormInfoModel = new FormInfoModel();
  fileManagerOpenForm = false;
  date = new FormControl(new Date());
  dataModelEstateActivityStatusEnumResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();
  ngOnInit(): void {
    this.translate.get('TITLE.ADD').subscribe((str: string) => { this.formInfo.formTitle = str; });

    this.DataGetAccess();
    this.getEstateActivityStatusEnum();
  }

  getEstateActivityStatusEnum(): void {
    this.estateEnumService
      .ServiceEstateActivityStatusEnum()
      .subscribe({
        next: (ret) => {
          this.dataModelEstateActivityStatusEnumResult = ret;
        }
      });
  }

  DataGetAccess(): void {
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });
    this.estatePropertyHistoryService.ServiceViewModel().subscribe({
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
        this.publicHelper.processService.processStop(pName);
      },
    });
  }
  DataAddContent(): void {
          this.translate.get('MESSAGE.sending_information_to_the_server').subscribe((str: string) => {
        this.formInfo.formAlert = str;
      });
    this.formInfo.formError = '';

    if (this.dataFileModelFiles) {
      const keys = Array.from(this.dataFileModelFiles.keys());
      if (keys && keys.length > 0) {
        this.dataModel.linkFileIds = keys.join(',');
      }
    }

    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });

    this.estatePropertyHistoryService.ServiceAdd(this.dataModel).subscribe({
      next: (ret) => {
        this.dataModelResult = ret;
        if (ret.isSuccess) {
          this.translate.get('MESSAGE.registration_completed_successfully').subscribe((str: string) => {
            this.formInfo.formAlert = str;
          });
          this.cmsToastrService.typeSuccessAdd();
          this.dialogRef.close({ dialogChangedDate: true });
        } else {
          this.translate.get('ERRORMESSAGE.MESSAGE.typeError').subscribe((str: string) => {this.formInfo.formAlert = str });
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
      },
    });
  }

  DataGetAllActivityType(): void {
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });
    const filterModel = new FilterModel();
    this.estateActivityTypeService.ServiceGetAll(filterModel).subscribe({
      next: (ret) => {
        this.dataModelActivityTypeResult = ret;
        if (!ret.isSuccess) {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.publicHelper.processService.processStop(pName);
      },
      error: (er) => {
        this.cmsToastrService.typeError(er);
        this.publicHelper.processService.processStop(pName, false);
      },
    });
  }
  onActionSelectorSelect(model: EstateActivityTypeModel | null): void {
    if (!model || model.id.length <= 0) {
      this.translate.get(
        'MESSAGE.category_of_information_is_not_clear'
      ).subscribe((str: string) => {
        this.cmsToastrService.typeErrorSelected(str);
      });
      return;
    }
    this.dataModel.linkActivityTypeId = model.id;
  }

  onActionSelectorEstateUser(model: EstateAccountExpertModel | null): void {
    this.dataModel.linkEstateExpertId = null;
    if (model && model.id.length > 0) {
      this.dataModel.linkEstateExpertId = model.id;
    }
  }
  onActionSelectorEstateAgency(model: EstateAccountExpertModel | null): void {
    this.dataModel.linkEstateAgencyId = null;
    if (!model || !model.id || model.id.length <= 0) {
      return;
    }
    this.dataModel.linkEstateAgencyId = model.id;
  }
  onActionSelectorProperty(model: EstatePropertyModel | null): void {
    this.dataModel.linkPropertyId = null;
    if (model && model.id.length > 0) {
      this.dataModel.linkPropertyId = model.id;
    }
  }
  onActionSelectorCustomerOrderId(
    model: EstateCustomerOrderModel | null
  ): void {
    this.dataModel.linkCustomerOrderId = null;
    if (model && model.id.length > 0) {
      this.dataModel.linkCustomerOrderId = model.id;
    }
  }
  onFormSubmit(): void {
    this.formInfo.formSubmitAllow = false;
    this.DataAddContent();
  }
  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }
  onActoinSelectStepNext(step: string): void {
    this.stepContent = step;
  }
  onActoinSelectStepBefor(step: string): void {
    this.stepContent = step;
  }
}
