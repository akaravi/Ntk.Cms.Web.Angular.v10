import { FormInfoModel } from "../../../../../core/models/formInfoModel";

import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import {CoreEnumService,
  ErrorExceptionResultBase,ManageUserAccessDataTypesEnum,
  DataProviderSourcePublicConfigModel,
  DataProviderSourcePublicConfigService} from "ntk-cms-api";
import { NodeInterface, TreeModel } from "ntk-cms-filemanager";
import { EditBaseComponent } from "src/app/core/cmsComponent/editBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
@Component({
  selector: "app-data-provider-source-public-config-edit",
  templateUrl: "./edit.component.html",
  standalone: false,
})
export class DataProviderSourcePublicConfigEditComponent
  extends EditBaseComponent<
    DataProviderSourcePublicConfigService,
    DataProviderSourcePublicConfigModel,
    number
  >
  implements OnInit
{
  requestId = 0;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DataProviderSourcePublicConfigEditComponent>,
    public coreEnumService: CoreEnumService,
    public dataProviderSourcePublicConfigService: DataProviderSourcePublicConfigService,
    private cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
  ) {
    super(
      dataProviderSourcePublicConfigService,
      new DataProviderSourcePublicConfigModel(),
      publicHelper,
      translate,
    );

    this.publicHelper.processService.cdr = this.cdr;
    if (data && data.id) {
      this.requestId = data.id;
    }

    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;

  selectFileTypeMainImage = ["jpg", "jpeg", "png"];

  fileManagerTree: TreeModel;
  appLanguage = "fa";

  dataModelResult: ErrorExceptionResultBase = new ErrorExceptionResultBase();
  dataModel: DataProviderSourcePublicConfigModel = new DataProviderSourcePublicConfigModel();

  
  fileManagerOpenForm = false;

  ngOnInit(): void {
    if (this.requestId > 0) {
      this.translate.get("TITLE.Edit").subscribe((str: string) => {
        this.formInfo.formTitle = str;
      });
    } else {
      this.cmsToastrService.typeErrorComponentAction();
      this.dialogRef.close({ dialogChangedDate: false });
      return;
    }
    this.DataGetOneContent();
  }

  DataGetOneContent(): void {
    if (this.requestId <= 0) {
      this.cmsToastrService.typeErrorEditRowIsNull();
      return;
    }

    this.translate
      .get("MESSAGE.Receiving_Information_From_The_Server")
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

    this.dataProviderSourcePublicConfigService.setAccessLoad();
    this.dataProviderSourcePublicConfigService.setAccessDataType(
      ManageUserAccessDataTypesEnum.Editor,
    );
    this.dataProviderSourcePublicConfigService
      .ServiceGetOneById(this.requestId)
      .subscribe({
        next: (ret) => {
          this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
          this.dataModel = ret.item;
          if (ret.isSuccess) {
            this.formInfo.formTitle =
              this.formInfo.formTitle + " " + ret.item.title;
            this.formInfo.submitResultMessage = "";
          this.formInfo.submitResultMessageType = this.formSubmitedStatusEnum.Success;
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
          this.cmsToastrService.typeError(er);
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
    this.translate
      .get("MESSAGE.sending_information_to_the_server")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });

    this.dataProviderSourcePublicConfigService.ServiceEdit(this.dataModel).subscribe({
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
}

