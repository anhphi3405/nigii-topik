'use client'
import React from 'react'
import x from '@/layouts/homePage/homePage.module.css'
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const start = ()=>{
    router.push("/practice/topik-i/listening");
  }
  return (
    <div className={x['container']}>
      <div className={x['grid-item1']}>
        <div>
          <h1 style={{fontSize: '30px', fontWeight: 'bold', textAlign : 'center'}}>
            Study 20 Questions A Day For 30 Days.
          </h1>
        </div>
        <div style={{display: 'flex'}}>
          <div style={{display : 'flex', gap : '15px', flexDirection : 'column', padding : '20px'}}>
            <h5 style={{fontSize : '18px'}}> After solving the problem</h5>
            <h5 style={{fontSize : '18px'}}>Check the #tags</h5>
            <h5 style={{fontSize : '18px'}}> Listen to the #tag lecture</h5>
            <h5 style={{fontSize : '18px'}}> Try to solve the questions related to the #tag.</h5>
          </div>
          <div className={x['study']}>
            <img src="https://topikexam.com/_next/static/media/mainTop.c1ce3639d43fb4f3b8d5023429ed3534.jpg" alt="" />
          </div>
        </div>
      </div>
      <div className={x['grid-item2']}>
          <div className={x['youtube']}>
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/WBl31Pyr_M8?si=GwM2k60mCW9scrZm" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
      </div>
      <div className={x['grid-item3']}>
        <div className={x['test1']}>
          <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQsEwwFnNBk-ShJkr7WrYxUUapvSYHzJeZ3g&s" alt="" />
          </div>
          <div>
            <h1 style={{textAlign : 'center'}}>TEST 1 <span style={{fontSize : '24px'}}>Previous question</span></h1>
          </div>
          <div style={{display : 'grid',gridTemplateColumns : '2fr 1fr 2fr' , }}>
            <div className={x['to-solve']}>
              <h3 style={{fontSize : '18px', textAlign : "center"}}>to solve</h3>
              <h2 style={{fontSize : '24px', textAlign : 'center'}}>560</h2>
              <button onClick={start} className={x['start']}>Start</button>
            </div>
            <div style={{display : 'flex', flexDirection : 'column', paddingTop : '10px'}}>
              <h5 style={{fontSize : '18px', textAlign : "center"}}>solved</h5>
              <h5 style={{fontSize : '24px', textAlign : "center"}}>0</h5>
              <button className={x['view']}>View</button>
            </div>
            <div style={{paddingLeft : '20px'}}>
            <div className={x['circle']}>
              <span style={{fontSize : '24px', display : 'flex', justifyContent : 'center', marginTop : 'calc(50% - 13px)'}}>0%</span>
            </div>
            </div>
          </div>
          <div style={{display : 'flex', justifyContent : 'center', gap : '30px'}}>
            <button className={x['lecture']}>Lecture(122)</button>
            <button className={x['community']}>Community(1)</button>
          </div>
          <div />
        </div>
      </div>
      <div className={x['grid-item4']}>
        <div className={x['test1']}>
        <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQsEwwFnNBk-ShJkr7WrYxUUapvSYHzJeZ3g&s" alt="" />
          </div>
        <div>
            <h1 style={{textAlign : 'center'}}>TEST 2 <span style={{fontSize : '24px'}}>Previous question</span></h1>
          </div>
          <div style={{display : 'grid',gridTemplateColumns : '2fr 1fr 2fr' , }}>
            <div className={x['to-solve']}>
              <h3 style={{fontSize : '18px', textAlign : "center"}}>to solve</h3>
              <h2 style={{fontSize : '24px', textAlign : 'center'}}>832</h2>
              <button className={x['start']}>Start</button>
            </div>
            <div style={{display : 'flex', flexDirection : 'column', paddingTop : '10px'}}>
              <h5 style={{fontSize : '18px', textAlign : "center"}}>solved</h5>
              <h5 style={{fontSize : '24px', textAlign : "center"}}>0</h5>
              <button className={x['view']}>View</button>
            </div>
            <div style={{paddingLeft : '20px'}}>
            <div className={x['circle']}>
              <span style={{fontSize : '24px', display : 'flex', justifyContent : 'center', marginTop : 'calc(50% - 13px)'}}>0%</span>
            </div>
            </div>
          </div>
          <div style={{display : 'flex', justifyContent : 'center', gap : '30px'}}>
            <button className={x['lecture']}>Lecture(23)</button>
            <button className={x['community']}>Community(168)</button>
          </div>
        </div>
        
      </div>
    </div>
  )
}
