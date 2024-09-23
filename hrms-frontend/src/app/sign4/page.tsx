import { IconAccessible, IconBrandGoogleFilled } from "@tabler/icons-react"
import { url } from "inspector"
import { signIn } from "next-auth/react"

const Sign = () => {
    return (
        <div className="w-full h-[100vh] border border-black flex  bg-center bg-no-repeat bg-cover  bg-[#000000d6]"
        >
            <div className="w-[45%]  flex justify-center left-parent items-center ">
                <div className="w-[70%]  h-[70%] text-white flex flex-col justify-between  no-sherna">
                    <div className=" w-full h-[50%] flex flex-col justify-between ">
                        <div className="flex items-center h-auto">
                            <div className=" h-full w-[10%] rounded-full items-center justify-center">
                                <IconAccessible className="w-full h-full" />
                            </div>
                            <div className="text-2xl">
                                HR<span style={{ color: '#cab7eb' }}>CONNEX.</span>
                            </div>
                        </div>

                        <div className="flex gap-3 flex-col">
                            <div className="flex flex-col gap-1">
                                <p className="text-5xl">We're so glad to have You on board!</p>
                            </div>
                            <div>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab veritatis velit rerum ducimus ipsa eius iste, eligendi laboriosam tenetur adipisci sunt inventore quam numquam neque ipsam beatae ad et amet.
                            </div>
                        </div>
                    </div>
                </div>
                {/* <img src="https://img.freepik.com/free-photo/photorealistic-view-tree-nature-with-branches-trunk_23-2151478040.jpg" className="h-[500px] w-[30%] r- absolute" /> */}
            </div>
            <div className="rounded-tl-[550px] rounded-bl-[350px]  w-[55%] h-[100%] bg-[#b8a7d7] flex items-center justify-between h-full">
                <div className=" h-[60%] w-full items-center justify-center flex">
                    <div className=" flex gap-2 p-2 border border-black rounded-full text-black hover:bg-[#00000030] hover:cursor">

                        <IconBrandGoogleFilled size={30} />

                        <button>Sign up with google</button>
                    </div>

                </div>
            </div>

        </div>
    )
}
export default Sign
// bg-[url('https://garden.spoonflower.com/c/11109395/p/f/m/eWoP46gl8N4dHazx4VlbK4QXXju_0b6qbsa8l-rqh2Z4zUpuJKX5BoQ/Violet%2Fsolid%20color.jpg')
//bg-[#b8a7d7]
// theme colorbg-[#c9b7eb] 