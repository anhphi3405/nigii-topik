'use client'
import React, {  useEffect, useState } from 'react'
import x from '@/layouts/admin/exam/exam.module.css'
import y from '@/layouts/admin/exam/create.module.css'
import z from '@/layouts/admin/exam/edit.module.css'
import { useAppSelector } from '@/redux/store'
import { fetchStart ,
    fetchSuccess,
    fetchFailure
 } from '@/redux/examSlice'
import { fetchAllExams, fetchQuestions } from '@/redux/apiRequest'
import ConfigAxios from '@/helper/config/configAxios'
import { useDispatch } from 'react-redux'
import { useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios';
import ReactPaginate from "react-paginate";
interface Exam {
    examName : string;
    questions : [];
    type : string;
    createAt : string;
    updatedAt : string;
    _id : string;
}
interface question {
  correct_option : number,
  explanation : string,
  options : string[],
  question_text : string
  _id : string,
  question_audio : string,
  question_img : [string],
}
export default function Exam() {
    const dispatch = useDispatch();
    const axiosJWT = ConfigAxios.ConfigJWT();
    useEffect(() =>{  
        fetchAllExams({dispatch, axiosJWT});
    }, []);
    const exams = useAppSelector(state => state.exam.fetch.exams) as Exam[] | null;
    const [isActionOpen, setIsActionOpen] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
    useEffect(() =>{
        const examId = searchParams.get('examId');
        setSelectedExamId(examId);
    }, [searchParams]);
    return (
    <div>
        <div className={x['container']} style={{display : isActionOpen ? 'none' : 'flex'}}>
        {exams?.map((exam, index) => (
            <div key={index} className={x['exam']}>
                <div style={{display : 'flex', alignItems : 'center', paddingLeft : '20px'}}>
                    <h3 style={{fontSize : '18px', color : 'orange', fontWeight : 'bold'}}>[{index  + 1}] :   {exam.examName} </h3>
                </div>
                <div style={{display : 'flex', gap : '20px', justifyContent : 'flex-end', alignItems : 'center', paddingRight : '20px'}} className={x['actions']}>
                    <i className="fa-solid fa-pencil"
                    onClick={() => {
                        setIsActionOpen(true)
                        setIsEditOpen(true)
                        router.push(`/admin/exam?edit&examId=${exam._id}`)
                    }}></i>
                    <i className="fa-solid fa-trash"
                    onClick={() => setIsActionOpen(true)}></i>
                    <i className="fa-solid fa-eye"
                    onClick={() => setIsActionOpen(true)}></i>
                </div>
            </div>
        ))}
        <div style={{display : 'flex', justifyContent : 'flex-end'}}> 
            <button 
            className={x['create-btn']}
            onClick={() => {
                setIsCreateOpen(true)
                setIsActionOpen(true)
                router.push(`/admin/exam?create`)
            }}>Create Exam</button>
        </div>
        </div>
        {isEditOpen && <EditExam examId={selectedExamId}/>}
        {isCreateOpen && <CreateExam examId={selectedExamId
        }/>}
    </div>
  )
}

function CreateExam({examId}) {
    const [examName, setExamName] = useState("");
    const [type, setType] = useState("");
    console.log(examName + " " + type);
    const create_exam = async () =>{
        try{
            axios.post('http://localhost:5000/v1/exam/create', {examName, type});

        }
        catch(e){
          console.log(e);
        }
    }
    const create = async () =>{
        if(confirm("Are you sure you want to create this exam?")){
            await create_exam();
            alert("create successfully !");
        }
        else{
            alert("Exam creation failed")
        }
    }
    return (
        <div className={y['container']}>
            <div className={y['form']}>
                <div style={{display : 'flex, gap : 20px', flexWrap : 'nowrap', flexDirection : 'row'}}>
                    <div style={{display : 'flex', justifyContent : 'center', alignItems : 'center'}}>
                        <h3 style={{color : 'rgb(3, 251, 180)', fontSize : '24px', fontWeight : 'bold'}}>Exams Name</h3>
                    </div>
                    <div>
                        <input type="text" placeholder="Exam Name"
                        style={{width : '100%', paddingLeft : 'calc(50% - 40px)', height : '40px',borderRadius : '5px', outline : 'none', border  : '1px solid black'}}
                        onChange={(event) => setExamName(event.target.value)}/>
                    </div>
                </div>
                <div style={{display : 'flex, gap : 20px', flexWrap : 'nowrap', flexDirection : 'row'}}>
                    <div style={{display : 'flex', justifyContent : 'center', alignItems : 'center'}}>
                        <h3 style={{color : 'rgb(3, 251, 180)', fontSize : '24px', fontWeight : 'bold'}}>Type</h3>
                    </div>
                    <div>
                        <input type="text" placeholder="Exam Type"
                        style={{width : '100%', paddingLeft : 'calc(50% - 40px)',
                        height : '40px',borderRadius : '5px', outline : 'none', border  : '1px solid black'
                        }}
                        onChange={(event) => setType(event.target.value)}/>
                    </div>
                </div>
                <div style={{marginTop : '20px', display : 'flex', justifyContent : 'center'}}>
                    <button className={x['create-btn']}
                    onClick={create}
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    )
}
// style = {{}}
// <div></div>
// <h1></h1>
// <button></button>
// backgroundColor 
// , color : 'white'
//className = {z['']}
function EditExam({examId}) {
    const ITEMS_PER_PAGE = 5; // Số câu hỏi hiển thị mỗi trang
    const dispatch = useDispatch();
    const axiosJWT = ConfigAxios.ConfigJWT();
    useEffect(()=>{
        fetchQuestions({dispatch, axiosJWT, id:examId});
    }, []);
    const questions = useAppSelector((state) => state.questions.fetchQuestions.questions) as question[] | null;
    console.log(questions);
    // State quản lý phân trang
    const [currentPage, setCurrentPage] = useState(0);

    if (!questions) return <p>Loading...</p>;

    // Tính toán dữ liệu cho trang hiện tại
    const offset = currentPage * ITEMS_PER_PAGE;
    const currentItems = questions.slice(offset, offset + ITEMS_PER_PAGE);
    const pageCount = Math.ceil(questions.length / ITEMS_PER_PAGE);

    // Xử lý khi đổi trang
    const handlePageClick = (event: { selected: number }) => {
      setCurrentPage(event.selected);
    };
    
    const router = useRouter();

    return (
        <div>
          <h1 style = {{textAlign : 'center', fontSize : '24px'}}>Questions List</h1>
          <div className = {z['list']}>
            {currentItems.map((q, index) => (
              <div key = {index} className = {z['item']} >
                <div>
                <h3 style = {{fontSize : '18px'}}> Question {offset + index + 1}  </h3>
                </div>
                <div>
                    <i className="fa-solid fa-pencil"></i>
                    <i className="fa-solid fa-trash"></i>
                    <i className="fa-solid fa-eye"></i>
                </div>
              </div>
            ))}
          </div>

      {/* Phân trang */}
      <ReactPaginate
        previousLabel="← Prev"
        nextLabel="Next →"
        breakLabel="..."
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName=  {z['pagination']} 
        activeClassName={z['active']} 
        disabledClassName= {z['disabled']} 
        previousClassName= {z['previous']} 
        nextClassName={z['next']} 
      />    
      <div className = {z['create']}>
        <button className = {z['create-btn']}
        onClick = {() => {
          router.push(`/admin/question/create?examId=${examId}`);
        }}>
          Add question
        </button>
      </div>       
      </div>
    );
}


