"use client"
import { useSearchParams } from "next/navigation";
import { useState } from "react"
import axios from "axios";
import {fetchQuestions } from '@/redux/apiRequest'
import ConfigAxios from '@/helper/config/configAxios'
import { useDispatch } from 'react-redux'
interface Question {
  correct_option: number
  explanation: string
  options: string[]
  question_text: string
  _id: string
  question_audio: string
  question_img: string[]
}

export default function CreateQuestion() {
  const [question, setQuestion] = useState<Omit<Question, "_id">>({
    correct_option: 0,
    explanation: "",
    options: ["", "", "", ""],
    question_text: "",
    question_audio: "",
    question_img: [""],
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setQuestion((prev) => ({ ...prev, [name]: value }))
  }

  const handleOptionChange = (index, value) => {
    setQuestion((prev) => {
      const updatedOptions = [...prev.options]
      updatedOptions[index] = value
      return { ...prev, options: updatedOptions }
    })
  }

  const addOption = () => {
    setQuestion((prev) => ({ ...prev, options: [...prev.options, ""] }))
  }

  const removeOption = (index) => {
    if (question.options.length <= 2) return
    setQuestion((prev) => {
      const updatedOptions = [...prev.options]
      updatedOptions.splice(index, 1)
      return { ...prev, options: updatedOptions }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Creating question:", question)
  }

  console.log(question);
   const searchParams = useSearchParams();
  const examId = searchParams.get("examId");
    const dispatch = useDispatch();
    const axiosJWT = ConfigAxios.ConfigJWT();
  console.log(examId);
  const submit = async () =>{
  	try{
	  const res = await axios.post('http://localhost:5000/v1/question/create', {question_text : question.question_text, options : question.options, correct_option : question.correct_option, question_img : question.question_img, examId : examId});
	  console.log(res.data); // Log response data ra console
	  fetchQuestions({dispatch, axiosJWT, id:examId});
  	}
  	catch(e){
  		console.log(e);
  	}
  }
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", fontFamily: "Arial" }}>
      <h2 style={{ textAlign: "center" }}>Create New Question</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <label>
          Question Text:
          <textarea name="question_text" value={question.question_text} onChange={handleInputChange} style={{ width: "100%", height: "80px" }} required />
        </label>
        
        <label>
          Explanation:
          <textarea name="explanation" value={question.explanation} onChange={handleInputChange} style={{ width: "100%", height: "80px" }} />
        </label>
        
        <label>
          Correct Option (Index):
          <input type="number" name="correct_option" value={question.correct_option} onChange={handleInputChange} style={{ width: "100%" }} required />
        </label>
        
        <div>
          <strong>Options:</strong>
          {question.options.map((opt, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "5px" }}>
              <input type="text" value={opt} onChange={(e) => handleOptionChange(index, e.target.value)} required style={{ flex: 1 }} />
              <button type="button" onClick={() => removeOption(index)} style={{ background: "red", color: "white", border: "none", padding: "5px 10px" }}>X</button>
            </div>
          ))}
          <button type="button" onClick={addOption} style={{ marginTop: "10px", padding: "5px 10px", background: "blue", color: "white", border: "none" }}>Add Option</button>
        </div>
        
        <label>
          Question Audio URL:
          <input type="text" name="question_audio" value={question.question_audio} onChange={handleInputChange} style={{ width: "100%" }} />
        </label>
        
        <label>
          Image URLs (comma separated):
          <input type="text" name="question_img" value={question.question_img.join(", ")} onChange={(e) => setQuestion((prev) => ({ ...prev, question_img: e.target.value.split(",").map((img) => img.trim()) }))} style={{ width: "100%" }} />
        </label>
        
        <button style={{ padding: "10px", background: "green", color: "white", border: "none", cursor: "pointer" }}
        onClick = {submit}>Create Question</button>
      </form>
    </div>
  )
}
