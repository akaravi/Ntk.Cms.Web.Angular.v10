import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { ThemeService } from "src/app/core/services/theme.service";

@Component({
  selector: "app-cms-html-list-mobile",
  templateUrl: "./cms-html-list-mobile.component.html",
  styleUrls: ["./cms-html-list-mobile.component.scss"],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmsHtmlListMobileComponent implements OnInit, OnDestroy {
  static nextId = 0;
  id = ++CmsHtmlListMobileComponent.nextId;
  @Input() optionHeaderDisplay = true;
  @Input() optionActionMainDisplay = true;
  @Output() optionActionGuideNoticeDisplayChange = new EventEmitter<boolean>();
  @Input() set optionActionGuideNoticeDisplay(view: boolean) {
    this.viewGuideNotice = view;
    this.cdr.markForCheck();
  }
  @Input() optionGuideNoticeKey = "";
  @Input() optionFooterDisplay = true;
  @Input() optionActionRowDisplay = false;
  lastSelectId: number | string;
  @Input()
  public set optionActionRowId(id: number | string) {
    if (typeof id === "number" && id > 0) {
      this.optionActionRowDisplay = true;
    } else if (typeof id === "string" && id.length > 0) {
      this.optionActionRowDisplay = true;
    } else {
      this.optionActionRowDisplay = false;
      this.viewMenuItemRow = false;
      this.viewMenuMain = false;
      this.lastSelectId = null;
      this.cdr.markForCheck();
      return;
    }
    if (this.lastSelectId != id) {
      this.viewMenuItemRow = false;
      this.viewMenuMain = false;
    }
    this.lastSelectId = id;
    this.cdr.markForCheck();
  }
  @Input()
  public set optionActionRowDisplayMenu(status: boolean) {
    if (this.optionActionRowDisplay && status) this.viewMenuItemRow = true;
    else this.viewMenuItemRow = false;
    this.cdr.markForCheck();
  }
  @Input()
  public set optionActionRowDisplayMenuAct(status: boolean) {
    if (this.optionActionRowDisplay) {
      this.viewMenuItemRow = true;
      this.cdr.markForCheck();
    }
  }
  @Input() optionTitle = "";
  @Input() optionCategoryTitle = "";
  @Input() optionSelectRowItemTitle = "";
  @Input() optionClassBody = "ntk-cms-html-tree-body";
  @Input() optionTreeDisplay = true;
  @Input() optionsListInfoAreaId = "list";

  // Inputs for button display control
  @Input() optionActionButtonMemoDisplay = true;
  @Input() optionActionButtonPrintRowDisplay = true;
  @Input() optionActionButtonMemoRowDisplay = true;

  @Output() optionOnActionButtonMemo = new EventEmitter<any>();
  @Output() optionOnActionButtonExport = new EventEmitter<any>();
  @Output() optionOnActionButtonMemoRow = new EventEmitter<any>();
  @Output() optionOnActionButtonPrintRow = new EventEmitter<any>();

  constructor(
    public publicHelper: PublicHelper,
    public tokenHelper: TokenHelper,
    public themeService: ThemeService,
    public translate: TranslateService,
    private cmsStoreService: CmsStoreService,
    private cdr: ChangeDetectorRef,
  ) {
    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.themeStore)
        .subscribe(async (value) => {
          if (
            value.actionScrollTopList &&
            this.topList &&
            this.topList.nativeElement
          ) {
            this.topList.nativeElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
          this.cdr.markForCheck();
        }),
    );

    this.unsubscribe.push(
      this.translate.get("TITLE.OperationMenu").subscribe((str: string) => {
        this.optionTitle = str;
        this.cdr.markForCheck();
      }),
    );
    this.unsubscribe.push(
      this.translate.get("TITLE.Category").subscribe((str: string) => {
        this.optionCategoryTitle = str;
        this.cdr.markForCheck();
      }),
    );
  }
  @ViewChild("topList") topList: ElementRef;
  private unsubscribe: Subscription[] = [];

  ngOnInit(): void {}

  ngOnDestroy() {
    if (this.unsubscribe) this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  actionScrollIntoViewRun = false;
  viewGuideNotice = false;
  viewMenuMain = false;
  viewMenuItemRow = false;
  viewTree = false;

  actionViewTree(state?: boolean) {
    if (state === true) {
      this.viewTree = false;
    } else if (state === false) {
      this.viewTree = true;
    } else {
      this.viewTree = !this.viewTree;
    }

    this.viewGuideNotice = false;
    this.viewMenuMain = false;
    this.viewMenuItemRow = false;
    this.cdr.markForCheck();
  }
  actionCloseGuideNotice(): void {
    this.viewGuideNotice = !this.viewGuideNotice;
    this.optionActionGuideNoticeDisplayChange.emit(this.viewGuideNotice);
    this.cdr.markForCheck();
  }
  actionViewGuideNotice(state?: boolean) {
    if (state === true) {
      this.viewGuideNotice = true;
    } else if (state === false) {
      this.viewGuideNotice = false;
    } else {
      this.viewGuideNotice = !this.viewGuideNotice;
    }
    this.viewMenuMain = false;
    this.viewMenuItemRow = false;
    this.viewTree = false;
    this.cdr.markForCheck();
  }
  actionViewMenuMain(state?: boolean) {
    if (state === true) {
      this.viewMenuMain = true;
    } else if (state === false) {
      this.viewMenuMain = false;
    } else {
      this.viewMenuMain = !this.viewMenuMain;
    }
    this.viewGuideNotice = false;
    this.viewMenuItemRow = false;
    this.viewTree = false;
    this.cdr.markForCheck();
  }
  actionViewMenuItemRow(state?: boolean) {
    if (state === true) {
      this.viewMenuItemRow = true;
    } else if (state === false) {
      this.viewMenuItemRow = false;
    } else {
      this.viewMenuItemRow = !this.viewMenuItemRow;
    }
    this.viewGuideNotice = false;
    this.viewMenuMain = false;
    this.viewTree = false;
    this.cdr.markForCheck();
  }

  // Helper method to get button position classes
  getActionMainButtonClasses(): string {
    const classes = ['cms-html-list-mobile-fixed-button', 'cms-html-list-mobile-action-main-button'];
    if (this.optionTreeDisplay) {
      classes.push('with-tree');
    }
    return classes.join(' ');
  }

  // Helper method to get row button position classes
  getActionRowButtonClasses(): string {
    const classes = ['cms-html-list-mobile-fixed-button', 'cms-html-list-mobile-action-row-button'];
    if (this.optionTreeDisplay) {
      classes.push('with-tree');
      if (this.optionActionMainDisplay) {
        classes.push('with-action-main');
      }
    } else if (this.optionActionMainDisplay) {
      classes.push('with-action-main');
    }
    return classes.join(' ');
  }

  // Helper method to get icon rotation class
  getIconRotationClass(isRotated: boolean): string {
    return isRotated ? 'cms-html-list-mobile-icon rotated' : 'cms-html-list-mobile-icon normal';
  }
  onActionButtonMemo(): void {
    this.optionOnActionButtonMemo.emit();
  }
  onActionButtonExport(): void {
    this.optionOnActionButtonExport.emit();
  }
  onActionButtonMemoRow(): void {
    this.optionOnActionButtonMemoRow.emit();
  }

  onActionButtonPrintRow(): void {
    this.optionOnActionButtonPrintRow.emit();
  }
}
