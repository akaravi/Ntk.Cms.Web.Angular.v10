import { Component, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CmsLinkManagementComponent } from "../cms-link-management/cms-link-management.component";

@Component({
  selector: "app-cms-link-management-to",
  templateUrl: "./cms-link-management-to.component.html",
  styleUrls: ["./cms-link-management-to.component.scss"],
  standalone: false,
})
export class CmsLinkManagementToComponent {
  @Input() buttonLabel = "کوتاه‌کننده لینک و فایل";
  @Input() buttonIcon = "link";
  @Input() optionFileId = "";
  @Input() optionUrl = "";
  @Input() optionMessage = "";
  @Input() optionKey = "";

  constructor(private dialog: MatDialog) {}

  onOpenDialog(): void {
    this.dialog.open(CmsLinkManagementComponent, {
      width: "960px",
      maxWidth: "100vw",
      panelClass: "cms-link-management-dialog",
      data: {
        optionFileId: this.optionFileId,
        optionUrl: this.optionUrl,
        optionMessage: this.optionMessage,
        optionKey: this.optionKey,
      },
    });
  }
}
