import { Component, Inject, Input, OnInit, Optional } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FilePreviewModel } from "ngx-ntk-file-picker";
import {
  CaptchaModel,
  CoreAuthV3Service,
  LinkManagementTargetService,
  LinkManagementTargetShortLinkGetDtoModel,
  LinkManagementTargetShortLinkGetResponceModel,
  LinkManagementTargetShortLinkSetDtoModel,
  LinkManagementTargetShortLinkSetResponceModel,
} from "ntk-cms-api";

@Component({
  selector: "app-cms-link-management",
  templateUrl: "./cms-link-management.component.html",
  styleUrls: ["./cms-link-management.component.scss"],
  standalone: false,
})
export class CmsLinkManagementComponent implements OnInit {
  constructor(
    private linkManagementTargetService: LinkManagementTargetService,
    private coreAuthService: CoreAuthV3Service,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData?: any,
  ) {}

  message = "";
  messageShortLinkGet = "";
  messageShortLinkSetLink = "";
  messageShortLinkSetFile = "";
  messageShortLinkSetDescription = "";
  modelHistoryList: string[] = [];

  submitted = false;
  captchaModel: CaptchaModel = new CaptchaModel();

  // ورودی‌ها برای استفاده مستقیم از خارج کامپوننت
  @Input() optionFileId = ""; // linkFileId
  @Input() optionUrl = "";
  @Input() optionMessage = "";
  @Input() optionKey = ""; // برای دریافت لینک

  // کنترل نمایش تب‌ها بر اساس ورودی‌ها
  showFileTab = true;
  showGetTab = true;
  showUrlTab = true;
  showMessageTab = true;

  modelTargetGetDto: LinkManagementTargetShortLinkGetDtoModel =
    new LinkManagementTargetShortLinkGetDtoModel();
  modelTargetGetResponce: LinkManagementTargetShortLinkGetResponceModel =
    new LinkManagementTargetShortLinkGetResponceModel();
  modelTargetSetDto: LinkManagementTargetShortLinkSetDtoModel =
    new LinkManagementTargetShortLinkSetDtoModel();

  modelTargetSetResponceSetLink: LinkManagementTargetShortLinkSetResponceModel =
    new LinkManagementTargetShortLinkSetResponceModel();
  modelTargetSetResponceSetFile: LinkManagementTargetShortLinkSetResponceModel =
    new LinkManagementTargetShortLinkSetResponceModel();
  modelTargetSetResponceSetDescription: LinkManagementTargetShortLinkSetResponceModel =
    new LinkManagementTargetShortLinkSetResponceModel();

  selectedUserTab = 1;
  tabs = [
    {
      name: "ارسال فایل",
      key: 1,
      active: true,
    },
    {
      name: "دریافت لینک",
      key: 2,
      active: false,
    },
    {
      name: "ارسال لینک",
      key: 3,
      active: false,
    },
    {
      name: "ارسال پیام",
      key: 4,
      active: false,
    },
    {
      name: "تاریخچه",
      key: 5,
      active: false,
    },
  ];

  ngOnInit(): void {
    // مقداردهی ورودی‌ها از MAT_DIALOG_DATA در صورت استفاده در دیالوگ
    if (this.dialogData) {
      if (this.dialogData.optionFileId && !this.optionFileId) {
        this.optionFileId = this.dialogData.optionFileId;
      }
      if (this.dialogData.optionUrl && !this.optionUrl) {
        this.optionUrl = this.dialogData.optionUrl;
      }
      if (this.dialogData.optionMessage && !this.optionMessage) {
        this.optionMessage = this.dialogData.optionMessage;
      }
      if (this.dialogData.optionKey && !this.optionKey) {
        this.optionKey = this.dialogData.optionKey;
      }
    }

    // ست اولیه مدل‌ها از ورودی‌ها
    if (this.optionFileId) {
      this.modelTargetSetDto.uploadFileGUID = this.optionFileId;
    }
    if (this.optionUrl) {
      this.modelTargetSetDto.urlAddress = this.optionUrl;
    }
    if (this.optionMessage) {
      this.modelTargetSetDto.description = this.optionMessage;
    }
    if (this.optionKey) {
      this.modelTargetGetDto.key = this.optionKey;
    }

    // اگر ورودی مستقیم داریم، فقط تب مرتبط را فعال و بقیه را مخفی کن
    if (this.optionFileId) {
      this.activateSingleTab(1);
    } else if (this.optionUrl) {
      this.activateSingleTab(3);
    } else if (this.optionMessage) {
      this.activateSingleTab(4);
    } else if (this.optionKey) {
      this.activateSingleTab(2);
    }

    this.getHistory();
  }

