'use client'
import React, {useState} from 'react'
import x from "@/app/layouts/register/register.module.css"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../redux/apiRequest';
export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const register = async () =>{ 
    const newUser   = {username, email, password};
    await registerUser({user : newUser, dispatch, navigate})
  }
  return (
    <div className={x['container']}>
      <div className={x['content']}>
        <div>
          <h1 style={{fontSize : '24px', fontWeight : 'bolder'}}>Create Acount</h1>
        </div>
        <div className={x['username']}>
          <h3 style={{fontSize : '18px', fontWeight : 'normal'}}>Username:</h3>
          <input type="text" onChange={(event) => setUsername(event.target.value)}/>
        </div>
        <div>
          <h3 style={{fontSize : '18px', fontWeight : 'normal'}}>Email:</h3>
          <input type="text" onChange={(event) => setEmail(event.target.value)}/>
        </div>
        <div>
          <h3 style={{fontSize : '18px', fontWeight : 'normal'}}>Password:</h3>
          <input type="text" onChange={(event) => setPassword(event.target.value)} />
        </div>
        <div>
        <h3 style={{fontSize : '18px', fontWeight : 'normal'}}>Password Again:</h3>
        <input type="text"/>
        </div>
        <div className={x['term']}>
          <input type='checkbox' />
          <span>I agree with the term of services</span>
        </div>
        <div>
          <button className={x['register']} onClick={register}>Register</button>
        </div>
      </div>
    </div>
  )
}
