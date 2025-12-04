import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {AccessModel,
  ApplicationSourceModel,
  CaptchaModel,
  CoreAuthV3Service,
  CoreEnumService,
  DataFieldInfoModel,
  ErrorExceptionResult,TicketingTaskDtoModel,
  TicketingTaskModel,
  TicketingTaskService,
  TicketingTemplateModel} from "ntk-cms-api";
import { TreeModel } from "ntk-cms-filemanager";
import { Subscription } from "rxjs";
import { AddBaseComponent } from "src/app/core/cmsComponent/addBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { PoinModel } from "src/app/core/models/pointModel";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

import { FormInfoModel } from "../../../../core/models/formInfoModel";
import { FormSubmitedStatusEnum } from "../../../../core/models/formSubmitedStatusEnum";

@Component({
  selector: "app-ticketing-task-contactus",
  templateUrl: "./contact-us-add.component.html",
  standalone: false,
})
export class TicketingTaskContactUsAddComponent
  extends AddBaseComponent<TicketingTaskService, TicketingTaskModel, number>
  implements OnInit, OnDestroy
{
  requestLinkDepartemenId = 0;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
    private activatedRoute: ActivatedRoute,
    private coreAuthService: CoreAuthV3Service,
    public publicHelper: PublicHelper,
    public coreEnumService: CoreEnumService,
    private ticketingTaskService: TicketingTaskService,
    private cmsToastrService: CmsToastrService,
    private router: Router,
    public translate: TranslateService,
    private cdr: ChangeDetectorRef,
  ) {
    super(
      ticketingTaskService,
      new TicketingTaskModel(),
      publicHelper,
      translate,
    );
    this.publicHelper.processService.cdr = this.cdr;
    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;
    if (this.tokenInfo) {
      this.dataModel.fullName = this.tokenInfo.user.lastName;
      this.dataModel.email = this.tokenInfo.user.email;
      this.dataModel.phoneNo = this.tokenInfo.user.mobile;
    }
    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.tokenInfoStore)
        .subscribe(async (value) => {
          this.tokenInfo = value;
          this.dataModel.fullName = this.tokenInfo.user.lastName;
          this.dataModel.email = this.tokenInfo.user.email;
          this.dataModel.phoneNo = this.tokenInfo.user.mobile;
        }),
    );
  }
  private unsubscribe: Subscription[] = [];
  // tokenInfo: TokenInfoModelV3;

  @ViewChild("vform", { static: false }) formGroup: FormGroup;
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();
  formInfo: FormInfoModel = new FormInfoModel();
  dataAccessModel: AccessModel;
  dataModel = new TicketingTaskDtoModel();
  dataModelResult: ErrorExceptionResult<TicketingTaskModel> =
    new ErrorExceptionResult<TicketingTaskModel>();

  selectFileTypeMainImage = ["jpg", "jpeg", "png"];
  fileManagerOpenForm = false;
  appLanguage = "fa";
  templateItemCount = 0;
  fileManagerTree: TreeModel;
  mapMarker: any;
  mapOptonCenter = new PoinModel();
  captchaModel: CaptchaModel = new CaptchaModel();
  expireDate: Date;
  countAutoCaptchaOrder = 1;
  enumFormSubmitedStatus = FormSubmitedStatusEnum;
  onCaptchaOrderInProcess = false;
  ngOnInit(): void {
    this.requestLinkDepartemenId = +Number(
      this.activatedRoute.snapshot.paramMap.get("LinkDepartemenId"),
    );
    this.onCaptchaOrder();

    this.dataModel.linkTicketingDepartemenId = this.requestLinkDepartemenId;
    this.DataGetAccess();
  }

  onFormSubmit(): void {
    if (!this.formGroup.valid) {
      this.cmsToastrService.typeErrorFormInvalid();
      return;
    }

    this.DataAddContent();
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  DataAddContent(): void {
    this.formInfo.submitButtonEnabled = false;
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

    this.dataModel.captchaKey = this.captchaModel.key;
    this.ticketingTaskService.ServiceContactUS(this.dataModel).subscribe({
      next: (ret) => {
        this.formInfo.submitButtonEnabled = !ret.isSuccess;
        this.dataModelResult = ret;
        if (ret.isSuccess) {
          this.formInfo.submitResultMessageType =
            FormSubmitedStatusEnum.Success;
          this.translate
            .get("MESSAGE.registration_completed_successfully")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
            });
          this.cmsToastrService.typeSuccessAdd();
        } else {
          this.formInfo.submitResultMessageType = FormSubmitedStatusEnum.Error;
          this.cmsToastrService.typeErrorAdd(ret.errorMessage);
        }
        this.publicHelper.processService.processStop(pName);
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.publicHelper.processService.processStop(pName);

        this.formInfo.submitButtonEnabled = true;
        this.cmsToastrService.typeErrorAdd(err);
        this.cdr.markForCheck();
      },
    });
  }

  onActionSelectorSelect(model: TicketingTemplateModel | null): void {
    if (!model || model.id <= 0) {
      this.translate
        .get("MESSAGE.Information_template_is_not_clear")
        .subscribe((message: string) => {
          this.cmsToastrService.typeWarningSelected(message);
        });
      return;
    }
    this.dataModel.htmlBody = model.htmlBody;
  }

  onActionBackToParent(): void {
    this.router.navigate(["/application/app/"]);
  }

  onActionSelectSource(model: ApplicationSourceModel | null): void {
    if (!model || model.id <= 0) {
      this.translate
        .get([
          "MESSAGE.Specify_the_source",
          "MESSAGE.The_source_of_the_information_application_is_not_known",
        ])
        .subscribe((str: any) => {
          this.cmsToastrService.typeErrorMessage(
            str["MESSAGE.Specify_the_source"],
            str[
              "MESSAGE.The_source_of_the_information_application_is_not_known"
            ],
          );
        });
      return;
    }
    this.dataModel.linkTicketingDepartemenId = model.id;
  }

  onCaptchaOrder(): void {
    if (this.onCaptchaOrderInProcess) {
      return;
    }
    this.countAutoCaptchaOrder = this.countAutoCaptchaOrder + 1;
    this.dataModel.captchaText = "";
    this.coreAuthService.ServiceCaptcha().subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.captchaModel = ret.item;
          this.expireDate = ret.item.expire; //.split('+')[1];
          const startDate = new Date();
          const endDate = new Date(ret.item.expire);
          const seconds = endDate.getTime() - startDate.getTime();
          if (this.countAutoCaptchaOrder < 10) {
            this.countAutoCaptchaOrder = this.countAutoCaptchaOrder + 1;
            setTimeout(() => {
              this.onCaptchaOrder();
            }, seconds);
          }
        } else {
          this.cmsToastrService.typeErrorGetCpatcha(ret.errorMessage);
        }
        this.onCaptchaOrderInProcess = false;
      },
      error: (err) => {
        this.onCaptchaOrderInProcess = false;
      },
    });
  }
}
