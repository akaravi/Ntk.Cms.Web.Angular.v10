import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import {
  ClauseTypeEnum,
  ContactContentModel,
  ContactContentService,
  CoreEnumService,
  ErrorExceptionResult,
  FilterDataModel,
  FilterModel,
} from "ntk-cms-api";
import { PublicHelper } from "src/app/core/helpers/publicHelper";
import { CmsToastrService } from "src/app/core/services/cmsToastr.service";

@Component({
  selector: "app-cms-contact-content-drop-list",
  templateUrl: "./cms-contact-content-drop-list.component.html",
  styleUrls: ["./cms-contact-content-drop-list.component.scss"],
  standalone: false,
})
export class CmsContactContentDropListComponent implements OnInit {
  static nextId = 0;
  id = ++CmsContactContentDropListComponent.nextId;
  constructorInfoAreaId = this.constructor.name;
  constructor(
    public coreEnumService: CoreEnumService,
    public categoryService: ContactContentService,
    private cdr: ChangeDetectorRef,
    public publicHelper: PublicHelper,
    public translate: TranslateService,
    private cmsToastrService: CmsToastrService,
  ) {
    this.publicHelper.processService.cdr = this.cdr;
  }
  /**DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD */
  items = ["Carrots", "Tomatoes", "Onions", "Apples", "Avocados"];
  basket: ContactContentModel[] = [];
  allListItems: ContactContentModel[] = []; // تمام آیتم‌های اولیه (بدون فیلتر)
  allBasketItems: ContactContentModel[] = []; // تمام آیتم‌های basket (بدون فیلتر)
  searchTermList: string = ""; // جستجو برای لیست اولیه
  searchTermBasket: string = ""; // جستجو برای لیست انتخاب شده

  // لیست‌های فیلتر شده بر اساس جستجو
  get filteredListItems(): ContactContentModel[] {
    if (!this.searchTermList || this.searchTermList.trim() === "") {
      return this.allListItems;
    }
    const term = this.searchTermList.toLowerCase().trim();
    return this.allListItems.filter((item) => {
      const title = (item.title ?? "").toLowerCase();
      const firstName = (item.firstName ?? "").toLowerCase();
      const lastName = (item.lastName ?? "").toLowerCase();
      return (
        title.includes(term) ||
        firstName.includes(term) ||
        lastName.includes(term)
      );
    });
  }

  get filteredBasketItems(): ContactContentModel[] {
    if (!this.searchTermBasket || this.searchTermBasket.trim() === "") {
      return this.allBasketItems;
    }
    const term = this.searchTermBasket.toLowerCase().trim();
    return this.allBasketItems.filter((item) => {
      const title = (item.title ?? "").toLowerCase();
      const firstName = (item.firstName ?? "").toLowerCase();
      const lastName = (item.lastName ?? "").toLowerCase();
      return (
        title.includes(term) ||
        firstName.includes(term) ||
        lastName.includes(term)
      );
    });
  }

  // متد برای highlight کردن متن در لیست اولیه
  highlightTextList(text: string): string {
    if (!this.searchTermList || this.searchTermList.trim() === "" || !text) {
      return text || "";
    }
    const term = this.searchTermList.trim();
    const regex = new RegExp(`(${this.escapeRegExp(term)})`, "gi");
    return text.replace(regex, '<mark class="highlight-search">$1</mark>');
  }

  // متد برای highlight کردن متن در لیست انتخاب شده
  highlightTextBasket(text: string): string {
    if (
      !this.searchTermBasket ||
      this.searchTermBasket.trim() === "" ||
      !text
    ) {
      return text || "";
    }
    const term = this.searchTermBasket.trim();
    const regex = new RegExp(`(${this.escapeRegExp(term)})`, "gi");
    return text.replace(regex, '<mark class="highlight-search">$1</mark>');
  }

  // متد برای escape کردن کاراکترهای خاص در regex
  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  // متد برای گرفتن متن کامل یک آیتم
  getItemFullText(item: ContactContentModel): string {
    return (
      (item.title ?? "") +
      " " +
      (item.firstName ?? "") +
      " " +
      (item.lastName ?? "")
    )
      .replace(/\s+/g, " ")
      .trim();
  }