  private activateSingleTab(tabKey: number): void {
    this.showFileTab = tabKey === 1;
    this.showGetTab = tabKey === 2;
    this.showUrlTab = tabKey === 3;
    this.showMessageTab = tabKey === 4;
    this.selectedUserTab = tabKey;
    this.tabs.forEach((t) => (t.active = t.key === tabKey));
  }

  onUploadSuccess(model: FilePreviewModel): void {
    if (
      model &&
      model.uploadResponse &&
      model.uploadResponse.item &&
      model.uploadResponse.item.fileKey
    ) {
      this.modelTargetSetDto.uploadFileGUID = model.uploadResponse.item.fileKey;
    }
  }

  // رویدادهای ورودی عددی کپچا (پنج رقمی)

  captchaRefreshTrigger = 0;
  onCaptchaOrder(): void {
    this.modelTargetSetDto.captchaText = "";
    this.modelTargetGetDto.captchaText = "";
    this.captchaRefreshTrigger++;
  }
  onCaptchaKeyChange(key: string): void {
    this.modelTargetSetDto.captchaKey = key;
    this.modelTargetGetDto.captchaKey = key;
  }
  onCaptchaCodeChange(code: string): void {
    this.modelTargetSetDto.captchaText = code;
    this.modelTargetGetDto.captchaText = code;
  }

  onSubmitGet(): void {
    this.submitted = true;
    this.modelTargetSetResponceSetLink =
      new LinkManagementTargetShortLinkSetResponceModel();
    this.modelTargetSetResponceSetFile =
      new LinkManagementTargetShortLinkSetResponceModel();
    this.modelTargetSetResponceSetDescription =
      new LinkManagementTargetShortLinkSetResponceModel();
    this.modelTargetGetResponce =
      new LinkManagementTargetShortLinkGetResponceModel();
    const res = this.modelTargetGetDto.key.split("@");
    if (!res || res.length < 2) {
      this.messageShortLinkGet = "کلید معتبر نیست";
      return;
    }
    this.messageShortLinkGet = "در حال پردازش ...";

    this.linkManagementTargetService
      .ServiceShortLinkGet(this.modelTargetGetDto)
      .subscribe(
        (next) => {
          if (next.isSuccess) {
            this.messageShortLinkGet = "با موفقیت انجام شد";
            this.modelTargetGetResponce = next.item;
            this.addHistory(next.item.key);
          } else {
            this.messageShortLinkGet = next.errorMessage;
          }
        },
        () => {
          this.messageShortLinkGet = "خطا در دریافت لینک";
        },
      );
  }

  onSubmitSetLink(): void {
    this.messageShortLinkSetLink = "در حال پردازش ...";

    this.submitted = true;
    this.modelTargetSetResponceSetLink =
      new LinkManagementTargetShortLinkSetResponceModel();
    this.modelTargetSetResponceSetFile =
      new LinkManagementTargetShortLinkSetResponceModel();
    this.modelTargetSetResponceSetDescription =
      new LinkManagementTargetShortLinkSetResponceModel();
    this.modelTargetGetResponce =
      new LinkManagementTargetShortLinkGetResponceModel();

    this.linkManagementTargetService
      .ServiceShortLinkSet(this.modelTargetSetDto)
      .subscribe(
        (next) => {
          if (next.isSuccess) {
            this.messageShortLinkSetLink = "با موفقیت انجام شد";
            this.modelTargetSetResponceSetLink = next.item;
            this.addHistory(next.item.key);
          } else {
            this.messageShortLinkSetLink = next.errorMessage;
          }
        },
        () => {
          this.messageShortLinkSetLink = "خطا در ساخت لینک";
        },
      );
  }

