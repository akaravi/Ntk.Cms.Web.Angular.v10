
import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import {
  CoreModuleTagCategoryModel,
  CoreModuleTagCategoryService,
  DataFieldInfoModel, ErrorExceptionResult,
  FilterModel,
  FormInfoModel, ManageUserAccessDataTypesEnum
} from 'ntk-cms-api';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';


@Component({
    selector: 'app-tag-category-delete',
    templateUrl: './delete.component.html',
    standalone: false
})
export class CoreModuleTagCategoryDeleteComponent implements OnInit {
  requestId = 0;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CoreModuleTagCategoryDeleteComponent>,
    public publicHelper: PublicHelper,
    private coreModuleTagCategoryService: CoreModuleTagCategoryService,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
    private cmsToastrService: CmsToastrService
  ) {
    this.publicHelper.processService.cdr = this.cdr;

    if (data) {
      this.requestId = +data.id || 0;
    }


  }
  @ViewChild('vform', { static: false }) formGroup: FormGroup;
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<string, DataFieldInfoModel>();


  dataModelResultCategory: ErrorExceptionResult<CoreModuleTagCategoryModel> = new ErrorExceptionResult<CoreModuleTagCategoryModel>();
  dataModelResultCategoryAllData: ErrorExceptionResult<CoreModuleTagCategoryModel> = new ErrorExceptionResult<CoreModuleTagCategoryModel>();
  dataModel: any = {};
  formInfo: FormInfoModel = new FormInfoModel();
  ngOnInit(): void {

    if (this.requestId <= 0) {
      this.cmsToastrService.typeErrorDeleteRowIsNull();
      this.dialogRef.close({ dialogChangedDate: false });
      return;
    }
    this.DataGetOne();
    this.DataGetAll();
  }
  DataGetOne(): void {
    if (this.requestId === 0) {
      this.cmsToastrService.typeErrorDeleteRowIsNull();
      return;
    }
    this.translate.get('TITLE.Loading_Information').subscribe((str: string) => { this.formInfo.formAlert = str; });
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });

    this.coreModuleTagCategoryService.setAccessLoad();
    this.coreModuleTagCategoryService.setAccessDataType(ManageUserAccessDataTypesEnum.Editor);
    this.coreModuleTagCategoryService
      .ServiceGetOneById(this.requestId)
      .subscribe({
        next: (ret) => {
          this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);

          this.dataModelResultCategory = ret;
          if (!ret.isSuccess) {
            this.translate.get('ERRORMESSAGE.MESSAGE.typeError').subscribe((str: string) => { this.formInfo.formAlert = str; });
            this.formInfo.formError = ret.errorMessage;
            this.formInfo.formErrorStatus = true;
            this.cmsToastrService.typeErrorGetOne();
          } else {
            this.formInfo.formAlert = '';
          }
          this.publicHelper.processService.processStop(pName);

        },
        error: (er) => {
          this.translate.get('ERRORMESSAGE.MESSAGE.typeError').subscribe((str: string) => { this.formInfo.formAlert = str; });
          this.formInfo.formErrorStatus = true;
          this.cmsToastrService.typeError(er);
          this.publicHelper.processService.processStop(pName, false);
        }
      }
      );

  }
  DataGetAll(): void {
    this.translate.get('TITLE.Loading_Information').subscribe((str: string) => { this.formInfo.formAlert = str; });
    const filterModel: FilterModel = new FilterModel();
    filterModel.rowPerPage = 100;
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });

    this.coreModuleTagCategoryService
      .ServiceGetAll(filterModel)
      .subscribe({
        next: (ret) => {
          this.dataModelResultCategoryAllData = ret;
          if (!ret.isSuccess) {
            this.translate.get('ERRORMESSAGE.MESSAGE.typeError').subscribe((str: string) => { this.formInfo.formAlert = str; });
            this.formInfo.formError = ret.errorMessage;
            this.formInfo.formErrorStatus = true;
            this.cmsToastrService.typeErrorGetAll();
          } else {
            this.formInfo.formAlert = '';
          }
          this.publicHelper.processService.processStop(pName);
        },
        error: (er) => {
          this.translate.get('ERRORMESSAGE.MESSAGE.typeError').subscribe((str: string) => { this.formInfo.formAlert = str; });
          this.formInfo.formErrorStatus = true;
          this.cmsToastrService.typeError(er);
          this.publicHelper.processService.processStop(pName, false);
        }
      }
      );

  }
  onFormMove(): void {
    if (this.requestId === 0) {
      this.cmsToastrService.typeErrorDeleteRowIsNull();
      return;
    }
    if (!this.formGroup.valid) {
      return;
    }
    this.formInfo.formSubmitAllow = true;
    if (this.dataModel.newCatId === this.requestId) {
      this.translate.get('ERRORMESSAGE.MESSAGE.typeError').subscribe((str: string) => { this.formInfo.formAlert = str; });
      this.translate.get('ERRORMESSAGE.MESSAGE.The_delete_category_ID_is_the_same_as_the_alternate_category').subscribe((str: string) => {
        this.formInfo.formError = str;
      });
      this.formInfo.buttonSubmittedEnabled = true;
    }

    this.formInfo.buttonSubmittedEnabled = false;
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });

    this.formInfo.formSubmitAllow = true;
    this.formInfo.buttonSubmittedEnabled = true;
    this.publicHelper.processService.processStop(pName);
  }
  onFormDelete(): void {
    if (this.requestId === 0) {
      this.cmsToastrService.typeErrorDeleteRowIsNull();
      return;
    }

    this.formInfo.formSubmitAllow = false;
    this.formInfo.buttonSubmittedEnabled = false;
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });

    this.coreModuleTagCategoryService
      .ServiceDelete(this.requestId)
      .subscribe({
        next: (ret) => {
          this.formInfo.formSubmitAllow = !ret.isSuccess;
          if (!ret.isSuccess) {
            this.translate.get('ERRORMESSAGE.MESSAGE.typeError').subscribe((str: string) => { this.formInfo.formAlert = str; });
            this.formInfo.formError = ret.errorMessage;
            this.cmsToastrService.typeErrorRemove();

          } else {
            this.translate.get('MESSAGE.Deletion_Was_Successful').subscribe((str: string) => { this.formInfo.formAlert = str; });
            this.cmsToastrService.typeSuccessRemove();
            this.dialogRef.close({ dialogChangedDate: true });
          }
          this.formInfo.buttonSubmittedEnabled = true;
          this.publicHelper.processService.processStop(pName);
        },
        error: (er) => {
          this.translate.get('ERRORMESSAGE.MESSAGE.typeError').subscribe((str: string) => { this.formInfo.formAlert = str; });
          this.formInfo.formSubmitAllow = true;
          this.cmsToastrService.typeError(er);
          this.formInfo.buttonSubmittedEnabled = true;
          this.publicHelper.processService.processStop(pName);
        }
      }
      );

  }
  onFormChangeNewCatId(model: CoreModuleTagCategoryModel): void {
    this.formInfo.formAlert = '';
    if (this.requestId === 0 || !model || model.id <= 0) {
      this.cmsToastrService.typeErrorDeleteRowIsNull();
      return;
    }
    this.dataModel.newCatId = model.id;
    if (this.dataModel.newCatId === this.requestId) {
      this.translate.get('ERRORMESSAGE.MESSAGE.typeError').subscribe((str: string) => { this.formInfo.formAlert = str; });
      this.translate.get('ERRORMESSAGE.MESSAGE.The_delete_category_ID_is_the_same_as_the_alternate_category').subscribe((str: string) => {
        this.formInfo.formError = str;
      });
      this.formInfo.buttonSubmittedEnabled = false;
    } else {
      this.formInfo.buttonSubmittedEnabled = true;
      this.formInfo.formError = '';
    }
  }
  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });

  }
}
