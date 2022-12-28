import { FaGoogle } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";



function SignIn() {
    const { data: session } = useSession()
    const router = useRouter()
    


    if(session ) {         
        router.push('/')
    }

  return (
    <div className=" w-5/6 sm:w-3/4 max-w-xl rounded-md border absolute left-1/2 -translate-x-1/2 top-48">
      <div className="flex flex-col py-10 px-6">
        <span className=" mb-4 text-center">Sign in with</span>
        <div className="bg-white rounded border border-gray-300 flex items-center justify-between">
          <input
            type="text"
            placeholder="Your Email"            
            className="bg-transparent py-1 border-none text-gray-600 px-4 w-full"
          />
          <button className="py-2 px-4 bg-white text-gray-600 rounded-r border-l border-gray-200 hover:bg-gray-50 active:bg-gray-200 disabled:opacity-50 inline-flex items-center focus:outline-none text-lg">
            <FiSend />
          </button>
        </div>
        <span className="mt-4 text-center">or</span>
                <button onClick={() => signIn('google', { callbackUrl: sessionStorage.getItem("tempNote")? '/create': '/' })} className="bg-indigo-500 text-xs mt-4 sm:text-sm text-white py-2 hover:bg-indigo-600 active:bg-indigo-700">
          <span className="inline-block mr-2  translate-y-0.5">
            <FaGoogle />
          </span>
          Your Google Account
        </button>
       
      </div>
    </div>
  );
  }

export default SignIn;