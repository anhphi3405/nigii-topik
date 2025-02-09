import { createSlice } from "@reduxjs/toolkit";
const examSlice = createSlice({
    name : "exam",
    initialState : {
        create : {
            isFetching : false,
            error : false,
            success : false
        },
        fetch : {
            isFetching : false,
            error : false,
            success : false,
            exams : null
        },
        update : {
            isFetching : false,
            error : false,
            success : false
        },
        delete : {
            isFetching : false,
            error : false,
            success : false
        }
    },
    reducers : {
        fetchStart : (state) =>{
            state.fetch.isFetching = true
        },
        fetchSuccess : (state, action) =>{
            state.fetch.isFetching = false
            state.fetch.success = true
            state.fetch.exams = action.payload
        },
        fetchFailure : (state) =>{
            state.fetch.isFetching = false
            state.fetch.error = true
        },
    }
})

export const {
    fetchStart,
    fetchSuccess,
    fetchFailure
} = examSlice.actions;

export default examSlice.reducer;