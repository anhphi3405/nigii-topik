import axios from "axios";
import { loginStart, loginSuccess, loginFailure , registerStart, registerSuccess, registerFailure} from "./authSlice";
import { LoginApiRequestProps } from "@/app/interface/login"
import { RegisterApiRequestProps } from "@/app/interface/signUp"
const apiResponse = {
    loginState: true,
    registerState: false,
}

const loginUser = async ({user, dispatch, navigate} : LoginApiRequestProps) =>{
    dispatch(loginStart());
    try{
        console.log(user);
        const res = await axios.post("http://localhost:5000/v1/auth/login", user);
        if(res.status == 200) apiResponse.loginState = true;
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
        const res = await axios.post("http://localhost:5000/v1/auth/register", user);
        if(res.status == 201) apiResponse.registerState = true;
        dispatch(registerSuccess());
        navigate("/");
    }
    catch(err){
        dispatch(registerFailure());
        console.log(err);
    }
}




export {loginUser, registerUser, apiResponse}; ;