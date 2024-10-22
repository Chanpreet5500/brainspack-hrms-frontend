"use client"
import BackgroundImgSlider from "@/components/reusableComponents/BackgroundImgSlider/BackgroundImgSlider"
import { superadminimages } from "@/constants/constants"
import { IconAccessible, IconBrandGoogleFilled } from "@tabler/icons-react"
import { signIn, signOut, useSession } from "next-auth/react"
import { useEffect } from "react"
import { useRegisterDataApiByNameMutation } from "@/services/user/usersApi"
import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";
import { useSelector } from "react-redux"
import { manageAuthUserSelector } from "@/redux/authorizedUser/authorizedUserSelector"

export default function Login() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [registerUserData] = useRegisterDataApiByNameMutation();
    const { authUser } = useSelector(manageAuthUserSelector);
    // const userData = Cookies.get("userData");
    useEffect(() => {
        if (status === 'authenticated' && session?.user) {
            if (!authUser) {
                register(session.user)
            } else {
                router.push("/dashboard");
            }
        }
    }, [status])
    const register = async (user) => {
        const data = {
            img: user.image,
            email: user.email
        };

        try {
            const response = await registerUserData(data).unwrap();
            document.cookie = `userData=${JSON.stringify(response)}; path=/`;
            router.push("/dashboard");
        } catch (error) {
            document.cookie = "userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
            signOut();
        }
    }
    const handleSignIn = async () => {
        await signIn("google");
    };
    return (
        <main>
            <div className="w-full h-[100vh] overflow-hidden relative bg-black">
                <BackgroundImgSlider images={superadminimages} />
                <div className="absolute top-0 left-0 w-full h-full ">
                    <div className="w-full h-full flex  bg-center bg-no-repeat bg-cover">
                        <div className="w-[45%]  flex justify-center left-pare  nt items-center ">
                            <div className="w-[70%]  h-[70%] text-white flex flex-col justify-between">
                                <div className=" w-full h-[60%] flex flex-col justify-between ">
                                    <div className="flex items-center h-auto">
                                        <div className=" h-full w-[10%] rounded-full items-center justify-center">
                                            <IconAccessible className="w-full h-full" />
                                        </div>
                                        <div className="text-2xl">
                                            BRAINS<span style={{ color: "#55ad88" }}>P</span>ACK
                                        </div>
                                    </div>
                                    <div className="flex gap-3 flex-col">
                                        <div className="flex flex-col gap-1">
                                            <p className="text-5xl">Were so glad to have You on board!</p>
                                        </div>
                                        <div>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                                            veritatis velit rerum ducimus ipsa eius iste, eligendi
                                            laboriosam tenetur adipisci sunt inventore quam numquam neque
                                            ipsam beatae ad et amet.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-tl-[550px] rounded-bl-[350px]  w-[55%]  bg-[#00000085] flex items-center justify-between h-full">
                            <div className=" h-[60%] w-full items-center justify-center flex text-white">
                                <div className=" flex gap-2 p-2 border border-white rounded-full text-white hover:bg-[#00000030] hover:cursor hover:text-black hover:bg-[#FFFFFF]">
                                    <IconBrandGoogleFilled size={30} />
                                    <button onClick={handleSignIn}>
                                        Sign up with google
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
