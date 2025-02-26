'use client'
import React, { useEffect, useState } from 'react'
import x from '@/layouts/admin/exam/exam.module.css'
import { useAppSelector } from '@/redux/store'
import { fetchStart ,
    fetchSuccess,
    fetchFailure
 } from '@/redux/examSlice'
import { fetchAllExams } from '@/redux/apiRequest'
import ConfigAxios from '@/helper/config/configAxios'
import { useDispatch } from 'react-redux'
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
    // console.log(exams);
    return (
    <div className={x['container']}>
        {exams?.map((exam, index) => (
            <div key={index} className={x['exam']}>
                <div style={{display : 'flex', alignItems : 'center', paddingLeft : '20px'}}>
                    <h3 style={{fontSize : '18px', color : 'orange', fontWeight : 'bold'}}>[{index  + 1}] :   {exam.examName} </h3>
                </div>
                <div style={{display : 'flex', gap : '20px', justifyContent : 'flex-end', alignItems : 'center', paddingRight : '20px'}} className={x['actions']}>
                    <i className="fa-solid fa-pencil"
                    onClick={() => {
                        setIsActionOpen(true)
                        setIsCreateOpen(true)
                    }}></i>
                    <i className="fa-solid fa-trash"
                    onClick={() => setIsActionOpen(true)}></i>
                    <i className="fa-solid fa-eye"
                    onClick={() => setIsActionOpen(true)}></i>
                </div>
            </div>
        ))}
       {isActionOpen ? (
        <CreateExam></CreateExam>
       ) : null}
    </div>
  )
}

function CreateExam() {
    return (
        <div>
            <h1>haha</h1>
        </div>
    )
}