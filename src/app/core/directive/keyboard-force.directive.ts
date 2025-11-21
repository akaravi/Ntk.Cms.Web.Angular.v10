import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  Renderer2,
} from "@angular/core";
/** Set of locales that should default to RTL directionality. */
const RTL_LANGS = new Set(["fa", "ar", "he", "ps", "ur"]);

type KeyboardLayoutDirection = "ltr" | "rtl";

/** Mapping from English keyboard layout to Persian characters. */
const EN_TO_FA_MAP: Record<string, string> = {
  q: "ض",
  w: "ص",
  e: "ث",
  r: "ق",
  t: "ف",
  y: "غ",
  u: "ع",
  i: "ه",
  o: "خ",
  p: "ح",
  "[": "ج",
  "]": "چ",
  a: "ش",
  s: "س",
  d: "ی",
  f: "ب",
  g: "ل",
  h: "ا",
  j: "ت",
  k: "ن",
  l: "م",
  ";": "ک",
  "'": "گ",
  z: "ظ",
  x: "ط",
  c: "ز",
  v: "ر",
  b: "ذ",
  n: "د",
  m: "پ",
  ",": "و",
  ".": "٫",
  "/": "؟",
  "`": "‍",
  "1": "۱",
  "2": "۲",
  "3": "۳",
  "4": "۴",
  "5": "۵",
  "6": "۶",
  "7": "۷",
  "8": "۸",
  "9": "۹",
  "0": "۰",
};

/** Mapping from Persian layout back to English characters. */
const FA_TO_EN_MAP: Record<string, string> = Object.entries(
  EN_TO_FA_MAP,
).reduce(
  (acc, [en, fa]) => {
    acc[fa] = en;
    return acc;
  },
  {} as Record<string, string>,
);
/** Default bidirectional mappings that can be reused when custom map not set. */
const DEFAULT_MAPPINGS: Record<string, Record<string, string>> = {
  "en-fa": EN_TO_FA_MAP,
  "fa-en": FA_TO_EN_MAP,
};

/** Physical key code to Latin char lookup for fallback scenarios. */
const CODE_TO_LATIN_CHAR: Record<string, string> = {
  KeyQ: "q",
  KeyW: "w",
  KeyE: "e",
  KeyR: "r",
  KeyT: "t",
  KeyY: "y",
  KeyU: "u",
  KeyI: "i",
  KeyO: "o",
  KeyP: "p",
  KeyA: "a",
  KeyS: "s",
  KeyD: "d",
  KeyF: "f",
  KeyG: "g",
  KeyH: "h",
  KeyJ: "j",
  KeyK: "k",
  KeyL: "l",
  KeyZ: "z",
  KeyX: "x",
  KeyC: "c",
  KeyV: "v",
  KeyB: "b",
  KeyN: "n",
  KeyM: "m",
  Digit1: "1",
  Digit2: "2",
  Digit3: "3",
  Digit4: "4",
  Digit5: "5",
  Digit6: "6",
  Digit7: "7",
  Digit8: "8",
  Digit9: "9",
  Digit0: "0",
  Minus: "-",
  Equal: "=",
  BracketLeft: "[",
  BracketRight: "]",
  Backslash: "\\",
  Semicolon: ";",
  Quote: "'",
  Backquote: "`",
  Comma: ",",
  Period: ".",
  Slash: "/",
  Space: " ",
};

/** Shift-modified physical key code to Latin char lookup. */
const SHIFT_CODE_TO_LATIN_CHAR: Record<string, string> = {
  Digit1: "!",
  Digit2: "@",
  Digit3: "#",
  Digit4: "$",
  Digit5: "%",
  Digit6: "^",
  Digit7: "&",
  Digit8: "*",
  Digit9: "(",
  Digit0: ")",
  Minus: "_",
  Equal: "+",
  BracketLeft: "{",
  BracketRight: "}",
  Backslash: "|",
  Semicolon: ":",
  Quote: '"',
  Backquote: "~",
  Comma: "<",
  Period: ">",
  Slash: "?",
};

@Directive({
  selector: "[cmsKeyboardForce]",
  standalone: false,
})
export class KeyboardForceDirective implements OnDestroy {
  /**
   * Target locale (language code) that should be forced while the host input is focused.
   * Defaults to `fa`.
   */
  @Input("cmsKeyboardForce")
  set cmsKeyboardForce(value: string | undefined) {
    this.targetLocale = this.normalizeLocale(value) ?? this.targetLocale;
    this.ensureDefaultSourceLocale();
  }

