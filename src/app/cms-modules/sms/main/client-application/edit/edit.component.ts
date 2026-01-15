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
  ErrorExceptionResult,
  ErrorExceptionResultBase,
  InfoEnumModel,
  ManageUserAccessDataTypesEnum,
  SmsEnumService,
  SmsMainClientApplicationModel,
  SmsMainClientApplicationService,
} from "ntk-cms-api";
import { TreeModel } from "ntk-cms-filemanager";
import { EditBaseComponent } from "src/app/core/cmsComponent/editBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

@Component({
  selector: "app-sms-client-application-edit",
  templateUrl: "./edit.component.html",
  standalone: false,
})
export class SmsMainClientApplicationEditComponent
  extends EditBaseComponent<
    SmsMainClientApplicationService,
    SmsMainClientApplicationModel,
    string
  >
  implements OnInit
{
  requestId = "";
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SmsMainClientApplicationEditComponent>,
    public smsEnumService: SmsEnumService,
    public smsMainClientApplicationService: SmsMainClientApplicationService,
    private cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
  ) {
    super(
      smsMainClientApplicationService,
      new SmsMainClientApplicationModel(),
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
  dataModel: SmsMainClientApplicationModel =
    new SmsMainClientApplicationModel();

  dataModelEnumApiNumberAccessStatusResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();
  dataModelEnumApiNumberActionResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();

  fileManagerOpenForm = false;
  firewallAllowIPInput = "";
  ngOnInit(): void {
    if (this.requestId.length > 0) {
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
    if (this.requestId.length <= 0) {
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

    this.smsMainClientApplicationService.setAccessLoad();
    this.smsMainClientApplicationService.setAccessDataType(
      ManageUserAccessDataTypesEnum.Editor,
    );
    this.smsMainClientApplicationService
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
            this.DataGetAllMenuCoreUserGroup();
            this.formInfo.formTitle = this.formInfo.formTitle;
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

    this.smsMainClientApplicationService.ServiceEdit(this.dataModel).subscribe({
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
  DataGetAllMenuCoreUserGroup(): void {
    // Placeholder for future implementation
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
}
