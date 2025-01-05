import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import x from '@/layout/homePage/signUpPopUp.module.css'
import { Button } from 'react-bootstrap';
import validateSignUp from '@/validator/validateSignUp';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SignUpPopUpProps } from '@/helper/interface/signUp';
import { registerUser} from '@/redux/apiRequest';

export default function SignUpPopUp({ isShow, onClose }: SignUpPopUpProps) {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleRegister = async () =>{
        const newUser = {username, email, password};
        if(!validateSignUp(newUser)) return;
        await registerUser({user : newUser, dispatch, navigate});
    }
    return (
    <>
      {isShow && (
        <div className={x['signUpPopUp__overlay']}>
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
              onClick={() =>  handleRegister()}
              >Sign Up</Button>
            </div>
            <div className={x['signUpPopUp__container__footer']}>
              <p>Already have an account? <Button>Log in</Button></p>
            </div>
          </div>
        </div>
        </div>
      )}
    </>
  );
}