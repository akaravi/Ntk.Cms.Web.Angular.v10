import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
  CoreEnumService,
  DataFieldInfoModel,
  ErrorExceptionResult,
  EstatePropertyDetailGroupModel,
  EstatePropertyDetailGroupService } from "ntk-cms-api";
import { TreeModel } from "ntk-cms-filemanager";
import { AddBaseComponent } from "src/app/core/cmsComponent/addBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

import { FormInfoModel } from "../../../../../core/models/formInfoModel";

@Component({
  selector: "app-estate-property-detail-group-add-mobile",
  templateUrl: "./add.mobile.component.html",
  styleUrls: ["./add.mobile.component.scss"],
  standalone: false,
})
export class EstatePropertyDetailGroupAddMobileComponent
  extends AddBaseComponent<
    EstatePropertyDetailGroupService,
    EstatePropertyDetailGroupModel,
    string
  >
  implements OnInit
{
  requestId = "";
  requestLinkPropertyTypeLanduseId = "";
  constructorInfoAreaId = this.constructor.name;
  constructor(
    public coreEnumService: CoreEnumService,
    public estatePropertyDetailGroupService: EstatePropertyDetailGroupService,
    public cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public translate: TranslateService,
  ) {
    super(
      estatePropertyDetailGroupService,
      new EstatePropertyDetailGroupModel(),
      publicHelper,
      translate,
    );
    this.publicHelper.processService.cdr = this.cdr;
    if (this.activatedRoute.snapshot.paramMap.get("id")) {
      this.requestId = this.activatedRoute.snapshot.paramMap.get("id");
    }
    if (
      this.activatedRoute.snapshot.paramMap.get("LinkPropertyTypeLanduseId")
    ) {
      this.requestLinkPropertyTypeLanduseId =
        this.activatedRoute.snapshot.paramMap.get("LinkPropertyTypeLanduseId");
    }
    if (
      this.requestLinkPropertyTypeLanduseId &&
      this.requestLinkPropertyTypeLanduseId.length > 0
    ) {
      this.dataModel.linkPropertyTypeLanduseId =
        this.requestLinkPropertyTypeLanduseId;
    }
    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();

  selectFileTypeMainImage = ["jpg", "jpeg", "png"];
  fileManagerTree: TreeModel;
  appLanguage = "fa";
  dataModelResult: ErrorExceptionResult<EstatePropertyDetailGroupModel> =
    new ErrorExceptionResult<EstatePropertyDetailGroupModel>();
  dataModel: EstatePropertyDetailGroupModel =
    new EstatePropertyDetailGroupModel();

  fileManagerOpenForm = false;

  ngOnInit(): void {
    if (this.requestId && this.requestId.length > 0) {
      this.translate.get("TITLE.ADD").subscribe((str: string) => {
        this.formInfo.formTitle = str + " copy";
      });
      this.DataClone();
    } else {
      this.translate.get("TITLE.ADD").subscribe((str: string) => {
        this.formInfo.formTitle = str;
      });
    }

    this.DataGetAccess();
  }

  DataClone(): void {
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
    this.estatePropertyDetailGroupService
      .ServiceGetOneById(this.requestId)
      .subscribe({
        next: (ret) => {
          this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);

          if (ret.isSuccess) {
            this.dataModel = ret.item;
            ret.item.title = ret.item.title + " copy";
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

  DataAddContent(): void {
    //! for convert color to hex
    this.dataModel.iconColor = this.dataModel.iconColor?.toString();
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

    this.estatePropertyDetailGroupService.ServiceAdd(this.dataModel).subscribe({
      next: (ret) => {
        this.dataModelResult = ret;
        if (ret.isSuccess) {
          this.translate
            .get("MESSAGE.registration_completed_successfully")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
            });
          this.cmsToastrService.typeSuccessAdd();
          this.onActionBackToParent();
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

        this.formInfo.submitButtonEnabled = true;
      },
      error: (er) => {
        this.formInfo.submitButtonEnabled = true;
        this.cmsToastrService.typeError(er);
        this.publicHelper.processService.processStop(pName, false);
      },
    });
  }

  onActionSelectorSelect(model: any): void {
    this.dataModel.linkPropertyTypeLanduseId = null;
    if (model && model.id && model.id.length > 0) {
      this.dataModel.linkPropertyTypeLanduseId = model.id;
    }
  }
  onIconPickerSelect(model: any): void {
    this.dataModel.iconFont = model;
  }
  onFormSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }
    this.formInfo.submitButtonEnabled = false;
    this.DataAddContent();
  }
  onActionBackToParent(): void {
    this.router.navigate(["/estate/main/property-detail-group"]);
  }
}
