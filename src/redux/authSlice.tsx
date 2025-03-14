
import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            success: false,
            error: false
        },
        register: {
            isFetching: false,
            error: false,
            success: false
        },
    },
    reducers: {
        // Add your reducers here
        loginStart : (state) =>{
            state.login.isFetching = true
        },
        loginSuccess : (state, action) =>{
            state.login.isFetching = false
            state.login.currentUser = action.payload
            state.login.success = true
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
        },
        logoutStart : (state) =>{
            state.login.isFetching = true
        },
        logoutSuccess : (state) =>{
            state.login.isFetching = false
            state.login.currentUser = null
            state.login.error = false
            state.login.success = false
        },
        logoutFailure : (state) =>{
            state.login.isFetching = false
            state.login.error = true
        },
    }
});

export const { 
    loginStart, loginSuccess, loginFailure ,
    registerStart,
    registerSuccess,
    registerFailure,
    logoutStart,
    logoutSuccess,
    logoutFailure
} = authSlice.actions;


export default authSlice.reducer;