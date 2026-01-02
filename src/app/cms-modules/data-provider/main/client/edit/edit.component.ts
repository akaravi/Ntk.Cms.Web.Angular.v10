import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
  CoreEnumService,
  DataProviderClientModel,
  DataProviderClientService,
  DataProviderPlanClientModel,
  DataProviderPlanClientService,
  DataProviderPlanModel,
  ErrorExceptionResultBase,
  FilterDataModel,
  FilterModel,
  ManageUserAccessDataTypesEnum,
} from "ntk-cms-api";
import { TreeModel } from "ntk-cms-filemanager";
import { Subscription } from "rxjs";
import { EditBaseComponent } from "src/app/core/cmsComponent/editBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";

@Component({
  selector: "app-data-provider-client-edit",
  templateUrl: "./edit.component.html",

  standalone: false,
})
export class DataProviderClientEditComponent
  extends EditBaseComponent<
    DataProviderClientService,
    DataProviderClientModel,
    string
  >
  implements OnInit, OnDestroy
{
  requestId = "";
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DataProviderClientEditComponent>,
    public coreEnumService: CoreEnumService,
    public dataProviderClientService: DataProviderClientService,
    private cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    private cmsStoreService: CmsStoreService,
    private router: Router,
    private cmsConfirmationDialogService: CmsConfirmationDialogService,
    private dataProviderPlanClientService: DataProviderPlanClientService,
    public translate: TranslateService,
    private tokenHelper: TokenHelper,
  ) {
    super(
      dataProviderClientService,
      new DataProviderClientModel(),
      publicHelper,
      translate,
    );

    this.publicHelper.processService.cdr = this.cdr;
    if (data) {
      this.requestId = data.id || "";
    }

    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();

    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;

    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.tokenInfoStore)
        .subscribe(async (value) => {
          this.tokenInfo = value;
        }),
    );
  }
  private unsubscribe: Subscription[] = [];

  @ViewChild("vform", { static: false }) formGroup: FormGroup;

  selectFileTypeMainImage = ["jpg", "jpeg", "png"];

  fileManagerTree: TreeModel;
  appLanguage = "fa";

  dataModelResult: ErrorExceptionResultBase = new ErrorExceptionResultBase();
  dataModel: DataProviderClientModel = new DataProviderClientModel();

  fileManagerOpenForm = false;

  ngOnInit(): void {
    if (this.requestId?.length > 0) {
      this.translate.get("TITLE.Edit_Categories").subscribe((str: string) => {
        this.formInfo.formTitle = str;
      });
      this.DataGetOneContent();
    } else {
      this.cmsToastrService.typeErrorComponentAction();
      this.dialogRef.close({ dialogChangedDate: false });
      return;
    }
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  DataGetOneContent(): void {
    if (this.requestId?.length === 0) {
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
    this.dataProviderClientService.setAccessLoad();
    this.dataProviderClientService.setAccessDataType(
      ManageUserAccessDataTypesEnum.Editor,
    );
    this.dataProviderClientService.ServiceGetOneById(this.requestId).subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);

        this.dataModel = ret.item;
        if (ret.isSuccess) {
          this.formInfo.formTitle =
            this.formInfo.formTitle + " " + ret.item.title;
          this.formInfo.submitResultMessage = "";
          this.formInfo.submitResultMessageType =
            this.formSubmitedStatusEnum.Success;
          this.DataGetAllPlanClient();
        } else {
          this.translate
            .get("ERRORMESSAGE.MESSAGE.typeError")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
            });
          this.formInfo.submitResultMessage = ret.errorMessage;
          this.formInfo.submitResultMessageType =
            this.formSubmitedStatusEnum.Error;
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

    this.dataProviderClientService.ServiceEdit(this.dataModel).subscribe({
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
          this.cmsToastrService.typeSuccessEdit();
          this.dialogRef.close({ dialogChangedDate: true });
        } else {
          this.translate
            .get("ERRORMESSAGE.MESSAGE.typeError")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
            });
          this.formInfo.submitResultMessage = ret.errorMessage;
          this.formInfo.submitResultMessageType =
            this.formSubmitedStatusEnum.Error;
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
  DataGetAllPlanClient(): void {
    if (this.requestId?.length === 0) {
      this.cmsToastrService.typeErrorEditRowIsNull();
      return;
    }

    this.translate
      .get("MESSAGE.Getting_access_category_from_the_server")
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

    const filteModelContent = new FilterModel();

    const filter = new FilterDataModel();
    filter.propertyName = "LinkClientId";
    filter.value = this.requestId;
    filteModelContent.filters.push(filter);

    this.dataProviderPlanClientService
      .ServiceGetAll(filteModelContent)
      .subscribe({
        next: (ret) => {
          this.dataCoreCpMainMenuCmsUserGroupModel = ret.listItems;
          const listG: string[] = [];
          this.dataCoreCpMainMenuCmsUserGroupModel.forEach((element) => {
            listG.push(element.linkPlanId.toString());
          });
          this.dataCoreCpMainMenuIds = listG;
          if (ret.isSuccess) {
            this.formInfo.submitResultMessage = "";
          } else {
            this.translate
              .get("ERRORMESSAGE.MESSAGE.typeError")
              .subscribe((str: string) => {
                this.formInfo.submitResultMessage = str;
              });
            this.formInfo.submitResultMessage = ret.errorMessage;
            this.formInfo.submitResultMessageType =
              this.formSubmitedStatusEnum.Error;
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
  dataCoreCpMainMenuModel: DataProviderPlanModel[];
  dataCoreCpMainMenuIds: string[] = [];
  dataCoreCpMainMenuCmsUserGroupModel: DataProviderPlanClientModel[];

  onActionSelectorPlanSelect(model: DataProviderPlanModel[]): void {
    this.dataCoreCpMainMenuModel = model;
  }
  onActionSelectorPlanSelectAdded(model: DataProviderPlanModel): void {
    if (!this.tokenInfo.access.userAccessAdminAllowToProfessionalData) {
      /** */
      const listG: string[] = [];
      this.dataCoreCpMainMenuIds.forEach((element) => {
        if (element != model.id) listG.push(element);
      });
      setTimeout(() => (this.dataCoreCpMainMenuIds = listG), 1000);
      /** */

      var title = "";
      var message = "";
      this.translate
        .get([
          "MESSAGE.Please_Confirm",
          "MESSAGE.Would_you_like_to_buy_this_content",
        ])
        .subscribe((str: string) => {
          title = str["MESSAGE.Please_Confirm"];
          message = str["MESSAGE.Would_you_like_to_buy_this_content"] + "?";
        });
      this.cmsConfirmationDialogService
        .confirm(title, message)
        .then((confirmed) => {
          if (confirmed) {
            const pName = this.constructor.name + "main";
            //منتقل شود به صفحه خرید
            this.router.navigate(["/data-provider/client-charge/", model.id]);
            this.dialogRef.close({ dialogChangedDate: false });
          }
        });
      return;
    }
    const entity = new DataProviderPlanClientModel();
    entity.linkPlanId = model.id;
    entity.linkClientId = this.dataModel.id;

    this.dataProviderPlanClientService.ServiceAdd(entity).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.translate
            .get("MESSAGE.registration_in_this_group_was_successful")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
            });
          this.cmsToastrService.typeSuccessEdit();
          // this.dialogRef.close({ dialogChangedDate: true });
        } else {
          this.translate
            .get("ERRORMESSAGE.MESSAGE.typeError")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
            });
          this.formInfo.submitResultMessage = ret.errorMessage;
          this.formInfo.submitResultMessageType =
            this.formSubmitedStatusEnum.Error;
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
          /** */
          const listG: string[] = [];
          this.dataCoreCpMainMenuIds.forEach((element) => {
            if (element != model.id) listG.push(element);
          });
          setTimeout(() => (this.dataCoreCpMainMenuIds = listG), 1000);
          /** */
        }
      },
      error: (er) => {
        this.formInfo.submitButtonEnabled = true;
        this.cmsToastrService.typeError(er);
      },
    });
  }
  onActionSelectorPlanSelectRemoved(model: DataProviderPlanModel): void {
    if (!this.tokenInfo.access.userAccessAdminAllowToProfessionalData) {
      /** */
      const listG: string[] = [];
      this.dataCoreCpMainMenuIds.forEach((element) => {
        listG.push(element);
      });
      if (listG.indexOf(model.id) < 0) listG.push(model.id);
      setTimeout(() => (this.dataCoreCpMainMenuIds = listG), 1000);
      /** */
      this.cmsToastrService.typeErrorAccessDelete();

      return;
    }
    const entity = new DataProviderPlanClientModel();
    entity.linkPlanId = model.id;
    entity.linkClientId = this.dataModel.id;

    this.dataProviderPlanClientService.ServiceDeleteEntity(entity).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.translate
            .get("MESSAGE.Deletion_from_this_group_Was_Successful")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
            });
          this.cmsToastrService.typeSuccessEdit();
        } else {
          /** */
          const listG: string[] = [];
          this.dataCoreCpMainMenuIds.forEach((element) => {
            listG.push(element);
          });
          if (listG.indexOf(model.id) < 0) listG.push(model.id);

          setTimeout(
            () => (this.dataCoreCpMainMenuIds = listG),
            1000,
          );
          /** */

          this.translate
            .get("ERRORMESSAGE.MESSAGE.typeError")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
            });
          this.formInfo.submitResultMessage = ret.errorMessage;
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
      },
      error: (er) => {
        this.formInfo.submitButtonEnabled = true;
        this.cmsToastrService.typeError(er);
      },
    });
  }
}
