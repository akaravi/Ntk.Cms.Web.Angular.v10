import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import {
  CoreEnumService,
  CoreUserModel,
  DataFieldInfoModel,
  ErrorExceptionResult,
  CrmAccountModel,
  CrmAccountService,
  TokenInfoModelV3,
  CrmEnumService,
  InfoEnumModel } from "ntk-cms-api";
import { NodeInterface, TreeModel } from "ntk-cms-filemanager";
import { EditBaseComponent } from "src/app/core/cmsComponent/editBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

import { FormInfoModel } from "../../../../../core/models/formInfoModel";

/**
 * Component ویرایش Account در CRM.
 * این component فرم ویرایش Account موجود را نمایش می‌دهد.
 */
@Component({
  selector: "app-crm-account-edit",
  templateUrl: "./edit.component.html",
  standalone: false,
})
export class CrmAccountEditComponent
  extends EditBaseComponent<CrmAccountService, CrmAccountModel, string>
  implements OnInit
{
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CrmAccountEditComponent>,
    public coreEnumService: CoreEnumService,
    public crmAccountService: CrmAccountService,
    public crmEnumService: CrmEnumService,
    private cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    private cmsStoreService: CmsStoreService,
    public tokenHelper: TokenHelper,
    public translate: TranslateService,
  ) {
    super(crmAccountService, new CrmAccountModel(), publicHelper, translate);
    this.publicHelper.processService.cdr = this.cdr;
    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;
    if (data && data.id && data.id.length > 0) {
      this.requestId = data.id;
    }
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
  dataModelResult: ErrorExceptionResult<CrmAccountModel> =
    new ErrorExceptionResult<CrmAccountModel>();
  dataModel: CrmAccountModel = new CrmAccountModel();
  
  requestId = "";

  dataModelCrmAccountRatingEnumResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();
  dataModelCrmAccountTypeEnumResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();

  fileManagerOpenForm = false;

  ngOnInit(): void {
    if (this.requestId.length > 0) {
      this.DataGetOneContent();
    } else {
      this.cmsToastrService.typeErrorEditRowIsNull();
    }
    // Commented: Enum methods not available in API
    // this.getCrmAccountRatingEnum();
    // this.getCrmAccountTypeEnum();
  }

  /**
   * دریافت اطلاعات CrmAccountRatingEnum
   * Commented: Enum method not available in API
   */
  getCrmAccountRatingEnum(): void {
    // this.crmEnumService.ServiceCrmAccountRatingEnum().subscribe((res) => {
    //   this.dataModelCrmAccountRatingEnumResult = res;
    // });
  }

  /**
   * دریافت اطلاعات CrmAccountTypeEnum
   * Commented: Enum method not available in API
   */
  getCrmAccountTypeEnum(): void {
    // this.crmEnumService.ServiceCrmAccountTypeEnum().subscribe((res) => {
    //   this.dataModelCrmAccountTypeEnumResult = res;
    // });
  }

  DataGetOneContent(): void {
    this.translate.get("MESSAGE.Receiving_information").subscribe((str: string) => {
      this.formInfo.formTitle = str;
    });
    if (!this.requestId || this.requestId.length === 0) {
      this.cmsToastrService.typeErrorEditRowIsNull();
      return;
    }
    this.formInfo.submitButtonEnabled = false;
    const pName = this.constructor.name + "main";
    this.publicHelper.processService.processStart(
      pName,
      "",
      this.constructorInfoAreaId,
    );

    this.crmAccountService.ServiceGetOneById(this.requestId).subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
        this.dataModelResult = ret as ErrorExceptionResult<CrmAccountModel>;
        if (!ret.isSuccess) {
          this.formInfo.submitButtonEnabled = true;
          this.cmsToastrService.typeErrorEdit(ret.errorMessage);
        } else {
          this.dataModel = ret.item;
          if (ret.item) {
            this.formInfo.formTitle =
              this.formInfo.formTitle + " " + ret.item.name;
          }
          this.formInfo.submitButtonEnabled = true;
        }
        this.formInfo.submitButtonEnabled = true;
        this.publicHelper.processService.processStop(pName);
      },
      error: (er) => {
        this.formInfo.submitButtonEnabled = true;
        this.cmsToastrService.typeError(er);
        this.formInfo.submitButtonEnabled = true;
        this.publicHelper.processService.processStop(pName, false);
      },
    });
  }

  DataEditContent(): void {
    this.translate
      .get("MESSAGE.sending_information_to_the_server")
      .subscribe((str: string) => {
        this.formInfo.submitResultMessage = str;
      });
    this.formInfo.submitResultMessage = "";
    const pName = this.constructor.name + "main";
    this.publicHelper.processService.processStart(
      pName,
      "",
      this.constructorInfoAreaId,
    );

    this.crmAccountService.ServiceEdit(this.dataModel).subscribe({
      next: (ret) => {
        this.dataModelResult = ret as ErrorExceptionResult<CrmAccountModel>;
        if (ret.isSuccess) {
          this.translate
            .get("MESSAGE.registration_completed_successfully")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
            });
          this.cmsToastrService.typeSuccessEdit();
          this.dialogRef.close({ dialogChangedDate: true });
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

        this.formInfo.submitButtonEnabled = true;
      },
      error: (er) => {
        this.formInfo.submitButtonEnabled = true;
        this.cmsToastrService.typeError(er);
        this.publicHelper.processService.processStop(pName, false);
      },
    });
  }

  onActionFileSelected(model: NodeInterface): void {
    this.dataModel.linkMainImageId = model.id;
    this.dataModel.linkMainImageIdSrc = model.downloadLinksrc;
  }
  onActionSelectorUser(model: CoreUserModel | null): void {
    this.dataModel.linkAssignedUserId = null;
    if (model && model.id > 0) {
      this.dataModel.linkAssignedUserId = model.id;
    }
  }

  /**
   * متد انتخاب Parent Account
   * @param model - مدل Account انتخاب شده یا null
   */
  onActionSelectorParentAccount(model: CrmAccountModel | null): void {
    this.dataModel.linkParentAccountId = null;
    if (model && model.id) {
      this.dataModel.linkParentAccountId = model.id;
    }
  }
  onFormSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }
    this.formInfo.submitButtonEnabled = false;
    this.DataEditContent();
  }
  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }

  // Getters and setters for all optional properties (same as add component)
  get billStreet(): string { return (this.dataModel as any)?.billStreet || ''; }
  set billStreet(value: string) { (this.dataModel as any).billStreet = value; }

  get billCity(): string { return (this.dataModel as any)?.billCity || ''; }
  set billCity(value: string) { (this.dataModel as any).billCity = value; }

  get billState(): string { return (this.dataModel as any)?.billState || ''; }
  set billState(value: string) { (this.dataModel as any).billState = value; }

  get billPostalCode(): string { return (this.dataModel as any)?.billPostalCode || ''; }
  set billPostalCode(value: string) { (this.dataModel as any).billPostalCode = value; }

  get accountNo(): string { return (this.dataModel as any)?.accountNo || ''; }
  set accountNo(value: string) { (this.dataModel as any).accountNo = value; }

  get rating(): string { return (this.dataModel as any)?.rating || ''; }
  set rating(value: string) { (this.dataModel as any).rating = value; }

  get ownership(): string { return (this.dataModel as any)?.ownership || ''; }
  set ownership(value: string) { (this.dataModel as any).ownership = value; }

  get sicCode(): string { return (this.dataModel as any)?.sicCode || ''; }
  set sicCode(value: string) { (this.dataModel as any).sicCode = value; }

  get tickerSymbol(): string { return (this.dataModel as any)?.tickerSymbol || ''; }
  set tickerSymbol(value: string) { (this.dataModel as any).tickerSymbol = value; }

  get email2(): string { return (this.dataModel as any)?.email2 || ''; }
  set email2(value: string) { (this.dataModel as any).email2 = value; }

  get otherPhone(): string { return (this.dataModel as any)?.otherPhone || ''; }
  set otherPhone(value: string) { (this.dataModel as any).otherPhone = value; }

  get emailOptOut(): boolean { return (this.dataModel as any)?.emailOptOut || false; }
  set emailOptOut(value: boolean) { (this.dataModel as any).emailOptOut = value; }

  get notifyOwner(): boolean { return (this.dataModel as any)?.notifyOwner || false; }
  set notifyOwner(value: boolean) { (this.dataModel as any).notifyOwner = value; }

  get billCountry(): string { return (this.dataModel as any)?.billCountry || ''; }
  set billCountry(value: string) { (this.dataModel as any).billCountry = value; }

  get billPoBox(): string { return (this.dataModel as any)?.billPoBox || ''; }
  set billPoBox(value: string) { (this.dataModel as any).billPoBox = value; }

  get shipStreet(): string { return (this.dataModel as any)?.shipStreet || ''; }
  set shipStreet(value: string) { (this.dataModel as any).shipStreet = value; }

  get shipCity(): string { return (this.dataModel as any)?.shipCity || ''; }
  set shipCity(value: string) { (this.dataModel as any).shipCity = value; }

  get shipState(): string { return (this.dataModel as any)?.shipState || ''; }
  set shipState(value: string) { (this.dataModel as any).shipState = value; }

  get shipPostalCode(): string { return (this.dataModel as any)?.shipPostalCode || ''; }
  set shipPostalCode(value: string) { (this.dataModel as any).shipPostalCode = value; }

  get shipCountry(): string { return (this.dataModel as any)?.shipCountry || ''; }
  set shipCountry(value: string) { (this.dataModel as any).shipCountry = value; }

  get shipPoBox(): string { return (this.dataModel as any)?.shipPoBox || ''; }
  set shipPoBox(value: string) { (this.dataModel as any).shipPoBox = value; }
}
