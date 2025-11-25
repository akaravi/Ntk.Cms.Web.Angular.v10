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
  ContactCategoryModel,
  ContactContentCategoryModel,
  ContactContentCategoryService,
  ContactContentModel,
  ContactContentService,
  CoreEnumService,
  DataFieldInfoModel,
  ErrorExceptionResult,
  FormInfoModel,
} from "ntk-cms-api";
import { NodeInterface, TreeModel } from "ntk-cms-filemanager";
import { AddBaseComponent } from "src/app/core/cmsComponent/addBaseComponent";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

@Component({
  selector: "app-contact-content-add",
  templateUrl: "./add.component.html",

  standalone: false,
})
export class ContactContentAddComponent
  extends AddBaseComponent<ContactContentService, ContactContentModel, string>
  implements OnInit
{
  constructorInfoAreaId = this.constructor.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ContactContentAddComponent>,
    public coreEnumService: CoreEnumService,
    public ContactContentService: ContactContentService,
    private contentCategoryService: ContactContentCategoryService,
    private cmsToastrService: CmsToastrService,
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

    // if (data && data.linkCategoryId && data.linkCategoryId.length > 0)
    //   this.dataModel.linkCategoryId = data.linkCategoryId;
    this.fileManagerTree = this.publicHelper.GetfileManagerTreeConfig();
  }
  @ViewChild("vform", { static: false }) formGroup: FormGroup;
  fieldsInfo: Map<string, DataFieldInfoModel> = new Map<
    string,
    DataFieldInfoModel
  >();

  selectFileTypeMainImage = ["jpg", "jpeg", "png"];

  fileManagerTree: TreeModel;
  appLanguage = "fa";

  dataModelResult: ErrorExceptionResult<ContactContentModel> =
    new ErrorExceptionResult<ContactContentModel>();
  dataModel: ContactContentModel = new ContactContentModel();

  formInfo: FormInfoModel = new FormInfoModel();

  fileManagerOpenForm = false;

  onActionFileSelected(model: NodeInterface): void {}

  ngOnInit(): void {
    this.translate
      .get("TITLE.Register_New_Categories")
      .subscribe((str: string) => {
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

    this.ContactContentService.ServiceAdd(this.dataModel).subscribe({
      next: (ret) => {
        this.formInfo.submitButtonEnabled = true;
        this.dataModelResult = ret;
        if (ret.isSuccess) {
          this.translate
            .get("MESSAGE.registration_completed_successfully")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
            });
          this.cmsToastrService.typeSuccessAdd();
          /**add category */
          for (
            let index = 0;
            index < this.dataContentCategoryModel.length;
            index++
          ) {
            const entity = new ContactContentCategoryModel();
            entity.linkCategoryId = this.dataContentCategoryModel[index];
            entity.linkContentId = ret.item.id;
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
                  this.cmsToastrService.typeErrorMessage(ret.errorMessage);
                }
              },
              error: (er) => {
                this.formInfo.submitButtonEnabled = true;
                this.cmsToastrService.typeError(er);
              },
            });
          }
          /**add category */
          this.dialogRef.close({ dialogChangedDate: true });
        } else {
          this.translate
            .get("ERRORMESSAGE.MESSAGE.typeError")
            .subscribe((str: string) => {
              this.formInfo.submitResultMessage = str;
            });
          this.formInfo.submitResultMessage = ret.errorMessage;
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
    // const entity = new ContactContentCategoryModel();
    // entity.linkCategoryId = model;
    // entity.linkContentId = this.dataModel.id;
    // this.contentCategoryService.ServiceAdd(entity).subscribe({
    //   next: (ret) => {
    //     if (ret.isSuccess) {
    //       this.translate
    //         .get("MESSAGE.registration_in_this_group_was_successful")
    //         .subscribe((str: string) => {
    //           this.formInfo.submitResultMessage = str;
    //         });
    //       this.cmsToastrService.typeSuccessEdit();
    //     } else {
    //       this.translate
    //         .get("ERRORMESSAGE.MESSAGE.typeError")
    //         .subscribe((str: string) => {
    //           this.formInfo.submitResultMessage = str;
    //         });
    //       this.formInfo.submitResultMessage = ret.errorMessage;
    //       this.cmsToastrService.typeErrorMessage(ret.errorMessage);
    //     }
    //   },
    //   error: (er) => {
    //     this.formInfo.submitButtonEnabled = true;
    //     this.cmsToastrService.typeError(er);
    //   },
    // });
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
    // const entity = new ContactContentCategoryModel();
    // entity.linkCategoryId = model;
    // entity.linkContentId = this.dataModel.id;
    // this.contentCategoryService.ServiceDeleteEntity(entity).subscribe({
    //   next: (ret) => {
    //     if (ret.isSuccess) {
    //       this.translate
    //         .get("MESSAGE.registration_in_this_group_was_successful")
    //         .subscribe((str: string) => {
    //           this.formInfo.submitResultMessage = str;
    //         });
    //       this.cmsToastrService.typeSuccessEdit();
    //     } else {
    //       this.translate
    //         .get("ERRORMESSAGE.MESSAGE.typeError")
    //         .subscribe((str: string) => {
    //           this.formInfo.submitResultMessage = str;
    //         });
    //       this.formInfo.submitResultMessage = ret.errorMessage;
    //       this.cmsToastrService.typeErrorMessage(ret.errorMessage);
    //     }
    //   },
    //   error: (er) => {
    //     this.formInfo.submitButtonEnabled = true;
    //     this.cmsToastrService.typeError(er);
    //   },
    // });
  }
  onFormSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }
    // if (
    //   !this.dataModel.linkCategoryId ||
    //   this.dataModel.linkCategoryId.length == 0
    // ) {
    //   const message = "دست بندی   مشخص نیست";
    //   this.cmsToastrService.typeErrorSelected(message);
    //   return;
    // }
    this.formInfo.submitButtonEnabled = false;

    this.DataAddContent();
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
