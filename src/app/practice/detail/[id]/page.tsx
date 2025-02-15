'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation';
import {fetchQuestions} from '@/redux/apiRequest';
import ConfigAxios from '@/helper/config/configAxios';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/redux/store';
import x from '@/layouts/practice/detail.module.css'
import FileDisplay from '@/components/file/fileDisplay';
interface question {
  correct_option : number,
  explanation : string,
  options : string[],
  question_text : string
  _id : string,
  question_audio : string,
  question_img : [string],
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
  const [options] = useState<number[]>([1, 2, 3, 4]);
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
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(questions?.length as number).fill(false));
  const [submited, setSubmited] = useState(false);
  const [score, setScore] = useState(0);
  const startTime = useRef(Date.now());
  const [retake, setRetake] = useState(false);
  const next = () =>{
    setDone(Math.min(done + 1, questions?.length as number - 1));
    setCurrentQuestion(questions ? questions[done + 1] : null);
  }
  const prev = () =>{
    console.log("prev");
    setDone(Math.max(done - 1, 0));
    setCurrentQuestion(questions ? questions[done - 1] : null);
  }

  const answer = (option : number, prevOption : number, index : number) =>{
    setDone(index);
    setCurrentQuestion(questions ? questions[index] : null);
    if(showAnswer[index] || retake) return;
    const newAnswers = [...answers];
    newAnswers[index] = option;
    setAnswer(newAnswers);
    const newOptionColor = [...optionColor];
    newOptionColor[index][option - 1] = 'orange';
    if(prevOption){
      newOptionColor[index][prevOption - 1] = '';
    }
    setOptionColor(newOptionColor);
  }

  const displayAnswer = () =>{
    const newOptionColor = [...optionColor];
  if(answers[done] != currentQuestion?.correct_option && answers[done] != 0){
      newOptionColor[done][answers[done] -1 ] = 'red';
    }
    if (currentQuestion) {
      newOptionColor[done][currentQuestion.correct_option - 1] = 'green';
    }
    setOptionColor(newOptionColor);
    const newShowAnswer = [...showAnswer];
    newShowAnswer[done] = true;
    setShowAnswer(newShowAnswer);
  }
  const submit = () =>{
    setSubmited(true);
    let newScore = 0;
    answers.forEach((answer, index) => {
      if(answer == questions![index].correct_option){
        newScore++;
      }
    })
    setScore(newScore);
  }
  const convertTime = (time : number) =>{
    const totalSeconds = time / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutesString}:${secondsString}`;
  }
  console.log(questions);
  return (
    <div className={x['container']}>
      <div className={x['question']}>
        <div className={x['head']}>
          <div style={{fontSize : "18px", display :'flex', flexWrap : 'nowrap'}}>
          <div >  {`${done + 1}`} </div>
          <div> / </div>
          <div> {questions ? questions.length : 0} </div>
          </div>
          <div style={{display : "grid", gridTemplateColumns : `${done + 1}fr ${questions ? questions.length - done - 1 : 0}fr`,width : "100%", height : '10px', boxShadow : '0 0 5px 0px #000'}}>
            <div style={{backgroundColor : 'orange'}}></div>
            <div></div>
          </div>
        </div>
        <div className={x['content']}>  
          <div className={x['no-explain']} style={{height : currentQuestion && currentQuestion.options ? currentQuestion.options.length > 0 ? '310px' : '620px' : '890px'}}>
            <div style={{display : 'flex', alignItems : 'center', justifyContent : 'space-between'}}>
              <span style={{ fontSize : '18px'}}>Question {done + 1}</span> 
              <span><i className="fa-solid fa-bug" style={{fontSize : "30px", marginRight : '15px'}}></i></span>
            </div>
            <div style={{paddingLeft : "10%"}}>
              <div>
                <span style={{ fontSize : '24px'}}> {currentQuestion?.question_text} </span> <br />
              </div>
              <div>
                <FileDisplay fileId={currentQuestion?.question_audio}/>
              </div>
            {currentQuestion && currentQuestion.options.length > 0 ? (
                            <div>
                            <span style={{ fontSize : '18px', fontWeight : 'normal'}}> 1 : {currentQuestion?.options[0]} </span> <br />
                            <span style={{ fontSize : '18px', fontWeight : 'normal' }}>  2 : {currentQuestion?.options[1]} </span> <br />
                            <span style={{ fontSize : '18px', fontWeight : 'normal'}}> 3 : {currentQuestion?.options[2]} </span> <br />
                            <span style={{ fontSize : '18px', fontWeight : 'normal'}}> 4 : {currentQuestion?.options[3]} </span> <br />
                            </div>
             ) : (
                <div style={{display : 'grid', gridTemplateColumns : '1fr 1fr', gridTemplateRows : '1fr 1fr ', gap : '20px', margin : '0 '}}>
                  {currentQuestion?.question_img.map((img, index) => (
                    <div key={index}>
                      <span>{index + 1} </span>
                      <img style={{width : '200px', height : '200px'}} src={img} alt={`Question image ${index + 1}`} />
                    </div>
                  ))}
                </div>
             )}
            </div>
            <div style={{display : 'flex', alignItems : 'center', gap : '40px'}}>
                {options.map((option, index) => (
                  <div key={index} className={x['answer']}>
                    <h5 style={{textAlign : 'end'}}>{option}</h5>
                    <button className={x['option']} style={{backgroundColor : `${optionColor[done]?.[index ] || ''}`}} onClick={() => {
                      answer(option, answers[done], done);
                    }}></button>
                    </div>
                ))}
            </div>
            <div style={{display : 'flex', paddingLeft : '20px', gap : '20px'}} >
            <button className = {x['explain-btn']} onClick={()=> setIsExplaining(true)}
              style={{backgroundColor : isExplaining ? 'red' : 'green'}}>Explain</button>
              <button className={x['show-btn']} onClick={displayAnswer}>Show answer</button>
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
              <button key={done} className={x['next']} onClick={prev}>
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
                  <button className={x['option']} style={{backgroundColor :  `${optionColor[index][0]}`  }} onClick={() => answer(1, answers[index], index)} >1</button>
                  <button className={x['option']} style={{backgroundColor :  `${optionColor[index][1]}`  }}
                  onClick={() => answer(2, answers[index], index)}
                  >2</button>
                  <button className={x['option']} style={{backgroundColor :  `${optionColor[index][2]}`  }}
                  onClick={() => answer(3, answers[index], index)}
                  >3</button>
                  <button className={x['option']} style={{backgroundColor :  `${optionColor[index][3]}`  }}
                  onClick={() => answer(4, answers[index], index)}>4</button>
              </div>
            ))}
          </div>
        </div>
        <div style={{display : 'flex', justifyContent : 'center'}}>
          {retake ? (
            <button className={x['submit']} onClick={() => window.location.reload()}>Continue</button>
          )  : (
            <button className={x['submit']} onClick={() =>{
              submit();
              setRetake(true);
            }}>Submit</button>
          )}
        </div>
      </div>
      {submited  ? (
        <div className={x['result']}>
            <div className={x['result-content']}>
                <div style={{display : 'grid', gridTemplateRows : '1fr 1fr 1fr', height : '369px', borderRadius : '20px', backgroundColor : 'white', gap : '20px'}}>
                  <div style={{display : 'grid', gridTemplateColumns : '1fr 3fr'}}>
                    <div style={{display : 'flex', justifyContent : 'center', alignItems : 'center'}}> 
                      <img style={{width : '100px', height : "100px"}} src="https://topik.migii.net/images/migii/9.webp" alt="" />
                    </div>
                    <div style={{display : 'grid', gridTemplateRows : '1fr 1fr'}}>
                      <div style={{display :'flex', flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center', padding : '0 20px'}}>
                        <h3 style={{fontSize : '18px', fontWeight : 'bold'}}>Result: {score}/{questions?.length}</h3>
                        <div style={{width : '60px', height : "28px", borderRadius : '10px', backgroundColor : 'red', color : 'white', textAlign : 'center'}}> {(score * 100 / (questions?.length || 1)).toFixed(2)} % </div>
                      </div>
                      <div style={{display :'flex', flexDirection : 'row', justifyContent : 'space-between', alignItems : 'flex-start', padding : '0 20px'}}>
                          <h3 style={{fontSize : '18px', fontWeight : 'bold'}}>Total time to do the practice</h3>
                          <div style={{width : '60px', height : "28px", borderRadius : '10px', backgroundColor : 'green', color : 'white', textAlign : 'center'}}> {convertTime(Date.now() - startTime.current)} </div>
                      </div>
                    </div>
                  </div>
                  <div style={{display : 'flex', flexDirection : 'row', flexWrap : 'wrap', gap : '10px' , padding : '0 20px'}}>
                    {questions?.map((question, index) => (
                      <div key={index}>
                          <button className={x['result-btn']} style={{backgroundColor : (answers[index] == question.correct_option) ? 'green' : 'red'}} onClick={() => setSubmited(false)}>
                          {index + 1}
                          </button>
                      </div>
                    ))}
                  </div>
                  <div style={{display : 'flex', justifyContent : 'center', alignItems : 'center'}}>
                    <button className={x['detail']} onClick={() => setSubmited(false)}>Detail</button>
                  </div>
                </div>
            </div>
        </div>
      )  : null}
    </div>
  )
}
