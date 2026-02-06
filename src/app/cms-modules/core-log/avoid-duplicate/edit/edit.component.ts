import {
    ChangeDetectorRef,
    Component,
    Inject,
    OnDestroy,
    OnInit,
    ViewChild
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import {
    CoreEnumService,
    CoreLogAvoidDuplicateDataEntryModel,
    CoreLogAvoidDuplicateDataEntryService,
    ErrorExceptionResultBase, ManageUserAccessDataTypesEnum
} from "ntk-cms-api";
import { Subscription } from "rxjs";
import { EditBaseComponent } from "src/app/core/cmsComponent/editBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { TokenHelper } from "src/app/core/helpers/tokenHelper";
import { CmsStoreService } from "src/app/core/reducers/cmsStore.service";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";


@Component({
  selector: "app-core-log-avoid-duplicate-edit",
  templateUrl: "./edit.component.html",

  standalone: false,
})
export class CoreLogAvoidDuplicateDataEntryEditComponent
  extends EditBaseComponent<
    CoreLogAvoidDuplicateDataEntryService,
    CoreLogAvoidDuplicateDataEntryModel,
    string
  >
  implements OnInit, OnDestroy
{
  requestId = "";
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CoreLogAvoidDuplicateDataEntryEditComponent>,
    public coreEnumService: CoreEnumService,
    public coreLogAvoidDuplicateDataEntryService: CoreLogAvoidDuplicateDataEntryService,
    public cmsToastrService: CmsToastrService,
    private tokenHelper: TokenHelper,
    private cmsStoreService: CmsStoreService,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
    public translate: TranslateService,
  ) {
    super(
      coreLogAvoidDuplicateDataEntryService,
      new CoreLogAvoidDuplicateDataEntryModel(),
      publicHelper,
      translate,
    );

    this.publicHelper.processService.cdr = this.cdr;

    if (data) {
      this.requestId = data.id;
    }
  }

  dataModelResult: ErrorExceptionResultBase = new ErrorExceptionResultBase();
  dataModel: CoreLogAvoidDuplicateDataEntryModel =
    new CoreLogAvoidDuplicateDataEntryModel();
  @ViewChild("vform", { static: false }) formGroup: FormGroup;


  fileManagerOpenForm = false;

  private unsubscribe: Subscription[] = [];

  ngOnInit(): void {
    if (this.requestId && this.requestId.length > 0) {
      this.translate.get("TITLE.Edit").subscribe((str: string) => {
        this.formInfo.formTitle = str;
      });
      this.DataGetOneContent();
    } else {
      this.cmsToastrService.typeErrorComponentAction();
      this.dialogRef.close({ dialogChangedDate: false });
      return;
    }
    this.tokenInfo = this.cmsStoreService.getStateAll.tokenInfoStore;

    this.unsubscribe.push(
      this.cmsStoreService
        .getState((state) => state.tokenInfoStore)
        .subscribe(async (value) => {
          this.tokenInfo = value;
        }),
    );
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  DataGetOneContent(): void {
    if (!this.requestId || this.requestId.length === 0) {
      this.cmsToastrService.typeErrorEditRowIsNull();
      return;
    }

    this.translate
      .get("MESSAGE.Receiving_Information_From_The_Server")
      .subscribe((str: string) => {
        this.formInfo.submitResultMessage = str;
      });
    this.formInfo.submitResultMessage = "";
    const pName = this.constructor.name + "main";
    this.translate
      .get("MESSAGE.Receiving_information")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });

    /*َAccess Field*/
    this.coreLogAvoidDuplicateDataEntryService.setAccessLoad();
    this.coreLogAvoidDuplicateDataEntryService.setAccessDataType(
      ManageUserAccessDataTypesEnum.Editor,
    );
    this.coreLogAvoidDuplicateDataEntryService
      .ServiceGetOneById(this.requestId)
      .subscribe({
        next: (ret) => {
          /*َAccess Field*/
          // this.dataAccessModel = next.access;
          this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);
          this.dataModel = ret.item;
          if (ret.isSuccess) {
            this.formInfo.formTitle =
              this.formInfo.formTitle + " " + ret.item.id;
            this.formInfo.submitResultMessage = "";
          this.formInfo.submitResultMessageType = this.formSubmitedStatusEnum.Success;
              } else {
            this.translate
              .get("ERRORMESSAGE.MESSAGE.typeError")
              .subscribe((str: string) => {
                this.formInfo.submitResultMessage = str;
              });
            this.formInfo.submitResultMessage = ret.errorMessage;
          this.formInfo.submitResultMessageType = this.formSubmitedStatusEnum.Error;
            this.cmsToastrService.typeErrorMessage(ret.errorMessage);
          }
          this.publicHelper.processService.processStop(pName);
        },
        error: (er) => {
          this.cmsToastrService.typeError(er);
          this.publicHelper.processService.processStop(pName, false);
        },
      });
  }

  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }
}
