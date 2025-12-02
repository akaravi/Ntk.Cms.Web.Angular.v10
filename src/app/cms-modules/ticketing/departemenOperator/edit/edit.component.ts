import { StepperSelectionEvent } from "@angular/cdk/stepper";
import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
  AccessModel,
  ApplicationSourceModel,
  CoreEnumService,
  ErrorExceptionResultBase,
  FormInfoModel,
  ManageUserAccessDataTypesEnum,
  TicketingDepartemenOperatorModel,
  TicketingDepartemenOperatorService,
} from "ntk-cms-api";
import { NodeInterface, TreeModel } from "ntk-cms-filemanager";
import { EditBaseComponent } from "src/app/core/cmsComponent/editBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { PoinModel } from "src/app/core/models/pointModel";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

@Component({
  selector: "app-aplication-app-edit",
  templateUrl: "./edit.component.html",

  standalone: false,
})
export class TicketingDepartemenOperatorEditComponent
  extends EditBaseComponent<
    TicketingDepartemenOperatorService,
    TicketingDepartemenOperatorModel,
    number
  >
  implements OnInit
{
  requestId = 0;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private activatedRoute: ActivatedRoute,
    public publicHelper: PublicHelper,
    public coreEnumService: CoreEnumService,
    private ticketingDepartemenOperatorService: TicketingDepartemenOperatorService,
    private cmsToastrService: CmsToastrService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
  ) {
    super(
      ticketingDepartemenOperatorService,
      new TicketingDepartemenOperatorModel(),
      publicHelper,
      translate,
    );

    this.publicHelper.processService.cdr = this.cdr;
    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;

  formInfo: FormInfoModel = new FormInfoModel();
  dataAccessModel: AccessModel;
  dataModel = new TicketingDepartemenOperatorModel();
  dataModelResult: ErrorExceptionResultBase = new ErrorExceptionResultBase();

  selectFileTypeMainImage = ["jpg", "jpeg", "png"];
  fileManagerOpenForm = false;
  appLanguage = "fa";

  fileManagerTree: TreeModel;
  mapMarker: any;
  mapOptonCenter = new PoinModel();

  ngOnInit(): void {
    this.requestId = +Number(this.activatedRoute.snapshot.paramMap.get("id"));
    if (this.requestId === 0) {
      this.cmsToastrService.typeErrorAddRowParentIsNull();
      return;
    }
    this.DataGetOne(this.requestId);
  }

  onFormSubmit(): void {
    if (!this.formGroup.valid) {
      this.cmsToastrService.typeErrorFormInvalid();
      return;
    }
    if (this.dataModel.linkDepartemenId <= 0) {
      this.translate
        .get("MESSAGE.Specify_the_department")
        .subscribe((str: string) => {
          this.cmsToastrService.typeErrorEdit(str);
        });

      return;
    }

    this.DataEditContent();
  }

  DataGetOne(requestId: number): void {
    this.formInfo.submitButtonEnabled = false;
    this.translate
      .get("MESSAGE.get_information_from_the_server")
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
    this.ticketingDepartemenOperatorService.setAccessLoad();
    this.ticketingDepartemenOperatorService.setAccessDataType(
      ManageUserAccessDataTypesEnum.Editor,
    );
    this.ticketingDepartemenOperatorService
      .ServiceGetOneById(requestId)
      .subscribe({
        next: (ret) => {
          /*َAccess Field*/
          this.dataAccessModel = ret.access;
          this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);

          this.publicHelper.processService.processStop(pName);

          this.dataModelResult = ret;
          this.formInfo.submitButtonEnabled = true;

          if (ret.isSuccess) {
          } else {
            this.cmsToastrService.typeErrorGetOne(ret.errorMessage);
          }
        },
        error: (err) => {
          this.publicHelper.processService.processStop(pName);

          this.formInfo.submitButtonEnabled = true;
          this.cmsToastrService.typeErrorGetOne(err);
        },
      });
  }
  DataEditContent(): void {
    this.formInfo.submitButtonEnabled = false;
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

    this.ticketingDepartemenOperatorService
      .ServiceEdit(this.dataModel)
      .subscribe({
        next: (ret) => {
          this.formInfo.submitButtonEnabled = !ret.isSuccess;
          this.dataModelResult = ret;
          if (ret.isSuccess) {
            this.translate
              .get("MESSAGE.registration_completed_successfully")
              .subscribe((str: string) => {
                this.formInfo.submitResultMessage = str;
              });
            this.cmsToastrService.typeSuccessEdit();
            setTimeout(() => this.router.navigate(["/application/app/"]), 1000);
          } else {
            this.cmsToastrService.typeErrorEdit(ret.errorMessage);
          }
          this.publicHelper.processService.processStop(pName);
        },
        error: (err) => {
          this.publicHelper.processService.processStop(pName);

          this.formInfo.submitButtonEnabled = true;
          this.cmsToastrService.typeErrorEdit(err);
        },
      });
  }

  onStepClick(event: StepperSelectionEvent, stepper: any): void {
    if (event.previouslySelectedIndex < event.selectedIndex) {
      // if (!this.formGroup.valid) {
      //   this.cmsToastrService.typeErrorFormInvalid();
      //   setTimeout(() => {
      //     stepper.selectedIndex = event.previouslySelectedIndex;
      //     // stepper.previous();
      //   }, 10);
      // }
    }
  }

  onActionBackToParent(): void {
    this.router.navigate(["/application/app/"]);
  }
  onActionFileSelectedLinkMainImageId(model: NodeInterface): void {
    this.dataModel.linkMainImageId = model.id;
    this.dataModel.linkMainImageIdSrc = model.downloadLinksrc;
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
    if (this.dataModel.linkDepartemenId !== model.id) {
      this.translate
        .get([
          "MESSAGE.The_source_can_not_changed",
          "MESSAGE.Application_source_cannot_be_changed_in_editing_mode",
        ])
        .subscribe((str: any) => {
          this.cmsToastrService.typeErrorMessage(
            str["MESSAGE.The_source_can_not_changed"],
            str["MESSAGE.Application_source_cannot_be_changed_in_editing_mode"],
          );
        });
    }
  }
}
