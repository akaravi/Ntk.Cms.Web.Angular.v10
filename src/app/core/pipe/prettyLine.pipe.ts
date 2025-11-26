import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
  name: "prettyLine",
  standalone: false,
})
export class PrettyLinePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(html) {
    if (html?.length > 0) return html.replace(/(?:\r\n|\r|\n)/g, "<br>");
    return html;
  }
}
