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
  ErrorExceptionResultBase,
  EstatePropertyDetailGroupModel,
  EstatePropertyDetailGroupService,
  EstatePropertyTypeLanduseModel,
  ManageUserAccessDataTypesEnum } from "ntk-cms-api";
import { TreeModel } from "ntk-cms-filemanager";
import { EditBaseComponent } from "src/app/core/cmsComponent/editBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

import { FormInfoModel } from "../../../../../core/models/formInfoModel";

@Component({
  selector: "app-estate-property-detail-group-edit-mobile",
  templateUrl: "./edit.mobile.component.html",
  styleUrls: ["./edit.mobile.component.scss"],
  standalone: false,
})
export class EstatePropertyDetailGroupEditMobileComponent
  extends EditBaseComponent<
    EstatePropertyDetailGroupService,
    EstatePropertyDetailGroupModel,
    string
  >
  implements OnInit
{
  requestId = "";
  constructorInfoAreaId = this.constructor.name;
  constructor(
    public coreEnumService: CoreEnumService,
    public estatePropertyDetailGroupService: EstatePropertyDetailGroupService,
    public cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private router: Router,
    private cdr: ChangeDetectorRef,
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
    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;

  selectFileTypeMainImage = ["jpg", "jpeg", "png"];
  fileManagerTree: TreeModel;
  appLanguage = "fa";

  dataModelResult: ErrorExceptionResultBase = new ErrorExceptionResultBase();
  dataModel: EstatePropertyDetailGroupModel =
    new EstatePropertyDetailGroupModel();

  fileManagerOpenForm = false;

  ngOnInit(): void {
    this.translate.get("TITLE.Edit").subscribe((str: string) => {
      this.formInfo.formTitle = str;
    });
    if (!this.requestId || this.requestId.length === 0) {
      this.cmsToastrService.typeErrorComponentAction();
      this.onActionBackToParent();
      return;
    }
    this.DataGetOneContent();
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

    this.estatePropertyDetailGroupService.setAccessLoad();
    this.estatePropertyDetailGroupService.setAccessDataType(
      ManageUserAccessDataTypesEnum.Editor,
    );
    this.estatePropertyDetailGroupService
      .ServiceGetOneById(this.requestId)
      .subscribe({
        next: (ret) => {
          this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);

          this.dataModel = ret.item;
          if (ret.isSuccess) {
            this.formInfo.formTitle =
              this.formInfo.formTitle + " " + ret.item.title;
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

    this.estatePropertyDetailGroupService.ServiceEdit(this.dataModel).subscribe({
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
          this.cmsToastrService.typeSuccessEdit();
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

  onActionSelectorSelect(model: EstatePropertyTypeLanduseModel | null): void {
    if (!model || !model.id || model.id.length <= 0) {
      this.translate
        .get("MESSAGE.category_of_information_is_not_clear")
        .subscribe((str: string) => {
          this.cmsToastrService.typeErrorSelected(str);
        });
      return;
    }
    this.dataModel.linkPropertyTypeLanduseId = model.id;
  }
  onIconPickerSelect(model: any): void {
    this.dataModel.iconFont = model;
  }
  onFormSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }
    this.formInfo.submitButtonEnabled = false;
    this.DataEditContent();
  }
  onActionBackToParent(): void {
    this.router.navigate(["/estate/main/property-detail-group"]);
  }
}
