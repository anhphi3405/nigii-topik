'use client'
import React , {useState} from 'react'
import { Button, Nav, NavLink, Image, Navbar, Row, Col } from 'react-bootstrap'
import x from '@/css/header.module.css'
import LoginPopUp from './loginPopUp'
export default function Header() {
    const [flag, setFlag] = useState('https://topik.migii.net/images/icons/ic_flag_en.png');
    const flags = ["https://topik.migii.net/images/icons/ic_flag_en.png", "https://topik.migii.net/images/icons/ic_flag_vi.png"];
    const [isDisabledFlags, setIsDisabledFlags] = useState(false);
    const [isDiableLoginPopUp, setIsDiableLoginPopUp] = useState(false);
    const changeFlag = (newFlag:string) =>{
        setFlag(newFlag);
        setIsDisabledFlags(false);
    }
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
                        <Button 
                        variant='primary'
                        onClick={() => setIsDiableLoginPopUp(true)}
                        className={x['header__login__button']}
                        >Log In</Button>
                    </Nav>
                </Col>
            </Row>
            <LoginPopUp isShow= {isDiableLoginPopUp} onClose={() => setIsDiableLoginPopUp(false)}/>

        </div>
    )
}
