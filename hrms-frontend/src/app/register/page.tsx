"use client";
import { IconAccessible, IconBrandGoogleFilled } from "@tabler/icons-react";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

const Register = () => {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      // const userToken = JSON.stringify(session?.user);
      // document.cookie = `token=${userToken}; path=/; secure; samesite=strict`;
      // const email = session?.user?.email || "";
      // const first_name = session?.user?.givenName || ""
      // const last_name = session?.user?.familyName || ""
      // const profile_img = session?.user?.image || ""
    }
  }, [status, session]);
  return (
    <div className="w-full h-full flex  bg-center bg-no-repeat bg-cover">
      <div className="w-[45%]  flex justify-center left-pare  nt items-center ">
        <div className="w-[70%]  h-[70%] text-white flex flex-col justify-between">
          <div className=" w-full h-[60%] flex flex-col justify-between ">
            <div className="flex items-center h-auto">
              <div className=" h-full w-[10%] rounded-full items-center justify-center">
                <IconAccessible className="w-full h-full" />
              </div>
              <div className="text-2xl">
                HR<span style={{ color: "#cab7eb" }}>CONNEX.</span>
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

            <button onClick={() => signIn("google")}>
              Sign up with google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
