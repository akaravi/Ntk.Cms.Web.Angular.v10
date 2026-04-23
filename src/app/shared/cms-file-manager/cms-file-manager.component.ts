import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  TemplateRef,
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {
  FileCategoryModel,
  FileCategoryService,
  FileContentModel,
  FileContentService,
} from "ntk-cms-api";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

type ManagerViewMode = "grid" | "list";
type NodeType = "folder" | "file";
type SortField = "name" | "type" | "size" | "createdDate";
type SortOrder = "asc" | "desc";

interface FileManagerNode {
  id: number;
  name: string;
  type: NodeType;
  parentId: number | null;
  extension?: string;
  size?: number;
  createdDate?: string;
  updatedDate?: string;
  downloadLinksrc?: string;
  downloadThumbnailSrc?: string;
}

@Component({
  selector: "app-cms-file-manager",
  templateUrl: "./cms-file-manager.component.html",
  styleUrls: ["./cms-file-manager.component.scss"],
  standalone: false,
})
export class CmsFileManagerShellComponent {
  @Input() title = "FILEMANAGER.TITLE";

  // Legacy compatibility inputs (cms-file-manager)
  private _language = "fa";
  @Input() set language(value: string) {
    if (value && value.length > 0) {
      this._language = value;
      try {
        this.translate.use(value);
      } catch {}
    }
  }
  get language(): string {
    return this._language;
  }

  @Input() iconTemplate?: TemplateRef<any>;
  @Input() folderContentTemplate?: TemplateRef<any>;
  @Input() folderContentBackTemplate?: TemplateRef<any>;
  @Input() folderContentNewFileTemplate?: TemplateRef<any>;
  @Input() folderContentNewFolderTemplate?: TemplateRef<any>;
  @Input() folderContentReloadTemplate?: TemplateRef<any>;
  @Input() loadingOverlayTemplate?: TemplateRef<any>;
  @Input() sideViewTemplate?: TemplateRef<any>;

  @Input() openDirectUploadSave = true;
  @Input() openDirectUploadView = false;
  @Input() tree: any = null;
  @Input() openSelectFileDescription = "";

  @Input() selectFileType: string[] = [];
  @Input() optionUploadFile = true;
  @Input() opttionSelectFile = true;
  @Input() optionPopup = false;
  @Input() isPopup = false;
  @Input() openFilemanagerButtonView = false;
  @Input() openFilemanagerButtonLabelKey = "FILEMANAGER.OPEN_MANAGER";
  @Input() openForm = true;
  @Input() enableMultiSelect = true;
  @Input() enableShortcuts = true;
  @Input() desktopHeight = "72vh";
  @Input() mobileHeight = "80vh";

  @Output() openFormChange = new EventEmitter<boolean>();
  @Output() itemClicked = new EventEmitter<any>();
  @Output() itemSelected = new EventEmitter<FileManagerNode>();
  @Output() selectedNodesChange = new EventEmitter<FileManagerNode[]>();
  @Output() actionTriggered = new EventEmitter<{
    action: string;
    nodes: FileManagerNode[];
  }>();

  viewMode: ManagerViewMode = "grid";
  isMobileView = window.innerWidth < 992;
  selectedNodeMap = new Map<number, FileManagerNode>();
  activeNode: FileManagerNode | null = null;
  rootId = 0;
  currentFolderId = 0;
  currentFolderName = "Root";
  loading = false;
  isUploading = false;
  searchText = "";
  folders: FileManagerNode[] = [];
  files: FileManagerNode[] = [];
  breadcrumbs: Array<{ id: number; name: string }> = [{ id: 0, name: "Root" }];
  treeMap = new Map<number, FileManagerNode[]>();
  uploadDialogOpen = false;
  uploadFileName = "";
  uploadGuid = "";
  uploadRawResponse: any = null;
  historyBack: number[] = [];
  historyForward: number[] = [];
  suppressHistoryRecord = false;
  sortField: SortField = "name";
  sortOrder: SortOrder = "asc";
  contextMenuOpen = false;
  contextMenuX = 0;
  contextMenuY = 0;
  contextMenuNode: FileManagerNode | null = null;
  dragNode: FileManagerNode | null = null;
  sideMenuClosed = true;

