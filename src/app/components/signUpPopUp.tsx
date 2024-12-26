import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import x from '@/css/signUpPopUp.module.css';
import { Button } from 'react-bootstrap';
import validateSignUp from '@/validator/validateSignUp';
import fetcher from '../api/fetcher';
interface SignUpPopUpProps {
  isShow: boolean;
  onClose: () => void;
}

export default function SignUpPopUp({ isShow, onClose }: SignUpPopUpProps) {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    console.log(userName);
    const handlePostUser = async () =>{
        if(!validateSignUp({userName, email, password})) return;
        try{ 
            const response = await fetcher.postUser({userName, email, password});
            console.log(response);
            if(!response) return;
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
              onClick={() => handlePostUser()}
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