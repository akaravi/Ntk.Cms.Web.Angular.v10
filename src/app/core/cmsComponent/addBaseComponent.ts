import { TranslateService } from "@ngx-translate/core";
import {
  BaseEntity,
  DataFieldInfoModel,
  ErrorExceptionResult,
  IApiCmsServerBase,
  TokenInfoModelV3,
} from "ntk-cms-api";
import { DatapickerHeaderComponent } from "src/app/shared/datapicker-header/datapicker-header.component";
import { PublicHelper } from "../helpers/publicHelper";
import { FormInfoModel } from "../models/formInfoModel";
import { FormSubmitedStatusEnum } from "../models/formSubmitedStatusEnum";
//IApiCmsServerBase
export class AddBaseComponent<
  TService extends IApiCmsServerBase,
  TModel extends BaseEntity<TKey>,
  TKey,
> {
  constructorInfoAreaId = this.constructor.name;
  constructor(
    public baseService: TService,
    public item: TModel,
    public publicHelper: PublicHelper,
    public translate: TranslateService,
  ) {
    publicHelper.pageInfo.updateContentService(baseService);
    this.DataGetAccess();
    this.dataModel = item;
  }
  formInfo: FormInfoModel = new FormInfoModel();
  formSubmitedStatusEnum = FormSubmitedStatusEnum;
  datapickerHeader = DatapickerHeaderComponent;
  tokenInfo = new TokenInfoModelV3();
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();

  dataModelResult: ErrorExceptionResult<TModel> =
    new ErrorExceptionResult<TModel>();
  dataModel: TModel;

  DataGetAccess(): void {
    const pName = this.constructor.name + "main";
    this.translate
      .get("MESSAGE.Receiving_information")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });
    this.baseService.ServiceViewModel().subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
        } else {
          this.publicHelper.cmsToastrService.typeErrorGetAccess(
            ret.errorMessage,
          );
        }
        this.publicHelper.processService.processStop(pName);
      },
      error: (er) => {
        this.publicHelper.cmsToastrService.typeErrorGetAccess(er);
        this.publicHelper.processService.processStop(pName, false);
      },
    });
  }
}
