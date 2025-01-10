import React from 'react'
import x from '@/layout/homePage/learningMaterial.module.css'
export default function LearningMaterial() {
  return (
    <div>
        <div className={x['learningMaterial']}> 
            <h4 style={{textAlign : 'center'}}>LEARNING MATERIAL - EXERCISES - EXAMS AT JUST 1/3 THE COST OF A CENTER</h4>
            <div className={x['compare-course']}>
              <h4 style={{marginLeft : '80%'}}>Free Premium</h4>
              <div className={x['row']}>
                <span style={{fontSize : '18px', marginRight : '60%'}}>Unlock all exam exercises</span>
                <i className="fa-solid fa-x" style={{color : 'red', fontSize: '18px', transform : 'translateX(-300%)'}}></i>
                <i className="fa-solid fa-check" style={{color : 'green', fontSize : '18px'}}></i>
              </div>
              <div style={{border : '1px solid black', marginTop: '5px', marginBottom : '10px'}}></div>
              <div className={x['row']}> 
                <span style={{fontSize : '18px', marginRight : '46%'}}>Continuously update new practice tests</span>
                <i className="fa-solid fa-x" style={{color : 'red', fontSize: '18px', transform : 'translateX(-300%)'}}></i>
                <i className="fa-solid fa-check" style={{color : 'green', fontSize : '18px'}}></i>                
              </div>
            <div style={{border : '1px solid black', marginTop: '5px', marginBottom : '10px'}}></div>
              <div className={x['row']}> 
                <span style={{fontSize : '18px', marginRight : '76%'}}>Use offline</span>
                <i className="fa-solid fa-x" style={{color : 'red', fontSize: '18px', transform : 'translateX(-300%)'}}></i>
                <i className="fa-solid fa-check" style={{color : 'green', fontSize : '18px'}}></i>                
              </div>
            <div style={{border : '1px solid black', marginTop: '5px', marginBottom : '10px'}}></div>
              <div className={x['row']}> 
                <span style={{fontSize : '18px', marginRight : '69.5%'}}>Learning material</span>
                <i className="fa-solid fa-check" style={{color : 'red', fontSize: '18px', transform : 'translateX(-300%)'}}></i>
                <i className="fa-solid fa-check" style={{color : 'green', fontSize : '18px', transform : 'translateX(-50%)'}}></i>                
              </div>
            <div style={{border : '1px solid black', marginTop: '5px', marginBottom : '10px'}}></div>
              <div className={x['row']}> 
                <span style={{fontSize : '18px', marginRight : '66.5%'}}>Exam tips and tricks</span>
                <i className="fa-solid fa-check" style={{color : 'red', fontSize: '18px', transform : 'translateX(-300%)'}}></i>
                <i className="fa-solid fa-check" style={{color : 'green', fontSize : '18px', transform : 'translateX(-50%)'}}></i>                   
              </div>
            <div style={{border : '1px solid black', marginTop: '5px', marginBottom : '10px'}}></div>
              <div className={x['row']}> 
                <span style={{fontSize : '18px', marginRight : '70.5%'}}>EPS vocabulary</span>
                <i className="fa-solid fa-check" style={{color : 'red', fontSize: '18px', transform : 'translateX(-300%)'}}></i>
                <i className="fa-solid fa-check" style={{color : 'green', fontSize : '18px', transform : 'translateX(-50%)'}}></i>                   
              </div>
            <div style={{border : '1px solid black', marginTop: '5px', marginBottom : '10px'}}></div>
            </div>
        </div>
    </div>
  )
}
