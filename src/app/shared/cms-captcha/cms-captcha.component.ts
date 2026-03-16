import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { CaptchaModel, CoreAuthV3Service } from "ntk-cms-api";

@Component({
  selector: "app-cms-captcha",
  templateUrl: "./cms-captcha.component.html",
  styleUrls: ["./cms-captcha.component.scss"],
  standalone: false,
})
export class CmsCaptchaComponent implements OnInit, OnChanges, OnDestroy {
  //[(model)]
  @Input() set model(val: CaptchaModel) {
    if (val) {
      this.captchaModel = val;
      this.removeInputOTP++;
    }
  }
  @Output() modelChange: EventEmitter<CaptchaModel> =
    new EventEmitter<CaptchaModel>();
  //[(model)]

  @Input() config: any;
  /** هر بار مقدار این ورودی تغییر کند، کپچا دوباره از سرور خوانده می‌شود (برای سازگاری با onCaptchaOrder قدیمی). */
  @Input() refreshTrigger: number | string | null = null;

  @Output() captchaKeyChange = new EventEmitter<string>();
  @Output() codeChange = new EventEmitter<string>();
  removeInputOTP: number = 0;
  captchaModel: CaptchaModel = new CaptchaModel();
  private autoReloadCount = 0;
  private autoReloadTimerId: any;

  constructor(private coreAuthService: CoreAuthV3Service) {}
  // تنظیم پیش‌فرض برای ورودی عددی کپچا (۵ رقم، ظاهر مدرن و خوانا)
  otpConfig = {
    allowNumbersOnly: true,
    length: 5,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: "",
    inputStyles: {
      width: "44px",
      height: "44px",
      margin: "1px",
    },
  };
  ngOnInit(): void {
    this.loadCaptcha();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["refreshTrigger"] && !changes["refreshTrigger"].firstChange) {
      this.loadCaptcha();
    }
  }

  ngOnDestroy(): void {
    if (this.autoReloadTimerId) {
      clearTimeout(this.autoReloadTimerId);
    }
  }

  private loadCaptcha(): void {
    this.removeInputOTP++;
    this.coreAuthService.ServiceCaptcha().subscribe({
      next: (ret) => {
        if (ret && ret.isSuccess && ret.item) {
          this.captchaModel = ret.item;
          this.modelChange.emit(ret.item);
          this.captchaKeyChange.emit(this.captchaModel.key);

          // زمان انقضای کپچا را محاسبه و رفرش خودکار تنظیم می‌کنیم
          if (this.autoReloadCount < 10 && this.captchaModel.expire) {
            const start = new Date().getTime();
            const end = new Date(this.captchaModel.expire).getTime();
            const diffMs = end - start;
            if (diffMs > 1000) {
              if (this.autoReloadTimerId) {
                clearTimeout(this.autoReloadTimerId);
              }
              this.autoReloadTimerId = setTimeout(() => {
                this.autoReloadCount += 1;
                this.loadCaptcha();
              }, diffMs);
            }
          }
        }
      },
      error: () => {
        this.captchaModel = new CaptchaModel();
        this.captchaKeyChange.emit("");
      },
    });
  }

  onRefresh(): void {
    this.loadCaptcha();
  }

  onInputChange(code: string): void {
    this.codeChange.emit(code);
  }
}
