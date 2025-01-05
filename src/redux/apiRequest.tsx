import axios from "axios";
import { loginStart, loginSuccess, loginFailure , registerStart, registerSuccess, registerFailure} from "./authSlice";
import { LoginApiRequestProps } from "@/helper/interface/login"
import { RegisterApiRequestProps } from "@/helper/interface/signUp"

const loginUser = async ({user, dispatch, navigate} : LoginApiRequestProps) =>{
    dispatch(loginStart());
    try{
        const res = await axios.post("http://localhost:5000/v1/auth/login", user);
        console.log(res.data);
        dispatch(loginSuccess(res.data));
        navigate("/");
    }
    catch(err){
        dispatch(loginFailure());
        console.log(err);
    }
}

const registerUser = async ({user, dispatch, navigate} : RegisterApiRequestProps) =>{
    dispatch(registerStart());
    try{
        await axios.post("http://localhost:5000/v1/auth/register", user);
        dispatch(registerSuccess());
        navigate("/");
    }
    catch(err){
        dispatch(registerFailure());
        console.log(err);
    }
}




export {loginUser, registerUser}; ;