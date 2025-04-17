import { useCallback } from "react";
import languages from "@/locales/languages";
export const keyLanguages = Object.keys(languages) as TLanguages[];

type NestedKeys<T, Prefix extends string = ""> = {
  [K in keyof T]: T[K] extends object
    ? NestedKeys<T[K], `${Prefix}${K & string}.`>
    : `${Prefix}${K & string}`;
}[keyof T];
export type TLanguages = keyof typeof languages;
export type TKeysOfContent = NestedKeys<(typeof languages)["en"]>;

export function getNestedValue<T extends Record<string, unknown>>(
  obj: T,
  path: string
): string | undefined {
  const result = path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);

  return typeof result === "string" ? result : undefined;
}

function useTranslation(lang: TLanguages): (key: TKeysOfContent) => string {
  const translate = useCallback(
    (key: TKeysOfContent): string =>
      getNestedValue(languages[lang], key) ??
      getNestedValue(languages["en"], key) ??
      key,
    [lang]
  );
  return translate;
}

export default useTranslation;
