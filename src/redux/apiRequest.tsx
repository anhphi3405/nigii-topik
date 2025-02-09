import axios from "axios";
import { loginStart, loginSuccess, loginFailure , registerStart, registerSuccess, registerFailure
, logoutStart, logoutSuccess, logoutFailure
} from "./authSlice";

import { fetchStart, fetchSuccess, fetchFailure } from "./examSlice";
import { fetchQuestionsStart, fetchQuestionsSuccess, fetchQuestionsFailure } from "./questionsSlice";

const loginUser = async ({user, dispatch}) =>{
    dispatch(loginStart());
    try{
        const res = await axios.post("http://localhost:5000/v1/auth/login", user);
        console.log(res.data);
        dispatch(loginSuccess(res.data));
        alert("login sucessfully !");
        window.location.href = "/";
    }
    catch(err){
        dispatch(loginFailure());
        console.log(err);
    }
}

const registerUser = async ({user, dispatch}) =>{
    dispatch(registerStart());
    try{
        await axios.post("http://localhost:5000/v1/auth/register", user);
        dispatch(registerSuccess());
        window.location.href = "/";
        alert("register sucessfully !");
    }
    catch(err){
        dispatch(registerFailure());
        console.log(err);
    }
}


const logOut = async ({dispatch, navigate,id, accessToken, axiosJWT} ) =>{
    dispatch(logoutStart());
    try{
        await axiosJWT.post("http://localhost:5000/v1/auth/logout", id, {
            headers :{
                token : `Bearer ${accessToken}`
            }
        });
        dispatch(logoutSuccess());
        navigate("/");
    }
    catch(err){
        alert("The backend service is not available. Please try again later");
        dispatch(logoutFailure());
        console.log(err);
    }
}

const fetchExams = async ({dispatch, axiosJWT, id}) =>{
    dispatch(fetchStart());
    try{
        const res = await axiosJWT.get(`http://localhost:5000/v1/exam/${id}`);
        dispatch(fetchSuccess(res.data));
    }
    catch(err){
        dispatch(fetchFailure());
        console.log(err);
    }
}

const fetchQuestions = async({dispatch, axiosJWT, id}) => {
    dispatch(fetchQuestionsStart());
    try{
        const res = await axiosJWT.get(`http://localhost:5000/v1/exam/${id}/questions`);
        dispatch(fetchQuestionsSuccess(res.data));
    }
    catch(err){
        dispatch(fetchQuestionsFailure());
        console.log(err);
    }
}

export {loginUser, registerUser, logOut, fetchExams, fetchQuestions}; ;