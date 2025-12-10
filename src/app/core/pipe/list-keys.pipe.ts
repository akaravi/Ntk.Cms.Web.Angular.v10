import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "listkeys",
  standalone: false,
})
export class ListKeysPipe implements PipeTransform {
  transform(value, optionFields: Map<string, string>): any {
    if (!value) {
      return [];
    }
    let retOut = Object.keys(value);
    retOut = retOut.filter(
      (x) => x && x.length > 0 && x.toLowerCase().indexOf("antiinjection") < 0,
    );
    if (optionFields && optionFields.size > 0) {
      retOut = retOut.filter((x) => x && x.length > 0 && optionFields.has(x));
    }
    return retOut;
  }
}
