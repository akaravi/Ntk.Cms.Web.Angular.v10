import {
  ChangeDetectorRef, Component, Inject, OnInit,
  ViewChild
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import {
  CoreEnumService, CoreModuleModel, DataFieldInfoModel, ErrorExceptionResult,
  FormInfoModel,
  WebDesignerMainPageDependencyModel, WebDesignerMainPageDependencyService
} from 'ntk-cms-api';
import { TreeModel } from 'ntk-cms-filemanager';
import { AddBaseComponent } from 'src/app/core/cmsComponent/addBaseComponent';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';
@Component({
    selector: 'app-webdesigner-pagedependency-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss'],
    standalone: false
})
export class WebDesignerMainPageDependencyAddComponent extends AddBaseComponent<WebDesignerMainPageDependencyService, WebDesignerMainPageDependencyModel, string> implements OnInit {
  requestLinkModuleId = 0;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<WebDesignerMainPageDependencyAddComponent>,
    public coreEnumService: CoreEnumService,
    public webDesignerMainPageDependencyService: WebDesignerMainPageDependencyService,
    private cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
  ) {
    super(webDesignerMainPageDependencyService, new WebDesignerMainPageDependencyModel(), publicHelper, translate);
    this.publicHelper.processService.cdr = this.cdr;
    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
    if (data) {
      this.requestLinkModuleId = +data.linkModuleId;
    }
    if (this.requestLinkModuleId > 0) {
      this.dataModel.linkModuleId = this.requestLinkModuleId;
    }
  }
  @ViewChild('vform', { static: false }) formGroup: FormGroup;
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<string, DataFieldInfoModel>();
  selectFileTypeMainImage = ['jpg', 'jpeg', 'png'];
  fileManagerTree: TreeModel;
  appLanguage = 'fa';
  dataModelResult: ErrorExceptionResult<WebDesignerMainPageDependencyModel>
    = new ErrorExceptionResult<WebDesignerMainPageDependencyModel>();
  dataModel: WebDesignerMainPageDependencyModel = new WebDesignerMainPageDependencyModel();
  formInfo: FormInfoModel = new FormInfoModel();

  fileManagerOpenForm = false;
  ngOnInit(): void {
    this.translate.get('TITLE.ADD').subscribe((str: string) => { this.formInfo.formTitle = str; });

    this.DataGetAccess();
  }


  DataAddContent(): void {
    this.translate.get('MESSAGE.sending_information_to_the_server').subscribe((str: string) => { this.formInfo.formAlert = str; });
    this.formInfo.formError = '';
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });
    this.webDesignerMainPageDependencyService.ServiceAdd(this.dataModel).subscribe({
      next: (ret) => {
        this.formInfo.formSubmitAllow = true;
        this.dataModelResult = ret;
        if (ret.isSuccess) {
          this.translate.get('MESSAGE.registration_completed_successfully').subscribe((str: string) => { this.formInfo.formAlert = str; });
          this.cmsToastrService.typeSuccessAdd();
          this.dialogRef.close({ dialogChangedDate: true });
        } else {
          this.translate.get('ERRORMESSAGE.MESSAGE.typeError').subscribe((str: string) => { this.formInfo.formAlert = str; });
          this.formInfo.formError = ret.errorMessage;
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.publicHelper.processService.processStop(pName);
      },
      error: (err) => {
        this.formInfo.formSubmitAllow = true;
        this.cmsToastrService.typeError(err);
        this.publicHelper.processService.processStop(pName);
      }
    }
    );
  }
  onActionSelectModule(model: CoreModuleModel | null): void {
    if (!model || model.id <= 0) {
      this.translate.get(['MESSAGE.Specify_the_module', 'MESSAGE.Information_module_is_not_clear']).subscribe((str: any) => {
        this.cmsToastrService.typeErrorMessage(
          str['MESSAGE.Specify_the_module'],
          str['MESSAGE.Information_module_is_not_clear']
        );
      });
      return;
    }
    this.dataModel.linkModuleId = model.id;
  }
  onFormSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }
    this.formInfo.formSubmitAllow = false;
    this.DataAddContent();
  }
  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }
}
