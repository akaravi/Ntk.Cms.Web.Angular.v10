import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Map as leafletMap } from "leaflet";
import {AccessModel,
  ClauseTypeEnum,
  ErrorExceptionResult,
  ErrorExceptionResultBase,
  FilterDataModel,
  FilterModel,InfoEnumModel,
  LinkManagementBillboardCategoryModel,
  LinkManagementBillboardCategoryService,
  LinkManagementBillboardModel,
  LinkManagementBillboardPatternModel,
  LinkManagementBillboardService,
  LinkManagementMemberModel,
  ManageUserAccessDataTypesEnum} from "ntk-cms-api";
import { NodeInterface, TreeModel } from "ntk-cms-filemanager";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

import { FormInfoModel } from "../../../../core/models/formInfoModel";

import { StepperSelectionEvent } from "@angular/cdk/stepper";
import { MatStepper } from "@angular/material/stepper";
import { TranslateService } from "@ngx-translate/core";
import { EditBaseComponent } from "src/app/core/cmsComponent/editBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { PoinModel } from "src/app/core/models/pointModel";

@Component({
  selector: "app-linkmanagement-billboard-edit",
  templateUrl: "./edit.component.html",

  standalone: false,
})
export class LinkManagementBillboardEditComponent
  extends EditBaseComponent<
    LinkManagementBillboardService,
    LinkManagementBillboardModel,
    number
  >
  implements OnInit
{
  requestId = 0;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private activatedRoute: ActivatedRoute,
    public publicHelper: PublicHelper,
    private contentCategoryService: LinkManagementBillboardCategoryService,
    private linkManagementBillboardService: LinkManagementBillboardService,
    public cmsToastrService: CmsToastrService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
  ) {
    super(
      linkManagementBillboardService,
      new LinkManagementBillboardModel(),
      publicHelper,
      translate,
    );

    this.publicHelper.processService.cdr = this.cdr;

    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
    this.translate.get("ACTION.Add_To_List").subscribe((str: string) => {
      this.optionActionTitle = str;
    });
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;
  dataModel = new LinkManagementBillboardModel();
  dataAccessModel: AccessModel;

  dataModelResult: ErrorExceptionResultBase = new ErrorExceptionResultBase();

  dataModelEnumManagementContentSettingTypeResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();
  dataModelEnumSharingPriceTypeResult: ErrorExceptionResult<InfoEnumModel> =
    new ErrorExceptionResult<InfoEnumModel>();
  optionActionTitle = "";
  optionActionButtomEnable = true;
  optionTabledisplayedColumns = [
    "id",
    "Option",
    "OptionAnswer",
    "IsCorrectAnswer",
    "NumberOfVotes",
    "ScoreOfVotes",
    "Action",
  ];
  dataContentCategoryModel: number[] = [];

  selectFileTypeMainImage = ["jpg", "jpeg", "png"];
  selectFileTypePodcast = ["mp3"];
  selectFileTypeMovie = ["mp4", "webm"];

  fileManagerOpenForm = false;
  fileManagerOpenFormPodcast = false;
  fileManagerOpenFormMovie = false;
  fileManagerTree: TreeModel;
  tagIdsData: number[];

  appLanguage = "fa";

  viewMap = false;
  mapMarker: any;
  private mapModel: leafletMap;
  private mapMarkerPoints: Array<PoinModel> = [];
  mapOptonCenter = new PoinModel();

  ngOnInit(): void {
    this.requestId = +Number(this.activatedRoute.snapshot.paramMap.get("id"));
    if (this.requestId === 0) {
      this.cmsToastrService.typeErrorEditRowIsNull();
      return;
    }
    this.DataGetOne();
    this.DataCategoryGetAll();
  }
  onActionFileSelectedLinkMainImageId(model: NodeInterface): void {
    this.dataModel.linkMainImageId = model.id;
    this.dataModel.linkMainImageIdSrc = model.downloadLinksrc;
  }

  onFormSubmit(): void {
    if (this.requestId <= 0) {
      this.cmsToastrService.typeErrorEditRowIsNull();
      return;
    }
    if (!this.formGroup.valid) {
      this.cmsToastrService.typeErrorFormInvalid();
      return;
    }

    this.DataEditContent();
  }

  DataGetOne(): void {
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
    this.linkManagementBillboardService.setAccessLoad();
    this.linkManagementBillboardService.setAccessDataType(
      ManageUserAccessDataTypesEnum.Editor,
    );
    this.linkManagementBillboardService
      .ServiceGetOneById(this.requestId)
      .subscribe({
        next: (ret) => {
          /*َAccess Field*/
          this.dataAccessModel = ret.access;
          this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
          this.dataModelResult = ret;
          this.formInfo.submitButtonEnabled = true;

          if (ret.isSuccess) {
            this.dataModel = ret.item;
          } else {
            this.cmsToastrService.typeErrorGetOne(ret.errorMessage);
          }
          this.publicHelper.processService.processStop(pName);
        },
        error: (er) => {
          this.publicHelper.processService.processStop(pName);
          this.formInfo.submitButtonEnabled = true;
          this.cmsToastrService.typeErrorGetOne(er);
        },
      });
  }

  DataEditContent(): void {
    //! for convert color to hex
    this.dataModel.bgColor = this.dataModel.bgColor?.toString();
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

    this.linkManagementBillboardService.ServiceEdit(this.dataModel).subscribe({
      next: (ret) => {
        this.publicHelper.processService.processStop(pName);

        this.formInfo.submitButtonEnabled = true;
        this.dataModelResult = ret;
        if (ret.isSuccess) {
          this.translate
            .get("MESSAGE.registration_completed_successfully")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
          this.formInfo.submitResultMessageType = this.formSubmitedStatusEnum.Success;
              });
          this.cmsToastrService.typeSuccessEdit();

          //setTimeout(() => this.router.navigate(['/linkmanagement/billboard']), 1000);
        } else {
          this.cmsToastrService.typeErrorEdit(ret.errorMessage);
        }
        this.publicHelper.processService.processStop(pName);
      },
      error: (er) => {
        this.publicHelper.processService.processStop(pName);
        this.formInfo.submitButtonEnabled = true;
        this.cmsToastrService.typeError(er);
      },
    });
  }

  onActionSelectorSelectLinkManagementMemberId(
    model: LinkManagementMemberModel | null,
  ): void {
    if (!model || model.id <= 0) {
      this.translate
        .get("MESSAGE.Type_of_User_account_is_not_known")
        .subscribe((str: string) => {
          this.cmsToastrService.typeErrorSelected(str);
        });
      return;
    }
    this.dataModel.linkBillboardPatternId = model.id;
  }
  onActionSelectorSelectLinkBillboardPatternId(
    model: LinkManagementBillboardPatternModel | null,
  ): void {
    if (!model || model.id <= 0) {
      this.translate
        .get("MESSAGE.Category_of_billboard_information_is_not_clear")
        .subscribe((str: string) => {
          this.cmsToastrService.typeErrorSelected(str);
        });
      return;
    }
    this.dataModel.linkBillboardPatternId = model.id;
  }
  DataCategoryGetAll(): void {
    this.formInfo.submitButtonEnabled = false;
    this.translate
      .get("MESSAGE.get_category_information_from_the_server")
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

    const filterModel = new FilterModel();
    const filter = new FilterDataModel();
    filter.propertyName = "LinkManagementBillboardId";
    filter.value = this.requestId;
    filter.clauseType = ClauseTypeEnum.And;
    filterModel.filters.push(filter);

    this.tagIdsData = [];
    this.contentCategoryService.ServiceGetAll(filterModel).subscribe({
      next: (ret) => {
        const itemList = [];
        ret.listItems.forEach((element) => {
          itemList.push(element.linkCategoryId);
        });
        this.dataContentCategoryModel = itemList;
        this.formInfo.submitButtonEnabled = true;
        this.publicHelper.processService.processStop(pName);
      },
      error: (er) => {
        this.formInfo.submitButtonEnabled = true;
        this.cmsToastrService.typeErrorGetAll(er);
        this.publicHelper.processService.processStop(pName);
      },
    });
  }
  onActionCategorySelectChecked(model: number): void {
    if (!model || model <= 0) {
      this.translate
        .get("MESSAGE.category_of_information_is_not_clear")
        .subscribe((str: string) => {
          this.cmsToastrService.typeErrorSelected(str);
        });
      return;
    }

    const entity = new LinkManagementBillboardCategoryModel();
    entity.linkCategoryId = model;
    entity.linkManagementBillboardId = this.dataModel.id;
    this.contentCategoryService.ServiceAdd(entity).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.translate
            .get("MESSAGE.registration_in_this_group_was_successful")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
          this.formInfo.submitResultMessageType = this.formSubmitedStatusEnum.Success;
            });
          this.cmsToastrService.typeSuccessEdit();
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
      },
      error: (er) => {
        this.formInfo.submitButtonEnabled = true;
        this.cmsToastrService.typeError(er);
      },
    });
  }
  onActionCategorySelectDisChecked(model: number): void {
    if (!model || model <= 0) {
      this.translate
        .get("MESSAGE.category_of_information_is_not_clear")
        .subscribe((str: string) => {
          this.cmsToastrService.typeErrorSelected(str);
        });
      return;
    }
    const entity = new LinkManagementBillboardCategoryModel();
    entity.linkCategoryId = model;
    entity.linkManagementBillboardId = this.dataModel.id;
    this.contentCategoryService.ServiceDeleteEntity(entity).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.translate
            .get("MESSAGE.registration_in_this_group_was_successful")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
          this.formInfo.submitResultMessageType = this.formSubmitedStatusEnum.Success;
            });
          this.cmsToastrService.typeSuccessEdit();
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
      },
      error: (er) => {
        this.formInfo.submitButtonEnabled = true;
        this.cmsToastrService.typeError(er);
      },
    });
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
  onActionBackToParent(): void {
    this.router.navigate(["/linkmanagement/billboard/"]);
  }
}
