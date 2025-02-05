
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from "@/app/redux/authSlice"
import { useAppSelector } from '@/app/redux/store';
import {jwtDecode} from 'jwt-decode';
interface User  {
  accessToken: string;
  avatar: string;
  email: string;
  role : string;
  username: string;
  __v: number;
  _id: string;
}
const ConfigAxios  = {
    ConfigJWT: () => {
        const axiosJWT = axios.create();
        const user = useAppSelector((state) => state.auth.login.currentUser) as User | null;
        const refreshToken = async () => {
            try{
              const res = await axiosJWT.post('http://localhost:5000/v1/auth/refresh', {
                withCredentials: true
              });
              return res.data;
        
            }
            catch(err){
              console.log(err);
            }
          }
        const dispatch = useDispatch();
        axiosJWT.interceptors.request.use(
            async (config) => {
            // You can modify the config object here if needed
            const decodedToken = jwtDecode(user?.accessToken as string) as {exp: number};
            if(decodedToken.exp * 1000 < Date.now()) {
                const data = await refreshToken();
                const refreshUser = {
                    ...user,
                    accessToken: data.accessToken
                }
                dispatch(loginSuccess(refreshUser));
                config.headers["token"] = `Bearer ${data.accessToken}`;
            }
            return config;
            },
            (error)=>{
            return Promise.reject(error);
            }
        )
        return axiosJWT;
    }
}

export default ConfigAxios;