
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FilterDataModel, FilterModel, TicketStatusEnum, TicketingTaskService } from 'ntk-cms-api';
import { Subscription } from 'rxjs';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { WidgetContentInfoModel, WidgetInfoModel } from 'src/app/core/models/widget-info-model';
import { CmsStoreService } from 'src/app/core/reducers/cmsStore.service';
@Component({
  selector: 'app-ticketing-task-widget',
  templateUrl: './widget.component.html',
  standalone: false
})
export class TicketingTaskWidgetComponent implements OnInit, OnDestroy {


  constructorInfoAreaId = this.constructor.name;
  constructor(
    private service: TicketingTaskService,
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
    this.translate.get('TITLE.Registered_tickets').subscribe((str: string) => { this.widgetInfoModel.title = str });
    this.widgetInfoModel.description = '';
    this.widgetInfoModel.link = '/ticketing/task';
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
  onActionStatist(): void {
    this.translate.get('MESSAGE.Get_unread_tickets_statistics').subscribe((str: string) => { this.publicHelper.processService.processStart(this.constructor.name + 'Unread', str, this.constructorInfoAreaId) });
    this.translate.get('MESSAGE.Get_read_tickets_statistics').subscribe((str: string) => { this.publicHelper.processService.processStart(this.constructor.name + 'Read', str, this.constructorInfoAreaId); });
    this.translate.get('MESSAGE.Get_answered_tickets_statistics').subscribe((str: string) => { this.publicHelper.processService.processStart(this.constructor.name + 'Answered', str, this.constructorInfoAreaId); });
    this.translate.get('MESSAGE.Get_statistics_on_all_tickets').subscribe((str: string) => { this.publicHelper.processService.processStart(this.constructor.name + 'All', str, this.constructorInfoAreaId); });

    this.widgetInfoModel.setItem(new WidgetContentInfoModel('Unread', 0, 0, ''));
    this.widgetInfoModel.setItem(new WidgetContentInfoModel('Read', 1, 0, ''));
    this.widgetInfoModel.setItem(new WidgetContentInfoModel('Answered', 2, 0, ''));
    this.widgetInfoModel.setItem(new WidgetContentInfoModel('All', 3, 0, ''));
    this.service.ServiceGetCount(this.filteModelContent).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.widgetInfoModel.setItem(new WidgetContentInfoModel('All', 3, ret.totalRowCount, '/ticketing/task/'));
        }
        this.publicHelper.processService.processStop(this.constructor.name + 'All');
      },
      error: (er) => {
        this.publicHelper.processService.processStop(this.constructor.name + 'All', false);
      }
    }
    );
    const filterStatist1 = JSON.parse(JSON.stringify(this.filteModelContent));
    const fastfilter = new FilterDataModel();
    fastfilter.propertyName = 'ticketStatus';
    fastfilter.value = TicketStatusEnum.Read;
    filterStatist1.filters.push(fastfilter);
    this.service.ServiceGetCount(filterStatist1).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.widgetInfoModel.setItem(new WidgetContentInfoModel('Read', 1, ret.totalRowCount, '/ticketing/task/listTicketStatus/' + TicketStatusEnum.Read));
        }
        this.publicHelper.processService.processStop(this.constructor.name + 'Read');
      }
      ,
      error: (er) => {
        this.publicHelper.processService.processStop(this.constructor.name + 'Read', false);
      }
    }
    );
    const filterStatist2 = JSON.parse(JSON.stringify(this.filteModelContent));
    const fastfilter2 = new FilterDataModel();
    fastfilter2.propertyName = 'ticketStatus';
    fastfilter2.value = TicketStatusEnum.Unread;
    filterStatist2.filters.push(fastfilter2);
    this.service.ServiceGetCount(filterStatist2).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.widgetInfoModel.setItem(new WidgetContentInfoModel('Unread', 0, ret.totalRowCount, '/ticketing/task/listTicketStatus/' + TicketStatusEnum.Unread));
        }
        this.publicHelper.processService.processStop(this.constructor.name + 'Unread');
      }
      ,
      error: (er) => {
        this.publicHelper.processService.processStop(this.constructor.name + 'Unread', false);
      }
    }
    );
    const filterStatist3 = JSON.parse(JSON.stringify(this.filteModelContent));
    const fastfilter3 = new FilterDataModel();
    fastfilter3.propertyName = 'ticketStatus';
    fastfilter3.value = TicketStatusEnum.Answered;
    filterStatist3.filters.push(fastfilter3);
    this.service.ServiceGetCount(filterStatist3).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.widgetInfoModel.setItem(new WidgetContentInfoModel('Answered', 2, ret.totalRowCount, '/ticketing/task/listTicketStatus/' + TicketStatusEnum.Answered));
        }
        this.publicHelper.processService.processStop(this.constructor.name + 'Answered');
      }
      ,
      error: (er) => {
        this.publicHelper.processService.processStop(this.constructor.name + 'Answered', false);
      }
    }
    );
  }
  translateHelp(t: string, v: string): string {
    return t + v;
  }
}
