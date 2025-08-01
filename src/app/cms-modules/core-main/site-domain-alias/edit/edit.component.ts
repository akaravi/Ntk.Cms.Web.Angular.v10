
import {
  ChangeDetectorRef, Component, Inject, OnInit,
  ViewChild
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import {
  CoreEnumService, CoreSiteDomainAliasModel, CoreSiteDomainAliasService, CoreSiteModel,
  ErrorExceptionResultBase,
  FormInfoModel,
  ManageUserAccessDataTypesEnum
} from 'ntk-cms-api';
import { EditBaseComponent } from 'src/app/core/cmsComponent/editBaseComponent';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';

@Component({
    selector: 'app-core-site-domainalias-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss'],
    standalone: false
})
export class CoreSiteDomainAliasEditComponent extends EditBaseComponent<CoreSiteDomainAliasService, CoreSiteDomainAliasModel, number>
  implements OnInit {
  requestId = 0;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CoreSiteDomainAliasEditComponent>,
    public coreEnumService: CoreEnumService,
    public coreSiteDomainAliasService: CoreSiteDomainAliasService,
    public publicHelper: PublicHelper,
    private cmsToastrService: CmsToastrService,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
  ) {
    super(coreSiteDomainAliasService, new CoreSiteDomainAliasModel(), publicHelper, translate);

    this.publicHelper.processService.cdr = this.cdr;

    if (data) {
      this.requestId = +data.id || 0;
    }

  }
  @ViewChild('vform', { static: false }) formGroup: FormGroup;





  dataModelResult: ErrorExceptionResultBase = new ErrorExceptionResultBase();
  dataModel: CoreSiteDomainAliasModel = new CoreSiteDomainAliasModel();

  formInfo: FormInfoModel = new FormInfoModel();


  fileManagerOpenForm = false;


  ngOnInit(): void {
    if (this.requestId > 0) {
      this.translate.get('TITLE.Edit').subscribe((str: string) => { this.formInfo.formTitle = str; });
      this.DataGetOneContent();
    } else {
      this.cmsToastrService.typeErrorComponentAction();
      this.dialogRef.close({ dialogChangedDate: false });
      return;
    }


  }

  DataGetOneContent(): void {
    if (this.requestId <= 0) {
      this.cmsToastrService.typeErrorEditRowIsNull();
      return;
    }

    this.translate.get('MESSAGE.Receiving_Information_From_The_Server').subscribe((str: string) => { this.formInfo.formAlert = str; });
    this.formInfo.formError = '';
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });

    this.coreSiteDomainAliasService.setAccessLoad();
    this.coreSiteDomainAliasService.setAccessDataType(ManageUserAccessDataTypesEnum.Editor);
    this.coreSiteDomainAliasService.ServiceGetOneById(this.requestId).subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);

        this.dataModel = ret.item;
        if (ret.isSuccess) {
          this.formInfo.formTitle = this.formInfo.formTitle + ' ' + ret.item.domain;
          this.formInfo.formAlert = '';
        } else {
          this.translate.get('ERRORMESSAGE.MESSAGE.typeError').subscribe((str: string) => { this.formInfo.formAlert = str; });
          this.formInfo.formError = ret.errorMessage;
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

  DataEditContent(): void {
    this.translate.get('MESSAGE.sending_information_to_the_server').subscribe((str: string) => { this.formInfo.formAlert = str; });
    this.formInfo.formError = '';
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.sending_information_to_the_server').subscribe((str: string) => { this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId); });

    this.coreSiteDomainAliasService.ServiceEdit(this.dataModel).subscribe({
      next: (ret) => {
        this.formInfo.formSubmitAllow = true;
        this.dataModelResult = ret;
        if (ret.isSuccess) {
          this.translate.get('MESSAGE.registration_completed_successfully').subscribe((str: string) => { this.formInfo.formAlert = str; });
          this.cmsToastrService.typeSuccessEdit();
          this.dialogRef.close({ dialogChangedDate: true });

        } else {
          this.translate.get('ERRORMESSAGE.MESSAGE.typeError').subscribe((str: string) => { this.formInfo.formAlert = str; });
          this.formInfo.formError = ret.errorMessage;
          this.cmsToastrService.typeErrorEdit(ret.errorMessage);

        }
        this.publicHelper.processService.processStop(pName);

      },
      error: (er) => {
        this.formInfo.formSubmitAllow = true;
        this.cmsToastrService.typeError(er);
        this.publicHelper.processService.processStop(pName, false);
      }
    }
    );
  }
  onActionSiteSelect(model: CoreSiteModel): void {
    this.dataModel.linkCmsSiteId = null;
    if (model && model.id > 0) {
      this.dataModel.linkCmsSiteId = model.id;
    }
  }
  onFormSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }
    if (!this.dataModel.linkCmsSiteId || this.dataModel.linkCmsSiteId <= 0) {
      this.translate.get('MESSAGE.Website_ID_is_not_specified').subscribe((str: string) => {
        this.cmsToastrService.typeErrorEdit(str);
      });
      return;
    }
    this.formInfo.formSubmitAllow = false;
    this.DataEditContent();
  }
  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }
}
