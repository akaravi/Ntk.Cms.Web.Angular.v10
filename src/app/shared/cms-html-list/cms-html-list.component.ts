import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { CmsStoreService } from 'src/app/core/reducers/cmsStore.service';
import { ThemeService } from 'src/app/core/services/theme.service';
@Component({
  selector: 'app-cms-html-list',
  templateUrl: './cms-html-list.component.html',
  standalone: false
})
export class CmsHtmlListComponent implements OnInit, OnDestroy {
  static nextId = 0;
  id = ++CmsHtmlListComponent.nextId;
  @Input() optionHeaderDisplay = true;
  @Input() optionActionMainDisplay = true;
  @Output() optionActionGuideNoticeDisplayChange = new EventEmitter<boolean>();
  @Input() set optionActionGuideNoticeDisplay(view: boolean) {
    this.viewGuideNotice = view;
  }
  @Input() optionGuideNoticeKey = '';
  @Input() optionFooterDisplay = true;
  @Input() optionActionRowDisplay = false;
  lastSelectId: number | string;
  @Input()
  public set optionActionRowId(id: number | string) {

    if (typeof id === 'number' && id > 0) {
      this.optionActionRowDisplay = true;
    } else if (typeof id === 'string' && id.length > 0) {
      this.optionActionRowDisplay = true;
    } else {
      this.optionActionRowDisplay = false;
      this.viewMenuItemRow = false;
      this.viewMenuMain = false;
      this.lastSelectId = null;
      return;
    }
    if (this.lastSelectId != id) {
      this.viewMenuItemRow = false;
      this.viewMenuMain = false;
    }
    this.lastSelectId = id;
  }
  @Input()
  public set optionActionRowDisplayMenu(status: boolean) {
    if (this.optionActionRowDisplay && status)
      this.viewMenuItemRow = true;
    else
      this.viewMenuItemRow = false;
  }
  @Input()
  public set optionActionRowDisplayMenuAct(status: boolean) {
    if (this.optionActionRowDisplay)
      this.viewMenuItemRow = true;
  }
  @Input() optionTitle = '';
  @Input() optionCategoryTitle = '';
  @Input() optionSelectRowItemTitle = '';
  @Input() optionClassBody = 'ntk-cms-html-tree-body';
  @Input() optionTreeDisplay = true;
  @Input() optionsListInfoAreaId = 'list';


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

  ) {
    this.unsubscribe.push(this.cmsStoreService.getState((state) => state.themeStore).subscribe(async (value) => {
      if (value.actionScrollTopList && this.topList && this.topList.nativeElement) {
        this.topList.nativeElement.scrollIntoView({ behavior: 'smooth', block: "start" })
        //k:by karavi for test//    this.themeService.onActionScrollTopList(false);
      };
    }));

    this.translate.get('TITLE.OperationMenu').subscribe((str: string) => { this.optionTitle = str });
    this.translate.get('TITLE.Category').subscribe((str: string) => { this.optionCategoryTitle = str });
  }
  @ViewChild("topList") topList: ElementRef;
  private unsubscribe: Subscription[] = [];

  ngOnInit(): void {

  }

  ngOnDestroy() {
    if (this.unsubscribe)
      this.unsubscribe.forEach((sb) => sb.unsubscribe());

  }
  actionScrollIntoViewRun = false;
  viewGuideNotice = false
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

    this.viewGuideNotice = false
    this.viewMenuMain = false;
    this.viewMenuItemRow = false;
    //this.viewTree = false;
  }
  actionCloseGuideNotice(): void {
    this.viewGuideNotice = !this.viewGuideNotice;
    this.optionActionGuideNoticeDisplayChange.emit(this.viewGuideNotice);
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
  }
  actionViewMenuMain(state?: boolean) {
    if (state == true) {
      this.viewMenuMain = true;
    } else if (state == false) {
      this.viewMenuMain = false;
    } else {
      this.viewMenuMain = !this.viewMenuMain;
    }
    this.viewGuideNotice = false
    //this.viewMenuMain = false;
    this.viewMenuItemRow = false;
    this.viewTree = false;
  }
  actionViewMenuItemRow(state?: boolean) {
    if (state == true) {
      this.viewMenuItemRow = true;
    } else if (state == false) {
      this.viewMenuItemRow = false;
    } else {
      this.viewMenuItemRow = !this.viewMenuItemRow;
    }
    this.viewGuideNotice = false
    this.viewMenuMain = false;
    //this.viewMenuItemRow = false;
    this.viewTree = false;
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
      <!--begin:::::::::::::::::::::::::::::::::::::::::cms-message-->
      --------------------------------------
      <!--end:::::::::::::::::::::::::::::::::::::::::cms-message-->
    </ng-container>
    <ng-container  cms-footer>
      <!--begin:::::::::::::::::::::::::::::::::::::::::cms-footer-->
      --------------------------------------
      <!--end:::::::::::::::::::::::::::::::::::::::::cms-footer-->
    </ng-container>
  </app-cms-html-list>
*/
}

