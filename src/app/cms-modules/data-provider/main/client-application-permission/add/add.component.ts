
@Component({
  selector: "app-data-provider-client-application-permission-add",
  templateUrl: "./add.component.html",
  standalone: false,
})
export class DataProviderClientApplicationPermissionAddComponent
  extends AddBaseComponent<
    DataProviderClientApplicationPermissionService,
    DataProviderClientApplicationPermissionModel,
    string
  >
  implements OnInit
{
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DataProviderClientApplicationPermissionAddComponent>,
    public dataProviderClientApplicationPermissionService: DataProviderClientApplicationPermissionService,
    public cmsToastrService: CmsToastrService,
    import {
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit,
    ViewChild,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import {
    DataFieldInfoModel,
    DataProviderClientApplicationModel,
    DataProviderClientApplicationPermissionModel,
    DataProviderClientApplicationPermissionService,
    DataProviderSourcePathModel,
    ErrorExceptionResult,
} from "ntk-cms-api";
import { TreeModel } from "ntk-cms-filemanager";
import { AddBaseComponent } from "src/app/core/cmsComponent/addBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
import { DatapickerHeaderComponent } from "src/app/shared/datapicker-header/datapicker-header.component";


@Component({
  selector: "app-data-provider-client-application-permission-add",
  templateUrl: "./add.component.html",
  standalone: false,
})
export class DataProviderClientApplicationPermissionAddComponent
  extends AddBaseComponent<
    DataProviderClientApplicationPermissionService,
    DataProviderClientApplicationPermissionModel,
    string
  >
  implements OnInit
{
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DataProviderClientApplicationPermissionAddComponent>,
    public dataProviderClientApplicationPermissionService: DataProviderClientApplicationPermissionService,
    public cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    priv