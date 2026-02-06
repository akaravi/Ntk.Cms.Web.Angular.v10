import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import {
  CoreEnumService,
  DataProviderClientApplicationModel,
  DataProviderClientApplicationPermissionModel,
  DataProviderClientApplicationPermissionService,
  DataProviderClientApplicationService,
  DataProviderSourcePathModel,
  DataProviderSourcePathService,
  ErrorExceptionResult,
  ErrorExceptionResultBase,
  FilterDataModel,
  FilterModel,
  ManageUserAccessDataTypesEnum,
  SortTypeEnum
} from "ntk-cms-api";
import { TreeModel } from "ntk-cms-filemanager";
import { Subscription } from "rxjs";
import { EditBaseComponent } from "src/app/core/cmsComponent/editBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
import { CmsConfirmationDialogService } from "src/app/shared/cms-confirmation-dialog/cmsConfirmationDialog.service";
import { DatapickerHeaderComponent } from "src/app/shared/datapicker-header/datapicker-header.component";
import { environment } from "src/environments/environment";
import { DataProviderClientApplicationPermissionAddComponent } from "../../client-application-permission/add/add.component";
import { DataProviderClientApplicationPermissionEditComponent } from "../../client-application-permission/edit/edit.component";

@Component({
  selector: "app-data-provider-client-application-edit",
  templateUrl: "./edit.component.html",
  standalone: false,
})
export class DataProviderClientApplicationEditComponent
  extends EditBaseComponent<
    DataProviderClientApplicationService,
    DataProviderClientApplicationModel,
    string
  >
  implements OnInit, OnDestroy
{
  requestId = "";
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DataProviderClientApplicationEditComponent>,
    public coreEnumService: CoreEnumService,
    public dataProviderClientApplicationService: DataProviderClientApplicationService,
    public dataProviderSourcePathService: DataProviderSourcePathService,
    public dataProviderClientApplicationPermissionService: DataProviderClientApplicationPermissionService,
    private cmsConfirmationDialogService: CmsConfirmationDialogService,
         public cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    private cmsStoreService: CmsStoreService,
    public translate: TranslateService,
    public tokenHelper: TokenHelper,
    public dialog: MatDialog,
  ) {
    super(
      dataProviderClientApplicationService,
      new DataProviderClientApplicationModel(),
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
  dataModel: DataProviderClientApplicationModel =
    new DataProviderClientApplicationModel();

  fileManagerOpenForm = false;
  firewallAllowIPInput = "";
  datapickerHeader = DatapickerHeaderComponent;

  // Permissions
  permissionDataModelResult: ErrorExceptionResult<DataProviderClientApplicationPermissionModel> =
    new ErrorExceptionResult<DataProviderClientApplicationPermissionModel>();
  permissionTableData: DataProviderClientApplicationPermissionModel[] = [];
  permissionTableRowSelected: DataProviderClientApplicationPermissionModel =
    new DataProviderClientApplicationPermissionModel();
  permissionFilterModel = new FilterModel();
  permissionLoading = false;

  // Source Paths for Permissions
  sourcePathList: DataProviderSourcePathModel[] = [];
  sourcePathListLoading = false;
  sourcePathPermissionMap: Map<
    string,
    DataProviderClientApplicationPermissionModel
  > = new Map();
  permissionChanges: DataProviderClientApplicationPermissionModel[] = [];

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
    this.dataProviderClientApplicationService.setAccessLoad();
    this.dataProviderClientApplicationService.setAccessDataType(
      ManageUserAccessDataTypesEnum.Editor,
    );
    this.dataProviderClientApplicationService
      .ServiceGetOneById(this.requestId)
      .subscribe({
        next: (ret) => {
          this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);

          this.dataModel = ret.item;
          // Always initialize firewallAllowIPList as empty array first
          this.dataModel.firewallAllowIPList = [];
          // Sync firewallAllowIP (comma separated string) with firewallAllowIPList
          if (
            this.dataModel.firewallAllowIP &&
            this.dataModel.firewallAllowIP.length > 0
          ) {
            const ips = this.dataModel.firewallAllowIP
              .split(",")
              .map((ip) => ip.trim())
              .filter((ip) => ip.length > 0);
            // Create new array to trigger change detection
            this.dataModel.firewallAllowIPList = [...ips];
          }
          if (ret.isSuccess) {
            this.DataGetAllSourcePaths(); // Load Source Paths first
            this.DataGetAllPermission(); // Then load permissions
            this.formInfo.formTitle =
              this.formInfo.formTitle + " " + ret.item.id;
            this.formInfo.submitResultMessage = "";
            this.formInfo.submitResultMessageType =
              this.formSubmitedStatusEnum.Success;
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

  /** Sync firewallAllowIP (string) from firewallAllowIPList (string[]) before submit */
  private syncFirewallAllowIPFromList(): void {
    if (
      this.dataModel.firewallAllowIPList &&
      this.dataModel.firewallAllowIPList.length > 0
    ) {
      this.dataModel.firewallAllowIP =
        this.dataModel.firewallAllowIPList.join(",");
    } else {
      this.dataModel.firewallAllowIP = "";
    }
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

    // Ensure firewallAllowIP is synced from firewallAllowIPList before send to API
    this.syncFirewallAllowIPFromList();

    this.dataProviderClientApplicationService
      .ServiceEdit(this.dataModel)
      .subscribe({
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

  onActionSelectorUser(model: any): void {
    if (!model || !model.id) {
      this.dataModel.linkCoreUserId = null;
      return;
    }
    this.dataModel.linkCoreUserId = model.id;
  }

  onActionSelectorSite(model: any): void {
    if (!model || !model.id) {
      this.dataModel.linkSiteId = null;
      return;
    }
    this.dataModel.linkSiteId = model.id;
  }

  /**
   * Validate IP address format (single IP, CIDR, or IP range)
   */
  private validateIPFormat(ip: string): boolean {
    if (!ip || ip.trim().length === 0) {
      return false;
    }

    // Single IPv4 address: 192.168.1.1
    const singleIPRegex = /^(\d{1,3}\.){3}\d{1,3}$/;

    // CIDR notation: 192.168.1.0/24
    const cidrRegex = /^(\d{1,3}\.){3}\d{1,3}\/\d{1,2}$/;

    // IP range: 192.168.1.1-192.168.1.10
    const rangeRegex = /^(\d{1,3}\.){3}\d{1,3}-(\d{1,3}\.){3}\d{1,3}$/;

    if (singleIPRegex.test(ip)) {
      // Validate each octet is between 0-255
      const parts = ip.split(".");
      return parts.every(
        (part) => parseInt(part, 10) >= 0 && parseInt(part, 10) <= 255,
      );
    }

    if (cidrRegex.test(ip)) {
      const [address, prefix] = ip.split("/");
      const prefixNum = parseInt(prefix, 10);
      if (prefixNum < 0 || prefixNum > 32) {
        return false;
      }
      const parts = address.split(".");
      return parts.every(
        (part) => parseInt(part, 10) >= 0 && parseInt(part, 10) <= 255,
      );
    }

    if (rangeRegex.test(ip)) {
      const [startIP, endIP] = ip.split("-");
      const startParts = startIP.split(".");
      const endParts = endIP.split(".");
      const startValid = startParts.every(
        (part) => parseInt(part, 10) >= 0 && parseInt(part, 10) <= 255,
      );
      const endValid = endParts.every(
        (part) => parseInt(part, 10) >= 0 && parseInt(part, 10) <= 255,
      );
      return startValid && endValid;
    }

    return false;
  }

  onActionAddFirewallIP(): void {
    if (
      !this.firewallAllowIPInput ||
      this.firewallAllowIPInput.trim().length === 0
    ) {
      return;
    }

    const ip = this.firewallAllowIPInput.trim();

    // Validate IP format
    if (!this.validateIPFormat(ip)) {
      this.translate
        .get("ERRORMESSAGE.MESSAGE.Invalid_IP_Format")
        .subscribe((str: string) => {
          this.cmsToastrService.typeErrorMessage(str || "Invalid IP format");
        });
      return;
    }

    if (!this.dataModel.firewallAllowIPList) {
      this.dataModel.firewallAllowIPList = [];
    }

    if (!this.dataModel.firewallAllowIPList.includes(ip)) {
      // Create new array to trigger change detection
      this.dataModel.firewallAllowIPList = [
        ...this.dataModel.firewallAllowIPList,
        ip,
      ];
    }
    // Update firewallAllowIP field with the first IP or join all IPs
    if (this.dataModel.firewallAllowIPList.length > 0) {
      this.dataModel.firewallAllowIP =
        this.dataModel.firewallAllowIPList.join(",");
    }
    this.firewallAllowIPInput = "";
  }

  onActionRemoveFirewallIP(ip: string): void {
    if (!this.dataModel.firewallAllowIPList) {
      return;
    }
    const index = this.dataModel.firewallAllowIPList.indexOf(ip);
    if (index > -1) {
      // Create new array to trigger change detection
      this.dataModel.firewallAllowIPList =
        this.dataModel.firewallAllowIPList.filter((item) => item !== ip);
    }
    // Update firewallAllowIP field
    if (this.dataModel.firewallAllowIPList.length > 0) {
      this.dataModel.firewallAllowIP =
        this.dataModel.firewallAllowIPList.join(",");
    } else {
      this.dataModel.firewallAllowIP = "";
    }
  }

  // Permission Management
  DataGetAllPermission(): void {
    if (!this.requestId || this.requestId.length === 0) {
      return;
    }

    this.permissionLoading = true;
    this.permissionFilterModel.filters = [];
    const filter = new FilterDataModel();
    filter.propertyName = "LinkClientApplicationId";
    filter.value = this.requestId;
    this.permissionFilterModel.filters.push(filter);

    this.permissionFilterModel.sortColumn = "id";
    this.permissionFilterModel.sortType = SortTypeEnum.Descending;

    this.dataProviderClientApplicationPermissionService
      .ServiceGetAll(this.permissionFilterModel)
      .subscribe({
        next: (ret) => {
          this.permissionLoading = false;
          this.permissionDataModelResult = ret;
          if (ret.isSuccess) {
            this.permissionTableData = ret.listItems || [];
            // Sync Source Paths with Permissions
            this.syncSourcePathsWithPermissions();
          } else {
            this.cmsToastrService.typeErrorMessage(ret.errorMessage);
          }
        },
        error: (er) => {
          this.permissionLoading = false;
          this.cmsToastrService.typeError(er);
        },
      });
  }

  // Get Source Paths List
  DataGetAllSourcePaths(): void {
    this.sourcePathListLoading = true;
    const filterModel = new FilterModel();
    filterModel.rowPerPage = 1000; // Get all source paths
    filterModel.accessLoad = true;

    this.dataProviderSourcePathService
      .ServiceGetAllEditor(filterModel)
      .subscribe({
        next: (ret) => {
          this.sourcePathListLoading = false;
          if (ret.isSuccess) {
            this.sourcePathList = ret.listItems || [];
            // Sync Source Paths with Permissions
            this.syncSourcePathsWithPermissions();
          } else {
            this.cmsToastrService.typeErrorMessage(ret.errorMessage);
          }
        },
        error: (er) => {
          this.sourcePathListLoading = false;
          this.cmsToastrService.typeError(er);
        },
      });
  }

  // Sync Source Paths with Permissions
  syncSourcePathsWithPermissions(): void {
    this.sourcePathPermissionMap.clear();

    // Create map of existing permissions by Source Path ID
    this.permissionTableData.forEach((permission) => {
      if (permission.linkSourcePathId) {
        this.sourcePathPermissionMap.set(
          permission.linkSourcePathId,
          permission,
        );
      }
    });

    // Create permission objects for Source Paths that don't have permissions yet
    this.sourcePathList.forEach((sourcePath) => {
      if (!this.sourcePathPermissionMap.has(sourcePath.id)) {
        const newPermission =
          new DataProviderClientApplicationPermissionModel();
        newPermission.linkClientApplicationId = this.requestId;
        newPermission.linkSourcePathId = sourcePath.id;
        newPermission.isRequested = false;
        newPermission.isApproved = null;
        this.sourcePathPermissionMap.set(sourcePath.id, newPermission);
      }
    });
  }

  // Get Permission for Source Path
  getPermissionForSourcePath(
    sourcePathId: string,
  ): DataProviderClientApplicationPermissionModel {
    return (
      this.sourcePathPermissionMap.get(sourcePathId) ||
      new DataProviderClientApplicationPermissionModel()
    );
  }

  // Toggle isApproved checkbox (three-state: null -> true -> false -> null)
  onToggleIsApproved(
    permission: DataProviderClientApplicationPermissionModel,
  ): void {
    if (permission.isApproved === null) {
      permission.isApproved = true;
    } else if (permission.isApproved === true) {
      permission.isApproved = false;
    } else {
      permission.isApproved = null;
    }
  }

  // Save Permission Changes
  onActionSavePermissionChanges(): void {
    if (!this.requestId || this.requestId.length === 0) {
      return;
    }

    const permissionsToSave: DataProviderClientApplicationPermissionModel[] =
      [];

    this.sourcePathPermissionMap.forEach((permission) => {
      if (permission.linkSourcePathId) {
        permissionsToSave.push(permission);
      }
    });

    if (permissionsToSave.length === 0) {
      this.translate.get("MESSAGE.no_information").subscribe((str: string) => {
        this.cmsToastrService.typeWarningMessage(str);
      });
      return;
    }

    const pName = this.constructor.name + "onActionSavePermissionChanges";
    this.translate
      .get("MESSAGE.sending_information_to_the_server")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });

    // Save each permission
    let savedCount = 0;
    let errorCount = 0;
    const totalCount = permissionsToSave.length;

    permissionsToSave.forEach((permission) => {
      if (permission.id && permission.id.length > 0) {
        // Update existing permission
        this.dataProviderClientApplicationPermissionService
          .ServiceEdit(permission)
          .subscribe({
            next: (ret) => {
              savedCount++;
              if (savedCount + errorCount === totalCount) {
                this.publicHelper.processService.processStop(pName);
                if (errorCount === 0) {
                  this.cmsToastrService.typeSuccessEdit();
                  this.DataGetAllPermission();
                }
              }
            },
            error: (er) => {
              errorCount++;
              this.cmsToastrService.typeError(er);
              if (savedCount + errorCount === totalCount) {
                this.publicHelper.processService.processStop(pName, false);
              }
            },
          });
      } else if (permission.isRequested) {
        // Create new permission only if isRequested is true
        this.dataProviderClientApplicationPermissionService
          .ServiceAdd(permission)
          .subscribe({
            next: (ret) => {
              savedCount++;
              if (savedCount + errorCount === totalCount) {
                this.publicHelper.processService.processStop(pName);
                if (errorCount === 0) {
                  this.cmsToastrService.typeSuccessAdd();
                  this.DataGetAllPermission();
                }
              }
            },
            error: (er) => {
              errorCount++;
              this.cmsToastrService.typeError(er);
              if (savedCount + errorCount === totalCount) {
                this.publicHelper.processService.processStop(pName, false);
              }
            },
          });
      } else {
        // Skip if permission doesn't exist and isRequested is false
        savedCount++;
        if (savedCount + errorCount === totalCount) {
          this.publicHelper.processService.processStop(pName);
          if (errorCount === 0) {
            this.DataGetAllPermission();
          }
        }
      }
    });
  }

  onActionPermissionButtonNewRow(): void {
    if (!this.requestId || this.requestId.length === 0) {
      this.cmsToastrService.typeErrorEditRowIsNull();
      return;
    }
    var panelClass = "";
    if (this.publicHelper.isMobile) panelClass = "dialog-fullscreen";
    else panelClass = "dialog-min";
    const dialogRef = this.dialog.open(
      DataProviderClientApplicationPermissionAddComponent,
      {
        height: "90%",
        panelClass: panelClass,
        enterAnimationDuration:
          environment.cmsViewConfig.enterAnimationDuration,
        exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
        data: {
          LinkClientApplicationId: this.requestId,
        },
      },
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
        this.DataGetAllPermission();
      }
    });
  }

  onActionPermissionButtonEditRow(
    model: DataProviderClientApplicationPermissionModel,
  ): void {
    if (
      !model?.id ||
      (typeof model.id === "string" ? model.id.length === 0 : model.id <= 0)
    ) {
      this.cmsToastrService.typeErrorSelectedRow();
      return;
    }
    this.permissionTableRowSelected = model;
    var panelClass = "";
    if (this.publicHelper.isMobile) panelClass = "dialog-fullscreen";
    else panelClass = "dialog-min";
    const dialogRef = this.dialog.open(
      DataProviderClientApplicationPermissionEditComponent,
      {
        height: "90%",
        panelClass: panelClass,
        enterAnimationDuration:
          environment.cmsViewConfig.enterAnimationDuration,
        exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
        data: { id: this.permissionTableRowSelected.id },
      },
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
        this.DataGetAllPermission();
      }
    });
  }

  onActionPermissionButtonDeleteRow(
    model: DataProviderClientApplicationPermissionModel,
  ): void {
    if (
      !model?.id ||
      (typeof model.id === "string" ? model.id.length === 0 : model.id <= 0)
    ) {
      this.cmsToastrService.typeErrorSelectedRow();
      return;
    }
    this.permissionTableRowSelected = model;

    let title = "";
    let message = "";
    this.translate.get("MESSAGE.Delete").subscribe((str: string) => {
      title = str;
    });
    this.translate
      .get("MESSAGE.Do_you_want_to_delete_this_content")
      .subscribe((str: string) => {
        message = str + "?";
      });
    this.cmsConfirmationDialogService
      .confirm(title, message)
      .then((confirmed) => {
        if (confirmed) {
          this.dataProviderClientApplicationPermissionService
            .ServiceDelete(this.permissionTableRowSelected.id)
            .subscribe({
              next: (ret) => {
                if (ret.isSuccess) {
                  this.cmsToastrService.typeSuccessRemove();
                  this.DataGetAllPermission();
                } else {
                  this.cmsToastrService.typeErrorRemove();
                }
              },
              error: (er) => {
                this.cmsToastrService.typeError(er);
              },
            });
        }
      })
      .catch(() => {});
  }
}
