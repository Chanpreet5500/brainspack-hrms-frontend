import { IconBell, IconSearch } from "@tabler/icons-react";
import { Burger } from "@mantine/core";
import Droper from "../Droper/Droper";

interface NavbarProps {
    opened: boolean;
    toggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ opened, toggle }) => {
    return (
        <div className="w-full" style={{ backgroundColor: '' }}>
            <div className="flex py-3 justify-between items-center">
                <div className="flex gap-2 items-center">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
                    <div className="text-2xl">
                        HR<span style={{ color: '#cab7eb' }}>CONNEX.</span>
                    </div>
                </div>
                <div className="flex justify-end relative">
                    <div className="flex flex-row justify-between gap-2 items-center">
                        <div className=" border border-black h-[40px] w-[40px] rounded-full flex items-center justify-center cursor-pointer max-sm:hidden">
                            <IconSearch stroke={1.5} size={20} />
                        </div>
                        <div className=" border border-black  h-[40px] w-[40px] rounded-full flex items-center justify-center cursor-pointer max-sm:hidden">
                            <IconBell stroke={1.5} size={20} />
                        </div>
                        <div className="border border-gray-800 h-[45px] w-[150px] rounded-full flex items-center justify-between pr-4 max-sm:w-full max-sm:pr-0 max-sm:border-0">
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
                                <Droper />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div >

    )
}
export default Navbar;