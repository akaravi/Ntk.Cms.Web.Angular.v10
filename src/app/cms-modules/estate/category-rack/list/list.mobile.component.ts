import { Component, HostListener } from "@angular/core";
import {
  EstateCategoryRackFolderOrderModel,
  EstateCategoryRackFolderPropertyModel,
  EstateCategoryRackModel,
} from "ntk-cms-api";
import { environment } from "src/environments/environment";
import { EstateCategoryRackEditComponent } from "../edit/edit.component";
import { EstateCategoryRackListComponent } from "./list.component";

@Component({
  selector: "app-estate-category-rack-list-mobile",
  templateUrl: "./list.mobile.component.html",
  standalone: false,
})
export class EstateCategoryRackListMobileComponent extends EstateCategoryRackListComponent {
  statusFolderClick = false;

  onActionButtonEditFolderOrder(
    model: EstateCategoryRackModel = this.tableRowSelected,
    folder: EstateCategoryRackFolderOrderModel,
  ): void {
    this.statusFolderClick = true;
    if (!(model?.id?.length > 0)) {
      this.cmsToastrService.typeErrorSelectedRow();
      return;
    }
    if (!folder || !folder.uid || folder.uid.length === 0) {
      this.cmsToastrService.typeErrorSelectedRow();
      return;
    }
    const findRow = model.rackFolderOrders.findIndex(
      (x) => x.uid == folder.uid,
    );
    if (findRow < 0) {
      this.cmsToastrService.typeErrorSelectedRow();
      return;
    }
    const panelClass = this.publicHelper.isMobile
      ? "dialog-fullscreen"
      : "dialog-min";
    const dialogRef = this.dialog.open(EstateCategoryRackEditComponent, {
      height: "90%",
      panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: { model, folder },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
        model.rackFolderOrders[findRow] = result.folder;
        const pName =
          this.constructor.name + "onActionButtonEditFolderProperty";
        this.translate
          .get("MESSAGE.Receiving_information")
          .subscribe((str: string) => {
            this.publicHelper.processService.processStart(
              pName,
              str,
              this.constructorInfoAreaId,
            );
          });
        this.contentService.ServiceEdit(model).subscribe({
          next: (ret) => {
            if (ret.isSuccess) {
            } else {
              this.cmsToastrService.typeErrorMessage(ret.errorMessage);
            }
            this.publicHelper.processService.processStop(pName);
          },
          error: (er) => {
            this.cmsToastrService.typeError(er);
            this.publicHelper.processService.processStop(pName);
          },
        });
      }
    });
    setTimeout(() => {
      this.statusFolderClick = false;
    }, 1000);
  }

  onActionButtonEditFolderProperty(
    model: EstateCategoryRackModel = this.tableRowSelected,
    folder: EstateCategoryRackFolderPropertyModel,
  ): void {
    this.statusFolderClick = true;
    if (!(model?.id?.length > 0)) {
      this.cmsToastrService.typeErrorSelectedRow();
      return;
    }
    if (!folder || !folder.uid || folder.uid.length === 0) {
      this.cmsToastrService.typeErrorSelectedRow();
      return;
    }
    const findRow = model.rackFolderProperties.findIndex(
      (x) => x.uid == folder.uid,
    );
    if (findRow < 0) {
      this.cmsToastrService.typeErrorSelectedRow();
      return;
    }
    const panelClass = this.publicHelper.isMobile
      ? "dialog-fullscreen"
      : "dialog-min";
    const dialogRef = this.dialog.open(EstateCategoryRackEditComponent, {
      height: "90%",
      panelClass,
      enterAnimationDuration: environment.cmsViewConfig.enterAnimationDuration,
      exitAnimationDuration: environment.cmsViewConfig.exitAnimationDuration,
      data: { model, folder },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dialogChangedDate) {
        model.rackFolderProperties[findRow] = result.folder;
        const pName =
          this.constructor.name + "onActionButtonEditFolderProperty";
        this.translate
          .get("MESSAGE.Receiving_information")
          .subscribe((str: string) => {
            this.publicHelper.processService.processStart(
              pName,
              str,
              this.constructorInfoAreaId,
            );
          });
        this.contentService.ServiceEdit(model).subscribe({
          next: (ret) => {
            if (ret.isSuccess) {
            } else {
              this.cmsToastrService.typeErrorMessage(ret.errorMessage);
            }
            this.publicHelper.processService.processStop(pName);
          },
          error: (er) => {
            this.cmsToastrService.typeError(er);
            this.publicHelper.processService.processStop(pName);
          },
        });
      }
    });
    setTimeout(() => {
      this.statusFolderClick = false;
    }, 1000);
  }

  onActionClickRackDoor(model: EstateCategoryRackModel): void {
    if (this.statusFolderClick) return;
    if (model["rackOpen"] && model["rackOpen"] === true) {
      model["rackOpen"] = false;
    } else {
      model["rackOpen"] = true;
    }
  }

  onActionButtoncheck = false;

  onActionButtonmenu(): void {
    this.onActionButtoncheck = true;
  }

  onActionButtonclose(): void {
    this.onActionButtoncheck = false;
  }

  actionMenuOpen: string | null = null;

  toggleActionMenu(rowId: string | number): void {
    const idStr = String(rowId);
    if (this.actionMenuOpen === idStr) {
      this.actionMenuOpen = null;
    } else {
      this.actionMenuOpen = idStr;
    }
  }

  closeActionMenu(): void {
    this.actionMenuOpen = null;
  }

  toString(value: string | number): string {
    return String(value);
  }

  @HostListener("document:click", ["$event"])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (
      !target.closest(".cms-m-action-menu") &&
      !target.closest(".cms-m-action-menu-dropdown")
    ) {
      this.closeActionMenu();
    }
  }

  getRowExpanded(row: any): boolean {
    return (row as any).expanded === true;
  }
}
