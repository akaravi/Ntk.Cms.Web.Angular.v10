import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { CoreModuleEntityReportFileModel, ErrorExceptionResult, ErrorExceptionResultExportFile, ExportFileModel, ExportFileTypeEnum, ExportReceiveMethodEnum, FilterModel, FormInfoModel, IApiCmsServerBase, InfoEnumModel, ReportFileTypeEnum, TokenInfoModelV3 } from 'ntk-cms-api';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { TokenHelper } from 'src/app/core/helpers/tokenHelper';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
import { CmsStoreService } from 'src/app/core/reducers/cmsStore.service';


@Component({
    selector: 'app-cms-export-list',
    templateUrl: './cmsExportList.component.html',
    standalone: false
})
export class CmsExportListComponent implements OnInit {
  static nextId = 0;
  id = ++CmsExportListComponent.nextId;
  filterModel: FilterModel = new FilterModel();
  requestTitle = '';
  requestService: IApiCmsServerBase;
  constructorInfoAreaId = this.constructor.name;
  constructor(private cmsToastrService: CmsToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CmsExportListComponent>,
    public translate: TranslateService,
    public publicHelper: PublicHelper,
    private cmsStoreService:CmsStoreService,
    public tokenHelper: TokenHelper,) {

    if (data) {
      if (data.service)
        this.requestService = data.service;
      else
        this.dialogRef.close({ dialogChangedDate: true });
      if (data.filterModel)
        this.filterModel = data.filterModel;
      else
        this.dialogRef.close({ dialogChangedDate: true });
      if (data.title)
        this.requestTitle = data.title;
    } else {
      this.dialogRef.close({ dialogChangedDate: true });
    }
    this.filterModel.exportFile = new ExportFileModel();
    let eum = new InfoEnumModel();
    eum.value = 1;
    eum.key = 'Excel';
    eum.description = 'Excel';
    this.fileTypeListItems.push(eum);

    eum = new InfoEnumModel();
    eum.value = 3;
    eum.key = 'Json';
    eum.description = 'Json';
    this.fileTypeListItems.push(eum);

    eum = new InfoEnumModel();
    eum.value = 4;
    eum.key = 'Report';
    eum.description = 'Report';
    this.fileTypeListItems.push(eum);

    eum = new InfoEnumModel();
    eum.value = 0;
    eum.key = 'Now';
    eum.description = 'Now';
    this.recieveMethodListItems.push(eum);

    eum = new InfoEnumModel();
    eum.value = 1;
    eum.key = 'Email';
    eum.description = 'Email';
    this.recieveMethodListItems.push(eum);

    eum = new InfoEnumModel();
    eum.value = 2;
    eum.key = 'FileManager';
    eum.description = 'FileManager';
    this.recieveMethodListItems.push(eum);

    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;


  }
  formInfo: FormInfoModel = new FormInfoModel();
  tokenInfo = new TokenInfoModelV3();
  dataModelReportFileResult: ErrorExceptionResult<CoreModuleEntityReportFileModel> = new ErrorExceptionResult<CoreModuleEntityReportFileModel>();
  dataModelSubmitResult: ErrorExceptionResultExportFile = new ErrorExceptionResultExportFile();
  dataModelFileSelect: CoreModuleEntityReportFileModel = new CoreModuleEntityReportFileModel();
  EnumExportFileTypeReport = ExportFileTypeEnum.Report;
  EnumExportReceiveMethodNow = ExportReceiveMethodEnum.Now;




  ngOnInit(): void {
    this.DataGetAll();
    this.translate.get('TITLE.EXPORTFILE').subscribe((str: string) => {
      this.formInfo.formTitle = str + ' : ' + this.requestTitle;
    });
    this.filterModel.exportFile.fileType = this.EnumExportFileTypeReport;
    this.filterModel.exportFile.recieveMethod = this.EnumExportReceiveMethodNow;
  }

  DataGetAll(): void {
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.get_information_list').subscribe((str: string) => { this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId); });
    this.dataModelSubmitResult = new ErrorExceptionResultExportFile();
    this.formInfo.formSubmitAllow = false;
    this.requestService.ServiceReportFileGetAll().subscribe({
      next: (ret) => {
        this.dataModelReportFileResult = ret;
        if (ret.isSuccess) {
          this.dataModelReportFileResult.listItems = this.dataModelReportFileResult.listItems.filter(x => x.reportFileType == ReportFileTypeEnum.List);
        } else {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.publicHelper.processService.processStop(pName);
        this.formInfo.formSubmitAllow = true;
      },
      error: (er) => {
        this.cmsToastrService.typeError(er);

        this.publicHelper.processService.processStop(pName, false);
        this.formInfo.formSubmitAllow = true;
      }
    }
    );
  }
  onActionFileSelect(model: CoreModuleEntityReportFileModel): void {
    this.dataModelFileSelect = model;
    this.filterModel.exportFile.reportFormatFileId = model.id;
    this.dataModelSubmitResult = new ErrorExceptionResultExportFile();
  }

  fileTypeListItems: Array<InfoEnumModel> = new Array<InfoEnumModel>();
  recieveMethodListItems: Array<InfoEnumModel> = new Array<InfoEnumModel>();

  onFormSubmit(): void {
    this.dataModelSubmitResult = new ErrorExceptionResultExportFile();
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.get_information_list').subscribe((str: string) => { this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId); });
    this.formInfo.formSubmitAllow = false;

    this.requestService.ServiceExportFile(this.filterModel).subscribe({
      next: (ret) => {
        this.dataModelSubmitResult = ret;
        if (ret.isSuccess) {
          this.translate.get('MESSAGE.registration_completed_successfully').subscribe((str: string) => { this.formInfo.formAlert = str; });
        } else {
          this.translate.get('ERRORMESSAGE.MESSAGE.typeError').subscribe((str: string) => { this.formInfo.formAlert = str; });
          this.formInfo.formError = ret.errorMessage;
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.publicHelper.processService.processStop(pName);
        this.formInfo.formSubmitAllow = true;
      },
      error: (er) => {
        this.cmsToastrService.typeError(er);

        this.publicHelper.processService.processStop(pName, false);
        this.formInfo.formSubmitAllow = true;
      }
    }
    );
  }
  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }
  onOpenPage(): void {
    if (this.dataModelSubmitResult && this.dataModelSubmitResult.isSuccess && this.dataModelSubmitResult.linkFile.length > 0)
      window.open(this.dataModelSubmitResult.linkFile, "_blank");
  }
}
