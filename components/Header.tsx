'use client'

import { LogoutCurrentUser, getCurrentUser } from "@/utils/getuser";
import { User } from "@supabase/supabase-js";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import Home from "./Home";

export const Header = () => {
  const router = useRouter();

  const user = ""

  const [users, setUsers] = useState<User | null>(null);

  const logout = async () => {
    alert("logout")
    const err = await LogoutCurrentUser()
    if (err) {
      alert(err)
    }
    else {
      return router.push('/signin');
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      const value = await getCurrentUser()
      setUsers(value)
    };
    getUsers();

  }, [users]);

  return (
    <div className="navbar text-primary-content">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>

          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <div className="form-control">
              <input type="text" placeholder="Search" className="input input-bordered" />
            </div>
            <li><a href="/PricingPage">Products</a></li>
            <li><a href="/account">Account</a></li>
          </ul>
        </div>
        <div style={{textAlign:"center"}}>
        <a className="btn btn-ghost normal-case text-xl text-center" href="/"><img src="https://www.prideofcows.com/wp-content/themes/cake/images/logo.png" className="cows-logo"/></a>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered" />
        </div>
        <ul className="menu menu-horizontal px-1">
          <li><a href="/">Products</a></li>
          <li><a href="/account">Account</a></li>
        </ul>
      </div>
      <div className="navbar-end">
        {users ?
          <button onClick={logout}>Logout</button>
          :
          <a href="/login"><button>Login</button></a>
        }
      </div>
    </div>
  )
}