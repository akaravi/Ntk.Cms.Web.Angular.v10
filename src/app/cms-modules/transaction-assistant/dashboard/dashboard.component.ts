import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  FilterDataModel,
  FilterModel,
  TransactionAssistantInventoryService,
  TransactionAssistantOfferService,
  TransactionAssistantOfferStatusEnum,
  TransactionAssistantOrderService,
  TransactionAssistantOrderStatusEnum,
  TransactionAssistantPaymentService,
  TransactionAssistantPaymentStatusEnum,
  TransactionAssistantRequestService,
  TransactionAssistantRequestStatusEnum,
  TransactionAssistantShipmentService,
  TransactionAssistantShipmentStatusEnum,
} from "ntk-cms-api";
import { Subscription } from "rxjs";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

@Component({
  selector: "app-transaction-assistant-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  standalone: false,
})
export class TransactionAssistantDashboardComponent implements OnInit, OnDestroy {
  constructorInfoAreaId = this.constructor.name;

  // KPI بر اساس وضعیت‌های کلیدی
  kpi = {
    orders: {
      total: 0,
      pending: 0,
      shipping: 0,
      completed: 0,
    },
    ordersToday: 0,
    payments: {
      total: 0,
      paid: 0,
      failed: 0,
    },
    paymentsSuccess: 0,
    shipments: {
      total: 0,
      inTransit: 0,
      delivered: 0,
    },
    shipmentsInTransit: 0,
    offers: {
      total: 0,
      pending: 0,
      accepted: 0,
    },
    offersPending: 0,
    requests: {
      total: 0,
      pending: 0,
      inProgress: 0,
    },
  };

  private sub = new Subscription();

  constructor(
    private orderService: TransactionAssistantOrderService,
    private paymentService: TransactionAssistantPaymentService,
    private shipmentService: TransactionAssistantShipmentService,
    private offerService: TransactionAssistantOfferService,
    private inventoryService: TransactionAssistantInventoryService,
    private requestService: TransactionAssistantRequestService,
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

    const statusFilter = (prop: string, value: number) => {
      const f = fm();
      const fd = new FilterDataModel();
      fd.propertyName = prop;
      fd.value = value;
      f.filters.push(fd);
      return f;
    };

    // Orders
    this.sub.add(
      this.orderService.ServiceGetCount(fm()).subscribe({
        next: (ret) => {
          if (ret.isSuccess) this.kpi.orders.total = ret.totalRowCount;
        },
        error: (er) => this.toastr.typeError(er),
      }),
    );
    this.sub.add(
      this.orderService
        .ServiceGetCount(statusFilter("status", TransactionAssistantOrderStatusEnum.PendingPayment))
        .subscribe({
          next: (ret) => {
            if (ret.isSuccess) this.kpi.orders.pending = ret.totalRowCount;
          },
          error: (er) => this.toastr.typeError(er),
        }),
    );
    this.sub.add(
      this.orderService
        .ServiceGetCount(statusFilter("status", TransactionAssistantOrderStatusEnum.Shipping))
        .subscribe({
          next: (ret) => {
            if (ret.isSuccess) this.kpi.orders.shipping = ret.totalRowCount;
          },
          error: (er) => this.toastr.typeError(er),
        }),
    );
    this.sub.add(
      this.orderService
        .ServiceGetCount(statusFilter("status", TransactionAssistantOrderStatusEnum.Completed))
        .subscribe({
          next: (ret) => {
            if (ret.isSuccess) this.kpi.orders.completed = ret.totalRowCount;
          },
          error: (er) => this.toastr.typeError(er),
        }),
    );

    // Payments
    this.sub.add(
      this.paymentService.ServiceGetCount(fm()).subscribe({
        next: (ret) => {
          if (ret.isSuccess) this.kpi.payments.total = ret.totalRowCount;
        },
        error: (er) => this.toastr.typeError(er),
      }),
    );
    this.sub.add(
      this.paymentService
        .ServiceGetCount(statusFilter("status", TransactionAssistantPaymentStatusEnum.Paid))
        .subscribe({
          next: (ret) => {
            if (ret.isSuccess) this.kpi.payments.paid = ret.totalRowCount;
          },
          error: (er) => this.toastr.typeError(er),
        }),
    );
    this.sub.add(
      this.paymentService
        .ServiceGetCount(statusFilter("status", TransactionAssistantPaymentStatusEnum.Failed))
        .subscribe({
          next: (ret) => {
            if (ret.isSuccess) this.kpi.payments.failed = ret.totalRowCount;
          },
          error: (er) => this.toastr.typeError(er),
        }),
    );

    // Shipments
    this.sub.add(
      this.shipmentService.ServiceGetCount(fm()).subscribe({
        next: (ret) => {
          if (ret.isSuccess) this.kpi.shipments.total = ret.totalRowCount;
        },
        error: (er) => this.toastr.typeError(er),
      }),
    );
    this.sub.add(
      this.shipmentService
        .ServiceGetCount(statusFilter("status", TransactionAssistantShipmentStatusEnum.InTransit))
        .subscribe({
          next: (ret) => {
            if (ret.isSuccess) this.kpi.shipments.inTransit = ret.totalRowCount;
          },
          error: (er) => this.toastr.typeError(er),
        }),
    );
    this.sub.add(
      this.shipmentService
        .ServiceGetCount(statusFilter("status", TransactionAssistantShipmentStatusEnum.Delivered))
        .subscribe({
          next: (ret) => {
            if (ret.isSuccess) this.kpi.shipments.delivered = ret.totalRowCount;
          },
          error: (er) => this.toastr.typeError(er),
        }),
    );

    // Offers
    this.sub.add(
      this.offerService.ServiceGetCount(fm()).subscribe({
        next: (ret) => {
          if (ret.isSuccess) this.kpi.offers.total = ret.totalRowCount;
        },
        error: (er) => this.toastr.typeError(er),
      }),
    );
    this.sub.add(
      this.offerService
        .ServiceGetCount(statusFilter("status", TransactionAssistantOfferStatusEnum.Pending))
        .subscribe({
          next: (ret) => {
            if (ret.isSuccess) this.kpi.offers.pending = ret.totalRowCount;
          },
          error: (er) => this.toastr.typeError(er),
        }),
    );
    this.sub.add(
      this.offerService
        .ServiceGetCount(statusFilter("status", TransactionAssistantOfferStatusEnum.Accepted))
        .subscribe({
          next: (ret) => {
            if (ret.isSuccess) this.kpi.offers.accepted = ret.totalRowCount;
          },
          error: (er) => this.toastr.typeError(er),
        }),
    );

    // Requests
    this.sub.add(
      this.requestService.ServiceGetCount(fm()).subscribe({
        next: (ret) => {
          if (ret.isSuccess) this.kpi.requests.total = ret.totalRowCount;
        },
        error: (er) => this.toastr.typeError(er),
      }),
    );
    this.sub.add(
      this.requestService
        .ServiceGetCount(statusFilter("status", TransactionAssistantRequestStatusEnum.Pending))
        .subscribe({
          next: (ret) => {
            if (ret.isSuccess) this.kpi.requests.pending = ret.totalRowCount;
          },
          error: (er) => this.toastr.typeError(er),
        }),
    );
    this.sub.add(
      this.requestService
        .ServiceGetCount(statusFilter("status", TransactionAssistantRequestStatusEnum.InProgress))
        .subscribe({
          next: (ret) => {
            if (ret.isSuccess) this.kpi.requests.inProgress = ret.totalRowCount;
          },
          error: (er) => this.toastr.typeError(er),
        }),
    );
  }
}
