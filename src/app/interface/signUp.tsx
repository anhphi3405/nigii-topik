import { Dispatch } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";

interface SignUpPopUpProps {
    isShow: boolean;
    onClose: () => void;
  }

type User = {
  username: string;
  email: string;
  password: string;
}

interface RegisterApiRequestProps {
  user: User;
  dispatch: Dispatch;
  navigate: NavigateFunction;
}

export type { SignUpPopUpProps, User, RegisterApiRequestProps };