"use client";
import useTranslate, {
  TLanguages,
  keyLanguages,
} from "../../hooks/useTranslation";
import Dropdown from "../../components/Dropdown";
import { useParams } from "next/navigation";
import { variables } from "@/locales/variables";
const isTLang = (val: unknown): val is TLanguages =>
  keyLanguages.includes(val as TLanguages);

export default function Home() {
  const { locale } = useParams();
  const language = isTLang(locale) ? locale : "en";
  const translate = useTranslate(language, variables);
  return (
    <main className=" w-full flex flex-col gap-7 text-center  items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Dropdown options={keyLanguages} />
      <h1 className="text-5xl ">{translate("title.one")}</h1>
      <h2 className="text-2xl">{translate("title.two")}</h2>
      <p>{translate("description")}</p>
      <button className="bg-white py-2 px-6 text-3xl text-center text-black rounded-2xl shadow-2xl hover:bg-cyan-200">
        {translate("button_text")}
      </button>
    </main>
  );
}
