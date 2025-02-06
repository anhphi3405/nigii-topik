'use client'
import React, { useEffect } from 'react'
import { useParams } from 'next/navigation';
import {fetchExams} from '@/redux/apiRequest';
import ConfigAxios from '@/helper/config/configAxios';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/redux/store';
export default function Page() {
  const { id } = useParams();
  const axiosJWT = ConfigAxios.ConfigJWT();
  const dispatch = useDispatch();
  useEffect(() =>{
    fetchExams({ dispatch,axiosJWT,id}) ;
  }, [])
  const exams = useAppSelector((state) => state.exam.fetch.exams);
  console.log(exams);
  return (
    <div>
      
    </div>
  )
}
