
import {
  ChangeDetectorRef, Component, Inject, OnInit,
  ViewChild
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import {
  CoreEnumService, CoreSiteService, DataFieldInfoModel,
  DataProviderPlanModel, DataProviderPlanPriceModel,
  DataProviderPlanPriceService, ErrorExceptionResult,
  FormInfoModel
} from 'ntk-cms-api';
import { NodeInterface, TreeModel } from 'ntk-cms-filemanager';
import { AddBaseComponent } from 'src/app/core/cmsComponent/addBaseComponent';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';

@Component({
    selector: 'app-data-provider-plan-price-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss'],
    standalone: false
})
export class DataProviderPlanPriceAddComponent extends AddBaseComponent<DataProviderPlanPriceService, DataProviderPlanPriceModel, number> implements OnInit {
  requestLinkPlanId = 0;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DataProviderPlanPriceAddComponent>,
    public coreEnumService: CoreEnumService,
    public dataproviderplanpriceservice: DataProviderPlanPriceService,
    private cmsToastrService: CmsToastrService,
    private coreSiteService: CoreSiteService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
  ) {
    super(dataproviderplanpriceservice, new DataProviderPlanPriceModel(), publicHelper, translate);
    this.publicHelper.processService.cdr = this.cdr;
    if (data) {
      this.requestLinkPlanId = +data.linkPlanId || 0;
    }
    if (this.requestLinkPlanId > 0) {
      this.dataModel.linkPlanId = this.requestLinkPlanId;
    }
    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
  }
  @ViewChild('vform', { static: false }) formGroup: FormGroup;
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<string, DataFieldInfoModel>();
  currency = '';
  selectFileTypeMainImage = ['jpg', 'jpeg', 'png'];

  fileManagerTree: TreeModel;
  appLanguage = 'fa';

  dataModelResult: ErrorExceptionResult<DataProviderPlanPriceModel> = new ErrorExceptionResult<DataProviderPlanPriceModel>();
  dataModel: DataProviderPlanPriceModel = new DataProviderPlanPriceModel();


  formInfo: FormInfoModel = new FormInfoModel();


  fileManagerOpenForm = false;


  onActionFileSelected(model: NodeInterface): void {
    this.dataModel.linkMainImageId = model.id;
    this.dataModel.linkMainImageIdSrc = model.downloadLinksrc;

  }

  ngOnInit(): void {
    this.translate.get('TITLE.Register_New_Categories').subscribe((str: string) => {this.formInfo.formTitle = str });

    this.DataGetAccess();
    this.DataGetCurrency();
  }



  DataGetCurrency(): void {
    this.coreSiteService.ServiceGetCurrencyMaster().subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.currency = ret.item;
        } else {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
      },
      error: (er) => {
        this.cmsToastrService.typeError(er);
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


    this.dataproviderplanpriceservice.ServiceAdd(this.dataModel).subscribe({
      next: (ret) => {
        this.formInfo.formSubmitAllow = true;
        this.dataModelResult = ret;
        if (ret.isSuccess) {
          this.translate.get('MESSAGE.registration_completed_successfully').subscribe((str: string) => { this.formInfo.formAlert = str; });
          this.cmsToastrService.typeSuccessAdd();
          this.dialogRef.close({ dialogChangedDate: true });
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
  onActionSelectorSelect(model: DataProviderPlanModel | null): void {
    if (!model || model.id <= 0) {
      this.translate.get('MESSAGE.Information_plan_is_not_clear').subscribe((str: string) => {
        this.cmsToastrService.typeErrorSelected(str);
      });
      return;
    }
    this.dataModel.linkPlanId = model.id;
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
}
