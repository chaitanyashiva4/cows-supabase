"use client";

import { useEffect, useState } from "react";
import { FaApple, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from 'react-icons/fc';
import { useSupabase } from "../supabase-provider";
import { User } from "@supabase/supabase-js";
import { useRouter } from 'next/navigation';
import { useUser } from "@/utils/useUser";
import Image from "next/image";

export default function SignIn() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { supabase } = useSupabase();
  const { user } = useUser();

  const handleLogin = async (event: any) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });
    localStorage.setItem("user", JSON.stringify(data))
    console.log("data", JSON.stringify(data))
    if (data) {
      return router.replace("/");
    }
    else {
      alert(error)
    }
  };
  console.log("user", user)

  if (user) {
    return router.replace("/");
  }

  return (<>
    <div className="flex justify-center mt-3">
      <div className="shadow p-5 rounded-md">
        <h2 className="card-title justify-center"><img alt='products' src="logo.png" width={140} height={140} /></h2>
        <div>
          <form onSubmit={(event) => handleLogin(event)}>
            <dl>
              <dt className="text-center font-bold text-2xl">Login</dt>
              <dt className="text-center font-semibold mb-4">
                Dont have an account? <a href="/signup" className="text-sky-500">Signup</a>
              </dt>
              <dd className="border-2 rounded-md mb-3">
                <input type="email" name="email" placeholder="Enter email address" className="input w-full max-w-xs font-medium" />
              </dd>
              <dd className="border-2 rounded-md relative">
                <input type={showPassword ? "text" : "password"} name="password" placeholder="Enter password" className="input w-full max-w-xs font-medium" />
                <button type="button" onClick={togglePasswordVisibility} className="text-xl absolute inset-y-5 right-2 transform -translate-y-1/2">
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </dd>
              <dd className="flex justify-center mt-5 mb-5">
                <button className="btn btn-primary font-semibold" type="submit">Login</button>
              </dd>
              <dd className="text-center text-blue-600 font-semibold underline"><a href="">Forgot Password?</a></dd>
              <div className="mt-4">
                <ul>
                  <li><button className="btn btn-outline btn-primary w-80"><FcGoogle size={20} />&nbsp;<span className="text-slate-500">Sign In With Google</span></button></li>
                  <li><button className="btn btn-outline btn-primary w-80 mt-3"><FaApple size={25} />&nbsp;<span className="text-slate-500">Sign In With Apple</span></button></li>
                  <li><button className="btn btn-outline btn-primary w-80 mt-3">Sign In With OTP</button></li>
                </ul>
              </div>
            </dl>
          </form>
        </div>
      </div>
    </div>
  </>)
}


