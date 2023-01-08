import Image from "next/image";
import google from "../../public/google-48.png";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import {  BiUser } from "react-icons/bi";

function SignIn() {
  const { data: session } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const errors = {
    OAuthSignin: "There was an error signing in, try another method",
    OAuthCallback: "There was an error signing in, try again",
    OAuthCreateAccount: "There was an error creating your account, try again",
    EmailCreateAccount: "There was an error creating your account, try again",
    EmailSignin: "There was an error signing in, try again",
    CredentialsSignin: "There was an error signing in, try again",
    default: "There was an error, try again",
  }

  const emailSignIn = async (e) => {
    e.preventDefault();
    const response = await signIn("email", { email: email, redirect: false });
    if(email === ''){
      setError("Please enter your email")
    }else if (response?.error) {
      console.log(response.error);
      setError(errors[response.error] || errors.default);
    } else if (response?.ok) {
      
      router.push(response.url);
    }
  };

  const onInput = (e) => {
    setError('')
    setEmail(e.target.value);
  }

  if (session) {
    router.push("/");
  }

  return (
    <>
      <div className="container mx-auto pt-24 flex justify-center text-center">
        <div className="border-4 border-primary-500 mx-4 border-dashed rounded-lg py-8 w-screen md:max-w-md">
       {error !== '' && <div className="bg-red-200 text-red-900">{error}</div>}
          <div className="w-fit text-primary-500 border-primary-500 mx-auto mb-4">
            <BiUser size={"6rem"} />
          </div>
          <h1 className="text-primary-500 font-semibold text-2xl">
            Sign in with:
          </h1>
          
          <form className="flex flex-col text-left mx-auto w-2/3 mt-6 mb-3">
            <input
            onChange={onInput}
              placeholder="your@email.com"
              className="p-1 opacity-70 border-gray-300 rounded-lg"
              id="email"
              type="email"
            />
            <button onClick={(e) => emailSignIn(e)} className="text-white w-full py-1 my-2 ml-auto rounded-lg bg-primary-500 hover:scale-[1.025] hover:bg-primary-400 transition-all active:scale-95 active:bg-primary-600">
              Send email
            </button>
            <p className="text-primary-500 opacity-70 font-medium text-lg text-center my-2">
              
              Or
            </p>
          </form>
          <button
            onClick={() =>
              signIn("google", {
                callbackUrl: localStorage.getItem("tempNote") ? "/create" : "/",
              })
            }
            className="flex mx-auto justify-center gap-2 py-1 my-2 ml-auto rounded-lg border-2 border-primary-500 text-primary-500 w-2/3 hover:scale-[1.025] hover:bg-primary-500 hover:text-white transition-all active:scale-95 active:bg-primary-600"
          >
            <Image src={google} alt="google icon" width={24}/>
            Your Google Account
          </button>
        </div>
      </div>

     
    </>
  );
}

export default SignIn;
