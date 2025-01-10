'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import LoginPopUp from './loginPopUp';
import { useAppSelector } from '@/redux/store';
import User from '@/helper/interface/user';
import x from '@/layout/homePage/header.module.css'
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '@/redux/apiRequest';
import ConfigAxios from '@/helper/config/configAxios';
export default function Header() {
  const [isDiableLoginPopUp, setIsDiableLoginPopUp] = useState(false);
  const user = useAppSelector((state) => state.auth.login.currentUser) as User | null;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = user?.accessToken as string;
  const id = user?._id as string;
  const axiosJWT = ConfigAxios.ConfigJWT();
  const handleLogOut = async () => {
    await logOut({ dispatch, navigate, id, accessToken , axiosJWT});
  }
  console.log(user);
  return (
    <div className={x['header']}>
        <Image
        src="https://topik.migii.net/images/migii/topik-logo.webp"
        alt='logo'
        width={100}
        height={50}
        className={x['logo']}
        ></Image>
       <nav>
        <Link href="/home" id={x['nav-links']}>RoadMap</Link>
        <Link href="/home" id={x['nav-links']}>Topik Practice</Link>
        <Link href="/home" id={x['nav-links']}>Mock Test</Link>
        <Link href="/home" id={x['nav-links']}>Upgrade</Link>
        <Link href="/home" id={x['nav-links']}>About Nigii</Link>
        </nav> 
        <div className={x['login-info']}>
            {user? null : (
                <button onClick={()=> setIsDiableLoginPopUp(true)}
                className={x['login-btn']}>
                    Login
                     </button>
            )}
        </div>
        {user? (
            <div className={x['user-info']}>
                <h3 className={x['hello-user']}>{"Hi, " + user.username}</h3>
                <button className={x['logout-btn']}
                onClick={()=> handleLogOut()}
                >Logout</button>
            </div>
        ): null}
      <LoginPopUp isShow={isDiableLoginPopUp} onClose={() => setIsDiableLoginPopUp(false)} />
    </div>
  );
}