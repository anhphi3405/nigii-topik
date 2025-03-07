'use client'
import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '@/redux/apiRequest';
import x from '@/layouts/register/register.module.css';
import { useRouter } from 'next/navigation';
import axios from 'axios';
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
  const [isUseEmail, setIsUseEmail] = useState(false);
  const router = useRouter();
  return (
    <div className={x['container']}>
      <div className={x['content']} style={{display : isUseEmail ? 'none' : 'grid'}}>
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
        <div>
          <h3 style={{color : 'blue', cursor : 'pointer', fontSize : '16px', fontWeight : 'bold'}}
          onClick={() => {setIsUseEmail(true);
            router.push('/register?email=true')
          }
        }> Continue with your email  </h3>
        </div>
      </div>
      {isUseEmail && <RegisterEmail />}
    </div>
  )
}

function RegisterEmail() {
  const [email, setEmail] = useState("");
  const [isCheckCode, setIsCheckCode] = useState(false);
  const randomCode = () =>{
    return Math.floor(Math.random() * 1000000);
  }
  const submitEmail = () => {
    const random_code = randomCode();
    console.log(random_code);
    try{
      axios.post('http://localhost:5000/v1/auth/registerByEmail', {email, code : random_code})
    }
    catch(e){
      console.log(e);
    }
  }
  return (
    <div>
      <div style={{display : isCheckCode ? 'none' : 'block'}}>
        <h3 style={{fontSize : '16px', fontWeight : "bold", textAlign : 'center'}}>Register with your email</h3>
        <input type="text" placeholder='your email...' style={{width : '100%', paddingLeft : '10px'}}
        onChange={(event)=> setEmail(event.target.value)}/>
        <div style={{display : 'flex', justifyContent : 'center', marginTop : '10px'}}>
          <button className={x['submit']}
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
  const sendCode = async () => {
    try{
      await axios.post('http://localhost:5000/v1/auth/checkcode', {code})
      .then((res) => {
        console.log(res.data);
        alert('Register successfully');
        router.push('/login');
      })
    }
    catch(e){
      console.log(e);
    }
  }
  return (
    <div>
      <h3 style={{fontSize : '16px', fontWeight : "bold", textAlign : 'center'}}>Please enter the code we sent you</h3>
      <input type="text" placeholder='Enter the code...' style={{width : '100%', paddingLeft : 'calc(50% - 55px)'}}
       onChange={(event) => setCode(event.target.value)}/>
       <button className={x['verify']}
       onClick={sendCode}>Verify</button>
    </div>
  );
}
