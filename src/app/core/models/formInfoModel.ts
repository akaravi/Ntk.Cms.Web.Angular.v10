import { ErrorExceptionResultBase } from "ntk-cms-api";
import { FormSubmitedStatusEnum } from "./formSubmitedStatusEnum";
import { FormValidationStatusEnum } from "./formValidationStatusEnum";

export class FormInfoModel {
  formTitle = "";
  formDescription = "";
  submitButtonEnabled = true;
  submitResultMessage = "";
  submitResultMessageType: FormSubmitedStatusEnum = FormSubmitedStatusEnum.none;
  submitResultErrors: string[];
  submitResultWarnings: string[];
  get submitResult(): string {
    if (this.submitResultMessageType === FormSubmitedStatusEnum.Success) {
      return "success";
    } else if (this.submitResultMessageType === FormSubmitedStatusEnum.Error) {
      return "error";
    } else if (
      this.submitResultMessageType === FormSubmitedStatusEnum.Warning
    ) {
      return "warning";
    } else {
      return "none";
    }
  }

  clearSubmitResult(): void {
    this.submitResultMessage = "";
    this.submitResultMessageType = FormSubmitedStatusEnum.none;
    this.submitResultErrors = [];
    this.submitResultWarnings = [];
  }

  validationList: ValidationModel[] = [];
  set setErrorExceptionResult(model: ErrorExceptionResultBase) {
    if (model.isSuccess) {
      this.submitResultMessage = model.errorMessage;
      this.submitResultMessageType = FormSubmitedStatusEnum.Success;
    } else {
      this.submitResultMessage = model.errorMessage;
      this.submitResultMessageType = FormSubmitedStatusEnum.Error;
    }
    this.submitResultErrors = model.errors;
    this.submitResultWarnings = model.warnings;
  }
}

export class ValidationModel {
  key = "";
  title = "";
  description = "";
  status = FormValidationStatusEnum.Success;
  linkSrc = "";
}
