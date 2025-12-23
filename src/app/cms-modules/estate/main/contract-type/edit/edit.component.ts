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
  EstateContractTypeModel,
  EstateContractTypeService,
} from "ntk-cms-api";
import { TreeModel } from "ntk-cms-filemanager";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

import { FormInfoModel } from "../../../../../core/models/formInfoModel";
import { FormSubmitedStatusEnum } from "../../../../../core/models/formSubmitedStatusEnum";
import { EstateContractTypeEditBaseComponent } from "./edit.base";

@Component({
  selector: "app-estate-contract-type-edit",
  templateUrl: "./edit.component.html",

  standalone: false,
})
export class EstateContractTypeEditComponent
  extends EstateContractTypeEditBaseComponent
  implements OnInit
{
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EstateContractTypeEditComponent>,
    public coreEnumService: CoreEnumService,
    public estateContractTypeService: EstateContractTypeService,
    cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    cdr: ChangeDetectorRef,
    private tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
    public translate: TranslateService,
  ) {
    super(
      coreEnumService,
      estateContractTypeService,
      cmsToastrService,
      publicHelper,
      cdr,
      translate,
    );
    if (data) {
      this.requestId = data.id;
    }
    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();

    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;

  ngOnInit(): void {
    this.translate.get("TITLE.Edit").subscribe((str: string) => {
      this.formInfo.formTitle = str;
    });
    if (
      !this.validateRequestId(() =>
        this.dialogRef.close({ dialogChangedDate: false }),
      )
    ) {
      return;
    }
    this.loadItem();
  }

  DataGetOneContent(): void {
    this.loadItem();
  }
  DataEditContent(): void {
    this.saveItem(() => {
      this.dialogRef.close({ dialogChangedDate: true });
    });
  }

  onFormSubmit(): void {
    this.onFormSubmitInternal(() => {
      this.dialogRef.close({ dialogChangedDate: true });
    });
  }
  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }
}
