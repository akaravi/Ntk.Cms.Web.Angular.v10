import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { RecordStatusEnum } from "ntk-cms-api";

@Pipe({
  name: "statusIconClass",
  standalone: false,
})
export class RecordStatusIconClassPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: RecordStatusEnum, editable = false): SafeHtml {
    let ret = "";
    switch (value) {
      case RecordStatusEnum.Available:
        ret = "fa fa-check";
        break;
      case RecordStatusEnum.Disable:
        ret = "fa fa-eye-slash";
        break;
      case RecordStatusEnum.Deleted:
        ret = "fa fa-trash";
        break;
      case RecordStatusEnum.Pending:
        ret = "fa fa-hourglass-half";
        break;
      case RecordStatusEnum.DeniedConfirmed:
        ret = "fa fa-times";
        break;
      case RecordStatusEnum.Archive:
        ret = "fa fa-archive";
        break;
      default:
        ret = "fa fa-check";
    }
    return ret;
  }
  iconStatus(value: RecordStatusEnum): string {
    let ret = "";
    switch (value) {
      case RecordStatusEnum.Available:
        ret = "fa fa-check";
        break;
      case RecordStatusEnum.Disable:
        ret = "fa fa-eye-slash";
        break;
      case RecordStatusEnum.Deleted:
        ret = "fa fa-trash";
        break;
      case RecordStatusEnum.Pending:
        ret = "fa fa-hourglass-half";
        break;
      case RecordStatusEnum.DeniedConfirmed:
        ret = "fa fa-times";
        break;
      case RecordStatusEnum.Archive:
        ret = "fa fa-archive";
        break;
      default:
        ret = "fa fa-check";
    }
    return ret;
  }
}
