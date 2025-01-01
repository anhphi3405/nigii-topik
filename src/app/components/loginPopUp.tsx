import React , {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import x from '@/css/loginPopUp.module.css';
import SignUpPopUp from './signUpPopUp';
import { Button } from 'react-bootstrap';
import validateLogIn from '@/validator/validateLogin';
import { LoginPopUpProps } from '../interface/login';
import {loginUser, apiResponse} from '@/redux/apiRequest';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function LoginPopUp({ isShow, onClose}: LoginPopUpProps) {
  const [isDisabledSignUpPopUp, setIsDisabledSignUpPopUp] = useState(false);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState(''); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const showSignUpPopUp = () =>{
    onClose();
    setIsDisabledSignUpPopUp(true);  
  }

  const handleLogIn = async () =>{
      const newUser = {username, password};
      // console.log(newUser);
      if(!validateLogIn(newUser)) return;
      await loginUser({ user: newUser, dispatch, navigate });
      if(apiResponse.loginState) {
        alert("Login Successful");
        onClose();
        window.location.reload();
      }
      else{
        alert("Login Failed");
      }
  }

  return (
    <>
      {isShow && (
        <div className={x['loginPopUp__overlay']}>
        <div className={x['loginPopUp']}>
          <div className={x['loginPopUp__container']}>
            <div className={x['loginPopUp__container__header']}>
              <h2>Log in</h2>
              <button
                className={x['loginPopUp__container__header__close']}
                onClick={onClose}
              >
                X
              </button>
            </div>
            <div className={x['loginPopUp__container__content']}>
              <input 
              type="text" 
              placeholder="Username" 
              onChange={(e) => setUserName(e.target.value)}
              />
              <input 
              type="password" 
              placeholder="Password" 
              onChange={(e) => setPassword(e.target.value)}
              />
              <Button
              onClick={() => handleLogIn()}
              >Log in</Button>
              <div className={x['loginPopUp__container__content__forgot']}>
                <a href="#">Forgot password?</a>
              </div>
            </div>
            <div className={x['loginPopUp__container__footer']}>
              <p>Dont have an account? <Button 
              variant='danger'
              onClick={() => showSignUpPopUp()}
              >Sign up</Button></p>
            </div>
          </div>
        </div>
        </div>
      )}
      {isDisabledSignUpPopUp && (
        <SignUpPopUp isShow={isDisabledSignUpPopUp} onClose={() => setIsDisabledSignUpPopUp(false)} />
      )}
    </>
  );
}

