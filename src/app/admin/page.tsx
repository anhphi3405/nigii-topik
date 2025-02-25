'use client'
import React, { useState } from 'react'
import { useAppSelector } from '@/redux/store'
import { useRouter } from 'next/navigation';
import x from '@/layouts/admin/admin.module.css'
interface User {
    role : string;
}
export default function Admin() {
    const user = useAppSelector(state => state.auth.login.currentUser) as User | null;
    const router = useRouter();
    if(!user || user.role !== "admin"){
        alert("You are not authorized to view this page");
        router.push("/");
    }
    const [isDashboardsOpen, setIsDashboardsOpen] = useState(false);
  return (
    <div className={x['container']}>
      <div className={x['menu']}>
        <h3 style={{color : 'blue', fontSize : '18px'}}>Menu</h3>
        <div className={x['dash_boards']} onClick={() => setIsDashboardsOpen(!isDashboardsOpen)}>
            <div style={{display : 'flex', gap : '10px', alignItems : 'center', justifyContent : 'center'}} >
                <i className="fa-brands fa-space-awesome " style={{color : 'white'}}></i>
                <h3 style={{fontSize : '18px'}}>Dashboards</h3>
            </div>
            <div style={{display : 'flex', justifyContent : 'flex-end', paddingRight : '10px', alignItems : 'center'}}>
                <i className="fa-solid fa-chevron-down"></i>
            </div>

        </div>
        {isDashboardsOpen ? (
                <div style={{display : 'flex', flexDirection : 'column', gap : '10px', }}>
                    <div className={x['dash_boards_drop']}>
                        <span>Analytics</span>
                    </div>
                    <div className={x['dash_boards_drop']}>
                        <span>Exams</span>
                    </div>
                </div>
            ) : null}
      </div>
      <div></div>
    </div>
  )
}
