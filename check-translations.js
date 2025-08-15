const fs = require("fs");
const path = require("path");

// Function to check for empty translations
function checkEmptyTranslations() {
  const i18nPath = path.join(__dirname, "src", "assets", "i18n");
  const files = fs
    .readdirSync(i18nPath)
    .filter((file) => file.endsWith(".json"));

  console.log("🔍 Checking for empty translations...\n");

  files.forEach((file) => {
    const filePath = path.join(i18nPath, file);
    const content = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const emptyKeys = [];

    // Find empty translations
    Object.keys(content).forEach((key) => {
      if (
        content[key] === "" ||
        content[key] === null ||
        content[key] === undefined
      ) {
        emptyKeys.push(key);
      }
    });

    if (emptyKeys.length > 0) {
      console.log(`📁 ${file}:`);
      console.log(`   Found ${emptyKeys.length} empty translations:`);
      emptyKeys.forEach((key) => {
        console.log(`   ❌ ${key}`);
      });
      console.log("");
    } else {
      console.log(`✅ ${file}: No empty translations found`);
    }
  });
}

// Function to check for missing translation keys
function checkMissingKeys() {
  const i18nPath = path.join(__dirname, "src", "assets", "i18n");
  const files = fs
    .readdirSync(i18nPath)
    .filter((file) => file.endsWith(".json"));

  if (files.length < 2) {
    console.log("❌ Need at least 2 language files to compare");
    return;
  }

  // Use the first file as reference
  const referenceFile = files[0];
  const referencePath = path.join(i18nPath, referenceFile);
  const referenceContent = JSON.parse(fs.readFileSync(referencePath, "utf8"));
  const referenceKeys = Object.keys(referenceContent);

  console.log(`\n🔍 Comparing other files with ${referenceFile}...\n`);

  files.slice(1).forEach((file) => {
    const filePath = path.join(i18nPath, file);
    const content = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const contentKeys = Object.keys(content);

    const missingKeys = referenceKeys.filter(
      (key) => !contentKeys.includes(key),
    );
    const extraKeys = contentKeys.filter((key) => !referenceKeys.includes(key));

    if (missingKeys.length > 0 || extraKeys.length > 0) {
      console.log(`📁 ${file}:`);
      if (missingKeys.length > 0) {
        console.log(`   Missing keys (${missingKeys.length}):`);
        missingKeys.forEach((key) => console.log(`   ❌ ${key}`));
      }
      if (extraKeys.length > 0) {
        console.log(`   Extra keys (${extraKeys.length}):`);
        extraKeys.forEach((key) => console.log(`   ⚠️  ${key}`));
      }
      console.log("");
    } else {
      console.log(`✅ ${file}: All keys match`);
    }
  });
}

// Function to check ERRORMESSAGE translations specifically
function checkErrorMessages() {
  const i18nPath = path.join(__dirname, "src", "assets", "i18n");
  const files = fs
    .readdirSync(i18nPath)
    .filter((file) => file.endsWith(".json"));

  console.log("\n🔍 Checking ERRORMESSAGE translations...\n");

  files.forEach((file) => {
    const filePath = path.join(i18nPath, file);
    const content = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const errorKeys = Object.keys(content).filter((key) =>
      key.startsWith("ERRORMESSAGE"),
    );
    const emptyErrorKeys = errorKeys.filter(
      (key) =>
        content[key] === "" ||
        content[key] === null ||
        content[key] === undefined,
    );

    if (emptyErrorKeys.length > 0) {
      console.log(`📁 ${file}:`);
      console.log(
        `   Found ${emptyErrorKeys.length} empty ERRORMESSAGE translations:`,
      );
      emptyErrorKeys.forEach((key) => {
        console.log(`   ❌ ${key}`);
      });
      console.log("");
    } else {
      console.log(`✅ ${file}: All ERRORMESSAGE translations are complete`);
    }
  });
}

// Function to generate translation report
function generateTranslationReport() {
  const i18nPath = path.join(__dirname, "src", "assets", "i18n");
  const files = fs
    .readdirSync(i18nPath)
    .filter((file) => file.endsWith(".json"));

  console.log("\n📊 Translation Report:\n");

  const report = {};

  files.forEach((file) => {
    const filePath = path.join(i18nPath, file);
    const content = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const totalKeys = Object.keys(content).length;
    const emptyKeys = Object.keys(content).filter(
      (key) =>
        content[key] === "" ||
        content[key] === null ||
        content[key] === undefined,
    ).length;
    const errorKeys = Object.keys(content).filter((key) =>
      key.startsWith("ERRORMESSAGE"),
    ).length;
    const emptyErrorKeys = Object.keys(content).filter(
      (key) =>
        key.startsWith("ERRORMESSAGE") &&
        (content[key] === "" ||
          content[key] === null ||
          content[key] === undefined),
    ).length;

    report[file] = {
      totalKeys,
      emptyKeys,
      errorKeys,
      emptyErrorKeys,
      completionRate:
        (((totalKeys - emptyKeys) / totalKeys) * 100).toFixed(2) + "%",
      errorCompletionRate:
        (((errorKeys - emptyErrorKeys) / errorKeys) * 100).toFixed(2) + "%",
    };
  });

  // Display report
  Object.keys(report).forEach((file) => {
    const stats = report[file];
    console.log(`📁 ${file}:`);
    console.log(`   Total keys: ${stats.totalKeys}`);
    console.log(`   Empty keys: ${stats.emptyKeys}`);
    console.log(`   ERRORMESSAGE keys: ${stats.errorKeys}`);
    console.log(`   Empty ERRORMESSAGE keys: ${stats.emptyErrorKeys}`);
    console.log(`   Overall completion: ${stats.completionRate}`);
    console.log(`   ERRORMESSAGE completion: ${stats.errorCompletionRate}`);
    console.log("");
  });
}

// Run the checks
try {
  checkEmptyTranslations();
  checkMissingKeys();
  checkErrorMessages();
  generateTranslationReport();
  console.log("🎉 Translation check completed!");
} catch (error) {
  console.error("❌ Error during translation check:", error.message);
}
