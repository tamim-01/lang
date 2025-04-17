import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const [sourcePath, langCode] = process.argv.slice(2);

if (!sourcePath || !langCode) {
  console.error("❌ Usage: node add-lang.mjs <source-path> <lang-code>");
  process.exit(1);
}

const localesDir = path.resolve(__dirname, "../src/locales");
const destPath = path.join(localesDir, `${langCode}.json`);
const translationsFile = path.resolve(__dirname, "../src/locales/languages.ts");

try {
  try {
    await fs.access(destPath);
    console.error(`❌ ${langCode}.json already exists in /locales.`);
    process.exit(1);
  } catch {}

  await fs.copyFile(sourcePath, destPath);
  console.log(`✅ Copied ${sourcePath} → ${destPath}`);

  let fileContent = await fs.readFile(translationsFile, "utf8");
  const importLine = `import ${langCode} from "./${langCode}.json";`;

  if (!fileContent.includes(importLine)) {
    fileContent = importLine + "\n" + fileContent;
  }

  const mapRegex = /const languages = {\s*([\s\S]*?)\s*} as const;/m;
  const match = fileContent.match(mapRegex);

  if (match) {
    const currentMap = match[1].trim();
    const updatedMap = currentMap + `\n  ${langCode} ,`;
    fileContent = fileContent.replace(
      mapRegex,
      `const languages = {\n  ${updatedMap}\n} as const;`
    );
    await fs.writeFile(translationsFile, fileContent);
    console.log(`✅ Updated useTranslate.tsx with '${langCode}'`);
  } else {
    console.warn("⚠️ Could not find 'languages' object to update.");
  }
} catch (err) {
  console.error("❌ Error:", err.message);
  process.exit(1);
}
