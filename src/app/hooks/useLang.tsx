import { useCallback } from "react";
import translation from "../locales/content.json";

type NestedKeys<T, Prefix extends string = ""> = {
  [K in keyof T]: T[K] extends object
    ? NestedKeys<T[K], `${Prefix}${K & string}.`>
    : `${Prefix}${K & string}`;
}[keyof T];
export type TLang = keyof typeof translation;
export type TKeys = NestedKeys<(typeof translation)["en"]>;

function getNestedValue(obj: any, path: string): string {
  return path.split(".").reduce((acc, key) => acc?.[key], obj) || path;
}

function useLang(lang: TLang) {
  const translate = translation[lang];
  const content = useCallback(
    (key: TKeys) => {
      return getNestedValue(translate, key);
    },
    [translate]
  );
  return content;
}

export default useLang;
