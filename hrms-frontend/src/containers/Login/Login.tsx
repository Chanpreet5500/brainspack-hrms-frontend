"use client";
import { superadminimages } from "@/constants/constants";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import { useDispatch, useSelector } from "react-redux";
import { manageAuthUserSelector } from "@/redux/authorizedUser/authorizedUserSelector";
import { notifications } from "@mantine/notifications";
import {
  setAuthToken,
  setAuthUser,
} from "@/redux/authorizedUser/authorizedUser";
import BackgroundImgSlider from "@/components/reusableComponents/BackgroundImgSlider/BackgroundImgSlider";
import { IconAccessible, IconBrandGoogleFilled } from "@tabler/icons-react";
import Cookies from "js-cookie";

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const { authToken } = useSelector(manageAuthUserSelector);
  useEffect(() => {
    if (session) {
      if (status == "authenticated" && session.apiAccessToken) {
        // dispatch(setAuthToken(session?.apiAccessToken));
        // const decodedToken = jwt.decode(session.apiAccessToken);
        // dispatch(setAuthUser(decodedToken));
        // Cookies.set("authUser", JSON.stringify(decodedToken), { expires: 7 });
        // Cookies.set("apiAccessToken", JSON.stringify(session?.apiAccessToken), { expires: 7 });
        router.push("/dashboard");
      } else {
        if (status === "authenticated" && session && !session?.apiAccessToken) {
          signOut({ redirect: false });
          notifications.show({
            color: "red",
            title: "Access Denied",
            message: "Please register yourself to Sign Up",
          });
        }
      }
    }
  }, [status]);

  const handleSignIn = async () => {
    await signIn("google", { redirect: false });
  };
  return (
    <main>
      <div className="w-full h-[100vh] overflow-hidden relative ">
        <BackgroundImgSlider images={superadminimages} />
        <div className="absolute top-0 left-0 w-full h-full  ">
          <div className="w-full h-full flex bg-center bg-no-repeat bg-cover justify-between loginParent">
            <div
              className="  flex justify-center left-parent items-center"
              style={{ width: "45%" }}
            >
              <div className="w-[70%]  h-[70%] text-white flex flex-col justify-between">
                <div className=" w-full h-[60%] flex flex-col justify-between ">
                  <div
                    className="flex items-center h-auto justify-center"
                    style={{ width: "70%" }}
                  >
                    <div
                      className=" h-full w-[10%] rounded-full items-center justify-center "
                      style={{ fontSize: "30px" }}
                    >
                      <IconAccessible className="w-full h-full" />
                    </div>
                    <div style={{ fontSize: "40px" }}>
                      BRAINS<span style={{ color: "#55AD88" }}>P</span>ACK
                    </div>
                  </div>
                  <div className="flex gap-3 flex-col justify-center">
                    <div className="flex flex-col gap-1">
                      <p style={{ fontSize: "30px", textAlign: "center" }}>
                        Were so glad to have You on board!
                      </p>
                    </div>

                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div style={{ width: "60%", fontSize: "20px" }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ab veritatis velit rerum ducimus ipsa eius iste,
                        eligendi laboriosam tenetur adipisci sunt inventore quam
                        numquam neque ipsam beatae ad et amet.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" signUpBtnDiv ">
              <div className="  h-[60%] w-full items-center justify-center flex text-white">
                <div className="signBtn flex gap-2 p-2 border border-white rounded-full text-white hover:bg-[#00000030] hover:cursor hover:text-black hover:bg-[#FFFFFF]">
                  <IconBrandGoogleFilled style={{ fontSize: "50px" }} />
                  <button className="signBtn" onClick={handleSignIn}>
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
