'use client'

import { LogoutCurrentUser, getCurrentUser } from "@/utils/getuser";
import { User } from "@supabase/supabase-js";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { BiMenu } from 'react-icons/bi';
import { BiHomeAlt2 } from 'react-icons/bi';
import { BiCartAlt } from 'react-icons/bi';
import { BiShoppingBag } from 'react-icons/bi';
import { BsWalletFill, BsCart, BsBell } from 'react-icons/bs'
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
    <div className="header-container">
      <div className="text-primary-content">
        <div className="dropdown">
          <label tabIndex={0} className="btn m-1" onClick={toggleDropdown}>
            <BiMenu size={25} />
          </label>
          <ul
            tabIndex={0}
            className={`dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 ms-1 ${isDropdownOpen ? 'block' : 'hidden'
              }`}
            style={{ backgroundColor: '#082648', marginTop: '-55px', width: '270px' }}
          >
            <div>
              <li className="font-bold">
                <a>
                  <RxAvatar /> Hi <button onClick={closeDropdown} style={{ marginLeft: '130px' }}><FaWindowClose size={25} /></button>
                </a>
              </li>
              <li className="font-bold bg-white rounded-md text-gray-500 mb-2"><a><BiHomeAlt2 />HOME</a></li>
              <li className="font-bold bg-white rounded-md text-gray-500	mb-2"><a><BiCartAlt />MY ORDER</a></li>
              <li className="font-bold bg-white rounded-md text-gray-500	mb-2"><a><BiShoppingBag />PRODUCTS</a></li>
              <li className="font-bold bg-white rounded-md text-gray-500	mb-2"><a><BsWalletFill />BILL INFO</a></li>
              <li className="font-bold bg-white rounded-md text-gray-500	mb-2"><a><FaWallet />MY WALLET</a></li>
              <li className="font-bold bg-white rounded-md text-gray-500	mb-2"><a><BiSupport />SUPPORT</a></li>
              <li className="font-bold bg-white rounded-md text-gray-500	mb-2"><a><RxAvatar />ABOUT US</a></li>
              <li className="font-bold bg-white rounded-md text-gray-500	mb-2"><a><AiFillWechat />REQUEST</a></li>
              <li className="font-bold bg-white rounded-md text-gray-500	mb-2"><div className="navbars-end m-1 justify-center">
                {users ?
                  <button onClick={logout}>Logout</button>
                  :
                  <a href="/login"><button>Logout/Login</button></a>
                }
              </div></li>
            </div>
          </ul>
        </div>
      </div>
      <div>
        <a href="/"><img src="https://www.prideofcows.com/wp-content/themes/cake/images/logo.png" alt='logo' className="cows-icon"/></a>
      </div>
        <div className="header-icons" style={{display:"flex",justifyContent:"space-between"}}>
          <a href="/cart"><BsCart className="m-4"/></a>
          <a><BsBell className="m-4"/></a>
        </div>
    </div>
  )
}