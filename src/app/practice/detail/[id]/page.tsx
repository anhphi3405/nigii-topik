'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import {fetchQuestions} from '@/redux/apiRequest';
import ConfigAxios from '@/helper/config/configAxios';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/redux/store';
import x from '@/layouts/practice/detail.module.css'
interface question {
  correct_option : number,
  explanation : string,
  options : string[],
  question_text : string
  _id : string
}
export default function Page() {
  const { id } = useParams();
  const axiosJWT = ConfigAxios.ConfigJWT();
  const dispatch = useDispatch();
  useEffect(() =>{
    fetchQuestions({ dispatch,axiosJWT,id}) ;
  }, [])
  const questions = useAppSelector((state) => state.questions.fetchQuestions.questions) as question[] | null;
  const [done, setDone] = useState(1);
  const [isExplaining, setIsExplaining] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(questions ? questions[done - 1] : null);
  const [state_option, setOption] = useState<string[]>(Array(4).fill(''));
  const next = () =>{
    setDone(Math.min(done + 1, questions?.length || 1));
    setCurrentQuestion(questions ? questions[done] : null);
    const newOption = [...state_option];
    newOption.fill('');
    setOption(newOption);
  }
  const prev = () =>{
    setDone(Math.max(done - 1, 1));
    setCurrentQuestion(questions ? questions[done - 2] : null);
    const newOption = [...state_option];
    newOption.fill('');
    if(choosens[done - 2] != questions![done - 2].correct_option){
      newOption[choosens[done - 2] - 1] = 'red';
    }
    newOption[questions![done - 2].correct_option - 1] = 'green';
    setOption(newOption);
  }
  const[choosens, setChoosens] = useState<number[]>(Array(questions?.length).fill(0));
  const answer = async (option : number) =>{
    if(choosens[done - 1] !== 0) return;
    const newChoosens = [...choosens];
    newChoosens[done - 1] = option;
    setChoosens(newChoosens);
    const newOption = [...state_option];
    if (currentQuestion) {
      newOption[currentQuestion.correct_option - 1] = 'green';
    }
    if(option !== currentQuestion?.correct_option){
      newOption[option - 1] = 'red';
    }
    setOption(newOption);
  }
  console.log(choosens[done-1] + " " + currentQuestion?.correct_option);
  return (
    <div className={x['container']}>
      <div className={x['question']} style={{paddingBottom : isExplaining ? '30%' : '40%'}}>
        <div className={x['head']}>
          <span style={{fontSize : "18px"}}> {done} </span> <span style={{fontSize : "18px", marginRight : '20px'}}>/15</span>
          <div style={{display : "grid", gridTemplateColumns : `${done}fr ${15 - done}fr`,width : "100%", height : '10px', boxShadow : '0 0 5px 0px #000'}}>
            <div style={{backgroundColor : 'orange'}}></div>
            <div></div>
          </div>
        </div>
        <div className={x['content']}>
          <div className={x['no-explain']}>
            <div style={{display : 'flex', alignItems : 'center', justifyContent : 'space-between'}}>
              <span style={{ fontSize : '18px'}}>Question {done}</span> 
              <span><i className="fa-solid fa-bug" style={{fontSize : "30px", marginRight : '15px'}}></i></span>
            </div>
            <div>
              <span style={{marginLeft : '75px', fontSize : '24px'}}> {currentQuestion?.question_text} </span> <br />
              <span style={{marginLeft : '90px', fontSize : '18px', fontWeight : 'normal'}}> 1 : {currentQuestion?.options[0]} </span> <br />
              <span style={{marginLeft : '90px', fontSize : '18px', fontWeight : 'normal' }}>  2 : {currentQuestion?.options[1]} </span> <br />
              <span style={{marginLeft : '90px', fontSize : '18px', fontWeight : 'normal'}}> 3 : {currentQuestion?.options[2]} </span> <br />
              <span style={{marginLeft : '90px', fontSize : '18px', fontWeight : 'normal'}}> 4 : {currentQuestion?.options[3]} </span> <br />
            </div>
            <div style={{display : 'flex', alignItems : 'center', gap : '40px'}}>
                <div className={x['answer']}>
                  <h5 style={{textAlign : 'end'}}>1</h5>
                  <button className={x['option']} style={{backgroundColor : `${state_option[0]}`}} onClick={() => {
                    answer(1);
                  }}></button>
                </div>
                <div className={x['answer']}>
                  <h5 style={{textAlign : 'end'}}>2</h5>
                  <button className={x['option']} style={{backgroundColor :  `${state_option[1]}`}} onClick={() => answer(2)}></button>
                </div>
                <div className={x['answer']}>
                  <h5 style={{textAlign : 'end'}}>3</h5>
                  <button className={x['option']} style={{backgroundColor : `${state_option[2]}`}} onClick={() => answer(3)}></button>
                </div>
                <div className={x['answer']}>
                  <h5 style={{textAlign : 'end'}}>4</h5>
                  <button className={x['option']} style={{backgroundColor : `${state_option[3]}`}} onClick={() => answer(4)}></button>
                </div>
            </div>
            <div style={{display : 'grid', paddingLeft : '20px'}}>
            <button className = {x['explain-btn']} onClick={()=> setIsExplaining(true)}
              style={{backgroundColor : isExplaining ? 'red' : 'green'}}>Explain</button>
            </div>
          </div>
          {
            isExplaining ? (
              <div className={x['explain']}>
                  <h3 style={{fontSize : '18px', fontWeight : 'normal'}}> {currentQuestion?.explanation} </h3>
                  <button className={x['hide_explain-btn']}
                  onClick={() => setIsExplaining(false)}>Hide explanation</button>
              </div>
            ) : null
          }
        </div>
          <div style={{display : 'flex', justifyContent : 'flex-end', paddingRight : '33px', gap : '15px'}} >
            {done > 1 ? (
              <button className={x['next']} onClick={prev}>
              <span><i className="fa-solid fa-chevron-left"></i></span> Previous</button>
            ) : null}
          <button className={x['next']} onClick={next}>Next <span><i className="fa-solid fa-chevron-right"></i></span> </button>
          </div>
      </div>
      <div className={x['overview']}>
        <div className={x['overview-options']}>
          <h1 style={{textAlign : 'center', fontSize : '26px'}}>Overview</h1>
          <div style={{display : 'grid', gridTemplateRows : `repeat(${questions?.length}, 1fr)`, gap : '10px'}}>
            {questions?.map((question, index) => (
              <div key={index} className={x['overview-option']}>
                  <span>( {index + 1} )</span>
                  <button className={x['option']}>1</button>
                  <button className={x['option']}>2</button>
                  <button className={x['option']}>3</button>
                  <button className={x['option']}>4</button>
              </div>
            ))}
          </div>
        </div>
        <div style={{display : 'flex', justifyContent : 'center'}}>
          <button className={x['submit']}>Submit</button>
        </div>
      </div>
    </div>
  )
}
