import React , {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import x from '@/css/loginPopUp.module.css';
import SignUpPopUp from './signUpPopUp';
import { Button } from 'react-bootstrap';
interface LoginPopUpProps {
  isShow: boolean;
  onClose: () => void;
}

export default function LoginPopUp({ isShow, onClose }: LoginPopUpProps) {
  const [isDisabledSignUpPopUp, setIsDisabledSignUpPopUp] = useState(false);
  const showSignUpPopUp = () =>{
    onClose();
    setIsDisabledSignUpPopUp(true);
    
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
              <input type="text" placeholder="Username" />
              <input type="password" placeholder="Password" />
              <button>Log in</button>
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