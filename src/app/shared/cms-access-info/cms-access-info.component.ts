import {
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AccessModel } from "ntk-cms-api";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
@Component({
  selector: "app-cms-access-info",
  templateUrl: "./cms-access-info.component.html",
  standalone: false,
})
export class CmsAccessInfoComponent implements OnInit {
  static nextId = 0;
  id = ++CmsAccessInfoComponent.nextId;
  @Input() access: AccessModel;
  @Input() title: string;
  body: string;
  @Input() classes: string;
  @Input() icon: string;
  @Input() svg: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CmsAccessInfoComponent>,
    private tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
    private cdr: ChangeDetectorRef,
    private cmsToastrService: CmsToastrService,
  ) {
    if (data && data.access) {
      this.access = data.access;
    }
  }
  ngOnInit(): void {}

  bodyShow = false;
  onActionMoreBottunClick() {
    this.bodyShow = true;
    Promise.resolve().then(() => this.cdr.detectChanges());
  }
  onActionLessBottunClick() {
    this.bodyShow = false;
    Promise.resolve().then(() => this.cdr.detectChanges());
  }
  onActionCloseBottunClick() {
    this.dialogRef.close({ dialogChangedDate: false });
    Promise.resolve().then(() => this.cdr.detectChanges());
  }
  detectColor(value: boolean) {
    if (value === true) return "table-success";

    return "table-danger";
  }
}
