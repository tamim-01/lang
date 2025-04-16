import { useCallback } from "react";
import translation from "../locales/content.json";

type NestedKeys<T, Prefix extends string = ""> = {
  [K in keyof T]: T[K] extends object
    ? NestedKeys<T[K], `${Prefix}${K & string}.`>
    : `${Prefix}${K & string}`;
}[keyof T];

export type TLang = keyof typeof translation;
export type TKeys = NestedKeys<(typeof translation)["en"]>;

function getNestedValue<T extends Record<string, unknown>>(
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

function useLang(lang: TLang): (key: TKeys) => string {
  const content = useCallback(
    (key: TKeys): string =>
      getNestedValue(translation[lang], key) ??
      getNestedValue(translation["en"], key) ??
      key,
    [lang]
  );
  return content;
}

export default useLang;