  constructor(
    private fileCategoryService: FileCategoryService,
    private fileContentService: FileContentService,
    private toastr: CmsToastrService,
    private translate: TranslateService,
  ) {
    this.loadFolder(0);
    this.loadTreeChildren(0);
  }

  @HostListener("window:resize")
  onResize(): void {
    this.isMobileView = window.innerWidth < 992;
  }

  @HostListener("window:keydown", ["$event"])
  onWindowKeydown(event: KeyboardEvent): void {
    if (!this.enableShortcuts) {
      return;
    }
    if (event.ctrlKey && event.key.toLowerCase() === "r") {
      event.preventDefault();
      this.refreshManager();
      return;
    }
    if (event.ctrlKey && event.key.toLowerCase() === "l") {
      event.preventDefault();
      this.viewMode = this.viewMode === "grid" ? "list" : "grid";
      return;
    }
    if (event.key === "Escape" && this.openForm) {
      this.closeContextMenu();
      this.handleOpenFormChange(false);
    }
    if (event.altKey && event.key === "ArrowLeft") {
      event.preventDefault();
      this.goBack();
    }
    if (event.altKey && event.key === "ArrowRight") {
      event.preventDefault();
      this.goForward();
    }
  }

  @HostListener("document:click")
  onDocumentClick(): void {
    this.closeContextMenu();
  }

  handleOpenFormChange(value: boolean): void {
    this.openForm = value;
    this.openFormChange.emit(value);
    if (value && this.openDirectUploadView && this.optionUploadFile) {
      this.openUpload();
    }
  }

  openPopup(): void {
    this.handleOpenFormChange(true);
  }

  backdropClicked(): void {
    if (!this.isPopupEffective) {
      return;
    }
    this.handleOpenFormChange(false);
  }

  get isPopupEffective(): boolean {
    return !!(this.optionPopup || this.isPopup);
  }

  refreshManager(): void {
    this.loadFolder(this.currentFolderId);
    this.loadTreeChildren(this.currentFolderId);
  }

  setViewMode(mode: ManagerViewMode): void {
    this.viewMode = mode;
  }

  loadFolder(folderId: number): void {
    this.pushHistory(folderId);
    this.loading = true;
    this.currentFolderId = folderId;
    this.clearSelection();
    this.fileCategoryService.ServiceGetAllInCategoryById(folderId).subscribe({
      next: (catRes) => {
        this.folders = (catRes?.listItems || []).map((x) => this.mapFolder(x));
        this.fileContentService
          .ServiceGetAllInCategoryById(folderId)
          .subscribe({
            next: (fileRes) => {
              this.files = (fileRes?.listItems || []).map((x) =>
                this.mapFile(x),
              );
              this.rebuildBreadcrumbs(folderId);
              this.loading = false;
            },
            error: () => {
              this.files = [];
              this.loading = false;
            },
          });
      },
      error: () => {
        this.folders = [];
        this.files = [];
        this.loading = false;
      },
    });
  }

  loadTreeChildren(folderId: number): void {
    this.fileCategoryService.ServiceGetAllInCategoryById(folderId).subscribe({
      next: (res) => {
        this.treeMap.set(
          folderId,
          (res?.listItems || []).map((x) => this.mapFolder(x)),
        );
      },
      error: () => {
        this.treeMap.set(folderId, []);
      },
    });
  }

  getTreeChildren(folderId: number): FileManagerNode[] {
    return this.treeMap.get(folderId) || [];
  }

  openFolder(node: FileManagerNode): void {
    if (node.type !== "folder") {
      this.selectNode(node);
      return;
    }
    this.loadFolder(node.id);
    this.loadTreeChildren(node.id);
    this.currentFolderName = node.name;
    this.itemClicked.emit({ type: "openFolder", node });
  }

  onTreeFolderClick(node: FileManagerNode, event: MouseEvent): void {
    event.stopPropagation();
    this.openFolder(node);
  }

  goUp(): void {
    if (this.currentFolderId === this.rootId) {
      return;
    }
    const parent = this.findParentFolder(this.currentFolderId);
    this.loadFolder(parent?.id ?? this.rootId);
  }

  navigateToBreadcrumb(id: number): void {
    this.loadFolder(id);
    this.loadTreeChildren(id);
  }

