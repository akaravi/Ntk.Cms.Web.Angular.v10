import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Optional,
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
  selector: "app-cms-html-list",
  templateUrl: "./cms-html-list.component.html",
  standalone: false,
})
export class CmsHtmlListComponent implements OnInit, OnDestroy {
  static nextId = 0;
  id = ++CmsHtmlListComponent.nextId;
  @Input() optionListTitle = "";
  @Input() optionHeaderDisplay = true;
  @Input() optionActionMainDisplay = true;
  @Output() optionActionGuideNoticeDisplayChange = new EventEmitter<boolean>();
  @Input() set optionActionGuideNoticeDisplay(view: boolean) {
    this.viewGuideNotice = view;
    this.cdr?.markForCheck();
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
      this.cdr?.markForCheck();
      return;
    }
    if (this.lastSelectId != id) {
      this.viewMenuItemRow = false;
      this.viewMenuMain = false;
    }
    this.lastSelectId = id;
    this.cdr?.markForCheck();
  }
  @Input()
  public set optionActionRowDisplayMenu(status: boolean) {
    if (this.optionActionRowDisplay && status) this.viewMenuItemRow = true;
    else this.viewMenuItemRow = false;
    this.cdr?.markForCheck();
  }
  @Input()
  public set optionActionRowDisplayMenuAct(status: boolean) {
    if (this.optionActionRowDisplay) this.viewMenuItemRow = true;
    this.cdr?.markForCheck();
  }
  @Input() optionCategoryTitle = "";
  @Input() optionMenuMainTitle = "";

  @Input() optionSelectRowItemTitle = "";
  @Input() optionTreeDisplay = true;
  @Input() optionsListInfoAreaId = "list";

  // Inputs for button display control
  // Default to true for backward compatibility (previous behavior always showed buttons)
  // Set to false explicitly if you don't want to show the button
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
    @Optional() protected cdr?: ChangeDetectorRef,
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
          this.cdr?.markForCheck();
        }),
    );

    this.unsubscribe.push(
      this.translate.get("TITLE.OperationMenu").subscribe((str: string) => {
        this.optionMenuMainTitle = str;
        this.cdr?.markForCheck();
      }),
    );
    this.unsubscribe.push(
      this.translate.get("TITLE.Category").subscribe((str: string) => {
        this.optionCategoryTitle = str;
        this.cdr?.markForCheck();
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
    if (state == true) {
      this.viewTree = false;
    } else if (state == false) {
      this.viewTree = true;
    } else {
      this.viewTree = !this.viewTree;
    }

    this.viewGuideNotice = false;
    this.viewMenuMain = false;
    this.viewMenuItemRow = false;
    this.cdr?.markForCheck();
  }
  actionCloseGuideNotice(): void {
    this.viewGuideNotice = !this.viewGuideNotice;
    this.optionActionGuideNoticeDisplayChange.emit(this.viewGuideNotice);
    this.cdr?.markForCheck();
  }
  actionViewGuideNotice(state?: boolean) {
    if (state == true) {
      this.viewGuideNotice = true;
    } else if (state == false) {
      this.viewGuideNotice = false;
    } else {
      this.viewGuideNotice = !this.viewGuideNotice;
    }
    //this.viewGuideNotice = false
    this.viewMenuMain = false;
    this.viewMenuItemRow = false;
    this.viewTree = false;
    this.cdr?.markForCheck();
  }
  actionViewMenuMain(state?: boolean) {
    if (state == true) {
      this.viewMenuMain = true;
    } else if (state == false) {
      this.viewMenuMain = false;
    } else {
      this.viewMenuMain = !this.viewMenuMain;
    }
    this.viewGuideNotice = false;
    this.viewMenuItemRow = false;
    this.viewTree = false;
    this.cdr?.markForCheck();
  }
  actionViewMenuItemRow(state?: boolean) {
    if (state == true) {
      this.viewMenuItemRow = true;
    } else if (state == false) {
      this.viewMenuItemRow = false;
    } else {
      this.viewMenuItemRow = !this.viewMenuItemRow;
    }
    this.viewGuideNotice = false;
    this.viewMenuMain = false;
    this.viewTree = false;
    this.cdr?.markForCheck();
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
  /*
  <app-cms-html-list [optionsListInfoAreaId]="constructorInfoAreaId" [optionGuideNoticeKey]="''" [(optionActionGuideNoticeDisplay)]="viewGuideNotice"    [optionTreeDisplay]="true">
    <ng-container  cms-tree>
      <!--begin:::::::::::::::::::::::::::::::::::::::::cms-tree-->
      --------------------------------------
      <!--end:::::::::::::::::::::::::::::::::::::::::cms-tree-->
    </ng-container>
    <ng-container  cms-header>
      <!--begin:::::::::::::::::::::::::::::::::::::::::cms-header-->
      --------------------------------------
      <!--end:::::::::::::::::::::::::::::::::::::::::cms-header-->
    </ng-container>
    <ng-container  cms-action-main>
      <!--begin:::::::::::::::::::::::::::::::::::::::::cms-action-->
      --------------------------------------
      <!--end:::::::::::::::::::::::::::::::::::::::::cms-action-->
    </ng-container>
    <ng-container  cms-action-area>
      <!--begin:::::::::::::::::::::::::::::::::::::::::cms-action-area-->
      --------------------------------------
      <!--end:::::::::::::::::::::::::::::::::::::::::cms-action-area-->
    </ng-container>
    <ng-container  cms-body>
      <!--begin:::::::::::::::::::::::::::::::::::::::::cms-body-->
      --------------------------------------
      <!--end:::::::::::::::::::::::::::::::::::::::::cms-body-->
    </ng-container>
    <ng-container  cms-message>
      <!--begin:::::::::::::::::::::::::::::::::::::::::cms-message -->
      --------------------------------------
      <!--end:::::::::::::::::::::::::::::::::::::::::cms-message -->
    </ng-container>
    <ng-container  cms-footer>
      <!--begin:::::::::::::::::::::::::::::::::::::::::cms-footer-->
      --------------------------------------
      <!--end:::::::::::::::::::::::::::::::::::::::::cms-footer-->
    </ng-container>
  </app-cms-html-list>
*/
}
