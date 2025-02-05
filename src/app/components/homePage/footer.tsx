import React from 'react'
import x from '@/app/layouts/homePage/footer.module.css'
export default function Footer() {
  return (
    <div className={x['footer']}>
      <div>
      <div className={x['copy-right']}>
          <h5 style={{fontSize : '14px', fontWeight : 'normal'}}>CopyRight 2022 by TOPIK EXAM. All Right Reserved.</h5>
        </div>
      </div>
      <div>
      <div className={x['language']}>
          <button>English <span><i className="fa-solid fa-angle-down"></i></span></button>
        </div>
      </div>
    </div>
  )
}