  goBack(): void {
    if (this.historyBack.length === 0) {
      return;
    }
    const target = this.historyBack.pop();
    if (target === undefined || target === null) {
      return;
    }
    this.historyForward.push(this.currentFolderId);
    this.suppressHistoryRecord = true;
    this.loadFolder(target);
    this.loadTreeChildren(target);
  }

  goForward(): void {
    if (this.historyForward.length === 0) {
      return;
    }
    const target = this.historyForward.pop();
    if (target === undefined || target === null) {
      return;
    }
    this.historyBack.push(this.currentFolderId);
    this.suppressHistoryRecord = true;
    this.loadFolder(target);
    this.loadTreeChildren(target);
  }

  selectNode(node: FileManagerNode): void {
    if (!this.opttionSelectFile) {
      return;
    }
    this.activeNode = node;
    this.sideMenuClosed = false;
    if (!this.enableMultiSelect) {
      this.selectedNodeMap.clear();
    }
    this.selectedNodeMap.set(this.buildSelectionKey(node), node);
    this.itemSelected.emit(node);
    this.emitSelectedNodes();
    this.itemClicked.emit({ type: "select", node });
    if (this.isPopupEffective) {
      this.handleOpenFormChange(false);
    }
  }

  toggleNodeSelection(node: FileManagerNode, event: MouseEvent): void {
    event.stopPropagation();
    if (!this.opttionSelectFile) {
      return;
    }
    const key = this.buildSelectionKey(node);
    if (!this.enableMultiSelect) {
      this.selectedNodeMap.clear();
      this.selectedNodeMap.set(key, node);
      this.activeNode = node;
      this.emitSelectedNodes();
      return;
    }
    if (this.selectedNodeMap.has(key)) {
      this.selectedNodeMap.delete(key);
    } else {
      this.selectedNodeMap.set(key, node);
      this.activeNode = node;
    }
    this.emitSelectedNodes();
  }

  isChecked(node: FileManagerNode): boolean {
    return this.selectedNodeMap.has(this.buildSelectionKey(node));
  }

  clearSelection(): void {
    this.selectedNodeMap.clear();
    this.activeNode = null;
    this.sideMenuClosed = true;
    this.emitSelectedNodes();
  }

  get selectedNodesCount(): number {
    return this.selectedNodeMap.size;
  }

  get selectedNodes(): FileManagerNode[] {
    return Array.from(this.selectedNodeMap.values());
  }

  get filteredNodes(): FileManagerNode[] {
    const all = [...this.folders, ...this.files];
    const key = this.searchText?.trim().toLowerCase();
    const filtered = key
      ? all.filter((x) => x.name?.toLowerCase().includes(key))
      : all;
    return [...filtered].sort((a, b) => this.compareNodes(a, b));
  }

  get managerHeight(): string {
    return this.isMobileView ? this.mobileHeight : this.desktopHeight;
  }

  addFolder(): void {
    const name = window.prompt("Folder name");
    if (!name || !name.trim()) {
      return;
    }
    const model = new FileCategoryModel();
    model.title = name.trim();
    model.linkParentId = this.currentFolderId > 0 ? this.currentFolderId : null;
    this.fileCategoryService.ServiceAdd(model).subscribe({
      next: (res) => {
        if (res?.isSuccess) {
          this.toastr.typeSuccessAdd();
          this.refreshManager();
        } else {
          this.toastr.typeErrorMessage(res?.errorMessage || "Error");
        }
      },
      error: () => this.toastr.typeErrorAdd(),
    });
  }

