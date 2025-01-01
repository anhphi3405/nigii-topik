import { Dispatch } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";

interface LoginPopUpProps {
  isShow: boolean;
  onClose: () => void;
}

type User = {
  username: string;
  password: string;
}

interface  LoginApiRequestProps {
  user: User;
  dispatch: Dispatch;
  navigate: NavigateFunction;
}

export type { LoginPopUpProps, User, LoginApiRequestProps };