
import {
  ChangeDetectorRef, Component, Input, OnDestroy, OnInit
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import {
  ArticleContentModel,
  ArticleContentService,
  DataFieldInfoModel, ErrorExceptionResult,
  RecordStatusEnum
} from 'ntk-cms-api';
import { Subscription } from 'rxjs';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
import { CmsLinkToComponent } from 'src/app/shared/cms-link-to/cms-link-to.component';
import { environment } from 'src/environments/environment';
import { CmsStoreService } from 'src/app/core/reducers/cmsStore.service';



@Component({
  selector: 'app-article-content-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false
})
export class ArticletHeaderComponent implements OnInit, OnDestroy {
  constructorInfoAreaId = this.constructor.name;
  constructor(
    private headerService: ArticleContentService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    private tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
    private cmsToastrService: CmsToastrService,
    public dialog: MatDialog,
    public translate: TranslateService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;

  }
  @Input() optionId = 0;

  dataModelResult: ErrorExceptionResult<ArticleContentModel> = new ErrorExceptionResult<ArticleContentModel>();
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<string, DataFieldInfoModel>();




  cmsApiStoreSubscribe: Subscription;
  ngOnInit(): void {
    if (this.optionId > 0) {

      this.cmsApiStoreSubscribe = this.cmsStoreService.getState((state) => state.tokenInfoStore).subscribe(async (value) => {
        this.DataGetOneContent();
      });
      setTimeout(() => {

        this.DataGetOneContent();
      }, 500);
    }
  }
  ngOnDestroy(): void {
    if (this.cmsApiStoreSubscribe) {
      this.cmsApiStoreSubscribe.unsubscribe();
    }
  }

  DataGetOneContent(): void {
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });

    this.headerService.setAccessLoad();
    this.headerService.ServiceGetOneById(this.optionId).subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
        if (ret.isSuccess) {
          this.dataModelResult = ret;
        } else {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.publicHelper.processService.processStop(pName);

      },
      error: (er) => {
        this.cmsToastrService.typeError(er);
        this.publicHelper.processService.processStop(pName, false);
      }
    }
    );
  }
  onActionButtonLinkTo(model: ArticleContentModel = this.dataModelResult.item): void {
    if (!model || !model.id || model.id === 0) {
      this.cmsToastrService.typeErrorSelectedRow();
      return;
    }
    if (model.recordStatus != RecordStatusEnum.Available) {
      this.cmsToastrService.typeWarningRecordStatusNoAvailable();
      return;
    }
    var panelClass = '';
    if (this.publicHelper.isMobile)
      panelClass = 'dialog-fullscreen';
    else
      panelClass = 'dialog-min';
    //open popup
    const dialogRef = this.dialog.open(CmsLinkToComponent, {
      height: "90%",
      width: "90%",
      panelClass: panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: {
        title: model.title,
        urlViewContentQRCodeBase64: model.urlViewContentQRCodeBase64,
        urlViewContent: model.urlViewContent,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {

      }
    });
    //open popup
  }
}
