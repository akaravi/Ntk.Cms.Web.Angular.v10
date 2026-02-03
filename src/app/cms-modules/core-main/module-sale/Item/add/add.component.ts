import {
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit,
    ViewChild
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import {
    CoreEnumService,
    CoreModuleModel,
    CoreModuleSaleHeaderModel,
    CoreModuleSaleItemModel,
    CoreModuleSaleItemService,
    DataFieldInfoModel,
    ErrorExceptionResult, InfoEnumModel
} from "ntk-cms-api";
import { TreeModel } from "ntk-cms-filemanager";
import { AddBaseComponent } from "src/app/core/cmsComponent/addBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";


@Component({
  selector: "app-core-modulesaleitem-add",
  templateUrl: "./add.component.html",

  standalone: false,
})
export class CoreModuleSaleItemAddComponent
  extends AddBaseComponent<
    CoreModuleSaleItemService,
    CoreModuleSaleItemModel,
    number
  >
  implements OnInit
{
  requestLinkModuleSaleHeader = 0;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CoreModuleSaleItemAddComponent>,
    public coreEnumService: CoreEnumService,
    public coreModuleSaleItemService: CoreModuleSaleItemService,
    public publicHelper: PublicHelper,
    public cmsToastrService: CmsToastrService,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
  ) {
    super(
      coreModuleSaleItemService,
      new CoreModuleSaleItemModel(),
      publicHelper,
      translate,
    );
    this.publicHelper.processService.cdr = this.cdr;

    if (data) {
      this.requestLinkModuleSaleHeader = +data.linkModuleSaleHeader || 0;
    }
    if (this.requestLinkModuleSaleHeader > 0) {
      this.dataModel.linkModuleSaleHeader = this.requestLinkModuleSaleHeader;
    }

    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
  }
  selectFileTypeMainImage = ["jpg", "jpeg", "png"];

  fileManagerTree: TreeModel;
  appLanguage = "fa";

  dataModelResult: ErrorExceptionResult<CoreModuleSaleItemModel> =
    new ErrorExceptionResult<CoreModuleSaleItemModel>();
  dataModel: CoreModuleSaleItemModel = new CoreModuleSaleItemModel();
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();

  @ViewChild("vform", { static: false }) formGroup: FormGroup;


  dataModelEnumCmsModuleSaleItemTypeResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();

  fileManagerOpenForm = false;

  ngOnInit(): void {
    this.translate.get("TITLE.ADD").subscribe((str: string) => {
      this.formInfo.formTitle = str;
    });

    this.DataGetAccess();
    this.getEnumCmsModuleSaleItemType();
  }
  getEnumCmsModuleSaleItemType(): void {
    this.coreEnumService.ServiceCmsModuleSaleItemTypeEnum().subscribe({
      next: (ret) => {
        this.dataModelEnumCmsModuleSaleItemTypeResult = ret;
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

    this.coreModuleSaleItemService.ServiceAdd(this.dataModel).subscribe({
      next: (ret) => {
        this.formInfo.submitButtonEnabled = true;
        this.dataModelResult = ret;
        if (ret.isSuccess) {
          this.translate
            .get("MESSAGE.registration_completed_successfully")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
          this.formInfo.submitResultMessageType = this.formSubmitedStatusEnum.Success;
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
  onActionSelectModule(model: CoreModuleModel | null): void {
    if (!model || model.id <= 0) {
      this.translate
        .get([
          "MESSAGE.Specify_the_module",
          "MESSAGE.Information_module_is_not_clear",
        ])
        .subscribe((str: any) => {
          this.cmsToastrService.typeErrorMessage(
            str["MESSAGE.Specify_the_module"],
            str["MESSAGE.Information_module_is_not_clear"],
          );
        });
      return;
    }
    this.dataModel.linkModuleId = model.id;
  }
  onActionSelectHeader(model: CoreModuleSaleHeaderModel | null): void {
    if (!model || model.id <= 0) {
      this.translate
        .get([
          "MESSAGE.Specify_the_category",
          "MESSAGE.category_of_information_is_not_clear",
        ])
        .subscribe((str: any) => {
          this.cmsToastrService.typeErrorMessage(
            str["MESSAGE.Specify_the_category"],
            str["MESSAGE.category_of_information_is_not_clear"],
          );
        });
      return;
    }
    this.dataModel.linkModuleSaleHeader = model.id;
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
