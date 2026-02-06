import {
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit,
    ViewChild
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import {
    CoreEnumService,
    DataFieldInfoModel,
    ErrorExceptionResult, TicketingDepartemenModel,
    TicketingTemplateModel,
    TicketingTemplateService
} from "ntk-cms-api";
import { AddBaseComponent } from "src/app/core/cmsComponent/addBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsFormsErrorStateMatcher } from "src/app/core/pipe/cmsFormsErrorStateMatcher";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";


@Component({
  selector: "app-ticketing-template-add",
  templateUrl: "./add.component.html",

  standalone: false,
})
export class TicketingTemplateAddComponent
  extends AddBaseComponent<
    TicketingTemplateService,
    TicketingTemplateModel,
    number
  >
  implements OnInit
{
  requestParentId = 0;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TicketingTemplateAddComponent>,
    public coreEnumService: CoreEnumService,
    public ticketingTemplateService: TicketingTemplateService,
    public cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
  ) {
    super(
      ticketingTemplateService,
      new TicketingTemplateModel(),
      publicHelper,
      translate,
    );
    this.publicHelper.processService.cdr = this.cdr;
    if (data) {
      this.requestParentId = +data.parentId || 0;
    }
    if (this.requestParentId > 0) {
      this.dataModel.linkTicketingDepartemenId = this.requestParentId;
    }
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();

  formMatcher = new CmsFormsErrorStateMatcher();
  dataModelResult: ErrorExceptionResult<TicketingTemplateModel> =
    new ErrorExceptionResult<TicketingTemplateModel>();
  dataModel: TicketingTemplateModel = new TicketingTemplateModel();

  ngOnInit(): void {
    this.translate.get("TITLE.Submit_New_Content").subscribe((str: string) => {
      this.formInfo.formTitle = str;
    });

    this.DataGetAccess();
  }

  DataAddContent(): void {
    this.translate
      .get("MESSAGE.sending_information_to_the_server")
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

    this.ticketingTemplateService.ServiceAdd(this.dataModel).subscribe({
      next: (ret) => {
        this.formInfo.submitButtonEnabled = true;
        this.dataModelResult = ret;
        if (ret.isSuccess) {
          this.translate
            .get("MESSAGE.registration_completed_successfully")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
              this.formInfo.submitResultMessageType =
                this.formSubmitedStatusEnum.Success;
            });
          this.cmsToastrService.typeSuccessAdd();
          this.dialogRef.close({ dialogChangedDate: true });
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
      error: (err) => {
        this.formInfo.submitButtonEnabled = true;
        this.cmsToastrService.typeError(err);
        this.publicHelper.processService.processStop(pName);
      },
    });
  }
  onActionSelectorSelect(model: TicketingDepartemenModel | null): void {
    if (!model || model.id <= 0) {
      this.translate
        .get("MESSAGE.Information_department_is_not_clear")
        .subscribe((message: string) => {
          this.cmsToastrService.typeErrorSelected(message);
        });
      return;
    }
    this.dataModel.linkTicketingDepartemenId = model.id;
  }
  onFormSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }
    this.formInfo.submitButtonEnabled = false;

    this.DataAddContent();
  }
  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }
}