  askRename(node: FileManagerNode, event: MouseEvent): void {
    event.stopPropagation();
    const newName = window.prompt("New name", node.name);
    if (!newName || !newName.trim() || newName.trim() === node.name) {
      return;
    }
    if (node.type === "folder") {
      this.fileCategoryService.ServiceGetOneById(node.id).subscribe({
        next: (res) => {
          if (!res?.isSuccess || !res.item) {
            return;
          }
          res.item.title = newName.trim();
          this.fileCategoryService.ServiceEdit(res.item).subscribe({
            next: (editRes) => {
              if (editRes?.isSuccess) {
                this.toastr.typeSuccessEdit();
                this.refreshManager();
              } else {
                this.toastr.typeErrorMessage(editRes?.errorMessage || "Error");
              }
            },
            error: () => this.toastr.typeErrorEdit(),
          });
        },
      });
      return;
    }
    this.fileContentService.ServiceGetOneById(node.id).subscribe({
      next: (res) => {
        if (!res?.isSuccess || !res.item) {
          return;
        }
        res.item.fileName = newName.trim();
        this.fileContentService.ServiceEdit(res.item).subscribe({
          next: (editRes) => {
            if (editRes?.isSuccess) {
              this.toastr.typeSuccessEdit();
              this.refreshManager();
            } else {
              this.toastr.typeErrorMessage(editRes?.errorMessage || "Error");
            }
          },
          error: () => this.toastr.typeErrorEdit(),
        });
      },
    });
  }

  askDelete(node: FileManagerNode, event: MouseEvent): void {
    event.stopPropagation();
    const ok = window.confirm(`Delete ${node.name}?`);
    if (!ok) {
      return;
    }
    if (node.type === "folder") {
      this.fileCategoryService.ServiceDelete(node.id).subscribe({
        next: (res) => {
          if (res?.isSuccess) {
            this.toastr.typeSuccessRemove();
            this.refreshManager();
          } else {
            this.toastr.typeErrorMessage(res?.errorMessage || "Error");
          }
        },
        error: () => this.toastr.typeErrorRemove(),
      });
      return;
    }
    this.fileContentService.ServiceDelete(node.id).subscribe({
      next: (res) => {
        if (res?.isSuccess) {
          this.toastr.typeSuccessRemove();
          this.refreshManager();
        } else {
          this.toastr.typeErrorMessage(res?.errorMessage || "Error");
        }
      },
      error: () => this.toastr.typeErrorRemove(),
    });
  }

  openUpload(): void {
    if (!this.optionUploadFile) {
      return;
    }
    this.uploadDialogOpen = true;
    this.uploadFileName = "";
    this.uploadGuid = "";
    this.uploadRawResponse = null;
  }

  closeUpload(): void {
    this.uploadDialogOpen = false;
  }

  onUploadSuccess(event: any): void {
    this.uploadRawResponse = event;
    const info = this.extractUploadInfo(event);
    this.uploadGuid = info.guid;
    this.uploadFileName = info.fileName;

    // Legacy behavior: direct upload selection without saving FileContent
    if (this.openDirectUploadView && !this.openDirectUploadSave) {
      const selectedModel: FileManagerNode = {
        id: 0,
        name: info.guid || info.fileName || "uploaded",
        type: "file",
        parentId: this.currentFolderId > 0 ? this.currentFolderId : null,
        downloadLinksrc: "",
        downloadThumbnailSrc: "",
      };
      if (this.opttionSelectFile) {
        this.itemSelected.emit(selectedModel);
      }
      this.uploadDialogOpen = false;
      if (this.isPopupEffective) {
        this.handleOpenFormChange(false);
      }
    }
  }

  createFileFromUpload(): void {
    if (this.openDirectUploadView && !this.openDirectUploadSave) {
      // In this legacy mode we already emitted selection in onUploadSuccess
      this.uploadDialogOpen = false;
      return;
    }
    if (!this.uploadGuid || !this.uploadFileName) {
      this.toastr.typeErrorMessage("Upload response invalid");
      return;
    }
    const model = new FileContentModel();
    model.fileName = this.uploadFileName.trim();
    model.uploadFileGUID = this.uploadGuid;
    model.linkCategoryId =
      this.currentFolderId > 0 ? this.currentFolderId : null;
    this.isUploading = true;
    this.fileContentService.ServiceAdd(model).subscribe({
      next: (res) => {
        this.isUploading = false;
        if (res?.isSuccess) {
          this.toastr.typeSuccessAdd();
          this.closeUpload();
          this.refreshManager();
        } else {
          this.toastr.typeErrorMessage(res?.errorMessage || "Error");
        }
      },
      error: () => {
        this.isUploading = false;
        this.toastr.typeErrorAdd();
      },
    });
  }

  downloadNode(node: FileManagerNode, event?: MouseEvent): void {
    event?.stopPropagation();
    if (node.type === "file" && node.downloadLinksrc) {
      window.open(node.downloadLinksrc, "_blank");
    }
  }

