import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import {
  CoreEnumService,
  CoreLocationModel,
  DataFieldInfoModel,
  ErrorExceptionResult,
  EstateAccountExpertModel,
  EstateAccountExpertWorkAreaModel,
  EstateAccountExpertWorkAreaService,
  EstateEnumService,
  FormInfoModel,
  InfoEnumModel,
  TokenInfoModelV3,
} from "ntk-cms-api";
import { TreeModel } from "ntk-cms-filemanager";
import { AddBaseComponent } from "src/app/core/cmsComponent/addBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

@Component({
  selector: "app-estate-account-expert-work-area-add",
  templateUrl: "./add.component.html",

  standalone: false,
})
export class EstateAccountExpertWorkAreaAddComponent
  extends AddBaseComponent<
    EstateAccountExpertWorkAreaService,
    EstateAccountExpertWorkAreaModel,
    string
  >
  implements OnInit
{
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EstateAccountExpertWorkAreaAddComponent>,
    public coreEnumService: CoreEnumService,
    public estateEnumService: EstateEnumService,
    public estateAccountExpertWorkAreaService: EstateAccountExpertWorkAreaService,
    private cmsToastrService: CmsToastrService,
    private cmsStoreService: CmsStoreService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    public tokenHelper: TokenHelper,
    public translate: TranslateService,
  ) {
    super(
      estateAccountExpertWorkAreaService,
      new EstateAccountExpertWorkAreaModel(),
      publicHelper,
      translate,
    );
    this.publicHelper.processService.cdr = this.cdr;
    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
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
  dataModelResult: ErrorExceptionResult<EstateAccountExpertWorkAreaModel> =
    new ErrorExceptionResult<EstateAccountExpertWorkAreaModel>();
  dataModel: EstateAccountExpertWorkAreaModel =
    new EstateAccountExpertWorkAreaModel();
  formInfo: FormInfoModel = new FormInfoModel();

  dataModelEnumEstateUserTypeResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();

  fileManagerOpenForm = false;

  ngOnInit(): void {
    this.translate.get("TITLE.ADD").subscribe((str: string) => {
      this.formInfo.formTitle = str;
    });

    this.DataGetAccess();
    this.getEstateUserTypeEnum();
  }
  getEstateUserTypeEnum(): void {
    this.estateEnumService.ServiceEstateUserTypeEnum().subscribe({
      next: (ret) => {
        this.dataModelEnumEstateUserTypeResult = ret;
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

    this.estateAccountExpertWorkAreaService
      .ServiceAdd(this.dataModel)
      .subscribe({
        next: (ret) => {
          this.dataModelResult = ret;
          if (ret.isSuccess) {
            this.translate
              .get("MESSAGE.registration_completed_successfully")
              .subscribe((str: string) => {
                this.formInfo.submitResultMessage = str;
              });
            this.cmsToastrService.typeSuccessAdd();
            this.dialogRef.close({ dialogChangedDate: true });
          } else {
            this.translate
              .get("ERRORMESSAGE.MESSAGE.typeError")
              .subscribe((str: string) => {
                this.formInfo.submitResultMessage = str;
              });
            this.formInfo.submitResultMessage = ret.errorMessage;
            this.cmsToastrService.typeErrorMessage(ret.errorMessage);
          }
          this.publicHelper.processService.processStop(pName);

          this.formInfo.submitButtonEnabled = true;
        },
        error: (er) => {
          this.formInfo.submitButtonEnabled = true;
          this.cmsToastrService.typeError(er);
          this.publicHelper.processService.processStop(pName, false);
        },
      });
  }

  onActionSelectorAccountUser(model: EstateAccountExpertModel | null): void {
    this.dataModel.linkEstateExpertId = null;
    if (model && model.id?.length > 0) {
      this.dataModel.linkEstateExpertId = model.id;
    }
  }
  onActionSelectorLocation(model: CoreLocationModel | null): void {
    this.dataModel.linkCoreLocationId = null;
    if (model && model.id > 0) {
      this.dataModel.linkCoreLocationId = model.id;
    }
  }

  onFormSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }
    this.formInfo.submitButtonEnabled = false;
    this.DataAddContent();
  }
  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }
}
