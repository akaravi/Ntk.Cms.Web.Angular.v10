import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EstatePropertyService, FilterDataModel, FilterModel, ManageUserAccessDataTypesEnum, RecordStatusEnum } from 'ntk-cms-api';
import { Subscription, forkJoin } from 'rxjs';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { ChartOptionsModel } from 'src/app/core/models/chartOptionsModel';
import { WidgetContentInfoModel, WidgetInfoModel } from 'src/app/core/models/widget-info-model';
import { CmsStoreService } from 'src/app/core/reducers/cmsStore.service';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';


@Component({
  selector: 'app-estate-property-widget',
  templateUrl: './widget.component.html',
  standalone: false
})

export class EstatePropertyWidgetComponent implements OnInit, OnDestroy {
  @Input() cssClass = '';

  constructorInfoAreaId = this.constructor.name;
  constructor(
    private service: EstatePropertyService,
    private cdr: ChangeDetectorRef,
    private cmsToastrService: CmsToastrService,
    private cmsStoreService: CmsStoreService,
    public publicHelper: PublicHelper,
    public translate: TranslateService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;


    /** chart*/
    this.chartOptions = {
      series: [],
      labels: [],
      chart: {
        width: 380,
        type: "pie"
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    /** chart*/



  }

  public chartOptions: Partial<ChartOptionsModel>;
  filteModelContent = new FilterModel();
  widgetInfoModel = new WidgetInfoModel();
  cmsApiStoreSubscribe: Subscription;


  rowExist = false;
  ngOnInit() {
    this.widgetInfoModel.title = this.translate.instant('TITLE.Registered_property');
    this.widgetInfoModel.description = this.translate.instant('TITLE.Introduction_of_your_property');
    this.widgetInfoModel.link = '/estate/property';

    setTimeout(() => {

      this.onActionStatist();
    }, 1000);

    this.cmsApiStoreSubscribe = this.cmsStoreService.getState((state) => state.tokenInfoStore).subscribe(async (value) => {
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
  async onActionStatist() {
    this.publicHelper.processService.processStart(this.constructor.name + 'All', this.translate.instant('MESSAGE.property_list'), this.constructorInfoAreaId);
    this.service.setAccessDataType(ManageUserAccessDataTypesEnum.Editor);
    //*filter */
    const filterStatist0 = JSON.parse(JSON.stringify(this.filteModelContent));
    const fastfilter0 = new FilterDataModel();
    fastfilter0.propertyName = 'RecordStatus';
    fastfilter0.value = RecordStatusEnum.Available;
    filterStatist0.filters.push(fastfilter0);
    const s0 = this.service.ServiceGetCount(filterStatist0);
    //*filter */
    const filterStatist1 = JSON.parse(JSON.stringify(this.filteModelContent));
    const fastfilter1 = new FilterDataModel();
    fastfilter1.propertyName = 'RecordStatus';
    fastfilter1.value = RecordStatusEnum.Disable;
    filterStatist1.filters.push(fastfilter1);
    const s1 = this.service.ServiceGetCount(filterStatist1);
    //*filter */
    const filterStatist2 = JSON.parse(JSON.stringify(this.filteModelContent));
    const fastfilter2 = new FilterDataModel();
    fastfilter2.propertyName = 'RecordStatus';
    fastfilter2.value = RecordStatusEnum.Pending;
    filterStatist2.filters.push(fastfilter2);
    const s2 = this.service.ServiceGetCount(filterStatist2);
    var series = [];
    var labels = [];
    forkJoin([s0, s1, s2]).subscribe(results => {
      //*results */
      var ret = results[0];
      series[0] = ret.totalRowCount;
      labels[0] = this.translate.instant('TITLE.Active');
      if (ret.isSuccess) {
        this.rowExist = true;
        this.widgetInfoModel.description = this.translate.instant('TITLE.Number_Registered_Property') + ' : ' + ret.totalRowCount;
      }

      if (ret.isSuccess) {
        this.widgetInfoModel.setItem(new WidgetContentInfoModel('Available', 0, ret.totalRowCount, '/estate/property/recordstatus/Available'));
      } else {
        this.cmsToastrService.typeErrorMessage(ret.errorMessage);
      }
      //*results */
      ret = results[1];
      series[1] = ret.totalRowCount;
      labels[1] = this.translate.instant('TITLE.InActive');
      if (ret.isSuccess) {
        this.widgetInfoModel.setItem(new WidgetContentInfoModel('Disable', 1, ret.totalRowCount, '/estate/property/recordstatus/Disable'));

      } else {
        this.cmsToastrService.typeErrorMessage(ret.errorMessage);
      }
      //*results */
      ret = results[2];
      series[2] = ret.totalRowCount;
      labels[2] = this.translate.instant('TITLE.NeedConfirmation');
      if (ret.isSuccess) {
        this.widgetInfoModel.setItem(new WidgetContentInfoModel('Pending', 2, ret.totalRowCount, '/estate/property/recordstatus/Pending'));
      } else {
        this.cmsToastrService.typeErrorMessage(ret.errorMessage);
      }

      this.chartOptions.series = series;
      this.chartOptions.labels = labels;
      this.cdr.markForCheck();
      this.publicHelper.processService.processStop(this.constructor.name + 'All');


    });

  }
  translateHelp(t: string, v: string): string {
    return t + v;
  }
}
