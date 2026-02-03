  selector: "app-data-provider-source-path-pagination-add",
  templateUrl: "./add.component.html",
  standalone: false,
})
export class DataProviderSourcePathPaginationAddComponent
  extends AddBaseComponent<
    DataProviderSourcePathPaginationService,
    DataProviderSourcePathPaginationModel,
    string
  >
  implements OnInit
{
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DataProviderSourcePathPaginationAddComponent>,
    public coreEnumService: CoreEnumService,
    public contentService: DataProviderSourcePathPaginationService,
    public cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
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
    CoreEnumService,
    DataFieldInfoModel,
    DataProviderSourcePathPaginationModel,
    DataProviderSourcePathPaginationService,
    ErrorExceptionResult,
} from "ntk-cms-api";
import { AddBaseComponent } from "src/app/core/cmsComponent/addBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

@Component({
  selector: "app-data-provider-source-path-pagination-add",
  templateUrl: "./add.component.html",
  standalone: false,
})
export class DataProviderSourcePathPaginationAddComponent
  extends AddBaseComponent<
    DataProviderSourcePathPaginationService,
    DataProviderSourcePathPaginationModel,
    string
  >
  implements OnInit
{
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DataProviderSourcePathPaginationAddComponent>,
    public coreEnumService: CoreEnumService,
    public contentService: DataProviderSourcePathPaginationService,
    public cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    public 