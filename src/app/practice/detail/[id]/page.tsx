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
  const [done, setDone] = useState(0);
  const [isExplaining, setIsExplaining] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(questions ? questions[done] : null);
  const [options, setOptions] = useState<number[]>([1, 2, 3, 4]);
  const create2Darray = (rows: number, cols: number, defaultValue: string): string[][] => {
    const arr = [];
    for (let i = 0; i < rows; i++) {
      arr.push([]);
      for (let j = 0; j < cols; j++) {
        arr[i].push(defaultValue);
      }
    }
    return arr;
  }
  const [answers, setAnswer] = useState<number[]>(Array(questions?.length as number).fill(0));
  const [optionColor, setOptionColor] = useState<string[][]>(create2Darray(questions?.length as number, 4, ''));
  const next = () =>{
    setDone(Math.min(done + 1, questions?.length as number - 1));
    setCurrentQuestion(questions ? questions[done + 1] : null);
  }
  const prev = () =>{
    setDone(Math.max(done - 1, 0));
    setCurrentQuestion(questions ? questions[done - 1] : null);
  }

  const answer = async (option : number) =>{
    if(answers[done]!=0) return;
    const newAnswers = [...answers];
    newAnswers[done] = option;
    setAnswer(newAnswers);
    const newOptionColor = [...optionColor];
    if(option != currentQuestion?.correct_option){
      newOptionColor[done][option - 1] = 'red';
    }
    if (currentQuestion) {
      newOptionColor[done][currentQuestion.correct_option - 1] = 'green';
    }
    setOptionColor(newOptionColor);
  }
  console.log(questions)
  return (
    <div className={x['container']}>
      <div className={x['question']} style={{paddingBottom : isExplaining ? '30%' : '40%'}}>
        <div className={x['head']}>
          <span style={{fontSize : "18px"}}> {done + 1} </span> <span style={{fontSize : "18px", marginRight : '20px'}}>/15</span>
          <div style={{display : "grid", gridTemplateColumns : `${done + 1}fr ${15 - done -1 }fr`,width : "100%", height : '10px', boxShadow : '0 0 5px 0px #000'}}>
            <div style={{backgroundColor : 'orange'}}></div>
            <div></div>
          </div>
        </div>
        <div className={x['content']}>
          <div className={x['no-explain']}>
            <div style={{display : 'flex', alignItems : 'center', justifyContent : 'space-between'}}>
              <span style={{ fontSize : '18px'}}>Question {done + 1}</span> 
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
                {options.map((option, index) => (
                  <div key={index} className={x['answer']}>
                    <h5 style={{textAlign : 'end'}}>{option}</h5>
                    <button className={x['option']} style={{backgroundColor : `${optionColor[done][option -1 ]}`}} onClick={() => {
                      answer(option);
                    }}></button>
                    </div>
                ))}
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
            {done > 0 ? (
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
                  <button className={x['option']} style={{backgroundColor :  `${optionColor[index][0]}`  }} >1</button>
                  <button className={x['option']} style={{backgroundColor :  `${optionColor[index][1]}`  }}>2</button>
                  <button className={x['option']} style={{backgroundColor :  `${optionColor[index][2]}`  }}>3</button>
                  <button className={x['option']} style={{backgroundColor :  `${optionColor[index][3]}`  }}>4</button>
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
