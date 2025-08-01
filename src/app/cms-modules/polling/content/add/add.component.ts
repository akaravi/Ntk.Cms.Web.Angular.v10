
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as Leaflet from 'leaflet';
import { Map as leafletMap } from 'leaflet';
import {
  AccessModel, CoreEnumService, DataFieldInfoModel, ErrorExceptionResult, FilterDataModel, FilterModel,
  FormInfoModel,
  PollingCategoryModel, PollingContentModel,
  PollingContentService, PollingOptionModel,
  PollingOptionService
} from 'ntk-cms-api';
import { NodeInterface, TreeModel } from 'ntk-cms-filemanager';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';


import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { CoreLocationModel } from 'ntk-cms-api';
import { AddBaseComponent } from 'src/app/core/cmsComponent/addBaseComponent';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { PoinModel } from 'src/app/core/models/pointModel';

@Component({
    selector: 'app-polling-content-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss'
    ],
    standalone: false
})
export class PollingContentAddComponent extends AddBaseComponent<PollingContentService, PollingContentModel, number> implements OnInit {
  requestCategoryId = 0;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private activatedRoute: ActivatedRoute,
    public coreEnumService: CoreEnumService,
    public publicHelper: PublicHelper,
    private pollingContentService: PollingContentService,
    private pollingOptionService: PollingOptionService,
    private cmsToastrService: CmsToastrService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
  ) {
    super(pollingContentService, new PollingContentModel(), publicHelper, translate);
    this.publicHelper.processService.cdr = this.cdr;


    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
  }
  @ViewChild('vform', { static: false }) formGroup: FormGroup;
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<string, DataFieldInfoModel>();

  dataModel = new PollingContentModel();
  dataAccessModel: AccessModel;
  dataModelResult: ErrorExceptionResult<PollingContentModel> = new ErrorExceptionResult<PollingContentModel>();

  optionSelected: PollingOptionModel = new PollingOptionModel();
  optionDataModel = new Array<PollingOptionModel>();
  optionTabledataSource = new MatTableDataSource<PollingOptionModel>();
  dataOptionModelResult: ErrorExceptionResult<PollingOptionModel> = new ErrorExceptionResult<PollingOptionModel>();
  optionActionTitle = '';
  optionActionButtomEnable = true;
  optionTabledisplayedColumns = ['Id', 'Option', 'OptionAnswer', 'IsCorrectAnswer', 'NumberOfVotes', 'ScoreOfVotes', 'Action'];


  selectFileTypeMainImage = ['jpg', 'jpeg', 'png'];
  selectFileTypePodcast = ['mp3'];
  selectFileTypeMovie = ['mp4', 'webm'];
  formInfo: FormInfoModel = new FormInfoModel();
  fileManagerOpenForm = false;
  fileManagerOpenFormPodcast = false;
  fileManagerOpenFormMovie = false;
  fileManagerTree: TreeModel;
  tagIdsData: number[];


  appLanguage = 'fa';

  viewMap = false;
  mapMarker: any;
  private mapModel: leafletMap;
  private mapMarkerPoints: Array<PoinModel> = [];
  mapOptonCenter = new PoinModel();


  ngOnInit(): void {
    this.requestCategoryId = + Number(this.activatedRoute.snapshot.paramMap.get('CategoryId'));
    if (this.requestCategoryId === 0) {
      this.cmsToastrService.typeErrorAddRowParentIsNull();
      return;
    }
    this.dataModel.linkCategoryId = this.requestCategoryId;

    this.DataGetAccess();

  }

  onActionFileSelectedLinkMainImageId(model: NodeInterface): void {
    this.dataModel.linkMainImageId = model.id;
    this.dataModel.linkMainImageIdSrc = model.downloadLinksrc;
  }
  onActionFileSelectedLinkFilePodcastId(model: NodeInterface): void {
    this.dataModel.linkFilePodcastId = model.id;
    this.dataModel.linkFilePodcastIdSrc = model.downloadLinksrc;
  }
  onActionFileSelectedLinkFileMovieId(model: NodeInterface): void {
    this.dataModel.linkFileMovieId = model.id;
    this.dataModel.linkFileMovieIdSrc = model.downloadLinksrc;
  }



  onFormSubmit(): void {
    if (this.requestCategoryId <= 0) {
      this.cmsToastrService.typeErrorAddRowParentIsNull();
      return;
    }
    if (!this.formGroup.valid) {
      this.cmsToastrService.typeErrorFormInvalid();
      return;
    }

    this.DataEditContent();


  }

  DataGetOne(): void {
    this.formInfo.formSubmitAllow = false;
    this.translate.get('MESSAGE.get_information_from_the_server').subscribe((str: string) => { this.formInfo.formAlert = str; });
    this.formInfo.formError = '';
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });


    this.pollingContentService
      .ServiceGetOneById(this.dataModelResult.item.id)
      .subscribe({
        next: (ret) => {
          this.publicHelper.processService.processStop(pName);
          this.dataModelResult = ret;
          this.formInfo.formSubmitAllow = true;

          if (ret.isSuccess) {
            this.dataModel = ret.item;
            const lat = this.dataModel.geolocationlatitude;
            const lon = this.dataModel.geolocationlongitude;
            if (lat > 0 && lon > 0) {
              this.mapMarkerPoints = [];
              this.mapMarkerPoints.push({ lat, lon });
              this.receiveMap();
            }
            this.DataOptionGetAll();
            this.publicHelper.processService.processStop(pName);

          } else {
            this.cmsToastrService.typeErrorGetOne(ret.errorMessage);
          }
        },
        error: (er) => {
          this.publicHelper.processService.processStop(pName);
          this.formInfo.formSubmitAllow = true;
          this.cmsToastrService.typeErrorGetOne(er);
        }
      }
      );
  }
  DataOptionGetAll(): void {
    this.formInfo.formSubmitAllow = false;
    this.translate.get('MESSAGE.Receiving_Options_From_The_Server').subscribe((str: string) => {
      this.formInfo.formAlert = str;
    });
    this.formInfo.formError = '';



    const filterModel = new FilterModel();

    const filter = new FilterDataModel();
    filter.propertyName = 'LinkPollingContentId';
    filter.value = this.dataModelResult.item.id;
    filterModel.filters.push(filter);
    this.pollingOptionService
      .ServiceGetAll(filterModel)
      .subscribe({
        next: (ret) => {

          this.formInfo.formSubmitAllow = true;
          this.dataOptionModelResult = ret;
          if (ret.isSuccess) {
            this.optionDataModel = ret.listItems;
            this.optionTabledataSource.data = ret.listItems;
          } else {
            this.cmsToastrService.typeErrorGetAll(ret.errorMessage);
          }
        },
        error: (er) => {

          this.formInfo.formSubmitAllow = true;
          this.cmsToastrService.typeErrorGetAll(er);
        }
      }
      );
  }


  DataAddContent(): void {
    this.formInfo.formSubmitAllow = false;
    this.translate.get('MESSAGE.sending_information_to_the_server').subscribe((str: string) => { this.formInfo.formAlert = str; });
    this.formInfo.formError = '';
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });


    this.pollingContentService
      .ServiceAdd(this.dataModel)
      .subscribe({
        next: (ret) => {
          this.publicHelper.processService.processStop(pName);
          this.dataModelResult = ret;
          if (ret.isSuccess) {
            this.cmsToastrService.typeSuccessAdd();
            this.dataModel = ret.item;
          } else {
            this.cmsToastrService.typeErrorAdd(ret.errorMessage);
          }
          this.formInfo.formAlert = '';
          this.formInfo.formSubmitAllow = true;
        },
        error: (er) => {
          this.publicHelper.processService.processStop(pName);
          this.formInfo.formSubmitAllow = true;
          this.cmsToastrService.typeErrorAdd(er);
        }
      }
      );
  }

  DataEditContent(): void {
    this.formInfo.formSubmitAllow = false;
    this.translate.get('MESSAGE.sending_information_to_the_server').subscribe((str: string) => { this.formInfo.formAlert = str; });
    this.formInfo.formError = '';
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });


    this.pollingContentService
      .ServiceEdit(this.dataModel)
      .subscribe({
        next: (ret) => {
          this.publicHelper.processService.processStop(pName);
          this.formInfo.formSubmitAllow = true;
          if (ret.isSuccess) {
            //**Get One */
            this.pollingContentService
              .ServiceGetOneById(this.dataModel.id)
              .subscribe({
                next: (ret) => {
                  this.publicHelper.processService.processStop(pName);
                  this.formInfo.formSubmitAllow = true;
                  this.dataModelResult = ret;
                  if (ret.isSuccess) {
                    this.dataModel = ret.item;
                  } else {
                    this.cmsToastrService.typeErrorEdit(ret.errorMessage);
                  }
                  this.publicHelper.processService.processStop(pName);
                },
                error: (er) => {
                  this.publicHelper.processService.processStop(pName);
                  this.formInfo.formSubmitAllow = true;
                  this.cmsToastrService.typeError(er);;
                }
              }
              );
            //**Get One */
            this.translate.get('MESSAGE.registration_completed_successfully').subscribe((str: string) => { this.formInfo.formAlert = str; });
            this.cmsToastrService.typeSuccessEdit();

            setTimeout(() => this.router.navigate(['/polling/content']), 1000);
          } else {
            this.cmsToastrService.typeErrorEdit(ret.errorMessage);
          }
          this.publicHelper.processService.processStop(pName);

        },
        error: (er) => {
          this.publicHelper.processService.processStop(pName);
          this.formInfo.formSubmitAllow = true;
          this.cmsToastrService.typeError(er);;
        }
      }
      );
  }

  onActionSelectorSelect(model: PollingCategoryModel | null): void {
    if (!model || model.id <= 0) {
      this.translate.get('MESSAGE.category_of_information_is_not_clear').subscribe((str: string) => { this.cmsToastrService.typeErrorSelected(str); });
      return;
    }
    this.dataModel.linkCategoryId = model.id;
  }

  onActionOptionAddToList(): void {
    if (!this.optionSelected) {
      return;
    }
    if (this.optionDataModel.find(x => x.option === this.optionSelected.option)) {
      this.cmsToastrService.typeErrorAddDuplicate();
      return;
    }

    this.optionActionButtomEnable = false;
    if (this.optionSelected.id > 0) {
      this.pollingOptionService.ServiceEdit(this.optionSelected).subscribe({
        next: (ret) => {
          if (ret.isSuccess) {
            this.optionSelected = new PollingOptionModel();
            this.translate.get('ACTION.Add_To_List').subscribe((str: string) => {
              this.optionActionTitle = str;
            });
            this.optionSelected = new PollingOptionModel();
            this.DataOptionGetAll();
          }
          else {
            this.cmsToastrService.typeErrorEdit(ret.errorMessage);
          }
          this.optionActionButtomEnable = true;
        },
        error: (er) => {
          this.cmsToastrService.typeError(er);
          this.optionActionButtomEnable = true;
        }
      }
      );
    }
    else {
      this.optionSelected.linkPollingContentId = this.dataModelResult.item.id;
      this.pollingOptionService.ServiceAdd(this.optionSelected).subscribe({
        next: (ret) => {
          if (ret.isSuccess) {
            this.optionSelected = new PollingOptionModel();
            this.translate.get('ACTION.Add_To_List').subscribe((str: string) => {
              this.optionActionTitle = str;
            });
            this.optionSelected = new PollingOptionModel();
            this.DataOptionGetAll();
          } else {
            this.cmsToastrService.typeErrorAdd(ret.errorMessage);
          }
          this.optionActionButtomEnable = true;
        },
        error: (er) => {
          this.cmsToastrService.typeError(er);
          this.optionActionButtomEnable = true;
        }
      }
      );

    }


  }
  onActionOptionRemoveFromList(index: number): void {

    if (index < 0) {
      return;
    }
    if (!this.optionDataModel || this.optionDataModel.length === 0) {
      return;
    }
    this.optionSelected = this.optionDataModel[index];
    this.pollingOptionService.ServiceDelete(this.optionSelected.id).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.DataOptionGetAll();
          this.optionSelected = new PollingOptionModel();
        } else {
          this.cmsToastrService.typeErrorRemove(ret.errorMessage);
        }
      },
      error: (er) => {
        this.cmsToastrService.typeError(er);
      }
    }
    );
  }
  onActionOptionEditFromList(index: number): void {

    if (index < 0) {
      return;
    }
    if (!this.optionDataModel || this.optionDataModel.length === 0) {
      return;
    }
    this.optionSelected = this.optionDataModel[index];
    this.optionDataModel.splice(index, 1);
    this.optionTabledataSource.data = this.optionDataModel;
    this.translate.get('ACTION.EDIT').subscribe((str: string) => {
      this.optionActionTitle = str;
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
    if (!this.dataModelResult || !this.dataModelResult.item || this.dataModelResult.item.id <= 0) {
      this.DataAddContent();
    }
  }
  onActionBackToParent(): void {
    this.router.navigate(['/polling/content/']);
  }
  receiveMap(model: leafletMap = this.mapModel): void {
    if (!model) {
      return;
    }
    this.mapModel = model;

    if (this.mapMarkerPoints && this.mapMarkerPoints.length > 0) {
      this.mapMarkerPoints.forEach(item => {
        this.mapMarker = Leaflet.marker([item.lat, item.lon]).addTo(this.mapModel);
      });
      this.mapOptonCenter = this.mapMarkerPoints[0];
      this.mapMarkerPoints = [];
    }

    this.mapModel.on('click', (e) => {
      // @ts-ignore
      const lat = e.latlng.lat;
      // @ts-ignore
      const lon = e.latlng.lng;
      if (this.mapMarker !== undefined) {
        this.mapModel.removeLayer(this.mapMarker);
      }
      if (lat === this.dataModel.geolocationlatitude && lon === this.dataModel.geolocationlongitude) {
        this.dataModel.geolocationlatitude = null;
        this.dataModel.geolocationlongitude = null;
        return;
      }
      this.mapMarker = Leaflet.marker([lat, lon]).addTo(this.mapModel);
      this.dataModel.geolocationlatitude = lat;
      this.dataModel.geolocationlongitude = lon;
    });

  }

  receiveZoom(mode: leafletMap): void {
  }

  onActionSelectorLocation(model: CoreLocationModel | null): void {
    if (!model || !model.id || model.id <= 0) {
      this.translate.get('MESSAGE.Information_area_deleted').subscribe((str: string) => { this.cmsToastrService.typeWarningSelected(str); });
      this.dataModel.linkLocationId = null;
      return;
    }
    this.dataModel.linkLocationId = model.id;
  }
}
