import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import x from '@/css/signUpPopUp.module.css';
import { Button } from 'react-bootstrap';
interface SignUpPopUpProps {
  isShow: boolean;
  onClose: () => void;
}

export default function SignUpPopUp({ isShow, onClose }: SignUpPopUpProps) {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    console.log(userName);
    const validateInput = () =>{
        let isPassed = true;
        if (userName.length < 8 || /\s/.test(userName)) {
          alert('Username must be at least 8 characters long and contain no spaces');
          isPassed = false;
        } else if (!/\S+@\S+\.\S+/.test(email) || /\s/.test(email)) {
          alert('Email is not valid and should contain no spaces');
          isPassed = false;
        } else if (password.length < 8 || /\s/.test(password)) {
          alert('Password must be at least 8 characters long and contain no spaces');
          isPassed = false;
        } else {
        }
        return isPassed;
    }
    const postUser = async () =>{
        const isPassed = validateInput();
        if (!isPassed) {
            return;
        }
        try{ 
            const response = await fetch('http://localhost:5000/user', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    username : userName,
                    email : email,
                    password : password
                })
            })
            console.log(response);
            if(response.status === 200){
                alert('Sign up successfully');
                onClose();
            } 
            else if(response.status ===401){
                alert('Email is already exists');
            }
            else if(response.status === 402){
                alert('Username already exists');
            }
        }
        catch(e){
            console.log(e);
        }
    }
    return (
    <>
      {isShow && (
        <div className={x['signUpPopUp']}>
          <div className={x['signUpPopUp__container']}>
            <div className={x['signUpPopUp__container__header']}>
              <h2>Sign Up</h2>
              <button
                className={x['signUpPopUp__container__header__close']}
                onClick={onClose}
              >
                X
              </button>
            </div>
            <div className={x['signUpPopUp__container__content']}>
              <input 
              type="text" 
              placeholder="Username" 
              onChange={(e) => setUserName(e.target.value)}
              />
              <input 
              type="email" 
              placeholder="Email" 
              onChange={(e) => setEmail(e.target.value)}
              />
              <input 
              type="password" 
              placeholder="Password" 
              onChange={(e) => setPassword(e.target.value)}
              />
              <Button
              variant='danger'
              onClick={() => postUser()}
              >Sign Up</Button>
            </div>
            <div className={x['signUpPopUp__container__footer']}>
              <p>Already have an account? <Button>Log in</Button></p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}