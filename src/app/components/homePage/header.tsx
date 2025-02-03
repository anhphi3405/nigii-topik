import React from 'react'
import x from '@/app/layouts/homePage/header.module.css'
export default function Header() {
  return (
    <div className={x["container"]}>
      <div className={x['logo']}>
        <img style={{width: '100px', height: '40px'}} src="https://topikexam.com/images/logo.png" alt="" />
      </div>
      <div className={x['user']}>
        <button style={{width : '60px', height : '25px', marginRight : '10px'}}>Login</button>
        <button style={{width : '60px', height : '25px'}}>Register</button>
      </div>
    </div>
  )
}
