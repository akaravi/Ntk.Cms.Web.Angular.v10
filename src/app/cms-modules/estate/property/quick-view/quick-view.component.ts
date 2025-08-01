
import {
  ChangeDetectorRef, Component, HostListener, Inject,
  OnDestroy, OnInit,
  ViewChild
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import {
  CoreEnumService, DataFieldInfoModel, ErrorExceptionResult, EstateContractModel, EstateContractTypeModel, EstateContractTypeService, EstatePropertyModel,
  EstatePropertyService, FormInfoModel, InputDataTypeEnum, ManageUserAccessDataTypesEnum, TokenInfoModelV3
} from 'ntk-cms-api';
import { Subscription } from 'rxjs';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
import { CmsStoreService } from 'src/app/core/reducers/cmsStore.service';


@Component({
  selector: 'app-estate-property-quick-view',
  templateUrl: './quick-view.component.html',
  standalone: false
})
export class EstatePropertyQuickViewComponent implements OnInit, OnDestroy {
  requestId = '';
  requestPerviousItem: any;
  requestNextItem: any;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EstatePropertyQuickViewComponent>,
    public coreEnumService: CoreEnumService,
    public estatePropertyService: EstatePropertyService,
    public estateContractTypeService: EstateContractTypeService,
    private cmsToastrService: CmsToastrService,
    private tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
    public translate: TranslateService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;

    if (data) {
      this.requestId = data.id + '';
      this.requestPerviousItem = data.perviousItem;
      this.requestNextItem = data.nextItem;

    }
  }

  @ViewChild('vform', { static: false }) formGroup: FormGroup;
  tokenInfo = new TokenInfoModelV3();

  dataModelResult: ErrorExceptionResult<EstatePropertyModel> = new ErrorExceptionResult<EstatePropertyModel>();
  dataModelEstateContractTypeResult: ErrorExceptionResult<EstateContractTypeModel> = new ErrorExceptionResult<EstateContractTypeModel>();
  dataModel: EstatePropertyModel = new EstatePropertyModel();
  formInfo: FormInfoModel = new FormInfoModel();
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<string, DataFieldInfoModel>();

  optionTabledataSource = new MatTableDataSource<EstateContractModel>();
  optionTabledisplayedColumns = ['LinkEstateContractTypeId', 'Price'];// 'SalePrice', 'DepositPrice', 'RentPrice', 'PeriodPrice'];
  fileManagerOpenForm = false;
  errorMessage: string = '';
  propertyTypeLanduse: string = '';
  contractType: string = '';
  propertyDetails: Map<string, string> = new Map<string, string>();
  enumInputDataType = InputDataTypeEnum;


  cmsApiStoreSubscribe: Subscription;
  ngOnInit(): void {
    this.translate.get('TITLE.QUICK_VIEW').subscribe((str: string) => {
      this.formInfo.formTitle = str;
    });
    if (this.requestId.length === 0) {
      this.cmsToastrService.typeErrorComponentAction();
      this.dialogRef.close({ dialogChangedDate: false });
      return;
    }
    this.DataGetOneContent();
    this.getEstateContractType();
    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;


    this.cmsApiStoreSubscribe = this.cmsStoreService.getState((state) => state.tokenInfoStore).subscribe(async (value) => {
      this.tokenInfo = value;
      this.getEstateContractType();
    });
  }

  ngOnDestroy(): void {
    if (this.cmsApiStoreSubscribe) {
      this.cmsApiStoreSubscribe.unsubscribe();
    }
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // 37 - left
    // 38 - up
    // 39 - right
    // 40 - down
    if (event?.key === '39' || event?.key === 'ArrowRight')
      this.onActionNext();
    if (event?.key === '37' || event?.key === 'ArrowLeft')
      this.onActionPervious();
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
      }, error: (er) => {
        this.publicHelper.processService.processStop(pName);
      }
    });

  }

  DataGetOneContent(): void {
    this.translate.get('MESSAGE.Receiving_Information_From_The_Server').subscribe((str: string) => { this.formInfo.formAlert = str; });
    this.formInfo.formError = '';
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });

    /*َAccess Field*/
    this.estatePropertyService.setAccessLoad();
    this.estatePropertyService.setAccessDataType(ManageUserAccessDataTypesEnum.Editor);
    this.estatePropertyService.ServiceGetOneById(this.requestId).subscribe({
      next: (ret) => {
        /*َAccess Field*/
        // this.dataAccessModel = next.access;
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
        this.dataModel = ret.item;
        this.propertyTypeLanduse = this.dataModel.propertyTypeLanduse?.titleML;
        if (ret.isSuccess) {
          this.optionTabledataSource.data = this.dataModel.contracts;

          this.formInfo.formTitle = this.formInfo.formTitle;
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
        } else {
          this.translate.get('ERRORMESSAGE.MESSAGE.typeError').subscribe((str: string) => { this.formInfo.formAlert = str; });
          this.formInfo.formError = ret.errorMessage;
          this.errorMessage = ret.errorMessage + '<br> ( ' + ret.errorTypeTitle + ' ) ';
          this.cmsToastrService.typeErrorMessage(this.errorMessage);
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
  setStep(index: number): void {
    this.step = index;
  }
  step = 0;
  nextStep(): void {
    this.step++;
  }

  prevStep(): void {
    this.step--;
  }

  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }
  onActionNext(): void {
    this.dialogRef.close({ dialogChangedDate: true, onActionOpenItem: this.requestNextItem });
  }
  onActionPervious(): void {
    this.dialogRef.close({ dialogChangedDate: true, onActionOpenItem: this.requestPerviousItem });
  }
}
