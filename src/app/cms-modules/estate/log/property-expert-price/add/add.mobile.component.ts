import {
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
    CoreCurrencyModel,
    CoreEnumService,
    CoreLocationModel,
    DataFieldInfoModel,
    ErrorExceptionResult,
    EstateContractTypeModel,
    EstateEnumService,
    EstatePropertyExpertPriceModel,
    EstatePropertyExpertPriceService,
    EstatePropertyTypeLanduseModel,
    EstatePropertyTypeUsageModel,
    InfoEnumModel,
    TokenInfoModelV3
} from "ntk-cms-api";
import { TreeModel } from "ntk-cms-filemanager";
import { AddBaseComponent } from "src/app/core/cmsComponent/addBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";


@Component({
  selector: "app-estate-property-expert-price-add-mobile",
  templateUrl: "./add.mobile.component.html",
  styleUrls: ["./add.mobile.component.scss"],
  standalone: false,
})
export class EstatePropertyExpertPriceAddMobileComponent
  extends AddBaseComponent<
    EstatePropertyExpertPriceService,
    EstatePropertyExpertPriceModel,
    string
  >
  implements OnInit
{
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public coreEnumService: CoreEnumService,
    public estatePropertyExpertPriceService: EstatePropertyExpertPriceService,
    public cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    private estateEnumService: EstateEnumService,
    private cmsStoreService: CmsStoreService,
    public tokenHelper: TokenHelper,
    public translate: TranslateService,
  ) {
    super(
      estatePropertyExpertPriceService,
      new EstatePropertyExpertPriceModel(),
      publicHelper,
      translate,
    );
    this.publicHelper.processService.cdr = this.cdr;
    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();

  selectFileTypeMainImage = ["jpg", "jpeg", "png"];

  fileManagerTree: TreeModel;
  appLanguage = "fa";
  tokenInfo = new TokenInfoModelV3();
  dataModelResult: ErrorExceptionResult<EstatePropertyExpertPriceModel> =
    new ErrorExceptionResult<EstatePropertyExpertPriceModel>();
  dataModel: EstatePropertyExpertPriceModel =
    new EstatePropertyExpertPriceModel();
  dataModelEstatePropertyExpertPriceTypeEnumResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();


  PropertyTypeSelected = new EstatePropertyTypeLanduseModel();
  dataModelCorCurrencySelector = new CoreCurrencyModel();
  contractTypeSelected: EstateContractTypeModel;
  fileManagerOpenForm = false;

  ngOnInit(): void {
    this.translate
      .get("TITLE.Register_New_Categories")
      .subscribe((str: string) => {
        this.formInfo.formTitle = str;
      });

    this.getEstatePropertyExpertPriceTypeEnum();
    this.DataGetAccess();
  }

  getEstatePropertyExpertPriceTypeEnum(): void {
    this.estateEnumService
      .ServiceEstatePropertyExpertPriceTypeEnum()
      .subscribe({
        next: (ret) => {
          this.dataModelEstatePropertyExpertPriceTypeEnumResult = ret;
        },
      });
  }

  DataAddContent(): void {
    this.translate
      .get("MESSAGE.sending_information_to_the_server")
      .subscribe((str: string) => {
        this.formInfo.submitResultMessage = str;
      });
    this.formInfo.submitResultMessage = "";
    const pName = this.constructor.name + "main";
    this.translate
      .get("MESSAGE.Receiving_information")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });

    this.estatePropertyExpertPriceService.ServiceAdd(this.dataModel).subscribe({
      next: (ret) => {
        this.formInfo.submitButtonEnabled = true;
        this.dataModelResult = ret;
        if (ret.isSuccess) {
          this.translate
            .get("MESSAGE.registration_completed_successfully")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
            });
          this.cmsToastrService.typeSuccessAdd();
          this.onActionBackToParent();
        } else {
          this.translate
            .get("ERRORMESSAGE.MESSAGE.typeError")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
            });
          this.formInfo.submitResultMessage = ret.errorMessage;
          this.formInfo.submitResultMessageType = this.formSubmitedStatusEnum.Error;
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.publicHelper.processService.processStop(pName);
      },
      error: (er) => {
        this.formInfo.submitButtonEnabled = true;
        this.cmsToastrService.typeError(er);
        this.publicHelper.processService.processStop(pName, false);
      },
    });
  }

  onActionSelectorLocation(model: CoreLocationModel | null): void {
    this.dataModel.linkLocationId = null;
    if (model && model.id > 0) {
      this.dataModel.linkLocationId = model.id;
    }
  }

  onActionSelectCurrency(model: CoreCurrencyModel): void {
    if (!model || model.id <= 0) {
      this.dataModelCorCurrencySelector = null;
      this.dataModel.linkCoreCurrencyId = null;
      return;
    }
    this.dataModelCorCurrencySelector = model;
    this.dataModel.linkCoreCurrencyId = model.id;
  }

  onActionSelectorContarctType(model: EstateContractTypeModel | null): void {
    this.dataModel.linkContractTypeId = null;
    this.contractTypeSelected = null;
    if (!model || !model.id || model.id.length <= 0) {
      this.translate
        .get("MESSAGE.Type_of_property_transaction_is_not_known")
        .subscribe((str: string) => {
          this.cmsToastrService.typeWarningSelected(str);
        });
      return;
    }
    this.contractTypeSelected = model;
    this.dataModel.linkContractTypeId = model.id;
    this.dataModel.rentPriceMin = 0;
    this.dataModel.rentPriceMax = 0;
    this.dataModel.rentPriceAverage = 0;
    this.dataModel.salePriceMin = 0;
    this.dataModel.salePriceMax = 0;
    this.dataModel.salePriceAverage = 0;
    this.dataModel.depositPriceMin = 0;
    this.dataModel.depositPriceMax = 0;
    this.dataModel.depositPriceAverage = 0;
    this.dataModel.periodPriceMin = 0;
    this.dataModel.periodPriceMax = 0;
    this.dataModel.periodPriceAverage = 0;
  }

  onActionSelectorSelectUsage(model: EstatePropertyTypeUsageModel | null): void {
    this.dataModel.linkPropertyTypeUsageId = null;
    if (model && model.id && model.id.length > 0) {
      this.dataModel.linkPropertyTypeUsageId = model.id;
    }
  }

  onActionSelectorSelectLanduse(
    model: EstatePropertyTypeLanduseModel | null,
  ): void {
    this.dataModel.linkPropertyTypeLanduseId = null;
    if (model && model.id && model.id.length > 0) {
      this.dataModel.linkPropertyTypeLanduseId = model.id;
      this.PropertyTypeSelected = model;
    }
  }

  onFormSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }
    this.formInfo.submitButtonEnabled = false;
    this.DataAddContent();
  }
  onActionBackToParent(): void {
    this.router.navigate(["/estate/log/expert-price"]);
  }
}
