

"use client";

import { useState } from "react";
import { FaApple, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from 'react-icons/fc';
import { useSupabase } from "../supabase-provider";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { supabase } = useSupabase();

  const handleSignUp = async (event: any) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password
    });
    console.log(data, "data")
  };

  return (<>
    <div className="flex justify-center mt-3">
      <div className="card w-96 bg-base-100 shadow-xl border">
        <div className="card-body">
          <h2 className="card-title justify-center"><img alt='products' src="./logo.png" width="140" height="140" /></h2>
          <form onSubmit={(event) => handleSignUp(event)}>
            <dl>
              <dt className="text-center font-bold text-2xl">Signup</dt>
              <dt className="text-center font-semibold mb-4">
                Already have an account? <a href="/signin" className="text-sky-500">Login</a>
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
                <button className="btn btn-primary font-semibold" type="submit">Submit</button>
              </dd>
            </dl>
          </form>
          <div className="card-actions justify-center mt-3">
            <div>
              <ul>
                <li><button className="btn btn-outline btn-primary w-80"><FcGoogle size={20} />&nbsp;<span className="text-slate-500">Sign In With Google</span></button></li>
                <li><button className="btn btn-outline btn-primary w-80 mt-3"><FaApple size={25} />&nbsp;<span className="text-slate-500">Sign In With Apple</span></button></li>
                <li><button className="btn btn-outline btn-primary w-80 mt-3">Sign In With OTP</button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
}