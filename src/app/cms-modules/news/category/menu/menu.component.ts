import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ErrorExceptionResult, FilterDataModel, FilterModel, NewsCategoryModel, NewsCategoryService, TokenInfoModelV3 } from 'ntk-cms-api';
import { Subscription } from 'rxjs';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { CmsImageThumbnailPipe } from 'src/app/core/pipe/cms-image-thumbnail.pipe';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
import { CmsStoreService } from 'src/app/core/reducers/cmsStore.service';


@Component({
  selector: 'app-news-category-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: false
})
export class NewsCategoryMenuComponent implements OnInit, OnDestroy {
  requestLinkParentId = 0;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    public tokenHelper: TokenHelper,
    public categoryService: NewsCategoryService,
    private cmsToastrService: CmsToastrService,
    private activatedRoute: ActivatedRoute,
    private cmsStoreService: CmsStoreService,
    private router: Router,
    public translate: TranslateService,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
  ) {
    this.publicHelper.processService.cdr = this.cdr;

    this.activatedRoute.params.subscribe((data) => {
      this.requestLinkParentId = + Number(this.activatedRoute.snapshot.paramMap.get('LinkParentId'));
      this.loadData();
    });
    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;
    if (this.tokenInfo) {
      if (this.tokenInfo && this.tokenInfo.access.userId > 0 && this.tokenInfo.access.siteId > 0) {
        this.loadData();
      }
    }
    this.cmsApiStoreSubscribe = this.cmsStoreService.getState((state) => state.tokenInfoStore).subscribe(async (value) => {
      this.tokenInfo = value;
      if (this.tokenInfo && this.tokenInfo.access.userId > 0 && this.tokenInfo.access.siteId > 0) {
        this.loadData();
      }
    });
  }
  routerLinkContect = '/news/content/';
  routerLinkCategory = '/news/category/';


  cmsApiStoreSubscribe: Subscription;
  tokenInfo = new TokenInfoModelV3();
  dataModelResult: ErrorExceptionResult<NewsCategoryModel> = new ErrorExceptionResult<NewsCategoryModel>();
  dataListResult: NewsCategoryModel[] = [];
  filterModel = new FilterModel();
  cmsImageThumbnailPipe = new CmsImageThumbnailPipe();
  ngOnInit(): void {

  }
  ngOnDestroy() {
    if (this.cmsApiStoreSubscribe) {
      this.cmsApiStoreSubscribe.unsubscribe();
    }
  }
  loadData() {
    this.DataGetAll();
  }
  DataGetAll(): void {
    this.filterModel.rowPerPage = 200;
    this.filterModel.accessLoad = true;
    if (this.requestLinkParentId > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = 'linkParentId';
      filter.value = this.requestLinkParentId;
      this.filterModel.filters.push(filter);
    }
    const pName = this.constructor.name + '.ServiceGetAll';
    this.translate.get('MESSAGE.get_categories').subscribe((str: string) => { this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId); });
    this.categoryService.ServiceGetAll(this.filterModel).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.dataModelResult = ret;
          this.DataListSelect();
        }
        else {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.publicHelper.processService.processStop(pName);
      },
      error: (er) => {
        this.publicHelper.processService.processStop(pName);
        this.cmsToastrService.typeError(er);
      }
    }
    );
  }
  DataListSelect() {
    this.dataListResult = [];
    if (!this.requestLinkParentId || this.requestLinkParentId === 0) {
      this.dataListResult = this.dataModelResult.listItems;
      return;
    }
    var findRow = this.dataModelResult.listItems.filter(x => x.id === this.requestLinkParentId);
    if (findRow && findRow.length > 0 && findRow[0].children && findRow[0].children.length > 0)
      this.dataListResult = findRow[0].children;
  }
  onActionClickMenu(item: NewsCategoryModel) {
    if (!item) {
      this.router.navigate([this.routerLinkCategory + '/LinkParentId/', 0]);
      return;
    }
    if (item.children?.length > 0) {
      this.router.navigate([this.routerLinkCategory + '/LinkParentId/', item.id]);
      return;
    }
    this.router.navigate([this.routerLinkContect + '/LinkCategoryId/', item.id]);
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: `smooth` });
  }
}
