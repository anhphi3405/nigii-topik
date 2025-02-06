'use client'
import React, {useState} from 'react'
import x from "@/layouts/login/login.module.css"
import Link from 'next/link'
import { useDispatch } from 'react-redux';
import { loginUser } from '@/redux/apiRequest';
export default function Login() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const login = async() =>{
    const user= {username, password};
    await loginUser({user : user, dispatch});
  }
  return (
    <div className={x['container']}> 
      <div>
        <h3 style={{fontSize : '18px', fontWeight : 'normal'}}>Username</h3>
        <input type="text" onChange={(event) => setUsername(event.target.value)}/>
      </div>
      <div>
        <h3 style={{fontSize : '18px', fontWeight : 'normal'}}>Password</h3>
        <input type="text" placeholder='Combination of 8 of more alphabet or numbers'
        onChange={(event) => setPassword(event.target.value)}/>
      </div>
      <div style={ {display : 'flex', flexDirection : "row", flexWrap : 'nowrap', gap : '15px'}}>
        <button className={x['login']} onClick={login}>Login</button>
        <button className={x['register']}>Register</button>
        <Link href="/forgot" style={ {fontSize : '16px', textDecoration : 'none'}}>Did you forget your password?</Link>
      </div>
    </div>
  )
}
