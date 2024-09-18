'use client'
import { sidebarlinks } from "@/constants/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Searchbar from "../Searchbar/Searchbar";


const Sidebar = () => {
    const pathname = usePathname()
    return (
        <div className="flex flex-col gap-1">
            <div className="hidden max-sm:block max-md:block">
                <Searchbar value={""} handleSearch={""} placeholder="Search" iconcolor='#9ca3af' classname='' />
            </div>
            {sidebarlinks.map((ele) => {
                const isActive = pathname === ele.link;
                return (
                    <>
                        <div key={ele.id}>
                            <Link href={ele.link}>
                                <div className={`px-3 py-1 flex gap-1 items-center hover:bg-white rounded-full cursor-pointer ${isActive ? 'bg-white' : ""}`}>
                                    <div className="p-2 bg-slate-200 rounded-full">
                                        {ele.icon}
                                    </div>

                                    <div className="text-base font-medium">
                                        {ele.name}
                                    </div>

                                </div>
                            </Link>
                        </div>
                    </>
                )
            })}
        </div>
    )
}
export default Sidebar;