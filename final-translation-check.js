const fs = require("fs");
const path = require("path");

// Function to perform comprehensive translation check
function comprehensiveTranslationCheck() {
  const i18nPath = path.join(__dirname, "src", "assets", "i18n");
  const files = fs
    .readdirSync(i18nPath)
    .filter((file) => file.endsWith(".json"));

  console.log("🔍 Comprehensive Translation Check\n");
  console.log("=" .repeat(60));

  const results = {};

  // Analyze each file
  files.forEach((file) => {
    const filePath = path.join(i18nPath, file);
    const content = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const lang = file.replace(".json", "");

    const totalKeys = Object.keys(content).length;
    const emptyKeys = Object.keys(content).filter(
      (key) =>
        content[key] === "" ||
        content[key] === null ||
        content[key] === undefined,
    );
    const errorKeys = Object.keys(content).filter((key) =>
      key.startsWith("ERRORMESSAGE"),
    );
    const emptyErrorKeys = errorKeys.filter(
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

    results[lang] = {
      file,
      totalKeys,
      emptyKeys: emptyKeys.length,
      errorKeys: errorKeys.length,
      emptyErrorKeys: emptyErrorKeys.length,
      placeholderKeys: placeholderKeys.length,
      completionRate: ((totalKeys - emptyKeys.length) / totalKeys * 100).toFixed(2),
      errorCompletionRate: ((errorKeys.length - emptyErrorKeys.length) / errorKeys.length * 100).toFixed(2),
      status: emptyKeys.length === 0 ? "✅ Complete" : "⚠️ Incomplete",
    };
  });

  // Display results
  console.log("\n📊 Translation Status Summary:\n");
  console.log("Language".padEnd(12) + "Total".padEnd(8) + "Empty".padEnd(8) + "ERRORMESSAGE".padEnd(15) + "Placeholders".padEnd(15) + "Completion".padEnd(12) + "Status");
  console.log("-".repeat(80));

  Object.keys(results).forEach((lang) => {
    const result = results[lang];
    console.log(
      lang.padEnd(12) +
        result.totalKeys.toString().padEnd(8) +
        result.emptyKeys.toString().padEnd(8) +
        result.errorKeys.toString().padEnd(15) +
        result.placeholderKeys.toString().padEnd(15) +
        result.completionRate + "%".padEnd(12) +
        result.status
    );
  });

  // Detailed analysis
  console.log("\n" + "=" .repeat(60));
  console.log("🔍 Detailed Analysis:\n");

  Object.keys(results).forEach((lang) => {
    const result = results[lang];
    console.log(`📁 ${result.file}:`);
    console.log(`   Total keys: ${result.totalKeys}`);
    console.log(`   Empty keys: ${result.emptyKeys}`);
    console.log(`   ERRORMESSAGE keys: ${result.errorKeys}`);
    console.log(`   Empty ERRORMESSAGE: ${result.emptyErrorKeys}`);
    console.log(`   Placeholder keys: ${result.placeholderKeys}`);
    console.log(`   Overall completion: ${result.completionRate}%`);
    console.log(`   ERRORMESSAGE completion: ${result.errorCompletionRate}%`);
    console.log(`   Status: ${result.status}`);
    console.log("");
  });

  // Recommendations
  console.log("=" .repeat(60));
  console.log("💡 Recommendations:\n");

  const incompleteFiles = Object.keys(results).filter(
    (lang) => results[lang].emptyKeys > 0
  );
  const filesWithPlaceholders = Object.keys(results).filter(
    (lang) => results[lang].placeholderKeys > 0
  );

  if (incompleteFiles.length === 0) {
    console.log("✅ All translation files are complete!");
  } else {
    console.log(`⚠️  ${incompleteFiles.length} files have empty translations:`);
    incompleteFiles.forEach((lang) => {
      console.log(`   - ${results[lang].file}: ${results[lang].emptyKeys} empty keys`);
    });
  }

  if (filesWithPlaceholders.length > 0) {
    console.log(`\n📝 ${filesWithPlaceholders.length} files have placeholder translations:`);
    filesWithPlaceholders.forEach((lang) => {
      console.log(`   - ${results[lang].file}: ${results[lang].placeholderKeys} placeholders`);
    });
    console.log("\n   These need manual translation review.");
  }

  // Overall statistics
  const totalKeys = Object.values(results).reduce((sum, r) => sum + r.totalKeys, 0);
  const totalEmpty = Object.values(results).reduce((sum, r) => sum + r.emptyKeys, 0);
  const totalErrorKeys = Object.values(results).reduce((sum, r) => sum + r.errorKeys, 0);
  const totalEmptyError = Object.values(results).reduce((sum, r) => sum + r.emptyErrorKeys, 0);

  console.log("\n" + "=" .repeat(60));
  console.log("📈 Overall Statistics:\n");
  console.log(`Total translation keys: ${totalKeys}`);
  console.log(`Total empty keys: ${totalEmpty}`);
  console.log(`Total ERRORMESSAGE keys: ${totalErrorKeys}`);
  console.log(`Total empty ERRORMESSAGE keys: ${totalEmptyError}`);
  console.log(`Overall completion rate: ${((totalKeys - totalEmpty) / totalKeys * 100).toFixed(2)}%`);
  console.log(`ERRORMESSAGE completion rate: ${((totalErrorKeys - totalEmptyError) / totalErrorKeys * 100).toFixed(2)}%`);

  return results;
}

// Function to check for specific issues
function checkSpecificIssues() {
  const i18nPath = path.join(__dirname, "src", "assets", "i18n");
  const files = fs
    .readdirSync(i18nPath)
    .filter((file) => file.endsWith(".json"));

  console.log("\n" + "=" .repeat(60));
  console.log("🔍 Specific Issues Check:\n");

  // Check for common problematic patterns
  files.forEach((file) => {
    const filePath = path.join(i18nPath, file);
    const content = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const lang = file.replace(".json", "");

    const issues = [];

    // Check for very long translations (potential issues)
    Object.keys(content).forEach((key) => {
      if (content[key] && typeof content[key] === "string" && content[key].length > 200) {
        issues.push(`Very long translation: ${key} (${content[key].length} chars)`);
      }
    });

    // Check for translations that might be objects
    Object.keys(content).forEach((key) => {
      if (content[key] && typeof content[key] === "object") {
        issues.push(`Object instead of string: ${key}`);
      }
    });

    if (issues.length > 0) {
      console.log(`📁 ${file}:`);
      issues.forEach((issue) => console.log(`   ⚠️  ${issue}`));
      console.log("");
    }
  });
}

// Function to generate improvement suggestions
function generateSuggestions(results) {
  console.log("=" .repeat(60));
  console.log("💡 Improvement Suggestions:\n");

  const suggestions = [];

  // Check for languages with low completion rates
  Object.keys(results).forEach((lang) => {
    const result = results[lang];
    if (parseFloat(result.completionRate) < 95) {
      suggestions.push(`Prioritize completing ${lang} translations (${result.completionRate}% complete)`);
    }
  });

  // Check for languages with many placeholders
  Object.keys(results).forEach((lang) => {
    const result = results[lang];
    if (result.placeholderKeys > 10) {
      suggestions.push(`Review and translate placeholder keys in ${lang} (${result.placeholderKeys} placeholders)`);
    }
  });

  // Check for ERRORMESSAGE completion
  Object.keys(results).forEach((lang) => {
    const result = results[lang];
    if (parseFloat(result.errorCompletionRate) < 100) {
      suggestions.push(`Complete ERRORMESSAGE translations in ${lang} (${result.errorCompletionRate}% complete)`);
    }
  });

  if (suggestions.length === 0) {
    console.log("✅ All translations are in good condition!");
  } else {
    suggestions.forEach((suggestion, index) => {
      console.log(`${index + 1}. ${suggestion}`);
    });
  }
}

// Main execution
try {
  const results = comprehensiveTranslationCheck();
  checkSpecificIssues();
  generateSuggestions(results);

  console.log("\n" + "=" .repeat(60));
  console.log("🎉 Comprehensive translation check completed!");
  console.log("\n📋 Next steps:");
  console.log("1. Review any files with empty translations");
  console.log("2. Translate placeholder keys (marked with [LANG])");
  console.log("3. Run this script again to verify improvements");
} catch (error) {
  console.error("❌ Error during comprehensive check:", error.message);
}
