import { IconBell, IconHttpDelete, IconSearch } from "@tabler/icons-react";
import { Burger } from "@mantine/core";
import Droper from "../Droper/Droper";
import { signOut } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { appdroperdata, dangerdroperdata } from "@/constants/constants";

interface NavbarProps {
    opened: boolean;
    toggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ opened, toggle }) => {
    const [open, setopen] = useState(false)
    return (
        <div className="w-full" style={{ backgroundColor: '' }}>
            <div className="flex py-3 justify-between items-center">
                <div className="flex gap-2 items-center">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
                    <div className="text-2xl">
                        HR<span style={{ color: '#cab7eb' }}>CONNEX.</span>
                    </div>
                </div>
                <div className="flex justify-end relative w-full">
                    <div className="flex flex-row justify-between gap-2 items-center ">
                        <div className=" border border-black h-[50px] w-[60px] rounded-full flex items-center justify-center cursor-pointer max-sm:hidden">
                            <IconSearch stroke={1.5} size={25} />
                        </div>
                        <div className=" border border-black  h-[50px] w-[60px] rounded-full flex items-center justify-center cursor-pointer max-sm:hidden"
                            onClick={() => { signOut() }}
                        >
                            {/* <IconBell stroke={1.5} size={25} /> */}
                            <IconHttpDelete stroke={1.5} size={25} onClick={() => { alert("you have logged out") }} />
                        </div>
                        <div className="border border-gray-800 h-[52px] w-[70%] rounded-full flex items-center justify-between max-sm:w-full max-sm:pr-0 max-sm:border-0 hover:cursor-pointer p-2"
                            onClick={() => { setopen(!open) }}
                        >
                            <div className="flex items-center gap-1">

                                <div className=" h-[45px] w-[45px] rounded-full flex items-center justify-center overflow-hidden">
                                    <img
                                        src="https://static.vecteezy.com/system/resources/previews/004/819/327/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg"
                                        className="object-cover w-full h-full"
                                        alt="Avatar"
                                    />
                                </div>
                                <div className="max-sm:hidden">
                                    <p className="text-xs">
                                        Max Leo
                                    </p>
                                </div>
                            </div>

                            <div className="max-sm:hidden">
                                <Droper open={open} setopen={setopen} />
                            </div>
                            <div>
                                {
                                    open && (
                                        <div className="absolute p-3 bg-white rounded-lg right-0 top-14">
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
                        </div>

                    </div>
                </div>
            </div>
        </div >

    )
}
export default Navbar;