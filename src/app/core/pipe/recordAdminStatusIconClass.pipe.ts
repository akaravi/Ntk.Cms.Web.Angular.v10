import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { RecordAdminStatusEnum } from "ntk-cms-api";

@Pipe({
  name: "adminStatusIconClass",
  standalone: false,
})
export class RecordAdminStatusIconClassPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: RecordAdminStatusEnum, editable = false): SafeHtml {
    return iconAdminStatus(value);
  }
}

export function iconAdminStatus(value: RecordAdminStatusEnum): string {
  let ret = "";
  switch (value) {
    case RecordAdminStatusEnum.Pending:
      ret = "fa fa-hourglass-half";
      break;
    case RecordAdminStatusEnum.Accept:
      ret = "fa fa-check";
      break;
    case RecordAdminStatusEnum.Denied:
      ret = "fa fa-eye-slash";
      break;
    case RecordAdminStatusEnum.NeedToCheck:
      ret = "fa fa-times";
      break;
    default:
      ret = "fa fa-hourglass-half";
  }
  return ret;
}
