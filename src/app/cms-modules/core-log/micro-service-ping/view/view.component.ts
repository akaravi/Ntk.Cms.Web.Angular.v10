import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import {
  CoreLogMicroServicePingModel,
  DataFieldInfoModel,
  TokenInfoModelV3,
} from "ntk-cms-api";
import { Subscription } from "rxjs";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { FormInfoModel } from "src/app/core/models/formInfoModel";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";

@Component({
  selector: "app-core-log-micro-service-ping-view",
  templateUrl: "./view.component.html",
  standalone: false,
})
export class CoreLogMicroServicePingViewComponent implements OnInit, OnDestroy {
  constructorInfoAreaId = this.constructor.name;
  @ViewChild("vform", { static: false }) formGroup: FormGroup;

  tokenInfo = new TokenInfoModelV3();
  formInfo: FormInfoModel = new FormInfoModel();

  dataModel: CoreLogMicroServicePingModel = {} as CoreLogMicroServicePingModel;
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();

  private unsubscribe: Subscription[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { item?: CoreLogMicroServicePingModel },
    private dialogRef: MatDialogRef<CoreLogMicroServicePingViewComponent>,
    private cmsStoreService: CmsStoreService,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
    public translate: TranslateService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;
    this.dataModel = data?.item ?? ({} as CoreLogMicroServicePingModel);
  }

  ngOnInit(): void {
    this.translate.get("TITLE.VIEW").subscribe((str: string) => {
      const title = this.dataModel?.appInfo ? ` ${this.dataModel.appInfo}` : "";
      this.formInfo.formTitle = `${str}${title}`;
    });

    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;
    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.tokenInfoStore)
        .subscribe(async (value) => {
          this.tokenInfo = value;
          this.cdr.markForCheck();
        }),
    );
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }
}
