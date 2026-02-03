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
    DataFieldInfoModel,
    ErrorExceptionResult,
    SmsEnumService,
    SmsMainClientApplicationModel,
    SmsMainClientApplicationService,
} from "ntk-cms-api";
import { TreeModel } from "ntk-cms-filemanager";
import { AddBaseComponent } from "src/app/core/cmsComponent/addBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

@Component({
  selector: "app-sms-client-application-add",
  templateUrl: "./add.component.html",
  standalone: false,
})
export class SmsMainClientApplicationAddComponent
  extends AddBaseComponent<
    SmsMainClientApplicationService,
    SmsMainClientApplicationModel,
    string
  >
  implements OnInit
{
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SmsMainClientApplicationAddComponent>,
    public smsEnumService: SmsEnumService,
    public smsMainClientApplicationService: SmsMainClientApplicationService,
    public cmsToastrService: CmsToastrService,
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

    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
    if (data && data.linkUserId && +data.linkUserId > 0) {
      this.dataModel.linkCoreUserId = +data.linkUserId;
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

  dataModelResult: ErrorExceptionResult<SmsMainClientApplicationModel> =
    new ErrorExceptionResult<SmsMainClientApplicationModel>();
  dataModel: SmsMainClientApplicationModel =
    new SmsMainClientApplicationModel();

  fileManagerOpenForm = false;
  firewallAllowIPInput = "";

  ngOnInit(): void {
    this.translate.get("TITLE.ADD").subscribe((str: string) => {
      this.formInfo.formTitle = str;
    });

    this.DataGetAccess();
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

    // Ensure firewallAllowIP is synced from firewallAllowIPList before send to API
    this.syncFirewallAllowIPFromList();

    this.smsMainClientApplicationService.ServiceAdd(this.dataModel).subscribe({
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
          this.formInfo.submitResultMessageType =
            this.formSubmitedStatusEnum.Success;
          this.cmsToastrService.typeSuccessAdd();
          this.dialogRef.close({ dialogChangedDate: true, model: ret.item });
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

    this.DataAddContent();
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
}
