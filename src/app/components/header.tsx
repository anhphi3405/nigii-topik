'use client'
import React , {useState, useEffect} from 'react'
import { Button, Nav, NavLink, Image, Navbar, Row, Col } from 'react-bootstrap'
import x from '@/css/header.module.css'
import LoginPopUp from './loginPopUp'
import userData from '../store/userData';
import User from '../interface/user'
import { apiResponse } from '@/redux/apiRequest'
export default function Header() {
    const flags = ["https://topik.migii.net/images/icons/ic_flag_en.png", "https://topik.migii.net/images/icons/ic_flag_vi.png"];
    const [flag,setFlag] = useState(flags[0]);
    const [isDisabledFlags, setIsDisabledFlags] = useState(false);
    const [isDiableLoginPopUp, setIsDiableLoginPopUp] = useState(false);
    const [isLogged, setIsLogged] = useState(apiResponse.loginState);
    const [user ] = useState<User>();
    const changeFlag = (newFlag:string) =>{
        userData.setFlag(newFlag);
        setFlag(newFlag);
        setIsDisabledFlags(false);
    }
    const updateUserData  = async() => {
        console.log('update user data');
        const flag = userData.getFlag();
        if(flag) setFlag(flag)
        setIsLogged(apiResponse.loginState);
    }
    useEffect(()=>{
        updateUserData();
    },[])
    return (
        <div>
        <Row className={x['header']}>
                <Col  className={x['header__logo']}>
                    <Navbar.Brand href="/">
                    <Image 
                    src='https://topik.migii.net/images/migii/logo_topik_mobile.webp'
                    alt=''
                    width={80}
                    height={40}
                    className="d-inline-block align-center"
                    />
                </Navbar.Brand>
                </Col>
                <Col >
                    <Nav className=''>
                        <NavLink href="/" id={x['navLinks']}>Roadmap</NavLink>
                        <NavLink href="/about" id={x['navLinks']}>Topik practice</NavLink>
                        <NavLink href="/contact" id={x['navLinks']}>Mock Test</NavLink>
                        <NavLink href="/login" id={x['navLinks']}>Upgrade</NavLink>
                        <NavLink href="/signup" id={x['navLinks']}>About Migii</NavLink>
                        <Image 
                        src={flag}
                        alt=''
                        width={30}
                        height={30}
                        className={x['header__flag']}
                        onClick={() => setIsDisabledFlags(true)}
                        />
                        {isDisabledFlags === true ? (
                            <div className={x['header__flag__dropdown']}>
                                {flags.map((flag, index) => (
                                    <Image 
                                    key={index}
                                    src={flag}
                                    alt=''
                                    width={30}
                                    height={30}
                                    className={x['header__flag__dropdown__item']}
                                    onClick={() => changeFlag(flag)}
                                    />
                                ))}
                            </div>
                        ) : null}
                        {isLogged===true ? (
                            <Button
                                className={x['header__logout__button']}
                                variant='primary'
                                onClick={() => {
                                    setIsLogged(false);
                                    
                                }}
                            >
                            Log out
                            </Button>
                        ) : 
                        <Button 
                        variant='primary'
                        onClick={() => setIsDiableLoginPopUp(true)}
                        className={x['header__login__button']}
                        >Log In</Button>
                        }
                        {isLogged === true && user &&  user.avatar ? (
                        <Image
                        className={x['header__avatar']}
                        src={user.avatar}
                        width={40}
                        height={40}
                        alt='Avatar'
                        
                        />
                    ) : null}
                    </Nav>
                </Col>
            </Row>

            <LoginPopUp isShow= {isDiableLoginPopUp} onClose={() => setIsDiableLoginPopUp(false) } />
        </div>
    )
}
