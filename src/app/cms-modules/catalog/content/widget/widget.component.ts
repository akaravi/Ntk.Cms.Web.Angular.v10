
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CatalogContentService, FilterDataModel, FilterModel, RecordStatusEnum } from 'ntk-cms-api';
import { Subscription } from 'rxjs';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { WidgetContentInfoModel, WidgetInfoModel } from 'src/app/core/models/widget-info-model';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
import { CmsStoreService } from 'src/app/core/reducers/cmsStore.service';


@Component({
  selector: 'app-catalog-content-widget',
  templateUrl: './widget.component.html',
  standalone: false
})

export class CatalogContentWidgetComponent implements OnInit, OnDestroy {


  constructorInfoAreaId = this.constructor.name;
  constructor(
    private service: CatalogContentService,
    private cmsToastrService: CmsToastrService,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
    private tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
    public translate: TranslateService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;

  }
  filteModelContent = new FilterModel();

  widgetInfoModel = new WidgetInfoModel();
  cmsApiStoreSubscribe: Subscription;


  ngOnInit() {
    this.widgetInfoModel.title = this.translate.instant('TITLE.Registered_Catalog');
    this.widgetInfoModel.description = '';
    this.widgetInfoModel.link = '/catalog/content';

    setTimeout(() => {

      this.onActionStatist();
    }, 1000);

    this.cmsApiStoreSubscribe = this.cmsStoreService.getState((state) => state.tokenInfoStore).subscribe(async (value) => {
      this.widgetInfoModel.title = this.translate.instant('TITLE.Registered_Catalog');
      this.onActionStatist();
    });

  }

  onActionButtonReload(): void {
    this.onActionStatist();
  }

  ngOnDestroy(): void {
    if (this.cmsApiStoreSubscribe) {
      this.cmsApiStoreSubscribe.unsubscribe();
    }

  }

  onActionStatist(): void {
    this.publicHelper.processService.processStart(this.constructor.name + 'Active', this.translate.instant('MESSAGE.Get_active_catalog_statistics'), this.constructorInfoAreaId);
    this.publicHelper.processService.processStart(this.constructor.name + 'All', this.translate.instant('MESSAGE.Get_statistics_on_all_catalog'), this.constructorInfoAreaId);
    this.widgetInfoModel.setItem(new WidgetContentInfoModel('Active', 0, 0, ''));
    this.widgetInfoModel.setItem(new WidgetContentInfoModel('All', 1, 0, ''));
    this.service.ServiceGetCount(this.filteModelContent).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.widgetInfoModel.setItem(new WidgetContentInfoModel('All', 1, ret.totalRowCount, this.widgetInfoModel.link));
        } else {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.publicHelper.processService.processStop(this.constructor.name + 'All');
      },
      error: (er) => {
        this.publicHelper.processService.processStop(this.constructor.name + 'All');
      }
    }
    );

    const filterStatist1 = JSON.parse(JSON.stringify(this.filteModelContent));
    const fastfilter = new FilterDataModel();
    fastfilter.propertyName = 'RecordStatus';
    fastfilter.value = RecordStatusEnum.Available;
    filterStatist1.filters.push(fastfilter);
    this.service.ServiceGetCount(filterStatist1).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.widgetInfoModel.setItem(new WidgetContentInfoModel('Active', 0, ret.totalRowCount, this.widgetInfoModel.link));
        } else {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.publicHelper.processService.processStop(this.constructor.name + 'Active');
      },
      error: (er) => {
        this.publicHelper.processService.processStop(this.constructor.name + 'Active');
      }
    }
    );
  }
  translateHelp(t: string, v: string): string {
    return t + v;
  }
}
