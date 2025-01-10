import { Dispatch } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import  { AxiosInstance } from 'axios';

interface LogoutApiRequestProps {
  dispatch: Dispatch;
  navigate: NavigateFunction;
    id: string;
  accessToken: string;
  axiosJWT: AxiosInstance
}

export type { LogoutApiRequestProps };