  drop(event: CdkDragDrop<ContactContentModel[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      const item = event.previousContainer.data[
        event.previousIndex
      ] as ContactContentModel;

      // بررسی وضعیت قبل از انتقال
      const wasInAllListItems = this.allListItems.some(
        (el) => el.id === item.id,
      );
      const wasInAllBasketItems = this.allBasketItems.some(
        (el) => el.id === item.id,
      );

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      // همگام‌سازی با allListItems و allBasketItems
      if (wasInAllListItems && !wasInAllBasketItems) {
        // انتقال از لیست اولیه به basket
        const indexInAll = this.allListItems.findIndex(
          (el) => el.id === item.id,
        );
        if (indexInAll !== -1) {
          this.allListItems.splice(indexInAll, 1);
          this.allBasketItems.push(item);
          if (!this.basket.some((el) => el.id === item.id)) {
            this.basket.push(item);
          }
          this.dataModelResult.listItems = this.allListItems.filter(
            (el) => !this.fieldsStatus.get(el.id),
          );
        }
        if (!this.fieldsStatus.get(item.id)) {
          this.fieldsStatus.set(item.id, true);
          if (!this.dataModelSelect.some((el) => el.id === item.id)) {
            this.dataModelSelect.push(item);
          }
          this.optionSelectAdded.emit(item);
          this.optionChange.emit(this.dataModelSelect);
        }
      } else if (wasInAllBasketItems && !wasInAllListItems) {
        // انتقال از basket به لیست اولیه
        const indexInAll = this.allBasketItems.findIndex(
          (el) => el.id === item.id,
        );
        if (indexInAll !== -1) {
          this.allBasketItems.splice(indexInAll, 1);
          this.allListItems.push(item);
          const basketIndex = this.basket.findIndex((el) => el.id === item.id);
          if (basketIndex !== -1) {
            this.basket.splice(basketIndex, 1);
          }
          this.dataModelResult.listItems = this.allListItems.filter(
            (el) => !this.fieldsStatus.get(el.id),
          );
        }
        if (this.fieldsStatus.get(item.id)) {
          this.fieldsStatus.set(item.id, false);
          const selectIndex = this.dataModelSelect.findIndex(
            (el) => el.id === item.id,
          );
          if (selectIndex !== -1) {
            this.dataModelSelect.splice(selectIndex, 1);
          }
          this.optionSelectRemoved.emit(item);
          this.optionChange.emit(this.dataModelSelect);
        }
      }
    }
  }

  addToBasket(item: ContactContentModel): void {
    const index = this.allListItems.indexOf(item);
    if (index !== -1) {
      // اضافه کردن به basket
      this.basket.push(item);
      this.allBasketItems.push(item);
      // حذف از لیست اولیه
      this.allListItems.splice(index, 1);
      this.dataModelResult.listItems = this.allListItems.filter(
        (el) => !this.fieldsStatus.get(el.id),
      );
      // همگام‌سازی با dataModelSelect
      this.fieldsStatus.set(item.id, true);
      this.dataModelSelect.push(item);
      // emit events
      this.optionSelectAdded.emit(item);
      this.optionChange.emit(this.dataModelSelect);
    }
  }

  removeFromBasket(item: ContactContentModel): void {
    const index = this.allBasketItems.indexOf(item);
    if (index !== -1) {
      // اضافه کردن به لیست اولیه
      this.allListItems.push(item);
      this.dataModelResult.listItems = this.allListItems.filter(
        (el) => !this.fieldsStatus.get(el.id),
      );
      // حذف از basket
      this.basket.splice(this.basket.indexOf(item), 1);
      this.allBasketItems.splice(index, 1);
      // همگام‌سازی با dataModelSelect
      this.fieldsStatus.set(item.id, false);
      const selectIndex = this.dataModelSelect.indexOf(item);
      if (selectIndex !== -1) {
        this.dataModelSelect.splice(selectIndex, 1);
      }
      // emit events
      this.optionSelectRemoved.emit(item);
      this.optionChange.emit(this.dataModelSelect);
    }
  }
  /**DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD */
  dataModelResult: ErrorExceptionResult<ContactContentModel> =
    new ErrorExceptionResult<ContactContentModel>();
  dataModelSelect: ContactContentModel[] = [];
  dataIdsSelect: string[] = [];