  /**
   * Optional direction override. When not provided, the directive will infer direction
   * based on a list of RTL languages.
   */
  @Input() cmsKeyboardForceDir?: KeyboardLayoutDirection;

  /**
   * Source layout that user is likely typing with. Used to pick a default mapping.
   * Defaults to `en`.
   */
  @Input()
  set cmsKeyboardForceSource(value: string | undefined) {
    this.sourceLocale = this.normalizeLocale(value) ?? this.sourceLocale;
  }

  /**
   * Custom mapping for converting characters from the source layout to the target one.
   * When provided it overrides built-in mappings.
   */
  @Input()
  set cmsKeyboardForceMap(value: Record<string, string> | undefined) {
    if (value && Object.keys(value).length) {
      this.customMap = this.cloneMapEnabled ? { ...value } : value;
    } else {
      this.customMap = undefined;
    }
  }

  @Input()
  set cmsKeyboardForceInputMode(value: boolean | string | undefined) {
    this.inputModeHintEnabled = this.coerceBoolean(value, true);
  }

  @Input()
  set cmsKeyboardForceIndicator(value: boolean | string | undefined) {
    this.indicatorEnabled = this.coerceBoolean(value, true);
  }

  @Input()
  set cmsKeyboardForceCloneMap(value: boolean | string | undefined) {
    this.cloneMapEnabled = this.coerceBoolean(value, true);
  }

  @Input()
  set cmsKeyboardForceNormalizePaste(value: boolean | string | undefined) {
    this.normalizePasteEnabled = this.coerceBoolean(value, true);
  }

  @Input()
  set cmsKeyboardForceSmartReplace(value: boolean | string | undefined) {
    this.smartReplaceEnabled = this.coerceBoolean(value, true);
  }

  /** Locale that will be forced while the control is focused. */
  private targetLocale: string = "fa";
  /** Locale that user is likely typing with (used for reverse mapping). */
  private sourceLocale?: string;
  /** Original lang attribute of host element before directive changes it. */
  private previousElementLang?: string | null;
  /** Original dir attribute of host element before directive changes it. */
  private previousElementDir?: string | null;
  /** Original inputmode attribute to restore after blur. */
  private previousInputMode?: string | null;
  /** Tracks whether directive is currently active on the element. */
  private active = false;
  /** Prevents recursive input events when directive updates value programmatically. */
  private suppressNextInput = false;
  /** Custom character mapping provided by consumer. */
  private customMap?: Record<string, string>;
  /** Snapshot of modifier keys for the last keydown event. */
  private lastKeyInfo?: KeyboardCaseSnapshot;
  /** Flag for enabling automatic inputmode hints. */
  private inputModeHintEnabled = true;
  /** Flag for toggling visual indicator class/attribute. */
  private indicatorEnabled = true;
  /** Flag for cloning user supplied mapping to avoid outside mutations. */
  private cloneMapEnabled = true;
  /** Flag that decides whether paste/drop text should be normalized. */
  private normalizePasteEnabled = true;
  /** Flag for limiting normalization to the latest inserted character. */
  private smartReplaceEnabled = true;

