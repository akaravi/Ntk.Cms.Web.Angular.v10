
import {
  ChangeDetectorRef, Component, Inject, OnInit,
  ViewChild
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import {
  AccessModel, CoreEnumService, CoreSiteModel, CoreSiteUserModel, CoreSiteUserService, CoreUserGroupModel, CoreUserModel, DataFieldInfoModel,
  ErrorExceptionResultBase, FilterDataModel, FilterModel, FormInfoModel
} from 'ntk-cms-api';
import { EditBaseComponent } from 'src/app/core/cmsComponent/editBaseComponent';
import { PublicHelper } from 'src/app/core/helpers/publicHelper';
import { CmsToastrService } from 'src/app/core/services/cmsToastr.service';

@Component({
    selector: 'app-core-site-user-edit',
    templateUrl: './userEdit.component.html',
    styleUrls: ['./userEdit.component.scss'],
    standalone: false
})
export class CoreSiteUserEditComponent extends EditBaseComponent<CoreSiteUserService, CoreSiteUserModel, number>
  implements OnInit {
  requestLinkSiteId = 0;
  requestLinkUserId = 0;
  requestLinkUserGroupId = 0;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CoreSiteUserEditComponent>,
    public coreEnumService: CoreEnumService,
    public coreSiteUserService: CoreSiteUserService,
    private cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
  ) {
    super(coreSiteUserService, new CoreSiteUserModel(), publicHelper, translate);

    this.publicHelper.processService.cdr = this.cdr;

    if (data) {
      this.requestLinkUserId = +data.linkUserId || 0;
      this.requestLinkSiteId = +data.linkSiteId || 0;
      this.requestLinkUserGroupId = +data.linkUserGroupId || 0;
    }
  }
  @ViewChild('vform', { static: false }) formGroup: FormGroup;
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<string, DataFieldInfoModel>();




  dataModelResult: ErrorExceptionResultBase = new ErrorExceptionResultBase();
  dataModel: CoreSiteUserModel = new CoreSiteUserModel();

  formInfo: FormInfoModel = new FormInfoModel();


  fileManagerOpenForm = false;

  dataAccessModel: AccessModel;

  ngOnInit(): void {
    if (this.requestLinkUserId <= 0 || this.requestLinkSiteId <= 0) {
      this.cmsToastrService.typeErrorComponentAction();
      this.dialogRef.close({ dialogChangedDate: false });
      return;
    }

    this.DataGetOneContent();
  }


  DataGetOneContent(): void {


    this.translate.get('MESSAGE.Receiving_Information_From_The_Server').subscribe((str: string) => { this.formInfo.formAlert = str; });
    this.formInfo.formError = '';
    const pName = this.constructor.name + 'main';
    this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });


    const filteModelContent = new FilterModel();
    /*make filter*/
    let filter = new FilterDataModel();
    filter.propertyName = 'LinkUserId';
    filter.value = this.requestLinkUserId;
    filteModelContent.filters.push(filter);
    /*make filter*/
    filter = new FilterDataModel();
    filter.propertyName = 'LinkSiteId';
    filter.value = this.requestLinkSiteId;
    filteModelContent.filters.push(filter);

    filteModelContent.accessLoad = true;

    this.coreSiteUserService.ServiceGetAll(filteModelContent).subscribe({
      next: (ret) => {
        /*َAccess Field*/
        this.dataAccessModel = ret.access;
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);

        this.dataModel = ret.item;
        if (ret.isSuccess) {
          if (ret.listItems && ret.listItems.length > 0) {
            this.dataModel = ret.listItems[0];
            this.formInfo.formTitle = this.formInfo.formTitle;
            this.formInfo.formAlert = '';
          }
          else {
            this.translate.get('MESSAGE.Module_not_found_for_editing').subscribe((str: string) => {
        this.cmsToastrService.typeError(str);
      });

          }
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
    this.translate.get('MESSAGE.Receiving_information').subscribe((str: string) => {
      this.publicHelper.processService.processStart(pName, str, this.constructorInfoAreaId);
    });

    this.coreSiteUserService.ServiceEdit(this.dataModel).subscribe({
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
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
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

  onActionSelectorSiteSelect(model: CoreSiteModel): void {
    this.dataModel.linkSiteId = null;
    if (model && model.id > 0) {
      this.dataModel.linkSiteId = model.id;
    }
  }
  onActionSelectorUserSelect(model: CoreUserModel): void {
    this.dataModel.linkUserId = null;
    if (model && model.id > 0) {
      this.dataModel.linkUserId = model.id;
    }
  }
  onActionSelectorUserGroupSelect(model: CoreUserGroupModel): void {
    this.dataModel.linkUserGroupId = null;
    if (model && model.id > 0) {
      this.dataModel.linkUserGroupId = model.id;
    }
  }
  onFormSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }
    this.formInfo.formSubmitAllow = false;
    this.DataEditContent();
  }
  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }
}
