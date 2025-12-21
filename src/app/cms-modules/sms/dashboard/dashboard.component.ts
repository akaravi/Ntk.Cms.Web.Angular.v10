import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  FilterDataModel,
  FilterModel,
  SmsLogInBoxService,
  SmsLogOutBoxService,
  SmsLogOutBoxQueueService,
  SmsLogOutBoxTaskSchedulerService,
  SmsMainApiPathService,
  SmsMainMessageContentService,
} from "ntk-cms-api";
import { Subscription } from "rxjs";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

@Component({
  selector: "app-sms-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  standalone: false,
})
export class SmsDashboardComponent implements OnInit, OnDestroy {
  constructorInfoAreaId = this.constructor.name;

  // KPI بر اساس وضعیت‌های کلیدی
  kpi = {
    inbox: {
      total: 0,
      unread: 0,
    },
    outbox: {
      total: 0,
      sent: 0,
      failed: 0,
    },
    queue: {
      total: 0,
    },
    taskScheduler: {
      total: 0,
    },
    apiPaths: {
      total: 0,
    },
    messageContent: {
      total: 0,
    },
  };

  private sub = new Subscription();

  constructor(
    private inboxService: SmsLogInBoxService,
    private outboxService: SmsLogOutBoxService,
    private queueService: SmsLogOutBoxQueueService,
    private taskSchedulerService: SmsLogOutBoxTaskSchedulerService,
    private apiPathService: SmsMainApiPathService,
    private messageContentService: SmsMainMessageContentService,
    private toastr: CmsToastrService,
  ) {}

  ngOnInit(): void {
    this.loadKpi();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private loadKpi(): void {
    const fm = () => {
      const f = new FilterModel();
      f.accessLoad = true;
      return f;
    };

    const statusFilter = (prop: string, value: any) => {
      const f = fm();
      const fd = new FilterDataModel();
      fd.propertyName = prop;
      fd.value = value;
      f.filters.push(fd);
      return f;
    };

    // Inbox
    this.sub.add(
      this.inboxService.ServiceGetCount(fm()).subscribe({
        next: (ret) => {
          if (ret.isSuccess) this.kpi.inbox.total = ret.totalRowCount;
        },
        error: (er) => this.toastr.typeError(er),
      }),
    );
    this.sub.add(
      this.inboxService
        .ServiceGetCount(statusFilter("seen", false))
        .subscribe({
          next: (ret) => {
            if (ret.isSuccess) this.kpi.inbox.unread = ret.totalRowCount;
          },
          error: (er) => this.toastr.typeError(er),
        }),
    );

    // Outbox
    this.sub.add(
      this.outboxService.ServiceGetCount(fm()).subscribe({
        next: (ret) => {
          if (ret.isSuccess) this.kpi.outbox.total = ret.totalRowCount;
        },
        error: (er) => this.toastr.typeError(er),
      }),
    );
    this.sub.add(
      this.outboxService
        .ServiceGetCount(statusFilter("sendResultIsSuccess", true))
        .subscribe({
          next: (ret) => {
            if (ret.isSuccess) this.kpi.outbox.sent = ret.totalRowCount;
          },
          error: (er) => this.toastr.typeError(er),
        }),
    );
    this.sub.add(
      this.outboxService
        .ServiceGetCount(statusFilter("sendResultIsSuccess", false))
        .subscribe({
          next: (ret) => {
            if (ret.isSuccess) this.kpi.outbox.failed = ret.totalRowCount;
          },
          error: (er) => this.toastr.typeError(er),
        }),
    );

    // Queue
    this.sub.add(
      this.queueService.ServiceGetCount(fm()).subscribe({
        next: (ret) => {
          if (ret.isSuccess) this.kpi.queue.total = ret.totalRowCount;
        },
        error: (er) => this.toastr.typeError(er),
      }),
    );

    // Task Scheduler
    this.sub.add(
      this.taskSchedulerService.ServiceGetCount(fm()).subscribe({
        next: (ret) => {
          if (ret.isSuccess) this.kpi.taskScheduler.total = ret.totalRowCount;
        },
        error: (er) => this.toastr.typeError(er),
      }),
    );

    // API Paths
    this.sub.add(
      this.apiPathService.ServiceGetCount(fm()).subscribe({
        next: (ret) => {
          if (ret.isSuccess) this.kpi.apiPaths.total = ret.totalRowCount;
        },
        error: (er) => this.toastr.typeError(er),
      }),
    );

    // Message Content
    this.sub.add(
      this.messageContentService.ServiceGetCount(fm()).subscribe({
        next: (ret) => {
          if (ret.isSuccess) this.kpi.messageContent.total = ret.totalRowCount;
        },
        error: (er) => this.toastr.typeError(er),
      }),
    );
  }
}
