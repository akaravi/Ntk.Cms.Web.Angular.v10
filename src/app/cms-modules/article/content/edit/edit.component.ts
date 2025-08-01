
import { ENTER } from '@angular/cdk/keycodes';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as Leaflet from 'leaflet';
import { Map as leafletMap } from 'leaflet';
import {
  AccessModel, ArticleCategoryModel, ArticleContentCategoryModel, ArticleContentCategoryService, ArticleContentModel, ArticleContentOtherInfoModel, ArticleContentOtherInfoService, ArticleContentService, ArticleContentSimilarModel, ArticleContentSimilarService, ArticleContentTagModel, ArticleContentTagService, ClauseTypeEnum, CoreLocationModel,
  ErrorExceptionResult, ErrorExceptionResultBase, FilterDataModel, FilterModel,
  FormInfoModel,
  ManageUserAccessDataTypesEnum
} from 'ntk-cms-api';
import { NodeInterface, TreeModel } from 'ntk-cms-filemanager';
import { firstValueFrom, of } from 'rxjs';
import { EditBaseComponent } from 'src/app/core/cmsComponent/editBaseComponent';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { PoinModel } from 'src/app/core/models/pointModel';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
@Component({
    selector: 'app-article-content-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss'
    ],
    standalone: false
})
export class ArticleContentEditComponent extends EditBaseComponent<ArticleContentService, ArticleContentModel, number>
  implements OnInit {
  requestId = 0;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private activatedRoute: ActivatedRoute,
    public publicHelper: PublicHelper,
    public contentService: ArticleContentService,
    private contentTagService: ArticleContentTagService,
    private contentSimilarService: ArticleContentSimilarService,
    private contentOtherInfoService: ArticleContentOtherInfoService,
    private cmsToastrService: CmsToastrService,
    private contentCategoryService: ArticleContentCategoryService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
  ) {
    super(contentService, new ArticleContentModel(), publicHelper, translate);

    this.publicHelper.processService.cdr = this.cdr;

    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
  }
  @ViewChild('vform', { static: false }) formGroup: FormGroup;

  dataModel = new ArticleContentModel();
  dataModelResult: ErrorExceptionResultBase = new ErrorExceptionResultBase();
  dataContentTagModelResult: ErrorExceptionResult<ArticleContentTagModel> = new ErrorExceptionResult<ArticleContentTagModel>();
  dataContentSimilarModelResult: ErrorExceptionResult<ArticleContentSimilarModel> = new ErrorExceptionResult<ArticleContentSimilarModel>();
  dataContentOtherInfoModelResult: ErrorExceptionResult<ArticleContentOtherInfoModel>
    = new ErrorExceptionResult<ArticleContentOtherInfoModel>();

  dataContentCategoryModel: number[] = [];
  similarDataModel = new Array<ArticleContentModel>();
  otherInfoDataModel = new Array<ArticleContentOtherInfoModel>();
  contentSimilarSelected: ArticleContentModel = new ArticleContentModel();
  contentOtherInfoSelected: ArticleContentOtherInfoModel = new ArticleContentOtherInfoModel();
  otherInfoTabledisplayedColumns = ['Id', 'Title', 'TypeId', 'Action'];
  similarTabledisplayedColumns = ['LinkMainImageIdSrc', 'Id', 'RecordStatus', 'Title', 'Action'];
  similarTabledataSource = new MatTableDataSource<ArticleContentModel>();
  otherInfoTabledataSource = new MatTableDataSource<ArticleContentOtherInfoModel>();
  dataAccessModel: AccessModel;

  selectFileTypeMainImage = ['jpg', 'jpeg', 'png'];
  selectFileTypePodcast = ['mp3'];
  selectFileTypeMovie = ['mp4', 'webm'];
  formInfo: FormInfoModel = new FormInfoModel();
  fileManagerOpenForm = false;
  fileManagerOpenFormPodcast = false;
  fileManagerOpenFormMovie = false;
  fileManagerTree: TreeModel;
  keywordDataModel = [];
  tagIdsData: number[];
  appLanguage = 'fa';
  /** map */
  viewMap = false;
  private mapModel: leafletMap;
  mapMarker: any;
  private mapMarkerPoints: Array<PoinModel> = [];
  mapOptonCenter = new PoinModel();
  ngOnInit(): void {
    this.requestId = + Number(this.activatedRoute.snapshot.paramMap.get('Id'));
    if (this.requestId === 0) {
      this.cmsToastrService.typeErrorAddRowParentIsNull();
      return;
    }
    this.DataGetOne();
    this.DataCategoryGetAll();

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
    if (this.requestId <= 0) {
      this.cmsToastrService.typeErrorAddRowParentIsNull();
      return;
    }
    if (!this.formGroup.valid) {
      this.cmsToastrService.typeErrorFormInvalid();
      return;
    }
    this.dataModel.keyword = '';
    if (this.keywordDataModel && this.keywordDataModel.length > 0) {
      const listKeyword = [];
      this.keywordDataModel.forEach(element => {
        if (element.display) {
          listKeyword.push(element.display);
        } else {
          listKeyword.push(element);
        }
      });
      if (listKeyword && listKeyword.length > 0) {
        this.dataModel.keyword = listKeyword.join(',');
      }
    }
    this.DataEditContent();
  }
  DataGetOne(): void {
    this.formInfo.formSubmitAllow = false;
    this.translate.get('MESSAGE.get_information_from_the_server').subscribe((str: string) => { this.formInfo.formAlert = str; });
    this.formInfo.formError = '';
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.get_information_list').subscribe((str: string) => { this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId); });
    /*َAccess Field*/
    this.contentService.setAccessLoad();
    this.contentService.setAccessDataType(ManageUserAccessDataTypesEnum.Editor);
    this.contentService
      .ServiceGetOneById(this.requestId)
      .subscribe({
        next: (ret) => {
          /*َAccess Field*/
          this.dataAccessModel = ret.access;
          this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
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
            this.dataModel.keyword = this.dataModel.keyword + '';
            this.keywordDataModel = this.dataModel.keyword.split(',');
            this.DataTagGetAll();
            this.DataOtherInfoGetAll();
            this.DataSimilarGetAllIds();
          } else {
            this.cmsToastrService.typeErrorGetOne(ret.errorMessage);
          }
          this.publicHelper.processService.processStop(pName);
        },
        error: (er) => {

          this.formInfo.formSubmitAllow = true;
          this.cmsToastrService.typeErrorGetOne(er);
          this.publicHelper.processService.processStop(pName, false);
        }
      }
      );
  }
  DataTagGetAll(): void {
    this.formInfo.formSubmitAllow = false;
    this.translate.get('MESSAGE.Receiving_tag_information_from_the_server').subscribe((str: string) => { this.formInfo.formAlert = str; });
    this.formInfo.formError = '';
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.Receiving_tag_information_from_the_server').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });
    const filterModel = new FilterModel();
    const filter = new FilterDataModel();
    filter.propertyName = 'LinkContentId';
    filter.value = this.requestId;
    filter.clauseType = ClauseTypeEnum.And;
    filterModel.filters.push(filter);
    this.tagIdsData = [];
    this.contentTagService
      .ServiceGetAll(filterModel)
      .subscribe({
        next: (ret) => {
          this.dataContentTagModelResult = ret;
          this.formInfo.formSubmitAllow = true;
          if (ret.isSuccess) {
            const list = [];
            this.dataContentTagModelResult.listItems.forEach(x => {
              list.push(x.linkTagId);
            });
            this.tagIdsData = list;
          } else {
            this.cmsToastrService.typeErrorGetAll(ret.errorMessage);
          }
          this.publicHelper.processService.processStop(pName);
        },
        error: (er) => {
          this.formInfo.formSubmitAllow = true;
          this.cmsToastrService.typeErrorGetAll(er);
          this.publicHelper.processService.processStop(pName);
        }
      }
      );
  }
  DataOtherInfoGetAll(): void {
    this.formInfo.formSubmitAllow = false;
    this.translate.get('MESSAGE.get_other_information_from_the_server').subscribe((str: string) => { this.formInfo.formAlert = str; });
    this.formInfo.formError = '';
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.get_other_information_from_the_server').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });
    const filterModel = new FilterModel();
    const filter = new FilterDataModel();
    filter.propertyName = 'LinkContentId';
    filter.value = this.requestId;
    filter.clauseType = ClauseTypeEnum.And;
    filterModel.filters.push(filter);
    this.contentOtherInfoService
      .ServiceGetAll(filterModel)
      .subscribe({
        next: (ret) => {
          this.formInfo.formSubmitAllow = true;
          this.dataContentOtherInfoModelResult = ret;
          if (ret.isSuccess) {
            this.otherInfoDataModel = ret.listItems;
            this.otherInfoTabledataSource.data = ret.listItems;
          } else {
            this.cmsToastrService.typeErrorGetAll(ret.errorMessage);
          }
          this.publicHelper.processService.processStop(pName);
        },
        error: (er) => {

          this.formInfo.formSubmitAllow = true;
          this.cmsToastrService.typeErrorGetAll(er);
          this.publicHelper.processService.processStop(pName);
        }
      }
      );
  }
  DataSimilarGetAllIds(): void {
    this.formInfo.formSubmitAllow = false;
    this.translate.get('MESSAGE.get_other_information_from_the_server').subscribe((str: string) => { this.formInfo.formAlert = str; });
    this.formInfo.formError = '';
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.get_other_information_from_the_server').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });
    const filterModel = new FilterModel();
    const filter = new FilterDataModel();
    filter.propertyName = 'LinkSourceId';
    filter.value = this.requestId;
    filter.clauseType = ClauseTypeEnum.Or;
    filterModel.filters.push(filter);
    filter.propertyName = 'LinkDestinationId';
    filter.value = this.requestId;
    filter.clauseType = ClauseTypeEnum.Or;
    filterModel.filters.push(filter);
    this.contentSimilarService
      .ServiceGetAll(filterModel)
      .subscribe({
        next: (ret) => {
          this.formInfo.formSubmitAllow = true;
          this.dataContentSimilarModelResult = ret;
          if (ret.isSuccess) {
            const listIds = Array<number>();
            ret.listItems.forEach(x => {
              if (x.linkDestinationId === this.requestId) {
                listIds.push(x.linkSourceId);
              } else {
                listIds.push(x.linkDestinationId);
              }
            });
            this.DataSimilarGetAll(listIds);
          } else {
            this.cmsToastrService.typeErrorGetAll(ret.errorMessage);
          }
          this.publicHelper.processService.processStop(pName);
        },
        error: (er) => {
          this.formInfo.formSubmitAllow = true;
          this.cmsToastrService.typeErrorGetAll(er);
          this.publicHelper.processService.processStop(pName);
        }
      }
      );
  }
  DataSimilarGetAll(ids: Array<number>): void {
    if (!ids || ids.length === 0) {
      return;
    }
    this.formInfo.formSubmitAllow = false;
    this.translate.get('MESSAGE.get_other_information_from_the_server').subscribe((str: string) => { this.formInfo.formAlert = str; });
    this.formInfo.formError = '';
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.get_other_information_from_the_server').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });
    const filterModel = new FilterModel();
    ids.forEach(item => {
      if (item > 0) {
        const filter = new FilterDataModel();
        filter.propertyName = 'Id';
        filter.value = item;
        filter.clauseType = ClauseTypeEnum.Or;
        filterModel.filters.push(filter);
      }
    });
    this.contentService
      .ServiceGetAll(filterModel)
      .subscribe({
        next: (ret) => {
          this.formInfo.formSubmitAllow = true;
          if (ret.isSuccess) {
            this.similarDataModel = ret.listItems;
            this.similarTabledataSource.data = ret.listItems;
          } else {
            this.cmsToastrService.typeErrorGetAll(ret.errorMessage);
          }
          this.publicHelper.processService.processStop(pName);
        },
        error: (er) => {

          this.formInfo.formSubmitAllow = true;
          this.cmsToastrService.typeErrorGetAll(er);
          this.publicHelper.processService.processStop(pName);
        }
      }
      );
  }
  DataEditContent(): void {
    this.formInfo.formSubmitAllow = false;
    this.translate.get('MESSAGE.sending_information_to_the_server').subscribe((str: string) => { this.formInfo.formAlert = str; });
    this.formInfo.formError = '';
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.sending_information_to_the_server').subscribe((str: string) => { this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId); });
    this.contentService
      .ServiceEdit(this.dataModel)
      .subscribe({
        next: async (ret) => {
          this.publicHelper.processService.processStop(pName);
          this.formInfo.formSubmitAllow = true;
          this.dataModelResult = ret;
          if (ret.isSuccess) {
            this.translate.get('MESSAGE.registration_completed_successfully').subscribe((str: string) => { this.formInfo.formAlert = str; });
            this.cmsToastrService.typeSuccessEdit();
            await this.DataActionAfterAddContentSuccessfulTag(this.dataModel);
            await this.DataActionAfterAddContentSuccessfulSimilar(this.dataModel);
            await this.DataActionAfterAddContentSuccessfulOtherInfo(this.dataModel);
            setTimeout(() => this.router.navigate(['/article/content']), 1000);
          } else {
            this.cmsToastrService.typeErrorEdit(ret.errorMessage);
          }
          this.publicHelper.processService.processStop(pName);
        },
        error: (err) => {

          this.formInfo.formSubmitAllow = true;
          this.cmsToastrService.typeErrorEdit(err);
          this.publicHelper.processService.processStop(pName);
        }
      }
      );
  }
  async DataActionAfterAddContentSuccessfulTag(model: ArticleContentModel): Promise<any> {
    const dataListAdd = new Array<ArticleContentTagModel>();
    const dataListDelete = new Array<ArticleContentTagModel>();
    if (this.tagIdsData) {
      this.tagIdsData.forEach(item => {
        const row = new ArticleContentTagModel();
        row.linkContentId = model.id;
        row.linkTagId = item;
        if (!this.dataContentTagModelResult.listItems || !this.dataContentTagModelResult.listItems.find(x => x.linkTagId === item)) {
          dataListAdd.push(row);
        }
      });
    }
    if (this.dataContentTagModelResult.listItems) {
      this.dataContentTagModelResult.listItems.forEach(item => {
        if (!this.tagIdsData || !this.tagIdsData.find(x => x === item.linkTagId)) {
          dataListDelete.push(item);
        }
      });
    }
    if (dataListAdd && dataListAdd.length > 0) {
      firstValueFrom(this.contentTagService.ServiceAddBatch(dataListAdd)).then(
        (ret) => {
          if (ret.isSuccess) {
            this.cmsToastrService.typeSuccessAddTag();
          } else {
            this.cmsToastrService.typeErrorAddTag();
          }

          return of(ret);
        });
    }
    if (dataListDelete && dataListDelete.length > 0) {
      firstValueFrom(this.contentTagService.ServiceDeleteBatch(dataListDelete)).then(
        (ret) => {
          if (ret.isSuccess) {
            this.cmsToastrService.typeSuccessRemoveTag();
          } else {
            this.cmsToastrService.typeErrorRemoveTag();
          }

          return of(ret);
        });
    }
  }
  async DataActionAfterAddContentSuccessfulOtherInfo(model: ArticleContentModel): Promise<any> {
    const dataListAdd = new Array<ArticleContentOtherInfoModel>();
    const dataListDelete = new Array<ArticleContentOtherInfoModel>();
    if (this.otherInfoDataModel) {
      this.otherInfoDataModel.forEach(item => {
        const row = new ArticleContentOtherInfoModel();
        row.linkContentId = model.id;
        if (!this.dataContentOtherInfoModelResult.listItems ||
          !item.id ||
          !this.dataContentOtherInfoModelResult.listItems.find(x => x.id === item.id)) {
          dataListAdd.push(row);
        }
      });
    }
    if (this.dataContentOtherInfoModelResult.listItems) {
      this.dataContentOtherInfoModelResult.listItems.forEach(item => {
        if (!this.otherInfoDataModel || !this.otherInfoDataModel.find(x => x.id === item.id)) {
          dataListDelete.push(item);
        }
      });
    }
    if (dataListAdd && dataListAdd.length > 0) {
    }
    if (dataListDelete && dataListDelete.length > 0) {
    }
  }
  async DataActionAfterAddContentSuccessfulSimilar(model: ArticleContentModel): Promise<any> {
    const dataListAdd = new Array<ArticleContentSimilarModel>();
    const dataListDelete = new Array<ArticleContentSimilarModel>();
    if (this.similarDataModel) {
      this.similarDataModel.forEach(item => {
        const row = new ArticleContentSimilarModel();
        row.linkSourceId = model.id;
        row.linkDestinationId = item.id;
        if (!this.dataContentSimilarModelResult.listItems ||
          !this.dataContentSimilarModelResult.listItems.find(x => x.linkSourceId === item.id || x.linkDestinationId === item.id)) {
          dataListAdd.push(row);
        }
      });
    }
    if (this.dataContentSimilarModelResult.listItems) {
      this.dataContentSimilarModelResult.listItems.forEach(item => {
        if (!this.similarDataModel || !this.similarDataModel.find(x => x.id === item.linkSourceId || x.id === item.linkDestinationId)) {
          dataListDelete.push(item);
        }
      });
    }
    if (dataListAdd && dataListAdd.length > 0) {
    }
    if (dataListDelete && dataListDelete.length > 0) {
    }
  }
  onActionSelectorSelect(model: ArticleCategoryModel | null): void {
    if (!model || model.id <= 0) {
      this.translate.get('MESSAGE.category_of_information_is_not_clear').subscribe((str: string) => { this.cmsToastrService.typeErrorSelected(str); });
      return;
    }
    this.dataModel.linkCategoryId = model.id;
  }
  DataCategoryGetAll(): void {
    this.formInfo.formSubmitAllow = false;
    this.translate.get('MESSAGE.get_category_information_from_the_server').subscribe((str: string) => { this.formInfo.formAlert = str; });
    this.formInfo.formError = '';
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.get_category_information_from_the_server').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });
    const filterModel = new FilterModel();
    const filter = new FilterDataModel();
    filter.propertyName = 'LinkContentId';
    filter.value = this.requestId;
    filter.clauseType = ClauseTypeEnum.And;
    filterModel.filters.push(filter);
    this.tagIdsData = [];
    this.contentCategoryService
      .ServiceGetAll(filterModel)
      .subscribe({
        next: (ret) => {
          const itemList = [];
          ret.listItems.forEach(element => {
            itemList.push(element.linkCategoryId);
          });
          this.dataContentCategoryModel = itemList;
          this.formInfo.formSubmitAllow = true;
          this.publicHelper.processService.processStop(pName);
        },
        error: (er) => {
          this.formInfo.formSubmitAllow = true;
          this.cmsToastrService.typeErrorGetAll(er);
          this.publicHelper.processService.processStop(pName);
        }
      }
      );
  }
  onActionCategorySelectChecked(model: number): void {
    if (!model || model <= 0) {
      this.translate.get('MESSAGE.category_of_information_is_not_clear').subscribe((str: string) => { this.cmsToastrService.typeErrorSelected(str); });
      return;
    }
    const entity = new ArticleContentCategoryModel();
    entity.linkCategoryId = model;
    entity.linkContentId = this.dataModel.id;
    this.contentCategoryService.ServiceAdd(entity).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.translate.get('MESSAGE.registration_in_this_group_was_successful').subscribe((str: string) => { this.formInfo.formAlert = str; });
          this.cmsToastrService.typeSuccessEdit();
        } else {
          this.translate.get('ERRORMESSAGE.MESSAGE.typeError').subscribe((str: string) => { this.formInfo.formAlert = str; });
          this.formInfo.formError = ret.errorMessage;
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
      },
      error: (er) => {
        this.formInfo.formSubmitAllow = true;
        this.cmsToastrService.typeError(er);
      }
    }
    );
  }
  onActionCategorySelectDisChecked(model: number): void {
    if (!model || model <= 0) {
      this.translate.get('MESSAGE.category_of_information_is_not_clear').subscribe((str: string) => { this.cmsToastrService.typeErrorSelected(str); });
      return;
    }
    const entity = new ArticleContentCategoryModel();
    entity.linkCategoryId = model;
    entity.linkContentId = this.dataModel.id;
    this.contentCategoryService.ServiceDeleteEntity(entity).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.translate.get('MESSAGE.registration_in_this_group_was_successful').subscribe((str: string) => { this.formInfo.formAlert = str; });
          this.cmsToastrService.typeSuccessEdit();
        } else {
          this.translate.get('ERRORMESSAGE.MESSAGE.typeError').subscribe((str: string) => { this.formInfo.formAlert = str; });
          this.formInfo.formError = ret.errorMessage;
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
      },
      error: (er) => {
        this.formInfo.formSubmitAllow = true;
        this.cmsToastrService.typeError(er);
      }
    }
    );
  }
  onActionTagChange(ids: number[]): void {
    this.tagIdsData = ids;
  }
  onActionContentSimilarSelect(model: ArticleContentModel | null): void {
    if (!model || model.id <= 0) {
      return;
    }
    this.contentSimilarSelected = model;
  }
  onActionContentSimilarAddToLIst(): void {
    if (!this.contentSimilarSelected || this.contentSimilarSelected.id <= 0) {
      return;
    }
    if (this.similarDataModel.find(x => x.id === this.contentSimilarSelected.id)) {
      this.cmsToastrService.typeErrorAddDuplicate();
      return;
    }
    this.similarDataModel.push(this.contentSimilarSelected);
    this.similarTabledataSource.data = this.similarDataModel;
  }
  onActionContentSimilarRemoveFromLIst(model: ArticleContentModel | null): void {
    if (!model || model.id <= 0) {
      return;
    }
    if (!this.similarDataModel || this.similarDataModel.length === 0) {
      return;
    }
    const retOut = new Array<ArticleContentModel>();
    this.similarDataModel.forEach(x => {
      if (x.id !== model.id) {
        retOut.push(x);
      }
    });
    this.similarDataModel = retOut;
    this.similarTabledataSource.data = this.similarDataModel;
  }
  onActionContentOtherInfoAddToLIst(): void {
    if (!this.contentOtherInfoSelected) {
      return;
    }
    if (this.otherInfoDataModel.find(x => x.title === this.contentOtherInfoSelected.title)) {
      this.cmsToastrService.typeErrorAddDuplicate();
      return;
    }
    this.otherInfoDataModel.push(this.contentOtherInfoSelected);
    this.contentOtherInfoSelected = new ArticleContentOtherInfoModel();
    this.otherInfoTabledataSource.data = this.otherInfoDataModel;
  }
  onActionContentOtherInfoRemoveFromLIst(index: number): void {
    if (index < 0) {
      return;
    }
    if (!this.otherInfoDataModel || this.otherInfoDataModel.length === 0) {
      return;
    }
    this.otherInfoDataModel.splice(index, 1);
    this.otherInfoTabledataSource.data = this.otherInfoDataModel;
  }
  onActionContentOtherInfoEditFromLIst(index: number): void {
    if (index < 0) {
      return;
    }
    if (!this.otherInfoDataModel || this.otherInfoDataModel.length === 0) {
      return;
    }
    this.contentOtherInfoSelected = this.otherInfoDataModel[index];
    this.otherInfoDataModel.splice(index, 1);
    this.otherInfoTabledataSource.data = this.otherInfoDataModel;
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
    this.router.navigate(['/article/content/']);
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
  /**
    * tag
    */
  addOnBlurTag = true;
  readonly separatorKeysCodes = [ENTER] as const;
  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our item
    if (value) {
      this.keywordDataModel.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  removeTag(item: string): void {
    const index = this.keywordDataModel.indexOf(item);

    if (index >= 0) {
      this.keywordDataModel.splice(index, 1);
    }
  }
  /**
   * tag
   */
}
