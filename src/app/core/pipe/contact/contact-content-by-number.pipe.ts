import { Pipe, PipeTransform } from "@angular/core";
import { ContactContentService } from "ntk-cms-api";
import { Observable, catchError, map, of } from "rxjs";

@Pipe({
  name: "contactContentByNumber",
  standalone: false,
})
export class ContactContentByNumberPipe implements PipeTransform {
  constructor(private service: ContactContentService) {}

  transform(value: string | null | undefined): Observable<string> {
    if (!value || value.trim().length === 0) {
      return of("");
    }

    const phoneNumber = value.trim();

    return this.service.ServiceFindByNumber(phoneNumber).pipe(
      map((response) => {
        if (!response?.isSuccess) {
          return phoneNumber;
        }

        const contacts = [];

        if (response.item) {
          contacts.push(response.item);
        }

        if (Array.isArray(response.listItems)) {
          contacts.push(...response.listItems);
        }

        const names = contacts
          .map((contact) => {
            if (!contact) {
              return "";
            }
            const fullName = [contact.firstName, contact.lastName]
              .filter((name) => !!name && name.trim().length > 0)
              .join(" ")
              .trim();

            if (fullName.length > 0) {
              return fullName;
            }

            if (contact.title && contact.title.trim().length > 0) {
              return contact.title.trim();
            }

            return "";
          })
          .filter((name) => name.length > 0);

        if (names.length > 0) {
          // نمایش فهرست نام‌ها به صورت جداشده با |
          return phoneNumber + ":" + names.join(" | ");
        }

        return phoneNumber;
      }),
      catchError(() => of(phoneNumber)),
    );
  }
}
