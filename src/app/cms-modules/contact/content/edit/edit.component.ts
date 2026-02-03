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
    ClauseTypeEnum,
    ContactCategoryModel,
    ContactContentCategoryModel,
    ContactContentCategoryService,
    ContactContentModel,
    ContactContentService,
    CoreEnumService,
    ErrorExceptionResultBase,
    FilterDataModel,
    FilterModel, ManageUserAccessDataTypesEnum
} from "ntk-cms-api";
import { NodeInterface, TreeModel } from "ntk-cms-filemanager";
import { EditBaseComponent } from "src/app/core/cmsComponent/editBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";


@Component({
  selector: "app-contact-content-edit",
  templateUrl: "./edit.component.html",

  standalone: false,
})
export class ContactContentEditComponent
  extends EditBaseComponent<ContactContentService, ContactContentModel, string>
  implements OnInit
{
  requestId = "";
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ContactContentEditComponent>,
    public coreEnumService: CoreEnumService,
    public ContactContentService: ContactContentService,
    private contentCategoryService: ContactContentCategoryService,
    public cmsToastrService: CmsToastrService,
    public publicHelper: PublicHelper,
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
  ) {
    super(
      ContactContentService,
      new ContactContentModel(),
      publicHelper,
      translate,
    );

    this.publicHelper.processService.cdr = this.cdr;
    if (data) {
      this.requestId = data.id;
    }

    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;

  selectFileTypeMainImage = ["jpg", "jpeg", "png"];

  fileManagerTree: TreeModel;
  appLanguage = "fa";

  dataModelResult: ErrorExceptionResultBase = new ErrorExceptionResultBase();
  dataModel: ContactContentModel = new ContactContentModel();


  fileManagerOpenForm = false;

  onActionFileSelected(model: NodeInterface): void {}

  ngOnInit(): void {
    this.DataGetOneContent();
    this.DataCategoryGetAll();
  }

  DataGetOneContent(): void {
    if (this.requestId.length === 0) {
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

    this.ContactContentService.setAccessLoad();
    this.ContactContentService.setAccessDataType(
      ManageUserAccessDataTypesEnum.Editor,
    );
    this.ContactContentService.ServiceGetOneById(this.requestId).subscribe({
      next: (ret) => {
        this.fieldsInfo = this.publicHelper.fieldInfoConvertor(ret.access);

        this.dataModel = ret.item;
        if (ret.isSuccess) {
          this.formInfo.formTitle =
            this.formInfo.formTitle + " " + ret.item.title;
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
  DataCategoryGetAll(): void {
    this.formInfo.submitButtonEnabled = false;
    this.translate
      .get("MESSAGE.get_category_information_from_the_server")
      .subscribe((str: string) => {
        this.formInfo.submitResultMessage = str;
      });
    this.formInfo.submitResultMessage = "";
    const pName = this.constructor.name + "main";
    this.translate
      .get("MESSAGE.get_category_information_from_the_server")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });
    const filterModel = new FilterModel();
    const filter = new FilterDataModel();
    filter.propertyName = "LinkContentId";
    filter.value = this.requestId;
    filter.clauseType = ClauseTypeEnum.And;
    filterModel.filters.push(filter);
    this.contentCategoryService.ServiceGetAll(filterModel).subscribe({
      next: (ret) => {
        const itemList = [];
        ret.listItems.forEach((element) => {
          itemList.push(element.linkCategoryId);
        });
        this.dataContentCategoryModel = itemList;
        this.formInfo.submitButtonEnabled = true;
        this.publicHelper.processService.processStop(pName);
      },
      error: (er) => {
        this.formInfo.submitButtonEnabled = true;
        this.cmsToastrService.typeErrorGetAll(er);
        this.publicHelper.processService.processStop(pName);
      },
    });
  }
  DataEditContent(): void {
    this.translate
      .get("MESSAGE.sending_information_to_the_server")
      .subscribe((str: string) => {
        this.formInfo.submitResultMessage = str;
      });
    this.formInfo.submitResultMessage = "";
    const pName = this.constructor.name + "main";
    this.translate
      .get("MESSAGE.sending_information_to_the_server")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });

    this.ContactContentService.ServiceEdit(this.dataModel).subscribe({
      next: (ret) => {
        this.formInfo.submitButtonEnabled = true;
        this.dataModelResult = ret;
        if (ret.isSuccess) {
          this.translate
            .get("MESSAGE.registration_completed_successfully")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
          this.formInfo.submitResultMessageType = this.formSubmitedStatusEnum.Success;
            });
          this.cmsToastrService.typeSuccessEdit();
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
      error: (er) => {
        this.formInfo.submitButtonEnabled = true;
        this.cmsToastrService.typeError(er);
        this.publicHelper.processService.processStop(pName, false);
      },
    });
  }

  dataContentCategoryModel: string[] = [];
  onActionCategorySelectChecked(model: string): void {
    if (!model || model.length == 0) {
      this.translate
        .get("MESSAGE.category_of_information_is_not_clear")
        .subscribe((str: string) => {
          this.cmsToastrService.typeErrorSelected(str);
        });
      return;
    }

    const entity = new ContactContentCategoryModel();
    entity.linkCategoryId = model;
    entity.linkContentId = this.dataModel.id;
    this.contentCategoryService.ServiceAdd(entity).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.translate
            .get("MESSAGE.registration_in_this_group_was_successful")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
            });
          this.cmsToastrService.typeSuccessEdit();
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
      },
      error: (er) => {
        this.formInfo.submitButtonEnabled = true;
        this.cmsToastrService.typeError(er);
      },
    });
  }
  onActionCategorySelectDisChecked(model: string): void {
    if (!model || model.length == 0) {
      this.translate
        .get("MESSAGE.category_of_information_is_not_clear")
        .subscribe((str: string) => {
          this.cmsToastrService.typeErrorSelected(str);
        });
      return;
    }
    const entity = new ContactContentCategoryModel();
    entity.linkCategoryId = model;
    entity.linkContentId = this.dataModel.id;
    this.contentCategoryService.ServiceDeleteEntity(entity).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.translate
            .get("MESSAGE.registration_in_this_group_was_successful")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
            });
          this.cmsToastrService.typeSuccessEdit();
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
      },
      error: (er) => {
        this.formInfo.submitButtonEnabled = true;
        this.cmsToastrService.typeError(er);
      },
    });
  }
  onFormSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }
    // if (
    //   !this.dataModel.linkCategoryId ||
    //   this.dataModel.linkCategoryId.length == 0
    // ) {
    //   this.translate
    //     .get("MESSAGE.Category_is_not_clear")
    //     .subscribe((str: string) => {
    //       this.cmsToastrService.typeErrorSelected(str);
    //     });
    //   return;
    // }
    this.formInfo.submitButtonEnabled = false;
    this.DataEditContent();
  }
  onFormCancel(): void {
    this.dialogRef.close({ dialogChangedDate: false });
  }

  onActionSelectCategory(model: ContactCategoryModel | null): void {
    if (!model || model.id?.length == 0) {
      this.translate
        .get("MESSAGE.Category_is_not_clear")
        .subscribe((str: string) => {
          this.cmsToastrService.typeErrorSelected(str);
        });
      return;
    }
    //this.dataModel.linkCategoryId = model.id;
  }
}
