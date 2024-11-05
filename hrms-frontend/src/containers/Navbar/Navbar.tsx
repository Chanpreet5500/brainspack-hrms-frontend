import {
  IconBell,
  IconHttpDelete,
  IconSearch,
  IconUserCircle,
  IconTransfer,
  IconChevronCompactDown,
  IconChevronCompactUp,
} from "@tabler/icons-react";
import { Burger } from "@mantine/core";
import Droper from "../../components/reusableComponents/Droper/Droper";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { appdroperdata } from "@/constants/constants";
import { useSelector } from "react-redux";
import { manageAuthUserSelector } from "@/redux/authorizedUser/authorizedUserSelector";
import Link from "next/link";

interface NavbarProps {
  opened: boolean;
  toggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ opened, toggle }) => {
  const [open, setOpen] = useState(false);
  const { authUser } = useSelector(manageAuthUserSelector);

  useEffect(() => {
    console.log(authUser, "USER");
  }, [authUser]);

  const handleSignOut = () => {
    signOut();
  };
  return (
    <div className="w-full">
      <div className="flex py-3 justify-between items-center ">
        <div className="flex gap-2 items-center">
          <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
          <div className="text-2xl">
            Brains<span style={{ color: "#55ad88" }}>p</span>ack
          </div>
        </div>
        <div className="flex justify-end relative w-full sm:hidden ">
          <div className="flex avatarDiv flex-row justify-between gap-2 items-center">
            <div
              className="border h-[52px] w-full rounded-full flex items-center justify-between gap-[10px] sm:border-none max-sm:w-full max-sm:pr-0 hover:cursor-pointer p-2"
              onClick={() => setOpen(!open)}
              aria-haspopup="true"
              aria-expanded={open}
            >
              <div className="flex items-center gap-[10px]">
                <div className="h-[45px] w-[45px] rounded-full flex items-center justify-center overflow-hidden">
                  <Image
                    src={authUser?.img || "/default_profile.jpg"}
                    alt="Avatar"
                    className="object-cover w-full h-full"
                    width={100}
                    height={100}
                    layout="fixed"
                    objectFit="contain"
                  />
                </div>
                <div className="max-sm:hidden">
                  <p className="text-xs  max:sm:hidden">{authUser?.fname}</p>
                </div>
                <div>
                  {open ? <IconChevronCompactUp /> : <IconChevronCompactDown />}
                </div>
              </div>
            </div>

            <div
              className={`absolute right-0 top-14 min-w-[150px] shadow-lg transition-all duration-300 ease-in-out ${
                open ? "dropdown-enter-active" : "dropdown-exit"
              }`}
              role="menu"
              aria-orientation="vertical"
              style={{
                maxHeight: open ? "200px" : "0",
                opacity: open ? 1 : 0,
                overflow: "hidden",
              }}
            >
              <div className="p-3 bg-white rounded-lg">
                <div className="py-1 border-b border-gray-200">
                  <div className="p-1">
                    <p className="text-xs text-gray-400">Application</p>
                  </div>
                  <div>
                    {appdroperdata.map((ele) => (
                      <Link
                        href={ele.link || "#"}
                        key={ele.id}
                        className="flex gap-2 text-sm items-center p-2 hover:bg-slate-200 rounded-full cursor-pointer"
                        role="menuitem"
                      >
                        <ele.icon size={15} />
                        <p>{ele.name}</p>
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="p-1">
                    <p className="text-xs text-gray-400 py-2">Danger Zone</p>
                  </div>
                  <div>
                    <div
                      className="flex gap-2 text-sm items-center p-2 text-red-500 hover:bg-red-100 rounded-full cursor-pointer"
                      onClick={handleSignOut}
                      role="menuitem"
                    >
                      <IconTransfer size={15} />
                      <p>Sign out</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