  formControl = new FormControl();
  fieldsStatus: Map<string, boolean> = new Map<string, boolean>();
  linkCategoryId = "";
  @Input() optionDisabled = false;
  @Input() optionSelectFirstItem = false;
  @Input() optionPlaceholder = "";
  @Input() set optionrLinkCategoryId(id: string) {
    this.linkCategoryId = id;
    this.DataGetAll();
  }
  @Output() optionChange = new EventEmitter<ContactContentModel[]>();
  @Output() optionSelectAdded = new EventEmitter();
  @Output() optionSelectRemoved = new EventEmitter();
  @Input() optionReload = () => this.onActionButtonReload();
  @Input() set optionSelectForce(x: string[] | ContactContentModel[]) {
    this.onActionSelectForce(x);
  }

  ngOnInit(): void {
    this.DataGetAll();
  }

  DataGetAll(): void {
    const filteModelContent = new FilterModel();
    filteModelContent.rowPerPage = 50;
    filteModelContent.accessLoad = true;

    const pName = this.constructor.name + "main";
    this.translate
      .get("MESSAGE.Receiving_information")
      .subscribe((str: string) => {
        this.publicHelper.processService.processStart(
          pName,
          str,
          this.constructorInfoAreaId,
        );
      });

    /*filter CLone*/
    const filterModel = JSON.parse(JSON.stringify(filteModelContent));
    /*filter CLone*/
    if (this.linkCategoryId?.length > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = "ContentCategores";
      filter.propertyAnyName = "LinkCategoryId";
      filter.value = this.linkCategoryId;
      filterModel.filters.push(filter);
    }
    if (this.dataIdsSelect?.length > 0) {
      const filter = new FilterDataModel();
      filter.propertyName = "Id";
      filter.values = this.dataIdsSelect;
      filter.clauseType = ClauseTypeEnum.Or;
      filterModel.filters.push(filter);
    }
    this.categoryService.ServiceGetAll(filterModel).subscribe({
      next: (ret) => {
        if (ret.isSuccess) {
          this.dataModelResult = ret;
          // Reset تمام لیست‌ها
          this.dataModelSelect = [];
          this.basket = [];
          this.allListItems = [];
          this.allBasketItems = [];
          this.fieldsStatus.clear();

          // تنظیم fieldsStatus برای همه آیتم‌ها
          this.dataModelResult.listItems.forEach((el) =>
            this.fieldsStatus.set(el.id, false),
          );
          this.dataIdsSelect.forEach((el) => this.fieldsStatus.set(el, true));

          // اضافه کردن آیتم‌های انتخاب شده به dataModelSelect
          this.dataModelResult.listItems.forEach((el) => {
            if (this.fieldsStatus.get(el.id)) {
              this.dataModelSelect.push(el);
            }
          });

          // همگام‌سازی basket با dataModelSelect
          this.basket = [...this.dataModelSelect];

          // حذف آیتم‌های انتخاب شده از لیست اولیه
          this.dataModelResult.listItems =
            this.dataModelResult.listItems.filter(
              (el) => !this.fieldsStatus.get(el.id),
            );

          // به‌روزرسانی لیست‌های اصلی برای جستجو
          this.allListItems = [...this.dataModelResult.listItems];
          this.allBasketItems = [...this.basket];
        } else {
          this.cmsToastrService.typeErrorMessage(ret.errorMessage);
        }
        this.publicHelper.processService.processStop(pName);
      },
      error: (er) => {
        this.cmsToastrService.typeError(er);
        this.publicHelper.processService.processStop(pName, false);
      },
    });
  }
  onActionSelect(value: ContactContentModel): void {
    if (this.fieldsStatus.get(value.id)) {
      this.fieldsStatus.set(value.id, false);
      this.optionSelectRemoved.emit(value);
      this.dataModelSelect.splice(this.dataModelSelect.indexOf(value), 1);
    } else {
      this.fieldsStatus.set(value.id, true);
      this.optionSelectAdded.emit(value);
      this.dataModelSelect.push(value);
    }
    this.optionChange.emit(this.dataModelSelect);
  }

  onActionSelectForce(ids: string[] | ContactContentModel[]): void {
    if (typeof ids === typeof Array(String)) {
      ids.forEach((element) => {
        this.dataIdsSelect.push(element);
      });
    } else if (typeof ids === typeof Array(ContactContentModel)) {
      ids.forEach((element) => {
        this.dataIdsSelect.push(element.id);
      });
    }
    this.dataIdsSelect.forEach((el) => this.fieldsStatus.set(el, true));
  }

  onActionButtonReload(): void {
    // this.dataModelSelect = new ContactContentModel();
    this.DataGetAll();
  }
}
