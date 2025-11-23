import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-cms-json-list",
  templateUrl: "./cmsJsonList.component.html",
  styleUrls: ["./cmsJsonList.component.scss"],
  standalone: false,
})
export class CmsJsonListComponent implements OnInit {
  static nextId = 0;
  id = ++CmsJsonListComponent.nextId;
  constructor() {}
  @Input() optionIsChild = false;
  @Input() optionMethod = 1;
  @Input() optionTitleLocation: "top" | "side" = "side";

  @Input() optionFields: Map<string, string>;
  @Input() optionViewHead: boolean = true;
  @Input() optionViewChild: boolean = true;
  dataModelPrivate: any;
  @Input()
  set dataModel(value: any) {
    this.dataModelPrivate = value;
    if (this.dataModelPrivate) {
      if (this.isMap(this.dataModel)) {
        this.optionMethod = 2;
      }
    }
  }

  ngOnInit(): void {}

  isObject(item: any): boolean {
    // Check for plain object, but not Array or Map
    return (
      item !== null &&
      item !== undefined &&
      typeof item === "object" &&
      !Array.isArray(item) &&
      !(item instanceof Map)
    );
  }

  isArray(item: any): boolean {
    // True if Array
    return item !== null && item !== undefined && Array.isArray(item);
  }

  isMap(item: any): boolean {
    // Recognize Map for key and value like name['ali']='aaaa'
    return (
      item !== null &&
      item !== undefined &&
      item instanceof Map &&
      !Array.isArray(item)
    );
  }
}
