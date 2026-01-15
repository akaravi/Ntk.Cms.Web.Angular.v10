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
import { TranslateService } from "@ngx-translate/core";
import {
  CoreEnumService,
  DataProviderClientApplicationModel,
  DataProviderClientApplicationService,
  ErrorExceptionResultBase,
  ManageUserAccessDataTypesEnum,
} from "ntk-cms-api";
import { TreeModel } from "ntk-cms-filemanager";
import { Subscription } from "rxjs";
import { EditBaseComponent } from "src/app/core/cmsComponent/editBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

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
    private cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    private cmsStoreService: CmsStoreService,
    public translate: TranslateService,
    private tokenHelper: TokenHelper,
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
        (part) => parseInt(part, 10) >= 0 && parseInt(part, 10) <= 255
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
        (part) => parseInt(part, 10) >= 0 && parseInt(part, 10) <= 255
      );
    }

    if (rangeRegex.test(ip)) {
      const [startIP, endIP] = ip.split("-");
      const startParts = startIP.split(".");
      const endParts = endIP.split(".");
      const startValid = startParts.every(
        (part) => parseInt(part, 10) >= 0 && parseInt(part, 10) <= 255
      );
      const endValid = endParts.every(
        (part) => parseInt(part, 10) >= 0 && parseInt(part, 10) <= 255
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
  }
}
