"use client";
import { sidebarlinks } from "@/constants/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Searchbar from "../Searchbar/Searchbar";
import { useState } from "react";

interface SidebarProps {
  toggle: () => void;
}

const Sidebar = ({ toggle }: SidebarProps) => {
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index: any) => {
    console.log(index, "index");
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-1">
      <div className="hidden max-sm:block max-md:block">
        <Searchbar
          value={""}
          handleSearch={""}
          placeholder="Search"
          iconcolor="#9ca3af"
          classname=""
        />
      </div>
      {sidebarlinks.map((ele, index) => {
        const isActive = pathname === ele.link;

        return (
          <>
            <div key={ele.id}>
              {ele.link ? (
                <Link href={ele.link}>
                  <div
                    className={`px-3 py-1 flex gap-1 items-center hover:bg-white rounded-full cursor-pointer ${
                      isActive ? "bg-white" : ""
                    }`}
                  >
                    <div className="p-2 bg-slate-200 rounded-full">
                      {ele.icon}
                    </div>

                    <div onClick={toggle} className="text-base font-medium">
                      {ele.name}
                    </div>
                  </div>
                </Link>
              ) : (
                ""
                // <>
                //   <div
                //     onClick={() => handleSubmenu(index)}
                //     className={`px-3 py-1 flex gap-1 items-center hover:bg-white rounded-full cursor-pointer ${
                //       isActive ? "bg-white" : ""
                //     }`}
                //   >
                //     <div className="p-2 bg-slate-200 rounded-full">
                //       {ele.icon}
                //     </div>

                //     <div className="text-base font-medium">{ele.name}</div>
                //   </div>
                //   <div
                //     className={`submenu relative left-0 top-full rounded-sm bg-white transition-[top] duration-300 group-hover:opacity-100 dark:bg-dark lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                //       isActive ? "bg-white" : ""
                //     }`}
                //   >
                //     {ele?.submenu?.map((submenuItem, index) => (
                //       <>
                //         {submenuItem.link ? (
                //           <Link href={submenuItem.link || ""}>
                //             {submenuItem.name}
                //           </Link>
                //         ) : (
                //           <>'jdfhghdsjbvjkhs'</>
                //           // <div className=" group relative">
                //           //   <Link
                //           //     href={submenuItem?.link || ""}
                //           //     key={index}
                //           //     className="block relative rounded py-2.5 text-sm text-dark hover:text-primary dark:text-white/70 dark:hover:text-white lg:px-3"
                //           //   >
                //           //     {submenuItem.name}
                //           //     <div
                //           //       className={`group block   left-[100%] top-0 rounded-sm bg-white transition-[top] duration-300 group-hover:opacity-100 dark:bg-dark lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full

                //           //   `}
                //           //     >
                //           //       xcvgfcxdbdf
                //           //     </div>
                //           //   </Link>
                //           // </div>
                //         )}
                //       </>
                //     ))}
                //   </div>
                // </>
              )}
            </div>
          </>
        );
      })}
    </div>
  );
};
export default Sidebar;
