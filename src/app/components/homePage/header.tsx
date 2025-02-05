import React from 'react'
import x from '@/app/layouts/homePage/header.module.css'
import Link from 'next/link'
import { useAppSelector } from '@/app/redux/store'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '@/app/redux/apiRequest';
import ConfigAxios from '@/app/helper/config/configAxios';

interface User {
  accessToken: string;
  avatar: string;
  email: string;
  role : string;
  username: string;
  __v: number;
  _id: string;
}
export default function Header() {
  const user = useAppSelector((state) => state.auth.login.currentUser) as User | null;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = user?.accessToken as string;
  const id = user?._id as string;
  const axiosJWT = ConfigAxios.ConfigJWT();
  const logout = async()=>{
    await logOut({ dispatch, navigate, id, accessToken , axiosJWT});
  }
  return (
    <div className={x["container"]}>
      <div className={x['logo']}>
        <Link href="/">
        <img style={{width: '100px', height: '40px'}} src="https://topikexam.com/images/logo.png" alt="" /></Link>
      </div>
      {user ? (
        <div className={x['user-info']}>
          <img src={user.avatar} alt="" />
          <h5> { "Hi " +  user.username} </h5>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div className={x['user']}>
          <Link href="/login" style={{ width: '60px', height: '25px', marginRight: '10px', textDecoration: 'none', color: 'black' }}>Login</Link>
          <Link href="/register" style={{ width: '60px', height: '25px', textDecoration: 'none', color: 'black' }}>Register</Link>
        </div>
      )}
    </div>
  )
}
