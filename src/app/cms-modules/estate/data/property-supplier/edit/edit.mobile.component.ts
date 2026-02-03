import { StepperSelectionEvent } from "@angular/cdk/stepper";
import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatStepper } from "@angular/material/stepper";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import * as Leaflet from "leaflet";
import { Map as leafletMap } from "leaflet";
import {
  CoreLocationModel,
  ErrorExceptionResultBase,
  EstatePropertySupplierModel,
  EstatePropertySupplierService,
  ManageUserAccessDataTypesEnum } from "ntk-cms-api";
import { NodeInterface, TreeModel } from "ntk-cms-filemanager";
import { EditBaseComponent } from "src/app/core/cmsComponent/editBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { PoinModel } from "src/app/core/models/pointModel";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
import { FormInfoModel } from "../../../../../core/models/formInfoModel";

@Component({
  selector: "app-estate-property-supplier-edit-mobile",
  templateUrl: "./edit.mobile.component.html",
  styleUrls: ["./edit.mobile.component.scss"],
  standalone: false,
})
export class EstatePropertySupplierEditMobileComponent
  extends EditBaseComponent<
    EstatePropertySupplierService,
    EstatePropertySupplierModel,
    string
  >
  implements OnInit
{
  requestId = "";
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private activatedRoute: ActivatedRoute,
    public publicHelper: PublicHelper,
    public contentService: EstatePropertySupplierService,
    public cmsToastrService: CmsToastrService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
  ) {
    super(
      contentService,
      new EstatePropertySupplierModel(),
      publicHelper,
      translate,
    );

    this.publicHelper.processService.cdr = this.cdr;

    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
    if (this.activatedRoute.snapshot.paramMap.get("id")) {
      this.requestId = this.activatedRoute.snapshot.paramMap.get("id");
    }
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;
  @ViewChild("stepper") stepper: MatStepper;

  dataModel = new EstatePropertySupplierModel();
  dataModelResult: ErrorExceptionResultBase = new ErrorExceptionResultBase();

  selectFileTypeMainImage = ["jpg", "jpeg", "png"];

  fileManagerOpenForm = false;
  fileManagerTree: TreeModel;
  appLanguage = "fa";
  /** map */
  viewMap = false;
  private mapModel: leafletMap;
  mapMarker: any;
  mapOptonCenter = new PoinModel();

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

  onActionFileSelected(model: NodeInterface): void {
    this.dataModel.linkMainImageId = model.id;
    this.dataModel.linkMainImageIdSrc = model.downloadLinksrc;
  }

  receiveMap(model: leafletMap = this.mapModel): void {
    if (!model) {
      return;
    }
    this.mapModel = model;
    this.mapModel.on("click", (e) => {
      // @ts-ignore
      const lat = e.latlng.lat;
      // @ts-ignore
      const lon = e.latlng.lng;
      if (this.mapMarker !== undefined) {
        this.mapModel.removeLayer(this.mapMarker);
      }
      if (
        lat === this.dataModel.geolocationlatitude &&
        lon === this.dataModel.geolocationlongitude
      ) {
        this.dataModel.geolocationlatitude = null;
        this.dataModel.geolocationlongitude = null;
        return;
      }
      this.mapMarker = Leaflet.marker([lat, lon]).addTo(this.mapModel);
      this.dataModel.geolocationlatitude = lat;
      this.dataModel.geolocationlongitude = lon;
    });
  }

  receiveZoom(zoom: number): void {}

  onActionSelectorLocation(model: CoreLocationModel | null): void {
    if (!model || !model.id || model.id <= 0) {
      this.translate
        .get("MESSAGE.Information_area_deleted")
        .subscribe((str: string) => {
          this.cmsToastrService.typeWarningSelected(str);
        });
      this.dataModel.linkLocationId = null;
      return;
    }
    this.dataModel.linkLocationId = model.id;
  }

  onStepClick(event: StepperSelectionEvent, stepper: MatStepper): void {
    if (event.previouslySelectedIndex < event.selectedIndex) {
      if (!this.formGroup.valid) {
        this.cmsToastrService.typeErrorFormInvalid();
        stepper.selectedIndex = event.previouslySelectedIndex;
      }
    }
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

    this.contentService.setAccessLoad();
    this.contentService.setAccessDataType(ManageUserAccessDataTypesEnum.Editor);
    this.contentService.ServiceGetOneById(this.requestId).subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
        this.dataModel = ret.item;
        if (ret.isSuccess) {
          this.formInfo.formTitle =
            this.formInfo.formTitle + " " + ret.item.title;
          const lat = this.dataModel.geolocationlatitude;
          const lon = this.dataModel.geolocationlongitude;
          if (lat > 0 && lon > 0) {
            this.mapOptonCenter = { lat, lon };
          }
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
          this.formInfo.submitResultMessageType = this.formSubmitedStatusEnum.Error;
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

    this.contentService.ServiceEdit(this.dataModel).subscribe({
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

  onFormSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }
    if (this.stepper.selectedIndex === this.stepper.steps.length - 1) {
      this.formInfo.submitButtonEnabled = false;
      this.DataEditContent();
    } else {
      this.stepper.next();
    }
  }
  onActionBackToParent(): void {
    if (
      this.activatedRoute.snapshot.paramMap.get("LinkProjectId")
    ) {
      this.router.navigate([
        "/estate/data/property-supplier/LinkProjectId/" +
          this.activatedRoute.snapshot.paramMap.get("LinkProjectId"),
      ]);
    } else {
      this.router.navigate(["/estate/data/property-supplier"]);
    }
  }
}