  openPreview(node: FileManagerNode, event: MouseEvent): void {
    event.stopPropagation();
    if (node.type !== "file" || !node.downloadLinksrc) {
      return;
    }
    window.open(node.downloadLinksrc, "_blank");
  }

  toggleSideView(): void {
    this.sideMenuClosed = !this.sideMenuClosed;
  }

  onSortFieldChange(value: string): void {
    this.sortField = value as SortField;
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
  }

  onContextMenu(event: MouseEvent, node: FileManagerNode): void {
    event.preventDefault();
    event.stopPropagation();
    this.contextMenuNode = node;
    this.contextMenuX = event.clientX;
    this.contextMenuY = event.clientY;
    this.contextMenuOpen = true;
  }

  closeContextMenu(): void {
    this.contextMenuOpen = false;
    this.contextMenuNode = null;
  }

  contextAction(
    action: "open" | "download" | "rename" | "delete" | "copy",
  ): void {
    const node = this.contextMenuNode;
    if (!node) {
      return;
    }
    switch (action) {
      case "open":
        node.type === "folder"
          ? this.openFolder(node)
          : this.openPreview(node, new MouseEvent("click"));
        break;
      case "download":
        this.downloadNode(node);
        break;
      case "rename":
        this.askRename(node, new MouseEvent("click"));
        break;
      case "delete":
        this.askDelete(node, new MouseEvent("click"));
        break;
      case "copy":
        if (node.downloadLinksrc) {
          navigator.clipboard.writeText(node.downloadLinksrc).catch(() => {});
        }
        break;
    }
    this.closeContextMenu();
  }

