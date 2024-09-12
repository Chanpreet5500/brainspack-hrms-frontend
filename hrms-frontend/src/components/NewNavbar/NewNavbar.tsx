import { IconArticle, IconBell, IconBrandVercel, IconCaretDownFilled, IconChevronCompactDown, IconClock, IconFileDescription, IconMenu2, IconSearch, IconSettings, IconUser } from "@tabler/icons-react";


const NewNavbar = () => {
    const navlinkdata = [
        {
            icon: <IconBrandVercel />,
            content: "Overview"
        },
        {
            icon: <IconUser />,
            content: "My Team"
        },
        {
            icon: <IconClock />,
            content: "Attendence"
        },
        {
            icon: <IconArticle />,
            content: "To do"
        },
        {
            icon: <IconMenu2 />,
            content: "Benefits"
        },
        {
            icon: <IconBrandVercel />,
            content: "Projects"
        },
        {
            icon: <IconMenu2 />,
            content: "Inbox"
        },
        {
            icon: <IconFileDescription />,
            content: "Leaves"
        },
        {
            icon: <IconSettings />,
            content: "Settings"
        },
        {
            icon: <IconSettings />,
            content: "Settings"
        },
    ]
    return (
        <div className="w-full " style={{ backgroundColor: '#e8ecef' }}>
            <div className="flex py-4 justify-between items-center">
                <div className="text-2xl">
                    HR<span style={{ color: '#cab7eb' }}>CONNEX.</span>
                </div>
                <div className="flex justify-end">
                    <div className="flex flex-row justify-between gap-3 items-center">
                        <div className=" border border-gray-800 h-[45px] w-[45px] rounded-full flex items-center justify-center">
                            <IconSearch stroke={1.5} />
                        </div>
                        <div className=" border border-gray-800  h-[45px] w-[45px] rounded-full flex items-center justify-center">
                            <IconBell stroke={1.5} />
                        </div>
                        <div className="border border-gray-800 h-[45px] w-[150px] rounded-full flex items-center justify-between pr-2 ">
                            <div className="flex items-center gap-1">
                                {/* <IconBell stroke={1.5} /> */}
                                <div className="border border-gray-800 h-[45px] w-[45px] rounded-full flex items-center justify-center overflow-hidden">
                                    <img
                                        src="https://static.vecteezy.com/system/resources/previews/004/819/327/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg"
                                        className="object-cover w-full h-full"
                                        alt="Avatar"
                                    />
                                </div>
                                <div>
                                    <p className="text-xs">
                                        Max Leo
                                    </p>
                                </div>
                            </div>
                            <div>
                                <IconCaretDownFilled />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t border-b border-gray-500 flex justify-between py-3 px-1">

                {
                    navlinkdata?.map((ele) => {
                        return (
                            <>
                                <div className="flex flex-row items-center  px-3 py-1 rounded-full text-sm  hover:bg-white gap-1">
                                    <div className="text-gray-700">
                                        {ele.icon}
                                    </div>
                                    <div className="text-gray-600">
                                        {ele.content}
                                    </div>
                                </div>
                            </>
                        )
                    })
                }

            </div>
        </div>

    )
}
export default NewNavbar;