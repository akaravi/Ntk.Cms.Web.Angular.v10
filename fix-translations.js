const fs = require("fs");
const path = require("path");

// Function to fix empty translations
function fixEmptyTranslations() {
  const i18nPath = path.join(__dirname, "src", "assets", "i18n");
  const files = fs
    .readdirSync(i18nPath)
    .filter((file) => file.endsWith(".json"));

  console.log("🔧 Fixing empty translations...\n");

  // Define fixes for common empty translations
  const fixes = {
    "ERRORMESSAGE.MESSAGE.typeErrorGetPosition": {
      en: "Error getting position. Please enable GPS.",
      fa: "خطا در دریافت موقعیت. لطفا GPS را فعال کنید.",
      ar: "خطأ في الحصول على الموقع. يرجى تمكين GPS.",
      de: "Fehler beim Abrufen der Position. Bitte GPS aktivieren.",
      es: "Error al obtener la posición. Por favor, active GPS.",
      fr: "Erreur lors de l'obtention de la position. Veuillez activer GPS.",
      ja: "位置の取得エラー。GPSを有効にしてください。",
      tr: "Konum alınırken hata. Lütfen GPS'i etkinleştirin.",
      zh: "获取位置时出错。请启用GPS。",
    },
    "MESSAGE.Specify_the_template": {
      en: "Please specify the template",
      fa: "لطفا قالب را مشخص کنید",
      ar: "يرجى تحديد القالب",
      de: "Bitte geben Sie die Vorlage an",
      es: "Por favor, especifique la plantilla",
      fr: "Veuillez spécifier le modèle",
      ja: "テンプレートを指定してください",
      tr: "Lütfen şablonu belirtin",
      zh: "请指定模板",
    },
    "TITLE.Registered_News": {
      en: "Registered News",
      fa: "اخبار ثبت شده",
      ar: "الأخبار المسجلة",
      de: "Registrierte Nachrichten",
      es: "Noticias Registradas",
      fr: "Nouvelles Enregistrées",
      ja: "登録されたニュース",
      tr: "Kayıtlı Haberler",
      zh: "已注册新闻",
    },
  };

  files.forEach((file) => {
    const filePath = path.join(i18nPath, file);
    const content = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const lang = file.replace(".json", "");
    let fixed = false;

    // Apply fixes
    Object.keys(fixes).forEach((key) => {
      if (
        content[key] === "" ||
        content[key] === null ||
        content[key] === undefined
      ) {
        if (fixes[key][lang]) {
          content[key] = fixes[key][lang];
          fixed = true;
          console.log(`✅ Fixed: ${key} in ${file}`);
        }
      }
    });

    if (fixed) {
      // Write back to file
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2), "utf8");
      console.log(`💾 Updated: ${file}\n`);
    }
  });
}

// Function to add missing keys from reference file
function addMissingKeys() {
  const i18nPath = path.join(__dirname, "src", "assets", "i18n");
  const files = fs
    .readdirSync(i18nPath)
    .filter((file) => file.endsWith(".json"));

  // Use fa.json as reference (most complete)
  const referenceFile = "fa.json";
  const referencePath = path.join(i18nPath, referenceFile);
  const referenceContent = JSON.parse(fs.readFileSync(referencePath, "utf8"));

  console.log(`\n🔧 Adding missing keys from ${referenceFile}...\n`);

  files.forEach((file) => {
    if (file === referenceFile) return;

    const filePath = path.join(i18nPath, file);
    const content = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const lang = file.replace(".json", "");
    let added = false;

    // Find missing keys
    Object.keys(referenceContent).forEach((key) => {
      if (!content.hasOwnProperty(key)) {
        // Add with a placeholder that indicates it needs translation
        content[key] = `[${lang.toUpperCase()}] ${referenceContent[key]}`;
        added = true;
        console.log(`➕ Added: ${key} to ${file}`);
      }
    });

    if (added) {
      // Write back to file
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2), "utf8");
      console.log(`💾 Updated: ${file}\n`);
    }
  });
}

// Function to validate translations
function validateTranslations() {
  const i18nPath = path.join(__dirname, "src", "assets", "i18n");
  const files = fs
    .readdirSync(i18nPath)
    .filter((file) => file.endsWith(".json"));

  console.log("\n🔍 Validating translations...\n");

  files.forEach((file) => {
    const filePath = path.join(i18nPath, file);
    const content = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const emptyKeys = Object.keys(content).filter(
      (key) =>
        content[key] === "" ||
        content[key] === null ||
        content[key] === undefined,
    );
    const placeholderKeys = Object.keys(content).filter(
      (key) =>
        content[key] &&
        typeof content[key] === "string" &&
        content[key].startsWith("[") &&
        content[key].includes("]"),
    );

    if (emptyKeys.length > 0) {
      console.log(
        `⚠️  ${file}: ${emptyKeys.length} empty translations remaining`,
      );
    }

    if (placeholderKeys.length > 0) {
      console.log(
        `📝 ${file}: ${placeholderKeys.length} translations need manual review`,
      );
    }

    if (emptyKeys.length === 0 && placeholderKeys.length === 0) {
      console.log(`✅ ${file}: All translations are complete`);
    }
  });
}

// Run the fixes
try {
  fixEmptyTranslations();
  addMissingKeys();
  validateTranslations();
  console.log("\n🎉 Translation fixes completed!");
  console.log("\n📋 Next steps:");
  console.log("1. Review placeholder translations (marked with [LANG])");
  console.log("2. Translate them to appropriate languages");
  console.log("3. Run check-translations.js again to verify");
} catch (error) {
  console.error("❌ Error during translation fixes:", error.message);
}
