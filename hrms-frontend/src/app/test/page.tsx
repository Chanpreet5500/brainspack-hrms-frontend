
    "use client";
import {isAuthenticated} from '@/utils/auth';
import { redirect } from 'next/navigation'; 
import { useEffect } from 'react';


const TestComponent = () => {

    useEffect(() => {
      const isAuth = isAuthenticated;
      if(!isAuth){
        redirect("/")
      }
    }, [])

  return (
    <main className="text-center h-screen flex justify-center items-center">
      <div>
        <h1>TEST COMPONENT</h1>        
      </div>
    </main>
  );
};


 export default TestComponent;