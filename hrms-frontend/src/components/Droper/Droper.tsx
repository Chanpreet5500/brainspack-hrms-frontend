"use client";
import { appdroperdata, dangerdroperdata } from "@/constants/constants";
import { IconChevronCompactDown, IconChevronCompactUp } from "@tabler/icons-react";
import { useState } from "react";

const Droper = () => {
    const [open, setopen] = useState(false)

    return (
        <>
            <div className="cursor-pointer"
                onClick={() => { setopen(!open) }}>
                {open ? <IconChevronCompactUp stroke={2} size={15} color='black' /> : <IconChevronCompactDown stroke={2} size={15} color='black' />}
            </div>
            <div>
                {
                    open && (
                        <div className="absolute p-3 bg-white rounded-lg right-0 top-14 w-[85%]">
                            <div className="py-1 border-b border-gray-200">
                                <div className=" p-1">
                                    <p className="text-xs text-gray-400">Application</p>
                                </div>
                                <div className="">
                                    {
                                        appdroperdata.map((ele) => {
                                            return (
                                                <>
                                                    <div className="flex gap-2 text-sm items-center p-2 hover:bg-slate-200  rounded-full cursor-pointer">
                                                        <ele.icon size={15} />
                                                        <p>{ele.name}</p>
                                                    </div>
                                                </>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                            <div>
                                <div className="p-1 ">
                                    <p className="text-xs text-gray-400 py-2">Danger Zone</p>
                                </div>
                                <div className="">
                                    {
                                        dangerdroperdata.map((ele) => {
                                            return (
                                                <>
                                                    <div className="flex gap-2 text-sm items-center p-2 text-red-500 hover:bg-red-100  rounded-full cursor-pointer">
                                                        <ele.icon size={15} />
                                                        <p>{ele.name}</p>
                                                    </div>
                                                </>
                                            )
                                        })
                                    }

                                </div>
                            </div>

                        </div>
                    )
                }
            </div>
        </>
    )
}
export default Droper;