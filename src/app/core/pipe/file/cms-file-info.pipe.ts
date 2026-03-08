import { Pipe, PipeTransform } from "@angular/core";
import { FileContentService } from "ntk-cms-api";
import { Observable, catchError, map, of } from "rxjs";

export interface CmsFileInfoResult {
  fileName: string;
  downloadLink: string;
  fileSizeFormatted: string;
}

function formatFileSize(bytes: number): string {
  if (bytes == null || bytes <= 0 || isNaN(bytes)) return "";
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  if (mb < 1024) return `${mb.toFixed(1)} MB`;
  const gb = mb / 1024;
  return `${gb.toFixed(1)} GB`;
}

@Pipe({
  name: "cmsfileinfo",
  standalone: false,
})
export class CmsFileInfoPipe implements PipeTransform {
  constructor(public service: FileContentService) {}

  /**
   * @param value شناسه فایل (FileContentId)
   * @returns Observable با نام فایل، آدرس دانلود و سایز فرمت‌شده
   */
  transform(value: number): Observable<CmsFileInfoResult> {
    if (!value || value <= 0) {
      return of({ fileName: "", downloadLink: "", fileSizeFormatted: "" });
    }

    return this.service.ServiceGetOneById(value, 1000000).pipe(
      map((ret) => {
        let fileName = "";
        let downloadLink = "";
        let fileSizeFormatted = "";
        if (ret.isSuccess && ret.item) {
          if (ret.item.fileName && ret.item.fileName.length > 0) {
            fileName = ret.item.fileName;
          }
          if (ret.item.downloadLinksrc && ret.item.downloadLinksrc.length > 0) {
            downloadLink = ret.item.downloadLinksrc;
          }
          if (ret.item.fileSize != null && ret.item.fileSize > 0) {
            fileSizeFormatted = formatFileSize(ret.item.fileSize);
          }
        }
        if (fileName.length === 0) fileName = value.toString();
        return { fileName, downloadLink, fileSizeFormatted };
      }),
      catchError(() =>
        of({
          fileName: value.toString(),
          downloadLink: "",
          fileSizeFormatted: "",
        }),
      ),
    );
  }
}
