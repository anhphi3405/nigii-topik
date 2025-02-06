'use client'
import React from 'react'
import x from "@/layouts/topik-i/reading.module.css"
import { useRouter } from 'next/navigation'
export default function Reading() {
    const router = useRouter();
    const listening = ()=>{
        router.replace("listening");
    }
  return (
    <div className={x['container']}>
        <div style={{display : 'grid', gridTemplateRows : '1fr 1fr'}}>
            <div className={x['practice']}>  
            <h3 style={{fontSize : '18px'}}>Practice</h3> 
            <span><i className="fa-solid fa-play" style={{fontSize : '12px'}}></i></span>
            <h3 style={{fontSize : '18px'}}>TOPIK I</h3>
            </div>
            <div style={{display : 'flex', gap : '20px', alignItems : 'center'}}> 
                <button onClick={listening} 
                style={{border : 'none', outline : 'none', backgroundColor : 'orange', 
                    borderRadius : '15px', width : '100px', height : '30px', color : "white"
                }}>Listening</button>
                <button style={{border : 'none', outline : 'none', backgroundColor : 'green', 
                    borderRadius : '15px', width : '100px', height : '30px', color : "white"
                }}>Reading</button>
            </div>
        </div>
        <div className={x['part']}>
            <div className={x['part-item1']}
            onClick={()=>{
                window.location.href = "/practice/detail/67a46837f14a2d1f92688ca2";}}>
                <div style={{display : 'flex', alignItems : 'center'}}>
                    <h1 style={{fontSize : '24px'}}>Part 1 - Sentence topic</h1>
                </div>
                <div style={{display : 'flex', alignItems : 'center'}}>
                    <h3 style={{fontSize : '18px', fontWeight : 'normal'}}>Correct</h3>
                </div>
                <div style={{display : 'flex', alignItems : 'center'}}>
                    <h3 style={{fontSize : '18px', fontWeight : 'normal'}}>Correct ratio</h3>
                    <div className={x['solid']}></div>
                </div>
            </div>
            <div className={x['part-item1']}>
                <div style={{display : 'flex', alignItems : 'center'}}>
                    <h1 style={{fontSize : '24px'}}>Part 2 - Next sentence</h1>
                </div>
                <div style={{display : 'flex', alignItems : 'center'}}>
                    <h3 style={{fontSize : '18px', fontWeight : 'normal'}}>Correct</h3>
                </div>
                <div style={{display : 'flex', alignItems : 'center'}}>
                    <h3 style={{fontSize : '18px', fontWeight : 'normal'}}>Correct ratio</h3>
                    <div className={x['solid']}></div>
                </div>
            </div>
            <div className={x['part-item1']}>
                <div style={{display : 'flex', alignItems : 'center', justifyContent : 'space-between'}}>
                    <h1 style={{fontSize : '24px'}}>Part 3 - Where is it?</h1>
                    <span style={{marginRight : '10px'}}><i className="fa-solid fa-lock" style={{color : 'blue'}}></i></span>
                </div>
                <div style={{display : 'flex', alignItems : 'center'}}>
                    <h3 style={{fontSize : '18px', fontWeight : 'normal'}}>Correct</h3>
                </div>
                <div style={{display : 'flex', alignItems : 'center'}}>
                    <h3 style={{fontSize : '18px', fontWeight : 'normal'}}>Correct ratio</h3>
                    <div className={x['solid']}></div>
                </div>
            </div>
            <div className={x['part-item1']}>
                <div style={{display : 'flex', alignItems : 'center',  justifyContent : 'space-between'}}>
                    <h1 style={{fontSize : '24px'}}>Part 4 - Main idea</h1>
                    <span style={{marginRight : '10px'}}><i className="fa-solid fa-lock" style={{color : 'blue'}}></i></span>
                </div>
                <div style={{display : 'flex', alignItems : 'center'}}>
                    <h3 style={{fontSize : '18px', fontWeight : 'normal'}}>Correct</h3>
                </div>
                <div style={{display : 'flex', alignItems : 'center'}}>
                    <h3 style={{fontSize : '18px', fontWeight : 'normal'}}>Correct ratio</h3>
                    <div className={x['solid']}></div>
                </div>
            </div>
            <div className={x['part-item1']}>
                <div style={{display : 'flex', alignItems : 'center',   justifyContent : 'space-between'}}>
                    <h1 style={{fontSize : '24px'}}>Part 5 - Choose Picture</h1>
                    <span style={{marginRight : '10px'}}><i className="fa-solid fa-lock" style={{color : 'blue'}}></i></span>
                </div>
                <div style={{display : 'flex', alignItems : 'center'}}>
                    <h3 style={{fontSize : '18px', fontWeight : 'normal'}}>Correct</h3>
                </div>
                <div style={{display : 'flex', alignItems : 'center'}}>
                    <h3 style={{fontSize : '18px', fontWeight : 'normal'}}>Correct ratio</h3>
                    <div className={x['solid']}></div>
                </div>
            </div>
            <div className={x['part-item1']}>
                <div style={{display : 'flex', alignItems : 'center',  justifyContent : 'space-between'}}>
                    <h1 style={{fontSize : '24px'}}>Part 6 - Conversation content</h1>
                    <span style={{marginRight : '10px'}}><i className="fa-solid fa-lock" style={{color : 'blue'}}></i></span>
                </div>
                <div style={{display : 'flex', alignItems : 'center'}}>
                    <h3 style={{fontSize : '18px', fontWeight : 'normal'}}>Correct</h3>
                </div>
                <div style={{display : 'flex', alignItems : 'center'}}>
                    <h3 style={{fontSize : '18px', fontWeight : 'normal'}}>Correct ratio</h3>
                    <div className={x['solid']}></div>
                </div>
            </div>
            <div className={x['part-item1']}>
                <div style={{display : 'flex', alignItems : 'center',  justifyContent : 'space-between'}}>
                    <h1 style={{fontSize : '24px'}}>Part 7 - Choose thoughts</h1>
                    <span style={{marginRight : '10px'}}><i className="fa-solid fa-lock" style={{color : 'blue'}}></i></span>
                </div>
                <div style={{display : 'flex', alignItems : 'center'}}>
                    <h3 style={{fontSize : '18px', fontWeight : 'normal'}}>Correct</h3>
                </div>
                <div style={{display : 'flex', alignItems : 'center'}}>
                    <h3 style={{fontSize : '18px', fontWeight : 'normal'}}>Correct ratio</h3>
                    <div className={x['solid']}></div>
                </div>
            </div>
            

        </div>
    </div>
  )
}
