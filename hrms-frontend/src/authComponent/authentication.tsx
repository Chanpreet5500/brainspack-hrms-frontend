"use client";
import { isAuthenticated } from "@/utils/auth";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";


// export default function isAuth(Component: any) {
//   return function IsAuth(props: any) {
//     const auth = isAuthenticated;


//     useEffect(() => {
//       if (!auth) {
//         return redirect("/");
//       }
//     }, []);


//     if (!auth) {
//       return null;
//     }

//     return <Component {...props} />;
//   };
// }

// export default function withAuth(Component: React.ComponentType<any>) {
//     return function AuthenticatedComponent(props: any) {
//       const router = useRouter();
//       const auth = isAuthenticated;
  
//       useEffect(() => {
//         if (!auth) {
//           router.push("/"); 
//         }
//       }, [auth, router]);
  
//       if (!auth) {
//         return null; 
//       }
  
//       return <Component {...props} />;
//     };
//   }

export default function withAuth(Component: React.ComponentType<any>) {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter();
    const auth = isAuthenticated;

    useEffect(() => {
      if (!auth) {
        router.push("/"); // Redirect to home page if not authenticated
      }
    }, [auth, router]);

    if (!auth) {
      return null; // Render nothing while redirecting
    }

    return <Component {...props} />;
  };
}