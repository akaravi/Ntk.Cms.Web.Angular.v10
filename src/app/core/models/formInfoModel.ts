import { FormSubmitedStatusEnum } from "./formSubmitedStatusEnum";
import { FormValidationStatusEnum } from "./formValidationStatusEnum";

export class FormInfoModel {
  formTitle = "";
  formDescription = "";
  submitButtonEnabled = true;
  submitResultMessage = "";
  submitResultMessageType: FormSubmitedStatusEnum = FormSubmitedStatusEnum.none;
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
  validationList: ValidationModel[] = [];
}

export class ValidationModel {
  key = "";
  title = "";
  description = "";
  status = FormValidationStatusEnum.Success;
  linkSrc = "";
}
