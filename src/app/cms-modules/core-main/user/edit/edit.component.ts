import { StepperSelectionEvent } from "@angular/cdk/stepper";
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatStepper } from "@angular/material/stepper";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
  AccessModel,
  CoreEnumService,
  CoreSiteModel,
  CoreUserModel,
  CoreUserService,
  ErrorExceptionResultBase,
  ManageUserAccessDataTypesEnum,
} from "ntk-cms-api";
import { NodeInterface, TreeModel } from "ntk-cms-filemanager";
import { Subscription } from "rxjs";
import { EditBaseComponent } from "src/app/core/cmsComponent/editBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
import { CoreUserChangePasswordComponent } from "../changePassword/changePassword.component";

@Component({
  selector: "app-core-user-edit",
  templateUrl: "./edit.component.html",

  standalone: false,
})
export class CoreUserEditComponent
  extends EditBaseComponent<CoreUserService, CoreUserModel, number>
  implements OnInit, OnDestroy
{
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private activatedRoute: ActivatedRoute,
    public coreEnumService: CoreEnumService,
    public coreUserService: CoreUserService,
    private cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    public translate: TranslateService,
  ) {
    super(coreUserService, new CoreUserModel(), publicHelper, translate);
    this.publicHelper.processService.cdr = this.cdr;

    this.requestId = +Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;

    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.tokenInfoStore)
        .subscribe(async (value) => {
          this.tokenInfo = value;
          this.DataGetOneContent();
        }),
    );
  }
  // tokenInfo: TokenInfoModelV3;
  private unsubscribe: Subscription[] = [];

  requestId = 0;
  selectFileTypeMainImage = ["jpg", "jpeg", "png"];

  fileManagerTree: TreeModel;
  appLanguage = "fa";

  dataModelResult: ErrorExceptionResultBase = new ErrorExceptionResultBase();
  dataModel: CoreUserModel = new CoreUserModel();
  @ViewChild("vform", { static: false }) formGroup: FormGroup;

  dataAccessModel: AccessModel;

  fileManagerOpenForm = false;
  firewallAllowIPInput = "";

  onActionFileSelected(model: NodeInterface): void {
    this.dataModel.linkMainImageId = model.id;
    this.dataModel.linkMainImageIdSrc = model.downloadLinksrc;
  }

  ngOnInit(): void {
    if (this.requestId === 0) {
      this.requestId = this.tokenInfo.access.userId;
    }
    if (this.requestId === 0) {
      this.cmsToastrService.typeErrorAddRowParentIsNull();
      return;
    }

    this.translate.get("TITLE.Edit").subscribe((str: string) => {
      this.formInfo.formTitle = str;
    });
    this.DataGetOneContent();
  }
  ngOnDestroy(): void {
    if (this.unsubscribe) this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  DataGetOneContent(): void {
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

    /*َAccess Field*/
    this.coreUserService.setAccessLoad();
    this.coreUserService.setAccessDataType(
      ManageUserAccessDataTypesEnum.Editor,
    );
    this.coreUserService.ServiceGetOneById(this.requestId).subscribe({
      next: (ret) => {
        /*َAccess Field*/
        this.dataAccessModel = ret.access;
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);

        this.dataModel = ret.item;
        // Always initialize firewallAllowIPList as empty array first
        if (!this.dataModel.firewallAllowIPList) {
          this.dataModel.firewallAllowIPList = [];
        }
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
            this.formInfo.formTitle + " " + ret.item.username;
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

    this.coreUserService.ServiceEdit(this.dataModel).subscribe({
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
          if (this.dataModel.id === this.tokenInfo.access.userId) {
            this.tokenInfo =
              this.cmsStoreService.getStateSnapshot().tokenInfoStore;
          }
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
  onActionBackToParent(): void {
    this.router.navigate(["/core/user/"]);
  }
  onStepClick(event: StepperSelectionEvent, stepper: MatStepper): void {
    if (event.previouslySelectedIndex < event.selectedIndex) {
      if (!this.formGroup.valid) {
        this.cmsToastrService.typeErrorFormInvalid();
        setTimeout(() => {
          stepper.selectedIndex = event.previouslySelectedIndex;
          // stepper.previous();
        }, 10);
      }
    }
  }
  onActionSelectorLinkResellerSiteIdSelect(model: CoreSiteModel | null): void {
    this.dataModel.linkResellerSiteId = null;
    if (!model || model.id <= 0) {
      return;
    }
    this.dataModel.linkResellerSiteId = model.id;
  }
  onActionSelectorLinkResellerUserIdSelect(model: CoreUserModel | null): void {
    this.dataModel.linkResellerUserId = null;
    if (!model || model.id <= 0) {
      return;
    }
    this.dataModel.linkResellerUserId = model.id;
  }
  onActionButtonChangePassword(): void {
    if (
      this.tokenInfo.access.userId != this.dataModel.id &&
      (this.dataAccessModel == null || !this.dataAccessModel.accessEditRow)
    ) {
      this.cmsToastrService.typeErrorAccessEdit();
      return;
    }
    const dialogRef = this.dialog.open(CoreUserChangePasswordComponent, {
      //height: '90%',
      data: { linkUserId: this.dataModel.id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
      }
    });
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
