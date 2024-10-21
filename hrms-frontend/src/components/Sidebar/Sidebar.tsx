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
  const [openIndex, setOpenIndex] = useState(false);

  const subMenuOpenFn = () => {
    setOpenIndex((prev) => !prev);
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
                <>
                  <div>
                    <div
                      onClick={() => subMenuOpenFn()}
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
                  </div>
                  <div className={`${isActive ? "bg-white" : ""}`}>
                    {ele?.submenu?.map((curr, indx) => {
                      return (
                        <>
                          {openIndex ? (
                            <Link href={curr.link}>
                              <div
                                className={`px-3 py-1 flex gap-1 items-center hover:bg-white rounded-full cursor-pointer ${
                                  isActive ? "bg-white" : ""
                                }`}
                              >
                                <div className="p-2 bg-slate-200 rounded-full">
                                  {curr?.icon}
                                </div>

                                <div
                                  onClick={toggle}
                                  className="text-base font-medium"
                                >
                                  {curr?.name}
                                </div>
                              </div>
                            </Link>
                          ) : (
                            ""
                          )}
                        </>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </>
        );
      })}
    </div>
  );
};
export default Sidebar;

// import { Group, Code, ScrollArea, rem } from "@mantine/core";
// import {
//   IconNotes,
//   IconCalendarStats,
//   IconGauge,
//   IconPresentationAnalytics,
//   IconFileAnalytics,
//   IconAdjustments,
//   IconLock,
// } from "@tabler/icons-react";

// import classes from "./NavbarNested.module.css";
// import { NavbarLinksGroup } from "./NavbarLinkGroup";
// import { UserButton } from "./UserButton";

// const mockdata = [
//   { label: "Dashboard", icon: IconGauge },
//   {
//     label: "Market news",
//     icon: IconNotes,
//     initiallyOpened: true,
//     links: [
//       { label: "Overview", link: "/" },
//       { label: "Forecasts", link: "/" },
//       { label: "Outlook", link: "/" },
//       { label: "Real time", link: "/" },
//     ],
//   },
//   {
//     label: "Releases",
//     icon: IconCalendarStats,
//     links: [
//       { label: "Upcoming releases", link: "/" },
//       { label: "Previous releases", link: "/" },
//       { label: "Releases schedule", link: "/" },
//     ],
//   },
//   { label: "Analytics", icon: IconPresentationAnalytics },
//   { label: "Contracts", icon: IconFileAnalytics },
//   { label: "Settings", icon: IconAdjustments },
//   {
//     label: "Security",
//     icon: IconLock,
//     links: [
//       { label: "Enable 2FA", link: "/" },
//       { label: "Change password", link: "/" },
//       { label: "Recovery codes", link: "/" },
//     ],
//   },
// ];

// interface SidebarProps {
//   toggle: () => void;
// }

// export const Sidebar = ({ toggle }: SidebarProps) => {
//   const links = mockdata.map((item) => (
//     <NavbarLinksGroup {...item} key={item.label} />
//   ));

//   return (
//     <nav className={classes.navbar}>
//       <div className={classes.header}>
//         <Group justify="space-between">
//           <Code fw={700}>v3.1.2</Code>
//         </Group>
//       </div>

//       <ScrollArea className={classes.links}>
//         <div className={classes.linksInner}>{links}</div>
//       </ScrollArea>

//       <div className={classes.footer}>
//         <UserButton />
//       </div>
//     </nav>
//   );
// };
