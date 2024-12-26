import React , {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import x from '@/css/loginPopUp.module.css';
import SignUpPopUp from './signUpPopUp';
import { Button } from 'react-bootstrap';
import fetcher from '../api/fetcher';
import validateLogIn from '@/validator/validateLogin';
import userData from '../store/userData';
interface LoginPopUpProps {
  isShow: boolean;
  onClose: () => void;
  updateData: () => void;
}

export default function LoginPopUp({ isShow, onClose , updateData}: LoginPopUpProps) {
  const [isDisabledSignUpPopUp, setIsDisabledSignUpPopUp] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState(''); 
  const showSignUpPopUp = () =>{
    onClose();
    setIsDisabledSignUpPopUp(true);  
  }

  const handleLogIn = async () =>{
      if(!validateLogIn({userName, password})) return;
      try{
        const response = await fetcher.postCheckUser({userName, password});
          console.log(response);
          if(!response) return;
          if(response.status === 401){
              alert('Username or password is incorrect');
          }
          else if(response.status === 200){
              alert('Log in successfully');
              userData.setIgLogged(true);
              userData.setUserName(userName);
              updateData();
              onClose();
          }
      }
      catch(e){
          console.log(e);
      }
  }

  return (
    <>
      {isShow && (
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
      )}
      {isDisabledSignUpPopUp && (
        <SignUpPopUp isShow={isDisabledSignUpPopUp} onClose={() => setIsDisabledSignUpPopUp(false)} />
      )}
    </>
  );
}