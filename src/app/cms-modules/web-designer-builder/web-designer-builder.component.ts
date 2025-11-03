import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {
  DataFieldInfoModel,
  ErrorExceptionResult,
  ManageUserAccessDataTypesEnum,
  TokenInfoModelV3,
  WebDesignerMainPageModel,
  WebDesignerMainPageService,
} from "ntk-cms-api";
import { Subscription } from "rxjs";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { HtmlBuilderModel } from "src/app/core/models/htmlBuilderModel";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";

@Component({
  selector: "app-web-designer-builder",
  //template: '<router-outlet></router-outlet>',
  templateUrl: "./web-designer-builder.component.html",
  styleUrls: ["./web-designer-builder.component.scss"],
  standalone: false,
})
export class WebDesignerBuilderComponent implements OnInit, OnDestroy {
  requestId = "";
  constructorInfoAreaId = this.constructor.name;
  constructor(
    public tokenHelper: TokenHelper,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
    private cmsStoreService: CmsStoreService,
    private cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    public webDesignerMainPageService: WebDesignerMainPageService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;
  }
  cmsApiStoreSubscribe: Subscription;
  tokenInfo = new TokenInfoModelV3();

  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();
  dataModel: HtmlBuilderModel = new HtmlBuilderModel();
  dataPageModel: WebDesignerMainPageModel = new WebDesignerMainPageModel();
  dataModelResult: ErrorExceptionResult<WebDesignerMainPageModel> =
    new ErrorExceptionResult<WebDesignerMainPageModel>();

  ngOnInit(): void {
    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;
    if (this.tokenInfo) {
      this.DataGetOneContent();
    }

    this.cmsApiStoreSubscribe = this.cmsStoreService
      .getState((state) => state.tokenInfoStore)
      .subscribe(async (value) => {
        this.tokenInfo = value;
        this.DataGetOneContent();
      });
  }

  ngOnDestroy(): void {
    if (this.cmsApiStoreSubscribe) {
      this.cmsApiStoreSubscribe.unsubscribe();
    }
  }
  DataGetOneContent(): void {
    const pName =
      this.constructor.name + "webDesignerMainPageService.ServiceGetOneById";
    this.translate
      .get("MESSAGE.Receiving_information")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });
    this.webDesignerMainPageService.setAccessLoad();
    this.webDesignerMainPageService.setAccessDataType(
      ManageUserAccessDataTypesEnum.Editor,
    );
    this.webDesignerMainPageService
      .ServiceGetOneById(this.requestId)
      .subscribe({
        next: (ret) => {
          this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
          this.dataPageModel = ret.item;
          if (ret.isSuccess) {
          } else {
            this.cmsToastrService.typeErrorMessage(ret.errorMessage);
          }
          this.publicHelper.processService.processStop(pName);
        },
        error: (err) => {
          this.cmsToastrService.typeError(err);
          this.publicHelper.processService.processStop(pName);
        },
      });
  }
  // DataEditContent(): void {
  //   const pName = this.constructor.name + 'main';
  //   this.translate.get('MESSAGE.sending_information_to_the_server').subscribe((str: string) => {this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);});
  //   this.webDesignerMainPageService.ServiceEdit(this.dataModel).subscribe(
  //     next:(ret) => {

  //       this.dataModelResult = ret;
  //       if (ret.isSuccess) {
  //         this.cmsToastrService.typeSuccessEdit();
  //       } else {
  //         this.cmsToastrService.typeErrorMessage(ret.errorMessage);
  //       }
  //       this.publicHelper.processService.processStop(pName);
  //     },
  //     error:(err) => {

  //       this.cmsToastrService.typeError(err);
  //       this.publicHelper.processService.processStop(pName);
  //     }
  //   );
  // }
  onActionAdd() {}
}
