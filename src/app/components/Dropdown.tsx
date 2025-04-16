import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { TLang } from "../hooks/useLang";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

export default function Dropdown({ options }: { options: TLang[] }) {
  const router = useRouter();
  return (
    <Menu as="div" className="relative inline-block text-center ">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
          Language
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 size-5 text-gray-400"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute  z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          {options.map((option: string) => (
            <MenuItem key={option}>
              <span
                onClick={() => {
                  router.replace(option);
                }}
                className="block px-2 py-2 text-lg text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
              >
                {option}
              </span>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}
