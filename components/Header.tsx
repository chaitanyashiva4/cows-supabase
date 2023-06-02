'use client'

import { LogoutCurrentUser, getCurrentUser } from "@/utils/getuser";
import { User } from "@supabase/supabase-js";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { BiMenu } from 'react-icons/bi';
import { BiHomeAlt2 } from 'react-icons/bi';
import { BiCartAlt } from 'react-icons/bi';
import { BiShoppingBag } from 'react-icons/bi';
import { BsWalletFill } from 'react-icons/bs'
import { FaWallet } from 'react-icons/fa'
import { BiSupport } from 'react-icons/bi'
import { RxAvatar } from 'react-icons/rx'
import { AiFillWechat } from 'react-icons/ai'
import { FaWindowClose } from 'react-icons/fa'

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




  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="navbar text-primary-content">

      <div>
        <div className="dropdown">
          <label tabIndex={0} className="btn m-1" onClick={toggleDropdown}>
            <BiMenu size={25} />
          </label>
          <ul
            tabIndex={0}
            className={`dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 ${isDropdownOpen ? 'block' : 'hidden'
              }`}
            style={{ backgroundColor: '#082648', marginTop: '-60px', width: '270px' }}
          >
            <div>
              <li className="font-bold">
                <a>
                  <RxAvatar /> Hi <button onClick={closeDropdown} style={{marginLeft:'130px'}}><FaWindowClose size={25}/></button>
                </a>
              </li>
              <li className="font-bold bg-white rounded-md text-inherit mb-2"><a><BiHomeAlt2 />HOME</a></li>
              <li className="font-bold bg-white rounded-md text-inherit	mb-2"><a><BiCartAlt />MY ORDER</a></li>
              <li className="font-bold bg-white rounded-md text-inherit	mb-2"><a><BiShoppingBag />PRODUCTS</a></li>
              <li className="font-bold bg-white rounded-md text-inherit	mb-2"><a><BsWalletFill />BILL INFO</a></li>
              <li className="font-bold bg-white rounded-md text-inherit	mb-2"><a><FaWallet />MY WALLET</a></li>
              <li className="font-bold bg-white rounded-md text-inherit	mb-2"><a><BiSupport />SUPPORT</a></li>
              <li className="font-bold bg-white rounded-md text-inherit	mb-2"><a><RxAvatar />ABOUT US</a></li>
              <li className="font-bold bg-white rounded-md text-inherit	mb-2"><a><AiFillWechat />REQUEST</a></li>
            </div>
          </ul>
        </div>
      
      </div>

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
        <div style={{ textAlign: "center" }}>
          <a className="btn btn-ghost normal-case text-xl text-center" href="/"><img src="https://www.prideofcows.com/wp-content/themes/cake/images/logo.png" className="cows-logo" /></a>
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