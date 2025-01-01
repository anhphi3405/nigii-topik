
import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false
        },
        register: {
            isFetching: false,
            error: false,
            success: false
        }
    },
    reducers: {
        // Add your reducers here
        loginStart : (state) =>{
            state.login.isFetching = true
        },
        loginSuccess : (state, action) =>{
            state.login.isFetching = false
            state.login.currentUser = action.payload
        },
        loginFailure : (state) =>{
            state.login.isFetching = false
            state.login.error = true
        },
        registerStart : (state) =>{
            state.register.isFetching = true
        },
        registerSuccess : (state) =>{
            state.register.isFetching = false
            state.register.success = true
            state.register.error = false
        },
        registerFailure : (state) =>{
            state.register.isFetching = false
            state.register.error = true
            state.register.success = false
        }
    }
});

export const { 
    loginStart, loginSuccess, loginFailure ,
    registerStart,
    registerSuccess,
    registerFailure
} = authSlice.actions;


export default authSlice.reducer;