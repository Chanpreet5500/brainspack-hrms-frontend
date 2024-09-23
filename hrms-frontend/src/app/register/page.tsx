// "use client";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { useSession, signIn, signOut } from "next-auth/react";




// export default function SignupPage() {
//     const [signin, setsigin] = useState(false);
//     const router = useRouter();
//     const [user, setUser] = React.useState({
//         address: "",
//         email: "",
//         first_name: "",
//         last_name: "",
//         profile_img: ""


//     })
//     const [loading, setLoading] = React.useState(false);
//     const { data: session, status } = useSession();
//     useEffect(() => {
//         if (status === 'authenticated') {
//             // const userToken = JSON.stringify(session?.user);
//             // document.cookie = `token=${userToken}; path=/; secure; samesite=strict`;
//             const email = session?.user?.email || "";
//             const first_name = session?.user?.givenName || ""
//             const last_name = session?.user?.familyName || ""
//             const profile_img = session?.user?.image || ""
//             setUser(prevUser => ({ ...prevUser, email, first_name, last_name, profile_img }));
//             // setsigin(true)
//             onRegister();

//         }
//     }, [status, router, session]);
//     const onRegister = async () => {
//         try {
//             setLoading(true);
//             const response = await axios.post("/api/users/register", user);
//             if (response.data.message == 'success') {
//                 router.push("/employees");
//             }
//         } catch (error: any) {
//             if (error.response) {
//                 const errorMessage = error.response.data.message;
//                 if (errorMessage == 'Missing required field-address') {
//                     setsigin(true)
//                 }
//                 // toast.error(errorMessage);
//             } else {
//                 // toast.error("An unexpected error occurred.");
//             }
//         } finally {
//             setLoading(false);
//         }
//     }
//     return (
//         <div className="flex flex-col items-center justify-center h-[300px] py-2">

//             <div className="flex flex-col items-center justify-center py-2">
//                 {!signin ?
//                     <>
//                         <button
//                             onClick={() => signIn('google')}
//                             className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 hover:bg-gray-600">Sign up with google</button>
//                     </>
//                     :
//                     <div className="flex flex-col items-center justify-center min-h-screen py-2">
//                         <h1>{loading ? "Processing" : "Please Register Yourself to login"}</h1>
//                         <hr />

//                         <label htmlFor="address">Address</label>
//                         <input
//                             className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
//                             id="address"
//                             type="text"
//                             value={user.address}
//                             onChange={(e) => setUser({ ...user, address: e.target.value })}
//                             placeholder="address"
//                         />
//                         <button
//                             onClick={onRegister}
//                             className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Register</button>
//                     </div>
//                 }
//             </div>


//         </div>
//     )

// }
export default function SignupPage() {
    return (
        <p>This is the Register page
        </p>
    )
}