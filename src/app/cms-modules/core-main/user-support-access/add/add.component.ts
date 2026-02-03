import { AddBaseComponent } from "./../../../../core/cmsComponent/addBaseComponent";


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
    CoreModuleEntityModel,
    CoreUserSupportAccessModel,
    CoreUserSupportAccessService,
    DataFieldInfoModel,
    ErrorExceptionResult, InfoEnumModel
} from "ntk-cms-api";
import { TreeModel } from "ntk-cms-filemanager";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

@Component({
  selector: "app-core-user-support-access-add",
  templateUrl: "./add.component.html",

  standalone: false,
})
export class CoreUserSupportAccessAddComponent
  extends AddBaseComponent<
    CoreUserSupportAccessService,
    CoreUserSupportAccessModel,
    number
  >
  implements OnInit
{
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CoreUserSupportAccessAddComponent>,
    public coreEnumService: CoreEnumService,
    public coreUserSupportAccessService: CoreUserSupportAccessService,
    public cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
  ) {
    super(
      coreUserSupportAccessService,
      new CoreUserSupportAccessModel(),
      publicHelper,
      translate,
    );
    this.publicHelper.processService.cdr = this.cdr;

    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
    if (data) {
      this.dataModel.linkSiteId = +data.linkSiteId || 0;
      this.dataModel.linkUserId = +data.linkUserId || 0;
      this.dataModel.moduleName = data.moduleName;
      this.dataModel.moduleEntityName = data.moduleEntityName;
    }
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();

  fileManagerTree: TreeModel;
  appLanguage = "fa";

  dataModelResult: ErrorExceptionResult<CoreUserSupportAccessModel> =
    new ErrorExceptionResult<CoreUserSupportAccessModel>();
  dataModel: CoreUserSupportAccessModel = new CoreUserSupportAccessModel();


  dataModelEnumManageUserAccessUserTypesResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();

  fileManagerOpenForm = false;

  ngOnInit(): void {
    this.translate.get("TITLE.ADD").subscribe((str: string) => {
      this.formInfo.formTitle = str;
    });
    this.getEnumManageUserAccessUserTypes();
    this.DataGetAccess();
  }

  getEnumManageUserAccessUserTypes(): void {
    this.coreEnumService.ServiceManageUserAccessUserTypesEnum().subscribe({
      next: (ret) => {
        this.dataModelEnumManageUserAccessUserTypesResult = ret;
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

    this.coreUserSupportAccessService.ServiceAdd(this.dataModel).subscribe({
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
  onActionSelectorModuleEntitySelect(model: CoreModuleEntityModel): void {
    this.dataModel.moduleName = "";
    this.dataModel.moduleEntityName = "";
    if (model && model.id > 0) {
      this.dataModel.moduleName = model.moduleName;
      this.dataModel.moduleEntityName = model.moduleEntityName;
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