  /** Builds directive with required DOM references. */
  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
  ) {}

  /** Captures modifier state for the last keydown to inform case conversion. */
  @HostListener("keydown", ["$event"])
  handleKeydown(event: KeyboardEvent): void {
    const isCharacterKey = event.key?.length === 1;
    if (!isCharacterKey) {
      this.lastKeyInfo = undefined;
      return;
    }
    this.lastKeyInfo = {
      shiftKey: event.shiftKey,
      capsLock: event.getModifierState("CapsLock"),
      code: event.code,
    };
  }

  /** Activates the directive when the host element receives focus. */
  @HostListener("focus")
  handleFocus(): void {
    if (this.active) {
      return;
    }
    this.capturePreviousState();
    this.applyLocale();
    this.applyInputModeHint();
    this.toggleIndicator(true);
    this.active = true;
  }

  /** Restores the previous host state once focus is lost. */
  @HostListener("blur")
  handleBlur(): void {
    this.toggleIndicator(false);
    this.restoreInputMode();
    this.restoreState();
  }

  /**
   * Normalizes input events by translating characters from the probable source layout
   * into the configured target locale. Emits synthetic input to keep Angular forms in sync.
   */
  @HostListener("input", ["$event"])
  handleInput(event: InputEvent): void {
    if (this.suppressNextInput) {
      this.suppressNextInput = false;
      this.lastKeyInfo = undefined;
      return;
    }

    if (
      !this.normalizePasteEnabled &&
      (event?.inputType === "insertFromPaste" ||
        event?.inputType === "insertFromDrop")
    ) {
      this.lastKeyInfo = undefined;
      return;
    }

    const host = this.getNativeTextInput();
    if (!host) {
      this.lastKeyInfo = undefined;
      return;
    }

    const originalValue = host.value ?? "";
    const caretPosition = host.selectionStart ?? originalValue.length;
    const caretContext =
      event?.inputType === "insertText" && caretPosition > 0
        ? {
            insertedIndex: caretPosition - 1,
            lastKeyInfo: this.lastKeyInfo,
          }
        : undefined;
    const convertedValue = this.normalizeText(
      originalValue,
      event?.data ?? undefined,
      caretContext,
    );
    this.lastKeyInfo = undefined;

    if (convertedValue === originalValue) {
      return;
    }

    const selectionStart = host.selectionStart ?? convertedValue.length;
    const selectionEnd = host.selectionEnd ?? convertedValue.length;

    this.renderer.setProperty(host, "value", convertedValue);

    requestAnimationFrame(() => {
      host.setSelectionRange(selectionStart, selectionEnd);
    });

    this.suppressNextInput = true;
    host.dispatchEvent(new Event("input", { bubbles: true }));
  }

  /** Ensures the DOM is restored if the directive is destroyed mid-focus. */
  ngOnDestroy(): void {
    this.restoreState(true);
  }

  /** Applies lang/dir attributes that match the enforced locale. */
  private applyLocale(): void {
    const direction = this.resolveDirection(this.targetLocale);
    const host = this.elementRef.nativeElement;

    this.renderer.setAttribute(host, "lang", this.targetLocale);
    this.renderer.setAttribute(host, "dir", direction);
  }

  /**
   * Restores lang/dir/inputmode attributes to their original values.
   * @param force When true the restore happens even if directive is not active.
   */
  private restoreState(force = false): void {
    if (!this.active && !force) {
      return;
    }

    const host = this.elementRef.nativeElement;

    if (this.previousElementLang !== undefined) {
      if (
        this.previousElementLang === null ||
        this.previousElementLang === ""
      ) {
        this.renderer.removeAttribute(host, "lang");
      } else {
        this.renderer.setAttribute(host, "lang", this.previousElementLang);
      }
    }

    if (this.previousElementDir !== undefined) {
      if (this.previousElementDir === null || this.previousElementDir === "") {
        this.renderer.removeAttribute(host, "dir");
      } else {
        this.renderer.setAttribute(host, "dir", this.previousElementDir);
      }
    }

    this.previousElementLang = undefined;
    this.previousElementDir = undefined;
    this.active = false;
  }

  /**
   * Converts the entire value (or latest character) from source layout to target layout.
   * @returns Normalized string ready to be written back into the control.
   */
  private normalizeText(
    value: string,
    recentInput?: string | null,
    caretContext?: CaretNormalizationContext,
  ): string {
    const mapping = this.resolveActiveMap(recentInput ?? undefined);
    if (!mapping) {
      return value;
    }
    if (
      this.smartReplaceEnabled &&
      caretContext &&
      caretContext.insertedIndex >= 0 &&
      caretContext.insertedIndex < value.length
    ) {
      return this.replaceSingleCharacter(
        value,
        caretContext.insertedIndex,
        mapping,
        caretContext,
      );
    }
    return this.replaceCharacters(value, mapping, caretContext);
  }

  /**
   * Replaces every non-target character in the provided string using the given lookup.
   * @returns Fully normalized string.
   */
  private replaceCharacters(
    value: string,
    lookup: Record<string, string>,
    caretContext?: CaretNormalizationContext,
  ): string {
    let result = "";
    for (let index = 0; index < value.length; index++) {
      const char = value[index];
      if (this.isCharAlreadyTarget(char)) {
        result += char;
        continue;
      }
      let mapped = lookup[char] ?? lookup[char.toLowerCase()];
      if (!mapped && caretContext && caretContext.insertedIndex === index) {
        mapped = this.resolveFromCodeFallback(
          lookup,
          caretContext?.lastKeyInfo,
        );
      }
      if (mapped) {
        result += this.matchCase(char, mapped, index, caretContext);
      } else {
        result += char;
      }
    }
    return result;
  }

  /**
   * Resolves the best available mapping considering custom map, declared source,
   * and auto-detection based on the most recent character.
   * @returns Character map to use for normalization or undefined if none apply.
   */
  private resolveActiveMap(
    recentInput?: string,
  ): Record<string, string> | undefined {
    if (this.customMap) {
      return this.customMap;
    }
    if (this.sourceLocale) {
      const directKey = `${this.sourceLocale}-${this.targetLocale}`;
      const directMap = DEFAULT_MAPPINGS[directKey];
      if (directMap) {
        return directMap;
      }
    }

    if (recentInput) {
      const normalized = recentInput.toLowerCase();
      const detected = Object.values(DEFAULT_MAPPINGS).find((map) =>
        Object.prototype.hasOwnProperty.call(map, normalized),
      );
      if (detected) {
        return detected;
      }
    }

    return undefined;
  }

  /**
   * Adjusts replacement casing based on original character and modifier keys.
   * @returns Replacement string with proper casing applied.
   */
  private matchCase(
    source: string,
    replacement: string,
    index: number,
    caretContext?: CaretNormalizationContext,
  ): string {
    if (this.isCaseSensitive(source)) {
      return source === source.toUpperCase()
        ? replacement.toUpperCase()
        : replacement.toLowerCase();
    }

    if (
      caretContext &&
      caretContext.insertedIndex === index &&
      caretContext.lastKeyInfo
    ) {
      const shouldUpper =
        caretContext.lastKeyInfo.shiftKey !== caretContext.lastKeyInfo.capsLock;
      return shouldUpper
        ? replacement.toUpperCase()
        : replacement.toLowerCase();
    }
    return replacement;
  }

  /**
   * Optimized normalization path that only touches the just-inserted character.
   * @returns Updated string if a replacement occurred, otherwise the original value.
   */
  private replaceSingleCharacter(
    value: string,
    index: number,
    lookup: Record<string, string>,
    caretContext?: CaretNormalizationContext,
  ): string {
    const char = value[index];
    if (this.isCharAlreadyTarget(char)) {
      return value;
    }
    let mapped = lookup[char] ?? lookup[char.toLowerCase()];
    if (!mapped) {
      mapped = this.resolveFromCodeFallback(lookup, caretContext?.lastKeyInfo);
    }
    if (!mapped) {
      return value;
    }
    const normalized = this.matchCase(char, mapped, index, caretContext);
    return value.slice(0, index) + normalized + value.slice(index + 1);
  }

  /**
   * Checks whether a character has different lower/upper case forms.
   * @returns True when case conversion is meaningful.
   */
  private isCaseSensitive(char: string): boolean {
    return char.toLowerCase() !== char.toUpperCase();
  }

  /**
   * Resolves the underlying native input/textarea element if available.
   * @returns Host element when it is a textual control, otherwise null.
   */
  private getNativeTextInput():
    | (HTMLInputElement & { value: string })
    | (HTMLTextAreaElement & { value: string })
    | null {
    const host = this.elementRef.nativeElement;
    if (
      host instanceof HTMLInputElement ||
      host instanceof HTMLTextAreaElement
    ) {
      return host;
    }
    return null;
  }

  /**
   * Picks the text direction for the provided locale.
   * @returns `rtl` or `ltr` depending on configuration and locale heuristics.
   */
  private resolveDirection(locale: string): KeyboardLayoutDirection {
    if (this.cmsKeyboardForceDir) {
      return this.cmsKeyboardForceDir;
    }
    const normalized = this.normalizeLocale(locale);
    return normalized && RTL_LANGS.has(normalized) ? "rtl" : "ltr";
  }

  /**
   * Normalizes locale strings to lowercase short codes.
   * @returns Trimmed lowercase locale or undefined when input is empty.
   */
  private normalizeLocale(value?: string): string | undefined {
    const normalized = value?.trim().toLowerCase();
    return normalized ? normalized : undefined;
  }

  /**
   * Stores the current host attributes so they can be restored on blur.
   */
  private capturePreviousState(): void {
    const host = this.elementRef.nativeElement;

    this.previousElementLang = host.getAttribute("lang");
    this.previousElementDir = host.getAttribute("dir");
    this.previousInputMode =
      this.getNativeTextInput()?.getAttribute("inputmode") ?? undefined;
  }

  /**
   * Infers the source locale if the user has not explicitly provided one.
   */
  private ensureDefaultSourceLocale(): void {
    if (this.sourceLocale) {
      return;
    }
    this.sourceLocale = this.targetLocale === "fa" ? "en" : "fa";
  }

  /**
   * Adds an `inputmode` attribute hint so virtual keyboards better match target locale.
   */
  private applyInputModeHint(): void {
    if (!this.inputModeHintEnabled) {
      return;
    }
    const host = this.getNativeTextInput();
    if (!host) {
      return;
    }
    const hint =
      this.targetLocale === "en"
        ? "latin"
        : this.targetLocale === "fa"
          ? "text"
          : (this.previousInputMode ??
            host.getAttribute("inputmode") ??
            undefined);
    if (hint) {
      this.renderer.setAttribute(host, "inputmode", hint);
    }
  }

  /** Restores the original `inputmode` attribute captured on focus. */
  private restoreInputMode(): void {
    if (!this.inputModeHintEnabled) {
      return;
    }
    const host = this.getNativeTextInput();
    if (!host) {
      return;
    }
    if (this.previousInputMode === undefined) {
      return;
    }
    if (this.previousInputMode === null || this.previousInputMode === "") {
      this.renderer.removeAttribute(host, "inputmode");
    } else {
      this.renderer.setAttribute(host, "inputmode", this.previousInputMode);
    }
    this.previousInputMode = undefined;
  }

  /**
   * Adds or removes helper classes/attributes to indicate forced keyboard state.
   */
  private toggleIndicator(active: boolean): void {
    if (!this.indicatorEnabled) {
      return;
    }
    const host = this.elementRef.nativeElement;
    if (active) {
      this.renderer.addClass(host, "cms-keyboard-force--active");
      this.renderer.setAttribute(
        host,
        "data-cms-keyboard-force",
        this.targetLocale,
      );
    } else {
      this.renderer.removeClass(host, "cms-keyboard-force--active");
      this.renderer.removeAttribute(host, "data-cms-keyboard-force");
    }
  }

  /**
   * Coerces boolean/string inputs into actual booleans with a fallback.
   * @returns Parsed boolean result.
   */
  private coerceBoolean(
    value: boolean | string | undefined,
    fallback: boolean,
  ): boolean {
    if (value === null || value === undefined || value === "") {
      return fallback;
    }
    if (typeof value === "string") {
      return value !== "false";
    }
    return value;
  }

  /**
   * Uses the last keydown information to resolve a character when the text value
   * itself is ambiguous (e.g., typing Persian layout while enforcing English).
   * @returns Replacement candidate or undefined when no fallback is available.
   */
  private resolveFromCodeFallback(
    lookup: Record<string, string>,
    keyInfo?: KeyboardCaseSnapshot,
  ): string | undefined {
    if (!keyInfo?.code) {
      return undefined;
    }
    const { code, shiftKey } = keyInfo;
    const baseChar = CODE_TO_LATIN_CHAR[code];
    if (!baseChar) {
      return undefined;
    }
    const shiftChar = SHIFT_CODE_TO_LATIN_CHAR[code];
    const actualChar = shiftKey && shiftChar ? shiftChar : baseChar;

    if (this.targetLocale === "en") {
      return actualChar;
    }

    const mapped =
      lookup[actualChar] ??
      lookup[actualChar.toLowerCase()] ??
      lookup[actualChar.toUpperCase()];
    if (mapped) {
      return mapped;
    }

    if (actualChar !== baseChar) {
      return actualChar;
    }

    const defaultMap = DEFAULT_MAPPINGS[`en-${this.targetLocale}`];
    if (!defaultMap) {
      return undefined;
    }
    return (
      defaultMap[baseChar] ??
      defaultMap[baseChar.toLowerCase()] ??
      defaultMap[baseChar.toUpperCase()]
    );
  }

  /**
   * Detects whether a character already matches the target locale to avoid redundant changes.
   * @returns True when the character should be left untouched.
   */
  private isCharAlreadyTarget(char: string): boolean {
    if (!char) {
      return true;
    }
    if (this.targetLocale === "fa") {
      return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u06F0-\u06F9]/.test(
        char,
      );
    }
    if (this.targetLocale === "en") {
      return char.charCodeAt(0) <= 0x007f;
    }
    return true;
  }
}

interface KeyboardCaseSnapshot {
  shiftKey: boolean;
  capsLock: boolean;
  code?: string;
}

interface CaretNormalizationContext {
  insertedIndex: number;
  lastKeyInfo?: KeyboardCaseSnapshot;
}
