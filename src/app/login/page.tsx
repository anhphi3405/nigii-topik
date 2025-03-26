'use client'
import React, {useState} from 'react'
import x from "@/layouts/login/login.module.css"
import Link from 'next/link'
import { useDispatch } from 'react-redux';
import { loginUser } from '@/redux/apiRequest';
import { useRouter } from 'next/navigation';
import { loginSuccess } from '@/redux/authSlice';
import axios from 'axios';
import y from '@/layouts/register/register.module.css';
export default function Login() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const login = async() =>{
    const user= {username, password};
    await loginUser({user : user, dispatch});
  }
  const [isLoginWithEmail, setIsLoginWithEmail] = useState(false);
  const router = useRouter();
  return (
    <div>
        <div className={x['container']} style={{display : isLoginWithEmail ? 'none' : 'grid'}}> 
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
        <span style={{fontSize : '16px', fontWeight : "bold", textAlign : 'start', color : 'blue', cursor : 'pointer', display : 'inline-block', width : '168px'}}
        onClick={() => {
          setIsLoginWithEmail(true);
          router.push('/login?email=true');
        }}>Login with your email</span>
      </div>
      {isLoginWithEmail && <LoginWithEmail />}
    </div>
  )
}

function LoginWithEmail() {
  const [email, setEmail] = useState("");
  const [isCheckCode, setIsCheckCode] = useState(false);
  const randomCode = () =>{
    return Math.floor(Math.random() * 1000000);
  }
  const submitEmail = () => {
    const random_code = randomCode();
    console.log(random_code);
    try{
      axios.post('http://localhost:5000/v1/auth/loginByEmail', {email, code : random_code})
    }
    catch(e){
      console.log(e);
    }
  }
  return (
    <div>
      <div style={{display : isCheckCode ? 'none' : 'block'}}>
        <h3 style={{fontSize : '16px', fontWeight : "bold", textAlign : 'center'}}>Login with your email</h3>
        <div style={{display : 'flex', justifyContent : 'center'}}>
          <input type="text" placeholder='your email...' style={{width : '50%', paddingLeft : '10px'}}
          onChange={(event)=> setEmail(event.target.value)}/>
        </div>
        <div style={{display : 'flex', justifyContent : 'center', marginTop : '10px'}}>
          <button className={y['submit']}
          onClick={() => {
            submitEmail();
            setIsCheckCode(true);
          }}>Submit</button>
        </div>
      </div>
        {isCheckCode && <CheckCode />}
    </div>
  )  
}


function CheckCode () {
  const [code, setCode] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const sendCode = async () => {
    try{
      await axios.post('http://localhost:5000/v1/auth/checkLoginCode', {code})
      .then((res) => {
        console.log(res.data);
        dispatch(loginSuccess(res.data));
        alert('Login successfully');
        router.push('/');
      })
    }
    catch(e){
      console.log(e);
    }
  }
  return (
    <div style = {{display : 'flex', flexDirection : 'column', gap : '10px'}}>
      <h3 style={{fontSize : '16px', fontWeight : "bold", textAlign : 'center'}}>Please enter the code we sent you</h3>
      <div style = {{display : 'flex', justifyContent : 'center'}}>
              <input type="text" placeholder='Enter the code...' style={{width : '40%', paddingLeft : 'calc(20% - 55px)'}}
       onChange={(event) => setCode(event.target.value)}/>
      </div>  
       <div style = {{display : 'flex', justifyContent : 'center'}}>
                <button className={y['verify']}
       onClick={sendCode}>Verify</button>
       </div>
    </div>
  );
}
