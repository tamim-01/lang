import {
  TKeysOfContent,
  TLanguages,
  getNestedValue,
} from "@/hooks/useTranslation";
import languages from "@/locales/languages";

function getTranslation(lang: TLanguages): (key: TKeysOfContent) => string {
  const translate = (key: TKeysOfContent) => {
    return (
      getNestedValue(languages[lang], key) ??
      getNestedValue(languages["en"], key) ??
      key
    );
  };
  return translate;
}

export default getTranslation;