  onSubmitSetDescription(): void {
    this.messageShortLinkSetDescription = "در حال پردازش ...";

    this.submitted = true;
    this.modelTargetSetResponceSetLink =
      new LinkManagementTargetShortLinkSetResponceModel();
    this.modelTargetSetResponceSetFile =
      new LinkManagementTargetShortLinkSetResponceModel();
    this.modelTargetSetResponceSetDescription =
      new LinkManagementTargetShortLinkSetResponceModel();
    this.modelTargetGetResponce =
      new LinkManagementTargetShortLinkGetResponceModel();
    this.modelTargetSetDto.urlAddress = "";
    this.modelTargetSetDto.uploadFileGUID = "";

    this.linkManagementTargetService
      .ServiceShortLinkSet(this.modelTargetSetDto)
      .subscribe(
        (next) => {
          if (next.isSuccess) {
            this.messageShortLinkSetDescription = "با موفقیت انجام شد";
            this.modelTargetSetResponceSetDescription = next.item;
            this.addHistory(next.item.key);
          } else {
            this.messageShortLinkSetDescription = next.errorMessage;
          }
        },
        () => {
          this.messageShortLinkSetDescription = "خطا در ساخت لینک پیام";
        },
      );
  }

  onSubmitSetFile(): void {
    this.messageShortLinkSetFile = "در حال پردازش ...";
    this.submitted = true;
    this.modelTargetSetResponceSetLink =
      new LinkManagementTargetShortLinkSetResponceModel();
    this.modelTargetSetResponceSetFile =
      new LinkManagementTargetShortLinkSetResponceModel();
    this.modelTargetSetResponceSetDescription =
      new LinkManagementTargetShortLinkSetResponceModel();
    this.modelTargetGetResponce =
      new LinkManagementTargetShortLinkGetResponceModel();
    this.modelTargetSetDto.urlAddress = "";
    this.modelTargetSetDto.description = "";

    this.linkManagementTargetService
      .ServiceShortLinkSet(this.modelTargetSetDto)
      .subscribe(
        (next) => {
          if (next.isSuccess) {
            this.messageShortLinkSetFile = "با موفقیت انجام شد";
            this.modelTargetSetResponceSetFile = next.item;
            this.addHistory(next.item.key);
          } else {
            this.messageShortLinkSetFile = next.errorMessage;
          }
        },
        () => {
          this.messageShortLinkSetFile = "خطا در ساخت لینک فایل";
        },
      );
  }

  tabChange(selectedTab: { key: number }): void {
    this.modelTargetGetResponce =
      new LinkManagementTargetShortLinkGetResponceModel();
    this.modelTargetGetDto.key = "";
    this.selectedUserTab = selectedTab.key;
    for (const tab of this.tabs) {
      tab.active = tab.key === selectedTab.key;
    }
  }

  onTabChange(event: { index: number }): void {
    const tabIndex = event.index + 1;
    const selectedTab = this.tabs.find((tab) => tab.key === tabIndex);
    if (selectedTab) {
      this.tabChange(selectedTab);
    } else {
      this.selectedUserTab = tabIndex;
    }
  }

  copyText(val: string): void {
    const selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
  }

  onClickHistory(item: string): void {
    if (item && item.length > 0) {
      this.tabChange({ key: 2 });
      this.modelTargetGetDto.key = item;
    }
  }

  addHistory(item: string): void {
    let history = localStorage.getItem("cms-link-management-history");
    if (history && history.length > 0) {
      if (history.indexOf(item) < 0) {
        history = item + "," + history;
      }
    } else {
      history = item;
    }

    this.modelHistoryList = history.split(",");
    if (this.modelHistoryList?.length > 10) {
      this.modelHistoryList.length = 10;
    }
    localStorage.setItem(
      "cms-link-management-history",
      this.modelHistoryList.join(","),
    );
  }

  getHistory(): void {
    let history = localStorage.getItem("cms-link-management-history");
    if (history && history.length > 0) {
      this.modelHistoryList = history.split(",");
      return;
    }
    history = "";
    localStorage.setItem("cms-link-management-history", history);
    this.modelHistoryList = history.split(",");
  }
}
