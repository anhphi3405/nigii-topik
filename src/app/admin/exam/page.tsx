'use client'
import React, {  useEffect, useState } from 'react'
import x from '@/layouts/admin/exam/exam.module.css'
import y from '@/layouts/admin/exam/create.module.css'
import { useAppSelector } from '@/redux/store'
import { fetchStart ,
    fetchSuccess,
    fetchFailure
 } from '@/redux/examSlice'
import { fetchAllExams } from '@/redux/apiRequest'
import ConfigAxios from '@/helper/config/configAxios'
import { useDispatch } from 'react-redux'
import { useRouter, useSearchParams } from 'next/navigation'
interface Exam {
    examName : string;
    questions : [];
    type : string;
    createAt : string;
    updatedAt : string;
    _id : string;
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
    const create = () =>{
        if(confirm("Are you sure you want to create this exam?")){
            alert("Exam created successfully")
        }
        else{
            alert("Exam creation failed")
        }
    }
    return (
        <div className={y['container']}>
            <div style={{height : 'auto'}}>
            <h1 className={y['base_text']}>Topik Exam</h1>
            </div>
            <div className={y['form']}>
                <div style={{display : 'flex, gap : 20px', flexWrap : 'nowrap', flexDirection : 'row'}}>
                    <div style={{display : 'flex', justifyContent : 'center', alignItems : 'center'}}>
                        <h3 style={{color : 'rgb(3, 251, 180)', fontSize : '24px', fontWeight : 'bold'}}>Exams Name</h3>
                    </div>
                    <div>
                        <input type="text" placeholder="Exam Name"
                        style={{width : '100%', paddingLeft : 'calc(50% - 40px)', height : '40px',borderRadius : '5px', outline : 'none', border  : 'none'}}/>
                    </div>
                </div>
                <div style={{display : 'flex, gap : 20px', flexWrap : 'nowrap', flexDirection : 'row'}}>
                    <div style={{display : 'flex', justifyContent : 'center', alignItems : 'center'}}>
                        <h3 style={{color : 'rgb(3, 251, 180)', fontSize : '24px', fontWeight : 'bold'}}>Type</h3>
                    </div>
                    <div>
                        <input type="text" placeholder="Exam Type"
                        style={{width : '100%', paddingLeft : 'calc(50% - 40px)',
                        height : '40px',borderRadius : '5px', outline : 'none', border  : 'none'
                        }}/>
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

function EditExam({examId}) {
    return (
        <div>
            <h1>haha edit</h1>
            {examId && <p>Exam ID: {examId}</p>}
        </div>
    )
}