  onDragStart(node: FileManagerNode, event: DragEvent): void {
    this.dragNode = node;
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", `${node.type}:${node.id}`);
    }
  }

  onDragOverFolder(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "move";
    }
  }

  onDropToFolder(targetFolder: FileManagerNode, event: DragEvent): void {
    event.preventDefault();
    if (!this.dragNode || targetFolder.type !== "folder") {
      return;
    }
    if (
      this.dragNode.type === "folder" &&
      this.dragNode.id === targetFolder.id
    ) {
      return;
    }
    this.moveNodeToFolder(this.dragNode, targetFolder.id);
    this.dragNode = null;
  }

  downloadSelected(): void {
    this.selectedNodes
      .filter((x) => x.type === "file" && !!x.downloadLinksrc)
      .forEach((node) => window.open(node.downloadLinksrc, "_blank"));
    this.actionTriggered.emit({
      action: "download",
      nodes: this.selectedNodes,
    });
  }

  async copyFirstLink(): Promise<void> {
    const first = this.selectedNodes.find((x) => !!x.downloadLinksrc);
    if (!first?.downloadLinksrc) {
      return;
    }
    try {
      await navigator.clipboard.writeText(first.downloadLinksrc);
    } catch {
      const input = document.createElement("textarea");
      input.value = first.downloadLinksrc;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }
    this.actionTriggered.emit({ action: "copyLink", nodes: [first] });
  }

  private emitSelectedNodes(): void {
    this.selectedNodesChange.emit(this.selectedNodes);
  }

  private pushHistory(folderId: number): void {
    if (this.suppressHistoryRecord) {
      this.suppressHistoryRecord = false;
      return;
    }
    if (folderId === this.currentFolderId) {
      return;
    }
    if (this.currentFolderId !== null && this.currentFolderId !== undefined) {
      this.historyBack.push(this.currentFolderId);
      if (this.historyBack.length > 100) {
        this.historyBack.shift();
      }
    }
    this.historyForward = [];
  }

  private compareNodes(a: FileManagerNode, b: FileManagerNode): number {
    if (a.type !== b.type) {
      return a.type === "folder" ? -1 : 1;
    }
    let result = 0;
    switch (this.sortField) {
      case "name":
        result = (a.name || "").localeCompare(b.name || "");
        break;
      case "type":
        result = (a.extension || a.type).localeCompare(b.extension || b.type);
        break;
      case "size":
        result = (a.size || 0) - (b.size || 0);
        break;
      case "createdDate":
        result =
          new Date(a.createdDate || 0).getTime() -
          new Date(b.createdDate || 0).getTime();
        break;
      default:
        result = 0;
    }
    return this.sortOrder === "asc" ? result : -result;
  }

  private moveNodeToFolder(
    node: FileManagerNode,
    targetFolderId: number,
  ): void {
    if (node.type === "folder") {
      this.fileCategoryService.ServiceGetOneById(node.id).subscribe({
        next: (res) => {
          if (!res?.isSuccess || !res.item) {
            return;
          }
          res.item.linkParentId = targetFolderId > 0 ? targetFolderId : null;
          this.fileCategoryService.ServiceEdit(res.item).subscribe({
            next: (editRes) => {
              if (editRes?.isSuccess) {
                this.toastr.typeSuccessEdit();
                this.refreshManager();
              } else {
                this.toastr.typeErrorMessage(editRes?.errorMessage || "Error");
              }
            },
            error: () => this.toastr.typeErrorEdit(),
          });
        },
      });
      return;
    }
    this.fileContentService.ServiceGetOneById(node.id).subscribe({
      next: (res) => {
        if (!res?.isSuccess || !res.item) {
          return;
        }
        res.item.linkCategoryId = targetFolderId > 0 ? targetFolderId : null;
        this.fileContentService.ServiceEdit(res.item).subscribe({
          next: (editRes) => {
            if (editRes?.isSuccess) {
              this.toastr.typeSuccessEdit();
              this.refreshManager();
            } else {
              this.toastr.typeErrorMessage(editRes?.errorMessage || "Error");
            }
          },
          error: () => this.toastr.typeErrorEdit(),
        });
      },
    });
  }

  private mapFolder(x: any): FileManagerNode {
    return {
      id: x.id,
      name: x.title,
      type: "folder",
      parentId: x.linkParentId ?? null,
      createdDate: x.createdDate,
      updatedDate: x.updatedDate,
      downloadLinksrc: x.linkMainImageIdSrc,
    };
  }

  private mapFile(x: any): FileManagerNode {
    return {
      id: x.id,
      name: x.fileName,
      type: "file",
      parentId: x.linkCategoryId ?? null,
      extension: x.extension,
      size: x.fileSize,
      createdDate: x.createdDate,
      updatedDate: x.updatedDate,
      downloadLinksrc: x.downloadLinksrc,
      downloadThumbnailSrc: x.downloadThumbnailSrc,
    };
  }

  private rebuildBreadcrumbs(folderId: number): void {
    const list: Array<{ id: number; name: string }> = [{ id: 0, name: "Root" }];
    if (folderId === 0) {
      this.currentFolderName = "Root";
      this.breadcrumbs = list;
      return;
    }
    const chain: FileManagerNode[] = [];
    let cursor = this.findFolderById(folderId);
    while (cursor) {
      chain.unshift(cursor);
      if (!cursor.parentId || cursor.parentId <= 0) {
        break;
      }
      cursor = this.findFolderById(cursor.parentId);
    }
    chain.forEach((x) => list.push({ id: x.id, name: x.name }));
    this.currentFolderName = list[list.length - 1]?.name || "Root";
    this.breadcrumbs = list;
  }

  private findFolderById(id: number): FileManagerNode | null {
    const allLists = Array.from(this.treeMap.values());
    for (const list of allLists) {
      const found = list.find((x) => x.id === id);
      if (found) {
        return found;
      }
    }
    return null;
  }

  private findParentFolder(id: number): FileManagerNode | null {
    const current = this.findFolderById(id);
    if (!current?.parentId || current.parentId <= 0) {
      return null;
    }
    return this.findFolderById(current.parentId);
  }

  private buildSelectionKey(node: FileManagerNode): number {
    return node.type === "folder" ? node.id : node.id * -1;
  }

  private extractUploadInfo(event: any): { guid: string; fileName: string } {
    const body =
      event?.uploadResponse?.body ||
      event?.uploadResponse ||
      event?.body ||
      event;
    const guid =
      body?.item?.uploadFileGUID ||
      body?.item?.fileKey ||
      body?.uploadFileGUID ||
      body?.fileKey ||
      body?.guid ||
      "";
    const fileName =
      body?.item?.fileName ||
      body?.item?.name ||
      body?.fileName ||
      body?.name ||
      "";
    return { guid, fileName };
  }
}
