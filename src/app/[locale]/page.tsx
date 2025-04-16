"use client";
import useLang, { TLang } from "../hooks/useLang";
import Dropdown from "../components/Dropdown";
import { useParams } from "next/navigation";
const isTLang = (val: any): val is TLang => val === "en" || val === "es";
export default function Home() {
  const { locale } = useParams();
  const lang = isTLang(locale) ? locale : "en";
  const content = useLang(lang);
  return (
    <main className=" w-full flex flex-col gap-7 text-center  items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Dropdown options={["en", "es"]} />
      <h1 className="text-5xl ">{content("title.one")}</h1>
      <h2 className="text-2xl">{content("title.two")}</h2>
      <p>{content("description")}</p>
      <button className="bg-white py-2 px-6 text-3xl text-center text-black rounded-2xl shadow-2xl hover:bg-cyan-200">
        {content("button_text")}
      </button>
    </main>
  );
}
