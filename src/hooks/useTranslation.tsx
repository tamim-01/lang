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

function useTranslation(
  lang: TLanguages,
  variables: Record<TLanguages, Record<string, string>>
): (key: TKeysOfContent) => string {
  const translate = useCallback(
    (key: TKeysOfContent): string => {
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
    },
    [lang, variables]
  );
  return translate;
}

export default useTranslation;
