import {
  TKeysOfContent,
  TLanguages,
  getNestedValue,
} from "@/hooks/useTranslation";
import languages from "@/locales/languages";
function getTranslation(
  lang: TLanguages,
  variables: Record<TLanguages, Record<string, string>>
): (key: TKeysOfContent) => string {
  const translate = (key: TKeysOfContent) => {
    const value =
      getNestedValue(languages[lang], key) ??
      getNestedValue(languages["en"], key) ??
      key;

    return value
      .split(" ")
      .map((c) => {
        const variable = c.match(/^\[(\D+)\]$/);
        if (variable) {
          return c.replace(/^\[(\D+)\]$/, variables[lang][variable[1]]);
        }
        return c;
      })
      .join(" ");
  };
  return translate;
}

export default getTranslation;
